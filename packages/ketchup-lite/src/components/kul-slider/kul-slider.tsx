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

import {
  KulSliderEvent,
  KulSliderEventPayload,
  KulSliderProps,
  KulSliderValue,
} from './kul-slider-declarations';
import { KulDebugLifecycleInfo } from '../../managers/kul-debug/kul-debug-declarations';
import { kulManagerInstance } from '../../managers/kul-manager/kul-manager';
import {
  KulDataCyAttributes,
  type GenericObject,
} from '../../types/GenericTypes';
import { getProps } from '../../utils/componentUtils';
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from '../../variables/GenericVariables';

@Component({
  tag: 'kul-slider',
  styleUrl: 'kul-slider.scss',
  shadow: true,
})
export class KulSlider {
  //#region Root Element
  @Element() rootElement: HTMLKulSliderElement;
  //#endregion
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
   * The value of the component.
   */
  @State() value: KulSliderValue = { display: 0, real: 0 };
  //#endregion
  //#region Props
  /**
   * When true, the component is disabled, preventing user interaction.
   * @default false
   */
  @Prop({ mutable: true, reflect: true }) kulDisabled = false;
  /**
   * Defines text to display as a label for the slider.
   * @default ""
   */
  @Prop({ mutable: true, reflect: true }) kulLabel = '';
  /**
   * When true, displays the label before the slider component. Defaults to `false`.
   * @default false
   */
  @Prop({ mutable: true, reflect: true }) kulLeadingLabel = false;
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
  @Prop({ mutable: true, reflect: true }) kulRipple = true;
  /**
   * Custom CSS style to apply to the slider component.
   * @default ""
   */
  @Prop({ mutable: true, reflect: true }) kulStyle = '';
  /**
   * The initial numeric value for the slider within the defined range.
   * @default 50
   */
  @Prop({ mutable: true, reflect: true }) kulValue = 50;
  //#endregion
  //#region Internal variables
  #input: HTMLInputElement;
  #kulManager = kulManagerInstance();
  #rippleSurface: HTMLElement;
  //#endregion
  //#region Events
  /**
   * Describes event emitted for various slider interactions like click, focus, blur.
   */
  @Event({
    eventName: 'kul-slider-event',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulSliderEventPayload>;
  onKulEvent(e: Event | CustomEvent, eventType: KulSliderEvent) {
    switch (eventType) {
      case 'change':
        this.setValue(+this.#input.value);
        this.refresh();
        break;
      case 'input':
        this.value.display = +this.#input.value;
        this.refresh();
        break;
      case 'pointerdown':
        if (this.kulRipple) {
          this.#kulManager.theme.ripple.trigger(
            e as PointerEvent,
            this.#rippleSurface,
          );
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
   * @param {boolean} descriptions - When true, includes descriptions for each property.
   * @returns {Promise<GenericObject>} Promise resolved with an object containing the component's properties.
   */
  @Method()
  async getProps(descriptions?: boolean): Promise<GenericObject> {
    return getProps(this, KulSliderProps, descriptions);
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
      this.onKulEvent(new CustomEvent('unmount'), 'unmount');
      this.rootElement.remove();
    }, ms);
  }
  //#endregion
  //#region Lifecycle hooks
  componentWillLoad() {
    if (this.kulValue) {
      this.setValue(this.kulValue);
    }

    this.#kulManager.theme.register(this);
  }
  componentDidLoad() {
    if (this.#rippleSurface) {
      this.#kulManager.theme.ripple.setup(this.#rippleSurface);
    }
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
    const className: Record<string, boolean> = {
      slider: true,
      'slider--disabled': this.kulDisabled,
    };
    const formClassName: Record<string, boolean> = {
      'form-field': true,
      'form-field--align-end': this.kulLeadingLabel,
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
            <div
              class={className}
              style={{
                '--kul_slider_value': `${((this.value.display - this.kulMin) / (this.kulMax - this.kulMin)) * 100}%`,
              }}
            >
              <input
                type="range"
                class="slider__native-control"
                data-cy={KulDataCyAttributes.INPUT}
                min={this.kulMin}
                max={this.kulMax}
                step={this.kulStep}
                value={this.value.real}
                disabled={this.kulDisabled}
                onBlur={(e) => {
                  this.onKulEvent(e, 'blur');
                }}
                onChange={(e) => {
                  this.onKulEvent(e, 'change');
                }}
                onFocus={(e) => {
                  this.onKulEvent(e, 'focus');
                }}
                onInput={(e) => {
                  this.onKulEvent(e, 'input');
                }}
                onPointerDown={(e) => {
                  this.onKulEvent(e, 'pointerdown');
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
                      if (this.kulRipple) {
                        this.#rippleSurface = el;
                      }
                    }}
                  ></div>
                </div>
              </div>
              <span class="slider__value">{this.value.display}</span>
            </div>
            <label class="form-field__label">{this.kulLabel}</label>
          </div>
        </div>
      </Host>
    );
  }
  disconnectedCallback() {
    this.#kulManager.theme.unregister(this);
  }
}
//#endregion
