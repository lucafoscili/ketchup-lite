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
import { kulManagerSingleton } from "src/global/global";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import {
  CY_ATTRIBUTES,
  KUL_STYLE_ID,
  KUL_WRAPPER_ID,
} from "src/utils/constants";
import {
  KulToggleEvent,
  KulToggleEventPayload,
  KulTogglePropsInterface,
  KulToggleState,
} from "./kul-toggle-declarations";

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

  //#region States
  /**
   * Debug information.
   */
  @State() debugInfo = kulManagerSingleton.debug.info.create();
  /**
   * The value of the component ("on" or "off").
   * @default ""
   *
   * @see KulToggleState - For a list of possible states.
   */
  @State() value: KulToggleState = "off";
  //#endregion

  //#region Props
  /**
   * Defaults at false. When set to true, the component is disabled.
   * @default false
   */
  @Prop({ mutable: true }) kulDisabled = false;
  /**
   * Defines text to display along with the toggle.
   * @default ""
   */
  @Prop({ mutable: true }) kulLabel = "";
  /**
   * Defaults at false. When set to true, the label will be displayed before the component.
   * @default false
   */
  @Prop({ mutable: true }) kulLeadingLabel = false;
  /**
   * When set to true, the pointerdown event will trigger a ripple effect.
   * @default true
   */
  @Prop({ mutable: true }) kulRipple = true;
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
  //#endregion

  //#region Internal variables
  #rippleSurface: HTMLElement;
  //#endregion

  //#region Events
  @Event({
    eventName: "kul-toggle-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulToggleEventPayload>;
  onKulEvent(e: Event | CustomEvent, eventType: KulToggleEvent) {
    const { theme } = kulManagerSingleton;

    const { kulRipple, value } = this;

    switch (eventType) {
      case "pointerdown":
        if (kulRipple) {
          theme.ripple.trigger(e as PointerEvent, this.#rippleSurface);
        }
        break;
    }

    this.kulEvent.emit({
      comp: this,
      eventType,
      id: this.rootElement.id,
      originalEvent: e,
      value: value,
      valueAsBoolean: value === "on" ? true : false,
    });
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
   * @returns {Promise<KulTogglePropsInterface>} Promise resolved with an object containing the component's properties.
   */
  @Method()
  async getProps(): Promise<KulTogglePropsInterface> {
    const { getProps } = kulManagerSingleton;

    return getProps(this) as KulTogglePropsInterface;
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
  //#endregion

  //#region Private methods
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
  //#endregion

  //#region Lifecycle hooks
  componentWillLoad() {
    const { theme } = kulManagerSingleton;

    if (this.kulValue) {
      this.value = "on";
    }

    theme.register(this);
  }
  componentDidLoad() {
    const { debug, theme } = kulManagerSingleton;

    if (this.#rippleSurface) {
      theme.ripple.setup(this.#rippleSurface);
    }

    this.onKulEvent(new CustomEvent("ready"), "ready");
    debug.info.update(this, "did-load");
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

    const {
      kulDisabled,
      kulLabel,
      kulLeadingLabel,
      kulRipple,
      kulStyle,
      value,
    } = this;

    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID}>
          <div
            class={bemClass("form-field", null, {
              "align-end": kulLeadingLabel,
            })}
          >
            <div
              class={bemClass("toggle", null, {
                checked: this.#isOn(),
                disabled: kulDisabled,
              })}
            >
              <div class={bemClass("toggle", "track")}></div>
              <div class={bemClass("toggle", "thumb-underlay")}>
                <div class={bemClass("toggle", "thumb")}>
                  <div
                    data-cy={CY_ATTRIBUTES.ripple}
                    ref={(el) => {
                      if (kulRipple) {
                        this.#rippleSurface = el;
                      }
                    }}
                  ></div>
                  <input
                    class={bemClass("toggle", "native-control")}
                    checked={this.#isOn()}
                    data-cy={CY_ATTRIBUTES.input}
                    disabled={kulDisabled}
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
                    value={value ? "on" : "off"}
                  ></input>
                </div>
              </div>
            </div>
            <label
              class={bemClass("toggle", "label")}
              onClick={(e) => {
                this.onKulEvent(e, "change");
              }}
            >
              {kulLabel}
            </label>
          </div>
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
