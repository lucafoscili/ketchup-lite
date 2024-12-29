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
} from "@stencil/core";
import { kulManager } from "src/global/global";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "src/utils/constants";
import { KulImagePropsInterface } from "../kul-image/kul-image-declarations";
import { createAdapter } from "./kul-canvas-adapter";
import {
  KulCanvasBrush,
  KulCanvasCursor,
  KulCanvasEvent,
  KulCanvasEventPayload,
  KulCanvasPoints,
  KulCanvasPropsInterface,
  KulCanvasType,
} from "./kul-canvas-declarations";

@Component({
  tag: "kul-canvas",
  styleUrl: "kul-canvas.scss",
  shadow: true,
})
export class KulCanvas {
  /**
   * References the root HTML element of the component (<kul-canvas>).
   */
  @Element() rootElement: HTMLKulCanvasElement;

  //#region States
  /**
   * Debug information.
   */
  @State() debugInfo = kulManager.debug.info.create();
  /**
   * Indicates whether the user is currently painting.
   * @default false
   */
  @State() isPainting = false;
  /**
   * Stores the points of the current stroke.
   * @default []
   */
  @State() points: KulCanvasPoints = [];
  //#endregion

  //#region Props
  /**
   * The shape of the brush.
   * @default 'round'
   */
  @Prop({ mutable: true }) kulBrush: KulCanvasBrush = "round";
  /**
   * The color of the brush.
   * @default '#ff0000'
   */
  @Prop({ mutable: true }) kulColor = "#ff0000";
  /**
   * Sets the style of the cursor.
   * @default 'preview'
   */
  @Prop({ mutable: true }) kulCursor: KulCanvasCursor = "preview";
  /**
   * The props of the image displayed inside the badge.
   * @default null
   */
  @Prop({ mutable: true }) kulImageProps: KulImagePropsInterface = null;
  /**
   * The opacity of the brush.
   * @default 1.0
   */
  @Prop({ mutable: true }) kulOpacity = 1.0;
  /**
   * Displays the brush track of the current stroke.
   * @default true
   */
  @Prop({ mutable: true }) kulPreview = true;
  /**
   * Simplifies the coordinates array by applying the Ramer-Douglas-Peucker algorithm.
   * This prop sets the tolerance of the algorithm (null to disable).
   * @default null
   */
  @Prop({ mutable: true }) kulStrokeTolerance: number = null;
  /**
   * The size of the brush.
   * @default 10
   */
  @Prop({ mutable: true }) kulSize = 10;
  /**
   * Customizes the style of the component.
   * @default ""
   */
  @Prop({ mutable: true }) kulStyle = "";
  //#endregion

