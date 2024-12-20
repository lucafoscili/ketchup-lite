import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  Fragment,
  h,
  Host,
  Method,
  Prop,
  State,
  VNode,
} from "@stencil/core";
import { kulManagerSingleton } from "src";
import {
  KulDataDataset,
  KulDataNode,
} from "src/managers/kul-data/kul-data-declarations";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { KulDynamicPositionPlacement } from "src/managers/kul-dynamic-position/kul-dynamic-position-declarations";
import { KulManagerClickCb } from "src/managers/kul-manager/kul-manager-declarations";
import { GenericObject, KulDataCyAttributes } from "src/types/GenericTypes";
import {
  KUL_DROPDOWN_CLASS,
  KUL_DROPDOWN_CLASS_VISIBLE,
  KUL_STYLE_ID,
  KUL_WRAPPER_ID,
} from "src/utils/constants";
import { KulImagePropsInterface } from "../kul-image/kul-image-declarations";
import { KulListEventPayload } from "../kul-list/kul-list-declarations";
import {
  KulButtonEvent,
  KulButtonEventPayload,
  KulButtonState,
  KulButtonStyling,
  KulButtonType,
} from "./kul-button-declarations";

@Component({
  tag: "kul-button",
  styleUrl: "kul-button.scss",
  shadow: true,
})
export class KulButton {
  /**
   * References the root HTML element of the component (<kul-button>).
   */
  @Element() rootElement: HTMLKulButtonElement;

  //#region States
  /**
   * Debug information.
   */
  @State() debugInfo = kulManagerSingleton.debug.info.create();
  /**
   * The value of the component ("on" or "off").
   * @default ""
   *
   * @see KulButtonState - For a list of possible states.
   */
  @State() value: KulButtonState = "off";
  //#endregion

  //#region Props
  /**
   * Actual data of the button, used to render dropdown buttons.
   * @default null
   */
  @Prop({ mutable: true }) kulData: KulDataDataset = null;
  /**
   * Defaults at false. When set to true, the component is disabled.
   * @default false
   */
  @Prop({ mutable: true }) kulDisabled = false;
  /**
   * When set, the button will show this icon.
   * @default ""
   */
  @Prop({ mutable: true }) kulIcon = "";
  /**
   * When set, the icon button off state will show this icon. Otherwise, an outlined version of the icon prop will be displayed.
   * @default ""
   */
  @Prop({ mutable: true }) kulIconOff = "";
  /**
   * When set, the button will show this text.
   * @default ""
   */
  @Prop({ mutable: true }) kulLabel = "";
  /**
   * When set to true, the pointerdown event will trigger a ripple effect.
   * @default true
   */
  @Prop({ mutable: true }) kulRipple = true;
  /**
   * When set to true, the button show a spinner received in slot.
   * @default false
   */
  @Prop({ mutable: true }) kulShowSpinner = false;
  /**
   * Custom style of the component.
   * @default ""
   */
  @Prop({ mutable: true }) kulStyle = "";
  /**
   * Defines the style of the button. This property controls the visual appearance of the button.
   *
   * @default "raised"
   *
   * @see KulButtonStyling - For a list of available styles.
   */
  @Prop({ mutable: true }) kulStyling: KulButtonStyling = "raised";
  /**
   * When set to true, the icon button will be toggable on/off.
   * @default false
   */
  @Prop({ mutable: true }) kulToggable = false;
  /**
   * When set, the icon will be shown after the text.
   * @default false
   */
  @Prop({ mutable: true }) kulTrailingIcon = false;
  /**
   * Sets the type of the button.
   * @default "button"
   */
  @Prop({ mutable: true }) kulType: KulButtonType = "button";
  /**
   * When set to true, the icon button state will be on.
   * @default false
   */
  @Prop({ mutable: false }) kulValue = false;
  //#endregion

  //#region Internal variables
  #clickCb: KulManagerClickCb;
  #dropdown: HTMLButtonElement;
  #dropdownRippleSurface: HTMLDivElement;
  #list: HTMLKulListElement;
  #rippleSurface: HTMLDivElement;
  #timeout: NodeJS.Timeout;
  //#endregion

