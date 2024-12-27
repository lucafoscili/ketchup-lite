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
import { KUL_THEME_COLORS } from "src/managers/kul-theme/helpers/contants";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "src/utils/constants";
import { KulImagePropsInterface } from "../kul-image/kul-image-declarations";
import {
  KulBadgeEvent,
  KulBadgeEventPayload,
  KulBadgePropsInterface,
} from "./kul-badge-declarations";

@Component({
  tag: "kul-badge",
  styleUrl: "kul-badge.scss",
  shadow: true,
})
export class KulBadge {
  /**
   * References the root HTML element of the component (<kul-badge>).
   */
  @Element() rootElement: HTMLKulBadgeElement;

  //#region States
  /**
   * Debug information.
   */
  @State() debugInfo = kulManagerSingleton.debug.info.create();
  //#endregion

  //#region Props
  /**
   * The props of the image displayed inside the badge.
   * @default null
   */
  @Prop({ mutable: true }) kulImageProps: KulImagePropsInterface = null;
  /**
   * The text displayed inside the badge.
   * @default ""
   */
  @Prop({ mutable: true }) kulLabel = "";
  /**
   * Custom style of the component.
   * @default ""
   */
  @Prop({ mutable: true }) kulStyle = "";
  //#endregion

  //#region Events
  @Event({
    eventName: "kul-badge-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulBadgeEventPayload>;
  onKulEvent(e: Event | CustomEvent, eventType: KulBadgeEvent) {
    this.kulEvent.emit({
      comp: this,
      eventType,
      id: this.rootElement.id,
      originalEvent: e,
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
   * @returns {Promise<KulBadgePropsInterface>} Promise resolved with an object containing the component's properties.
   */
  @Method()
  async getProps(): Promise<KulBadgePropsInterface> {
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

  //#region Lifecycle hooks
  componentWillLoad() {
    const { theme } = kulManagerSingleton;

    theme.register(this);
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
    const { sanitizeProps, theme } = kulManagerSingleton;
    const { kulImageProps, kulLabel, kulStyle } = this;

    let imageEl: HTMLElement = null;
    if (!kulLabel && kulImageProps) {
      if (!kulImageProps?.kulColor) {
        kulImageProps.kulColor = `var(${KUL_THEME_COLORS.textOnPrimary})`;
      }
      imageEl = (
        <kul-image {...sanitizeProps(kulImageProps, "KulImage")}></kul-image>
      );
    }

    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{theme.setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID} onClick={(e) => this.onKulEvent(e, "click")}>
          {kulLabel}
          {imageEl}
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
