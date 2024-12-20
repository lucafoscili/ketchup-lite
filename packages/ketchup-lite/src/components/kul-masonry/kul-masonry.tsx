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
import { kulManagerSingleton } from "src/global/global";
import {
  KulDataCell,
  KulDataDataset,
  KulDataShapes,
  KulDataShapesMap,
} from "src/managers/kul-data/kul-data-declarations";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import {
  GenericObject,
  KulGenericEvent,
  KulGenericEventPayload,
} from "src/types/GenericTypes";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "src/utils/constants";
import { createAdapter } from "./kul-masonry-adapter";
import {
  KulMasonryEvent,
  KulMasonryEventPayload,
  KulMasonrySelectedShape,
  KulMasonryView,
} from "./kul-masonry-declarations";

@Component({
  tag: "kul-masonry",
  styleUrl: "kul-masonry.scss",
  shadow: true,
})
export class KulMasonry {
  /**
   * References the root HTML element of the component (<kul-masonry>).
   */
  @Element() rootElement: HTMLKulMasonryElement;

  //#region States
  /**
   * Debug information.
   */
  @State() debugInfo = kulManagerSingleton.debug.info.create();
  /**
   * The selected element.
   * @default {}
   */
  @State() selectedShape: KulMasonrySelectedShape = {};
  /**
   * The shapes of the component.
   * @default {}
   *
   * @see KulDataShapesMap - For a list of possible shapes.
   */
  @State() shapes: KulDataShapesMap = {};
  //#endregion

  //#region Props
  /**
   * Number of columns of the masonry, doesn't affect sequential views.
   * @default 3
   */
  @Prop({ mutable: true }) kulColumns = 3;
  /**
   * Actual data of the masonry.
   * @default null
   */
  @Prop({ mutable: true }) kulData: KulDataDataset = null;
  /**
   * Allows for the selection of elements.
   * @default ""
   */
  @Prop({ mutable: true, reflect: true }) kulSelectable = false;
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
   * Sets the type of view, either the actual masonry or a sequential view.
   * @default null
   */
  @Prop({ mutable: true }) kulView: KulMasonryView = "masonry";
  //#endregion

