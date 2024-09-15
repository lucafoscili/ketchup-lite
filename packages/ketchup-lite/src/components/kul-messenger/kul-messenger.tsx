import {
    Component,
    Element,
    Event,
    EventEmitter,
    forceUpdate,
    h,
    Host,
    Method,
    Prop,
    State,
} from '@stencil/core';
import {
    KulMessengerProps,
    KulMessengerEvent,
    KulMessengerAdapter,
    KulMessengerCharacterNode,
    KulMessengerDataset,
    KulMessengerHistory,
    KulMessengerImageRootNodesIds,
    KulMessengerImageNodeTypeMap,
} from './kul-messenger-declarations';
import type { GenericObject, KulEventPayload } from '../../types/GenericTypes';
import { kulManagerInstance } from '../../managers/kul-manager/kul-manager';
import { KulDebugComponentInfo } from '../../components';
import { getProps } from '../../utils/componentUtils';
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from '../../variables/GenericVariables';
import { prepLeft } from './layout/left';
import { prepCenter } from './layout/center';
import { prepRight } from './layout/right';
import { prepGrid } from './layout/grid';
import {
    KulChatHistory,
    KulChatState,
} from '../kul-chat/kul-chat-declarations';

@Component({
    tag: 'kul-messenger',
    styleUrl: 'kul-messenger.scss',
    shadow: true,
})
export class KulMessenger {
    /**
     * References the root HTML element of the component (<kul-messenger>).
     */
    @Element() rootElement: HTMLElement;

    /*-------------------------------------------------*/
    /*                   S t a t e s                   */
    /*-------------------------------------------------*/

    /**
     * Debug information.
     */
    @State() debugInfo: KulDebugComponentInfo = {
        endTime: 0,
        renderCount: 0,
        renderEnd: 0,
        renderStart: 0,
        startTime: performance.now(),
    };
    /**
     * Node representing the current active character.
     */
    @State() currentCharacter: KulMessengerCharacterNode;
    /**
     * Node containing the history of this session's chats.
     */
    @State() history: KulMessengerHistory = {};
    /**
     * Flags for visibility of options' list.
     */
    @State() avatars = false;
    @State() locations = false;
    @State() outfits = false;
    @State() styles = false;

    /*-------------------------------------------------*/
    /*                    P r o p s                    */
    /*-------------------------------------------------*/

    /**
     * The data of the messenger.
     * @default []
     */
    @Prop({ mutable: true }) kulData: KulMessengerDataset = null;
    /**
     * Customizes the style of the component. This property allows you to apply a custom CSS style to the component.
     * @default ""
     */
    @Prop() kulStyle: string = '';
    /**
     * Loads the initial history of the chats.
     * @default ""
     */
    @Prop({ mutable: false }) kulValue: KulMessengerHistory = {};

    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/

    #kulManager = kulManagerInstance();

    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/

