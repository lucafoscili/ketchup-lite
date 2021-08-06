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

import Picker from 'vanilla-picker';
import {
    KupManager,
    kupManagerInstance,
} from '../../utils/kup-manager/kup-manager';
import { KupTextField } from '../kup-text-field/kup-text-field';
import {
    kupDynamicPositionAttribute,
    KupDynamicPositionElement,
} from '../../utils/kup-dynamic-position/kup-dynamic-position-declarations';
import type { GenericObject, KupComponent } from '../../types/GenericTypes';
import {
    KupColorPickerEventPayload,
    KupColorPickerProps,
} from './kup-color-picker-declarations';
import { KupLanguageGeneric } from '../../utils/kup-language/kup-language-declarations';
import { KupThemeColorValues } from '../../utils/kup-theme/kup-theme-declarations';
import { getProps, setProps } from '../../utils/utils';
import { componentWrapperId } from '../../variables/GenericVariables';

@Component({
    tag: 'kup-color-picker',
    styleUrl: 'kup-color-picker.scss',
    shadow: true,
})
export class KupColorPicker {
    @Element() rootElement: HTMLElement;

    /*-------------------------------------------------*/
    /*                   S t a t e s                   */
    /*-------------------------------------------------*/

    /**
     * State of the component.
     * @default null
     */
    @State() value: string = null;

    /*-------------------------------------------------*/
    /*                    P r o p s                    */
    /*-------------------------------------------------*/

    /**
     * Custom style of the component.
     * @default ""
     * @see https://ketchup.smeup.com/ketchup-showcase/#/customization
     */
    @Prop() customStyle: string = '';
    /**
     * Props of the text field.
     * @default null
     */
    @Prop({ mutable: true }) data: Object = null;
    /**
     * Defaults at false. When set to true, the component is disabled.
     * @default false
     */
    @Prop() disabled: boolean = false;
    /**
     * Sets the initial value of the component. Can be css color name, hex code or rgb code (sample: "red" or rgb(255, 0, 0) or "#FF0000" ).
     * @default ""
     */
    @Prop() initialValue: string = '';
    /**
     * When true, the component's text field will be replaced by a swatch.
     * @default false
     */
    @Prop() swatchOnly: boolean = false;

    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/

    /**
     * Instance of the KupManager class.
     */
    kupManager: KupManager = kupManagerInstance();
    private anchorEl: HTMLElement;
    dropdownEl: HTMLElement;
    private picker: Picker;
    private textfieldEl: KupTextField;

    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/

