import {
    Component,
    Element,
    Event,
    EventEmitter,
    forceUpdate,
    Fragment,
    h,
    Host,
    Method,
    Prop,
    State,
    Watch,
} from '@stencil/core';
import { type GenericObject } from '../../types/GenericTypes';
import { kulManagerInstance } from '../../managers/kul-manager/kul-manager';
import {
    KulDataCell,
    KulDataDataset,
    KulDataNode,
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
    KulCompareView,
} from './kul-compare-declarations';
import { DEFAULTS } from './helpers/kul-compare-defaults';
import { KulButtonEventPayload } from '../kul-button/kul-button-declarations';

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
     * @default undefined
     *
     * @see KulDataShapesMap - For a list of possible shapes.
     */
    @State() shapes: KulDataShapesMap;
    /**
     * The current view of the compare.
     * @default "before-after"
     */
    @State() view: KulCompareView = 'overlay';
    /**
     * State reflecting whether the left panel is open or not.
     * @default false
     */
    @State() isLeftPanelOpened = false;
    /**
     * State reflecting whether the right panel is open or not
     * @default false
     */
    @State() isRightPanelOpened = false;
    /**
     * Shape on the left.
     * @default false
     */
    @State() leftShape: Partial<KulDataCell<KulDataShapes>>;
    /**
     * Shape on the right.
     * @default false
     */
    @State() rightShape: Partial<KulDataCell<KulDataShapes>>;

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
    @Prop({ mutable: true }) kulView: KulCompareView = 'overlay';

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
    /*                 W a t c h e r s                 */
    /*-------------------------------------------------*/

    @Watch('kulData')
    @Watch('kulShape')
    async updateShapes() {
        try {
            this.shapes = this.#kulManager.data.cell.shapes.getAll(
                this.kulData
            );
            const shapes = this.#getShapes();
            this.leftShape = shapes[0];
            this.rightShape = shapes[1];
        } catch (error) {
            this.#kulManager.debug.logs.new(
                this,
                'Error updating shapes: ' + error,
                'error'
            );
        }
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

    #getShapes() {
        return this.shapes[this.kulShape];
    }

    #hasShapes() {
        return !!this.shapes?.[this.kulShape];
    }

    #isOverlay() {
        return !!(this.view === 'overlay');
    }

    #prepChangeView() {
        const ids = {
            left: 'toggle-left-panel',
            right: 'toggle-right-panel',
            view: 'toggle-view',
        };
        const panelIcon = 'close';
        const panelIconOff = 'view-sequential';
        const styling = 'icon';
        const buttonEventHandler: (
            e: CustomEvent<KulButtonEventPayload>
        ) => void = (e) => {
            const { eventType, id, value } = e.detail;

            switch (eventType) {
                case 'click':
                    switch (id) {
                        case ids.left:
                            this.isLeftPanelOpened =
                                value === 'on' ? true : false;
                            break;
                        case ids.right:
                            this.isRightPanelOpened =
                                value === 'on' ? true : false;
                            break;
                        case ids.view:
                            this.view = value === 'on' ? 'split' : 'overlay';
                            break;
                    }
                    break;
            }
        };
        return (
            <div class="change-view">
                <kul-button
                    id={ids.left}
                    kulIcon={panelIcon}
                    kulIconOff={panelIconOff}
                    kulStyling={styling}
                    kulToggable={true}
                    onKul-button-event={buttonEventHandler}
                    title={
                        this.#isOverlay()
                            ? 'Click to open the left panel.'
                            : 'Click to close the left panel.'
                    }
                ></kul-button>
                <kul-button
                    id={ids.view}
                    kulIcon="compare"
                    kulIconOff="book-open"
                    kulStyling={styling}
                    kulToggable={true}
                    onKul-button-event={buttonEventHandler}
                    title={
                        this.#isOverlay()
                            ? 'Click for split screen comparison.'
                            : 'Click for overlay comparison'
                    }
                ></kul-button>
                <kul-button
                    id={ids.right}
                    kulIcon={panelIcon}
                    kulIconOff={panelIconOff}
                    kulStyling={styling}
                    kulToggable={true}
                    onKul-button-event={buttonEventHandler}
                    title={
                        this.#isOverlay()
                            ? 'Click to open the right panel.'
                            : 'Click to close the right panel.'
                    }
                ></kul-button>
            </div>
        );
    }

    #prepPanel(side: 'left' | 'right') {
        const dataset: KulDataDataset = { nodes: [] };
        const shapes = this.#getShapes();
        for (let index = 0; index < shapes.length; index++) {
            const shape = shapes[index];
            const isCurrentLeft = side === 'left' && this.leftShape === shape;
            const isCurrentRight =
                side === 'right' && this.rightShape === shape;
            const strIndex = String(index).valueOf();
            const node: KulDataNode = {
                id: strIndex,
                value: `${this.kulShape} #${strIndex}`,
            };
            if (isCurrentLeft || isCurrentRight) {
                node.icon = 'check';
            }
            dataset.nodes.push(node);
        }

        return (
            <kul-tree
                class={`view__panel view__panel--${side}`}
                kulData={dataset}
                onKul-tree-event={(e) => {
                    const { eventType, node } = e.detail;

                    switch (eventType) {
                        case 'click':
                            const shape = this.#getShapes()[parseInt(node.id)];
                            switch (side) {
                                case 'left':
                                    this.leftShape = shape;
                                    break;
                                case 'right':
                                    this.rightShape = shape;
                                    break;
                            }
                            break;
                    }
                }}
            ></kul-tree>
        );
    }

    #prepView() {
        const { left, right } = DEFAULTS(this.#isOverlay());
        const shapes = this.#kulManager.data.cell.shapes.decorate(
            this.kulShape,
            [this.leftShape, this.rightShape],
            async (e) => this.onKulEvent(e, 'kul-event'),
            [...left[this.kulShape](), ...right[this.kulShape]()]
        ).element;

        return (
            <Fragment>
                <div class={`view view--${this.view}`}>
                    <div class="view__left">{shapes[0]}</div>
                    {this.isLeftPanelOpened ? this.#prepPanel('left') : null}
                    {this.isRightPanelOpened ? this.#prepPanel('right') : null}
                    {this.#isOverlay() ? (
                        <div
                            class="view__slider"
                            onInput={this.#updateOverlayWidth.bind(this)}
                            onTouchStart={this.#updateOverlayWidth.bind(this)}
                        >
                            <input
                                class="view__slider__input"
                                type="range"
                                min="0"
                                max="100"
                                value="50"
                            />
                        </div>
                    ) : null}
                    <div class="view__right">{shapes[1]}</div>
                </div>
            </Fragment>
        );
    }

    #prepCompare() {
        if (this.#hasShapes()) {
            const shapes = this.shapes[this.kulShape];
            if (shapes?.length > 1) {
                return (
                    <div class="grid">
                        {this.#prepView()}
                        {this.#prepChangeView()}
                    </div>
                );
            }
        }
    }

    #updateOverlayWidth(event: InputEvent) {
        const sliderValue = (event.target as HTMLInputElement).value;
        this.rootElement.style.setProperty(
            '--kul_compare_overlay_width',
            `${sliderValue}%`
        );
    }

    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/

    componentWillLoad() {
        this.#kulManager.theme.register(this);
        this.view = this.kulView;
        this.updateShapes();
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
                    <div class="compare">{this.#prepCompare()}</div>
                </div>
            </Host>
        );
    }

    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
}
