import {
    Component,
    Element,
    Event,
    EventEmitter,
    forceUpdate,
    Fragment,
    h,
    Host,
    Method,
    Prop,
    State,
    VNode,
} from '@stencil/core';
import {
    KulChatAdapter,
    KulChatChoiceMessage,
    KulChatEvent,
    KulChatEventPayload,
    KulChatHistory,
    KulChatLayout,
    KulChatProps,
    KulChatSendArguments,
    KulChatStatus,
    KulChatView,
} from './kul-chat-declarations';
import { kulManagerInstance } from '../../managers/kul-manager/kul-manager';
import { getProps } from '../../utils/componentUtils';
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from '../../variables/GenericVariables';
import { KulDebugComponentInfo } from '../../managers/kul-debug/kul-debug-declarations';
import { GenericObject } from '../../types/GenericTypes';
import { speechToText } from './helpers/speechToText';
import { send } from './helpers/send';
import { prepSettings } from './settings/settings';
import { prepChat } from './chat/chat';

@Component({
    tag: 'kul-chat',
    styleUrl: 'kul-chat.scss',
    shadow: true,
})
export class KulChat {
    /**
     * References the root HTML element of the component (<kul-chat>).
     */
    @Element() rootElement: HTMLKulChatElement;

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
     * History of the messages.
     */
    @State() history: KulChatHistory = [];
    /**
     * Message currently hovered (to display toolbar)
     */
    @State() toolbarMessage: KulChatChoiceMessage;
    /**
     * State of the connection.
     */
    @State() status: KulChatStatus = 'connecting';
    /**
     * State of the connection.
     */
    @State() view: KulChatView = 'chat';

    /*-------------------------------------------------*/
    /*                    P r o p s                    */
    /*-------------------------------------------------*/

    /**
     * Enables customization of the component's style.
     * @default "" - No custom style applied by default.
     */
    @Prop({ mutable: true }) kulEndpointUrl = 'http://localhost:5001';
    /**
     * Sets the layout of the chat.
     * @default ""
     */
    @Prop({ mutable: true, reflect: true }) kulLayout: KulChatLayout =
        'top-textarea';
    /**
     * The maximum amount of tokens allowed in the LLM's answer.
     * @default ""
     */
    @Prop({ mutable: true }) kulMaxTokens = 250;
    /**
     * How often the component checks whether the LLM endpoint is online or not.
     * @default 10000
     */
    @Prop({ mutable: false }) kulPollingInterval = 10000;
    /**
     * The seed of the LLM's answer.
     * @default ""
     */
    @Prop({ mutable: true }) kulSeed = -1;
    /**
     * Enables customization of the component's style.
     * @default "" - No custom style applied by default.
     */
    @Prop({ mutable: true, reflect: true }) kulStyle = '';
    /**
     * System message for the LLM.
     * @default ""
     */
    @Prop({ mutable: true }) kulSystem =
        'You are a helpful and cheerful assistant eager to help the user out with his tasks.';
    /**
     * Sets the creative boundaries of the LLM.
     * @default ""
     */
    @Prop({ mutable: true }) kulTemperature = 0.7;
    /**
     * Sets the initial history of the chat.
     * @default ""
     */
    @Prop({ mutable: true }) kulValue: KulChatHistory = [];

    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/

    #kulManager = kulManagerInstance();
    #statusinterval: NodeJS.Timeout;

    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/

