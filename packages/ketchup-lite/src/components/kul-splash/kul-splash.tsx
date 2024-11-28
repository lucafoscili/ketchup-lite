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
import { KulDebugLifecycleInfo } from '../../managers/kul-debug/kul-debug-declarations';
import { kulManagerInstance } from '../../managers/kul-manager/kul-manager';
import { GenericObject } from '../../types/GenericTypes';
import { getProps } from '../../utils/componentUtils';
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from '../../variables/GenericVariables';
import {
    KulSplashEvent,
    KulSplashEventPayload,
    KulSplashProps,
    KulSplashStates,
} from './kul-splash-declarations';

@Component({
    tag: 'kul-splash',
    styleUrl: 'kul-splash.scss',
    shadow: true,
})
export class KulSplash {
    /**
     * References the root HTML element of the component (<kul-splash>).
     */
    @Element() rootElement: HTMLKulSplashElement;

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
     * The value of the component ("on" or "off").
     * @default ""
     *
     * @see KulButtonState - For a list of possible states.
     */
    @State() state: KulSplashStates = 'initializing';
    //#endregion

    //#region Props
    /**
     * Initial text displayed within the component, typically shown during loading.
     * @default "Loading..." - Indicates that loading or initialization is in progress.
     */
    @Prop({ mutable: true, reflect: false }) kulLabel = 'Loading...';
    /**
     * Enables customization of the component's style.
     * @default "" - No custom style applied by default.
     */
    @Prop({ mutable: true, reflect: true }) kulStyle = '';
    //#endregion

    //#region Internal variables
    #kulManager = kulManagerInstance();
    //#endregion

    //#region Events
    @Event({
        eventName: 'kul-splash-event',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kulEvent: EventEmitter<KulSplashEventPayload>;
    onKulEvent(e: Event | CustomEvent, eventType: KulSplashEvent) {
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
        return getProps(this, KulSplashProps, descriptions);
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
    async unmount(ms: number = 575): Promise<void> {
        setTimeout(() => {
            this.state = 'unmounting';
            setTimeout(() => {
                this.onKulEvent(new CustomEvent('unmount'), 'unmount');
                this.rootElement.remove();
            }, 300);
        }, ms);
    }
    //#endregion

    //#region Lifecycle hooks
    componentWillLoad() {
        this.#kulManager.theme.register(this);
    }
    componentDidLoad() {
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
        return (
            <Host>
                {this.kulStyle ? (
                    <style id={KUL_STYLE_ID}>
                        {this.#kulManager.theme.setKulStyle(this)}
                    </style>
                ) : undefined}
                <div id={KUL_WRAPPER_ID}>
                    <div
                        class={
                            'modal' +
                            (this.state === 'unmounting' ? ' active' : '')
                        }
                    >
                        <div class="wrapper">
                            <div class="widget">
                                <slot></slot>
                            </div>
                            <div class="label">
                                {this.state === 'unmounting'
                                    ? 'Ready!'
                                    : this.kulLabel}
                            </div>
                        </div>
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
