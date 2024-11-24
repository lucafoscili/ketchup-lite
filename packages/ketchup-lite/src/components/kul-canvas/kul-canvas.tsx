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
import { kulManagerInstance } from '../../managers/kul-manager/kul-manager';
import {
    KulCanvasEvent,
    KulCanvasEventPayload,
    KulCanvasPoints,
    KulCanvasProps,
} from './kul-canvas-declarations';
import { getProps } from '../../utils/componentUtils';
import { KulDebugLifecycleInfo } from '../../managers/kul-debug/kul-debug-declarations';
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from '../../variables/GenericVariables';
import { KulImagePropsInterface } from '../kul-image/kul-image-declarations';
import { GenericObject } from '../../components';

@Component({
    tag: 'kul-canvas',
    styleUrl: 'kul-canvas.scss',
    shadow: true,
})
export class KulCanvas {
    /**
     * References the root HTML element of the component (<kul-canvas>).
     */
    @Element() rootElement: HTMLKulCanvasElement;

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
     * Indicates whether the user is currently painting.
     * @default false
     */
    @State() isPainting = false;
    /**
     * Stores the points of the current stroke.
     * @default []
     */
    @State() points: KulCanvasPoints = [];
    //#endregion
    //#region Props
    /**
     * The color of the brush.
     * @default '#ff0000'
     */
    @Prop({ mutable: true, reflect: true }) kulColor = '#ff0000';
    /**
     * The props of the image displayed inside the badge.
     * @default null
     */
    @Prop({ mutable: true }) kulImageProps: KulImagePropsInterface = null;
    /**
     * The opacity of the brush.
     * @default 1.0
     */
    @Prop({ mutable: true, reflect: true }) kulOpacity = 1.0;
    /**
     * Displays the brush track of the current stroke.
     * @default true
     */
    @Prop({ mutable: true, reflect: true }) kulPreview = true;
    /**
     * The size of the brush.
     * @default 10
     */
    @Prop({ mutable: true, reflect: true }) kulSize = 10;
    /**
     * Customizes the style of the component.
     * @default ""
     */
    @Prop({ mutable: true, reflect: true }) kulStyle = '';
    //#endregion
    //#region Internal variables
    #canvas: HTMLCanvasElement;
    #ctx: CanvasRenderingContext2D;
    #kulManager = kulManagerInstance();
    //#endregion
    //#region Events
    /**
     * Describes events emitted by the component.
     */
    @Event({
        eventName: 'kul-canvas-event',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kulEvent: EventEmitter<KulCanvasEventPayload>;

    onKulEvent(e: Event | CustomEvent, eventType: KulCanvasEvent) {
        this.kulEvent.emit({
            comp: this,
            id: this.rootElement.id,
            originalEvent: e,
            eventType,
            points: this.points,
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
     * @returns {Promise<KulCanvasPropsInterface>} List of props as object, each key will be a prop.
     */
    @Method()
    async getProps(descriptions?: boolean): Promise<GenericObject> {
        return getProps(this, KulCanvasProps, descriptions);
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
    //#region Private methods
    #handlePointerDown(event: PointerEvent) {
        this.isPainting = true;
        this.points = [];
        this.#addPoint(event);
    }

    #handlePointerMove(event: PointerEvent) {
        if (!this.isPainting) {
            return;
        }

        this.#addPoint(event);

        if (this.kulPreview) {
            this.#drawPreview();
        }
    }

    #handlePointerUp(event: PointerEvent) {
        this.isPainting = false;

        this.onKulEvent(event, 'stroke');

        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    }

    #addPoint(event: PointerEvent) {
        const rect = this.#canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        this.points.push({ x, y });
    }

    #drawPreview() {
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        if (this.points.length === 0) {
            return;
        }

        this.#ctx.beginPath();
        this.#ctx.moveTo(
            this.points[0].x * this.#canvas.width,
            this.points[0].y * this.#canvas.height
        );
        for (const point of this.points) {
            this.#ctx.lineTo(
                point.x * this.#canvas.width,
                point.y * this.#canvas.height
            );
        }
        this.#ctx.strokeStyle = this.kulColor;
        this.#ctx.lineWidth = this.kulSize;
        this.#ctx.globalAlpha = this.kulOpacity;
        this.#ctx.stroke();
    }
    //#endregion
    //#region Lifecycle hooks
    componentWillLoad() {
        this.#kulManager.theme.register(this);
    }

    componentDidLoad() {
        this.#ctx = this.#canvas.getContext('2d');
        this.onKulEvent(new CustomEvent('ready'), 'ready');
        this.#kulManager.debug.updateDebugInfo(this, 'did-load');
    }

    componentWillRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'will-render');
    }

    componentDidRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }

    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
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
                    <div class="canvas">
                        <kul-image
                            class="canvas__image"
                            {...this.kulImageProps}
                        ></kul-image>
                        <canvas
                            class="canvas__canvas"
                            ref={(el) => {
                                if (el) {
                                    this.#canvas = el;
                                }
                            }}
                            onPointerDown={(e) => this.#handlePointerDown(e)}
                            onPointerMove={(e) => this.#handlePointerMove(e)}
                            onPointerUp={(e) => this.#handlePointerUp(e)}
                            onPointerOut={(e) => this.#handlePointerUp(e)}
                        ></canvas>
                    </div>
                </div>
            </Host>
        );
    }
}
//#endregion