  //#region Events
  @Event({
    eventName: "kul-button-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulButtonEventPayload>;
  onKulEvent(
    e: Event | CustomEvent,
    eventType: KulButtonEvent,
    isDropdown = false,
  ) {
    const { theme } = kulManagerSingleton;

    switch (eventType) {
      case "click":
        this.#updateState(this.#isOn() ? "off" : "on");
        break;
      case "pointerdown":
        if (this.kulRipple) {
          theme.ripple.trigger(
            e as PointerEvent,
            isDropdown ? this.#dropdownRippleSurface : this.#rippleSurface,
          );
        }
        break;
    }

    this.kulEvent.emit({
      comp: this,
      eventType,
      id: this.rootElement.id,
      originalEvent: e,
      value: this.value,
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
   * Used to retrieve the component's current state.
   * @returns {Promise<KulButtonState>} Promise resolved with the current state of the component.
   */
  @Method()
  async getValue(): Promise<KulButtonState> {
    return this.value;
  }
  /**
   * This method is used to trigger a new render of the component.
   */
  @Method()
  async refresh(): Promise<void> {
    forceUpdate(this);
  }
  /**
   * Temporarily sets a different label/icon combination, falling back to their previous value after a timeout.
   * @param {string} label - Temporary label to display.
   * @param {string} icon - Temporary icon to display.
   * @param {number} timeout - Time in ms to wait before restoring previous values.
   * @returns {Promise<void>}
   */
  async setMessage(
    label: string = "Copied!",
    icon: string = "check",
    timeout: number = 1000,
  ): Promise<void> {
    if (this.#timeout) {
      return;
    }

    const oldIcon = this.kulIcon;
    const oldLabel = this.kulLabel;

    requestAnimationFrame(() => {
      this.kulLabel = label;
      this.kulIcon = icon;
    });

    this.#timeout = setTimeout(() => {
      this.kulLabel = oldLabel;
      this.kulIcon = oldIcon;
      this.#timeout = null;
    }, timeout);
  }
  /**
   * Sets the component's state.
   * @param {KulButtonState} value - The new state to be set on the component.
   * @returns {Promise<void>}
   */
  @Method()
  async setValue(value: KulButtonState): Promise<void> {
    this.#updateState(value);
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
  #listManager() {
    const { addClickCallback, dynamicPosition, removeClickCallback } =
      kulManagerSingleton;

    return {
      close: () => {
        dynamicPosition.stop(this.#list);
        removeClickCallback(this.#clickCb);
      },
      isOpened: () => {
        return this.#list.classList.contains(KUL_DROPDOWN_CLASS_VISIBLE);
      },
      open: () => {
        if (dynamicPosition.isRegistered(this.#list)) {
          dynamicPosition.changeAnchor(this.#list, this.#dropdown);
        } else {
          dynamicPosition.register(
            this.#list,
            this.#dropdown,
            0,
            KulDynamicPositionPlacement.AUTO,
            true,
          );
        }
        dynamicPosition.start(this.#list);
        if (!this.#clickCb) {
          this.#clickCb = {
            cb: () => {
              this.#listManager().close();
            },
            el: this.#list,
          };
        }
        addClickCallback(this.#clickCb, true);
      },
      toggle: () => {
        if (this.#listManager().isOpened()) {
          this.#listManager().close();
        } else {
          this.#listManager().open();
        }
      },
    };
  }
  #isDropdown() {
    return this.kulData?.nodes?.[0]?.children?.length;
  }
  #isOn() {
    return this.value === "on" ? true : false;
  }
  #updateState(value: KulButtonState) {
    const { kulDisabled, kulToggable } = this;

    const isOff = value === "off";
    const isOn = value === "on";

    if (kulToggable && !kulDisabled && (isOff || isOn)) {
      this.value = value;
    }
  }
  #prepIcon(image: KulImagePropsInterface): VNode {
    const { bemClass } = kulManagerSingleton.theme;

    return (
      this.kulIcon && (
        <kul-image
          class={bemClass("button", "icon", {
            hidden: this.kulShowSpinner,
          })}
          {...image}
        />
      )
    );
  }
  #prepLabel(className: string): VNode {
    return <span class={className}>{this.kulLabel}</span>;
  }
  #prepNode(node: KulDataNode): VNode {
    const { children, value } = node;

    const currentNode = <div data-cy={KulDataCyAttributes.NODE}>{value}</div>;

    const hasChildren = !!(Array.isArray(children) && children.length > 0);
    return hasChildren ? (
      <Fragment>
        {currentNode}
        {children.map((c) => this.#prepNode(c))}
      </Fragment>
    ) : (
      currentNode
    );
  }
  #prepRipple(isDropdown = false): VNode {
    return (
      this.kulRipple && (
        <div
          data-cy={KulDataCyAttributes.RIPPLE}
          ref={(el) => {
            if (el && this.kulRipple) {
              if (isDropdown) {
                this.#dropdownRippleSurface = el;
              } else {
                this.#rippleSurface = el;
              }
            }
          }}
        ></div>
      )
    );
  }
  #prepSpinner(): VNode {
    const { bemClass } = kulManagerSingleton.theme;

    return (
      this.kulShowSpinner && (
        <div class={bemClass("button", "spinner-container")}>
          <slot name="spinner"></slot>
        </div>
      )
    );
  }
  #normalizedStyling() {
    return this.kulStyling
      ? (this.kulStyling.toLowerCase() as KulButtonStyling)
      : "raised";
  }
  #renderButton(): VNode[] {
    const { bemClass } = kulManagerSingleton.theme;

    const {
      kulDisabled,
      kulIcon,
      kulLabel,
      kulShowSpinner,
      kulTrailingIcon,
      kulType,
      rootElement,
    } = this;

    const buttonStyling = this.#normalizedStyling();

    const image: KulImagePropsInterface = {
      kulColor: kulDisabled
        ? `var(--kul_button_disabled_color)`
        : `var(--kul_button_primary_color)`,
      kulValue: kulIcon,
      kulSizeX: buttonStyling === "floating" ? "1.75em" : "1.475em",
      kulSizeY: buttonStyling === "floating" ? "1.75em" : "1.475em",
    };

    const labelClassName = bemClass("button", "label", {
      hidden: kulShowSpinner && !kulDisabled,
    });

    const style: Record<string, string> = {
      "--kul_button_spinner_height": image.kulSizeY,
    };

    return [
      <button
        aria-label={rootElement.title}
        class={bemClass("button", null, {
          disabled: kulDisabled,
          [buttonStyling]: true,
          ["no-label"]: !kulLabel || kulLabel === " ",
          "with-spinner": kulShowSpinner,
        })}
        data-cy={KulDataCyAttributes.BUTTON}
        disabled={kulDisabled}
        onBlur={(e) => this.onKulEvent(e, "blur")}
        onClick={(e) => this.onKulEvent(e, "click")}
        onFocus={(e) => this.onKulEvent(e, "focus")}
        onPointerDown={(e) => this.onKulEvent(e, "pointerdown")}
        style={style}
        type={kulType ? kulType : "button"}
      >
        {this.#prepRipple()}
        {kulTrailingIcon
          ? [this.#prepLabel(labelClassName), this.#prepIcon(image)]
          : [this.#prepIcon(image), this.#prepLabel(labelClassName)]}
        {this.#prepSpinner()}
      </button>,
      this.#renderDropdown(image, buttonStyling),
    ];
  }
  #renderIconButton(): VNode[] {
    const { bemClass } = kulManagerSingleton.theme;

    const {
      kulDisabled,
      kulIcon,
      kulIconOff,
      kulShowSpinner,
      kulToggable,
      kulType,
      rootElement,
      value,
    } = this;

    const isLarge = rootElement.classList.contains("large");
    const isOn = this.#isOn();

    const image: KulImagePropsInterface = {
      kulColor: kulDisabled
        ? `var(--kul_button_disabled_color)`
        : `var(--kul_button_primary_color)`,
      kulSizeX: isLarge ? "calc(1.75em * 1.5)" : "1.75em",
      kulSizeY: isLarge ? "calc(1.75em * 1.5)" : "1.75em",
    };

    const styleSpinnerContainer: Record<string, string> = {
      "--kul_button_spinner_height": image.kulSizeY,
      "--kul_button_spinner_width": image.kulSizeX,
    };

    const iconOff: string = kulIconOff ? kulIconOff : kulIcon + "_border";

    return [
      <button
        aria-label={rootElement.title}
        class={bemClass("icon-button", null, {
          disabled: kulDisabled,
          on: kulToggable && isOn,
          toggable: kulToggable,
          "with-spinner": kulShowSpinner,
        })}
        data-cy={KulDataCyAttributes.BUTTON}
        disabled={kulDisabled}
        onBlur={(e) => this.onKulEvent(e, "blur")}
        onClick={(e) => this.onKulEvent(e, "click")}
        onFocus={(e) => this.onKulEvent(e, "focus")}
        onPointerDown={(e) => this.onKulEvent(e, "pointerdown")}
        style={styleSpinnerContainer}
        value={value}
        type={kulType ? kulType : "button"}
      >
        {this.#prepRipple()}
        <kul-image
          class="icon-button__icon"
          {...image}
          kulValue={kulToggable && !isOn ? iconOff : kulIcon}
        />
        {this.#prepSpinner()}
      </button>,
      this.#renderDropdown(image, "icon"),
    ];
  }
  #renderDropdown(image: KulImagePropsInterface, styling: string): VNode {
    const { bemClass } = kulManagerSingleton.theme;

    if (!this.#isDropdown()) {
      return;
    }

    const { kulDisabled, kulData } = this;

    const eventHandler = (e: CustomEvent<KulListEventPayload>) => {
      if (e.detail.eventType === "click") {
        this.onKulEvent(e, "kul-event");
        this.#listManager().close();
      }
    };

    return (
      <button
        class={bemClass("button", null, {
          disabled: kulDisabled,
          dropdown: true,
          [styling]: true,
        })}
        data-cy={KulDataCyAttributes.DROPDOWN_BUTTON}
        disabled={kulDisabled}
        onClick={() => {
          this.#listManager().toggle();
        }}
        onPointerDown={(e) => this.onKulEvent(e, "pointerdown", true)}
        ref={(el) => {
          if (el) {
            this.#dropdown = el;
          }
        }}
      >
        {this.#prepRipple(true)}
        <kul-image {...image} kulValue={"--kul-dropdown-icon"} />
        <kul-list
          class={bemClass(KUL_DROPDOWN_CLASS)}
          data-cy={KulDataCyAttributes.DROPDOWN_MENU}
          kulData={{ nodes: kulData.nodes[0].children }}
          onKul-list-event={eventHandler}
          ref={(el) => (this.#list = el)}
        ></kul-list>
      </button>
    );
  }
  //#endregion

  //#region Lifecycle hooks
  componentWillLoad() {
    const { data, theme } = kulManagerSingleton;

    if (this.kulValue) {
      this.value = "on";
    }
    const firstNode = this.kulData?.nodes?.[0];
    if (firstNode) {
      if (!this.kulIcon) {
        this.kulIcon = firstNode.icon;
      }
      if (!this.kulLabel) {
        this.kulLabel = data.cell.stringify(firstNode.value);
      }
    }

    theme.register(this);
  }
  componentDidLoad() {
    const { debug, theme } = kulManagerSingleton;

    if (this.#rippleSurface) {
      theme.ripple.setup(this.#rippleSurface);
    }
    if (this.#dropdownRippleSurface) {
      theme.ripple.setup(this.#dropdownRippleSurface);
    }
    this.onKulEvent(new CustomEvent("ready"), "ready");
    debug.info.update(this, "did-load");
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
    const { debug, theme } = kulManagerSingleton;
    const { kulData, kulIcon, kulLabel, kulStyle } = this;

    const styling = this.#normalizedStyling();

    const isIconButton = !!(
      styling === "icon" ||
      (styling === "raised" &&
        kulIcon &&
        (kulLabel === null || kulLabel === undefined))
    );

    if (!kulLabel && !kulIcon && !kulData) {
      debug.logs.new(this, "Empty button.", "informational");
      return;
    }

    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{theme.setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID}>
          {isIconButton ? this.#renderIconButton() : this.#renderButton()}
        </div>
      </Host>
    );
  }
  disconnectedCallback() {
    const { dynamicPosition, theme } = kulManagerSingleton;

    if (this.#list) {
      dynamicPosition.unregister([this.#list]);
    }
    theme.unregister(this);
  }
  //#endregion
}
