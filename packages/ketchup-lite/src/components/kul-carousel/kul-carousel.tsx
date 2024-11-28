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
    KulDataCell,
    KulDataDataset,
    KulDataShapes,
    KulDataShapesMap,
} from '../../managers/kul-data/kul-data-declarations';
import { KulDebugLifecycleInfo } from '../../managers/kul-debug/kul-debug-declarations';
import { kulManagerInstance } from '../../managers/kul-manager/kul-manager';
import { GenericObject } from '../../types/GenericTypes';
import { getProps } from '../../utils/componentUtils';
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from '../../variables/GenericVariables';
import { ACTIONS } from './helpers/kul-carousel-actions';
import { COMPONENTS } from './helpers/kul-carousel-components';
import {
    KulCarouselAdapter,
    KulCarouselEvent,
    KulCarouselEventPayload,
    KulCarouselProps,
} from './kul-carousel-declarations';

@Component({
    tag: 'kul-carousel',
    styleUrl: 'kul-carousel.scss',
    shadow: true,
})
export class KulCarousel {
    /**
     * References the root HTML element of the component (<kul-carousel>).
     */
    @Element() rootElement: HTMLKulCarouselElement;

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
     * Tracks the current index of the displayed item.
     * @default 0
     */
    @State() currentIndex = 0;
    /**
     * Collection of shapes/cells to display in the carousel.
     * @default {}
     */
    @State() shapes: KulDataShapesMap = {};
    //#endregion
    //#region Props
    /**
     * Actual data of the carousel.
     * @default null
     */
    @Prop({ mutable: true }) kulData: KulDataDataset = null;
    /**
     * Enable or disable autoplay for the carousel.
     * @default false
     */
    @Prop() kulAutoPlay = false;
    /**
     * Interval in milliseconds for autoplay.
     * @default 3000
     */
    @Prop() kulInterval = 3000;
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
    //#endregion
    //#region Internal variables
    #interval: NodeJS.Timeout;
    #kulManager = kulManagerInstance();
    #lastSwipeTime = 0;
    #swipeThrottleDelay = 300;
    #touchStartX = 0;
    #touchEndX = 0;
    //#endregion
    //#region Events
    @Event({
        eventName: 'kul-carousel-event',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kulEvent: EventEmitter<KulCarouselEventPayload>;
    onKulEvent(e: Event | CustomEvent, eventType: KulCarouselEvent) {
        this.kulEvent.emit({
            comp: this,
            eventType,
            id: this.rootElement.id,
            originalEvent: e,
        });
    }
    //#endregion
    //#region Watchers
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
        return getProps(this, KulCarouselProps, descriptions);
    }
    /**
     * Changes the slide to the specified index if it's within bounds.
     * @param {number} index - The number of the slide to go to.
     */
    @Method()
    async goToSlide(index: number) {
        this.#adapter.actions.toSlide(this.#adapter, index);
    }
    /**
     * Advances to the next slide, looping back to the start if at the end.
     */
    @Method()
    async nextSlide() {
        this.#adapter.actions.next(this.#adapter);
    }
    /**
     * Moves to the previous slide, looping to the last slide if at the beginning.
     */
    @Method()
    async prevSlide() {
        this.#adapter.actions.previous(this.#adapter);
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
    #adapter: KulCarouselAdapter = {
        actions: ACTIONS,
        components: COMPONENTS,
        get: {
            carousel: () => this,
            interval: () => this.#interval,
            manager: () => this.#kulManager,
            state: { currentIndex: () => this.currentIndex },
            totalSlides: () => this.#getTotalSlides(),
        },
        set: {
            interval: (value) => (this.#interval = value),
            state: { currentIndex: (value) => (this.currentIndex = value) },
        },
    };
    #getTotalSlides() {
        return this.shapes?.[this.kulShape]?.length || 0;
    }
    #hasShapes() {
        return !!this.shapes?.[this.kulShape];
    }
    #prepCarousel(): VNode {
        if (this.#hasShapes()) {
            const shapes = this.shapes[this.kulShape];
            if (shapes?.length) {
                return (
                    <Fragment>
                        <div
                            class="carousel__track"
                            role="region"
                            aria-live="polite"
                        >
                            {this.#prepSlide()}
                        </div>
                        <div class="carousel__controls">
                            {this.#adapter.components.back(this.#adapter)}
                            {this.#adapter.components.forward(this.#adapter)}
                        </div>
                        <div class="carousel__indicators-wrapper">
                            <div class="carousel__indicators">
                                {this.#prepIndicators()}
                            </div>
                        </div>
                    </Fragment>
                );
            }
        }
    }
    #prepIndicators(): VNode[] {
        const totalSlides = this.#getTotalSlides();
        const maxIndicators = 9;
        const halfMax = Math.floor(maxIndicators / 2);

        let start = Math.max(0, this.currentIndex - halfMax);
        let end = Math.min(totalSlides, start + maxIndicators);

        if (end === totalSlides) {
            start = Math.max(0, end - maxIndicators);
        }

        const indicators = [];

        if (start > 0) {
            const className = {
                carousel__chevron: true,
                'carousel__chevron--left': true,
            };
            indicators.push(
                <span
                    class={className}
                    onClick={() =>
                        this.#adapter.actions.toSlide(this.#adapter, 0)
                    }
                    title={`Jump to the first slide (#${0})`}
                >
                    «
                </span>
            );
        }

        this.shapes[this.kulShape]
            ?.slice(start, end)
            .forEach(
                (_: Partial<KulDataCell<KulDataShapes>>, index: number) => {
                    const actualIndex = start + index;
                    const isCurrent = actualIndex === this.currentIndex;
                    const isFirst = actualIndex === start;
                    const isLast = actualIndex === end - 1;

                    const className = {
                        carousel__indicator: true,
                        'carousel__indicator--active': isCurrent,
                        'carousel__indicator--small':
                            (isFirst || isLast) && !isCurrent,
                    };
                    indicators.push(
                        <span
                            class={className}
                            onClick={() =>
                                this.#adapter.actions.toSlide(
                                    this.#adapter,
                                    actualIndex
                                )
                            }
                            title={`#${index}`}
                        />
                    );
                }
            );

        if (end < totalSlides) {
            const className = {
                carousel__chevron: true,
                'carousel__chevron--right': true,
            };
            indicators.push(
                <span
                    class={className}
                    onClick={() =>
                        this.#adapter.actions.toSlide(
                            this.#adapter,
                            totalSlides - 1
                        )
                    }
                    title={`Jump to the last slide (#${totalSlides - 1})`}
                >
                    »
                </span>
            );
        }

        return indicators;
    }
    #prepSlide(): VNode {
        const props: Partial<KulDataCell<KulDataShapes>>[] = this.shapes[
            this.kulShape
        ].map(() => ({
            htmlProps: {
                className: 'kul-fit',
            },
        }));

