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

import {
  KulSpinnerEvent,
  KulSpinnerEventPayload,
  KulSpinnerProps,
} from "./kul-spinner-declarations";
import {
  BAR_SPINNER_CONFIGS,
  SPINNER_CONFIGS,
} from "./layouts/kul-spinner-layouts";
import { KulDebugLifecycleInfo } from "../../managers/kul-debug/kul-debug-declarations";
import { kulManagerInstance } from "../../managers/kul-manager/kul-manager";
import { GenericObject } from "../../types/GenericTypes";
import { getProps } from "../../utils/componentUtils";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "../../variables/GenericVariables";

@Component({
  tag: "kul-spinner",
  styleUrl: "kul-spinner.scss",
  shadow: true,
})
export class KulSpinner {
  //#region Root
  /**
   * References the root HTML element of the component (<kul-spinner>).
   */
  @Element() rootElement: HTMLKulSpinnerElement;
  //#endregion
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
   * Progress percentage for the progress bar.
   */
  @State() kulProgress = 0;
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
  @Prop({ mutable: true, reflect: true }) kulDimensions = "";
  /**
   * Applies a blending modal over the component to darken or lighten the view, based on the theme.
   * @default false
   */
  @Prop({ mutable: true, reflect: true }) kulFader = false;
  /**
   * Duration needed for the fader to become active.
   * @default 3500
   */
  @Prop({ mutable: true, reflect: true }) kulFaderTimeout = 3500;
  /**
   * Fills the entire viewport when enabled.
   * @default false
   */
  @Prop({ mutable: true, reflect: true }) kulFullScreen = false;
  /**
   * Selects the spinner layout.
   * @default 1
   */
  @Prop({ mutable: true, reflect: true }) kulLayout = 1;
  /**
   * Sets a custom style for the component.
   * @default ""
   */
  @Prop({ mutable: true, reflect: true }) kulStyle = "";
  /**
   * Duration for the progress bar to fill up (in milliseconds).
   * @default undefined
   */
  @Prop({ mutable: true, reflect: true }) kulTimeout: number;
  //#endregion
  //#region Internal variables
  #kulManager = kulManagerInstance();
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
      this.kulProgress = 0;
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
   * Used to retrieve component's props values.
   * @param {boolean} descriptions - When provided and true, the result will be the list of props with their description.
   * @returns {Promise<GenericObject>} List of props as object, each key will be a prop.
   */
  @Method()
  async getProps(descriptions?: boolean): Promise<GenericObject> {
    return getProps(this, KulSpinnerProps, descriptions);
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
    this.#kulManager.theme.register(this);
  }
  componentDidLoad() {
    this.onKulEvent(new CustomEvent("ready"), "ready");
    this.#kulManager.debug.updateDebugInfo(this, "did-load");

    if (this.kulBarVariant && this.kulTimeout) {
      this.#startProgressBar();
    }
  }
  componentWillRender() {
    this.#kulManager.debug.updateDebugInfo(this, "will-render");
  }
  componentDidUpdate() {
    const root = this.rootElement.shadowRoot;
    if (root) {
      root
        .querySelector("#loading-wrapper-master")
        .classList.remove("loading-wrapper-big-wait");
    }
  }
  componentDidRender() {
    const root = this.rootElement.shadowRoot;

    if (root) {
      if (this.kulFader) {
        setTimeout(() => {
          root
            .querySelector("#loading-wrapper-master")
            .classList.add("loading-wrapper-big-wait");
        }, this.kulFaderTimeout);
      }
    }
    this.#kulManager.debug.updateDebugInfo(this, "did-render");
  }

  render() {
    let masterClass = "";
    let wrapperClass = "";
    let spinnerClass = "";
    let spinnerEl: VNode[] = [];
    let elStyle = undefined;

    if (this.kulBarVariant) {
      wrapperClass = "loading-wrapper-master-bar";
      const barConfig = BAR_SPINNER_CONFIGS[this.kulLayout];
      if (barConfig) {
        spinnerClass = barConfig.className;
        spinnerEl = barConfig.elements(this.kulProgress);
      } else {
        spinnerClass = "spinner-bar-v" + this.kulLayout;
      }
    } else {
      masterClass += " spinner-version";
      wrapperClass = "loading-wrapper-master-spinner";

      const config = SPINNER_CONFIGS[this.kulLayout];
      if (config) {
        spinnerClass = config.className;
        spinnerEl = config.elements();
      } else {
        spinnerClass = "spinner-v" + this.kulLayout;
      }
    }

    if (!this.kulFullScreen) {
      elStyle = {
        height: "100%",
        width: "100%",
      };
    }

    if (this.kulDimensions) {
      elStyle = {
        ...elStyle,
        fontSize: this.kulDimensions,
      };
    } else if (!this.kulBarVariant) {
      elStyle = {
        ...elStyle,
        fontSize: "16px",
      };
    } else {
      elStyle = {
        ...elStyle,
        fontSize: "3px",
      };
    }

    return (
      <Host style={elStyle}>
        {this.kulStyle ? (
          <style id={KUL_STYLE_ID}>
            {this.#kulManager.theme.setKulStyle(this)}
          </style>
        ) : undefined}
        <div id={KUL_WRAPPER_ID} style={elStyle}>
          <div id="loading-wrapper-master" class={masterClass} style={elStyle}>
            <div id={wrapperClass} style={elStyle}>
              <div class={spinnerClass}>{spinnerEl}</div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
  disconnectedCallback() {
    this.#kulManager.theme.unregister(this);
    cancelAnimationFrame(this.#progressAnimationFrame);
  }
  //#region Private methods
  #startProgressBar() {
    this.kulProgress = 0;
    const startTime = Date.now();
    const duration = this.kulTimeout;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      this.kulProgress = Math.min((elapsed / duration) * 100, 100);
      if (this.kulProgress < 100) {
        this.#progressAnimationFrame = requestAnimationFrame(updateProgress);
      } else {
        cancelAnimationFrame(this.#progressAnimationFrame);
      }
    };

    this.#progressAnimationFrame = requestAnimationFrame(updateProgress);
  }
  //#endregion
}