    /**
     * Describes event emitted.
     */
    @Event({
        eventName: 'kul-chat-event',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kulEvent: EventEmitter<KulChatEventPayload>;

    onKulEvent(e: Event | CustomEvent, eventType: KulChatEvent) {
        this.kulEvent.emit({
            comp: this,
            eventType,
            id: this.rootElement.id,
            originalEvent: e,
            history: JSON.stringify(this.history) || '',
            status: this.status,
        });
    }

    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/

    /**
     * Retrieves the debug information reflecting the current state of the component.
     * @returns {Promise<KulDebugComponentInfo>} A promise that resolves to a KulDebugComponentInfo object containing debug information.
     */
    @Method()
    async getDebugInfo(): Promise<KulDebugComponentInfo> {
        return this.debugInfo;
    }
    /**
     * Returns the full history as a string.
     * @returns {Promise<string>} Full history of the chat.
     */
    @Method()
    async getHistory(): Promise<string> {
        try {
            return JSON.stringify(this.history);
        } catch {
            return '';
        }
    }
    /**
     * Returns the last message as a string.
     * @returns {Promise<string>} The last message of the history.
     */
    @Method()
    async getLastMessage(): Promise<string> {
        return this.history?.slice(-1)?.[0]?.content ?? '';
    }
    /**
     * Retrieves the properties of the component, with optional descriptions.
     * @param {boolean} descriptions - If true, returns properties with descriptions; otherwise, returns properties only.
     * @returns {Promise<GenericObject>} A promise that resolves to an object where each key is a property name, optionally with its description.
     */
    @Method()
    async getProps(descriptions?: boolean): Promise<GenericObject> {
        return getProps(this, KulChatProps, descriptions);
    }
    /**
     * Triggers a re-render of the component to reflect any state changes.
     */
    @Method()
    async refresh(): Promise<void> {
        forceUpdate(this);
    }
    /**
     * Sets the history of the component through a string.
     */
    @Method()
    async setHistory(history: string): Promise<void> {
        try {
            const cb = () => (this.history = JSON.parse(history));
            this.#updateHistory(cb);
        } catch {}
    }

    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/

    #adapter: KulChatAdapter = {
        actions: {
            delete: (m) => {
                const index = this.history.indexOf(m);
                if (index !== -1) {
                    const cb = () => this.history.splice(index, 1);
                    this.#updateHistory(cb);
                    this.refresh();
                }
            },
            disableInteractivity: (shouldDisable) => {
                this.#adapter.components.buttons.send.kulShowSpinner =
                    shouldDisable;
                this.#adapter.components.textarea.kulDisabled = shouldDisable;
                this.#adapter.components.buttons.stt.kulDisabled =
                    shouldDisable;
            },
            regenerate: (m) => {
                const index = this.history.indexOf(m);
                if (index !== -1) {
                    const cb = () =>
                        (this.history = this.history.slice(0, index + 1));
                    this.#updateHistory(cb);
                    this.#sendPrompt();
                }
            },
            send: (prompt) => {
                const newMessage: KulChatChoiceMessage = {
                    role: 'user',
                    content: prompt,
                };
                const cb = () => (this.history = [...this.history, newMessage]);
                this.#updateHistory(cb);
                this.#sendPrompt();
            },
            stt: () =>
                speechToText(
                    this.#kulManager,
                    this.#adapter.get.ui.textarea(),
                    this.#adapter.get.ui.button.stt()
                ),
        },
        components: {
            buttons: {
                clear: null,
                send: null,
                settings: null,
                stt: null,
            },
            spinner: null,
            textarea: null,
        },
        emit: {
            event: (eventType, e = new CustomEvent(eventType)) => {
                this.onKulEvent(e, eventType);
            },
        },
        get: {
            history: () => this.history,
            status: {
                connection: () => this.status,
                toolbarMessage: () => this.toolbarMessage,
                view: () => this.view,
            },
            props: {
                endpointUrl: () => this.kulEndpointUrl,
                maxTokens: () => this.kulMaxTokens,
                pollingInterval: () => this.kulPollingInterval,
                system: () => this.kulSystem,
                temperature: () => this.kulTemperature,
            },
            ui: {
                button: {
                    clear: () => this.#adapter.components.buttons.clear,
                    send: () => this.#adapter.components.buttons.send,
                    settings: () => this.#adapter.components.buttons.settings,
                    stt: () => this.#adapter.components.buttons.stt,
                },
                spinner: () => this.#adapter.components.spinner,
                textarea: () => this.#adapter.components.textarea,
            },
        },
        set: {
            props: {
                endpointUrl: (value) => (this.kulEndpointUrl = value),
                maxTokens: (value) => (this.kulMaxTokens = value),
                pollingInterval: (value) => (this.kulPollingInterval = value),
                system: (value) => (this.kulSystem = value),
                temperature: (value) => (this.kulTemperature = value),
            },
            status: {
                connection: (status) => (this.status = status),
                toolbarMessage: (element) => (this.toolbarMessage = element),
                view: (view) => (this.view = view),
            },
            ui: {
                button: {
                    clear: (button) => {
                        this.#adapter.components.buttons.clear = button;
                    },
                    send: (button) => {
                        this.#adapter.components.buttons.send = button;
                    },
                    settings: (button) => {
                        this.#adapter.components.buttons.settings = button;
                    },
                    stt: (button) => {
                        this.#adapter.components.buttons.stt = button;
                    },
                },
                spinner: (spinner) => {
                    this.#adapter.components.spinner = spinner;
                },
                textarea: (textarea) => {
                    this.#adapter.components.textarea = textarea;
                },
            },
        },
    };

    async #checkLLMStatus() {
        if (this.status === 'offline') {
            this.status = 'connecting';
        }
        try {
            const response = await fetch(this.kulEndpointUrl);

            if (!response.ok) {
                this.status = 'offline';
            } else {
                this.status = 'ready';
            }
        } catch (error) {
            this.status = 'offline';
        }
        this.onKulEvent(new CustomEvent('polling'), 'polling');
    }

