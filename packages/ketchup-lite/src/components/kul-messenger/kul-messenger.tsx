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
} from "@stencil/core";
import { kulManagerSingleton } from "src";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { GenericObject } from "src/types/GenericTypes";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "src/variables/GenericVariables";
import { KulChatStatus } from "../kul-chat/kul-chat-declarations";
import { CLEAN_UI, IMAGE_TYPE_IDS, OPTION_TYPE_IDS } from "./helpers/constants";
import {
  assignPropsToChatCell,
  extractPropsFromChatCell,
  hasNodes,
} from "./helpers/utils";
import { createAdapter } from "./kul-messenger-adapter";
import {
  KulMessengerBaseChildNode,
  KulMessengerCharacterNode,
  KulMessengerChat,
  KulMessengerChildIds,
  KulMessengerConfig,
  KulMessengerCovers,
  KulMessengerDataset,
  KulMessengerEditingStatus,
  KulMessengerEvent,
  KulMessengerEventPayload,
  KulMessengerHistory,
  KulMessengerImageTypes,
  KulMessengerUI,
  KulMessengerUnionChildIds,
} from "./kul-messenger-declarations";

@Component({
  tag: "kul-messenger",
  styleUrl: "kul-messenger.scss",
  shadow: true,
})
export class KulMessenger {
  /**
   * References the root HTML element of the component (<kul-messenger>).
   */
  @Element() rootElement: HTMLKulMessengerElement;

  //#region States
  /**
   * Debug information.
   */
  @State() debugInfo = kulManagerSingleton.debug.info.create();
  /**
   * Map of chat components with their characters.
   */
  @State() chat: KulMessengerChat = {};
  /**
   * Tracks the connection status towards the LLM endpoint.
   */
  @State() connectionStatus: KulChatStatus = "offline";
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
  @State()
  editingStatus: KulMessengerEditingStatus<KulMessengerImageTypes> =
    IMAGE_TYPE_IDS.reduce((acc, type) => {
      acc[type] = null;
      return acc;
    }, {} as KulMessengerEditingStatus<KulMessengerImageTypes>);

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
  @State() ui = CLEAN_UI();
  //#endregion

  //#region Props
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
  @Prop() kulStyle: string = "";
  /**
   * Sets the initial configuration, including active character and filters.
   * @default ""
   */
  @Prop() kulValue: KulMessengerConfig = null;
  //#endregion

  //#region Internal variables
  #adapter = createAdapter({}, {}, () => this.#adapter);
  //#endregion

  //#region Events
  @Event({
    eventName: "kul-messenger-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulMessengerEventPayload>;
  onKulEvent(e: Event | CustomEvent, eventType: KulMessengerEvent) {
    const { currentCharacter, rootElement } = this;

    const config: KulMessengerConfig = {
      currentCharacter: currentCharacter?.id,
      ui: "this.ui" as any,
    };
    this.kulEvent.emit({
      comp: this,
      id: rootElement.id,
      originalEvent: e,
      eventType,
      config,
    });
  }
  //#endregion

  //#region Public methods
  /**
   * Fetches debug information of the component's current state.
   * @returns {Promise<KulDebugLifecycleInfo>} A promise that resolves with the debug information object.
   */
  @Method()
  async getDebugInfo(): Promise<KulDebugLifecycleInfo> {
    return this.debugInfo;
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
    this.history = {};

    this.#initialize();
  }
  /**
   * Saves the current status of the messenger.
   */
  @Method()
  async save(): Promise<void> {
    this.#save();
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
  #initialize() {
    const { kulData } = this;

    if (hasNodes(this.#adapter)) {
      for (let index = 0; index < kulData.nodes.length; index++) {
        const character = kulData.nodes[index];
        this.#initCharacter(character);
      }
    }

    if (this.kulValue) {
      this.#initConfig();
    }
  }
  #initCharacter(character: KulMessengerCharacterNode) {
    const { get } = this.#adapter.controller;

    const covers: KulMessengerCovers = {
      [character.id]: IMAGE_TYPE_IDS.reduce(
        (acc, type) => {
          acc[type] =
            Number(get.image.root(type, character).value).valueOf() || 0;
          return acc;
        },
        {} as KulMessengerCovers[typeof character.id],
      ),
    };

    const chat = character.children?.find((n) => n.id === "chat");
    this.chat[character.id] = {};

    const chatCell = chat?.cells?.kulChat;
    if (chatCell) {
      extractPropsFromChatCell(chatCell, this.chat[character.id]);
    }

    const history = chatCell?.kulValue || chatCell?.value || [];
    this.history[character.id] = JSON.stringify(history);
    Object.assign(this.covers, covers);
  }
  #initConfig() {
    const currentCharacter = this.kulValue.currentCharacter;
    const filters = this.kulValue.ui?.filters || {};
    const panels = this.kulValue.ui?.panels || {};
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
  async #save() {
    const { covers, history, kulData } = this;

    for (let index = 0; index < kulData.nodes.length; index++) {
      const character = kulData.nodes[index];
      const id = character.id;
      const chatNode = character.children.find((n) => n.id === "chat");

      const { chat } = this.#adapter.controller.get.character;

      const saveChat = () => {
        if (history[id] && chatNode) {
          const historyJson = JSON.parse(history[id]);
          try {
            chatNode.cells.kulChat.value = historyJson;
          } catch (error) {
            chatNode.cells = {
              kulChat: {
                shape: "chat",
                value: historyJson,
              },
            };
          }

          const chatCell = chatNode.cells.kulChat;
          assignPropsToChatCell(chatCell, chat(character));
        }
      };

      const saveCovers = () => {
        IMAGE_TYPE_IDS.forEach((type) => {
          const root = this.#adapter.controller.get.image.root(type);

          if (covers[id] && root) {
            root.value = covers[id][type];
          }
        });
      };

      saveChat();
      saveCovers();
    }
    this.onKulEvent(new CustomEvent("save"), "save");
  }
  #prepCharacter() {
    const { controller, elements } = this.#adapter;
    const { name } = controller.get.character;
    const { avatar, biography, save, statusIcon } = elements.jsx.character;

    const isCollapsed =
      this.#adapter.controller.get.messenger.ui().panels.isLeftCollapsed;

    return (
      <div
        class={`messenger__left ${isCollapsed ? "messenger__left--collapsed" : ""}`}
      >
        <div class="messenger__avatar">
          <Fragment>
            {avatar()}
            <div class="messenger__avatar__name-wrapper">
              <div class="messenger__avatar__name">
                {statusIcon()}
                <div class="messenger__avatar__label">{name()}</div>
              </div>
              {save()}
            </div>
          </Fragment>
        </div>
        <div class="messenger__biography">{biography()}</div>
      </div>
    );
  }
  #prepChat() {
    const { chat, leftExpander, rightExpander, tabbar } =
      this.#adapter.elements.jsx.chat;