    /**
     * Describes event emitted.
     */
    @Event({
        eventName: 'kul-messenger-event',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kulEvent: EventEmitter<KulEventPayload>;

    onKulEvent(e: Event | CustomEvent, eventType: KulMessengerEvent) {
        this.kulEvent.emit({
            comp: this,
            id: this.rootElement.id,
            originalEvent: e,
            eventType,
        });
    }

    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/

    /**
     * Fetches debug information of the component's current state.
     * @returns {Promise<KulDebugComponentInfo>} A promise that resolves with the debug information object.
     */
    @Method()
    async getDebugInfo(): Promise<KulDebugComponentInfo> {
        return this.debugInfo;
    }
    /**
     * Used to retrieve component's props values.
     * @param {boolean} descriptions - When provided and true, the result will be the list of props with their description.
     * @returns {Promise<GenericObject>} List of props as object, each key will be a prop.
     */
    @Method()
    async getProps(descriptions?: boolean): Promise<GenericObject> {
        return getProps(this, KulMessengerProps, descriptions);
    }
    /**
     * This method is used to trigger a new render of the component.
     */
    @Method()
    async refresh(): Promise<void> {
        forceUpdate(this);
    }

    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/

    #adapter: KulMessengerAdapter = {
        get: {
            character: {
                biography: (character = this.currentCharacter) => {
                    try {
                        const bio = character.children.find(
                            (n) => n.id === 'biography'
                        ).value;
                        return bio
                            ? this.#kulManager.data.cell.stringify(bio)
                            : 'You know nothing about this character...';
                    } catch (error) {
                        return 'You know nothing about this character...';
                    }
                },
                next: (character = this.currentCharacter) => {
                    if (!this.#hasCharacters()) {
                        return;
                    }
                    const nodes = this.kulData.nodes;
                    const currentIdx = nodes.findIndex(
                        (n) => n.id === character.id
                    );
                    const nextIdx = (currentIdx + 1) % nodes.length;

                    return nodes[nextIdx];
                },
                current: () => this.currentCharacter,
                history: (character = this.currentCharacter) => {
                    return this.history[character.id];
                },
                list: () => this.kulData.nodes || [],
                name: (character = this.currentCharacter) =>
                    character.value ||
                    character.id ||
                    character.description ||
                    '?',
                previous: (character = this.currentCharacter) => {
                    if (!this.#hasCharacters()) {
                        return;
                    }
                    const nodes = this.kulData.nodes;
                    const currentIdx = nodes.findIndex(
                        (n) => n.id === character.id
                    );
                    const prevIdx =
                        (currentIdx + nodes.length - 1) % nodes.length;

                    return nodes[prevIdx];
                },
            },
            image: {
                asCover: (
                    type: KulMessengerImageRootNodesIds,
                    character = this.currentCharacter
                ) => {
                    try {
                        const root = character.children.find(
                            (n) => n.id === type
                        );
                        const index = Number(root.value).valueOf();
                        return root.children[index].cells.kulImage.value;
                    } catch (error) {
                        switch (type) {
                            case 'avatars':
                                return 'portrait';
                            case 'locations':
                                return 'landscape';
                            case 'outfits':
                                return 'loyalty';
                            case 'styles':
                                return 'style';
                        }
                    }
                },
                byType: <T extends KulMessengerImageRootNodesIds>(
                    type: T,
                    character = this.currentCharacter
                ): KulMessengerImageNodeTypeMap[T]['children'][number][] => {
                    const node = character.children.find(
                        (child) => child.id === type
                    ) as KulMessengerImageNodeTypeMap[T];

                    if (node) {
                        return node.children as unknown as KulMessengerImageNodeTypeMap[T]['children'][number][];
                    } else {
                        throw new Error(
                            `Child node with id '${type}' not found`
                        );
                    }
                },
                options: () => {
                    return {
                        avatars: this.avatars,
                        locations: this.locations,
                        outfits: this.outfits,
                        styles: this.styles,
                    };
                },
                root: <T extends KulMessengerImageRootNodesIds>(
                    type: T,
                    character = this.currentCharacter
                ) => {
                    const node = character.children.find((n) => n.id === type);
                    if (!node) {
                        throw new Error(
                            `Child node with id '${type}' not found`
                        );
                    }
                    return node as KulMessengerImageNodeTypeMap[T];
                },
            },
        },
        set: {
            character: {
                current: (character: KulMessengerCharacterNode) => {
                    this.currentCharacter = character;
                },
                history: async (
                    history: KulChatState[],
                    character = this.currentCharacter
                ) => {
                    this.history[character.id] = history;
                },
                next: (character = this.currentCharacter) => {
                    if (!this.#hasCharacters()) {
                        return;
                    }
                    const nextC = this.#adapter.get.character.next(character);
                    this.#adapter.set.character.current(nextC);
                },
                previous: (character = this.currentCharacter) => {
                    if (!this.#hasCharacters()) {
                        return;
                    }
                    const previousC =
                        this.#adapter.get.character.previous(character);
                    this.#adapter.set.character.current(previousC);
                },
            },
            image: {
                options: (
                    type: KulMessengerImageRootNodesIds,
                    value: boolean
                ) => {
                    switch (type) {
                        case 'avatars':
                            this.avatars = value;
                            break;
                        case 'locations':
                            this.locations = value;
                            break;
                        case 'outfits':
                            this.outfits = value;
                            break;
                        case 'styles':
                            this.styles = value;
                            break;
                    }
                },
            },
        },
    };

    #hasCharacters() {
        const nodes = this.kulData.nodes || [];
        return !!nodes.length;
    }

    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/

    componentWillLoad() {
        this.#kulManager.theme.register(this);
        if (Object.keys(this.kulValue)) {
            this.history = this.kulValue;
        }
    }

    componentDidLoad() {
        this.onKulEvent(new CustomEvent('ready'), 'ready');
        this.#kulManager.debug.updateDebugInfo(this, 'did-load');
    }

    componentWillRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'will-render');
    }

    componentDidRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }

    render() {
        return (
            <Host>
                {this.kulStyle ? (
                    <style id={KUL_STYLE_ID}>
                        {this.#kulManager.theme.setKulStyle(this)}
                    </style>
                ) : undefined}
                <div id={KUL_WRAPPER_ID}>
                    {this.currentCharacter ? (
                        <div class="messenger">
                            {prepLeft(this.#adapter)}
                            {prepCenter(this.#adapter)}
                            {prepRight(this.#adapter)}
                        </div>
                    ) : (
                        <div class="selection-grid">
                            {prepGrid(this.#adapter)}
                        </div>
                    )}
                </div>
            </Host>
        );
    }

    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
}
