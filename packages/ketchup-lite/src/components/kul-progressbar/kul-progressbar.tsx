import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  getAssetPath,
  h,
  Host,
  Method,
  Prop,
  State,
  VNode,
} from "@stencil/core";

import {
  KulProgressbarEvent,
  KulProgressbarEventPayload,
  KulProgressbarProps,
} from "./kul-progressbar-declarations";
import { KulDebugLifecycleInfo } from "../../managers/kul-debug/kul-debug-declarations";
import { kulManagerInstance } from "../../managers/kul-manager/kul-manager";
import { GenericObject } from "../../types/GenericTypes";
import { getProps } from "../../utils/componentUtils";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "../../variables/GenericVariables";

@Component({
  tag: "kul-progressbar",
  styleUrl: "kul-progressbar.scss",
  shadow: true,
})
export class KulProgressbar {
  /**
   * References the root HTML element of the component (<kul-progressbar>).
   */
  @Element() rootElement: HTMLKulProgressbarElement;

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

  /*-------------------------------------------------*/
  /*                    P r o p s                    */
  /*-------------------------------------------------*/

  /**
   * Displays the label in the middle of the progress bar. It's the default for the radial variant and can't be changed.
   * @default false
   */
  @Prop({ reflect: true }) kulCenteredLabel = false;
  /**
   * Specifies an icon to replace the label.
   * @default ""
   */
  @Prop() kulIcon = "";
  /**
   * Radial version.
   * @default false
   */
  @Prop({ reflect: true }) kulIsRadial = false;
  /**
   * Specifies a text for the bar's label.
   * @default ""
   */
  @Prop() kulLabel = "";
  /**
   * Custom style of the component.
   * @default ""
   */
  @Prop() kulStyle = "";
  /**
   * The current value the progress bar must display.
   * @default 0
   */
  @Prop() kulValue = 0;

  /*-------------------------------------------------*/
  /*       I n t e r n a l   V a r i a b l e s       */
  /*-------------------------------------------------*/

  #kulManager = kulManagerInstance();

  /*-------------------------------------------------*/
  /*                   E v e n t s                   */
  /*-------------------------------------------------*/

  /**
   * Describes event emitted.
   */
  @Event({
    eventName: "kul-progressbar-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulProgressbarEventPayload>;

  onKulEvent(e: Event | CustomEvent, eventType: KulProgressbarEvent) {
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
   * Retrieves the debug information reflecting the current state of the component.
   * @returns {Promise<KulDebugLifecycleInfo>} A promise that resolves to a KulDebugLifecycleInfo object containing debug information.
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
   * Triggers a re-render of the component to reflect any state changes.
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

  /*-------------------------------------------------*/
  /*           P r i v a t e   M e t h o d s         */
  /*-------------------------------------------------*/

  #prepIcon() {
    const path = getAssetPath(`./assets/svg/${this.kulIcon}.svg`);
    const style = {
      mask: `url('${path}') no-repeat center`,
      webkitMask: `url('${path}') no-repeat center`,
    };
    return <div class="progress-bar__icon" style={style}></div>;
  }

  #prepLabel() {
    const label: VNode[] = this.kulLabel
      ? [<div class="progress-bar__text">{this.kulLabel}</div>]
      : [
          <div class="progress-bar__text">{this.kulValue}</div>,
          <div class="progress-bar__mu">%</div>,
        ];
    return (
      <div class="progress-bar__label">
        {this.kulIcon && this.#prepIcon()}
        {label}
      </div>
    );
  }

  #prepProgressBar() {
    return (
      <div class={"progress-bar"}>
        <div class="progress-bar__percentage">{this.#prepLabel()}</div>
      </div>
    );
  }

  #prepRadialBar() {
    return (
      <div class={"progress-bar"}>
        {this.#prepLabel()}
        <div
          class={`pie ${this.kulValue ? "has-value" : ""}  ${this.kulValue > 50 ? "half-full" : "half-empty"}`}
        >
          <div class="left-side half-circle"></div>
          <div class="right-side half-circle"></div>
        </div>
        <div class="progress-bar__track"></div>
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
    const style = {
      ["--kul_progressbar_percentage_width"]: `${this.kulValue}%`,
      ["--kul_progressbar_transform"]: `rotate(${this.kulValue * 3.6}deg)`,
    };

    return (
      <Host>
        {this.kulStyle && (
          <style id={KUL_STYLE_ID}>
            {this.#kulManager.theme.setKulStyle(this)}
          </style>
        )}
        <div id={KUL_WRAPPER_ID} style={style}>
          {this.kulIsRadial ? this.#prepRadialBar() : this.#prepProgressBar()}
        </div>
      </Host>
    );
  }

  disconnectedCallback() {
    this.#kulManager.theme.unregister(this);
  }
}
