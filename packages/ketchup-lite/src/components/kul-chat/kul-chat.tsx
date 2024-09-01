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
    VNode,
} from '@stencil/core';
import {
    KulChatChoiceMessage,
    KulChatEvent,
    KulChatProps,
    KulChatState,
} from './kul-chat-declarations';
import { kulManagerInstance } from '../../managers/kul-manager/kul-manager';
import { getProps } from '../../utils/componentUtils';
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from '../../variables/GenericVariables';
import { KulDebugComponentInfo } from '../../managers/kul-debug/kul-debug-declarations';
import { GenericObject, KulEventPayload } from '../../types/GenericTypes';
import { speechToText } from './helpers/speechToText';
import { send } from './helpers/send';

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
    @State() history: KulChatChoiceMessage[] = [];
    /**
     * State of the component.
     */
    @State() state: KulChatState = 'offline';

    /*-------------------------------------------------*/
    /*                    P r o p s                    */
    /*-------------------------------------------------*/

    /**
     * Enables customization of the component's style.
     * @default "" - No custom style applied by default.
     */
    @Prop({ mutable: true, reflect: true }) kulEndpointUrl =
        'http://localhost:5001';
    /**
     * Enables customization of the component's style.
     * @default "" - No custom style applied by default.
     */
    @Prop({ mutable: true, reflect: true }) kulStyle = '';
    /**
     * Sets the initial history of the chat.
     * @default ""
     */
    @Prop({ mutable: true, reflect: false }) kulValue = null;

    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/

    #clearButton: HTMLKulButtonElement;
    #statusinterval: NodeJS.Timeout;
    #copyTimeoutId: NodeJS.Timeout;
    #el: HTMLPreElement;
    #kulManager = kulManagerInstance();
    #textarea: HTMLKulTextfieldElement;
    #submitButton: HTMLKulButtonElement;
    #sttButton: HTMLKulButtonElement;

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
    kulEvent: EventEmitter<KulEventPayload>;

    onKulEvent(e: Event | CustomEvent, eventType: KulChatEvent) {
        this.kulEvent.emit({
            comp: this,
            eventType,
            id: this.rootElement.id,
            originalEvent: e,
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

    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/

    async #checkLLMStatus() {
        try {
            const response = await fetch(this.kulEndpointUrl);

            if (!response.ok) {
                this.state = 'offline';
            } else if (this.state === 'offline') {
                this.state = 'ready';
            }
        } catch (error) {
            this.state = 'offline';
        }
    }

    #disableInteractivity = (status: boolean) => {
        this.#clearButton.kulDisabled = status;
        this.#textarea.kulDisabled = status;
        this.#sttButton.kulDisabled = status;
        this.#submitButton.kulShowSpinner = status;
    };

    #prepChat = () => {
        const nodes: VNode[] = [];

        if (this.history?.length > 0) {
            this.history.forEach((m) => {
                const cssClass = 'kul-slim toolbar__button';
                nodes.push(
                    <div
                        class={`message-container message-container--${m.role}`}
                    >
                        <div class={m.role}>{this.#prepMessage(m)}</div>
                        <div class="toolbar">
                            <kul-button
                                class={cssClass}
                                kulIcon="delete"
                                onClick={() => {
                                    const index = this.history.indexOf(m);
                                    if (index !== -1) {
                                        this.history.splice(index, 1);
                                        this.refresh();
                                    }
                                }}
                                title="Remove this message from history."
                            ></kul-button>
                            <kul-button
                                class={cssClass}
                                kulIcon="content_copy"
                                onClick={() => {
                                    navigator.clipboard.writeText(m.content);
                                }}
                                title="Copy text to clipboard."
                            ></kul-button>
                            <kul-button
                                class={cssClass}
                                kulIcon="refresh"
                                onClick={() => {
                                    const index = this.history.indexOf(m);
                                    if (index !== -1) {
                                        this.history.splice(index, 1);
                                        this.refresh();
                                    }
                                }}
                                title="Regenerate answer."
                            ></kul-button>
                        </div>
                    </div>
                );
            });
        } else {
            nodes.push(<div class="empty">Your chat history is empty!</div>);
        }

        return nodes;
    };

    #prepConnecting: () => VNode[] = () => {
        return [
            <div class="spinner">
                <kul-spinner
                    kulActive={true}
                    kulLayout={6}
                    kulDimensions="7px"
                />
            </div>,
            <div class="title">Just a moment.</div>,
            <div class="text">Connecting you to your LLM endpoint...</div>,
        ];
    };

    #prepError: () => VNode[] = () => {
        return [
            <kul-image
                kulValue="hotel"
                kulSizeX="4em"
                kulSizeY="4em"
            ></kul-image>,
            <div class="title">Zzz...</div>,
            <div class="text">The LLM endpoint seems to be offline!</div>,
        ];
    };

    #prepMessage = (message: KulChatChoiceMessage): VNode[] => {
        const elements: VNode[] = [];
        const messageContent = message.content;

        const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
        let lastIndex = 0;

        let match: RegExpExecArray | null;
        while ((match = codeBlockRegex.exec(messageContent)) !== null) {
            if (match.index > lastIndex) {
                const textPart = messageContent.slice(lastIndex, match.index);
                elements.push(<div class="paragraph">{textPart}</div>);
            }

            const language = match[1] ? match[1].trim() : 'plaintext';
            const codePart = match[2].trim();

            elements.push(
                <kul-code kulLanguage={language} kulValue={codePart}></kul-code>
            );

            lastIndex = match.index + match[0].length;
        }

        if (lastIndex < messageContent.length) {
            const remainingText = messageContent.slice(lastIndex);
            elements.push(<div class="paragraph">{remainingText}</div>);
        }

        return elements;
    };

    #prepReady() {
        return [
            <div class="query-area">
                <kul-textfield
                    kulLabel="What's on your mind?"
                    kulStyling={'textarea'}
                    ref={(el) => {
                        if (el) {
                            this.#textarea = el;
                        }
                    }}
                ></kul-textfield>
                <div class="buttons">
                    <kul-button
                        kulIcon="clear"
                        kulLabel="Clear"
                        onClick={() => {
                            this.#textarea.setValue('');
                        }}
                        kulStyling={'flat'}
                        ref={(el) => {
                            if (el) {
                                this.#clearButton = el;
                            }
                        }}
                    ></kul-button>
                    <kul-button
                        class="stt"
                        kulIcon="keyboard_voice"
                        onClick={() => {
                            speechToText(
                                this.#kulManager,
                                this.#textarea,
                                this.#sttButton
                            );
                        }}
                        ref={(el) => {
                            if (el) {
                                this.#sttButton = el;
                            }
                        }}
                        kulStyling={'icon'}
                    >
                        <kul-spinner
                            kulActive={true}
                            kulDimensions="0.6em"
                            kulLayout={6}
                            slot="spinner"
                        ></kul-spinner>
                    </kul-button>
                    <kul-button
                        kulIcon="check"
                        kulLabel="Send"
                        onClick={() => {
                            this.#sendPrompt();
                        }}
                        ref={(el) => {
                            if (el) {
                                this.#submitButton = el;
                            }
                        }}
                    >
                        <kul-spinner
                            kulActive={true}
                            kulDimensions="0.6em"
                            slot="spinner"
                        ></kul-spinner>
                    </kul-button>
                </div>
            </div>,
            <div class={`chat-area`}>{this.#prepChat()}</div>,
        ];
    }

    async #sendPrompt() {
        this.#disableInteractivity(true);
        const success = await send(
            await this.#textarea.getValue(),
            this.history,
            this.kulEndpointUrl
        );
        if (success) {
            await this.#textarea.setValue('');
            await this.refresh();
            this.#disableInteractivity(false);
        }
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
                this.history = parsedValue;
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
        }, 2000);
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
                {this.kulStyle && (
                    <style id={KUL_STYLE_ID}>
                        {this.#kulManager.theme.setKulStyle(this)}
                    </style>
                )}
                <div id={KUL_WRAPPER_ID}>
                    <div class={`wrapper ${this.state}`}>
                        {this.state === 'ready'
                            ? this.#prepReady()
                            : this.state === 'connecting'
                              ? this.#prepConnecting()
                              : this.#prepError()}
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
