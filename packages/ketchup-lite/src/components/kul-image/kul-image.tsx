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
  Watch,
} from "@stencil/core";
import { kulManager } from "src/global/global";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { KUL_THEME_COLORS } from "src/managers/kul-theme/helpers/contants";
import { KulThemeIcons } from "src/managers/kul-theme/kul-theme-declarations";
import {
  CSS_VAR_PREFIX,
  CY_ATTRIBUTES,
  KUL_STYLE_ID,
  KUL_WRAPPER_ID,
} from "src/utils/constants";
import { KulBadgePropsInterface } from "../kul-badge/kul-badge-declarations";
import {
  KulImageEvent,
  KulImageEventPayload,
  KulImagePropsInterface,
} from "./kul-image-declarations";

@Component({
  tag: "kul-image",
  assetsDirs: ["assets/svg"],
  styleUrl: "kul-image.scss",
  shadow: true,
})
export class KulImage {
  /**
   * References the root HTML element of the component (<kul-image>).
   */
  @Element() rootElement: HTMLKulImageElement;

  //#region States
  /**
   * Debug information.
   */
  @State() debugInfo = kulManager.debug.info.create();
  /**
   * The selected element.
   * @default false
   */
  @State() error = false;
  //#endregion

  //#region Props
  /**
   * This property is used to attach a badge to the component.
   * @default null
   */
  @Prop({ mutable: true }) kulBadgeProps: KulBadgePropsInterface = null;
  /**
   * Specifies the color of the icon using a CSS variable. This property is used to set the color of the component's icon.
   * @default KulThemeColorValues.ICON
   *
   * @see KulThemeColorValues - For a list of available CSS variable names for color.
   */
  @Prop({ mutable: true }) kulColor = `var(${KUL_THEME_COLORS.icon})`;
  /**
   * Controls the display of a loading indicator. When enabled, a spinner is shown until the image finishes loading. This property is not compatible with SVG images.
   * @default false
   */
  @Prop({ mutable: true }) kulShowSpinner = false;
  /**
   * Sets the width of the icon. This property accepts any valid CSS measurement value (e.g., px, %, vh, etc.) and defaults to 100%.
   * @default '100%'
   */
  @Prop({ mutable: true }) kulSizeX = "100%";
  /**
   * Sets the height of the icon. This property accepts any valid CSS measurement value (e.g., px, %, vh, etc.) and defaults to 100%.
   * @default '100%'
   */
  @Prop({ mutable: true }) kulSizeY = "100%";
  /**
   * Customizes the style of the component. This property allows you to apply a custom CSS style to the component.
   * @default ""
   */
  @Prop({ mutable: true }) kulStyle = "";
  /**
   * Defines the source URL of the image. This property is used to set the image resource that the component should display.
   * @default ""
   */
  @Prop({ mutable: true }) kulValue = "";
  //#endregion

  //#region Events
  @Event({
    eventName: "kul-image-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulImageEventPayload>;
  onKulEvent(e: Event | CustomEvent, eventType: KulImageEvent) {
    this.kulEvent.emit({
      comp: this,
      id: this.rootElement.id,
      originalEvent: e,
      eventType,
    });
  }
  //#endregion

  //#region Watchers
  @Watch("kulValue")
  async resetState() {
    this.error = false;
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
   * @returns {Promise<KulImagePropsInterface>} Promise resolved with an object containing the component's properties.
   */
  @Method()
  async getProps(): Promise<KulImagePropsInterface> {
    const { getProps } = kulManager;

    return getProps(this) as KulImagePropsInterface;
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
  #createIcon(): VNode {
    const { assets, theme } = kulManager;
    const { bemClass } = theme;

    const { error, kulColor, kulValue } = this;

    const style = {
      ["--kul_image_background"]: kulColor
        ? kulColor
        : `var(${KUL_THEME_COLORS.icon})`,
      ["--kul_image_mask"]: "",
    };

    const isThemeIcon = kulValue.indexOf(CSS_VAR_PREFIX) > -1;
    const icon = error
      ? "broken_image"
      : isThemeIcon
        ? theme.list[theme.name as keyof KulThemeIcons].icons[
            kulValue as keyof KulThemeIcons
          ]
        : kulValue;

    const { mask } = assets.get(`./assets/svg/${icon}.svg`).style;
    style["--kul_image_mask"] = mask;

    return (
      <div
        class={bemClass("image", "icon", {
          [kulValue?.replace("--", "")]: isThemeIcon,
        })}
        data-cy={CY_ATTRIBUTES.maskedSvg}
        style={style}
      ></div>
    );
  }
  #createImage(): VNode {
    return (
      <img
        data-cy={CY_ATTRIBUTES.image}
        onError={(e) => {
          this.error = true;
          this.onKulEvent(e, "error");
        }}
        onLoad={(e) => {
          this.resetState();
          this.onKulEvent(e, "load");
        }}
        src={this.kulValue}
      ></img>
    );
  }
  #isResourceUrl() {
    const { kulValue } = this;

    if (!kulValue || typeof kulValue !== "string") return false;

    const resourceUrlPattern = /^(https?:\/\/|\/|\.{1,2}\/|[a-zA-Z]:\\|\\\\).+/;

    return resourceUrlPattern.test(kulValue);
  }
  //#endregion

  //#region Lifecycle hooks
  connectedCallback() {
    const { theme } = kulManager;

    theme.register(this);
  }
  componentDidLoad() {
    const { info } = kulManager.debug;

    this.onKulEvent(new CustomEvent("ready"), "ready");
    info.update(this, "did-load");
  }
  componentWillRender() {
    const { info } = kulManager.debug;

    info.update(this, "will-render");
  }
  componentDidRender() {
    const { info } = kulManager.debug;

    info.update(this, "did-render");
  }
  render() {
    const { debug, sanitizeProps, theme } = kulManager;
    const { bemClass, setKulStyle } = theme;

    const {
      error,
      kulBadgeProps,
      kulShowSpinner,
      kulSizeX,
      kulSizeY,
      kulStyle,
      kulValue,
    } = this;

    if (!kulValue) {
      debug.logs.new(this, "Empty image.");
      return;
    }

    const isUrl = this.#isResourceUrl();
    let style = {
      "--kul_image_height": kulSizeY ? kulSizeY : "auto",
      "--kul_image_width": kulSizeX ? kulSizeX : "100%",
    };

    return (
      <Host style={style}>
        {kulStyle && <style id={KUL_STYLE_ID}>{setKulStyle(this)}</style>}
        {kulShowSpinner && isUrl && (
          <div class={bemClass("spinner")} title="Image not loaded yet...">
            <kul-spinner
              kulActive={true}
              kulDimensions="3px"
              kulLayout={14}
            ></kul-spinner>
          </div>
        )}
        <div id={KUL_WRAPPER_ID}>
          <div
            class={bemClass("image")}
            onClick={(e) => {
              this.onKulEvent(e, "click");
            }}
          >
            {isUrl && !error ? this.#createImage() : this.#createIcon()}
            {kulBadgeProps && (
              <kul-badge
                {...sanitizeProps(kulBadgeProps, "KulBadge")}
              ></kul-badge>
            )}
          </div>
        </div>
      </Host>
    );
  }
  disconnectedCallback() {
    const { theme } = kulManager;

    theme.unregister(this);
  }
  //#endregion
}