    #prepConnecting: () => VNode[] = () => {
        return (
            <Fragment>
                <div class="spinner">
                    <kul-spinner
                        kulActive={true}
                        kulLayout={6}
                        kulDimensions="7px"
                    />
                </div>
                <div class="chat__title">Just a moment.</div>
                <div class="chat__text">Contacting your LLM endpoint...</div>
            </Fragment>
        );
    };

    #prepOffline: () => VNode[] = () => {
        return (
            <Fragment>
                <div class="chat__error">
                    <kul-image
                        kulValue="hotel"
                        kulSizeX="4em"
                        kulSizeY="4em"
                    ></kul-image>
                    <div class="chat__title">Zzz...</div>
                    <div class="chat__text">
                        The LLM endpoint seems to be offline!
                    </div>
                </div>
                <kul-button
                    class="chat__config kul-full-width"
                    kulIcon="wrench"
                    kulLabel="Configuration"
                    kulStyling="flat"
                    onKul-button-event={(e) => {
                        const { eventType } = e.detail;
                        switch (eventType) {
                            case 'click':
                                this.#adapter.set.status.view('settings');
                                break;
                        }
                    }}
                ></kul-button>
            </Fragment>
        );
    };

    async #sendPrompt() {
        const disabler = this.#adapter.actions.disableInteractivity;
        const textarea = this.#adapter.get.ui.textarea();
        this.#adapter.components.spinner.kulActive = true;
        requestAnimationFrame(() => disabler(true));

        const sendArgs: KulChatSendArguments = {
            history: this.history,
            max_tokens: this.kulMaxTokens,
            seed: this.kulSeed,
            system: this.kulSystem,
            temperature: this.kulTemperature,
            url: this.kulEndpointUrl,
        };

        const llmMessage = await send(sendArgs);
        if (llmMessage) {
            const cb = () => this.history.push(llmMessage);
            this.#updateHistory(cb);
            await this.refresh();
            disabler(false);
            this.#adapter.get.ui.spinner().kulActive = false;
            await textarea.setValue('');
            await textarea.setFocus();
        } else {
            const cb = () => this.history.pop();
            this.#updateHistory(cb);
        }
    }

    #updateHistory(cb: () => unknown) {
        cb();
        this.onKulEvent(new CustomEvent('update'), 'update');
    }

    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/

    componentWillLoad() {
        this.#kulManager.theme.register(this);
        if (this.kulValue) {
            try {
                const parsedValue =
                    typeof this.kulValue === 'string'
                        ? JSON.parse(this.kulValue)
                        : this.kulValue;
                const cb = () => (this.history = parsedValue);
                this.#updateHistory(cb);
            } catch (error) {
                this.#kulManager.debug.logMessage(
                    this,
                    "Couldn't set value for chat history",
                    'warning'
                );
            }
        }
    }

    componentDidLoad() {
        this.#statusinterval = setInterval(() => {
            this.#checkLLMStatus();
        }, this.kulPollingInterval);
        this.onKulEvent(new CustomEvent('ready'), 'ready');
        this.#checkLLMStatus();
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
                {this.kulStyle && (
                    <style id={KUL_STYLE_ID}>
                        {this.#kulManager.theme.setKulStyle(this)}
                    </style>
                )}
                <div id={KUL_WRAPPER_ID}>
                    <div
                        class={`${this.view} ${this.view}--${this.kulLayout} ${this.view}--${this.status}`}
                    >
                        {this.view === 'settings'
                            ? prepSettings(this.#adapter)
                            : this.status === 'ready'
                              ? prepChat(this.#adapter)
                              : this.status === 'connecting'
                                ? this.#prepConnecting()
                                : this.#prepOffline()}
                    </div>
                </div>
            </Host>
        );
    }

    disconnectedCallback() {
        clearInterval(this.#statusinterval);
        this.#kulManager.theme.unregister(this);
    }
}
