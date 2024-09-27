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
    KulMessengerCovers,
    KulMessengerConfig,
    KulMessengerEventPayload,
    KulMessengerUI,
    KulMessengerChat,
    KulMessengerEditingStatus,
    KulMessengerBaseChildNode,
    KulMessengerChildIds,
    KulMessengerImageTypes,
    KulMessengerUnionChildIds,
} from './kul-messenger-declarations';
import type { GenericObject } from '../../types/GenericTypes';
import { kulManagerInstance } from '../../managers/kul-manager/kul-manager';
import { KulDebugComponentInfo } from '../../managers/kul-debug/kul-debug-declarations';
import { getProps } from '../../utils/componentUtils';
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from '../../variables/GenericVariables';
import { prepLeft } from './layout/kul-messenger-left';
import { prepCenter } from './layout/kul-messenger-center';
import { prepRight } from './layout/kul-messenger-right';
import { prepGrid } from './selection-grid/kul-messenger-selection-grid';
import {
    CLEAN_COMPONENTS,
    CLEAN_UI_JSON,
    IMAGE_TYPE_IDS,
} from './kul-messenger-constants';
import { KulChatStatus } from '../kul-chat/kul-chat-declarations';
import { getters } from './helpers/kul-messenger-getters';
import { setters } from './helpers/kul-messenger-setters';

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
     * Map of chat components with their characters.
     */
    @State() chat: KulMessengerChat = {};
    /**
     * Tracks the connection status towards the LLM endpoint.
     */
    @State() connectionStatus: KulChatStatus = 'offline';
    /**
     * State for the options' covers.
     */
    @State() covers: KulMessengerCovers = {};
    /**
     * Node representing the current active character.
     */
    @State() currentCharacter: KulMessengerCharacterNode;
    /**
     * Node representing the current active character.
     */
    @State() editingStatus: KulMessengerEditingStatus<KulMessengerImageTypes> =
        IMAGE_TYPE_IDS.reduce(() => {
            return null;
        }, {});
    /**
     * History of this session's chats.
     */
    @State() history: KulMessengerHistory = {};
    /**
     * Option currently hovered in the customization panel.
     */
    @State()
    hoveredCustomizationOption: KulMessengerBaseChildNode<
        KulMessengerChildIds<KulMessengerUnionChildIds>
    >;
    /**
     * Signals to the widget when the dataset is being saved.
     */
    @State() saveInProgress = false;
    /**
     * State of options' filters.
     */
    @State() ui: KulMessengerUI = CLEAN_UI_JSON;

    /*-------------------------------------------------*/
    /*                    P r o p s                    */
    /*-------------------------------------------------*/

    /**
     * Automatically saves the dataset when a chat updates.
     * @default true
     */
    @Prop({ mutable: true }) kulAutosave = true;
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
     * Sets the initial configuration, including active character and filters.
     * @default ""
     */
    @Prop() kulValue: KulMessengerConfig = null;

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
    kulEvent: EventEmitter<KulMessengerEventPayload>;

    onKulEvent(e: Event | CustomEvent, eventType: KulMessengerEvent) {
        const config: KulMessengerConfig = {
            currentCharacter: this.currentCharacter?.id,
            ui: this.ui,
        };
        this.kulEvent.emit({
            comp: this,
            id: this.rootElement.id,
            originalEvent: e,
            eventType,
            config,
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
        this.ui = CLEAN_UI_JSON;
        this.history = {};

        this.#initStates();
    }

    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/

    #adapter: KulMessengerAdapter = {
        actions: {
            delete: {
                option: (node, type) => {
                    const root = this.#adapter.get.image.root(type);
                    const idx = root.children.indexOf(node);
                    if (idx !== -1) {
                        delete root.children[idx];
                    }
                    this.refresh();
                },
            },
            save: async () => this.#save(),
        },
        components: { ...CLEAN_COMPONENTS, messenger: this },
        get: null,
        set: null,
    };

    #hasCharacters() {
        const nodes = this.kulData.nodes || [];
        return !!nodes.length;
    }

    #hasNodes() {
        return !!this.kulData?.nodes?.length;
    }

    #initStates() {
        if (this.#hasNodes) {
            const imageRootGetter = this.#adapter.get.image.root;
            for (let index = 0; index < this.kulData.nodes.length; index++) {
                const character = this.kulData.nodes[index];
                const covers: KulMessengerCovers = {
                    [character.id]: IMAGE_TYPE_IDS.reduce(
                        (acc, type) => {
                            acc[type] =
                                Number(
                                    imageRootGetter(type, character).value
                                ).valueOf() || 0;
                            return acc;
                        },
                        {} as KulMessengerCovers[typeof character.id]
                    ),
                };
                const chat = character.children?.find((n) => n.id === 'chat');
                this.chat[character.id] = {};
                const chatCell = chat?.cells?.kulChat;
                if (chatCell) {
                    const characterChat = this.chat[character.id];
                    characterChat.kulEndpointUrl = chatCell.kulEndpointUrl;
                    characterChat.kulMaxTokens = chatCell.kulMaxTokens;
                    characterChat.kulPollingInterval =
                        chatCell.kulPollingInterval;
                    characterChat.kulTemperature = chatCell.kulTemperature;
                }
                const history = chatCell?.kulValue || chatCell?.value || [];
                this.history[character.id] = JSON.stringify(history);
                Object.assign(this.covers, covers);
            }
        }
        if (this.kulValue) {
            const currentCharacter = this.kulValue.currentCharacter;
            const filters = this.kulValue.ui.filters;
            const panels = this.kulValue.ui.panels;
            if (currentCharacter) {
                this.currentCharacter =
                    this.#adapter.get.character.byId(currentCharacter);
            }
            for (const key in filters) {
                if (Object.prototype.hasOwnProperty.call(filters, key)) {
                    const filter = filters[key];
                    this.ui.filters[key] = filter;
                }
            }
            for (const key in panels) {
                if (Object.prototype.hasOwnProperty.call(panels, key)) {
                    const panel = panels[key];
                    this.ui.panels[key] = panel;
                }
            }
        }
    }

    async #save() {
        for (let index = 0; index < this.kulData.nodes.length; index++) {
            const character = this.kulData.nodes[index];
            const id = character.id;
            const chatNode = character.children.find((n) => n.id === 'chat');
            const chatComp = this.#adapter.get.character.chat(character);
            const saveChat = () => {
                if (this.history[id] && chatNode) {
                    const historyJson = JSON.parse(this.history[id]);
                    try {
                        chatNode.cells.kulChat.value = historyJson;
                    } catch (error) {
                        chatNode.cells = {
                            kulChat: {
                                shape: 'chat',
                                value: historyJson,
                            },
                        };
                    }
                    chatNode.cells.kulChat.kulEndpointUrl =
                        chatComp.kulEndpointUrl;
                    chatNode.cells.kulChat.kulMaxTokens = chatComp.kulMaxTokens;
                    chatNode.cells.kulChat.kulPollingInterval =
                        chatComp.kulPollingInterval;
                    chatNode.cells.kulChat.kulSystem = chatComp.kulSystem;
                    chatNode.cells.kulChat.kulTemperature =
                        chatComp.kulTemperature;
                }
            };
            const saveCovers = () => {
                IMAGE_TYPE_IDS.forEach((type) => {
                    const root = this.#adapter.get.image.root(type);
                    if (this.covers[id] && root) {
                        root.value = this.covers[id][type];
                    }
                });
            };

            saveChat();
            saveCovers();
        }
        this.onKulEvent(new CustomEvent('save'), 'save');
    }

    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/

    componentWillLoad() {
        this.#kulManager.theme.register(this);
        this.#adapter.get = getters(
            this.#adapter,
            this.#kulManager,
            this.#hasCharacters()
        );
        this.#adapter.set = setters(this.#adapter, this.#hasCharacters());
        this.#initStates();
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