        const decoratedShapes = this.#kulManager.data.cell.shapes.decorate(
            this.kulShape,
            this.shapes[this.kulShape],
            async (e) => this.onKulEvent(e, 'kul-event'),
            props
        ).element;

        return (
            <div class="carousel__slide" data-index={this.currentIndex}>
                <Fragment>{decoratedShapes[this.currentIndex]}</Fragment>
            </div>
        );
    }
    //#endregion
    //#region Lifecycle hooks
    componentWillLoad() {
        this.#kulManager.theme.register(this);
        this.updateShapes();
        if (this.kulAutoPlay) {
            this.#adapter.actions.autoplay.start(this.#adapter);
        }
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
                        class="carousel"
                        onTouchStart={(e) =>
                            (this.#touchStartX = e.touches[0].clientX)
                        }
                        onTouchMove={() => {
                            const swipeDistance =
                                this.#touchEndX - this.#touchStartX;
                            const swipeThreshold = 50;

                            const currentTime = performance.now();

                            if (
                                Math.abs(swipeDistance) > swipeThreshold &&
                                currentTime - this.#lastSwipeTime >
                                    this.#swipeThrottleDelay
                            ) {
                                this.#lastSwipeTime = currentTime;
                                if (swipeDistance > 0) {
                                    this.#adapter.actions.previous(
                                        this.#adapter
                                    );
                                } else {
                                    this.#adapter.actions.next(this.#adapter);
                                }
                            }
                        }}
                        onTouchEnd={(e) =>
                            (this.#touchEndX = e.touches[0].clientX)
                        }
                    >
                        {this.#prepCarousel()}
                    </div>
                </div>
            </Host>
        );
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
        this.#adapter.actions.autoplay.stop(this.#adapter);
    }
    //#endregion
}
