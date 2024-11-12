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
    KulDataCyAttributes,
    type GenericObject,
} from '../../types/GenericTypes';
import { kulManagerInstance } from '../../managers/kul-manager/kul-manager';
import { KulDebugLifecycleInfo } from '../../managers/kul-debug/kul-debug-declarations';
import { getProps } from '../../utils/componentUtils';
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from '../../variables/GenericVariables';
import {
    KulSliderEvent,
    KulSliderEventPayload,
    KulSliderProps,
} from './kul-slider-declarations';

@Component({
    tag: 'kul-slider',
    styleUrl: 'kul-slider.scss',
    shadow: true,
})
export class KulSlider {
    /**
     * References the root HTML element of the component (<kul-slider>).
     */
    @Element() rootElement: HTMLKulSliderElement;

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
     * The value of the component.
     * @default 0
     */
    @State() value = 0;

    /*-------------------------------------------------*/
    /*                    P r o p s                    */
    /*-------------------------------------------------*/

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

    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/

    #input: HTMLInputElement;
    #kulManager = kulManagerInstance();
    #rippleSurface: HTMLElement;

    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/

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
            case 'pointerdown':
                if (this.kulRipple) {
                    this.#kulManager.theme.ripple.trigger(
                        e as PointerEvent,
                        this.#rippleSurface
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
    async getValue(): Promise<number> {
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
        this.value = value;
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
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/

    componentWillLoad() {
        if (this.kulValue) {
            this.value = this.kulValue;
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
                                '--slider-value': `${((this.value - this.kulMin) / (this.kulMax - this.kulMin)) * 100}%`,
                            }}
                        >
                            <input
                                type="range"
                                class="slider__native-control"
                                data-cy={KulDataCyAttributes.INPUT}
                                min={this.kulMin}
                                max={this.kulMax}
                                step={this.kulStep}
                                value={this.value}
                                disabled={this.kulDisabled}
                                onBlur={(e) => {
                                    this.onKulEvent(e, 'blur');
                                }}
                                onFocus={(e) => {
                                    this.onKulEvent(e, 'focus');
                                }}
                                onInput={(e) => {
                                    this.value = +this.#input.value;
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
                            <span class="slider__value">{this.value}</span>
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