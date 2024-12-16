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

import { KulDebugLifecycleInfo } from "../../managers/kul-debug/kul-debug-declarations";
import {
  KulDataCyAttributes,
  type GenericObject,
} from "../../types/GenericTypes";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "../../variables/GenericVariables";
import {
  KulToggleEvent,
  KulToggleEventPayload,
  KulToggleState,
} from "./kul-toggle-declarations";
import { kulManagerSingleton } from "src";

@Component({
  tag: "kul-toggle",
  styleUrl: "kul-toggle.scss",
  shadow: true,
})
export class KulToggle {
  /**
   * References the root HTML element of the component (<kul-toggle>).
   */
  @Element() rootElement: HTMLKulToggleElement;

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
   * The value of the component ("on" or "off").
   * @default ""
   *
   * @see KulToggleState - For a list of possible states.
   */
  @State() value: KulToggleState = "off";

  /*-------------------------------------------------*/
  /*                    P r o p s                    */
  /*-------------------------------------------------*/

  /**
   * Defaults at false. When set to true, the component is disabled.
   * @default false
   */
  @Prop({ mutable: true, reflect: true }) kulDisabled = false;
  /**
   * Defines text to display along with the toggle.
   * @default ""
   */
  @Prop({ mutable: true, reflect: true }) kulLabel = "";
  /**
   * Defaults at false. When set to true, the label will be displayed before the component.
   * @default false
   */
  @Prop({ mutable: true, reflect: true }) kulLeadingLabel = false;
  /**
   * When set to true, the pointerdown event will trigger a ripple effect.
   * @default true
   */
  @Prop({ mutable: true, reflect: true }) kulRipple = true;
  /**
   * Custom style of the component.
   * @default ""
   */
  @Prop({ mutable: true }) kulStyle = "";
  /**
   * Sets the initial boolean state of the toggle.
   * @default false
   */
  @Prop({ mutable: false }) kulValue = false;

  /*-------------------------------------------------*/
  /*       I n t e r n a l   V a r i a b l e s       */
  /*-------------------------------------------------*/

  #rippleSurface: HTMLElement;

  /*-------------------------------------------------*/
  /*                   E v e n t s                   */
  /*-------------------------------------------------*/

  /**
   * Describes event emitted for various toggle interactions like click, focus, blur.
   */
  @Event({
    eventName: "kul-toggle-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulToggleEventPayload>;

  onKulEvent(e: Event | CustomEvent, eventType: KulToggleEvent) {
    switch (eventType) {
      case "pointerdown":
        if (this.kulRipple) {
          this.#kulManager.theme.ripple.trigger(
            e as PointerEvent,
            this.#rippleSurface,
          );
        }
        break;
    }
    this.kulEvent.emit({
      comp: this,
      eventType,
      id: this.rootElement.id,
      originalEvent: e,
      value: this.value,
      valueAsBoolean: this.value === "on" ? true : false,
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
   * Used to retrieve component's properties and descriptions.
   * @returns {Promise<GenericObject>} Promise resolved with an object containing the component's properties.
   */
  @Method()
  async getProps(): Promise<GenericObject> {
    const { getProps } = kulManagerSingleton;

    return getProps(this);
  }
  /**
   * Used to retrieve the component's current state.
   * @returns {Promise<KulToggleState>} Promise resolved with the current state of the component.
   */
  @Method()
  async getValue(): Promise<KulToggleState> {
    return this.value;
  }
  /**
   * This method is used to trigger a new render of the component.
   */
  @Method()
  async refresh(): Promise<void> {
    forceUpdate(this);
  }
  /**
   * Sets the component's state.
   * @param {KulToggleState} value - The new state to be set on the component.
   * @returns {Promise<void>}
   */
  @Method()
  async setValue(value: KulToggleState | boolean): Promise<void> {
    this.#updateState(value);
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

  #isOn() {
    return this.value === "on" ? true : false;
  }

  #updateState(
    value: KulToggleState | boolean,
    e: CustomEvent<unknown> | Event = new CustomEvent("change"),
  ) {
    if (typeof value === "boolean") {
      value = value ? "on" : "off";
    }
    if (!this.kulDisabled && (value === "off" || value === "on")) {
      this.value = value;
      this.onKulEvent(e, "change");
    }
  }

  /*-------------------------------------------------*/
  /*          L i f e c y c l e   H o o k s          */
  /*-------------------------------------------------*/

  componentWillLoad() {
    if (this.kulValue) {
      this.value = "on";
    }

    this.#kulManager.theme.register(this);
  }

  componentDidLoad() {
    if (this.#rippleSurface) {
      this.#kulManager.theme.ripple.setup(this.#rippleSurface);
    }
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
    const className: Record<string, boolean> = {
      toggle: true,
      "toggle--checked": this.#isOn(),
      "toggle--disabled": this.kulDisabled,
    };
    const formClassName: Record<string, boolean> = {
      "form-field": true,
      "form-field--align-end": this.kulLeadingLabel,
    };
    return (
      <Host>
        {this.kulStyle ? (
          <style id={KUL_STYLE_ID}>
            {this.#kulManager.theme.setKulStyle(this)}
          </style>
        ) : undefined}
        <div id={KUL_WRAPPER_ID}>
          <div class={formClassName}>
            <div class={className}>
              <div class="toggle__track"></div>
              <div class="toggle__thumb-underlay">
                <div class="toggle__thumb">
                  <div
                    ref={(el) => {
                      if (this.kulRipple) {
                        this.#rippleSurface = el;
                      }
                    }}
                  ></div>
                  <input
                    class="toggle__native-control"
                    checked={this.#isOn()}
                    data-cy={KulDataCyAttributes.INPUT}
                    disabled={this.kulDisabled}
                    onBlur={(e) => {
                      this.onKulEvent(e, "blur");
                    }}
                    onChange={(e) => {
                      this.#updateState(this.#isOn() ? "off" : "on", e);
                    }}
                    onFocus={(e) => {
                      this.onKulEvent(e, "focus");
                    }}
                    onPointerDown={(e) => {
                      this.onKulEvent(e, "pointerdown");
                    }}
                    role="toggle"
                    type="checkbox"
                    value={this.value ? "on" : "off"}
                  ></input>
                </div>
              </div>
            </div>
            <label
              class="toggle__label"
              onClick={(e) => {
                this.onKulEvent(e, "change");
              }}
            >
              {this.kulLabel}
            </label>
          </div>
        </div>
      </Host>
    );
  }

  disconnectedCallback() {
    this.#kulManager.theme.unregister(this);
  }
}
