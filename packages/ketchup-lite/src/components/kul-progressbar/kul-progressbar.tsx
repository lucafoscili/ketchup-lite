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
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { GenericObject } from "src/types/GenericTypes";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "src/utils/constants";
import {
  KulProgressbarEvent,
  KulProgressbarEventPayload,
} from "./kul-progressbar-declarations";

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

  //#region States
  /**
   * Debug information.
   */
  @State() debugInfo = kulManagerSingleton.debug.info.create();
  //#endregion

  //#region Props
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
  //#endregion

  //#region Events
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
  //#endregion

  //#region Public methods
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
  //#endregion

  //#region Private methods
  #prepIcon() {
    const { get } = kulManagerSingleton.assets;

    const { kulIcon } = this;

    const { style } = get(`./assets/svg/${kulIcon}.svg`);
    return <div class="progress-bar__icon" style={style}></div>;
  }
  #prepLabel() {
    const { kulIcon, kulLabel, kulValue } = this;

    const label: VNode[] = kulLabel
      ? [<div class="progress-bar__text">{kulLabel}</div>]
      : [
          <div class="progress-bar__text">{kulValue}</div>,
          <div class="progress-bar__mu">%</div>,
        ];
    return (
      <div class="progress-bar__label">
        {kulIcon && this.#prepIcon()}
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
  //#endregion

  //#region Lifecycle hooks
  componentWillLoad() {
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
    const { theme } = kulManagerSingleton;

    const { kulIsRadial, kulStyle, kulValue } = this;

    const style = {
      ["--kul_progressbar_percentage_width"]: `${kulValue}%`,
      ["--kul_progressbar_transform"]: `rotate(${kulValue * 3.6}deg)`,
    };

    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{theme.setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID} style={style}>
          {kulIsRadial ? this.#prepRadialBar() : this.#prepProgressBar()}
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
