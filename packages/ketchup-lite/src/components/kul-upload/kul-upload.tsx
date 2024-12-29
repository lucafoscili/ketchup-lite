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
import { kulManager } from "src/global/global";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import {
  CY_ATTRIBUTES,
  KUL_ATTRIBUTES,
  KUL_STYLE_ID,
  KUL_WRAPPER_ID,
} from "src/utils/constants";
import {
  KulUploadEvent,
  KulUploadEventPayload,
  KulUploadPropsInterface,
} from "./kul-upload-declarations";

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

  //#region States
  /**
   * Debug information.
   */
  @State() debugInfo = kulManager.debug.info.create();
  /**
   *State holding the selected files
   * @default []
   */
  @State() selectedFiles: File[] = [];
  //#endregion

  //#region Props
  /**
   * Sets the button's label.
   * @default "Upload files..."
   */
  @Prop({ mutable: true }) kulLabel = "Upload files...";
  /**
   * When set to true, the pointerdown event will trigger a ripple effect.
   * @default true
   */
  @Prop({ mutable: true }) kulRipple = true;
  /**
   * Enables customization of the component's style.
   * @default "" - No custom style applied by default.
   */
  @Prop({ mutable: true }) kulStyle = "";
  /**
   * Initializes the component with these files.
   * @default null
   */
  @Prop({ mutable: false }) kulValue: File[] = null;
  //#endregion

  //#region Internal variables
  #input: HTMLInputElement;
  #rippleSurface: HTMLElement;
  //#endregion

  //#region Events
  @Event({
    eventName: "kul-upload-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulUploadEventPayload>;
  onKulEvent(e: Event | CustomEvent, eventType: KulUploadEvent, file?: File) {
    const { theme } = kulManager;

    switch (eventType) {
      case "delete":
        this.selectedFiles = this.selectedFiles.filter((f) => f !== file);
        break;

      case "pointerdown":
        if (this.kulRipple) {
          theme.ripple.trigger(e as PointerEvent, this.#rippleSurface);
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
   * @returns {Promise<KulUploadPropsInterface>} Promise resolved with an object containing the component's properties.
   */
  @Method()
  async getProps(): Promise<KulUploadPropsInterface> {
    const { getProps } = kulManager;

    return getProps(this) as KulUploadPropsInterface;
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
  //#endregion

  //#region Private methods
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
  //#endregion

  //#region Lifecycle hooks
  connectedCallback() {
    const { theme } = kulManager;

    theme.register(this);
  }
  componentWillLoad() {
    if (Array.isArray(this.kulValue)) {
      this.selectedFiles = this.kulValue;
    }
  }
  componentDidLoad() {
    const { debug } = kulManager;

    this.onKulEvent(new CustomEvent("ready"), "ready");
    debug.info.update(this, "did-load");
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
    const { bemClass, setKulStyle } = kulManager.theme;

    const { kulLabel, kulRipple, kulStyle, selectedFiles } = this;

    const hasSelectedFiles = !!selectedFiles?.length;
    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID}>
          <div
            class={bemClass("upload", null, {
              "with-info": Boolean(selectedFiles?.length),
            })}
          >
            <div
              class={bemClass("file-upload")}
              onPointerDown={(e) => this.onKulEvent(e, "pointerdown")}
            >
              <input
                class={bemClass("file-upload", "input")}
                data-cy={CY_ATTRIBUTES.input}
                id="upload-input"
                multiple
                onChange={() => this.#handleFileChange()}
                ref={(el) => {
                  this.#input = el;
                }}
                type="file"
              />
              <label
                class={bemClass("file-upload", "label")}
                data-cy={CY_ATTRIBUTES.ripple}
                data-kul={KUL_ATTRIBUTES.rippleSurface}
                htmlFor="upload-input"
                ref={(el) => {
                  if (kulRipple) {
                    this.#rippleSurface = el;
                  }
                }}
              >
                <div class={bemClass("file-upload", "text")}>{kulLabel}</div>
              </label>
            </div>
            <div class={bemClass("file-info")}>
              {hasSelectedFiles && this.#prepFileInfo()}
            </div>
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