  //#region Internal variables
  #adapter = createAdapter(
    {
      compInstance: this,
      isMasonry: () => this.#isMasonry(),
      isVertical: () => this.#isVertical(),
      shapes: () => this.shapes,
    },
    () => this.#adapter,
  );
  //#endregion

  //#region Events
  @Event({
    eventName: "kul-masonry-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulMasonryEventPayload>;
  onKulEvent(e: Event | CustomEvent, eventType: KulMasonryEvent) {
    const { kulSelectable, kulShape, selectedShape, shapes } = this;

    let shouldUpdateState = false;
    const state: KulMasonrySelectedShape = {};

    switch (eventType) {
      case "kul-event":
        const { eventType } = (e as KulGenericEvent).detail;
        switch (eventType) {
          case "click":
            if (kulSelectable) {
              const { comp } = (e as CustomEvent<KulGenericEventPayload>)
                .detail;
              const index = parseInt(comp.rootElement.dataset.index);
              if (selectedShape.index !== index) {
                state.index = index;
                state.shape = shapes[kulShape][index];
              }
              shouldUpdateState = true;
            }
            break;
        }
        break;
    }

    if (shouldUpdateState) {
      this.selectedShape = state;
    }

    this.kulEvent.emit({
      comp: this,
      eventType,
      id: this.rootElement.id,
      originalEvent: e,
      selectedShape: this.selectedShape,
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
   * Returns the selected shape.
   * @returns {Promise<KulMasonrySelectedShape>} Selected shape.
   */
  @Method()
  async getSelectedShape(): Promise<KulMasonrySelectedShape> {
    return this.selectedShape;
  }
  /**
   * Redecorates the shapes, updating potential new values.
   */
  @Method()
  async redecorateShapes(): Promise<void> {
    this.updateShapes();
  }
  /**
   * This method is used to trigger a new render of the component.
   */
  @Method()
  async refresh(): Promise<void> {
    forceUpdate(this);
  }
  /**
   * Sets the selected shape by index.
   */
  @Method()
  async setSelectedShape(index: number): Promise<void> {
    const { debug } = kulManagerSingleton;

    const shape = this.shapes?.[this.kulShape]?.[index];
    if (shape) {
      const newState: KulMasonrySelectedShape = {
        index,
        shape,
      };
      this.selectedShape = newState;
    } else {
      this.selectedShape = {};
      debug.logs.new(this, `Couldn't set shape with index: ${index}`);
    }
    this.updateShapes();
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
  #divideShapesIntoColumns(columnCount: number): VNode[][] {
    const { decorate } = kulManagerSingleton.data.cell.shapes;

    const { kulShape, selectedShape, shapes } = this;

    const props: Partial<KulDataCell<KulDataShapes>>[] = shapes[
      this.kulShape
    ].map(() => ({
      htmlProps: {
        dataset: { selected: "" },
      },
    }));
    if (selectedShape.index !== undefined) {
      props[selectedShape.index] = {
        htmlProps: {
          dataset: { selected: "true" },
        },
      };
    }
    const columns: VNode[][] = Array.from(
      { length: columnCount },
      () => [],
      [],
    );
    const decoratedShapes = decorate(
      kulShape,
      shapes[kulShape],
      async (e) => this.onKulEvent(e, "kul-event"),
      props,
    );

    decoratedShapes.element.forEach((element: VNode, index: number) => {
      element.$attrs$["data-index"] = index.toString();
      columns[index % columnCount].push(element);
    });

    return columns;
  }
  #hasShapes() {
    return !!this.shapes?.[this.kulShape];
  }
  #isMasonry() {
    return this.kulView === "masonry";
  }
  #isVertical() {
    return this.kulView === "vertical";
  }
  #prepChangeView() {
    const { addColumn, changeView, removeColumn } = this.#adapter.elements.jsx;

    return (
      <div class="grid__actions">
        {this.#isMasonry() && (
          <div class="grid__actions__sub">
            {addColumn()}
            {removeColumn()}
          </div>
        )}
        {changeView()}
      </div>
    );
  }
  #prepView(): VNode[] {
    const columnCount = this.#isMasonry() ? this.kulColumns : 1;
    const columns = this.#divideShapesIntoColumns(columnCount);

    return columns.map((column, colIndex) => (
      <div key={colIndex} class="grid__column">
        {column.map((element) => (
          <Fragment>{element}</Fragment>
        ))}
      </div>
    ));
  }
  #prepMasonry(): VNode {
    const { kulShape, kulView, shapes } = this;

    if (this.#hasShapes()) {
      if (shapes[kulShape]?.length) {
        return (
          <Fragment>
            <div class={`grid grid--${kulView}`}>{this.#prepView()}</div>
            {this.#prepChangeView()}
          </Fragment>
        );
      }
    }
  }
  //#endregion

  //#region Lifecycle hooks
  componentWillLoad() {
    const { theme } = kulManagerSingleton;

    theme.register(this);
    this.updateShapes();
  }
  componentDidLoad() {
    const { info } = kulManagerSingleton.debug;

    this.onKulEvent(new CustomEvent("ready"), "ready");
    info.update(this, "did-load");
  }
  componentWillRender() {
    const { info } = kulManagerSingleton.debug;

    info.update(this, "will-render");
  }
  componentDidRender() {
    const { info } = kulManagerSingleton.debug;

    info.update(this, "did-render");
  }
  render() {
    const { theme } = kulManagerSingleton;

    const { kulStyle } = this;

    const style = {
      ["--kul_masonry_columns"]: this.kulColumns?.toString() || "4",
    };

    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{theme.setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID} style={style}>
          <div class="masonry">{this.#prepMasonry()}</div>
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
