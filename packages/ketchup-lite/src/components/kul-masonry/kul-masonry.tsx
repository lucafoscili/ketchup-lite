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
    VNode,
    Watch,
} from '@stencil/core';
import {
    KulGenericEvent,
    KulGenericEventPayload,
    type GenericObject,
} from '../../types/GenericTypes';
import { kulManagerInstance } from '../../managers/kul-manager/kul-manager';
import {
    KulDataCell,
    KulDataDataset,
    KulDataShapes,
    KulDataShapesMap,
} from '../../managers/kul-data/kul-data-declarations';
import { KulDebugLifecycleInfo } from '../../managers/kul-debug/kul-debug-declarations';
import { getProps } from '../../utils/componentUtils';
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from '../../variables/GenericVariables';
import {
    KulMasonryAdapter,
    KulMasonryEvent,
    KulMasonryEventPayload,
    KulMasonryProps,
    KulMasonrySelectedShape,
    KulMasonryView,
} from './kul-masonry-declarations';
import { ACTIONS } from './helpers/kul-masonry-actions';

@Component({
    tag: 'kul-masonry',
    styleUrl: 'kul-masonry.scss',
    shadow: true,
})
export class KulMasonry {
    /**
     * References the root HTML element of the component (<kul-masonry>).
     */
    @Element() rootElement: HTMLKulMasonryElement;

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
     * @default {}
     */
    @State() selectedShape: KulMasonrySelectedShape = {};
    /**
     * The shapes of the component.
     * @default {}
     *
     * @see KulDataShapesMap - For a list of possible shapes.
     */
    @State() shapes: KulDataShapesMap = {};

    /*-------------------------------------------------*/
    /*                    P r o p s                    */
    /*-------------------------------------------------*/

    /**
     * Number of columns of the masonry, doesn't affect sequential views.
     * @default 3
     */
    @Prop({ mutable: true }) kulColumns = 3;
    /**
     * Actual data of the masonry.
     * @default null
     */
    @Prop({ mutable: true }) kulData: KulDataDataset = null;
    /**
     * Allows for the selection of elements.
     * @default ""
     */
    @Prop({ mutable: true, reflect: true }) kulSelectable = false;
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
     * Sets the type of view, either the actual masonry or a sequential view.
     * @default null
     */
    @Prop({ mutable: true }) kulView: KulMasonryView = 'masonry';

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
        eventName: 'kul-masonry-event',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kulEvent: EventEmitter<KulMasonryEventPayload>;

