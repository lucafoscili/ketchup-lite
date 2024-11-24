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
    KulCanvasBrush,
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
import { simplifyStroke } from './helpers/kul-canvas-helpers';

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
     * The shape of the brush.
     * @default 'round'
     */
    @Prop({ mutable: true, reflect: true }) kulBrush: KulCanvasBrush = 'round';
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
    #board: HTMLCanvasElement;
    #boardCtx: CanvasRenderingContext2D;
    #container: HTMLDivElement;
    #cursor: HTMLCanvasElement;
    #cursorCtx: CanvasRenderingContext2D;
    #image: HTMLKulImageElement;
    #kulManager = kulManagerInstance();
    //#endregion
    //#region Events
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
            points: this.points?.length
                ? simplifyStroke(this.points, 0.01)
                : this.points,
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
     * Returns the image component.
     */
    @Method()
    async getImage(): Promise<HTMLKulImageElement> {
        return this.#image;
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
     * Sets the height of the canvas.
     */
    @Method()
    async setCanvasHeight(value?: number): Promise<void> {
        if (value !== undefined) {
            this.#board.height = value;
            this.#cursor.height = value;
        } else {
            const h = this.#container.clientHeight;
            this.#board.height = h;
            this.#cursor.height = h;
        }
    }
    /**
     * Sets the width of the canvas.
     */
    @Method()
    async setCanvasWidth(value?: number): Promise<void> {
        if (value !== undefined) {
            this.#board.width = value;
            this.#cursor.width = value;
        } else {
            const w = this.#container.clientWidth;
            this.#board.width = w;
            this.#cursor.width = w;
        }
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
            this.#drawBrushCursor(event);
            return;
        }

        this.#addPoint(event);

        if (this.kulPreview) {
            this.#drawLastSegment();
        }
    }

    #handlePointerUp(event: PointerEvent) {
        this.isPainting = false;

        this.onKulEvent(event, 'stroke');

        this.#boardCtx.clearRect(0, 0, this.#board.width, this.#board.height);
    }

    #addPoint(event: PointerEvent) {
        const rect = this.#board.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        this.points.push({ x, y });
    }

    #drawBrushCursor(event: PointerEvent) {
        this.#cursorCtx.clearRect(0, 0, this.#board.width, this.#board.height);

        const rect = this.#board.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        this.#cursorCtx.beginPath();
        this.#boardCtx.lineCap = 'round';
        this.#boardCtx.lineJoin = 'round';

        switch (this.kulBrush) {
            case 'round':
                this.#cursorCtx.arc(x, y, this.kulSize / 2, 0, Math.PI * 2);
                break;
            case 'square':
                const halfSize = this.kulSize / 2;
                this.#cursorCtx.rect(
                    x - halfSize,
                    y - halfSize,
                    this.kulSize,
                    this.kulSize
                );
                break;
        }

        this.#cursorCtx.fillStyle = this.kulColor;
        this.#cursorCtx.globalAlpha = this.kulOpacity;
        this.#cursorCtx.fill();
    }

    #drawLastSegment() {
        const len = this.points.length;
        if (len < 2) {
            return;
        }

        const lastPoint = this.points[len - 1];
        const secondLastPoint = this.points[len - 2];

        this.#boardCtx.beginPath();

        switch (this.kulBrush) {
            case 'round':
                this.#boardCtx.moveTo(
                    secondLastPoint.x * this.#board.width,
                    secondLastPoint.y * this.#board.height
                );
                this.#boardCtx.lineTo(
                    lastPoint.x * this.#board.width,
                    lastPoint.y * this.#board.height
                );
                break;

            case 'square':
                const halfSize = this.kulSize / 2;
                this.#boardCtx.rect(
                    lastPoint.x * this.#board.width - halfSize,
                    lastPoint.y * this.#board.height - halfSize,
                    this.kulSize,
                    this.kulSize
                );
                break;
        }

        this.#boardCtx.strokeStyle = this.kulColor;
        this.#boardCtx.lineWidth = this.kulSize;
        this.#boardCtx.globalAlpha = this.kulOpacity;
        this.#boardCtx.stroke();
    }
    //#endregion
    //#region Lifecycle hooks
    componentWillLoad() {
        this.#kulManager.theme.register(this);
    }

    componentDidLoad() {
        this.#boardCtx = this.#board.getContext('2d');
        this.#cursorCtx = this.#cursor.getContext('2d');
        this.setCanvasHeight();
        this.setCanvasWidth();
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
                    <div
                        class="canvas"
                        ref={(el) => {
                            if (el) {
                                this.#container = el;
                            }
                        }}
                    >
                        <kul-image
                            class="canvas__image"
                            {...this.kulImageProps}
                            ref={(el) => {
                                if (el) {
                                    this.#image = el;
                                }
                            }}
                        ></kul-image>
                        <canvas
                            class="canvas__board"
                            onPointerDown={(e) => this.#handlePointerDown(e)}
                            onPointerMove={(e) => this.#handlePointerMove(e)}
                            onPointerUp={(e) => this.#handlePointerUp(e)}
                            onPointerOut={(e) => this.#handlePointerUp(e)}
                            ref={(el) => {
                                if (el) {
                                    this.#board = el;
                                }
                            }}
                        ></canvas>
                        <canvas
                            class="canvas__cursor"
                            ref={(el) => {
                                if (el) {
                                    this.#cursor = el;
                                }
                            }}
                        ></canvas>
                    </div>
                </div>
            </Host>
        );
    }
}
//#endregion
