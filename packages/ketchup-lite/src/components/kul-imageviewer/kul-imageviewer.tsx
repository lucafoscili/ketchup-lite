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
  VNode,
} from "@stencil/core";
import { kulManagerSingleton } from "src/global/global";
import {
  KulDataCell,
  KulDataDataset,
} from "src/managers/kul-data/kul-data-declarations";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "src/utils/constants";
import { KulMasonrySelectedShape } from "../kul-masonry/kul-masonry-declarations";
import {
  clearHistory,
  clearSelection,
  newShape,
  updateValue,
} from "./helpers/utils";
import { createAdapter } from "./kul-imageviewer-adapter";
import {
  KulImageviewerAdapterRefs,
  KulImageviewerEvent,
  KulImageviewerEventPayload,
  KulImageviewerHistory,
  KulImageviewerLoadCallback,
  KulImageviewerPropsInterface,
} from "./kul-imageviewer-declarations";

@Component({
  tag: "kul-imageviewer",
  styleUrl: "kul-imageviewer.scss",
  shadow: true,
})
export class KulImageviewer {
  /**
   * References the root HTML element of the component (<kul-imageviewer>).
   */
  @Element() rootElement: HTMLKulImageviewerElement;

  //#region States
  /**
   * Debug information.
   */
  @State() debugInfo = kulManagerSingleton.debug.info.create();
  /**
   * Currently selected image.
   */
  @State() currentShape: KulMasonrySelectedShape = {};
  /**
   * Currently selected image.
   */
  @State() history: KulImageviewerHistory = {};
  /**
   * The history index of the image displayed in the preview.
   */
  @State() historyIndex: number = null;
  /**
   * Reflects the status of the spinner.
   */
  @State() isSpinnerActive = false;
  //#endregion

  //#region Props
  /**
   * Actual data of the image viewer.
   * @default {}
   */
  @Prop({ mutable: true }) kulData: KulDataDataset = {};
  /**
   * Callback invoked when the load button is clicked.
   * @default null
   */
  @Prop({ mutable: true }) kulLoadCallback: KulImageviewerLoadCallback = null;
  /**
   * Custom style of the component.
   * @default ""
   */
  @Prop({ mutable: true }) kulStyle = "";
  /**
   * Configuration parameters of the detail view.
   * @default {}
   */
  @Prop({ mutable: true }) kulValue: KulDataDataset = {};
  //#endregion

