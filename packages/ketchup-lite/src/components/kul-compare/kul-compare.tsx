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
  Watch,
} from "@stencil/core";
import { kulManager } from "src/global/global";
import {
  KulDataDataset,
  KulDataGenericCell,
  KulDataShapes,
  KulDataShapesMap,
} from "src/managers/kul-data/kul-data-declarations";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import {
  CY_ATTRIBUTES,
  KUL_STYLE_ID,
  KUL_WRAPPER_ID,
} from "src/utils/constants";
import { createAdapter } from "./kul-compare-adapter";
import {
  KulCompareEvent,
  KulCompareEventPayload,
  KulComparePropsInterface,
  KulCompareView,
} from "./kul-compare-declarations";

@Component({
  tag: "kul-compare",
  styleUrl: "kul-compare.scss",
  shadow: true,
})
export class KulCompare {
  /**
   * References the root HTML element of the component (<kul-compare>).
   */
  @Element() rootElement: HTMLKulCompareElement;

  //#region States
  /**
   * Debug information.
   */
  @State() debugInfo = kulManager.debug.info.create();
  /**
   * The shapes of the component.
   * @default {}
   *
   * @see KulDataShapesMap - For a list of possible shapes.
   */
  @State() shapes: KulDataShapesMap = {};
  /**
   * State reflecting whether the left panel is open or not.
   * @default false
   */
  @State() isLeftPanelOpened = false;
  /**
   * State reflecting whether the right panel is open or not
   * @default false
   */
  @State() isRightPanelOpened = false;
  /**
   * Shape on the left.
   * @default undefined
   */
  @State() leftShape: KulDataGenericCell;
  /**
   * Shape on the right.
   * @default undefined
   */
  @State() rightShape: KulDataGenericCell;
  //#endregion

  //#region Props
  /**
   * Actual data of the compare.
   * @default null
   */
  @Prop({ mutable: true }) kulData: KulDataDataset = null;
  /**
   * Sets the type of shapes to compare.
   * @default ""
   */
  @Prop({ mutable: true }) kulShape: KulDataShapes = "image";
  /**
   * Custom style of the component.
   * @default ""
   */
  @Prop({ mutable: true }) kulStyle = "";
  /**
   * Sets the type of view, either styled as a before-after or a side-by-side comparison.
   * @default null
   */
  @Prop({ mutable: true }) kulView: KulCompareView = "overlay";
  //#endregion

