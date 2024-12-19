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
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { GenericObject } from "src/types/GenericTypes";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "src/utils/constants";
import {
  KulSplashEvent,
  KulSplashEventPayload,
  KulSplashStates,
} from "./kul-splash-declarations";

@Component({
  tag: "kul-splash",
  styleUrl: "kul-splash.scss",
  shadow: true,
})
export class KulSplash {
  /**
   * References the root HTML element of the component (<kul-splash>).
   */
  @Element() rootElement: HTMLKulSplashElement;

  //#region States
  /**
   * Debug information.
   */
  @State() debugInfo = kulManagerSingleton.debug.info.create();
  /**
   * The status of the component.
   * @default ""
   */
  @State() state: KulSplashStates = "initializing";
  //#endregion

  //#region Props
  /**
   * Initial text displayed within the component, typically shown during loading.
   * @default "Loading..." - Indicates that loading or initialization is in progress.
   */
  @Prop({ mutable: true }) kulLabel = "Loading...";
  /**
   * Enables customization of the component's style.
   * @default "" - No custom style applied by default.
   */
  @Prop({ mutable: true }) kulStyle = "";
  //#endregion

  //#region Events
  @Event({
    eventName: "kul-splash-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulSplashEventPayload>;
  onKulEvent(e: Event | CustomEvent, eventType: KulSplashEvent) {
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
   * Retrieves the debug information reflecting the current state of the component.
   * @returns {Promise<KulDebugLifecycleInfo>} A promise that resolves to a KulDebugLifecycleInfo object containing debug information.
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
   * Triggers a re-render of the component to reflect any state changes.
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
  async unmount(ms: number = 575): Promise<void> {
    setTimeout(() => {
      this.state = "unmounting";
      setTimeout(() => {
        this.onKulEvent(new CustomEvent("unmount"), "unmount");
        this.rootElement.remove();
      }, 300);
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
    const { theme } = kulManagerSingleton;

    const { kulLabel, kulStyle, state } = this;
    const isUnmounting = state === "unmounting";

    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{theme.setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID}>
          <div class={"modal" + (isUnmounting ? " active" : "")}>
            <div class="wrapper">
              <div class="widget">
                <slot></slot>
              </div>
              <div class="label">{isUnmounting ? "Ready!" : kulLabel}</div>
            </div>
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
