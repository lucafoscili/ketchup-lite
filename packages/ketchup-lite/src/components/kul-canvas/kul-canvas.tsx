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

import { GenericObject } from "../../components";
import { KulDebugLifecycleInfo } from "../../managers/kul-debug/kul-debug-declarations";
import { kulManagerInstance } from "../../managers/kul-manager/kul-manager";
import { getProps } from "../../utils/componentUtils";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "../../variables/GenericVariables";
import { KulImagePropsInterface } from "../kul-image/kul-image-declarations";
import { createActions } from "./helpers/kul-canvas-actions";
import { createComponents } from "./helpers/kul-canvas-components";
import { simplifyStroke } from "./helpers/kul-canvas-helpers";
import {
  KulCanvasAdapter,
  KulCanvasBrush,
  KulCanvasCursor,
  KulCanvasEvent,
  KulCanvasEventPayload,
  KulCanvasPoints,
  KulCanvasProps,
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
    this.#adapter.actions.board.clear();
  }
  /**
   * Returns the painting canvas .
   * @returns {Promise<HTMLCanvasElement>} The painting canvas.
   */
  @Method()
  async getCanvas(): Promise<HTMLCanvasElement> {
    return this.#adapter.components.refs.board;
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
    return this.#adapter.components.refs.image;
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
    const { board, preview } = this.#adapter.components.refs;

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
    const { board, preview } = this.#adapter.components.refs;

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
    const { board, preview } = this.#adapter.components.refs;

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
  #adapter: KulCanvasAdapter = {
    actions: null,
    components: null,
    get: {
      canvas: this,
      isCursorPreview: this.#isCursorPreview,
      manager: this.#kulManager,
      state: {
        isPainting: () => this.isPainting,
        points: () => this.points,
      },
    },
    set: {
      state: {
        isPainting: (value) => (this.isPainting = value),
        points: (value) => (this.points = value),
      },
    },
  };
  #isCursorPreview() {
    return this.kulCursor === "preview";
  }
  //#endregion

  //#region Lifecycle hooks
  componentWillLoad() {
    this.#kulManager.theme.register(this);
    this.#adapter.actions = createActions(this.#adapter);
    this.#adapter.components = createComponents(this.#adapter);
  }
  componentDidLoad() {
    this.resizeCanvas();

    this.#resizeObserver = new ResizeObserver(() => {
      clearTimeout(this.#resizeTimeout);
      this.#resizeTimeout = setTimeout(() => {
        this.resizeCanvas();
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
    const { board, image, preview } = this.#adapter.components.jsx;
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
            {image}
            {board}
            {this.#isCursorPreview() && preview}
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
  //#endregion
}
