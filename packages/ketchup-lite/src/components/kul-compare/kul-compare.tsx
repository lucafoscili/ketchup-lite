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

import { kulManagerSingleton } from "src";
import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import { createDefaults } from "src/components/kul-compare/helpers/kul-compare-hub";
import {
  KulCompareEvent,
  KulCompareEventPayload,
  KulCompareView,
} from "src/components/kul-compare/kul-compare-declarations";
import {
  KulDataCell,
  KulDataDataset,
  KulDataNode,
  KulDataShapes,
  KulDataShapesMap,
} from "src/managers/kul-data/kul-data-declarations";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { GenericObject } from "src/types/GenericTypes";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "src/variables/GenericVariables";

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
  @State() debugInfo: KulDebugLifecycleInfo = {
    endTime: 0,
    renderCount: 0,
    renderEnd: 0,
    renderStart: 0,
    startTime: performance.now(),
  };
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
  @State() leftShape: Partial<KulDataCell<KulDataShapes>>=;
  /**
   * Shape on the right.
   * @default undefined
   */
  @State() rightShape: Partial<KulDataCell<KulDataShapes>>;
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
  @Prop({ mutable: true, reflect: true }) kulShape: KulDataShapes = "image";
  /**
   * Custom style of the component.
   * @default ""
   */
  @Prop({ mutable: true, reflect: true }) kulStyle = "";
  /**
   * Sets the type of view, either styled as a before-after or a side-by-side comparison.
   * @default null
   */
  @Prop({ mutable: true }) kulView: KulCompareView = "overlay";
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
    const { data, debug } = kulManagerSingleton;

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
  #prepChangeView(): VNode {
    const ids = {
      left: "toggle-left-panel",
      right: "toggle-right-panel",
      view: "toggle-view",
    };
    const panelIcon = "close";
    const panelIconOff = "view-sequential";
    const styling = "icon";
    const buttonEventHandler: (
      e: CustomEvent<KulButtonEventPayload>,
    ) => void = (e) => {
      const { eventType, id, value } = e.detail;

      switch (eventType) {
        case "click":
          switch (id) {
            case ids.left:
              this.isLeftPanelOpened = value === "on" ? true : false;
              break;
            case ids.right:
              this.isRightPanelOpened = value === "on" ? true : false;
              break;
            case ids.view:
              this.kulView = value === "on" ? "split" : "overlay";
              break;
          }
          break;
      }
    };
    return (
      <div class="change-view">
        <kul-button
          id={ids.left}
          kulIcon={panelIcon}
          kulIconOff={panelIconOff}
          kulStyling={styling}
          kulToggable={true}
          onKul-button-event={buttonEventHandler}
          title={
            this.#isOverlay()
              ? "Click to open the left panel."
              : "Click to close the left panel."
          }
        ></kul-button>
        <kul-button
          id={ids.view}
          kulIcon="compare"
          kulIconOff="book-open"
          kulStyling={styling}
          kulToggable={true}
          onKul-button-event={buttonEventHandler}
          title={
            this.#isOverlay()
              ? "Click for split screen comparison."
              : "Click for overlay comparison"
          }
        ></kul-button>
        <kul-button
          id={ids.right}
          kulIcon={panelIcon}
          kulIconOff={panelIconOff}
          kulStyling={styling}
          kulToggable={true}
          onKul-button-event={buttonEventHandler}
          title={
            this.#isOverlay()
              ? "Click to open the right panel."
              : "Click to close the right panel."
          }
        ></kul-button>
      </div>
    );
  }
  #prepPanel(side: "left" | "right"): VNode {
    const { kulShape, leftShape, rightShape } = this;

    const dataset: KulDataDataset = { nodes: [] };
    const shapes = this.#getShapes();
    for (let index = 0; index < shapes.length; index++) {
      const shape = shapes[index];
      const isCurrentLeft = side === "left" && leftShape === shape;
      const isCurrentRight = side === "right" && rightShape === shape;
      const strIndex = String(index).valueOf();
      const node: KulDataNode = {
        id: strIndex,
        value: `${kulShape} #${strIndex}`,
      };
      if (isCurrentLeft || isCurrentRight) {
        node.icon = "check";
      }
      dataset.nodes.push(node);
    }
    return (
      <kul-tree
        class={`view__panel view__panel--${side}`}
        kulData={dataset}
        onKul-tree-event={(e) => {
          const { eventType, node } = e.detail;

          switch (eventType) {
            case "click":
              const shape = this.#getShapes()[parseInt(node.id)];
              switch (side) {
                case "left":
                  this.leftShape = shape;
                  break;
                case "right":
                  this.rightShape = shape;
                  break;
              }
              break;
          }
        }}
      ></kul-tree>
    );
  }
  #prepView(): VNode {
    const { data } = kulManagerSingleton;
    const {
      isLeftPanelOpened,
      isRightPanelOpened,
      kulShape,
      kulView,
      leftShape,
      rightShape,
    } = this;

    const { left, right } = createDefaults(this.#isOverlay());
    const shapes = data.cell.shapes.decorate(
      kulShape,
      [leftShape, rightShape],
      async (e) => this.onKulEvent(e, "kul-event"),
      [...left[kulShape](), ...right[kulShape]()],
    ).element;

    return (
      <Fragment>
        <div class={`view view--${kulView}`}>
          <div class="view__left">{shapes[0]}</div>
          {isLeftPanelOpened ? this.#prepPanel("left") : null}
          {isRightPanelOpened ? this.#prepPanel("right") : null}
          {this.#isOverlay() ? (
            <div
              class="view__slider"
              onInput={this.#updateOverlayWidth.bind(this)}
              onTouchStart={this.#updateOverlayWidth.bind(this)}
            >
              <input
                class="view__slider__input"
                type="range"
                min="0"
                max="100"
                value="50"
              />
            </div>
          ) : null}
          <div class="view__right">{shapes[1]}</div>
        </div>
      </Fragment>
    );
  }
  #prepCompare(): VNode {
    if (this.#hasShapes()) {
      const shapes = this.shapes[this.kulShape];
      if (shapes?.length > 1) {
        return (
          <div class="grid">
            {this.#prepView()}
            {this.#prepChangeView()}
          </div>
        );
      }
    }
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
  componentWillLoad() {
    const { theme } = kulManagerSingleton;

    theme.register(this);

    this.updateShapes();
  }
  componentDidLoad() {
    const { debug } = kulManagerSingleton;

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
    const { kulStyle } = this;

    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{theme.setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID}>
          <div class="compare">{this.#prepCompare()}</div>
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
