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

import { kulManagerSingleton } from "src";
import {
  createHandlers,
  createWidgets,
} from "src/components/kul-canvas/helpers/kul-canvas-hub";
import { coordinates } from "src/components/kul-canvas/helpers/kul-canvas-utils";
import {
  KulCanvasAdapter,
  KulCanvasBrush,
  KulCanvasCursor,
  KulCanvasEvent,
  KulCanvasEventPayload,
  KulCanvasPoints,
} from "src/components/kul-canvas/kul-canvas-declarations";
import { KulImagePropsInterface } from "src/components/kul-image/kul-image-declarations";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { GenericObject } from "src/types/GenericTypes";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "src/variables/GenericVariables";

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
  @State() debugInfo: KulDebugLifecycleInfo = {
    endTime: 0,
    renderCount: 0,
    renderEnd: 0,
    renderStart: 0,
    startTime: performance.now(),
  };
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
  @Prop({ mutable: true, reflect: true }) kulBrush: KulCanvasBrush = "round";
  /**
   * The color of the brush.
   * @default '#ff0000'
   */
  @Prop({ mutable: true, reflect: true }) kulColor = "#ff0000";
  /**
   * Sets the style of the cursor.
   * @default 'preview'
   */
  @Prop({ mutable: true, reflect: true }) kulCursor: KulCanvasCursor =
    "preview";
  /**
   * The props of the image displayed inside the badge.
   * @default null
   */
  @Prop({ mutable: true }) kulImageProps: KulImagePropsInterface = null;
  /**
   * The opacity of the brush.
   * @default 1.0
   */
  @Prop({ mutable: true, reflect: true }) kulOpacity = 1.0;
  /**
   * Displays the brush track of the current stroke.
   * @default true
   */
  @Prop({ mutable: true, reflect: true }) kulPreview = true;
  /**
   * Simplifies the coordinates array by applying the Ramer-Douglas-Peucker algorithm.
   * This prop sets the tolerance of the algorithm (null to disable).
   * @default null
   */
  @Prop({ mutable: true, reflect: true }) kulStrokeTolerance: number = null;
  /**
   * The size of the brush.
   * @default 10
   */
  @Prop({ mutable: true, reflect: true }) kulSize = 10;
  /**
   * Customizes the style of the component.
   * @default ""
   */
  @Prop({ mutable: true, reflect: true }) kulStyle = "";
  //#endregion

  //#region Internal variables
  #container: HTMLDivElement;
  #resizeObserver: ResizeObserver;
  #resizeTimeout: NodeJS.Timeout;
  #adapter: KulCanvasAdapter = {
    handlers: null,
    hooks: {
      get: {
        comp: this,
        isCursorPreview: this.#isCursorPreview,
        isPainting: () => this.isPainting,
        points: () => this.points,
      },

      set: {
        isPainting: (value) => (this.isPainting = value),
        points: (value) => (this.points = value),
      },
    },
    widgets: {
      jsx: null,
      refs: {
        board: null,
        image: null,
        preview: null,
      },
    },
  };
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
    this.kulEvent.emit({
      comp: this,
      id: this.rootElement.id,
      originalEvent: e,
      eventType,
      points:
        this.kulStrokeTolerance !== null && this.points?.length
          ? coordinates.simplify(this.points, this.kulStrokeTolerance)
          : this.points,
    });
  }
  //#endregion

  //#region Public methods
  /**
   * Clears the painting canvas .
   */
  @Method()
  async clearCanvas(): Promise<void> {
    const { handlers } = this.#adapter;
    const { board } = handlers;
    const { clear } = board;

    clear();
  }
  /**
   * Returns the painting canvas .
   * @returns {Promise<HTMLCanvasElement>} The painting canvas.
   */
  @Method()
  async getCanvas(): Promise<HTMLCanvasElement> {
    const { widgets } = this.#adapter;
    const { refs } = widgets;
    const { board } = refs;

    return board;
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
    const { widgets } = this.#adapter;
    const { refs } = widgets;
    const { image } = refs;

    return image;
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
   * Automatically resizes the canvas to the match the size of the container.
   */
  @Method()
  async resizeCanvas(): Promise<void> {
    const { widgets } = this.#adapter;
    const { refs } = widgets;
    const { board, preview } = refs;

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
    const { widgets } = this.#adapter;
    const { refs } = widgets;
    const { board, preview } = refs;

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
    const { widgets } = this.#adapter;
    const { refs } = widgets;
    const { board, preview } = refs;

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
  componentWillLoad() {
    const { theme } = kulManagerSingleton;

    theme.register(this);

    this.#adapter.handlers = createHandlers(this.#adapter);
    this.#adapter.widgets.jsx = createWidgets(this.#adapter);
  }
  componentDidLoad() {
    const { debug } = kulManagerSingleton;

    this.resizeCanvas();

    this.#resizeObserver = new ResizeObserver(() => {
      clearTimeout(this.#resizeTimeout);
      this.#resizeTimeout = setTimeout(() => {
        this.resizeCanvas();
      }, 100);
    });
    this.#resizeObserver.observe(this.#container);

    this.onKulEvent(new CustomEvent("ready"), "ready");
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
    const { widgets } = this.#adapter;
    const { jsx } = widgets;
    const { board, image, preview } = jsx;
    const { kulStyle } = this;

    const className = {
      canvas: true,
      "canvas--hidden-cursor": this.#isCursorPreview(),
    };

    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{theme.setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID}>
          <div
            class={className}
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
    const { theme } = kulManagerSingleton;

    theme.unregister(this);

    if (this.#resizeObserver) {
      this.#resizeObserver.disconnect();
    }
  }
  //#endregion
}
