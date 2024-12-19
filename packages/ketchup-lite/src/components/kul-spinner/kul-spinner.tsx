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
  Watch,
} from "@stencil/core";
import { kulManagerSingleton } from "src";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { GenericObject } from "src/types/GenericTypes";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "src/utils/constants";
import { BAR_SPINNER_CONFIGS, SPINNER_CONFIGS } from "./helpers/constants";
import {
  KulSpinnerEvent,
  KulSpinnerEventPayload,
} from "./kul-spinner-declarations";

@Component({
  tag: "kul-spinner",
  styleUrl: "kul-spinner.scss",
  shadow: true,
})
export class KulSpinner {
  /**
   * References the root HTML element of the component (<kul-spinner>).
   */
  @Element() rootElement: HTMLKulSpinnerElement;

  //#region States
  /**
   * Signals when to display the fader.
   */
  @State() bigWait = false;
  /**
   * Debug information.
   */
  @State() debugInfo = kulManagerSingleton.debug.info.create();
  /**
   * Progress percentage for the progress bar.
   */
  @State() progress = 0;
  //#endregion

  //#region Props
  /**
   * Specifies if the spinner is animating.
   * @default false
   */
  @Prop({ mutable: true, reflect: true }) kulActive = false;
  /**
   * Controls if the component displays as a bar or a spinner.
   * @default false
   */
  @Prop({ mutable: true, reflect: true }) kulBarVariant = false;
  /**
   * Defines the width and height of the spinner. In the bar variant, it specifies only the height.
   * @default ""
   */
  @Prop({ mutable: true }) kulDimensions = "";
  /**
   * Applies a blending modal over the component to darken or lighten the view, based on the theme.
   * @default false
   */
  @Prop({ mutable: true }) kulFader = false;
  /**
   * Duration needed for the fader to become active.
   * @default 3500
   */
  @Prop({ mutable: true }) kulFaderTimeout = 3500;
  /**
   * Fills the entire viewport when enabled.
   * @default false
   */
  @Prop({ mutable: true, reflect: true }) kulFullScreen = false;
  /**
   * Selects the spinner layout.
   * @default 1
   */
  @Prop({ mutable: true }) kulLayout = 1;
  /**
   * Sets a custom style for the component.
   * @default ""
   */
  @Prop({ mutable: true }) kulStyle = "";
  /**
   * Duration for the progress bar to fill up (in milliseconds).
   * @default undefined
   */
  @Prop({ mutable: true }) kulTimeout: number;
  //#endregion

  //#region Internal variables
  #progressAnimationFrame: number;
  //#endregion

  //#region Watchers
  @Watch("kulTimeout")
  kulTimeoutChanged(newValue: number, oldValue: number) {
    if (newValue !== oldValue && this.kulBarVariant) {
      this.#startProgressBar();
    }
  }
  @Watch("kulBarVariant")
  kulBarVariantChanged(newValue: boolean) {
    if (newValue && this.kulTimeout) {
      this.#startProgressBar();
    } else {
      this.progress = 0;
      cancelAnimationFrame(this.#progressAnimationFrame);
    }
  }
  //#endregion

  //#region Event
  @Event({
    eventName: "kul-spinner-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulSpinnerEventPayload>;
  onKulEvent(e: Event | CustomEvent, eventType: KulSpinnerEvent) {
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
  #startProgressBar() {
    this.progress = 0;
    const startTime = Date.now();
    const duration = this.kulTimeout;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      this.progress = Math.min((elapsed / duration) * 100, 100);

      if (this.progress < 100) {
        this.#progressAnimationFrame = requestAnimationFrame(updateProgress);
      } else {
        cancelAnimationFrame(this.#progressAnimationFrame);
      }
    };

    this.#progressAnimationFrame = requestAnimationFrame(updateProgress);
  }
  //#endregion

  //#region Lifecycle hooks
  componentWillLoad() {
    const { theme } = kulManagerSingleton;

    theme.register(this);
  }
  componentDidLoad() {
    const { info } = kulManagerSingleton.debug;

    const { kulBarVariant, kulTimeout } = this;

    this.onKulEvent(new CustomEvent("ready"), "ready");
    info.update(this, "did-load");

    if (kulBarVariant && kulTimeout) {
      this.#startProgressBar();
    }
  }
  componentWillRender() {
    const { info } = kulManagerSingleton.debug;

    info.update(this, "will-render");
  }
  componentWillUpdate() {
    if (this.kulFader) {
      this.bigWait = false;
    }
  }
  componentDidRender() {
    const { info } = kulManagerSingleton.debug;

    const root = this.rootElement.shadowRoot;

    if (root) {
      if (this.kulFader && this.kulActive) {
        setTimeout(() => {
          this.bigWait = true;
        }, this.kulFaderTimeout);
      }
    }

    info.update(this, "did-render");
  }
  render() {
    const { theme } = kulManagerSingleton;

    const {
      bigWait,
      kulBarVariant,
      kulDimensions,
      kulFullScreen,
      kulLayout,
      kulStyle,
      progress,
    } = this;

    const elStyle: Record<string, string | undefined> = {
      height: kulFullScreen ? undefined : "100%",
      width: kulFullScreen ? undefined : "100%",
      fontSize: kulDimensions || (kulBarVariant ? "3px" : "16px"),
    };

    const config = kulBarVariant
      ? BAR_SPINNER_CONFIGS[kulLayout]
      : SPINNER_CONFIGS[kulLayout];

    const wrapperClass = kulBarVariant
      ? "loading-wrapper-master-bar"
      : "loading-wrapper-master-spinner";

    const masterClass = {
      "spinner-version": !kulBarVariant,
      "big-wait": bigWait,
    };

    const spinnerClass =
      config?.className ||
      `spinner-${kulBarVariant ? "bar-v" : "v"}${kulLayout}`;
    const spinnerEl = config?.elements(progress) || [];

    return (
      <Host style={elStyle}>
        {kulStyle && <style id={KUL_STYLE_ID}>{theme.setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID} style={elStyle}>
          <div
            id="loading-wrapper-master"
            class={{
              ...masterClass,
            }}
            style={elStyle}
          >
            <div id={wrapperClass} style={elStyle}>
              <div class={spinnerClass}>{spinnerEl}</div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
  disconnectedCallback() {
    const { theme } = kulManagerSingleton;

    theme.unregister(this);
    cancelAnimationFrame(this.#progressAnimationFrame);
  }
}
