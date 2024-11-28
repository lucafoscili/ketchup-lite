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
} from '@stencil/core';
import Prism from 'prismjs';
import { KulDebugLifecycleInfo } from '../../managers/kul-debug/kul-debug-declarations';
import { kulManagerInstance } from '../../managers/kul-manager/kul-manager';
import { GenericObject } from '../../types/GenericTypes';
import { getProps } from '../../utils/componentUtils';
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from '../../variables/GenericVariables';
import {
    KulCodeEvent,
    KulCodeEventPayload,
    KulCodeProps,
} from './kul-code-declarations';
import { STATIC_LANGUAGES } from './languages/static-languages';

@Component({
    assetsDirs: ['assets/prism'],
    tag: 'kul-code',
    styleUrl: 'kul-code.scss',
    shadow: true,
})
export class KulCode {
    /**
     * References the root HTML element of the component (<kul-code>).
     */
    @Element() rootElement: HTMLKulCodeElement;

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
     * Value.
     */
    @State() value = '';
    //#endregion

    //#region Props
    /**
     * Automatically formats the value.
     * @default true
     */
    @Prop({ mutable: true, reflect: true }) kulFormat = true;
    /**
     * Sets the language of the snippet.
     * @default "javascript"
     */
    @Prop({ mutable: true, reflect: true }) kulLanguage = 'javascript';
    /**
     * Whether to preserve spaces or not. When missing it is set automatically.
     * @default undefined
     */
    @Prop({ mutable: true, reflect: true }) kulPreserveSpaces: boolean;
    /**
     * Enables customization of the component's style.
     * @default "" - No custom style applied by default.
     */
    @Prop({ mutable: true, reflect: true }) kulStyle = '';
    /**
     * String containing the snippet of code to display.
     * @default ""
     */
    @Prop({ mutable: true, reflect: false }) kulValue = '';
    //#endregion

    //#region Internal variables
    #el: HTMLPreElement | HTMLDivElement;
    #kulManager = kulManagerInstance();
    //#endregion

