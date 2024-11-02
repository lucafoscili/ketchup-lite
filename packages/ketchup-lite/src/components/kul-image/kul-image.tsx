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
    VNode,
} from '@stencil/core';
import type { GenericObject } from '../../types/GenericTypes';
import { kulManagerInstance } from '../../managers/kul-manager/kul-manager';
import {
    KulImageEvent,
    KulImageEventPayload,
    KulImageProps,
} from './kul-image-declarations';
import { KulThemeColorValues } from '../../managers/kul-theme/kul-theme-declarations';
import { getProps } from '../../utils/componentUtils';
import {
    CSS_VAR_PREFIX,
    KUL_STYLE_ID,
    KUL_WRAPPER_ID,
} from '../../variables/GenericVariables';
import { KulBadgePropsInterface } from '../kul-badge/kul-badge-declarations';
import { KulDebugLifecycleInfo } from '../../managers/kul-debug/kul-debug-declarations';

@Component({
    tag: 'kul-image',
    assetsDirs: ['assets/svg'],
    styleUrl: 'kul-image.scss',
    shadow: true,
})
export class KulImage {
    /**
     * References the root HTML element of the component (<kul-image>).
     */
    @Element() rootElement: HTMLKulImageElement;

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
     * The selected element.
     * @default false
     */
    @State() error = false;

    /*-------------------------------------------------*/
    /*                    P r o p s                    */
    /*-------------------------------------------------*/

    /**
     * This property is used to attach a badge to the component.
     * @default null
     */
    @Prop({ mutable: true }) kulBadgeProps: KulBadgePropsInterface = null;
    /**
     * Specifies the color of the icon using a CSS variable. This property is used to set the color of the component's icon.
     * @default KulThemeColorValues.ICON
     *
     * @see KulThemeColorValues - For a list of available CSS variable names for color.
     */
    @Prop({ mutable: true, reflect: true })
    kulColor = `var(${KulThemeColorValues.ICON})`;
    /**
     * Controls the display of a loading indicator. When enabled, a spinner is shown until the image finishes loading. This property is not compatible with SVG images.
     * @default false
     */
    @Prop({ mutable: true, reflect: true }) kulShowSpinner = false;
    /**
     * Sets the width of the icon. This property accepts any valid CSS measurement value (e.g., px, %, vh, etc.) and defaults to 100%.
     * @default '100%'
     */
    @Prop({ mutable: true, reflect: true }) kulSizeX = '100%';
    /**
     * Sets the height of the icon. This property accepts any valid CSS measurement value (e.g., px, %, vh, etc.) and defaults to 100%.
     * @default '100%'
     */
    @Prop({ mutable: true, reflect: true }) kulSizeY = '100%';
    /**
     * Customizes the style of the component. This property allows you to apply a custom CSS style to the component.
     * @default ""
     */
    @Prop({ mutable: true, reflect: true }) kulStyle = '';
    /**
     * Defines the source URL of the image. This property is used to set the image resource that the component should display.
     * @default ""
     */
    @Prop({ mutable: true, reflect: true }) kulValue = '';

    /*-------------------------------------------------*/
    /*        I n t e r n a l   V a r i a b l e s      */
    /*-------------------------------------------------*/

    #kulManager = kulManagerInstance();

    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/

    /**
     * Describes event emitted.
     */
    @Event({
        eventName: 'kul-image-event',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kulEvent: EventEmitter<KulImageEventPayload>;

    onKulEvent(e: Event | CustomEvent, eventType: KulImageEvent) {
        this.kulEvent.emit({
            comp: this,
            id: this.rootElement.id,
            originalEvent: e,
            eventType,
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
     * Used to retrieve component's props values.
     * @param {boolean} descriptions - When provided and true, the result will be the list of props with their description.
     * @returns {Promise<GenericObject>} List of props as object, each key will be a prop.
     */
    @Method()
    async getProps(descriptions?: boolean): Promise<GenericObject> {
        return getProps(this, KulImageProps, descriptions);
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

    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/

    createIcon(): VNode {
        const className = {
            image__icon: true,
        };
        const style = {
            ['--kul_image_background']: this.kulColor
                ? this.kulColor
                : `var(${KulThemeColorValues.ICON})`,
            ['--kul_image_mask']: '',
        };
        const isThemeIcon = this.kulValue.indexOf(CSS_VAR_PREFIX) > -1;
        if (isThemeIcon) {
            const themeIcon = this.kulValue.replace('--', '');
            className['kul-icon'] = true;
            className[themeIcon] = true;
        }
        const icon = this.error
            ? 'broken_image'
            : isThemeIcon
              ? this.#kulManager.theme.list[this.#kulManager.theme.name].icons[
                    this.kulValue
                ]
              : this.kulValue;
        style['--kul_image_mask'] =
            `url('${getAssetPath(`./assets/svg/${icon}.svg`)}') no-repeat center`;

        return <div class={className} style={style}></div>;
    }

    createImage(): VNode {
        return (
            <img
                onError={(e) => {
                    this.error = true;
                    this.onKulEvent(e, 'error');
                }}
                onLoad={(e) => {
                    this.error = false;
                    this.onKulEvent(e, 'load');
                }}
                src={this.kulValue}
            ></img>
        );
    }

    isResourceUrl(): boolean {
        return !!(
            this.kulValue &&
            (this.kulValue.indexOf('.') > -1 ||
                this.kulValue.indexOf('/') > -1 ||
                this.kulValue.indexOf('\\') > -1)
        );
    }

    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/

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
        if (!this.kulValue) {
            this.#kulManager.debug.logs.new(this, 'Empty image.');
            return;
        }

        let el: VNode;
        let feedback: HTMLElement;
        const isUrl = this.isResourceUrl();
        let spinnerLayout: number;
        let style = {
            '--kul_image_height': this.kulSizeY ? this.kulSizeY : 'auto',
            '--kul_image_width': this.kulSizeX ? this.kulSizeX : '100%',
        };

        if (isUrl && !this.error) {
            el = this.createImage();
        } else {
            el = this.createIcon();
        }

        if (this.kulShowSpinner && isUrl) {
            spinnerLayout = 14;
            feedback = (
                <div class="spinner" title="Image not loaded yet...">
                    <kul-spinner
                        kulActive={true}
                        kulDimensions="3px"
                        kulLayout={spinnerLayout}
                    ></kul-spinner>
                </div>
            );
        }

        return (
            <Host style={style}>
                {this.kulStyle ? (
                    <style id={KUL_STYLE_ID}>
                        {this.#kulManager.theme.setKulStyle(this)}
                    </style>
                ) : undefined}
                {feedback}
                <div id={KUL_WRAPPER_ID}>
                    <div
                        class="image"
                        onClick={(e) => {
                            this.onKulEvent(e, 'click');
                        }}
                    >
                        {el}
                        {this.kulBadgeProps ? (
                            <kul-badge {...this.kulBadgeProps}></kul-badge>
                        ) : undefined}
                    </div>
                </div>
            </Host>
        );
    }

    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
}