  //#region Internal variables
  #container: HTMLDivElement;
  #resizeObserver: ResizeObserver;
  #resizeTimeout: NodeJS.Timeout;
  #adapter = createAdapter(
    {
      compInstance: this,
      isCursorPreview: this.#isCursorPreview,
      isPainting: () => this.isPainting,
      manager: kulManager,
      points: () => this.points,
    },
    {
      isPainting: (value) => (this.isPainting = value),
      points: (value) => (this.points = value),
    },
    () => this.#adapter,
  );
  //#endregion

  //#region Events
  @Event({
    eventName: "kul-canvas-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulCanvasEventPayload>;
  onKulEvent(e: Event | CustomEvent, eventType: KulCanvasEvent) {
    const { coordinates } = this.#adapter.toolkit;
    const { kulStrokeTolerance, points, rootElement } = this;

    this.kulEvent.emit({
      comp: this,
      id: rootElement.id,
      originalEvent: e,
      eventType,
      points:
        kulStrokeTolerance !== null && points?.length
          ? coordinates.simplify(points, kulStrokeTolerance)
          : points,
    });
  }
  //#endregion

  //#region Public methods
  /**
   * Clears the specified canvas.
   * @param {KulCanvasType} type - The type of the canvas.
   */
  @Method()
  async clearCanvas(type: KulCanvasType = "board"): Promise<void> {
    const { clear } = this.#adapter.toolkit.ctx;

    clear(type);
  }
  /**
   * Returns the canvas HTML element.
   * @param {KulCanvasType} type - The type of the canvas.
   * @returns {Promise<HTMLCanvasElement>} The painting canvas.
   */
  @Method()
  async getCanvas(type: KulCanvasType = "board"): Promise<HTMLCanvasElement> {
    const { board, preview } = this.#adapter.elements.refs;

    return type === "board" ? board : preview;
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
   * Returns the image component.
   */
  @Method()
  async getImage(): Promise<HTMLKulImageElement> {
    const { image } = this.#adapter.elements.refs;

    return image;
  }
  /**
   * Used to retrieve component's properties and descriptions.
   * @returns {Promise<KulCanvasPropsInterface>} Promise resolved with an object containing the component's properties.
   */
  @Method()
  async getProps(): Promise<KulCanvasPropsInterface> {
    const { getProps } = kulManager;

    return getProps(this) as KulCanvasPropsInterface;
  }
  /**
   * This method is used to trigger a new render of the component.
   */
  @Method()
  async refresh(): Promise<void> {
    forceUpdate(this);
  }
  /**
   * Automatically resizes the canvas to the match the size of the container.
   */
  @Method()
  async resizeCanvas(): Promise<void> {
    const { board, preview } = this.#adapter.elements.refs;

    const { height, width } = this.#container.getBoundingClientRect();
    board.height = height;
    board.width = width;

    if (this.#isCursorPreview()) {
      preview.height = height;
      preview.width = width;
    }
  }
  /**
   * Sets the height of the canvas.
   */
  @Method()
  async setCanvasHeight(value?: number): Promise<void> {
    const { board, preview } = this.#adapter.elements.refs;

    if (value !== undefined) {
      board.height = value;

      if (this.#isCursorPreview()) {
        preview.height = value;
      }
    } else {
      const { height } = this.#container.getBoundingClientRect();
      board.height = height;

      if (this.#isCursorPreview()) {
        preview.height = height;
      }
    }
  }
  /**
   * Sets the width of the canvas.
   */
  @Method()
  async setCanvasWidth(value?: number): Promise<void> {
    const { board, preview } = this.#adapter.elements.refs;

    if (value !== undefined) {
      board.width = value;

      if (this.#isCursorPreview()) {
        preview.width = value;
      }
    } else {
      const { width } = this.#container.getBoundingClientRect();
      board.width = width;

      if (this.#isCursorPreview()) {
        preview.width = width;
      }
    }
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
  #isCursorPreview() {
    return this.kulCursor === "preview";
  }
  //#endregion

  //#region Lifecycle hooks
  connectedCallback() {
    const { theme } = kulManager;

    theme.register(this);
  }
  componentDidLoad() {
    const { info } = kulManager.debug;

    this.resizeCanvas();

    this.#resizeObserver = new ResizeObserver(() => {
      clearTimeout(this.#resizeTimeout);
      this.#resizeTimeout = setTimeout(() => {
        this.resizeCanvas();
      }, 100);
    });
    this.#resizeObserver.observe(this.#container);

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

    const { board, image, preview } = this.#adapter.elements.jsx;
    const { kulStyle } = this;

    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID}>
          <div
            class={bemClass("canvas", null, {
              "hidden-cursor": this.#isCursorPreview(),
            })}
            ref={(el) => {
              if (el) {
                this.#container = el;
              }
            }}
          >
            {image()}
            {board()}
            {this.#isCursorPreview() && preview()}
          </div>
        </div>
      </Host>
    );
  }
  disconnectedCallback() {
    const { theme } = kulManager;

    theme.unregister(this);

    if (this.#resizeObserver) {
      this.#resizeObserver.disconnect();
    }
  }
  //#endregion
}
