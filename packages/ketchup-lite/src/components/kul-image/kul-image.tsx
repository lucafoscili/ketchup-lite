import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  getAssetPath,
  h,
  Host,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";

import { kulManagerSingleton } from "src";
import { KulBadgePropsInterface } from "src/components/kul-badge/kul-badge-declarations";
import {
  KulImageEvent,
  KulImageEventPayload,
} from "src/components/kul-image/kul-image-declarations";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { KulThemeColorValues } from "src/managers/kul-theme/kul-theme-declarations";
import { GenericObject } from "src/types/GenericTypes";
import {
  CSS_VAR_PREFIX,
  KUL_STYLE_ID,
  KUL_WRAPPER_ID,
} from "src/variables/GenericVariables";

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
  @State() debugInfo: KulDebugLifecycleInfo = {
    endTime: 0,
    renderCount: 0,
    renderEnd: 0,
    renderStart: 0,
    startTime: performance.now(),
  };
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
  @Prop({ mutable: true, reflect: true })
  kulColor = `var(${KulThemeColorValues.ICON})`;
  /**
   * Controls the display of a loading indicator. When enabled, a spinner is shown until the image finishes loading. This property is not compatible with SVG images.
   * @default false
   */
  @Prop({ mutable: true, reflect: true }) kulShowSpinner = false;
  /**
   * Sets the width of the icon. This property accepts any valid CSS measurement value (e.g., px, %, vh, etc.) and defaults to 100%.
   * @default '100%'
   */
  @Prop({ mutable: true, reflect: true }) kulSizeX = "100%";
  /**
   * Sets the height of the icon. This property accepts any valid CSS measurement value (e.g., px, %, vh, etc.) and defaults to 100%.
   * @default '100%'
   */
  @Prop({ mutable: true, reflect: true }) kulSizeY = "100%";
  /**
   * Customizes the style of the component. This property allows you to apply a custom CSS style to the component.
   * @default ""
   */
  @Prop({ mutable: true }) kulStyle = "";
  /**
   * Defines the source URL of the image. This property is used to set the image resource that the component should display.
   * @default ""
   */
  @Prop({ mutable: true, reflect: true }) kulValue = "";
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
  #createIcon(): VNode {
    const { theme } = kulManagerSingleton;

    const { error, kulColor, kulValue } = this;

    const className = {
      image__icon: true,
    };
    const style = {
      ["--kul_image_background"]: kulColor
        ? kulColor
        : `var(${KulThemeColorValues.ICON})`,
      ["--kul_image_mask"]: "",
    };
    const isThemeIcon = kulValue.indexOf(CSS_VAR_PREFIX) > -1;
    if (isThemeIcon) {
      const themeIcon = kulValue.replace("--", "");
      className["kul-icon"] = true;
      className[themeIcon] = true;
    }
    const icon = error
      ? "broken_image"
      : isThemeIcon
        ? theme.list[theme.name].icons[kulValue]
        : kulValue;
    style["--kul_image_mask"] =
      `url('${getAssetPath(`./assets/svg/${icon}.svg`)}') no-repeat center`;

    return <div class={className} style={style}></div>;
  }
  #createImage(): VNode {
    return (
      <img
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
  #isResourceUrl(): boolean {
    const { kulValue } = this;

    return !!(
      kulValue &&
      (kulValue.indexOf(".") > -1 ||
        kulValue.indexOf("/") > -1 ||
        kulValue.indexOf("\\") > -1)
    );
  }
  //#endregion

  //#region Lifecycle hooks
  componentWillLoad() {
    const { theme } = kulManagerSingleton;

    theme.register(this);
  }
  componentDidLoad() {
    const { debug } = kulManagerSingleton;

    this.onKulEvent(new CustomEvent("ready"), "ready");
    debug.updateDebugInfo(this, "did-load");
  }

  componentWillRender() {
    const { debug } = kulManagerSingleton;

    debug.updateDebugInfo(this, "will-render");
  }
  componentDidRender() {
    const { debug } = kulManagerSingleton;

    debug.updateDebugInfo(this, "did-render");
  }
  render() {
    const { debug, theme } = kulManagerSingleton;

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

    let el: VNode;
    let feedback: HTMLElement;
    const isUrl = this.#isResourceUrl();
    let spinnerLayout: number;
    let style = {
      "--kul_image_height": kulSizeY ? kulSizeY : "auto",
      "--kul_image_width": kulSizeX ? kulSizeX : "100%",
    };

    if (isUrl && !error) {
      el = this.#createImage();
    } else {
      el = this.#createIcon();
    }

    if (kulShowSpinner && isUrl) {
      spinnerLayout = 14;
      feedback = (
        <div class="spinner" title="Image not loaded yet...">
          <kul-spinner
            kulActive={true}
            kulDimensions="3px"
            kulLayout={spinnerLayout}
          ></kul-spinner>
        </div>
      );
    }

    return (
      <Host style={style}>
        {kulStyle && <style id={KUL_STYLE_ID}>{theme.setKulStyle(this)}</style>}
        {feedback}
        <div id={KUL_WRAPPER_ID}>
          <div
            class="image"
            onClick={(e) => {
              this.onKulEvent(e, "click");
            }}
          >
            {el}
            {kulBadgeProps && <kul-badge {...kulBadgeProps}></kul-badge>}
          </div>
        </div>
      </Host>
    );
  }
  disconnectedCallback() {
    const { theme } = kulManagerSingleton;

    theme.unregister(this);
  }
  //#endregion
}
