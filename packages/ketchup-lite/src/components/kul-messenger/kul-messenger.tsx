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
    KulMessengerImages,
    KulMessengerDataset,
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
     * Debug information.
     */
    @State() currentCharacter: KulMessengerCharacterNode;

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
            avatar: (character = this.currentCharacter) => {
                try {
                    return character.children.find((n) => n.id === 'avatar')
                        .cells.kulImage.kulValue;
                } catch (error) {
                    return 'portrait';
                }
            },
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
            characters: () => this.kulData.nodes || [],
            comps: () => {},
            currentCharacter: () => this.currentCharacter,
            image: (
                type: KulMessengerImages,
                character = this.currentCharacter
            ) => {
                try {
                    return character.children.find((n) => n.id === type).cells
                        .kulImage.kulValue;
                } catch (error) {
                    switch (type) {
                        case 'avatar':
                            return 'portrait';
                        case 'location':
                            return 'landscape';
                        case 'outfit':
                            return 'loyalty';
                        case 'style':
                            return 'style';
                    }
                }
            },
            name: (character = this.currentCharacter) =>
                character.value || character.id || character.description || '?',
        },
        set: {
            comps: () => {},
            currentCharacter: (character: KulMessengerCharacterNode) => {
                this.currentCharacter = character;
            },
        },
    };

    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/

    componentWillLoad() {
        this.#kulManager.theme.register(this);
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
                            {prepCenter()}
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
