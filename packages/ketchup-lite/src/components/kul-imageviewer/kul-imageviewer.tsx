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
    KulDataCell,
    KulDataDataset,
} from '../../managers/kul-data/kul-data-declarations';
import { KulDebugLifecycleInfo } from '../../managers/kul-debug/kul-debug-declarations';
import { getProps } from '../../utils/componentUtils';
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from '../../variables/GenericVariables';
import {
    KulImageviewerAdapter,
    KulImageviewerEvent,
    KulImageviewerEventPayload,
    KulImageviewerLoadCallback,
    KulImageviewerProps,
} from './kul-imageviewer-declarations';
import { ACTIONS } from './helpers/kul-imageviewer-actions';
import { COMPONENTS } from './helpers/kul-imageviewer-components';
import { KulMasonrySelectedShape } from '../kul-masonry/kul-masonry-declarations';

@Component({
    tag: 'kul-imageviewer',
    styleUrl: 'kul-imageviewer.scss',
    shadow: true,
})
export class KulImageviewer {
    /**
     * References the root HTML element of the component (<kul-imageviewer>).
     */
    @Element() rootElement: HTMLKulImageviewerElement;

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
     * Currently selected image.
     */
    @State() currentShape: KulMasonrySelectedShape = {};

    /*-------------------------------------------------*/
    /*                    P r o p s                    */
    /*-------------------------------------------------*/

    /**
     * Actual data of the image viewer.
     * @default {}
     */
    @Prop({ mutable: true }) kulData: KulDataDataset = {};
    /**
     * Callback invoked when the load button is clicked.
     * @default null
     */
    @Prop({ mutable: true }) kulLoadCallback: KulImageviewerLoadCallback = null;
    /**
     * Custom style of the component.
     * @default ""
     */
    @Prop({ mutable: true }) kulStyle = '';
    /**
     * Configuration parameters of the detail view.
     * @default {}
     */
    @Prop({ mutable: true }) kulValue: KulDataDataset = {};

    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/

    #kulManager = kulManagerInstance();
    #stringify = this.#kulManager.data.cell.stringify;

    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/

    /**
     * Describes event emitted.
     */
    @Event({
        eventName: 'kul-imageviewer-event',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kulEvent: EventEmitter<KulImageviewerEventPayload>;

    onKulEvent(e: Event | CustomEvent, eventType: KulImageviewerEvent) {
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
        return getProps(this, KulImageviewerProps, descriptions);
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

    #adapter: KulImageviewerAdapter = {
        actions: ACTIONS,
        components: COMPONENTS,
        get: {
            imageviewer: () => this,
            manager: () => this.#kulManager,
            state: {
                currentShape: () => {
                    if (this.currentShape.index !== undefined) {
                        const value =
                            this.currentShape.shape.value ||
                            (
                                this.currentShape.shape as Partial<
                                    KulDataCell<'image'>
                                >
                            ).kulValue;
                        return {
                            shape: this.currentShape,
                            value: this.#stringify(value),
                        };
                    } else {
                        return null;
                    }
                },
            },
        },
        set: {
            state: { currentShape: (node) => (this.currentShape = node) },
        },
    };

    #prepDetails(): VNode {
        return (
            <div class="details-grid">
                {this.#adapter.components.jsx.image(this.#adapter)}
                {this.#adapter.components.jsx.tree(this.#adapter)}
                <div class="details-grid__settings">
                    <slot name="settings"></slot>
                </div>
            </div>
        );
    }

    #prepImageviewer(): VNode {
        const className = {
            'main-grid': true,
            'main-grid--has-selection':
                !!this.#adapter.get.state.currentShape(),
        };

        return (
            <div class={className}>
                {this.#prepNavigation()}
                {this.#prepDetails()}
            </div>
        );
    }

    #prepNavigation(): VNode {
        return (
            <div class="navigation-grid">
                {this.#adapter.components.jsx.textfield(this.#adapter)}
                {this.#adapter.components.jsx.button(this.#adapter)}
                {this.#adapter.components.jsx.masonry(this.#adapter)}
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
                    <div class="imageviewer">{this.#prepImageviewer()}</div>
                </div>
            </Host>
        );
    }

    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
}
