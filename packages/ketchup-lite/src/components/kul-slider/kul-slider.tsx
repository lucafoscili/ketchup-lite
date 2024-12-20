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
import { GenericObject, KulDataCyAttributes } from "src/types/GenericTypes";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "src/utils/constants";
import {
  KulSliderEvent,
  KulSliderEventPayload,
  KulSliderValue,
} from "./kul-slider-declarations";

@Component({
  tag: "kul-slider",
  styleUrl: "kul-slider.scss",
  shadow: true,
})
export class KulSlider {
  @Element() rootElement: HTMLKulSliderElement;

  //#region States
  /**
   * Debug information.
   */
  @State() debugInfo = kulManagerSingleton.debug.info.create();
  /**
   * The value of the component.
   */
  @State() value: KulSliderValue = { display: 0, real: 0 };
  //#endregion

  //#region Props
  /**
   * When true, the component is disabled, preventing user interaction.
   * @default false
   */
  @Prop({ mutable: true }) kulDisabled = false;
  /**
   * Defines text to display as a label for the slider.
   * @default ""
   */
  @Prop({ mutable: true }) kulLabel = "";
  /**
   * When true, displays the label before the slider component. Defaults to `false`.
   * @default false
   */
  @Prop({ mutable: true }) kulLeadingLabel = false;
  /**
   * The maximum value allowed by the slider.
   * @default 100
   */
  @Prop({ mutable: false }) kulMax = 100;
  /**
   * The minimum value allowed by the slider.
   * @default 0
   */
  @Prop({ mutable: false }) kulMin = 0;
  /**
   * Sets the increment or decrement steps when moving the slider.
   * @default 1
   */
  @Prop({ mutable: false }) kulStep = 1;
  /**
   * Adds a ripple effect when interacting with the slider.
   * @default true
   */
  @Prop({ mutable: true }) kulRipple = true;
  /**
   * Custom CSS style to apply to the slider component.
   * @default ""
   */
  @Prop({ mutable: true }) kulStyle = "";
  /**
   * The initial numeric value for the slider within the defined range.
   * @default 50
   */
  @Prop({ mutable: true }) kulValue = 50;
  //#endregion

  //#region Internal variables
  #input: HTMLInputElement;
  #rippleSurface: HTMLElement;
  //#endregion

  //#region Events
  @Event({
    eventName: "kul-slider-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulSliderEventPayload>;
  onKulEvent(e: Event | CustomEvent, eventType: KulSliderEvent) {
    const { theme } = kulManagerSingleton;

    switch (eventType) {
      case "change":
        this.setValue(+this.#input.value);
        this.refresh();
        break;
      case "input":
        this.value.display = +this.#input.value;
        this.refresh();
        break;
      case "pointerdown":
        if (this.kulRipple) {
          theme.ripple.trigger(e as PointerEvent, this.#rippleSurface);
        }
    }
    this.kulEvent.emit({
      comp: this,
      eventType,
      id: this.rootElement.id,
      originalEvent: e,
      value: this.value,
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
   * @returns {Promise<GenericObject>} Promise resolved with an object containing the component's properties.
   */
  @Method()
  async getProps(): Promise<GenericObject> {
    const { getProps } = kulManagerSingleton;

    return getProps(this);
  }
  /**
   * Used to retrieve the component's current state.
   * @returns {Promise<KulSliderState>} Promise resolved with the current state of the component.
   */
  @Method()
  async getValue(): Promise<KulSliderValue> {
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
   * @param {KulSliderState} value - The new state to be set on the component.
   * @returns {Promise<void>}
   */
  @Method()
  async setValue(value: number): Promise<void> {
    this.value = { display: value, real: value };
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

  //#region Lifecycle hooks
  componentWillLoad() {
    const { theme } = kulManagerSingleton;

    const { kulValue } = this;

    if (kulValue) {
      this.setValue(kulValue);
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
    const { theme } = kulManagerSingleton;

    const {
      kulDisabled,
      kulLabel,
      kulMax,
      kulMin,
      kulRipple,
      kulStep,
      kulStyle,
      value,
    } = this;

    const className = {
      slider: true,
      "slider--disabled": this.kulDisabled,
    };

    const formClassName = {
      "form-field": true,
      "form-field--align-end": this.kulLeadingLabel,
    };

    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{theme.setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID}>
          <div class={formClassName}>
            <div
              class={className}
              style={{
                "--kul_slider_value": `${((value.display - kulMin) / (kulMax - kulMin)) * 100}%`,
              }}
            >
              <input
                type="range"
                class="slider__native-control"
                data-cy={KulDataCyAttributes.INPUT}
                min={kulMin}
                max={kulMax}
                step={kulStep}
                value={value.real}
                disabled={kulDisabled}
                onBlur={(e) => {
                  this.onKulEvent(e, "blur");
                }}
                onChange={(e) => {
                  this.onKulEvent(e, "change");
                }}
                onFocus={(e) => {
                  this.onKulEvent(e, "focus");
                }}
                onInput={(e) => {
                  this.onKulEvent(e, "input");
                }}
                onPointerDown={(e) => {
                  this.onKulEvent(e, "pointerdown");
                }}
                ref={(el) => {
                  if (el) {
                    this.#input = el;
                  }
                }}
              />
              <div class="slider__track">
                <div class="slider__thumb-underlay">
                  <div
                    class="slider__thumb"
                    ref={(el) => {
                      if (kulRipple) {
                        this.#rippleSurface = el;
                      }
                    }}
                  ></div>
                </div>
              </div>
              <span class="slider__value">{value.display}</span>
            </div>
            <label class="form-field__label">{kulLabel}</label>
          </div>
        </div>
      </Host>
    );
  }
  disconnectedCallback() {
    const { theme } = kulManagerSingleton;

    theme.unregister(this);
  }
}
//#endregion
