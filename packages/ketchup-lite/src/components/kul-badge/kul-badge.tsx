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
import { KulThemeColorValues } from '../../managers/kul-theme/kul-theme-declarations';
import { GenericObject } from '../../types/GenericTypes';
import { getProps } from '../../utils/componentUtils';
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from '../../variables/GenericVariables';
import { KulImagePropsInterface } from '../kul-image/kul-image-declarations';
import {
    KulBadgeEvent,
    KulBadgeEventPayload,
    KulBadgeProps,
} from './kul-badge-declarations';

@Component({
    tag: 'kul-badge',
    styleUrl: 'kul-badge.scss',
    shadow: true,
})
export class KulBadge {
    /**
     * References the root HTML element of the component (<kul-badge>).
     */
    @Element() rootElement: HTMLKulBadgeElement;

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
    //#endregion

    //#region Props
    /**
     * The props of the image displayed inside the badge.
     * @default null
     */
    @Prop({ mutable: true }) kulImageProps: KulImagePropsInterface = null;
    /**
     * The text displayed inside the badge.
     * @default ""
     */
    @Prop({ mutable: true, reflect: false }) kulLabel = '';
    /**
     * Custom style of the component.
     * @default ""
     */
    @Prop({ mutable: true, reflect: true }) kulStyle = '';
    //#endregion

    //#region Internal variables
    #kulManager = kulManagerInstance();
    //#endregion

    //#region Events
    @Event({
        eventName: 'kul-badge-event',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kulEvent: EventEmitter<KulBadgeEventPayload>;
    onKulEvent(e: Event | CustomEvent, eventType: KulBadgeEvent) {
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
     * Fetches debug information of the component's current state.
     * @returns {Promise<KulDebugLifecycleInfo>} A promise that resolves with the debug information object.
     */
    @Method()
    async getDebugInfo(): Promise<KulDebugLifecycleInfo> {
        return this.debugInfo;
    }
    /**
     * Used to retrieve component's props values.
     * @param {boolean} descriptions - When provided and true, the result will be the list of props with their description.
     * @returns {Promise<GenericObject>} List of props as object, each key will be a prop.
     */
    @Method()
    async getProps(descriptions?: boolean): Promise<GenericObject> {
        return getProps(this, KulBadgeProps, descriptions);
    }
    /**
     * This method is used to trigger a new render of the component.
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
        let imageEl: HTMLElement = null;
        if (!this.kulLabel && this.kulImageProps) {
            if (!this.kulImageProps.kulColor) {
                this.kulImageProps.kulColor = `var(${KulThemeColorValues.TEXT_ON_PRIMARY})`;
            }
            imageEl = <kul-image {...this.kulImageProps}></kul-image>;
        }

        return (
            <Host>
                {this.kulStyle ? (
                    <style id={KUL_STYLE_ID}>
                        {this.#kulManager.theme.setKulStyle(this)}
                    </style>
                ) : undefined}
                <div
                    id={KUL_WRAPPER_ID}
                    onClick={(e) => this.onKulEvent(e, 'click')}
                >
                    {this.kulLabel}
                    {imageEl}
                </div>
            </Host>
        );
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
    //#endregion
}
