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
    KulMessengerCovers,
    KulMessengerInitialization,
    KulMessengerFilters,
    KulMessengerImageChildNode,
} from './kul-messenger-declarations';
import type { GenericObject, KulEventPayload } from '../../types/GenericTypes';
import { kulManagerInstance } from '../../managers/kul-manager/kul-manager';
import { KulDebugComponentInfo } from '../../managers/kul-debug/kul-debug-declarations';
import { getProps } from '../../utils/componentUtils';
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from '../../variables/GenericVariables';
import { prepLeft } from './layout/left';
import { prepCenter } from './layout/center';
import { prepRight } from './layout/right';
import { prepGrid } from './layout/grid';
import {
    AVATAR_COVER,
    LOCATION_COVER,
    OUTFIT_COVER,
    STYLE_COVER,
} from './layout/constant';
import { KulChatStatus } from '../kul-chat/kul-chat-declarations';

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
     * History of this session's chats.
     */
    @State() history: KulMessengerHistory = {};
    /**
     * State for the options' covers.
     */
    @State() covers: KulMessengerCovers = {};
    /**
     * State of options' filters.
     */
    @State() filters: KulMessengerFilters = {};
    /**
     * Node containing the history of this session's chats.
     */
    @State() status: KulChatStatus = 'offline';

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
     * Customizes the style of the component. This property allows you to apply a custom CSS style to the component.
     * @default ""
     */
    @Prop() kulValue: KulMessengerInitialization = null;

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
    /**
     * Resets the states of the component.
     */
    @Method()
    async reset(): Promise<void> {
        this.covers = {};
        this.currentCharacter = null;
        this.filters = {
            avatars: false,
            locations: false,
            outfits: false,
            styles: false,
        };
        this.history = {};

        this.#initStates();
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
                byId: (id: string) => {
                    return this.kulData.nodes.find((n) => {
                        n.id === id;
                    });
                },
                current: () => this.currentCharacter,
                history: (character = this.currentCharacter) => {
                    return this.history[character.id];
                },
                name: (character = this.currentCharacter) =>
                    character.value ||
                    character.id ||
                    character.description ||
                    '?',
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
                list: () => this.kulData.nodes || [],
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
                status: () => this.status,
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
                        const index = this.covers[character.id][type];
                        const node = root.children[index];
                        return {
                            node: root.children[index],
                            title: this.#adapter.get.image.title(node),
                            value: node.cells.kulImage.value,
                        };
                    } catch (error) {
                        switch (type) {
                            case 'avatars':
                                return { value: AVATAR_COVER };
                            case 'locations':
                                return { value: LOCATION_COVER };
                            case 'outfits':
                                return { value: OUTFIT_COVER };
                            case 'styles':
                                return { value: STYLE_COVER };
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
                coverIndex: (
                    type: KulMessengerImageRootNodesIds,
                    character = this.currentCharacter
                ) => {
                    return this.covers[character.id][type];
                },
                filters: () => this.filters,
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
                title: (node: KulMessengerImageChildNode) => {
                    const title = node.value || '';
                    const description = node.description || '';
                    return title && description
                        ? `${title} - ${description}`
                        : description
                          ? description
                          : title
                            ? title
                            : '';
                },
            },
        },
        set: {
            character: {
                current: (character: KulMessengerCharacterNode) => {
                    this.currentCharacter = character;
                },
                history: (
                    history: string,
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
                status: (status: KulChatStatus) => (this.status = status),
            },
            image: {
                cover: (
                    type: KulMessengerImageRootNodesIds,
                    value: number,
                    character = this.currentCharacter
                ) => {
                    this.covers[character.id][type] = value;
                    this.refresh();
                },
                filters: (filters: KulMessengerFilters) =>
                    (this.filters = filters),
            },
        },
    };

    #hasCharacters() {
        const nodes = this.kulData.nodes || [];
        return !!nodes.length;
    }

    #hasNodes() {
        return !!this.kulData?.nodes?.length;
    }

    #initStates() {
        const imageRootGetter = this.#adapter.get.image.root;
        for (let index = 0; index < this.kulData.nodes.length; index++) {
            const character = this.kulData.nodes[index];
            const covers: {
                [K in KulMessengerImageRootNodesIds]: number;
            } = {
                avatars: imageRootGetter('avatars', character).value || 0,
                locations: imageRootGetter('locations', character).value || 0,
                outfits: imageRootGetter('outfits', character).value || 0,
                styles: imageRootGetter('styles', character).value || 0,
            };
            const history =
                character.children?.find((n) => n.id === 'chat')?.cells?.kulChat
                    .value || [];
            this.covers[character.id] = covers;
            this.history[character.id] = JSON.stringify(history);
        }
        if (this.kulValue) {
            const currentCharacter = this.kulValue.currentCharacter;
            const filters = this.kulValue.filters;
            for (const key in filters) {
                if (Object.prototype.hasOwnProperty.call(filters, key)) {
                    const filter = filters[key];
                    this[key] = filter;
                }
            }
            if (currentCharacter) {
                this.currentCharacter =
                    this.#adapter.get.character.byId(currentCharacter);
            }
        }
    }

    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/

    componentWillLoad() {
        this.#kulManager.theme.register(this);
        if (this.#hasNodes()) {
            this.#initStates();
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
        if (!this.#hasNodes()) {
            return;
        }

        return (
            <Host>
                {this.kulStyle ? (
                    <style id={KUL_STYLE_ID}>
                        {this.#kulManager.theme.setKulStyle(this)}
                    </style>
                ) : undefined}
                <div id={KUL_WRAPPER_ID}>
                    {this.currentCharacter ? (
                        <div
                            class="messenger"
                            key={'messenger_' + this.currentCharacter.id}
                        >
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
