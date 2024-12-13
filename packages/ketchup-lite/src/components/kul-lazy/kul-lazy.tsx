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

import { kulManagerSingleton } from "src";
import {
  KulLazyEvent,
  KulLazyEventPayload,
  KulLazyRenderMode,
} from "src/components/kul-lazy/kul-lazy-declarations";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { GenericObject } from "src/types/GenericTypes";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "src/variables/GenericVariables";

@Component({
  tag: "kul-lazy",
  styleUrl: "kul-lazy.scss",
  shadow: true,
})
export class KulLazy {
  /**
   * References the root HTML element of the component (<kul-lazy>).
   */
  @Element() rootElement: HTMLKulLazyElement;

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
   * Sets whether the lazy entered the viewport or not.
   */
  @State() isInViewport = false;
  //#endregion

  //#region Props
  /**
   * Sets the tag name of the component to be lazy loaded.
   * @default ""
   */
  @Prop({ mutable: false }) kulComponentName = "";
  /**
   * Sets the data of the component to be lazy loaded.
   * @default null
   */
  @Prop({ mutable: false }) kulComponentProps: unknown = null;
  /**
   * Decides when the sub-component should be rendered.
   * By default when both the component props exist and the component is in the viewport.
   * @default "both"
   */
  @Prop({ mutable: false }) kulRenderMode: KulLazyRenderMode = "both";
  /**
   * Displays an animated SVG placeholder until the component is loaded.
   * @default true
   */
  @Prop({ mutable: false }) kulShowPlaceholder = true;
  /**
   * Customizes the style of the component. This property allows you to apply a custom CSS style to the component.
   * @default ""
   */
  @Prop() kulStyle = "";
  //#endregion

  //#region Internal variables
  #intObserver: IntersectionObserver = null;
  #lazyComponent: HTMLElement = null;
  #lazyComponentLoaded = false;
  //#endregion

  //#region Events
  @Event({
    eventName: "kul-lazy-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulLazyEventPayload>;
  onKulEvent(e: Event | CustomEvent, eventType: KulLazyEvent) {
    this.kulEvent.emit({
      comp: this,
      id: this.rootElement.id,
      originalEvent: e,
      eventType,
    });
  }
  //#endregion

  //#region Public methods
  /**
   * Returns the HTMLElement of the component to lazy load.
   * @returns {HTMLElement} Lazy loaded component.
   */
  @Method()
  async getComponent(): Promise<HTMLElement> {
    return this.#lazyComponent;
  }
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
    const { debug } = kulManagerSingleton;

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          debug.logs.new(
            this,
            "kul-lazy entering the viewport, rendering " +
              this.kulComponentName +
              ".",
          );
          this.isInViewport = true;
          this.#intObserver.unobserve(this.rootElement);
        }
      });
    };
    this.#intObserver = new IntersectionObserver(callback, {
      threshold: 0.25,
    });
  }
  //#endregion

  //#region Lifecycle hooks
  componentWillLoad() {
    const { theme } = kulManagerSingleton;

    this.rootElement.addEventListener(`${this.kulComponentName}-event`, (e) => {
      this.onKulEvent(e, "kul-event");
    });
    theme.register(this);
    this.#setObserver();
  }
  componentDidLoad() {
    const { debug } = kulManagerSingleton;

    this.#intObserver.observe(this.rootElement);
    this.onKulEvent(new CustomEvent("ready"), "ready");
    debug.updateDebugInfo(this, "did-load");
  }
  componentWillRender() {
    const { debug } = kulManagerSingleton;

    debug.updateDebugInfo(this, "will-render");
  }
  componentDidRender() {
    const { debug } = kulManagerSingleton;

    if (this.#lazyComponent && !this.#lazyComponentLoaded) {
      this.#lazyComponentLoaded = true;
      this.onKulEvent(new CustomEvent("load"), "load");
    }
    debug.updateDebugInfo(this, "did-render");
  }
  render() {
    const { theme } = kulManagerSingleton;
    const {
      isInViewport,
      kulComponentName,
      kulComponentProps,
      kulRenderMode,
      kulShowPlaceholder,
      kulStyle,
    } = this;

    let content: HTMLElement;
    let resource: HTMLElement;
    let className = kulComponentName;
    switch (kulComponentName) {
      case "kul-button":
        //call_to_action.svg
        resource = (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 48 48"
          >
            <path d="M42 6H6c-2.2 0-4 1.8-4 4v28c0 2.2 1.8 4 4 4h36c2.2 0 4-1.8 4-4V10c0-2.2-1.8-4-4-4zm0 32H6v-6h36v6z" />
          </svg>
        );
        break;
      case "kul-card":
        //art_track.svg
        resource = (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 48 48"
          >
            <path d="M44 26H28v-4h16v4zm0-12H28v4h16v-4zM28 34h16v-4H28v4zm-4-16v12c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4V18c0-2.2 1.8-4 4-4h12c2.2 0 4 1.8 4 4zm-3 12l-4.5-6-3.5 4.51-2.5-3.01L7 30h14z" />
          </svg>
        );
        break;
      case "kul-checkbox":
        //check_box_outline_blank.svg
        resource = (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 48 48"
          >
            <path d="M38 10v28H10V10h28m0-4H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4z" />
          </svg>
        );
        break;
      case "kul-chart":
        //chart-bar.svg
        resource = (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
          >
            <path d="M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z" />
          </svg>
        );
        break;
      case "kul-image":
        //photo.svg
        resource = (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 48 48"
          >
            <path d="M42 38V10c0-2.21-1.79-4-4-4H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4zM17 27l5 6.01L29 24l9 12H10l7-9z" />
          </svg>
        );
        break;
      default:
        //art_track.svg
        resource = (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 48 48"
          >
            <path d="M44 26H28v-4h16v4zm0-12H28v4h16v-4zM28 34h16v-4H28v4zm-4-16v12c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4V18c0-2.2 1.8-4 4-4h12c2.2 0 4 1.8 4 4zm-3 12l-4.5-6-3.5 4.51-2.5-3.01L7 30h14z" />
          </svg>
        );
        break;
    }
    if (
      (kulRenderMode === "viewport" && isInViewport) ||
      (kulRenderMode === "props" && kulComponentProps) ||
      (kulRenderMode === "both" && kulComponentProps && isInViewport)
    ) {
      const Tag = kulComponentName;
      content = (
        <Tag
          {...(kulComponentProps as GenericObject)}
          ref={(el: HTMLElement) => (this.#lazyComponent = el)}
        ></Tag>
      );
      className += " kul-loaded";
    } else if (kulShowPlaceholder) {
      content = resource;
      className += " kul-to-be-loaded";
    }

    return (
      <Host class={className}>
        {kulStyle && <style id={KUL_STYLE_ID}>{theme.setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID}>{content}</div>
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