    @Event({
        eventName: 'kup-colorpicker-change',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupChange: EventEmitter<KupColorPickerEventPayload>;

    @Event({
        eventName: 'kup-colorpicker-input',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupInput: EventEmitter<KupColorPickerEventPayload>;

    private onKupInput(e: CustomEvent): void {
        this.value = e.detail.value;
        this.setHexValue();

        this.kupInput.emit({
            comp: this,
            id: this.rootElement.id,
            value: this.value,
        });
    }

    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/

    /**
     * Used to retrieve component's props values.
     * @param {boolean} descriptions - When provided and true, the result will be the list of props with their description.
     * @returns {Promise<GenericObject>} List of props as object, each key will be a prop.
     */
    @Method()
    async getProps(descriptions?: boolean): Promise<GenericObject> {
        return getProps(this, KupColorPickerProps, descriptions);
    }
    /**
     * Retrieves the component's value.
     * @returns {string} Value of the component.
     */
    @Method()
    async getValue(): Promise<string> {
        return this.value;
    }
    /**
     * Sets the focus to the component.
     */
    @Method()
    async setFocus(): Promise<void> {
        this.textfieldEl.setFocus();
    }
    /**
     * Sets the props to the component.
     * @param {GenericObject} props - Object containing props that will be set to the component.
     */
    @Method()
    async setProps(props: GenericObject): Promise<void> {
        setProps(this, KupColorPickerProps, props);
    }
    /**
     * Sets the component's value.
     * @param {string} value - Value to be set.
     */
    @Method()
    async setValue(value: string): Promise<void> {
        this.value = value;
        this.textfieldEl.setValue(value);
    }
    /**
     * This method is used to trigger a new render of the component.
     */
    @Method()
    async refresh(): Promise<void> {
        forceUpdate(this);
    }

    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/

    private setHexValue(): void {
        if (this.value) {
            if (this.value.indexOf('#') < 0) {
                this.value = this.kupManager.theme.colorCheck(
                    this.value
                ).hexColor;
            }
            if (
                this.picker &&
                this.value &&
                this.value.indexOf('#') > -1 &&
                this.value.length === 7
            ) {
                this.picker.setColour(this.value, true);
            }
        }
    }

    private prepTextField(): VNode {
        let initialValue = undefined;
        let textfieldData = { ...this.data['kup-text-field'] };
        let customStyle: string = ` #kup-component .icon-container{box-sizing: border-box; border: 3px solid rgba(var(${KupThemeColorValues.TEXT}-rgb), .575); border-radius: 50%; background-color:${this.value}!important;}`;
        if (!textfieldData['icon']) {
            textfieldData['icon'] = 'brightness-1';
        }
        if (textfieldData['trailingIcon'] === undefined) {
            textfieldData['trailingIcon'] = true;
        }

        if (this.value === '') {
            initialValue = this.value;
            textfieldData['icon'] = '';
        } else if (!this.value) {
            const message: string =
                this.kupManager.language.translate(
                    KupLanguageGeneric.INVALID_COLOR
                ) +
                ': ' +
                this.value;
            initialValue = message;
            textfieldData['icon'] = 'warning';
            textfieldData['title'] = message;
        } else {
            initialValue = this.value;
            if (textfieldData['icon'] === 'brightness-1') {
                if (!textfieldData['customStyle']) {
                    textfieldData['customStyle'] = customStyle;
                } else {
                    textfieldData['customStyle'] += customStyle;
                }
            }
        }

        return (
            <kup-text-field
                {...textfieldData}
                disabled={this.disabled}
                initialValue={initialValue}
                onkup-textfield-input={(e: any) => this.onKupInput(e)}
                ref={(el) => (this.textfieldEl = el as any)}
            ></kup-text-field>
        );
    }

    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/

    componentWillLoad() {
        this.kupManager.debug.logLoad(this, false);
        this.kupManager.language.register(this);
        this.kupManager.theme.register(this);
        this.value = this.initialValue;
        this.setHexValue();
        if (!this.data) {
            this.data = {
                'kup-text-field': {},
            };
        }
    }

    componentDidLoad() {
        const root = this.rootElement.shadowRoot;

        if (root) {
            this.picker = new Picker({
                alpha: false,
                color: this.value,
                parent: this.anchorEl,
            });
            this.picker['kupColorPicker'] = this;
            this.picker['onClose'] = function (color) {
                let colorPicker = this['kupColorPicker'];
                colorPicker.setValue(color.hex.substr(0, 7));
                colorPicker.kupManager.dynamicPosition.stop(
                    colorPicker.dropdownEl as KupDynamicPositionElement
                );
                colorPicker.kupChange.emit({
                    comp: colorPicker,
                    id: colorPicker.rootElement.id,
                    value: colorPicker.value,
                });
            };
            this.picker['onOpen'] = function () {
                let colorPicker = this['kupColorPicker'];
                if (!colorPicker.dropdownEl) {
                    colorPicker.dropdownEl =
                        this[
                            'kupColorPicker'
                        ].rootElement.shadowRoot.querySelector(
                            '.picker_wrapper'
                        );
                    colorPicker.kupManager.dynamicPosition.register(
                        colorPicker.dropdownEl,
                        colorPicker.anchorEl
                    );
                }
                if (!colorPicker.disabled) {
                    colorPicker.kupManager.dynamicPosition.start(
                        colorPicker.dropdownEl as KupDynamicPositionElement
                    );
                }
            };
        }
        this.kupManager.debug.logLoad(this, true);
    }

    componentWillUpdate() {
        this.setHexValue();
    }

    componentWillRender() {
        this.kupManager.debug.logRender(this, false);
    }

    componentDidRender() {
        this.kupManager.debug.logRender(this, true);
    }

    render() {
        const hostClass: Record<string, boolean> = {};
        let widget: VNode = null;
        if (this.swatchOnly) {
            widget = (
                <button
                    type="button"
                    disabled={this.disabled}
                    class="color-picker"
                    style={{
                        backgroundColor: this.value,
                    }}
                />
            );
        } else {
            widget = this.prepTextField();
        }

        if (
            this.data &&
            this.data['kup-text-field'] &&
            this.data['kup-text-field']['className'] &&
            this.data['kup-text-field']['className'].indexOf(
                'kup-full-height'
            ) > -1
        ) {
            hostClass['kup-full-height'] = true;
        }

        if (
            this.data &&
            this.data['kup-text-field'] &&
            this.data['kup-text-field']['fullWidth']
        ) {
            hostClass['kup-full-width'] = true;
        }

        const customStyle: string = this.kupManager.theme.setCustomStyle(
            this.rootElement as KupComponent
        );

        return (
            <Host class={hostClass}>
                {customStyle ? <style>{customStyle}</style> : null}
                <div
                    id={componentWrapperId}
                    ref={(el) => (this.anchorEl = el as any)}
                >
                    {widget}
                </div>
            </Host>
        );
    }

    disconnectedCallback() {
        this.kupManager.language.unregister(this);
        this.kupManager.theme.unregister(this);
        const dynamicPositionElements: NodeListOf<KupDynamicPositionElement> =
            this.rootElement.shadowRoot.querySelectorAll(
                '[' + kupDynamicPositionAttribute + ']'
            );
        if (dynamicPositionElements.length > 0) {
            this.kupManager.dynamicPosition.unregister(
                Array.prototype.slice.call(dynamicPositionElements)
            );
        }
    }
}
