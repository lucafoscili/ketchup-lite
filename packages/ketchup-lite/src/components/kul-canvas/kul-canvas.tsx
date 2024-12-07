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

import {
  KulCanvasBrush,
  KulCanvasCursor,
  KulCanvasEvent,
  KulCanvasEventPayload,
  KulCanvasPoints,
  KulCanvasProps,
} from "./kul-canvas-declarations";
import { GenericObject } from "../../components";
import { KulDebugLifecycleInfo } from "../../managers/kul-debug/kul-debug-declarations";
import { kulManagerInstance } from "../../managers/kul-manager/kul-manager";
import { getProps } from "../../utils/componentUtils";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "../../variables/GenericVariables";
import { KulImagePropsInterface } from "../kul-image/kul-image-declarations";
import { simplifyStroke } from "./helpers/kul-canvas-helpers";

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
  #board: HTMLCanvasElement;
  #boardCtx: CanvasRenderingContext2D;
  #container: HTMLDivElement;
  #cursor: HTMLCanvasElement;
  #cursorCtx: CanvasRenderingContext2D;
  #image: HTMLKulImageElement;
  #kulManager = kulManagerInstance();
  #resizeObserver: ResizeObserver;
  #resizeTimeout: NodeJS.Timeout;
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
          ? simplifyStroke(this.points, this.kulStrokeTolerance)
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
    this.#boardCtx.clearRect(0, 0, this.#board.width, this.#board.height);
  }
  /**
   * Returns the painting canvas .
   * @returns {Promise<HTMLCanvasElement>} The painting canvas.
   */
  @Method()
  async getCanvas(): Promise<HTMLCanvasElement> {
    return this.#board;
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
    return this.#image;
  }
  /**
   * Used to retrieve component's props values.
   * @param {boolean} descriptions - When provided and true, the result will be the list of props with their description.
   * @returns {Promise<KulCanvasPropsInterface>} List of props as object, each key will be a prop.
   */
  @Method()
  async getProps(descriptions?: boolean): Promise<GenericObject> {
    return getProps(this, KulCanvasProps, descriptions);
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
    const { height, width } = this.#container.getBoundingClientRect();
    this.#board.height = height;
    this.#board.width = width;
    if (this.#isCursorPreview()) {
      this.#cursor.height = height;
      this.#cursor.width = width;
    }
  }
  /**
   * Sets the height of the canvas.
   */
  @Method()
  async setCanvasHeight(value?: number): Promise<void> {
    if (value !== undefined) {
      this.#board.height = value;
      if (this.#isCursorPreview()) {
        this.#cursor.height = value;
      }
    } else {
      const { height } = this.#container.getBoundingClientRect();
      this.#board.height = height;
      if (this.#isCursorPreview()) {
        this.#cursor.height = height;
      }
    }
  }
  /**
   * Sets the width of the canvas.
   */
  @Method()
  async setCanvasWidth(value?: number): Promise<void> {
    if (value !== undefined) {
      this.#board.width = value;
      if (this.#isCursorPreview()) {
        this.#cursor.width = value;
      }
    } else {
      const { width } = this.#container.getBoundingClientRect();
      this.#board.width = width;
      if (this.#isCursorPreview()) {
        this.#cursor.width = width;
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
  #normalizeCoordinate(event: PointerEvent, rect: DOMRect) {
    let x = (event.clientX - rect.left) / rect.width;
    let y = (event.clientY - rect.top) / rect.height;

    x = Math.max(0, Math.min(1, x));
    y = Math.max(0, Math.min(1, y));

    return { x, y };
  }
  #getCanvasCoordinate(event: PointerEvent, rect: DOMRect) {
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    x = Math.max(0, Math.min(rect.width, x));
    y = Math.max(0, Math.min(rect.height, y));

    return { x, y };
  }
  #setupContext(ctx: CanvasRenderingContext2D, isFill = false) {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = this.kulOpacity;
    if (isFill) {
      ctx.fillStyle = this.kulColor;
    } else {
      ctx.strokeStyle = this.kulColor;
      ctx.lineWidth = this.kulSize;
    }
  }
  #handlePointerDown(e: PointerEvent) {
    e.preventDefault();
    this.isPainting = true;
    this.points = [];
    this.#addPoint(e);

    this.#board.setPointerCapture(e.pointerId);

    this.#board.addEventListener("pointermove", this.#handlePointerMove);
    this.#board.addEventListener("pointerup", this.#handlePointerUp);
  }
  #handlePointerMove = (e: PointerEvent) => {
    e.preventDefault();

    if (this.#isCursorPreview()) {
      this.#drawBrushCursor(e);
    }

    if (!this.isPainting) {
      return;
    }

    this.#addPoint(e);
    this.#drawLastSegment();
  };
  #handlePointerOut = (e: PointerEvent) => {
    this.#endCapture(e);
  };
  #handlePointerUp = (e: PointerEvent) => {
    this.#endCapture(e);
  };

  #addPoint(e: PointerEvent) {
    const rect = this.#board.getBoundingClientRect();
    const { x, y } = this.#normalizeCoordinate(e, rect);
    this.points.push({ x, y });
  }
  #endCapture(e: PointerEvent) {
    e.preventDefault();
    this.isPainting = false;

    this.#board.releasePointerCapture(e.pointerId);

    this.#board.removeEventListener("pointermove", this.#handlePointerMove);
    this.#board.removeEventListener("pointerup", this.#handlePointerUp);
  }
  #drawBrushCursor(event: PointerEvent) {
    this.#cursorCtx.clearRect(0, 0, this.#cursor.width, this.#cursor.height);

    const rect = this.#board.getBoundingClientRect();
    const { x, y } = this.#getCanvasCoordinate(event, rect);

    this.#setupContext(this.#cursorCtx, true);
    this.#drawBrushShape(this.#cursorCtx, x, y, true);
  }
  #drawBrushShape(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    isFill = true,
  ) {
    ctx.beginPath();
    switch (this.kulBrush) {
      case "round":
        ctx.arc(x, y, this.kulSize / 2, 0, Math.PI * 2);
        break;
      case "square":
        const halfSize = this.kulSize / 2;
        ctx.rect(x - halfSize, y - halfSize, this.kulSize, this.kulSize);
        break;
    }
    if (isFill) {
      ctx.fill();
    } else {
      ctx.stroke();
    }
  }
  #drawLastSegment() {
    const len = this.points.length;
    if (len < 2) {
      return;
    }

    const lastPoint = this.points[len - 1];
    const secondLastPoint = this.points[len - 2];

    const x1 = secondLastPoint.x * this.#board.width;
    const y1 = secondLastPoint.y * this.#board.height;
    const x2 = lastPoint.x * this.#board.width;
    const y2 = lastPoint.y * this.#board.height;

    this.#setupContext(this.#boardCtx, false);

    if (this.kulBrush === "round") {
      this.#boardCtx.beginPath();
      this.#boardCtx.moveTo(x1, y1);
      this.#boardCtx.lineTo(x2, y2);
      this.#boardCtx.stroke();
    } else if (this.kulBrush === "square") {
      this.#drawBrushShape(this.#boardCtx, x2, y2, false);
    }
  }
  //#endregion

  //#region Lifecycle hooks
  componentWillLoad() {
    this.#kulManager.theme.register(this);
  }

  componentDidLoad() {
    this.#boardCtx = this.#board.getContext("2d");
    this.#cursorCtx = this.#cursor.getContext("2d");

    this.setCanvasHeight();
    this.setCanvasWidth();

    this.#resizeObserver = new ResizeObserver(() => {
      clearTimeout(this.#resizeTimeout);
      this.#resizeTimeout = setTimeout(() => {
        this.setCanvasHeight();
        this.setCanvasWidth();
      }, 100);
    });
    this.#resizeObserver.observe(this.#container);

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
    const className = {
      canvas: true,
      "canvas--hidden-cursor": this.#isCursorPreview(),
    };

    return (
      <Host>
        {this.kulStyle ? (
          <style id={KUL_STYLE_ID}>
            {this.#kulManager.theme.setKulStyle(this)}
          </style>
        ) : undefined}
        <div id={KUL_WRAPPER_ID}>
          <div
            class={className}
            ref={(el) => {
              if (el) {
                this.#container = el;
              }
            }}
          >
            <kul-image
              class="canvas__image kul-fit"
              {...this.kulImageProps}
              ref={(el) => {
                if (el) {
                  this.#image = el;
                }
              }}
            ></kul-image>
            <canvas
              class="canvas__board"
              onPointerDown={(e) => this.#handlePointerDown(e)}
              onPointerMove={(e) => this.#handlePointerMove(e)}
              onPointerUp={(e) => this.onKulEvent(e, "stroke")}
              onPointerOut={(e) => this.#handlePointerOut(e)}
              ref={(el) => {
                if (el) {
                  this.#board = el;
                }
              }}
            ></canvas>
            {this.#isCursorPreview() && (
              <canvas
                class="canvas__cursor"
                ref={(el) => {
                  if (el) {
                    this.#cursor = el;
                  }
                }}
              ></canvas>
            )}
          </div>
        </div>
      </Host>
    );
  }

  disconnectedCallback() {
    this.#kulManager.theme.unregister(this);

    if (this.#resizeObserver) {
      this.#resizeObserver.disconnect();
    }
  }
}
//#endregion
