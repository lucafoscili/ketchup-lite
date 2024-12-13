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
  KulDrawerEvent,
  KulDrawerEventPayload,
} from "src/components/kul-drawer/kul-drawer-declarations";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { GenericObject } from "src/types/GenericTypes";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "src/variables/GenericVariables";

@Component({
  tag: "kul-drawer",
  styleUrl: "kul-drawer.scss",
  shadow: true,
})
export class KulDrawer {
  /**
   * References the root HTML element of the component (<kul-drawer>).
   */
  @Element() rootElement: HTMLKulDrawerElement;

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
   * True when the drawer is open.
   * @default false
   */
  @State() opened = false;
  //#endregion

  //#region Props
  /**
   * Custom style of the component.
   * @default ""
   */
  @Prop({ mutable: true, reflect: true }) kulStyle = "";
  //#endregion

  //#region Events
  @Event({
    eventName: "kul-drawer-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulDrawerEventPayload>;
  onKulEvent(e: Event | CustomEvent, eventType: KulDrawerEvent) {
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
   * Closes the drawer.
   */
  @Method()
  async close(): Promise<void> {
    this.opened = false;
    this.onKulEvent(new CustomEvent("close"), "close");
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
   * Returns the state of the drawer.
   * @returns {Promise<boolean>} True when opened, false when closed.
   */
  @Method()
  async isOpened(): Promise<boolean> {
    return this.opened;
  }
  /**
   * Opens the drawer.
   */
  @Method()
  async open(): Promise<void> {
    this.opened = true;
    this.onKulEvent(new CustomEvent("open"), "open");
  }
  /**
   * This method is used to trigger a new render of the component.
   */
  @Method()
  async refresh(): Promise<void> {
    forceUpdate(this);
  }
  /**
   * Opens the drawer when closed and vice-versa.
   */
  @Method()
  async toggle(): Promise<void> {
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
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
    const { theme } = kulManagerSingleton;
    const { kulStyle, opened } = this;

    return (
      <Host kul-opened={opened}>
        {kulStyle && <style id={KUL_STYLE_ID}>{theme.setKulStyle(this)}</style>}
        <div
          class="backdrop"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            this.close();
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        />
        <div id={KUL_WRAPPER_ID}>
          <div class={"drawer"}>
            <div class={`drawer__content`}>
              <slot></slot>
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
