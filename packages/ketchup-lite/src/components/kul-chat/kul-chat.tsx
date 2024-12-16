import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  Fragment,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";

import { kulManagerSingleton } from "src";
import {
  createElements,
  createHandlers,
  createRefs,
} from "src/components/kul-chat/helpers/kul-chat-hub";
import {
  calcTokens,
  submitPrompt,
} from "src/components/kul-chat/helpers/kul-chat-utils";
import {
  KulChatAdapter,
  KulChatEvent,
  KulChatEventPayload,
  KulChatHistory,
  KulChatLayout,
  KulChatStatus,
  KulChatView,
} from "src/components/kul-chat/kul-chat-declarations";
import { KulTypewriterPropsInterface } from "src/components/kul-typewriter/kul-typewriter-declarations";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { KulLLMChoiceMessage } from "src/managers/kul-llm/kul-llm-declarations";
import { GenericObject } from "src/types/GenericTypes";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "src/variables/GenericVariables";

@Component({
  tag: "kul-chat",
  styleUrl: "kul-chat.scss",
  shadow: true,
})
export class KulChat {
  /**
   * References the root HTML element of the component (<kul-chat>).
   */
  @Element() rootElement: HTMLKulChatElement;

  //#region States
  /**
   * Debug information.
   */
  @State() debugInfo: KulDebugLifecycleInfo = {
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
   * The textual request currently elaborated.
   */
  @State() currentPrompt: KulLLMChoiceMessage;
  /**
   * The amount of tokens currently used.
   */
  @State() currentTokens = 0;
  /**
   * State of the connection.
   */
  @State() status: KulChatStatus = "connecting";
  /**
   * Message currently hovered (to display toolbar)
   */
  @State() toolbarMessage: KulLLMChoiceMessage;
  /**
   * State of the connection.
   */
  @State() view: KulChatView = "chat";
  //#endregion

  //#region Props
  /**
   * How many tokens the context window can handle, used to calculate the occupied space.
   * @default ""
   */
  @Prop({ mutable: true }) kulContextWindow = 8192;
  /**
   * Enables customization of the component's style.
   * @default "" - No custom style applied by default.
   */
  @Prop({ mutable: true }) kulEndpointUrl = "http://localhost:5001";
  /**
   * Sets the layout of the chat.
   * @default ""
   */
  @Prop({ mutable: true, reflect: true }) kulLayout: KulChatLayout =
    "top-textarea";
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
  @Prop({ mutable: true }) kulStyle = "";
  /**
   * System message for the LLM.
   * @default ""
   */
  @Prop({ mutable: true }) kulSystem =
    "You are a helpful and cheerful assistant eager to help the user out with his tasks.";
  /**
   * Sets the creative boundaries of the LLM.
   * @default ""
   */
  @Prop({ mutable: true }) kulTemperature = 0.7;
  /**
   * Sets the props of the assistant typewriter component. Set this prop to false to replace the typewriter with a simple text element.
   * @default ""
   */
  @Prop({ mutable: true }) kulTypewriterProps: KulTypewriterPropsInterface = {
    kulDeleteSpeed: 10,
    kulTag: "p",
    kulSpeed: 20,
  };
  /**
   * Sets the initial history of the chat.
   * @default ""
   */
  @Prop({ mutable: true }) kulValue: KulChatHistory = [];
  //#endregion

  //#region Internal variables
  #statusinterval: NodeJS.Timeout;
  #adapter: KulChatAdapter = {
    handlers: null,
    state: {
      get: {
        compInstance: this,
        currentPrompt: () => this.currentPrompt,
        currentTokens: () => this.currentTokens,
        history: () => this.history,
        newPrompt: async () => {
          const { textarea } = this.#adapter.elements.refs.chat;

          await textarea.setBlur();
          const message = await textarea.getValue();
          if (message) {
            const newMessage: KulLLMChoiceMessage = {
              role: "user",
              content: message,
            };
            return newMessage;
          }
        },
        status: () => this.status,
        toolbarMessage: () => this.toolbarMessage,
        view: () => this.view,
      },
      set: {
        currentPrompt: (value) => (this.currentPrompt = value),
        currentTokens: (value) => (this.currentTokens = value),
        history: async (cb) => {
          cb();
          this.currentTokens = await calcTokens(this.#adapter);
          this.onKulEvent(new CustomEvent("update"), "update");
        },
        status: (status) => (this.status = status),
        toolbarMessage: (element) => (this.toolbarMessage = element),
        view: (view) => (this.view = view),
      },
    },
    elements: {
      jsx: null,
      refs: createRefs(),
    },
  };
  //#endregion

  //#region Events
  @Event({
    eventName: "kul-chat-event",
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
      history: JSON.stringify(this.history) || "",
      status: this.status,
    });
  }
  //#endregion

