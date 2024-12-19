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
import { kulManagerSingleton } from "src";
import {
  KulDataDataset,
  KulDataShapesMap,
} from "src/managers/kul-data/kul-data-declarations";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { GenericObject } from "src/types/GenericTypes";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "src/utils/constants";
import { createAdapter } from "./kul-card-adapter";
import {
  KulCardEvent,
  KulCardEventPayload,
  KulCardLayout,
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
  @State() debugInfo = kulManagerSingleton.debug.info.create();
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
  @Prop({ mutable: true }) kulSizeX = "100%";
  /**
   * The height of the card, defaults to 100%. Accepts any valid CSS format (px, %, vh, etc.).
   * @default "100%"
   */
  @Prop({ mutable: true }) kulSizeY = "100%";
  /**
   * Custom style of the component.
   * @default ""
   */
  @Prop({ mutable: true }) kulStyle = "";
  //#endregion

  //#region Internal variables
  #adapter = createAdapter(
    { compInstance: this, shapes: () => this.shapes },
    () => this.#adapter,
  );
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
    const { data, debug } = kulManagerSingleton;

    try {
      this.shapes = data.cell.shapes.getAll(this.kulData);
    } catch (error) {
      debug.logs.new(this, "Error updating shapes: " + error, "error");
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
   * Used to retrieve component's properties and descriptions.
   * @returns {Promise<GenericObject>} Promise resolved with an object containing the component's properties.
   */
  @Method()
  async getProps(): Promise<GenericObject> {
    const { getProps } = kulManagerSingleton;

    return getProps(this);
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

  //#region Lifecycle hooks
  componentWillLoad() {
    const { language, theme } = kulManagerSingleton;

    language.register(this);
    theme.register(this);

    this.updateShapes();
  }
  componentDidLoad() {
    const { info } = kulManagerSingleton.debug;

    this.onKulEvent(new CustomEvent("ready"), "ready");
    info.update(this, "did-load");
  }
  componentWillUpdate() {
    const { info } = kulManagerSingleton.debug;

    info.update(this, "will-render");
  }
  componentDidRender() {
    const { info } = kulManagerSingleton.debug;

    info.update(this, "did-render");
  }
  render() {
    const { theme } = kulManagerSingleton;

    const { kulData, kulLayout, kulSizeX, kulSizeY, kulStyle, rootElement } =
      this;

    if (!kulData && rootElement.children.length < 1) {
      return;
    }

    const { layout } = this.#adapter.elements.jsx;

    const style = {
      "--kul_card_height": kulSizeY ? kulSizeY : "100%",
      "--kul_card_width": kulSizeX ? kulSizeX : "100%",
    };

    return (
      <Host style={style}>
        {kulStyle && <style id={KUL_STYLE_ID}>{theme.setKulStyle(this)}</style>}
        <div
          id={KUL_WRAPPER_ID}
          onClick={(e) => this.onKulEvent(e, "click")}
          onContextMenu={(e) => this.onKulEvent(e, "contextmenu")}
          onPointerDown={(e) => this.onKulEvent(e, "pointerdown")}
        >
          {layout[kulLayout.toLowerCase()]}
        </div>
      </Host>
    );
  }
  disconnectedCallback() {
    const { language, theme } = kulManagerSingleton;

    language.unregister(this);
    theme.unregister(this);
  }
  //#endregion
}
