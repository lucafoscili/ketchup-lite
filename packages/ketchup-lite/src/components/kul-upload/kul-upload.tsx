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

import {
  KulUploadEventPayload,
  KulUploadEvent,
  KulUploadProps,
} from "./kul-upload-declarations";
import { KulDebugLifecycleInfo } from "../../managers/kul-debug/kul-debug-declarations";
import { kulManagerInstance } from "../../managers/kul-manager/kul-manager";
import { GenericObject } from "../../types/GenericTypes";
import { getProps } from "../../utils/componentUtils";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "../../variables/GenericVariables";

@Component({
  tag: "kul-upload",
  styleUrl: "kul-upload.scss",
  shadow: true,
})
export class KulUpload {
  /**
   * References the root HTML element of the component (<kul-upload>).
   */
  @Element() rootElement: HTMLKulUploadElement;

  /*-------------------------------------------------*/
  /*                   S t a t e s                   */
  /*-------------------------------------------------*/

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
   *State holding the selected files
   * @default []
   */
  @State() selectedFiles: File[] = [];

  /*-------------------------------------------------*/
  /*                    P r o p s                    */
  /*-------------------------------------------------*/

  /**
   * Sets the button's label.
   * @default "Upload files..."
   */
  @Prop({ mutable: true, reflect: true }) kulLabel = "Upload files...";
  /**
   * When set to true, the pointerdown event will trigger a ripple effect.
   * @default true
   */
  @Prop({ mutable: true, reflect: true }) kulRipple = true;
  /**
   * Enables customization of the component's style.
   * @default "" - No custom style applied by default.
   */
  @Prop({ mutable: true, reflect: true }) kulStyle = "";
  /**
   * Initializes the component with these files.
   * @default null
   */
  @Prop({ mutable: false }) kulValue = null;

  /*-------------------------------------------------*/
  /*       I n t e r n a l   V a r i a b l e s       */
  /*-------------------------------------------------*/

  #input: HTMLInputElement;
  #kulManager = kulManagerInstance();
  #rippleSurface: HTMLElement;

  /*-------------------------------------------------*/
  /*                   E v e n t s                   */
  /*-------------------------------------------------*/

  /**
   * Describes event emitted.
   */
  @Event({
    eventName: "kul-upload-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulUploadEventPayload>;

  onKulEvent(e: Event | CustomEvent, eventType: KulUploadEvent, file?: File) {
    switch (eventType) {
      case "delete":
        this.selectedFiles = this.selectedFiles.filter((f) => f !== file);
        break;

      case "pointerdown":
        if (this.kulRipple) {
          this.#kulManager.theme.ripple.trigger(
            e as PointerEvent,
            this.#rippleSurface,
          );
        }
        break;
    }
    this.kulEvent.emit({
      comp: this,
      eventType,
      id: this.rootElement.id,
      originalEvent: e,
      selectedFiles: this.selectedFiles,
    });
  }

  /*-------------------------------------------------*/
  /*           P u b l i c   M e t h o d s           */
  /*-------------------------------------------------*/

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
   * Returns the component's internal value.
   */
  @Method()
  async getValue(): Promise<File[]> {
    return this.selectedFiles;
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

  /*-------------------------------------------------*/
  /*           P r i v a t e   M e t h o d s         */
  /*-------------------------------------------------*/

  #formatFileSize(size: number): string {
    const units = ["Bytes", "KB", "MB", "GB", "TB"];
    let unitIndex = 0;

    if (size > 10000) {
      size /= 1024;
      size /= 1024;
      unitIndex = 2;
    } else {
      while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
      }
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }

  #handleFileChange() {
    if (this.#input.files) {
      this.selectedFiles = Array.from(this.#input.files);
    } else {
      this.selectedFiles = [];
    }
    this.onKulEvent(new CustomEvent("upload"), "upload");
  }

  #prepFileInfo() {
    return this.selectedFiles.map((file, index) => (
      <div class="file-info__item" key={index}>
        <kul-image
          class="file-info__type"
          kulValue={
            file.type.includes("image")
              ? "image"
              : file.type.includes("audio")
                ? "audiotrack"
                : file.type.includes("video")
                  ? "movie"
                  : "file"
          }
          kulSizeX="24px"
          kulSizeY="24px"
          title={file.type}
        ></kul-image>
        <span class="file-info__name" title={file.name}>
          {file.name}
        </span>
        <span class="file-info__size" title={file.size.toString()}>
          {this.#formatFileSize(file.size)}
        </span>
        <kul-button
          class="file-info__clear"
          kulIcon={"clear"}
          kulStyling="flat"
          onClick={(e) => {
            this.onKulEvent(e, "delete", file);
          }}
          title="Remove"
        ></kul-button>
      </div>
    ));
  }

  /*-------------------------------------------------*/
  /*          L i f e c y c l e   H o o k s          */
  /*-------------------------------------------------*/

  componentWillLoad() {
    this.#kulManager.theme.register(this);
    if (Array.isArray(this.kulValue)) {
      this.selectedFiles = this.kulValue;
    }
  }

  componentDidLoad() {
    this.onKulEvent(new CustomEvent("ready"), "ready");
    if (this.#rippleSurface) {
      this.#kulManager.theme.ripple.setup(this.#rippleSurface);
    }
    this.#kulManager.debug.updateDebugInfo(this, "did-load");
  }

  componentWillRender() {
    this.#kulManager.debug.updateDebugInfo(this, "will-render");
  }

  componentDidRender() {
    this.#kulManager.debug.updateDebugInfo(this, "did-render");
  }

  render() {
    const hasSelectedFiles = this.selectedFiles && this.selectedFiles.length;
    return (
      <Host>
        {this.kulStyle ? (
          <style id={KUL_STYLE_ID}>
            {this.#kulManager.theme.setKulStyle(this)}
          </style>
        ) : undefined}
        <div id={KUL_WRAPPER_ID}>
          <div
            class={`wrapper ${
              this.selectedFiles && this.selectedFiles.length
                ? "wrapper--with-info"
                : ""
            }`}
          >
            <div
              class="file-upload"
              onPointerDown={(e) => this.onKulEvent(e, "pointerdown")}
            >
              <input
                class="file-upload__input"
                id="upload-input"
                multiple
                onChange={() => this.#handleFileChange()}
                ref={(el) => {
                  this.#input = el;
                }}
                type="file"
              />
              <label
                class="file-upload__label"
                htmlFor="upload-input"
                ref={(el) => {
                  if (this.kulRipple) {
                    this.#rippleSurface = el;
                  }
                }}
              >
                <div class="file-upload__text">{this.kulLabel}</div>
              </label>
            </div>
            <div class="file-info">
              {hasSelectedFiles ? this.#prepFileInfo() : undefined}
            </div>
          </div>
        </div>
      </Host>
    );
  }

  disconnectedCallback() {
    this.#kulManager.theme.unregister(this);
  }
}
