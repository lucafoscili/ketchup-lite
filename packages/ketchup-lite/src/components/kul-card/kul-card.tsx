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
} from '@stencil/core';

import { LAYOUT_HUB } from './helpers/kul-card-layout-hub';
import {
  KulCardProps,
  KulCardEvent,
  KulCardEventPayload,
  KulCardAdapter,
  KulCardLayout,
} from './kul-card-declarations';
import {
  KulDataDataset,
  KulDataShapesMap,
} from '../../managers/kul-data/kul-data-declarations';
import { KulDebugLifecycleInfo } from '../../managers/kul-debug/kul-debug-declarations';
import { kulManagerInstance } from '../../managers/kul-manager/kul-manager';
import type { GenericMap, GenericObject } from '../../types/GenericTypes';
import { getProps } from '../../utils/componentUtils';
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from '../../variables/GenericVariables';

@Component({
  tag: 'kul-card',
  styleUrl: 'kul-card.scss',
  shadow: true,
})
export class KulCard {
  /**
   * References the root HTML element of the component (<kul-card>).
   */
  @Element() rootElement: HTMLKulCardElement;

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
   * The shapes of the component.
   * @default ""
   *
   * @see KulDataShapesMap - For a list of possible shapes.
   */
  @State() shapes: KulDataShapesMap;

  /*-------------------------------------------------*/
  /*                    P r o p s                    */
  /*-------------------------------------------------*/

  /**
   * The actual data of the card.
   * @default null
   */
  @Prop({ mutable: true }) kulData: KulDataDataset = null;
  /**
   * Sets the layout.
   * @default "material"
   */
  @Prop({ mutable: true, reflect: true }) kulLayout: KulCardLayout = 'material';
  /**
   * The width of the card, defaults to 100%. Accepts any valid CSS format (px, %, vw, etc.).
   * @default "100%"
   */
  @Prop({ mutable: true, reflect: true }) kulSizeX = '100%';
  /**
   * The height of the card, defaults to 100%. Accepts any valid CSS format (px, %, vh, etc.).
   * @default "100%"
   */
  @Prop({ mutable: true, reflect: true }) kulSizeY = '100%';
  /**
   * Custom style of the component.
   * @default ""
   */
  @Prop({ mutable: true, reflect: true }) kulStyle = '';

  /*-------------------------------------------------*/
  /*       I n t e r n a l   V a r i a b l e s       */
  /*-------------------------------------------------*/

  #kulManager = kulManagerInstance();

  /*-------------------------------------------------*/
  /*                   E v e n t s                   */
  /*-------------------------------------------------*/

  /**
   * Triggered when an event is fired.
   */
  @Event({
    eventName: 'kul-card-event',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulCardEventPayload>;

  onKulEvent(e: Event | CustomEvent, eventType: KulCardEvent): void {
    this.kulEvent.emit({
      comp: this,
      id: this.rootElement.id,
      eventType,
      originalEvent: e,
    });
  }

  /*-------------------------------------------------*/
  /*           P u b l i c   M e t h o d s           */
  /*-------------------------------------------------*/

  /**
   * Fetches debug information of the component's current state.
   * @returns {Promise<KulDebugLifecycleInfo>} A promise that resolves with the debug information object.
   */
  @Method()
  async getDebugInfo(): Promise<KulDebugLifecycleInfo> {
    return this.debugInfo;
  }
  /**
   * Used to retrieve component's props values.
   * @param {boolean} descriptions - When provided and true, the result will be the list of props with their description.
   * @returns {Promise<GenericObject>} List of props as object, each key will be a prop.
   */
  @Method()
  async getProps(descriptions?: boolean): Promise<GenericObject> {
    return getProps(this, KulCardProps, descriptions);
  }
  /**
   * Used to retrieve component's shapes.
   * @returns {Promise<KulDataShapesMap>} Map of shapes.
   */
  @Method()
  async getShapes(): Promise<KulDataShapesMap> {
    return this.shapes;
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
      this.onKulEvent(new CustomEvent('unmount'), 'unmount');
      this.rootElement.remove();
    }, ms);
  }

  /*-------------------------------------------------*/
  /*           P r i v a t e   M e t h o d s         */
  /*-------------------------------------------------*/

  #adapter: KulCardAdapter = {
    actions: {
      dispatchEvent: async (e) => {
        this.onKulEvent(e, 'kul-event');
      },
    },
    get: { card: () => this, shapes: () => this.shapes },
  };

  /*-------------------------------------------------*/
  /*          L i f e c y c l e   H o o k s          */
  /*-------------------------------------------------*/

  componentWillLoad() {
    this.#kulManager.language.register(this);
    this.#kulManager.theme.register(this);
  }

  componentDidLoad() {
    this.onKulEvent(new CustomEvent('ready'), 'ready');
    this.#kulManager.debug.updateDebugInfo(this, 'did-load');
  }

  componentWillRender() {
    if (this.kulData) {
      this.shapes = this.#kulManager.data.cell.shapes.getAll(this.kulData);
    }
    this.#kulManager.debug.updateDebugInfo(this, 'will-render');
  }

  componentDidRender() {
    this.#kulManager.debug.updateDebugInfo(this, 'did-render');
  }

  render() {
    if (!this.kulData && this.rootElement.children.length < 1) {
      return;
    }

    const style: GenericMap = {
      '--kul_card_height': this.kulSizeY ? this.kulSizeY : '100%',
      '--kul_card_width': this.kulSizeX ? this.kulSizeX : '100%',
    };

    return (
      <Host style={style}>
        {this.kulStyle ? (
          <style id={KUL_STYLE_ID}>
            {this.#kulManager.theme.setKulStyle(this)}
          </style>
        ) : undefined}
        <div
          id={KUL_WRAPPER_ID}
          onClick={(e) => this.onKulEvent(e, 'click')}
          onContextMenu={(e) => this.onKulEvent(e, 'contextmenu')}
          onPointerDown={(e) => this.onKulEvent(e, 'pointerdown')}
        >
          {LAYOUT_HUB[this.kulLayout.toLowerCase()](this.#adapter)}
        </div>
      </Host>
    );
  }

  disconnectedCallback() {
    this.#kulManager.language.unregister(this);
    this.#kulManager.theme.unregister(this);
  }
}