    //#region Events
    @Event({
        eventName: 'kul-code-event',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kulEvent: EventEmitter<KulCodeEventPayload>;
    onKulEvent(e: Event | CustomEvent, eventType: KulCodeEvent) {
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
     * Retrieves the properties of the component, with optional descriptions.
     * @param {boolean} descriptions - If true, returns properties with descriptions; otherwise, returns properties only.
     * @returns {Promise<GenericObject>} A promise that resolves to an object where each key is a property name, optionally with its description.
     */
    @Method()
    async getProps(descriptions?: boolean): Promise<GenericObject> {
        return getProps(this, KulCodeProps, descriptions);
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
            this.onKulEvent(new CustomEvent('unmount'), 'unmount');
            this.rootElement.remove();
        }, ms);
    }
    //#endregion

    //#region Private methods
    #format(value: string) {
        if (typeof value === 'string' && /^[\{\}]\s*$/i.test(value)) {
            return value.trim();
        } else if (this.#isJson(value)) {
            const parsed = JSON.parse(value);
            return JSON.stringify(parsed, null, 2);
        } else {
            return this.#kulManager.data.cell.stringify(value);
        }
    }
    async #highlightCode(): Promise<void> {
        try {
            if (!Prism.languages[this.kulLanguage]) {
                await this.#loadLanguage();
            }
            Prism.highlightElement(this.#el);
        } catch (error) {
            this.#kulManager.debug.logs.new(
                this,
                'Failed to highlight code:' + error,
                'error'
            );
            this.#el.innerHTML = this.value;
        }
    }
    #isObjectLike(
        obj: unknown
    ): obj is Record<string | number | symbol, unknown> {
        return typeof obj === 'object' && obj !== null;
    }
    #isDictionary(
        obj: unknown
    ): obj is Record<string | number | symbol, unknown> {
        return (
            this.#isObjectLike(obj) &&
            Object.values(obj).every((value) => value != null)
        );
    }
    #isJson(value: string | Record<string, unknown>) {
        return (
            this.kulLanguage?.toLowerCase() === 'json' ||
            this.#isDictionary(value)
        );
    }
    async #loadLanguage() {
        try {
            const module = getAssetPath(
                `./assets/prism/prism-${this.kulLanguage}.min.js`
            );
            await import(module);
            Prism.highlightAll();
        } catch (error) {
            console.error(
                `Failed to load Prism.js component for ${this.kulLanguage}:`,
                error
            );
        }
    }
    #updateValue() {
        this.value = this.kulFormat
            ? this.#format(this.kulValue)
            : this.kulValue;
    }
    //#endregion

    //#region Lifecycle hooks
    componentWillLoad() {
        this.#kulManager.theme.register(this);
        STATIC_LANGUAGES.css(Prism);
        STATIC_LANGUAGES.javascript(Prism);
        STATIC_LANGUAGES.json(Prism);
        STATIC_LANGUAGES.jsx(Prism);
        STATIC_LANGUAGES.markdown(Prism);
        STATIC_LANGUAGES.markup(Prism);
        STATIC_LANGUAGES.python(Prism);
        STATIC_LANGUAGES.regex(Prism);
        STATIC_LANGUAGES.scss(Prism);
        STATIC_LANGUAGES.tsx(Prism);
        STATIC_LANGUAGES.typescript(Prism);
        this.#updateValue();
    }
    componentDidLoad() {
        this.onKulEvent(new CustomEvent('ready'), 'ready');
        this.#kulManager.debug.updateDebugInfo(this, 'did-load');
    }
    componentWillUpdate() {
        this.value = this.#format(this.kulValue);
    }
    componentWillRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'will-render');
    }
    componentDidRender() {
        if (this.#el) {
            this.#highlightCode();
        }
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }
    render() {
        const isPreserveSpaceMissing = !!(
            this.kulPreserveSpaces !== true && this.kulPreserveSpaces !== false
        );
        const isLikelyTextual =
            this.kulLanguage.toLowerCase() === 'text' ||
            this.kulLanguage.toLowerCase() === 'doc' ||
            this.kulLanguage.toLowerCase() === 'markdown' ||
            this.kulLanguage.toLowerCase() === 'css' ||
            this.kulLanguage.toLowerCase() === '';
        const shouldPreserveSpace =
            this.kulPreserveSpaces ||
            (isPreserveSpaceMissing && !isLikelyTextual);
        return (
            <Host>
                {this.kulStyle && (
                    <style id={KUL_STYLE_ID}>
                        {this.#kulManager.theme.setKulStyle(this)}
                    </style>
                )}
                <div id={KUL_WRAPPER_ID}>
                    <div class="container">
                        <div class="header">
                            <span class="title">{this.kulLanguage}</span>
                            <kul-button
                                class={'kul-slim kul-full-height'}
                                kulIcon="content_copy"
                                kulLabel="Copy"
                                kulStyling="flat"
                                onKul-button-event={(e) => {
                                    const { comp, eventType } = e.detail;
                                    switch (eventType) {
                                        case 'click':
                                            navigator.clipboard.writeText(
                                                this.kulValue
                                            );
                                            comp.setMessage();
                                            break;
                                    }
                                }}
                            ></kul-button>
                        </div>
                        {shouldPreserveSpace ? (
                            <pre
                                class={'language-' + this.kulLanguage}
                                key={this.value}
                                ref={(el) => {
                                    if (el) {
                                        this.#el = el;
                                    }
                                }}
                            >
                                <code>{this.value}</code>
                            </pre>
                        ) : (
                            <div
                                class={'body language-' + this.kulLanguage}
                                key={this.value}
                                ref={(el) => {
                                    if (el) {
                                        this.#el = el;
                                    }
                                }}
                            >
                                {this.value}
                            </div>
                        )}
                    </div>
                </div>
            </Host>
        );
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
    //#endregion
}
