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
import { KulImagePropsInterface } from "../kul-image/kul-image-declarations";
import { KulToastEvent, KulToastEventPayload } from "./kul-toast-declarations";

@Component({
  tag: "kul-toast",
  styleUrl: "kul-toast.scss",
  shadow: true,
})
export class KulToast {
  /**
   * References the root HTML element of the component (<kul-toast>).
   */
  @Element() rootElement: HTMLKulToastElement;

  //#region States
  /**
   * Debug information.
   */
  @State() debugInfo = kulManagerSingleton.debug.info.create();
  //#endregion

  //#region Props
  /**
   * Sets the props of the clickable icon used to close the toast.
   * @default { kulSizeX: '18px', kulSizeY: '18px', kulValue: 'clear' }
   */
  @Prop({ mutable: true })
  kulCloseIcon: KulImagePropsInterface = {
    kulSizeX: "18px",
    kulSizeY: "18px",
    kulValue: "clear",
  };
  /**
   * Callback invoked when the toast is closed.
   * @default () => void
   */
  @Prop() kulCloseCallback: () => void = () => {
    this.rootElement.remove();
  };
  /**
   *  Sets the props of an optional icon that will be displayed along with the message.
   * @default { kulSizeX: '18px', kulSizeY: '18px', kulValue: 'info' }
   */
  @Prop({ mutable: true }) kulIcon: KulImagePropsInterface = {
    kulSizeX: "18px",
    kulSizeY: "18px",
    kulValue: "info",
  };
  /**
   * When kulTimer is set with a number, the toast will close itself after the specified amount of time (in ms).
   * @default ''
   */
  @Prop() kulTimer: number = null;
  /**
   * Sets the message of the toast.
   * @default 'Wow, such empty.'
   */
  @Prop({ mutable: true }) kulMessage = "Wow, such empty.";
  /**
   * Enables customization of the component's style.
   * @default "" - No custom style applied by default.
   */
  @Prop({ mutable: true }) kulStyle = "";
  //#endregion

  //#region Events
  @Event({
    eventName: "kul-toast-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulToastEventPayload>;
  onKulEvent(e: Event | CustomEvent, eventType: KulToastEvent) {
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

    const { kulTimer } = this;

    if (kulTimer) {
      setTimeout(() => {}, kulTimer);
    }

    info.update(this, "did-render");
  }

  render() {
    const { theme } = kulManagerSingleton;

    const { kulCloseIcon, kulIcon, kulMessage, kulStyle, kulTimer } = this;

    const className = {
      ["toast__accent"]: true,
      ["toast__accent--temporary"]: !!kulTimer,
    };

    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{theme.setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID}>
          <div class="toast">
            <div class={className}></div>
            <div class="toast__message-wrapper">
              {this.kulIcon && (
                <div class="toast__icon">
                  <kul-image {...kulIcon}></kul-image>
                </div>
              )}
              {kulMessage && <div class="toast__message">{kulMessage}</div>}
              {this.kulCloseIcon && (
                <div
                  class="toast__icon toast__icon--close"
                  onClick={() => this.kulCloseCallback()}
                >
                  <kul-image {...kulCloseIcon}></kul-image>
                </div>
              )}
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
