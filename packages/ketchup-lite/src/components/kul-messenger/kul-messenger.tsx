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
    KulMessengerConfig,
    KulMessengerEventPayload,
    KulMessengerUI,
    KulMessengerChat,
} from './kul-messenger-declarations';
import type { GenericObject } from '../../types/GenericTypes';
import { kulManagerInstance } from '../../managers/kul-manager/kul-manager';
import { KulDebugComponentInfo } from '../../managers/kul-debug/kul-debug-declarations';
import { getProps } from '../../utils/componentUtils';
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from '../../variables/GenericVariables';
import { prepLeft } from './messenger/left';
import { prepCenter } from './messenger/center';
import { prepRight } from './messenger/right';
import { prepGrid } from './selection-grid/selection-grid';
import {
    AVATAR_COVER,
    CLEAN_COMPONENTS,
    CLEAN_UI_JSON,
    LOCATION_COVER,
    OUTFIT_COVER,
    STYLE_COVER,
    TIMEFRAME_COVER,
} from './kul-messenger-constants';
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
     * Map of chat components with their characters.
     */
    @State() chat: KulMessengerChat = {};
    /**
     * State for the options' covers.
     */
    @State() covers: KulMessengerCovers = {};
    /**
     * History of this session's chats.
     */
    @State() history: KulMessengerHistory = {};
    /**
     * State of options' filters.
     */
    @State() ui: KulMessengerUI = CLEAN_UI_JSON;
    /**
     * Signals to the widget when the dataset is being saved.
     */
    @State() saveInProgress = false;
    /**
     * Tracks the connection status towards the LLM endpoint.
     */
    @State() connectionStatus: KulChatStatus = 'offline';

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
        components: CLEAN_COMPONENTS,
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
                byId: (id) => this.kulData.nodes.find((n) => n.id === id),
                chat: (character = this.currentCharacter) =>
                    this.chat[character.id],
                current: () => this.currentCharacter,
                history: (character = this.currentCharacter) =>
                    this.history[character.id],
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
            },
            image: {
                asCover: (type, character = this.currentCharacter) => {
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
                            case 'timeframes':
                                return { value: TIMEFRAME_COVER };
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
                coverIndex: (type, character = this.currentCharacter) => {
                    return this.covers[character.id][type];
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
                title: (node) => {
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
            messenger: {
                config: () => {
                    return {
                        currentCharacter: this.currentCharacter.id,
                        ui: this.ui,
                    };
                },
                data: () => this.kulData,
                history: () => this.history,
                status: {
                    connection: () => this.connectionStatus,
                    save: {
                        inProgress: () => this.saveInProgress,
                    },
                },
                ui: () => this.ui,
            },
        },
        set: {
            character: {
                chat: (chat, character = this.currentCharacter) =>
                    (this.chat[character.id] = chat),
                current: (character) => {
                    this.currentCharacter = character;
                },
                history: (history, character = this.currentCharacter) => {
                    if (this.history[character.id] !== history) {
                        this.history[character.id] = history;

                        if (this.kulAutosave) {
                            this.#adapter.set.messenger.data();
                        }
                    }
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
                cover: (type, value, character = this.currentCharacter) => {
                    this.covers[character.id][type] = value;
                    this.refresh();
                },
            },
            messenger: {
                data: () => {
                    if (!this.#hasNodes()) {
                        return;
                    }
                    this.saveInProgress = true;

                    this.#save().then(() => {
                        requestAnimationFrame(() => {
                            const button = this.#adapter.components.saveButton;
                            button.kulIcon = 'check';
                            button.kulLabel = 'Saved!';
                            button.kulShowSpinner = false;
                        });

                        setTimeout(() => {
                            requestAnimationFrame(
                                () => (this.saveInProgress = false)
                            );
                        }, 1000);
                    });
                },
                status: {
                    connection: (status) => (this.connectionStatus = status),
                    save: {
                        inProgress: (value) => (this.saveInProgress = value),
                    },
                },
                ui: {
                    customization: (value) => {
                        this.ui.customization = value;
                        this.refresh();
                    },
                    editing: (value, type) => {
                        this.ui.editing[type] = value;
                        this.refresh();
                    },
                    filters: (filters) => {
                        this.ui.filters = filters;
                        this.refresh();
                    },
                    options: (value, type) => {
                        this.ui.options[type] = value;
                        this.refresh();
                    },
                    panel: (
                        panel,
                        value = panel === 'left'
                            ? !this.ui.panels.isLeftCollapsed
                            : !this.ui.panels.isRightCollapsed
                    ) => {
                        switch (panel) {
                            case 'left':
                                this.ui.panels.isLeftCollapsed = value;
                                break;
                            case 'right':
                                this.ui.panels.isRightCollapsed = value;
                                break;
                        }
                        this.refresh();
                        return value;
                    },
                },
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
                timeframes: imageRootGetter('timeframes', character).value || 0,
            };
            const chat = character.children?.find((n) => n.id === 'chat');
            this.chat[character.id] = {};
            const chatCell = chat?.cells?.kulChat;
            if (chatCell) {
                const characterChat = this.chat[character.id];
                characterChat.kulEndpointUrl = chatCell.kulEndpointUrl;
                characterChat.kulMaxTokens = chatCell.kulMaxTokens;
                characterChat.kulPollingInterval = chatCell.kulPollingInterval;
                characterChat.kulTemperature = chatCell.kulTemperature;
            }
            const history = chatCell?.kulValue || chatCell?.value || [];
            this.history[character.id] = JSON.stringify(history);
            this.covers[character.id] = covers;
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
                const avatars = this.#adapter.get.image.root('avatars');
                const locations = this.#adapter.get.image.root('locations');
                const outfits = this.#adapter.get.image.root('outfits');
                const styles = this.#adapter.get.image.root('styles');
                if (this.covers[id] && avatars) {
                    avatars.value = this.covers[id].avatars;
                }
                if (this.covers[id] && locations) {
                    locations.value = this.covers[id].locations;
                }
                if (this.covers[id] && outfits) {
                    outfits.value = this.covers[id].outfits;
                }
                if (this.covers[id] && styles) {
                    styles.value = this.covers[id].styles;
                }
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
