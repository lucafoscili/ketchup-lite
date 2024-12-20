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
} from "@stencil/core";
import { kulManagerSingleton } from "src/global/global";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { GenericObject } from "src/types/GenericTypes";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "src/utils/constants";
import {
  KulPhotoframeEvent,
  KulPhotoframeEventPayload,
} from "./kul-photoframe-declarations";

@Component({
  tag: "kul-photoframe",
  styleUrl: "kul-photoframe.scss",
  shadow: true,
})
export class KulPhotoframe {
  /**
   * References the root HTML element of the component (<kul-photoframe>).
   */
  @Element() rootElement: HTMLKulPhotoframeElement;

  //#region States
  /**
   * Debug information.
   */
  @State() debugInfo = kulManagerSingleton.debug.info.create();
  /**
   * A boolean that flags when the component enters the viewport for the first time to trigger a new render.
   * @default false
   */
  @State() isInViewport = false;
  //#endregion

  //#region Props
  /**
   * Html attributes of the picture before the component enters the viewport.
   * @default null
   */
  @Prop() kulPlaceholder: GenericObject = null;
  /**
   * Custom style of the component.
   * @default ""
   */
  @Prop({ mutable: true }) kulStyle = "";
  /**
   * Percentage of the component dimensions entering the viewport (0.1 => 1).
   * @default 0.25
   */
  @Prop() kulThreshold = 0.25;
  /**
   * Html attributes of the picture after the component enters the viewport.
   * @default null
   */
  @Prop() kulValue: GenericObject = null;
  //#endregion

  //#region Internal variables
  #intObserver: IntersectionObserver;
  #placeholderEl: HTMLImageElement;
  #renderValue = false;
  #valueEl: HTMLImageElement;
  #wrapperEl: HTMLElement;
  //#endregion

  //#region Events
  @Event({
    eventName: "kul-photoframe-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulPhotoframeEventPayload>;
  onKulEvent(
    e: Event | CustomEvent,
    eventType: KulPhotoframeEvent,
    isPlaceholder = false,
  ) {
    this.kulEvent.emit({
      comp: this,
      id: this.rootElement.id,
      originalEvent: e,
      eventType,
      isPlaceholder,
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
   * Used to retrieve component's properties and descriptions.
   * @returns {Promise<GenericObject>} Promise resolved with an object containing the component's properties.
   */
  @Method()
  async getProps(): Promise<GenericObject> {
    const { getProps } = kulManagerSingleton;

    return getProps(this);
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
  #setObserver(): void {
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.isInViewport = true;
          this.#intObserver.unobserve(this.rootElement);
        }
      });
    };
    const options: IntersectionObserverInit = {
      threshold: this.kulThreshold,
    };
    this.#intObserver = new IntersectionObserver(callback, options);
  }
  //#endregion

  //#region Lifecycle hooks
  componentWillLoad() {
    const { theme } = kulManagerSingleton;

    theme.register(this);
    this.#setObserver();
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

    const { isInViewport, kulPlaceholder, kulStyle, kulValue } = this;

    if (isInViewport && !this.#renderValue) {
      this.#renderValue = true;
    }

    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{theme.setKulStyle(this)}</style>}
        <div
          id={KUL_WRAPPER_ID}
          ref={(el) => {
            this.#wrapperEl = el;
          }}
        >
          <img
            {...kulPlaceholder}
            class="placeholder"
            ref={(el) => (this.#placeholderEl = el)}
            onLoad={(e) => {
              if (
                this.#placeholderEl.naturalWidth >
                this.#placeholderEl.naturalHeight
              ) {
                this.#wrapperEl.classList.add("horizontal");
              } else {
                this.#wrapperEl.classList.add("vertical");
              }
              this.#intObserver.observe(this.rootElement);
              this.#placeholderEl.classList.add("placeholder--loaded");
              this.onKulEvent(e, "load", true);
            }}
          ></img>
          {this.#renderValue && (
            <img
              {...kulValue}
              class="value"
              ref={(el) => (this.#valueEl = el)}
              onLoad={(e) => {
                this.#placeholderEl.classList.add("placeholder--fade-out");
                this.#valueEl.classList.add("value--fade-in");
                this.onKulEvent(e, "load");
              }}
            ></img>
          )}
        </div>
      </Host>
    );
  }
  disconnectedCallback() {
    const { theme } = kulManagerSingleton;

    theme.unregister(this);
    this.#intObserver?.unobserve(this.rootElement);
  }
  //#endregion
}
