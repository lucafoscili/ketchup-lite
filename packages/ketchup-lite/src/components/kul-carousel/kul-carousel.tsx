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
} from "@stencil/core";
import { kulManagerSingleton } from "src";
import {
  KulDataCell,
  KulDataDataset,
  KulDataShapes,
  KulDataShapesMap,
} from "src/managers/kul-data/kul-data-declarations";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { GenericObject } from "src/types/GenericTypes";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "src/variables/GenericVariables";
import { autoplay, navigation } from "./helpers/navigation";
import { createAdapter } from "./kul-carousel-adapter";
import {
  KulCarouselEvent,
  KulCarouselEventPayload,
} from "./kul-carousel-declarations";

@Component({
  tag: "kul-carousel",
  styleUrl: "kul-carousel.scss",
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
  @State() debugInfo = kulManagerSingleton.debug.info.create();
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
  @Prop({ mutable: false }) kulAutoPlay = false;
  /**
   * Interval in milliseconds for autoplay.
   * @default 3000
   */
  @Prop({ mutable: false }) kulInterval = 3000;
  /**
   * Sets the type of shapes to compare.
   * @default ""
   */
  @Prop({ mutable: true, reflect: true }) kulShape: KulDataShapes = "image";
  /**
   * Custom style of the component.
   * @default ""
   */
  @Prop({ mutable: true }) kulStyle = "";
  //#endregion

  //#region Internal variables
  #interval: NodeJS.Timeout;
  #lastSwipeTime = 0;
  #swipeThrottleDelay = 300;
  #touchStartX = 0;
  #touchEndX = 0;
  #adapter = createAdapter(
    {
      compInstance: this,
      index: {
        current: () => this.currentIndex,
      },
      interval: () => this.#interval,
      totalSlides: () => this.#getTotalSlides(),
    },
    {
      interval: (value) => (this.#interval = value),
    },
    () => this.#adapter,
  );
  //#endregion

  //#region Events
  @Event({
    eventName: "kul-carousel-event",
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
  @Watch("kulData")
  @Watch("kulShape")
  async updateShapes() {
    const { data, debug } = kulManagerSingleton;

    try {
      this.shapes = data.cell.shapes.getAll(this.kulData);
    } catch (error) {
      debug.logs.new(this, "Error updating shapes: " + error, "error");
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
   * Used to retrieve component's properties and descriptions.
   * @returns {Promise<GenericObject>} Promise resolved with an object containing the component's properties.
   */
  @Method()
  async getProps(): Promise<GenericObject> {
    const { getProps } = kulManagerSingleton;

    return getProps(this);
  }
  /**
   * Changes the slide to the specified index if it's within bounds.
   * @param {number} index - The number of the slide to go to.
   */
  @Method()
  async goToSlide(index: number) {
    const { toSlide } = navigation;

    toSlide(this.#adapter, index);
  }
  /**
   * Advances to the next slide, looping back to the start if at the end.
   */
  @Method()
  async nextSlide() {
    const { next } = navigation;

    next(this.#adapter);
  }
  /**
   * Moves to the previous slide, looping to the last slide if at the beginning.
   */
  @Method()
  async prevSlide() {
    const { previous } = navigation;

    previous(this.#adapter);
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
      this.onKulEvent(new CustomEvent("unmount"), "unmount");
      this.rootElement.remove();
    }, ms);
  }
  //#endregion

  //#region Private methods
  #getTotalSlides() {
    return this.shapes?.[this.kulShape]?.length || 0;
  }
  #hasShapes() {
    return !!this.shapes?.[this.kulShape];
  }
  #prepCarousel(): VNode {
    const { elements } = this.#adapter;
    const { jsx } = elements;
    const { back, forward } = jsx;

    if (this.#hasShapes()) {
      const shapes = this.shapes[this.kulShape];
      if (shapes?.length) {
        return (
          <Fragment>
            <div class="carousel__track" role="region" aria-live="polite">
              {this.#prepSlide()}
            </div>
            <div class="carousel__controls">
              {back()}
              {forward()}
            </div>
            <div class="carousel__indicators-wrapper">
              <div class="carousel__indicators">{this.#prepIndicators()}</div>
            </div>
          </Fragment>
        );
      }
    }
  }
  #prepIndicators(): VNode[] {
    const { toSlide } = navigation;
    const { currentIndex, kulShape } = this;

    const totalSlides = this.#getTotalSlides();
    const maxIndicators = 9;
    const halfMax = Math.floor(maxIndicators / 2);

    let start = Math.max(0, currentIndex - halfMax);
    let end = Math.min(totalSlides, start + maxIndicators);

    if (end === totalSlides) {
      start = Math.max(0, end - maxIndicators);
    }

    const indicators = [];

    if (start > 0) {
      const className = {
        carousel__chevron: true,
        "carousel__chevron--left": true,
      };
      indicators.push(
        <span
          class={className}
          onClick={() => toSlide(this.#adapter, 0)}
          title={`Jump to the first slide (#${0})`}
        >
          «
        </span>,
      );
    }
    this.shapes[kulShape]
      ?.slice(start, end)
      .forEach((_: Partial<KulDataCell<KulDataShapes>>, index: number) => {
        const actualIndex = start + index;
        const isCurrent = actualIndex === currentIndex;
        const isFirst = actualIndex === start;
        const isLast = actualIndex === end - 1;

        const className = {
          carousel__indicator: true,
          "carousel__indicator--active": isCurrent,
          "carousel__indicator--small": (isFirst || isLast) && !isCurrent,
        };
        indicators.push(
          <span
            class={className}
            onClick={() => toSlide(this.#adapter, actualIndex)}
            title={`#${index}`}
          />,
        );
      });

    if (end < totalSlides) {
      const className = {
        carousel__chevron: true,
        "carousel__chevron--right": true,
      };
      indicators.push(
        <span
          class={className}
          onClick={() => toSlide(this.#adapter, totalSlides - 1)}
          title={`Jump to the last slide (#${totalSlides - 1})`}
        >
          »
        </span>,
      );
    }

    return indicators;
  }
  #prepSlide(): VNode {
    const { data } = kulManagerSingleton;
    const { currentIndex, kulShape } = this;

    const props: Partial<KulDataCell<KulDataShapes>>[] = this.shapes[
      kulShape
    ].map(() => ({
      htmlProps: {
        className: "kul-fit",
      },
    }));

    const decoratedShapes = data.cell.shapes.decorate(
      kulShape,
      this.shapes[kulShape],
      async (e) => this.onKulEvent(e, "kul-event"),
      props,
    ).element;

    return (
      <div class="carousel__slide" data-index={currentIndex}>
        <Fragment>{decoratedShapes[currentIndex]}</Fragment>
      </div>
    );
  }
  //#endregion

  //#region Lifecycle hooks
  componentWillLoad() {
    const { theme } = kulManagerSingleton;
    const { start } = autoplay;

    theme.register(this);

    this.updateShapes();

    if (this.kulAutoPlay) {
      start(this.#adapter);
    }
  }
  componentDidLoad() {
    const { info } = kulManagerSingleton.debug;

    this.onKulEvent(new CustomEvent("ready"), "ready");
    info.update(this, "did-load");
  }
  componentWillRender() {
    const { info } = kulManagerSingleton.debug;

    info.update(this, "will-render");
  }
  componentDidRender() {
    const { info } = kulManagerSingleton.debug;

    info.update(this, "did-render");
  }
  render() {
    const { theme } = kulManagerSingleton;
    const { kulStyle } = this;

    const { next, previous } = navigation;

    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{theme.setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID}>
          <div
            class="carousel"
            onTouchEnd={(e) => (this.#touchEndX = e.touches[0].clientX)}
            onTouchMove={() => {
              const swipeDistance = this.#touchEndX - this.#touchStartX;
              const swipeThreshold = 50;

              const currentTime = performance.now();

              if (
                Math.abs(swipeDistance) > swipeThreshold &&
                currentTime - this.#lastSwipeTime > this.#swipeThrottleDelay
              ) {
                this.#lastSwipeTime = currentTime;
                if (swipeDistance > 0) {
                  previous(this.#adapter);
                } else {
                  next(this.#adapter);
                }
              }
            }}
            onTouchStart={(e) => (this.#touchStartX = e.touches[0].clientX)}
          >
            {this.#prepCarousel()}
          </div>
        </div>
      </Host>
    );
  }

  disconnectedCallback() {
    const { theme } = kulManagerSingleton;
    const { stop } = autoplay;

    theme.unregister(this);
    stop(this.#adapter);
  }
  //#endregion
}
