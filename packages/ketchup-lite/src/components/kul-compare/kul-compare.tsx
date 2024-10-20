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
import { type GenericObject } from '../../types/GenericTypes';
import { kulManagerInstance } from '../../managers/kul-manager/kul-manager';
import {
    KulDataCellContainer,
    KulDataDataset,
    KulDataShapes,
    KulDataShapesMap,
} from '../../managers/kul-data/kul-data-declarations';
import { KulDebugLifecycleInfo } from '../../managers/kul-debug/kul-debug-declarations';
import { getProps } from '../../utils/componentUtils';
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from '../../variables/GenericVariables';
import {
    KulCompareEvent,
    KulCompareEventPayload,
    KulCompareProps,
} from './kul-compare-declarations';

@Component({
    tag: 'kul-compare',
    styleUrl: 'kul-compare.scss',
    shadow: true,
})
export class KulCompare {
    /**
     * References the root HTML element of the component (<kul-compare>).
     */
    @Element() rootElement: HTMLKulCompareElement;

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
     * The shapes of the component.
     * @default ""
     *
     * @see KulDataShapesMap - For a list of possible shapes.
     */
    @State() shapes: KulDataShapesMap;

    /*-------------------------------------------------*/
    /*                    P r o p s                    */
    /*-------------------------------------------------*/

    /**
     * Actual data of the compare.
     * @default null
     */
    @Prop({ mutable: true }) kulData: KulDataDataset = null;
    /**
     * Sets the type of shapes to compare.
     * @default ""
     */
    @Prop({ mutable: true, reflect: true }) kulShape: KulDataShapes = 'image';
    /**
     * Custom style of the component.
     * @default ""
     */
    @Prop({ mutable: true, reflect: true }) kulStyle = '';
    /**
     * Sets the type of view, either styled as a before-after or a side-by-side comparison.
     * @default null
     */
    @Prop({ mutable: true }) kulView: 'before-after' | 'side-by-side' =
        'before-after';

    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/

    #kulManager = kulManagerInstance();

    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/

    /**
     * Describes event emitted.
     */
    @Event({
        eventName: 'kul-compare-event',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kulEvent: EventEmitter<KulCompareEventPayload>;

    onKulEvent(e: Event | CustomEvent, eventType: KulCompareEvent) {
        this.kulEvent.emit({
            comp: this,
            eventType,
            id: this.rootElement.id,
            originalEvent: e,
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
        return getProps(this, KulCompareProps, descriptions);
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

    #prepChangeView() {
        return (
            <div class="change-view">
                <kul-button
                    kulIcon="filter_2"
                    kulIconOff="filter_1"
                    kulStyling="icon"
                    kulToggable={true}
                ></kul-button>
            </div>
        );
    }

    #prepView() {
        const shapes = this.shapes[this.kulShape];
        const TagName = 'kul-' + this.kulShape;
        return (
            <div class="view">
                <TagName {...shapes[0]}></TagName>
                <TagName {...shapes[1]}></TagName>
            </div>
        );
    }

    #prepCompare() {
        if (!(this.shapes?.[this.kulShape]?.length < 2)) {
            return;
        }

        return (
            <div class="grid">
                {this.#prepView()}
                {this.#prepChangeView()}
            </div>
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
        if (this.kulData) {
            this.shapes = this.#kulManager.data.extract.shapes(this.kulData);
        }
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
                    <div class="compare">{this.#prepCompare()}</div>
                </div>
            </Host>
        );
    }

    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
}
