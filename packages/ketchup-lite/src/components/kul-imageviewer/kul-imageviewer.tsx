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

import { kulManagerSingleton } from "src";
import {
  createElements,
  createHandlers,
} from "src/components/kul-imageviewer/helpers/kul-imageviewer-hub";
import {
  clearHistory,
  clearSelection,
  newShape,
  updateValue,
} from "src/components/kul-imageviewer/helpers/kul-imageviewer-utils";
import {
  KulImageviewerAdapter,
  KulImageviewerAdapterElementsRefs,
  KulImageviewerEvent,
  KulImageviewerEventPayload,
  KulImageviewerHistory,
  KulImageviewerLoadCallback,
} from "src/components/kul-imageviewer/kul-imageviewer-declarations";
import { KulMasonrySelectedShape } from "src/components/kul-masonry/kul-masonry-declarations";
import {
  KulDataCell,
  KulDataDataset,
} from "src/managers/kul-data/kul-data-declarations";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { GenericObject } from "src/types/GenericTypes";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "src/variables/GenericVariables";

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
  @State() debugInfo: KulDebugLifecycleInfo = {
    endTime: 0,
    renderCount: 0,
    renderEnd: 0,
    renderStart: 0,
    startTime: performance.now(),
  };
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
  @State() historyIndex = null;
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
  #adapter: KulImageviewerAdapter = {
    elements: {
      jsx: null,
      refs: {
        explorer: {
          load: null,
          masonry: null,
          textfield: null,
        },
        imageviewer: {
          canvas: null,
          clearHistory: null,
          deleteShape: null,
          redo: null,
          save: null,
          spinner: null,
          undo: null,
          tree: null,
        },
      },
    },
    handlers: null,
    state: {
      get: {
        compInstance: this,
        currentShape: () => this.#getSelectedShapeValue(this.currentShape),
        history: {
          current: () => this.history[this.currentShape.index],
          currentSnapshot: () => {
            if (this.historyIndex === null) {
              return;
            }

            const snapshot =
              this.history[this.currentShape.index][this.historyIndex];

            return this.#getSelectedShapeValue(snapshot);
          },
          full: () => this.history,
          index: () => this.historyIndex,
        },
        spinnerStatus: () => this.isSpinnerActive,
      },
      set: {
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
        spinnerStatus: (active) =>
          (this.#adapter.elements.refs.imageviewer.spinner.kulActive = active),
      },
    },
  };
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

    const { history } = this.#adapter.state.set;

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
  async getComponents(): Promise<KulImageviewerAdapterElementsRefs> {
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
    return this.#adapter.state.get.history.currentSnapshot();
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
  }
  #prepViewer(): VNode {
    const {
      canvas,
      clearHistory,
      deleteShape,
      redo,
      save,
      spinner,
      tree,
      undo,
    } = this.#adapter.elements.jsx.imageviewer;

    return (
      <div class="details-grid">
        <div class="details-grid__preview">
          {canvas()}
          {spinner()}
        </div>
        <div class="details-grid__actions">
          {deleteShape()}
          {clearHistory()}
          {undo()}
          {redo()}
          {save()}
        </div>
        {tree()}
        <div class="details-grid__settings">
          <slot name="settings"></slot>
        </div>
      </div>
    );
  }
  #prepImageviewer(): VNode {
    const { currentShape } = this.#adapter.state.get;

    const className = {
      "main-grid": true,
      "main-grid--has-selection": !!currentShape(),
    };

    return (
      <div class={className}>
        {this.#prepExplorer()}
        {this.#prepViewer()}
      </div>
    );
  }
  #prepExplorer(): VNode {
    const { load, masonry, textfield } = this.#adapter.elements.jsx.explorer;

    return (
      <div class="navigation-grid">
        {textfield()}
        {load()}
        {masonry()}
      </div>
    );
  }
  //#endregion

  //#region Lifecycle hooks
  componentWillLoad() {
    const { theme } = kulManagerSingleton;

    this.#adapter.handlers = createHandlers(this.#adapter);
    this.#adapter.elements.jsx = createElements(this.#adapter);

    theme.register(this);
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
          <div class="imageviewer">{this.#prepImageviewer()}</div>
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
