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

import type { GenericObject, KupComponent } from '../../types/GenericTypes';
import {
    KupManager,
    kupManagerInstance,
} from '../../utils/kup-manager/kup-manager';
import { ComponentRadioElement, KupRadioProps } from './kup-radio-declarations';

@Component({
    tag: 'kup-radio',
    styleUrl: 'kup-radio.scss',
    shadow: true,
})
export class KupRadio {
    @Element() rootElement: HTMLElement;

    @State() value: string = '';

    /**
     * Number of columns. When undefined, radio fields will be displayed inline.
     */
    @Prop() columns: number = undefined;
    /**
     * Custom style of the component. For more information: https://ketchup.smeup.com/ketchup-showcase/#/customization
     */
    @Prop() customStyle: string = '';
    /**
     * List of elements.
     */
    @Prop() data: ComponentRadioElement[] = [];
    /**
     * Defaults at false. When set to true, the component is disabled.
     */
    @Prop() disabled: boolean = false;
    /**
     * Defaults at false. When set to true, the label will be on the left of the component.
     */
    @Prop() leadingLabel: boolean = false;
    /**
     * Defaults at null. It's the name that binds the radio buttons together.
     */
    @Prop() name: string = 'radio-list';

    /**
     * Instance of the KupManager class.
     */
    private kupManager: KupManager = kupManagerInstance();

    @Event({
        eventName: 'kupRadioBlur',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupBlur: EventEmitter<{
        value: string;
        checked: boolean;
    }>;

    @Event({
        eventName: 'kupRadioChange',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupChange: EventEmitter<{
        comp: KupRadio;
        value: string;
    }>;

    @Event({
        eventName: 'kupRadioFocus',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupFocus: EventEmitter<{
        value: string;
        checked: boolean;
    }>;

    @Event({
        eventName: 'kupRadioInput',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupInput: EventEmitter<{
        value: string;
        checked: boolean;
    }>;

    //---- Methods ----

    /**
     * Used to retrieve component's props values.
     * @param {boolean} descriptions - When provided and true, the result will be the list of props with their description.
     * @returns {Promise<GenericObject>} List of props as object, each key will be a prop.
     */
    @Method()
    async getProps(descriptions?: boolean): Promise<GenericObject> {
        let props: GenericObject = {};
        if (descriptions) {
            props = KupRadioProps;
        } else {
            for (const key in KupRadioProps) {
                if (Object.prototype.hasOwnProperty.call(KupRadioProps, key)) {
                    props[key] = this[key];
                }
            }
        }
        return props;
    }
    /**
     * This method is used to trigger a new render of the component.
     */
    @Method()
    async refresh(): Promise<void> {
        forceUpdate(this);
    }

    onKupBlur(event: UIEvent & { target: HTMLInputElement }) {
        const { target } = event;
        this.kupBlur.emit({
            value: target.value,
            checked: target.checked,
        });
    }

    onKupChange(i: number) {
        this.value = this.data[i].value;
        for (let index = 0; index < this.data.length; index++) {
            const radio: ComponentRadioElement = this.data[index];
            if (index === i) {
                radio.checked = true;
            } else {
                radio.checked = false;
            }
        }
        this.kupChange.emit({
            comp: this,
            value: this.value,
        });
    }

    onKupFocus(event: UIEvent & { target: HTMLInputElement }) {
        const { target } = event;
        this.kupFocus.emit({
            value: target.value,
            checked: target.checked,
        });
    }

    onKupInput(event: UIEvent & { target: HTMLInputElement }) {
        const { target } = event;
        this.kupInput.emit({
            value: target.value,
            checked: target.checked,
        });
    }

    //---- Lifecycle hooks ----

    componentWillLoad() {
        this.kupManager.debug.logLoad(this, false);
        this.kupManager.theme.register(this);
    }

    componentDidLoad() {
        this.kupManager.debug.logLoad(this, true);
    }

    componentWillRender() {
        this.kupManager.debug.logRender(this, false);
    }

    componentDidRender() {
        const root = this.rootElement.shadowRoot;

        if (root && !this.disabled) {
            let formFields: any = root.querySelectorAll('.form-field');
            for (let i = 0; i < formFields.length; i++) {
                // let component = MDCRadio.attachTo(
                //     formFields[i].querySelector('.mdc-radio')
                // let formField = MDCFormField.attachTo(formFields[i]);
                // formField.input = component;
            }
        }
        this.kupManager.debug.logRender(this, true);
    }

    render() {
        let hostStyle: {} = undefined;
        let formClass: string = 'form-field';
        let wrapperClass: string = 'radio-wrapper';
        let componentLabel: string = '';
        let radioList: Array<HTMLElement> = [];
        let radioEl: HTMLElement;

        if (this.columns) {
            wrapperClass += ' is-grid';
            hostStyle = {
                '--grid-columns': `repeat(${this.columns}, 1fr)`,
            };
        }

        if (this.leadingLabel) {
            formClass += ' form-field--align-end';
        }

        for (let i = 0; i < this.data.length; i++) {
            const classObj: GenericObject = {
                radio: true,
                'radio--checked': this.data[i].checked,
                'radio--disabled': this.disabled,
            };
            componentLabel = this.data[i].label;
            let radioId = this.name + i;

            radioEl = (
                <div class={formClass}>
                    <div class={classObj}>
                        <input
                            class="radio__native-control"
                            type="radio"
                            id={radioId}
                            name={this.name}
                            value={this.data[i].value}
                            checked={this.data[i].checked}
                            disabled={this.disabled}
                            onBlur={(e: any) => this.onKupBlur(e)}
                            onChange={() => this.onKupChange(i)}
                            onFocus={(e: any) => this.onKupFocus(e)}
                            onInput={(e: any) => this.onKupInput(e)}
                        ></input>
                        <div class="radio__background">
                            <div class="radio__outer-circle"></div>
                            <div class="radio__inner-circle"></div>
                        </div>
                    </div>
                    <label htmlFor={this.name}>{componentLabel}</label>
                </div>
            );
            radioList.push(radioEl);
        }

        const customStyle: string = this.kupManager.theme.setCustomStyle(
            this.rootElement as KupComponent
        );

        return (
            <Host style={hostStyle}>
                {customStyle ? <style>{customStyle}</style> : null}
                <div id="kup-component">
                    <div class={wrapperClass}>{radioList}</div>
                </div>
            </Host>
        );
    }

    disconnectedCallback() {
        this.kupManager.theme.unregister(this);
    }
}
