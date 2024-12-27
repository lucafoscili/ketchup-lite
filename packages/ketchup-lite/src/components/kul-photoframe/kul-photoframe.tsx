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
} from "@stencil/core";
import { kulManagerSingleton } from "src/global/global";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { GenericObject } from "src/types/GenericTypes";
import {
  CY_ATTRIBUTES,
  KUL_STYLE_ID,
  KUL_WRAPPER_ID,
} from "src/utils/constants";
import {
  KulPhotoframeEvent,
  KulPhotoframeEventPayload,
  KulPhotoframeOrientation,
  KulPhotoframeOverlay,
  KulPhotoframePropsInterface,
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
   * Sets the orientation of the image, when it exists.
   * @default false
   */
  @State() imageOrientation: KulPhotoframeOrientation = "";
  /**
   * A boolean that flags when the component enters the viewport for the first time to trigger a new render.
   * @default false
   */
  @State() isInViewport = false;
  /**
   * A boolean signaling when the actual image is loaded.
   * @default false
   */
  @State() isReady = false;
  //#endregion

  //#region Props
  /**
   * When not empty, this text will be overlayed on the photo - blocking the view.
   * @default null
   */
  @Prop({ mutable: true }) kulOverlay: KulPhotoframeOverlay = null;
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
  @Prop({ mutable: false }) kulValue: GenericObject = null;
  //#endregion

  //#region Internal variables
  #intObserver: IntersectionObserver;
  #placeholder: HTMLImageElement;
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
    switch (eventType) {
      case "load":
        if (isPlaceholder) {
          if (this.#isLandscape(this.#placeholder)) {
            this.imageOrientation = "landscape";
          } else {
            this.imageOrientation = "portrait";
          }
        } else {
          this.isReady = true;
        }
    }

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
   * @returns {Promise<KulPhotoframePropsInterface>} Promise resolved with an object containing the component's properties.
   */
  @Method()
  async getProps(): Promise<KulPhotoframePropsInterface> {
    const { getProps } = kulManagerSingleton;

    return getProps(this) as KulPhotoframePropsInterface;
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
  #isLandscape(image: HTMLImageElement) {
    return Boolean(image.naturalWidth > image.naturalHeight);
  }
  #prepOverlay = (): VNode => {
    const { kulOverlay } = this;

    if (!kulOverlay || typeof kulOverlay !== "object") {
      return null;
    }

    const { bemClass } = kulManagerSingleton.theme;

    const { description, hideOnClick, icon, title } = kulOverlay;

    return (
      <div
        class={bemClass("overlay", null, {
          "is-clickable": hideOnClick,
        })}
        onClick={
          hideOnClick
            ? (e) => {
                this.onKulEvent(e, "overlay");
                this.kulOverlay = null;
              }
            : undefined
        }
      >
        <div class={bemClass("overlay", "content")}>
          {icon && (
            <kul-image
              class={bemClass("overlay", "icon")}
              kulSizeX="3em"
              kulSizeY="3em"
              kulValue={icon}
            ></kul-image>
          )}
          {title && <div class={bemClass("overlay", "title")}>{title}</div>}
          {description && (
            <div class={bemClass("overlay", "description")}>{description}</div>
          )}
        </div>
      </div>
    );
  };
  #setObserver() {
    this.#intObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isInViewport = true;
            this.#intObserver.unobserve(this.rootElement);
          }
        });
      },
      {
        threshold: this.kulThreshold,
      },
    );
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

    this.#intObserver?.observe(this.rootElement);
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
    const { sanitizeProps, theme } = kulManagerSingleton;
    const { bemClass, setKulStyle } = theme;

    const { isInViewport, isReady, kulPlaceholder, kulStyle, kulValue } = this;

    const replace = Boolean(isInViewport && isReady);

    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{setKulStyle(this)}</style>}
        <div
          class={bemClass("photoframe", null, {
            [this.imageOrientation]: this.imageOrientation && true,
          })}
          id={KUL_WRAPPER_ID}
        >
          {this.#prepOverlay()}
          <img
            class={bemClass("photoframe", "placeholder", {
              loaded: Boolean(this.imageOrientation),
              "fade-out": replace,
            })}
            data-cy={CY_ATTRIBUTES.image}
            ref={(el) => {
              if (el) this.#placeholder = el;
            }}
            onLoad={(e) => {
              this.onKulEvent(e, "load", true);
            }}
            {...sanitizeProps(kulPlaceholder)}
          ></img>
          {isInViewport && (
            <img
              class={bemClass("photoframe", "image", {
                "fade-in": replace,
              })}
              data-cy={CY_ATTRIBUTES.image}
              onLoad={(e) => {
                this.onKulEvent(e, "load");
              }}
              {...sanitizeProps(kulValue)}
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