    return (
      <div class="messenger__center">
        <div class="messenger__expander messenger__expander--left">
          {leftExpander()}
        </div>
        <div class="messenger__navigation">{tabbar()}</div>
        <div class="messenger__chat">{chat()}</div>
        <div class="messenger__expander messenger__expander--right">
          {rightExpander()}
        </div>
      </div>
    );
  }
  #prepExtraContext() {
    const { back, customization } = this.#adapter.elements.jsx.options;

    const className = {
      messenger__right: true,
      "messenger__right--collapsed": ui.panels.isRightCollapsed,
      "messenger__right--customization": ui.customization,
    };

    return (
      <div class={className}>
        {ui.customization ? (
          <Fragment>
            <div class="messenger__options__filters">
              {prepFilters(adapter)}
              <div class="messenger__options__list">{prepList(adapter)}</div>
            </div>
            {back()}
          </Fragment>
        ) : (
          <Fragment>
            <div class="messenger__options__active">{this.#prepOptions()}</div>
            {customization()}
          </Fragment>
        )}
      </div>
    );
  }
  #prepOptions() {
    return OPTION_TYPE_IDS.map((opt) => {
      const { image, messenger } = this.#adapter.controller.get;
      const { asCover } = image;

      const cover = asCover(opt);
      const isEnabled = messenger.ui().options[opt];
      const option = opt.slice(0, -1);

      return (
        <div class="messenger__options__wrapper">
          {cover.node ? (
            <Fragment>
              <img
                class={`messenger__options__cover`}
                alt={cover.title}
                src={cover.value}
              ></img>
              <div
                class={`messenger__options__blocker ${!isEnabled ? "messenger__options__blocker--active" : ""}`}
                onClick={() => messenger.ui.options(!isEnabled, opt)}
              >
                <kul-image
                  kulValue={`${isEnabled ? "touch_app" : "block"}`}
                ></kul-image>
                <div class={`messenger__options__blocker__label`}>
                  {isEnabled ? "Click to disable" : "Click to enable"}
                </div>
              </div>
            </Fragment>
          ) : (
            <kul-image
              class={`messenger__options__placeholder`}
              kulValue={cover.value}
              title={`No ${option} selected.`}
            ></kul-image>
          )}
          <div class="messenger__options__name">
            <div class="messenger__options__label" title={`Active ${option}.`}>
              {option}
            </div>
            {cover.title ? (
              <kul-image
                class={`messenger__options__info`}
                kulSizeX="16px"
                kulSizeY="16px"
                kulValue="information-variant"
                title={cover.title}
              ></kul-image>
            ) : undefined}
          </div>
        </div>
      );
    });
  }
  #prepRoster() {
    const { get, set } = this.#adapter.controller;

    const avatars: VNode[] = [];

    const characters = get.character.list();
    characters.forEach((c) => {
      const image = get.image.asCover("avatars", c);
      avatars.push(
        <div
          class="selection-grid__portrait"
          onClick={() => {
            set.character.current(c);
          }}
        >
          <img
            class={"selection-grid__image"}
            src={image.value}
            title={image.title || ""}
          />
          <div class="selection-grid__name">
            <div class="selection-grid__label">{get.character.name(c)}</div>
          </div>
        </div>,
      );
    });

    return avatars?.length ? (
      avatars
    ) : (
      <div class="empty-dataset">There are no characters in your roster!</div>
    );
  }
  //#endregion

  //#region Lifecycle hooks
  componentWillLoad() {
    const { theme } = kulManagerSingleton;

    theme.register(this);
    this.#initialize();
  }
  componentDidLoad() {
    const { info } = kulManagerSingleton.debug;

    this.onKulEvent(new CustomEvent("ready"), "ready");
    info.update(this, "did-load");
  }
  componentWillRender() {
    const { info } = kulManagerSingleton.debug;

    info.update(this, "will-render");
  }
  componentDidRender() {
    const { info } = kulManagerSingleton.debug;

    info.update(this, "did-render");
  }
  render() {
    const { theme } = kulManagerSingleton;

    if (!this.#hasNodes()) {
      return;
    }

    const { kulStyle } = this;

    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{theme.setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID}>
          {this.currentCharacter ? (
            <div class="messenger">
              {this.#prepCharacter()}
              {this.#prepChat()}
              {this.#prepOptions()}
            </div>
          ) : (
            <div class="roster">{this.#prepRoster()}</div>
          )}
        </div>
      </Host>
    );
  }
  disconnectedCallback() {
    const { theme } = kulManagerSingleton;

    theme.unregister(this);
  }
  //#endregion
}
