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
     * Tracks the current index of the displayed item.
     * @default 0
     */
    @State() currentIndex = 0;
    /**
     * Collection of shapes/cells to display in the carousel.
     * @default {}
     */
    @State() shapes: KulDataShapesMap = {};

    /*-------------------------------------------------*/
    /*                    P r o p s                    */
    /*-------------------------------------------------*/

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

    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/

    #interval: NodeJS.Timeout;
    #kulManager = kulManagerInstance();

    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/

    /**
     * Describes event emitted.
     */
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
        if (index >= 0 && index < this.#getTotalSlides()) {
            this.currentIndex = index;
        }
    }
    /**
     * Advances to the next slide, looping back to the start if at the end.
     */
    @Method()
    async nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.#getTotalSlides();
    }
    /**
     * Moves to the previous slide, looping to the last slide if at the beginning.
     */
    @Method()
    async prevSlide() {
        this.currentIndex =
            (this.currentIndex - 1 + this.#getTotalSlides()) %
            this.#getTotalSlides();
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
    /*                   M e t h o d s                 */
    /*-------------------------------------------------*/

    #getTotalSlides() {
        return this.shapes?.[this.kulShape]?.length || 0;
    }

    #startAutoPlay() {
        if (this.kulAutoPlay && this.kulInterval > 0) {
            this.#interval = setInterval(() => {
                this.nextSlide();
            }, this.kulInterval);
        }
    }

    #stopAutoPlay() {
        if (this.#interval) {
            clearInterval(this.#interval);
            this.#interval = null;
        }
    }

    #prepIndicators() {
        return this.shapes[this.kulShape]?.map((_, index) => (
            <span
                class={`carousel__indicator ${
                    this.currentIndex === index ? 'active' : ''
                }`}
                onClick={() => this.goToSlide(index)}
            />
        ));
    }

    #prepSlides() {
        const currentSlide = this.shapes[this.kulShape]?.[this.currentIndex];
        return (
            <div class="carousel__slide" data-index={this.currentIndex}>
                <Fragment>{currentSlide}</Fragment>
            </div>
        );
    }

    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/

    componentWillLoad() {
        this.#kulManager.theme.register(this);
        this.updateShapes();
        if (this.kulAutoPlay) {
            this.#startAutoPlay();
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
                    <div class="carousel">
                        <div
                            class="carousel__track"
                            role="region"
                            aria-live="polite"
                        >
                            {this.#prepSlides()}
                        </div>
                        <div class="carousel__controls">
                            <kul-button
                                kulIcon="chevron_left"
                                kulStyling="icon"
                                onClick={() => this.prevSlide()}
                                title="Previous slide."
                            ></kul-button>
                            <kul-button
                                kulIcon="chevron_right"
                                kulStyling="icon"
                                onClick={() => this.nextSlide()}
                                title="Next slide."
                            ></kul-button>
                        </div>
                        <div class="carousel__indicators">
                            {this.#prepIndicators()}
                        </div>
                    </div>
                </div>
            </Host>
        );
    }

    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
        this.#stopAutoPlay();
    }
}
