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
  Watch,
} from "@stencil/core";

import {
  KulDataDataset,
  KulDataShapesMap,
} from "../../managers/kul-data/kul-data-declarations";
import { KulDebugLifecycleInfo } from "../../managers/kul-debug/kul-debug-declarations";
import { kulManagerInstance } from "../../managers/kul-manager/kul-manager";
import type { GenericMap, GenericObject } from "../../types/GenericTypes";
import { getProps } from "../../utils/componentUtils";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "../../variables/GenericVariables";
import { createDefaults } from "./helpers/kul-card-defaults";
import { createLayouts } from "./helpers/kul-card-layout-hub";
import {
  KulCardAdapter,
  KulCardEvent,
  KulCardEventPayload,
  KulCardLayout,
  KulCardProps,
} from "./kul-card-declarations";

@Component({
  tag: "kul-card",
  styleUrl: "kul-card.scss",
  shadow: true,
})
export class KulCard {
  /**
   * References the root HTML element of the component (<kul-card>).
   */
  @Element() rootElement: HTMLKulCardElement;

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
   * The shapes of the component.
   * @default ""
   *
   * @see KulDataShapesMap - For a list of possible shapes.
   */
  @State() shapes: KulDataShapesMap;
  //#endregion

  //#region Props
  /**
   * The actual data of the card.
   * @default null
   */
  @Prop({ mutable: true }) kulData: KulDataDataset = null;
  /**
   * Sets the layout.
   * @default "material"
   */
  @Prop({ mutable: true, reflect: true }) kulLayout: KulCardLayout = "material";
  /**
   * The width of the card, defaults to 100%. Accepts any valid CSS format (px, %, vw, etc.).
   * @default "100%"
   */
  @Prop({ mutable: true, reflect: true }) kulSizeX = "100%";
  /**
   * The height of the card, defaults to 100%. Accepts any valid CSS format (px, %, vh, etc.).
   * @default "100%"
   */
  @Prop({ mutable: true, reflect: true }) kulSizeY = "100%";
  /**
   * Custom style of the component.
   * @default ""
   */
  @Prop({ mutable: true, reflect: true }) kulStyle = "";
  //#endregion

  //#region Internal variables
  #kulManager = kulManagerInstance();
  //#endregion

  //#region Events
  @Event({
    eventName: "kul-card-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulCardEventPayload>;
  onKulEvent(e: Event | CustomEvent, eventType: KulCardEvent): void {
    this.kulEvent.emit({
      comp: this,
      id: this.rootElement.id,
      eventType,
      originalEvent: e,
    });
  }
  //#endregion

  //#region Watchers
  @Watch("kulData")
  async updateShapes() {
    try {
      this.shapes = this.#kulManager.data.cell.shapes.getAll(this.kulData);
    } catch (error) {
      this.#kulManager.debug.logs.new(
        this,
        "Error updating shapes: " + error,
        "error",
      );
    }
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
   * Used to retrieve component's props values.
   * @param {boolean} descriptions - When provided and true, the result will be the list of props with their description.
   * @returns {Promise<GenericObject>} List of props as object, each key will be a prop.
   */
  @Method()
  async getProps(descriptions?: boolean): Promise<GenericObject> {
    return getProps(this, KulCardProps, descriptions);
  }
  /**
   * Used to retrieve component's shapes.
   * @returns {Promise<KulDataShapesMap>} Map of shapes.
   */
  @Method()
  async getShapes(): Promise<KulDataShapesMap> {
    return this.shapes;
  }
  /**
   * This method is used to trigger a new render of the component.
   */
  @Method()
  async refresh(): Promise<void> {
    forceUpdate(this);
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
  #adapter: KulCardAdapter = {
    actions: {
      dispatchEvent: async (e) => {
        this.onKulEvent(e, "kul-event");
      },
    },
    get: {
      card: () => this,
      defaults: null,
      layout: null,
      shapes: () => this.shapes,
    },
  };
  //#endregion

  //#region Lifecycle hooks
  componentWillLoad() {
    this.#kulManager.language.register(this);
    this.#kulManager.theme.register(this);

    this.updateShapes();

    this.#adapter.get.defaults = createDefaults();
    this.#adapter.get.layout = createLayouts(this.#adapter);
  }
  componentDidLoad() {
    this.onKulEvent(new CustomEvent("ready"), "ready");
    this.#kulManager.debug.updateDebugInfo(this, "did-load");
  }
  componentWillUpdate() {
    this.#kulManager.debug.updateDebugInfo(this, "will-render");
  }
  componentDidRender() {
    this.#kulManager.debug.updateDebugInfo(this, "did-render");
  }
  render() {
    if (!this.kulData && this.rootElement.children.length < 1) {
      return;
    }

    const style: GenericMap = {
      "--kul_card_height": this.kulSizeY ? this.kulSizeY : "100%",
      "--kul_card_width": this.kulSizeX ? this.kulSizeX : "100%",
    };
    const layout = this.#adapter.get.layout[this.kulLayout.toLowerCase()];

    return (
      <Host style={style}>
        {this.kulStyle ? (
          <style id={KUL_STYLE_ID}>
            {this.#kulManager.theme.setKulStyle(this)}
          </style>
        ) : undefined}
        <div
          id={KUL_WRAPPER_ID}
          onClick={(e) => this.onKulEvent(e, "click")}
          onContextMenu={(e) => this.onKulEvent(e, "contextmenu")}
          onPointerDown={(e) => this.onKulEvent(e, "pointerdown")}
        >
          {layout}
        </div>
      </Host>
    );
  }
  disconnectedCallback() {
    this.#kulManager.language.unregister(this);
    this.#kulManager.theme.unregister(this);
  }
  //#endregion
}