  //#region Internal variables
  #adapter = createAdapter(
    {
      compInstance: this,
      isOverlay: () => this.#isOverlay(),
      manager: kulManager,
      shapes: () => this.#getShapes(),
    },
    {
      leftPanelOpened: (value?) => {
        if (value === undefined) {
          this.isLeftPanelOpened = !this.isLeftPanelOpened;
        } else {
          this.isLeftPanelOpened = value;
        }
      },
      leftShape: (shape) => (this.leftShape = shape),
      rightPanelOpened: (value?) => {
        if (value === undefined) {
          this.isRightPanelOpened = !this.isRightPanelOpened;
        } else {
          this.isRightPanelOpened = value;
        }
      },
      rightShape: (shape) => (this.rightShape = shape),
      splitView: (value) => {
        this.kulView = value ? "split" : "overlay";
      },
    },
    () => this.#adapter,
  );
  //#endregion

  //#region Events
  @Event({
    eventName: "kul-compare-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulCompareEventPayload>;
  onKulEvent(e: Event | CustomEvent, eventType: KulCompareEvent) {
    this.kulEvent.emit({
      comp: this,
      eventType,
      id: this.rootElement.id,
      originalEvent: e,
    });
  }
  //#endregion

  //#region Watchers
  @Watch("kulData")
  @Watch("kulShape")
  async updateShapes() {
    const { data, debug } = kulManager;

    try {
      this.shapes = data.cell.shapes.getAll(this.kulData);
      const shapes = this.#getShapes();
      this.leftShape = shapes[0];
      this.rightShape = shapes[1];
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
   * @returns {Promise<KulComparePropsInterface>} Promise resolved with an object containing the component's properties.
   */
  @Method()
  async getProps(): Promise<KulComparePropsInterface> {
    const { getProps } = kulManager;

    return getProps(this) as KulComparePropsInterface;
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
  #getShapes() {
    return this.shapes?.[this.kulShape] || [];
  }
  #hasShapes() {
    return !!this.shapes?.[this.kulShape];
  }
  #isOverlay() {
    return !!(this.kulView === "overlay");
  }
  #prepCompare(): VNode {
    const { bemClass } = kulManager.theme;

    if (this.#hasShapes()) {
      const shapes = this.shapes[this.kulShape];
      if (shapes?.length > 1) {
        return (
          <div class={bemClass("compare", "grid")}>
            {this.#prepView()}
            {this.#prepToolbar()}
          </div>
        );
      }
    }

    return null;
  }
  #prepToolbar(): VNode {
    const { bemClass } = kulManager.theme;

    const { changeView, leftButton, rightButton } = this.#adapter.elements.jsx;
    return (
      <div class={bemClass("toolbar")}>
        {leftButton()}
        {changeView()}
        {rightButton()}
      </div>
    );
  }
  #prepView(): VNode {
    const { data, sanitizeProps, theme } = kulManager;
    const { bemClass } = theme;

    const { left, right } = this.#adapter.controller.get.defaults;
    const { leftTree, rightTree } = this.#adapter.elements.jsx;
    const {
      isLeftPanelOpened,
      isRightPanelOpened,
      kulShape,
      kulView,
      leftShape,
      rightShape,
    } = this;

    const leftShapes = left[kulShape]();
    const leftSanitized: KulDataGenericCell[] = [];
    for (let index = 0; index < leftShapes.length; index++) {
      const s = leftShapes[index];
      leftSanitized.push(sanitizeProps(s));
    }
    const rightShapes = right[kulShape]();
    const rightSanitized: KulDataGenericCell[] = [];
    for (let index = 0; index < rightShapes.length; index++) {
      const s = rightShapes[index];
      rightSanitized.push(sanitizeProps(s));
    }

    const shapes = data.cell.shapes.decorate(
      kulShape,
      [leftShape, rightShape],
      async (e) => this.onKulEvent(e, "kul-event"),
      [...leftSanitized, ...rightSanitized],
    ).element;

    return (
      <Fragment>
        <div
          class={bemClass("view", null, {
            [kulView]: true,
          })}
        >
          <div class={bemClass("view", "left")}>{shapes[0]}</div>
          {isLeftPanelOpened && leftTree()}
          {isRightPanelOpened && rightTree()}
          {this.#isOverlay() && (
            <div
              class={bemClass("view", "slider")}
              onInput={this.#updateOverlayWidth.bind(this)}
              onTouchStart={this.#updateOverlayWidth.bind(this)}
            >
              <input
                class={bemClass("view", "input")}
                data-cy={CY_ATTRIBUTES.input}
                type="range"
                min="0"
                max="100"
                value="50"
              />
            </div>
          )}
          <div class={bemClass("view", "right")}>{shapes[1]}</div>
        </div>
      </Fragment>
    );
  }
  #updateOverlayWidth(event: InputEvent) {
    const sliderValue =
      100 - parseInt((event.target as HTMLInputElement).value);
    this.rootElement.style.setProperty(
      "--kul_compare_overlay_width",
      `${sliderValue}%`,
    );
  }
  //#endregion

  //#region Lifecycle hooks
  connectedCallback() {
    const { theme } = kulManager;

    theme.register(this);
  }
  componentWillLoad() {
    this.updateShapes();
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

    const { kulStyle } = this;

    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID}>
          <div class={bemClass("compare")}>{this.#prepCompare()}</div>
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
