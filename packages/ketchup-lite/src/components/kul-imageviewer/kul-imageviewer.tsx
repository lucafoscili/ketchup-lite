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
} from '@stencil/core';

import { ACTIONS } from './helpers/kul-imageviewer-actions';
import { COMPONENTS } from './helpers/kul-imageviewer-components';
import {
  KulImageviewerAdapter,
  KulImageviewerAdapterRefs,
  KulImageviewerEvent,
  KulImageviewerEventPayload,
  KulImageviewerHistory,
  KulImageviewerLoadCallback,
  KulImageviewerProps,
} from './kul-imageviewer-declarations';
import {
  KulDataCell,
  KulDataDataset,
} from '../../managers/kul-data/kul-data-declarations';
import { KulDebugLifecycleInfo } from '../../managers/kul-debug/kul-debug-declarations';
import { kulManagerInstance } from '../../managers/kul-manager/kul-manager';
import { type GenericObject } from '../../types/GenericTypes';
import { getProps } from '../../utils/componentUtils';
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from '../../variables/GenericVariables';
import { KulMasonrySelectedShape } from '../kul-masonry/kul-masonry-declarations';

@Component({
  tag: 'kul-imageviewer',
  styleUrl: 'kul-imageviewer.scss',
  shadow: true,
})
export class KulImageviewer {
  /**
   * References the root HTML element of the component (<kul-imageviewer>).
   */
  @Element() rootElement: HTMLKulImageviewerElement;

  /*-------------------------------------------------*/
  /*                   S t a t e s                   */
  /*-------------------------------------------------*/

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

  /*-------------------------------------------------*/
  /*                    P r o p s                    */
  /*-------------------------------------------------*/

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
  @Prop({ mutable: true }) kulStyle = '';
  /**
   * Configuration parameters of the detail view.
   * @default {}
   */
  @Prop({ mutable: true }) kulValue: KulDataDataset = {};

  /*-------------------------------------------------*/
  /*       I n t e r n a l   V a r i a b l e s       */
  /*-------------------------------------------------*/

  #kulManager = kulManagerInstance();
  #stringify = this.#kulManager.data.cell.stringify;

  /*-------------------------------------------------*/
  /*                   E v e n t s                   */
  /*-------------------------------------------------*/

  /**
   * Describes event emitted.
   */
  @Event({
    eventName: 'kul-imageviewer-event',
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

  /*-------------------------------------------------*/
  /*           P u b l i c   M e t h o d s           */
  /*-------------------------------------------------*/

  /**
   * Appends a new snapshot to the current shape's history by duplicating it with an updated value.
   * It has no effect when the current shape is not set.
   */
  @Method()
  async addSnapshot(value: string): Promise<void> {
    if (!this.currentShape || !Object.keys(this.currentShape)?.length) {
      return;
    }
    const newShape: KulMasonrySelectedShape = JSON.parse(
      JSON.stringify(this.currentShape),
    );
    this.#adapter.actions.updateValue(newShape.shape, value);
    this.#adapter.set.state.history.new(newShape, true);
  }
  /**
   * Clears the history related to the shape identified by the index.
   * When index is not provided, it clear the full history.
   */
  @Method()
  async clearHistory(index: number = null): Promise<void> {
    await this.#adapter.actions.clearHistory(this.#adapter, index);
  }
  /**
   * Clears the currently selected shape.
   */
  @Method()
  async clearSelection(): Promise<void> {
    await this.#adapter.actions.clearSelection(this.#adapter);
  }
  /**
   * This method is used to retrieve the references to the subcomponents.
   */
  @Method()
  async getComponents(): Promise<KulImageviewerAdapterRefs> {
    return this.#adapter.components.refs;
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
    return this.#adapter.get.state.history.currentSnapshot();
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
   * @param {boolean} descriptions - When true, includes descriptions for each property.
   * @returns {Promise<GenericObject>} Promise resolved with an object containing the component's properties.
   */
  @Method()
  async getProps(descriptions?: boolean): Promise<GenericObject> {
    return getProps(this, KulImageviewerProps, descriptions);
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
    await this.#adapter.actions.clearHistory(this.#adapter);
    await this.#adapter.actions.clearSelection(this.#adapter);
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
      this.onKulEvent(new CustomEvent('unmount'), 'unmount');
      this.rootElement.remove();
    }, ms);
  }

  /*-------------------------------------------------*/
  /*           P r i v a t e   M e t h o d s         */
  /*-------------------------------------------------*/

  #adapter: KulImageviewerAdapter = {
    actions: ACTIONS,
    components: COMPONENTS,
    get: {
      imageviewer: () => this,
      manager: () => this.#kulManager,
      state: {
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
    },
    set: {
      state: {
        currentShape: (node) => (this.currentShape = node),
        history: {
          clear: (index = null) => {
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
        },
        spinnerStatus: (active) =>
          (this.#adapter.components.refs.spinner.kulActive = active),
      },
    },
  };

  #getSelectedShapeValue(selectedShape: KulMasonrySelectedShape) {
    if (selectedShape.index !== undefined) {
      const value =
        selectedShape.shape.value ||
        (selectedShape.shape as Partial<KulDataCell<'image'>>).kulValue;
      return {
        shape: selectedShape,
        value: this.#stringify(value),
      };
    }
  }

  #prepDetails(): VNode {
    const jsx = this.#adapter.components.jsx;
    return (
      <div class="details-grid">
        <div class="details-grid__preview">
          {jsx.canvas(this.#adapter)}
          {jsx.spinner(this.#adapter)}
        </div>
        <div class="details-grid__actions">
          {jsx.delete(this.#adapter)}
          {jsx.clearHistory(this.#adapter)}
          {jsx.undo(this.#adapter)}
          {jsx.redo(this.#adapter)}
          {jsx.save(this.#adapter)}
        </div>
        {jsx.tree(this.#adapter)}
        <div class="details-grid__settings">
          <slot name="settings"></slot>
        </div>
      </div>
    );
  }

  #prepImageviewer(): VNode {
    const className = {
      'main-grid': true,
      'main-grid--has-selection': !!this.#adapter.get.state.currentShape(),
    };

    return (
      <div class={className}>
        {this.#prepNavigation()}
        {this.#prepDetails()}
      </div>
    );
  }

  #prepNavigation(): VNode {
    return (
      <div class="navigation-grid">
        {this.#adapter.components.jsx.textfield(this.#adapter)}
        {this.#adapter.components.jsx.load(this.#adapter)}
        {this.#adapter.components.jsx.masonry(this.#adapter)}
      </div>
    );
  }

  /*-------------------------------------------------*/
  /*          L i f e c y c l e   H o o k s          */
  /*-------------------------------------------------*/

  componentWillLoad() {
    this.#kulManager.theme.register(this);
  }

  componentDidLoad() {
    this.onKulEvent(new CustomEvent('ready'), 'ready');
    this.#kulManager.debug.updateDebugInfo(this, 'did-load');
  }

  componentWillRender() {
    this.#kulManager.debug.updateDebugInfo(this, 'will-render');
  }

  componentDidRender() {
    this.#kulManager.debug.updateDebugInfo(this, 'did-render');
  }

  render() {
    return (
      <Host>
        {this.kulStyle ? (
          <style id={KUL_STYLE_ID}>
            {this.#kulManager.theme.setKulStyle(this)}
          </style>
        ) : undefined}
        <div id={KUL_WRAPPER_ID}>
          <div class="imageviewer">{this.#prepImageviewer()}</div>
        </div>
      </Host>
    );
  }

  disconnectedCallback() {
    this.#kulManager.theme.unregister(this);
  }
}