  //#region Internal variables
  #adapter = createAdapter(
    {
      compInstance: this,
      currentShape: () => this.#getSelectedShapeValue(this.currentShape),
      history: {
        current: () => this.history[this.currentShape.index],
        currentSnapshot: () => {
          if (this.historyIndex === null) {
            return null;
          }

          const snapshot =
            this.history[this.currentShape.index][this.historyIndex];

          return this.#getSelectedShapeValue(snapshot);
        },
        full: () => this.history,
        index: () => this.historyIndex,
      },
      manager: kulManagerSingleton,
      spinnerStatus: () => this.isSpinnerActive,
    },
    {
      currentShape: (node) => (this.currentShape = node),
      history: {
        index: (index) => (this.historyIndex = index),
        new: (selectedShape, isSnapshot = false) => {
          const historyByIndex = this.history?.[selectedShape.index] || [];

          if (this.historyIndex < historyByIndex.length - 1) {
            historyByIndex.splice(this.historyIndex + 1);
          }

          if (historyByIndex?.length && !isSnapshot) {
            historyByIndex[0] = selectedShape;
            return;
          }

          historyByIndex.push(selectedShape);
          this.history[selectedShape.index] = historyByIndex;
          this.historyIndex = historyByIndex.length - 1;
        },
        pop: (index = null) => {
          if (index !== null) {
            this.history[index] = [this.history[index][0]];
            if (this.historyIndex === 0) {
              this.refresh();
            } else {
              this.historyIndex = 0;
            }
          } else {
            this.history = {};
            this.historyIndex = null;
          }
        },
      },
    },
    () => this.#adapter,
  );
  //#endregion

  //#region Events
  @Event({
    eventName: "kul-imageviewer-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulImageviewerEventPayload>;
  onKulEvent(e: Event | CustomEvent, eventType: KulImageviewerEvent) {
    this.kulEvent.emit({
      comp: this,
      eventType,
      id: this.rootElement.id,
      originalEvent: e,
    });
  }
  //#endregion

  //#region Public methods
  /**
   * Appends a new snapshot to the current shape's history by duplicating it with an updated value.
   * It has no effect when the current shape is not set.
   */
  @Method()
  async addSnapshot(value: string): Promise<void> {
    const { currentShape } = this;

    if (!currentShape || !Object.keys(currentShape)?.length) {
      return;
    }

    const { history } = this.#adapter.controller.set;

    const s = newShape(currentShape);
    updateValue(s.shape, value);
    history.new(s, true);
  }
  /**
   * Clears the history related to the shape identified by the index.
   * When index is not provided, it clear the full history.
   */
  @Method()
  async clearHistory(index: number = null): Promise<void> {
    await clearHistory(this.#adapter, index);
  }
  /**
   * Clears the currently selected shape.
   */
  @Method()
  async clearSelection(): Promise<void> {
    await clearSelection(this.#adapter);
  }
  /**
   * This method is used to retrieve the references to the subcomponents.
   */
  @Method()
  async getComponents(): Promise<KulImageviewerAdapterRefs> {
    return this.#adapter.elements.refs;
  }
  /**
   * Fetches the current snapshot.
   * @returns {Promise<{shape: KulMasonrySelectedShape; value: string;}>} A promise that resolves with the current snapshot's object.
   */
  @Method()
  async getCurrentSnapshot(): Promise<{
    shape: KulMasonrySelectedShape;
    value: string;
  }> {
    return this.#adapter.controller.get.history.currentSnapshot();
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
   * Used to retrieve component's properties and descriptions.
   * @returns {Promise<KulImageviewerPropsInterface>} Promise resolved with an object containing the component's properties.
   */
  @Method()
  async getProps(): Promise<KulImageviewerPropsInterface> {
    const { getProps } = kulManagerSingleton;

    return getProps(this) as KulImageviewerPropsInterface;
  }
  /**
   * This method is used to trigger a new render of the component.
   */
  @Method()
  async refresh(): Promise<void> {
    forceUpdate(this);
  }
  /**
   * Clears the full history and clears the current selection.
   */
  @Method()
  async reset(): Promise<void> {
    await clearHistory(this.#adapter);
    await clearSelection(this.#adapter);
  }
  /**
   * Displays/hides the spinner over the preview.
   */
  @Method()
  async setSpinnerStatus(status: boolean): Promise<void> {
    this.isSpinnerActive = status;
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
  #getSelectedShapeValue(selectedShape: KulMasonrySelectedShape) {
    const { data } = kulManagerSingleton;
    const { cell } = data;
    const { stringify } = cell;

    if (selectedShape.index !== undefined) {
      const value =
        selectedShape.shape.value ||
        (selectedShape.shape as Partial<KulDataCell<"image">>).kulValue;
      return {
        shape: selectedShape,
        value: stringify(value),
      };
    }

    return null;
  }
  #prepViewer(): VNode {
    const { bemClass } = kulManagerSingleton.theme;

    const {
      canvas,
      clearHistory,
      deleteShape,
      redo,
      save,
      spinner,
      tree,
      undo,
    } = this.#adapter.elements.jsx.details;

    return (
      <div class={bemClass("details-grid")}>
        <div class={bemClass("details-grid", "preview")}>
          {canvas()}
          {spinner()}
        </div>
        <div class={bemClass("details-grid", "actions")}>
          {deleteShape()}
          {clearHistory()}
          {undo()}
          {redo()}
          {save()}
        </div>
        {tree()}
        <div class={bemClass("details-grid", "settings")}>
          <slot name="settings"></slot>
        </div>
      </div>
    );
  }
  #prepImageviewer(): VNode {
    const { bemClass } = kulManagerSingleton.theme;

    const { currentShape } = this.#adapter.controller.get;

    return (
      <div
        class={bemClass("main-grid", null, {
          "has-selection": !!currentShape(),
        })}
      >
        {this.#prepExplorer()}
        {this.#prepViewer()}
      </div>
    );
  }
  #prepExplorer(): VNode {
    const { bemClass } = kulManagerSingleton.theme;

    const { load, masonry, textfield } = this.#adapter.elements.jsx.navigation;

    return (
      <div class={bemClass("navigation-grid")}>
        {textfield()}
        {load()}
        {masonry()}
      </div>
    );
  }
  //#endregion

  //#region Lifecycle hooks
  connectedCallback() {
    const { theme } = kulManagerSingleton;

    theme.register(this);
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
    const { bemClass, setKulStyle } = kulManagerSingleton.theme;
    const { kulStyle } = this;

    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID}>
          <div class={bemClass("imageviewer")}>{this.#prepImageviewer()}</div>
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