  //#region Listeners
  @Listen("keydown")
  listenKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case "Enter":
        if (e.ctrlKey) {
          e.preventDefault();
          e.stopPropagation();
          submitPrompt(this.#adapter);
        }
        break;
      default:
        e.stopPropagation();
    }
  }
  //#endregion

  //#region Watchers
  @Watch("kulSystem")
  async updateTokensCount() {
    this.currentTokens = await calcTokens(this.#adapter);
  }
  //#endregion

  //#region Public methods
  /**
   * Retrieves the debug information reflecting the current state of the component.
   * @returns {Promise<KulDebugLifecycleInfo>} A promise that resolves to a KulDebugLifecycleInfo object containing debug information.
   */
  @Method()
  async getDebugInfo(): Promise<KulDebugLifecycleInfo> {
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
      return "";
    }
  }
  /**
   * Returns the last message as a string.
   * @returns {Promise<string>} The last message of the history.
   */
  @Method()
  async getLastMessage(): Promise<string> {
    return this.history?.slice(-1)?.[0]?.content ?? "";
  }
  /**
   * Used to retrieve component's properties and descriptions.
   * @returns {Promise<GenericObject>} Promise resolved with an object containing the component's properties.
   */
  @Method()
  async getProps(): Promise<GenericObject> {
    const { getProps } = kulManagerSingleton;

    return getProps(this);
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
    const { set } = this.#adapter.state;

    try {
      set.history(() => (this.history = JSON.parse(history)));
    } catch {}
  }
  /**
   * Initiates the unmount sequence, which removes the component from the DOM after a delay.
   * @param {number} ms - Number of milliseconds
   */
  @Method()
  async unmount(ms: number = 0): Promise<void> {
    setTimeout(() => {
      this.onKulEvent(new CustomEvent("unmount"), "unmount");
      this.rootElement.remove();
    }, ms);
  }
  //#endregion

  //#region Private methods
  async #checkLLMStatus() {
    const { llm } = kulManagerSingleton;

    if (this.status === "offline") {
      this.status = "connecting";
    }
    try {
      const response = await llm.poll(this.kulEndpointUrl);

      if (!response.ok) {
        this.status = "offline";
      } else {
        this.status = "ready";
      }
    } catch (error) {
      this.status = "offline";
    }
    this.onKulEvent(new CustomEvent("polling"), "polling");
  }
  #prepChat = (): VNode => {
    const { clear, progressbar, send, settings, spinner, stt, textarea } =
      this.#adapter.elements.jsx.chat;

    return (
      <Fragment>
        <div class="chat__request">
          <div class="chat__request__input">
            {settings()}
            {textarea()}
            {progressbar()}
          </div>
          <div class="chat__request__buttons">
            {clear()}
            {stt()}
            {send()}
          </div>
        </div>
        <div class={`chat__messages`}>
          {this.history?.length ? (
            this.history.map((m) => (
              <div
                class={`chat__messages__container chat__messages__container--${m.role}`}
                onPointerEnter={() => (this.toolbarMessage = m)}
                onPointerLeave={() => (this.toolbarMessage = null)}
              >
                <div
                  class={`chat__messages__content chat__messages__content--${m.role}`}
                >
                  {this.#prepContent(m)}
                </div>
                {m === this.toolbarMessage ? this.#prepToolbar(m) : null}
              </div>
            ))
          ) : (
            <div class="chat__messages__empty">Your chat history is empty!</div>
          )}
        </div>
        <div class="chat__spinner-bar">{spinner()}</div>
      </Fragment>
    );
  };
  #prepConnecting: () => VNode[] = () => {
    return (
      <Fragment>
        <div class="spinner">
          <kul-spinner kulActive={true} kulLayout={6} kulDimensions="7px" />
        </div>
        <div class="chat__title">Just a moment.</div>
        <div class="chat__text">Contacting your LLM endpoint...</div>
      </Fragment>
    );
  };
  #prepContent = (message: KulLLMChoiceMessage): VNode[] => {
    const { kulTypewriterProps } = this;

    const useTypewriter = !!(
      message.role === "assistant" &&
      typeof kulTypewriterProps === "object" &&
      kulTypewriterProps !== null
    );

    const elements: VNode[] = [];
    const messageContent = message.content;

    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let lastIndex = 0;

    let match: RegExpExecArray | null;
    while ((match = codeBlockRegex.exec(messageContent)) !== null) {
      if (match.index > lastIndex) {
        const textPart = messageContent.slice(lastIndex, match.index);
        elements.push(
          useTypewriter ? (
            <kul-typewriter
              class="chat__messages__paragraph"
              {...kulTypewriterProps}
              kulValue={textPart}
            ></kul-typewriter>
          ) : (
            <div class="paragraph">{textPart}</div>
          ),
        );
      }

      const language = match[1] ? match[1].trim() : "text";
      const codePart = match[2].trim();

      elements.push(
        <kul-code
          class={"chat__messages__code"}
          kulLanguage={language}
          kulValue={codePart}
        ></kul-code>,
      );

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < messageContent.length) {
      const remainingText = messageContent.slice(lastIndex);
      elements.push(<div class="paragraph">{remainingText}</div>);
    }

    return elements;
  };
  #prepOffline: () => VNode[] = () => {
    const { set } = this.#adapter.state;

    return (
      <Fragment>
        <div class="chat__error">
          <kul-image kulValue="hotel" kulSizeX="4em" kulSizeY="4em"></kul-image>
          <div class="chat__title">Zzz...</div>
          <div class="chat__text">The LLM endpoint seems to be offline!</div>
        </div>
        <kul-button
          class="chat__config kul-full-width"
          kulIcon="wrench"
          kulLabel="Configuration"
          kulStyling="flat"
          onKul-button-event={(e) => {
            const { eventType } = e.detail;
            switch (eventType) {
              case "click":
                set.view("settings");
                break;
            }
          }}
        ></kul-button>
      </Fragment>
    );
  };
  #prepSettings = () => {
    const { back, endpoint, maxTokens, polling, system, temperature } =
      this.#adapter.elements.jsx.settings;

    return (
      <Fragment>
        {back()}
        <div class="settings__options">
          {endpoint()}
          {temperature()}
          {maxTokens()}
          {polling()}
        </div>
        {system()}
      </Fragment>
    );
  };
  #prepToolbar = (m: KulLLMChoiceMessage): VNode => {
    const { copyContent, deleteMessage, regenerate } =
      this.#adapter.elements.jsx.toolbar;

    return (
      <div class="chat__messages__toolbar">
        {deleteMessage(m)}
        {copyContent(m)}
        {m.role === "user" && regenerate(m)}
      </div>
    );
  };
  //#endregion

  //#region Lifecycle hooks
  componentWillLoad() {
    const { debug, theme } = kulManagerSingleton;

    theme.register(this);

    this.#adapter.handlers = createHandlers(this.#adapter);
    this.#adapter.elements.jsx = createElements(this.#adapter);

    const { set } = this.#adapter.state;

    if (this.kulValue) {
      try {
        const parsedValue =
          typeof this.kulValue === "string"
            ? JSON.parse(this.kulValue)
            : this.kulValue;
        set.history(() => (this.history = parsedValue));
      } catch (error) {
        debug.logs.new(this, "Couldn't set value for chat history", "warning");
      }
    }
  }
  componentDidLoad() {
    const { debug } = kulManagerSingleton;

    this.#statusinterval = setInterval(() => {
      this.#checkLLMStatus();
    }, this.kulPollingInterval);
    this.onKulEvent(new CustomEvent("ready"), "ready");
    this.#checkLLMStatus();
    debug.updateDebugInfo(this, "did-load");
  }
  componentWillRender() {
    const { debug } = kulManagerSingleton;

    debug.updateDebugInfo(this, "will-render");
  }
  componentDidRender() {
    const { debug } = kulManagerSingleton;

    debug.updateDebugInfo(this, "did-render");
  }
  render() {
    const { theme } = kulManagerSingleton;

    return (
      <Host>
        {this.kulStyle && (
          <style id={KUL_STYLE_ID}>{theme.setKulStyle(this)}</style>
        )}
        <div id={KUL_WRAPPER_ID}>
          <div
            class={`${this.view} ${this.view}--${this.kulLayout} ${this.view}--${this.status}`}
          >
            {this.view === "settings"
              ? this.#prepSettings()
              : this.status === "ready"
                ? this.#prepChat()
                : this.status === "connecting"
                  ? this.#prepConnecting()
                  : this.#prepOffline()}
          </div>
        </div>
      </Host>
    );
  }
  disconnectedCallback() {
    const { theme } = kulManagerSingleton;

    clearInterval(this.#statusinterval);
    theme.unregister(this);
  }
  //#endregion
}