    onKulEvent(e: Event | CustomEvent, eventType: KulMasonryEvent) {
        let shouldUpdateState = false;
        const state: KulMasonrySelectedShape = {};

        switch (eventType) {
            case 'kul-event':
                const { eventType } = (e as KulGenericEvent).detail;
                switch (eventType) {
                    case 'click':
                        if (this.kulSelectable) {
                            const { comp } = (
                                e as CustomEvent<KulGenericEventPayload>
                            ).detail;
                            const index = parseInt(
                                comp.rootElement.dataset.index
                            );
                            if (this.selectedShape.index !== index) {
                                state.index = index;
                                state.shape = this.shapes[this.kulShape][index];
                            }
                            shouldUpdateState = true;
                        }
                        break;
                }
                break;
        }

        if (shouldUpdateState) {
            this.selectedShape = state;
        }

        this.kulEvent.emit({
            comp: this,
            eventType,
            id: this.rootElement.id,
            originalEvent: e,
            selectedShape: this.selectedShape,
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
        return getProps(this, KulMasonryProps, descriptions);
    }
    /**
     * Returns the selected shape.
     * @returns {Promise<KulMasonrySelectedShape>} Selected shape.
     */
    @Method()
    async getSelectedShape(): Promise<KulMasonrySelectedShape> {
        return this.selectedShape;
    }
    /**
     * Redecorates the shapes, updating potential new values.
     */
    @Method()
    async redecorateShapes(): Promise<void> {
        this.updateShapes();
    }
    /**
     * This method is used to trigger a new render of the component.
     */
    @Method()
    async refresh(): Promise<void> {
        forceUpdate(this);
    }
    /**
     * Sets the selected shape by index.
     */
    @Method()
    async setSelectedShape(index: number): Promise<void> {
        const shape = this.shapes?.[this.kulShape]?.[index];
        if (shape) {
            const newState: KulMasonrySelectedShape = {
                index,
                shape,
            };
            this.selectedShape = newState;
        } else {
            this.selectedShape = {};
            this.#kulManager.debug.logs.new(
                this,
                `Couldn't set shape with index: ${index}`,
                'warning'
            );
        }
        this.updateShapes();
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

    #adapter: KulMasonryAdapter = {
        actions: {
            addColumn: async () => {
                this.kulColumns++;
            },
            removeColumn: async () => {
                if (this.kulColumns > 2) {
                    this.kulColumns--;
                }
            },
            changeView: async () => {
                if (this.#isMasonry()) {
                    this.kulView = 'vertical';
                } else if (this.#isVertical()) {
                    this.kulView = 'horizontal';
                } else {
                    this.kulView = 'masonry';
                }
            },
        },
        components: {
            buttons: {
                addColumn: null,
                removeColumn: null,
                changeView: null,
            },
        },
        isMasonry: () => this.#isMasonry(),
        isVertical: () => this.#isVertical(),
        get: { masonry: () => this, shapes: () => this.shapes },
    };

    #divideShapesIntoColumns(columnCount: number): VNode[][] {
        const props: Partial<KulDataCell<KulDataShapes>>[] = this.shapes[
            this.kulShape
        ].map(() => ({
            htmlProps: {
                dataset: { selected: '' },
            },
        }));
        if (this.selectedShape.index !== undefined) {
            props[this.selectedShape.index] = {
                htmlProps: {
                    dataset: { selected: 'true' },
                },
            };
        }
        const columns: VNode[][] = Array.from(
            { length: columnCount },
            () => [],
            []
        );
        const decoratedShapes = this.#kulManager.data.cell.shapes.decorate(
            this.kulShape,
            this.shapes[this.kulShape],
            async (e) => this.onKulEvent(e, 'kul-event'),
            props
        );

        decoratedShapes.element.forEach((element: VNode, index: number) => {
            element.$attrs$['data-index'] = index.toString();
            columns[index % columnCount].push(element);
        });

        return columns;
    }

    #hasShapes() {
        return !!this.shapes?.[this.kulShape];
    }

    #isVertical() {
        return this.kulView === 'vertical';
    }

    #isMasonry() {
        return this.kulView === 'masonry';
    }

    #prepChangeView() {
        return (
            <div class="grid__actions">
                {this.#isMasonry() ? (
                    <div class="grid__actions__sub">
                        {ACTIONS.masonry.add(this.#adapter)}
                        {ACTIONS.masonry.remove(this.#adapter)}
                    </div>
                ) : null}
                {ACTIONS.changeView(this.#adapter)}
            </div>
        );
    }

    #prepView(): VNode[] {
        const columnCount = this.#isMasonry() ? this.kulColumns : 1;
        const columns = this.#divideShapesIntoColumns(columnCount);

        return columns.map((column, colIndex) => (
            <div key={colIndex} class="grid__column">
                {column.map((element) => (
                    <Fragment>{element}</Fragment>
                ))}
            </div>
        ));
    }

    #prepMasonry(): VNode {
        if (this.#hasShapes()) {
            const shapes = this.shapes[this.kulShape];
            if (shapes?.length) {
                return (
                    <Fragment>
                        <div class={`grid grid--${this.kulView}`}>
                            {this.#prepView()}
                        </div>
                        {this.#prepChangeView()}
                    </Fragment>
                );
            }
        }
    }

    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/

    componentWillLoad() {
        this.#kulManager.theme.register(this);
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
        const style = {
            ['--kul_masonry_columns']: this.kulColumns?.toString() || '4',
        };

        return (
            <Host>
                {this.kulStyle ? (
                    <style id={KUL_STYLE_ID}>
                        {this.#kulManager.theme.setKulStyle(this)}
                    </style>
                ) : undefined}
                <div id={KUL_WRAPPER_ID} style={style}>
                    <div class="masonry">{this.#prepMasonry()}</div>
                </div>
            </Host>
        );
    }

    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
}
