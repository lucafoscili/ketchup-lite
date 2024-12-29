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
import { kulManager } from "src/global/global";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import {
  KUL_ATTRIBUTES,
  KUL_STYLE_ID,
  KUL_WRAPPER_ID,
} from "src/utils/constants";
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
  KulMessengerFilters,
  KulMessengerHistory,
  KulMessengerImageTypes,
  KulMessengerPanels,
  KulMessengerPropsInterface,
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
  @State() debugInfo = kulManager.debug.info.create();
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
   * Maps an active form with the id of its related node.
   */
  @State()
  formStatusMap: KulMessengerEditingStatus<KulMessengerImageTypes> =
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
  #adapter = createAdapter(
    { compInstance: this, manager: kulManager },
    () => this.#adapter,
  );
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
    const { currentCharacter, rootElement, ui } = this;

    const config: KulMessengerConfig = {
      currentCharacter: currentCharacter?.id,
      ui,
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
   * Deletes the options identified by the node and type.
   * @param {KulMessengerBaseChildNode<KulMessengerUnionChildIds>} node - The node to delete.
   * @param {KulMessengerImageTypes} type - The type of the node.
   */
  @Method()
  async deleteOption(
    node: KulMessengerBaseChildNode<KulMessengerUnionChildIds>,
    type: KulMessengerImageTypes,
  ): Promise<void> {
    const { root } = this.#adapter.controller.get.image;

    const rootNode = root(type);
    const idx = rootNode.children.indexOf(node);
    if (idx > -1) {
      rootNode.children.splice(idx, 1);
      this.refresh();
    }
  }
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
   * @returns {Promise<KulMessengerPropsInterface>} Promise resolved with an object containing the component's properties.
   */
  @Method()
  async getProps(): Promise<KulMessengerPropsInterface> {
    const { getProps } = kulManager;

    return getProps(this) as KulMessengerPropsInterface;
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
  #initialize = () => {
    const { kulData, kulValue } = this;

    if (hasNodes(this.#adapter)) {
      for (let index = 0; index < kulData.nodes.length; index++) {
        const character = kulData.nodes[index];
        this.#initCharacter(character);
      }
    }

    if (kulValue) {
      this.#initConfig();
    }
  };
  #initCharacter = (character: KulMessengerCharacterNode) => {
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
  };
  #initConfig = () => {
    const { byId } = this.#adapter.controller.get.character;
    const { kulValue } = this;

    const currentCharacter = kulValue.currentCharacter;
    const filters = kulValue.ui?.filters || CLEAN_UI().filters;
    const panels = kulValue.ui?.panels || CLEAN_UI().panels;

    if (currentCharacter) {
      this.currentCharacter = byId(currentCharacter);
    }

    for (const key in filters) {
      if (Object.prototype.hasOwnProperty.call(filters, key)) {
        const k = key as keyof KulMessengerFilters;
        const filter = filters[k];
        this.ui.filters[k] = filter;
      }
    }
    for (const key in panels) {
      if (Object.prototype.hasOwnProperty.call(panels, key)) {
        const k = key as keyof KulMessengerPanels;
        const panel = panels[k];
        this.ui.panels[k] = panel;
      }
    }
  };
  #save = async () => {
    const { get, set } = this.#adapter.controller;
    const { save } = this.#adapter.elements.refs.character;
    const { covers, history, kulData } = this;

    requestAnimationFrame(() => set.status.save.inProgress(true));

    for (let index = 0; index < kulData.nodes.length; index++) {
      const character = kulData.nodes[index];
      const id = character.id;
      const chatNode = character.children.find((n) => n.id === "chat");

      const { chat } = get.character;

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

    requestAnimationFrame(async () => {
      setTimeout(
        () =>
          requestAnimationFrame(async () => {
            set.status.save.inProgress(false);
            save.setMessage("Saved!", "check");
          }),
        800,
      );
    });
  };
  #prepCharacter = (): VNode => {
    const { bemClass } = kulManager.theme;

    const { controller, elements } = this.#adapter;
    const { name } = controller.get.character;
    const { avatar, biography, save, statusIcon } = elements.jsx.character;
    const { isLeftCollapsed } = this.ui.panels;

    return (
      <div
        class={bemClass("character", null, {
          collapsed: isLeftCollapsed,
        })}
      >
        <div class={bemClass("character", "avatar")}>
          {avatar()}
          <div class={bemClass("character", "name-wrapper")}>
            <div class={bemClass("character", "name")}>
              {statusIcon()}
              <div class={bemClass("character", "label")}>{name()}</div>
            </div>
            {save()}
          </div>
        </div>
        <div class={bemClass("character", "biography")}>{biography()}</div>
      </div>
    );
  };
  #prepChat = (): VNode => {
    const { bemClass } = kulManager.theme;

    const { chat, leftExpander, rightExpander, tabbar } =
      this.#adapter.elements.jsx.chat;

    return (
      <div class={bemClass("chat")}>
        <div
          class={bemClass("chat", "expander", {
            left: true,
          })}
        >
          {leftExpander()}
        </div>
        <div class={bemClass("chat", "navigation")}>{tabbar()}</div>
        <div class={bemClass("chat", "chat")}>{chat()}</div>
        <div
          class={bemClass("chat", "expander", {
            right: true,
          })}
        >
          {rightExpander()}
        </div>
      </div>
    );
  };
  #prepCovers = (type: KulMessengerImageTypes, images: VNode[]): VNode => {
    const { bemClass } = kulManager.theme;

    const { add } = this.#adapter.elements.jsx.customization.form[type];

    return (
      <Fragment>
        <div class={bemClass("covers")}>
          <div class={bemClass("covers", "title")}>
            <div class={bemClass("covers", "label")}>{type}</div>
            {add()}
          </div>
          <div class={bemClass("covers", "images")}>{images}</div>
        </div>
      </Fragment>
    );
  };
  #prepExtraContext = (): VNode => {
    const { bemClass } = kulManager.theme;

    const { customization, options } = this.#adapter.elements.jsx;
    const { back, customize } = options;
    const { filters } = customization;
    const { customizationView } = this.ui;
    const { isRightCollapsed } = this.ui.panels;

    return (
      <div
        class={bemClass("extra-context", null, {
          collapsed: isRightCollapsed,
          customization: customizationView,
        })}
      >
        {customizationView ? (
          <Fragment>
            {filters()}
            <div class={bemClass("extra-context", "list")}>
              {this.#prepList()}
            </div>
            {back()}
          </Fragment>
        ) : (
          <Fragment>
            <div class={bemClass("extra-context", "options")}>
              {this.#prepOptions()}
            </div>
            {customize()}
          </Fragment>
        )}
      </div>
    );
  };
  #prepForm = (type: KulMessengerImageTypes): VNode => {
    const { bemClass } = kulManager.theme;

    const { cancel, confirm, description, id, imageUrl, title } =
      this.#adapter.elements.jsx.customization.form[type];

    const nodeId = this.formStatusMap[type];
    const rootChildren = this.#adapter.controller.get.image.byType(type);
    const node = rootChildren.find((n) => n.id === nodeId);

    return (
      <div class={bemClass("form")}>
        <div class={bemClass("form", "label")}>Create {type}</div>
        {id(nodeId)}
        {title(node)}
        {description(node)}
        {imageUrl(node)}
        <div class={bemClass("form", "confirm")}>
          {cancel()}
          {confirm()}
        </div>
      </div>
    );
  };
  #prepList = (): VNode => {
    const { bemClass } = kulManager.theme;

    const { controller, elements, handlers } = this.#adapter;
    const { byType, coverIndex, title } = controller.get.image;
    const { edit, remove } = elements.jsx.customization.list;
    const { image } = handlers.customization;
    const { formStatusMap, hoveredCustomizationOption, ui } = this;
    const { filters } = ui;

    return (
      <Fragment>
        {IMAGE_TYPE_IDS.map((type) => {
          if (filters[type]) {
            const isFormActive = formStatusMap[type];
            const activeIndex = coverIndex(type);
            const images: VNode[] = byType(type).map((node, j) => (
              <div
                class={bemClass("list", null, {
                  selected: activeIndex === j,
                })}
                onClick={(e) => image(e, node, j)}
                onPointerEnter={() => {
                  if (activeIndex !== j) {
                    this.hoveredCustomizationOption = node;
                  }
                }}
                onPointerLeave={() => (this.hoveredCustomizationOption = null)}
              >
                <img
                  alt={title(node)}
                  class={bemClass("list", "image")}
                  data-kul={KUL_ATTRIBUTES.fadeIn}
                  src={node.cells.kulImage.value}
                  title={title(node)}
                />
                {hoveredCustomizationOption === node && (
                  <div
                    class={bemClass("list", "actions")}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {edit(type, node)}
                    {remove(type, node)}
                  </div>
                )}
              </div>
            ));
            return (
              <Fragment>
                {isFormActive
                  ? this.#prepForm(type)
                  : this.#prepCovers(type, images)}
              </Fragment>
            );
          }
          return null;
        })}
      </Fragment>
    );
  };
  #prepOptions = (): VNode[] => {
    const { bemClass } = kulManager.theme;

    return OPTION_TYPE_IDS.map((opt) => {
      const { image } = this.#adapter.controller.get;
      const { asCover } = image;
      const { ui } = this;

      const { value, node, title } = asCover(opt);
      const isEnabled = ui.options[opt];
      const option = opt.slice(0, -1);

      return (
        <div class={bemClass("options", "wrapper")}>
          {node ? (
            <Fragment>
              <img
                alt={title}
                class={bemClass("options", "cover")}
                data-kul={KUL_ATTRIBUTES.fadeIn}
                src={value}
              ></img>
              <div
                class={bemClass("options", "blocker", {
                  active: !isEnabled,
                })}
                onClick={() => {
                  ui.options[opt] = !isEnabled;
                  this.refresh();
                }}
              >
                <kul-image
                  kulValue={`${isEnabled ? "touch_app" : "block"}`}
                ></kul-image>
                <div class={bemClass("options", "blocker-label")}>
                  {isEnabled ? "Click to disable" : "Click to enable"}
                </div>
              </div>
            </Fragment>
          ) : (
            <kul-image
              class={bemClass("options", "placeholder")}
              kulValue={value}
              title={`No ${option} selected.`}
            ></kul-image>
          )}
          <div class={bemClass("options", "name")}>
            <div
              class={bemClass("options", "label")}
              title={`Active ${option}.`}
            >
              {option}
            </div>
            {title && (
              <kul-image
                class={bemClass("options", "info")}
                kulSizeX="16px"
                kulSizeY="16px"
                kulValue="information-variant"
                title={title}
              ></kul-image>
            )}
          </div>
        </div>
      );
    });
  };
  #prepRoster = (): VNode => {
    const { bemClass } = kulManager.theme;

    const { get, set } = this.#adapter.controller;

    const avatars: VNode[] = [];

    const characters = get.character.list();
    characters.forEach((c) => {
      const image = get.image.asCover("avatars", c);
      avatars.push(
        <div
          class={bemClass("roster", "portrait")}
          onClick={() => {
            set.character.current(c);
          }}
        >
          <img
            class={bemClass("roster", "image")}
            src={image.value}
            title={image.title || ""}
          />
          <div class={bemClass("roster", "name")}>
            <div class={bemClass("roster", "label")}>
              {get.character.name(c)}
            </div>
          </div>
        </div>,
      );
    });

    return avatars?.length ? (
      avatars
    ) : (
      <div class={bemClass("empty-dataset")}>
        There are no characters in your roster!
      </div>
    );
  };
  //#endregion

  //#region Lifecycle
  connectedCallback() {
    const { theme } = kulManager;

    theme.register(this);
  }
  componentWillLoad() {
    this.#initialize();
  }
  componentDidLoad() {
    const { info } = kulManager.debug;

    this.onKulEvent(new CustomEvent("ready"), "ready");
    info.update(this, "did-load");
  }
  componentWillRender() {
    const { info } = kulManager.debug;

    info.update(this, "will-render");
  }
  componentDidRender() {
    const { info } = kulManager.debug;

    info.update(this, "did-render");
  }
  render() {
    const { bemClass, setKulStyle } = kulManager.theme;

    if (!hasNodes(this.#adapter)) {
      return;
    }

    const { kulStyle } = this;

    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID}>
          {this.currentCharacter ? (
            <div class={bemClass("messenger")}>
              {this.#prepCharacter()}
              {this.#prepChat()}
              {this.#prepExtraContext()}
            </div>
          ) : (
            <div class={bemClass("roster")}>{this.#prepRoster()}</div>
          )}
        </div>
      </Host>
    );
  }
  disconnectedCallback() {
    const { theme } = kulManager;

    theme.unregister(this);
  }
  //#endregion
}
