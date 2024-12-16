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
} from "@stencil/core";
import Prism from "prismjs";

import { kulManagerSingleton } from "src";
import { STATIC_LANGUAGES } from "src/components/kul-code/helpers/kul-code-languages";
import {
  KulCodeEvent,
  KulCodeEventPayload,
} from "src/components/kul-code/kul-code-declarations";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { GenericObject } from "src/types/GenericTypes";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "src/variables/GenericVariables";

@Component({
  assetsDirs: ["assets/prism"],
  tag: "kul-code",
  styleUrl: "kul-code.scss",
  shadow: true,
})
export class KulCode {
  /**
   * References the root HTML element of the component (<kul-code>).
   */
  @Element() rootElement: HTMLKulCodeElement;

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
   * Value.
   */
  @State() value = "";
  //#endregion

  //#region Props
  /**
   * Automatically formats the value.
   * @default true
   */
  @Prop({ mutable: true, reflect: true }) kulFormat = true;
  /**
   * Sets the language of the snippet.
   * @default "javascript"
   */
  @Prop({ mutable: true, reflect: true }) kulLanguage = "javascript";
  /**
   * Whether to preserve spaces or not. When missing it is set automatically.
   * @default undefined
   */
  @Prop({ mutable: true, reflect: true }) kulPreserveSpaces: boolean;
  /**
   * Enables customization of the component's style.
   * @default "" - No custom style applied by default.
   */
  @Prop({ mutable: true }) kulStyle = "";
  /**
   * String containing the snippet of code to display.
   * @default ""
   */
  @Prop({ mutable: true, reflect: false }) kulValue = "";
  //#endregion

  //#region Internal variables
  #el: HTMLPreElement | HTMLDivElement;
  //#endregion

  //#region Events
  @Event({
    eventName: "kul-code-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulCodeEventPayload>;
  onKulEvent(e: Event | CustomEvent, eventType: KulCodeEvent) {
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

  //#region Private methods
  #format(value: string) {
    const { data } = kulManagerSingleton;

    if (typeof value === "string" && /^[\{\}]\s*$/i.test(value)) {
      return value.trim();
    } else if (this.#isJson(value)) {
      const parsed = JSON.parse(value);
      return JSON.stringify(parsed, null, 2);
    } else {
      return data.cell.stringify(value);
    }
  }
  async #highlightCode(): Promise<void> {
    const { debug } = kulManagerSingleton;

    try {
      if (!Prism.languages[this.kulLanguage]) {
        await this.#loadLanguage();
      }
    } catch (error) {
      debug.logs.new(this, "Failed to highlight code:" + error, "error");
      this.#el.innerHTML = this.value;
    } finally {
      Prism.highlightElement(this.#el);
    }
  }
  #isObjectLike(
    obj: unknown,
  ): obj is Record<string | number | symbol, unknown> {
    return typeof obj === "object" && obj !== null;
  }
  #isDictionary(
    obj: unknown,
  ): obj is Record<string | number | symbol, unknown> {
    return (
      this.#isObjectLike(obj) &&
      Object.values(obj).every((value) => value != null)
    );
  }
  #isJson(value: string | Record<string, unknown>) {
    return (
      this.kulLanguage?.toLowerCase() === "json" || this.#isDictionary(value)
    );
  }
  async #loadLanguage() {
    try {
      const module = getAssetPath(
        `./assets/prism/prism-${this.kulLanguage}.min.js`,
      );
      await import(module);
    } catch (error) {
      console.error(
        `Failed to load Prism.js component for ${this.kulLanguage}:`,
        error,
      );
    }
  }
  #updateValue() {
    const { kulFormat, kulValue } = this;

    this.value = kulFormat ? this.#format(kulValue) : kulValue;
  }
  //#endregion

  //#region Lifecycle hooks
  componentWillLoad() {
    const { theme } = kulManagerSingleton;
    const {
      css,
      javascript,
      json,
      jsx,
      markdown,
      markup,
      python,
      regex,
      scss,
      tsx,
      typescript,
    } = STATIC_LANGUAGES;

    theme.register(this);

    css(Prism);
    javascript(Prism);
    json(Prism);
    jsx(Prism);
    markdown(Prism);
    markup(Prism);
    python(Prism);
    regex(Prism);
    scss(Prism);
    tsx(Prism);
    typescript(Prism);

    this.#updateValue();
  }
  componentDidLoad() {
    const { debug } = kulManagerSingleton;

    this.onKulEvent(new CustomEvent("ready"), "ready");
    debug.updateDebugInfo(this, "did-load");
  }
  componentWillUpdate() {
    this.value = this.#format(this.kulValue);
  }
  componentWillRender() {
    const { debug } = kulManagerSingleton;

    debug.updateDebugInfo(this, "will-render");
  }
  componentDidRender() {
    const { debug } = kulManagerSingleton;

    if (this.#el) {
      this.#highlightCode();
    }

    debug.updateDebugInfo(this, "did-render");
  }
  render() {
    const { theme } = kulManagerSingleton;
    const { kulLanguage, kulPreserveSpaces, kulStyle, kulValue } = this;

    const isPreserveSpaceMissing = !!(
      kulPreserveSpaces !== true && kulPreserveSpaces !== false
    );
    const isLikelyTextual =
      kulLanguage.toLowerCase() === "text" ||
      kulLanguage.toLowerCase() === "doc" ||
      kulLanguage.toLowerCase() === "markdown" ||
      kulLanguage.toLowerCase() === "css" ||
      kulLanguage.toLowerCase() === "";
    const shouldPreserveSpace =
      kulPreserveSpaces || (isPreserveSpaceMissing && !isLikelyTextual);

    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{theme.setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID}>
          <div class="container">
            <div class="header">
              <span class="title">{kulLanguage}</span>
              <kul-button
                class={"kul-slim kul-full-height"}
                kulIcon="content_copy"
                kulLabel="Copy"
                kulStyling="flat"
                onKul-button-event={(e) => {
                  const { comp, eventType } = e.detail;
                  switch (eventType) {
                    case "click":
                      navigator.clipboard.writeText(kulValue);
                      comp.setMessage();
                      break;
                  }
                }}
              ></kul-button>
            </div>
            {shouldPreserveSpace ? (
              <pre
                class={"language-" + kulLanguage}
                key={this.value}
                ref={(el) => {
                  if (el) {
                    this.#el = el;
                  }
                }}
              >
                <code>{this.value}</code>
              </pre>
            ) : (
              <div
                class={"body language-" + kulLanguage}
                key={this.value}
                ref={(el) => {
                  if (el) {
                    this.#el = el;
                  }
                }}
              >
                {this.value}
              </div>
            )}
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
