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
} from "@stencil/core";

import { kulManagerSingleton } from "src";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { KulMessengerAdapter, KulMessengerBaseChildNode, KulMessengerCharacterNode, KulMessengerChat, KulMessengerChildIds, KulMessengerConfig, KulMessengerCovers, KulMessengerDataset, KulMessengerEditingStatus, KulMessengerEvent, KulMessengerEventPayload, KulMessengerHistory, KulMessengerImageTypes, KulMessengerUI, KulMessengerUnionChildIds } from "src/components/kul-messenger/kul-messenger-declarations";
import { KulChatStatus } from "src/components/kul-chat/kul-chat-declarations";
import { CLEAN_COMPONENTS, IMAGE_TYPE_IDS } from "src/components/kul-messenger/helpers/kul-messenger-constants";
import { GenericObject } from "src/types/GenericTypes";

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
  @State() debugInfo: KulDebugLifecycleInfo = {
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
#adapter: KulMessengerAdapter = {
 /* state: {
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
  },*/
  elements: { jsx: null, refs: {} },
  handlers: null,
  state: {
    get: null,
    set: null,
  }
};
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

    this.#initStates();
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

  #hasCharacters() {
    const nodes = this.kulData?.nodes || [];
    return !!nodes.length;
  }

  #hasNodes() {
    return !!this.kulData?.nodes?.length;
  }

  #initStates() {
    if (this.#hasNodes()) {
      const imageRootGetter = this.#adapter.get.image.root;
      for (let index = 0; index < this.kulData.nodes.length; index++) {
        const character = this.kulData.nodes[index];
        const covers: KulMessengerCovers = {
          [character.id]: IMAGE_TYPE_IDS.reduce(
            (acc, type) => {
              acc[type] =
                Number(imageRootGetter(type, character).value).valueOf() || 0;
              return acc;
            },
            {} as KulMessengerCovers[typeof character.id],
          ),
        };
        const chat = character.children?.find((n) => n.id === "chat");
        this.chat[character.id] = {};
        const chatCell = chat?.cells?.kulChat as KulDataCell<"chat">;
        if (chatCell) {
          const characterChat = this.chat[character.id];
          characterChat.kulEndpointUrl = chatCell.kulEndpointUrl;
          characterChat.kulMaxTokens = chatCell.kulMaxTokens;
          characterChat.kulPollingInterval = chatCell.kulPollingInterval;
          characterChat.kulTemperature = chatCell.kulTemperature;
        }
        const history = chatCell?.kulValue || chatCell?.value || [];
        this.history[character.id] = JSON.stringify(history);
        Object.assign(this.covers, covers);
      }
    }
    if (this.kulValue) {
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
  }

  async #save() {
    for (let index = 0; index < this.kulData.nodes.length; index++) {
      const character = this.kulData.nodes[index];
      const id = character.id;
      const chatNode = character.children.find((n) => n.id === "chat");
      const chatComp = this.#adapter.get.character.chat(character);
      const saveChat = () => {
        if (this.history[id] && chatNode) {
          const historyJson = JSON.parse(this.history[id]);
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
          const chatCell = chatNode.cells.kulChat as KulDataCell<"chat">;
          chatCell.kulEndpointUrl = chatComp.kulEndpointUrl;
          chatCell.kulMaxTokens = chatComp.kulMaxTokens;
          chatCell.kulPollingInterval = chatComp.kulPollingInterval;
          chatCell.kulSystem = chatComp.kulSystem;
          chatCell.kulTemperature = chatComp.kulTemperature;
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
    this.onKulEvent(new CustomEvent("save"), "save");
  }
  #prepCenter = () => {
   return  <div class="messenger__center">
      <div class="messenger__expander messenger__expander--left">
        {leftExpander}
      </div>
      <div class="messenger__navigation">{tabbar}</div>
      <div class="messenger__chat">{chat}</div>
      <div class="messenger__expander messenger__expander--right">
        {rightExpander}
      </div>
    </div>}

  #prepLeft = () => {
    const isCollapsed = this.#adapter.get.messenger.ui().panels.isLeftCollapsed;

    return (
      <div
        class={`messenger__left ${isCollapsed ? "messenger__left--collapsed" : ""}`}
      >
        <div class="messenger__avatar">
      <Fragment>
        <img
          alt={image.title || ""}
          class="messenger__avatar__image"
          src={image.value}
          title={image.title || ""}
        />
        <div class="messenger__avatar__name-wrapper">
          <div class="messenger__avatar__name">
            {avatar()}
            <div class="messenger__avatar__label">
              {adapter.get.character.name()}
            </div>
          </div>
          {save()}
        </div>
      </Fragment>
      </div>
        <div class="messenger__biography">{biography()}</div>
      </div>
  }
  #prepRight = () => {
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
            {back}
          </Fragment>
        ) : (
          <Fragment>
            <div class="messenger__options__active">{prepOptions(adapter)}</div>
            
            {customization}
          </Fragment>
        )}
      </div>
    );
  };
  

  /*-------------------------------------------------*/
  /*          L i f e c y c l e   H o o k s          */
  /*-------------------------------------------------*/

  componentWillLoad() {
    const { theme } = kulManagerSingleton;

    theme.register(this);
    this.#adapter.get = getters(
      this.#adapter,
      this.#kulManager,
      this.#hasCharacters(),
    );
    this.#adapter.set = setters(this.#adapter, this.#hasCharacters());
    this.#initStates();
  }

  componentDidLoad() {
    this.onKulEvent(new CustomEvent("ready"), "ready");
    this.#kulManager.debug.updateDebugInfo(this, "did-load");
  }

  componentWillRender() {
    this.#kulManager.debug.updateDebugInfo(this, "will-render");
  }

  componentDidRender() {
    this.#kulManager.debug.updateDebugInfo(this, "did-render");
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
              {this.#prepLeft(this.#adapter)}
              {prepCenter(this.#adapter)}
              {prepRight(this.#adapter)}
            </div>
          ) : (
            <div class="selection-grid">{prepGrid(this.#adapter)}</div>
          )}
        </div>
      </Host>
    );
  }

  disconnectedCallback() {
    this.#kulManager.theme.unregister(this);
  }
}
