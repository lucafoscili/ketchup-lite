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
import {
  KulComponentName,
  KulComponentPropsFor,
  KulGenericEvent,
} from "src/types/GenericTypes";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "src/utils/constants";
import { SVG } from "./elements/svg";
import {
  KulLazyEvent,
  KulLazyEventPayload,
  KulLazyPropsInterface,
  KulLazyRenderMode,
} from "./kul-lazy-declarations";

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
  @State() debugInfo = kulManagerSingleton.debug.info.create();
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
  @Prop({ mutable: true }) kulStyle = "";
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
   * @returns {Promise<KulLazyPropsInterface>} Promise resolved with an object containing the component's properties.
   */
  @Method()
  async getProps(): Promise<KulLazyPropsInterface> {
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
    theme.register(this);
    this.#setObserver();
  }
  componentDidLoad() {
    const { info } = kulManagerSingleton.debug;

    this.#intObserver.observe(this.rootElement);
    this.onKulEvent(new CustomEvent("ready"), "ready");
    info.update(this, "did-load");
  }
  componentWillRender() {
    const { info } = kulManagerSingleton.debug;

    info.update(this, "will-render");
  }
  componentDidRender() {
    const { info } = kulManagerSingleton.debug;

    if (this.#lazyComponent && !this.#lazyComponentLoaded) {
      this.#lazyComponentLoaded = true;
      this.onKulEvent(new CustomEvent("load"), "load");
    }
    info.update(this, "did-render");
  }
  render() {
    const { sanitizeProps, theme } = kulManagerSingleton;
    const { setKulStyle } = theme;

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
        resource = SVG().button;
        break;
      case "kul-card":
        resource = SVG().card;
        break;
      case "kul-checkbox":
        resource = SVG().checkbox;
        break;
      case "kul-chart":
        resource = SVG().chart;
        break;
      case "kul-image":
        resource = SVG().image;
        break;
      default:
        resource = SVG().default;
        break;
    }

    if (
      (kulRenderMode === "viewport" && isInViewport) ||
      (kulRenderMode === "props" && kulComponentProps) ||
      (kulRenderMode === "both" && kulComponentProps && isInViewport)
    ) {
      const parts = kulComponentName.split("-").reverse();
      const evDispatcher = {
        [`onKul-${parts[0]}-event`]: (e: KulGenericEvent) => {
          this.onKulEvent(e, "kul-event");
        },
      };
      const Tag = kulComponentName;
      content = (
        <Tag
          {...sanitizeProps(
            kulComponentProps as KulComponentPropsFor<KulComponentName>,
          )}
          {...evDispatcher}
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
        {kulStyle && <style id={KUL_STYLE_ID}>{setKulStyle(this)}</style>}
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
