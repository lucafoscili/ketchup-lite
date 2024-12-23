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
} from "@stencil/core";
import { kulManagerSingleton } from "src/global/global";
import {
  KulDataDataset,
  KulDataNode,
} from "src/managers/kul-data/kul-data-declarations";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { KulScrollOnHoverElement } from "src/managers/kul-scroll-on-hover/kul-scroll-on-hover-declarations";
import { KUL_THEME_COLORS } from "src/managers/kul-theme/helpers/contants";
import {
  CY_ATTRIBUTES,
  KUL_STYLE_ID,
  KUL_WRAPPER_ID,
} from "src/utils/constants";
import {
  KulTabbarEvent,
  KulTabbarEventPayload,
  KulTabbarPropsInterface,
  KulTabbarState,
} from "./kul-tabbar-declarations";

@Component({
  tag: "kul-tabbar",
  styleUrl: "kul-tabbar.scss",
  shadow: true,
})
export class KulTabbar {
  /**
   * References the root HTML element of the component (<kul-tabbar>).
   */
  @Element() rootElement: HTMLKulTabbarElement;

  //#region States
  /**
   * Debug information.
   */
  @State() debugInfo = kulManagerSingleton.debug.info.create();
  /**
   * The node currently selected.
   */
  @State() value: KulTabbarState = null;
  //#endregion

  //#region Props
  /**
   * Actual data of the component.
   * @default null
   */
  @Prop() kulData: KulDataDataset = null;
  /**
   * When set to true, the pointerdown event will trigger a ripple effect.
   * @default true
   */
  @Prop({ mutable: true }) kulRipple = true;
  /**
   * Custom style of the component.
   * @default ""
   */
  @Prop({ mutable: true }) kulStyle = "";
  /**
   * Sets the initial selected node's index.
   * @default null
   */
  @Prop({ mutable: false }) kulValue: number | string = 0;
  //#endregion

  //#region Internal variables
  #rippleSurface: HTMLElement[];
  #scrollArea: KulScrollOnHoverElement;
  //#endregion

  //#region Events
  @Event({
    eventName: "kul-tabbar-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulTabbarEventPayload>;
  onKulEvent(
    e: Event | CustomEvent,
    eventType: KulTabbarEvent,
    index = 0,
    node?: KulDataNode,
  ) {
    const { theme } = kulManagerSingleton;

    switch (eventType) {
      case "click":
        this.value = {
          index,
          node,
        };
        break;

      case "pointerdown":
        if (this.kulRipple) {
          theme.ripple.trigger(e as PointerEvent, this.#rippleSurface[index]);
        }
        break;
    }

    this.kulEvent.emit({
      comp: this,
      eventType,
      id: this.rootElement.id,
      originalEvent: e,
      node,
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
   * @returns {Promise<KulTabbarPropsInterface>} Promise resolved with an object containing the component's properties.
   */
  @Method()
  async getProps(): Promise<KulTabbarPropsInterface> {
    const { getProps } = kulManagerSingleton;

    return getProps(this) as KulTabbarPropsInterface;
  }
  /**
   * Returns the selected node and its index.
   * @returns {Promise<KulTabbarState>} Selected node and its index.
   */
  @Method()
  async getValue(): Promise<KulTabbarState> {
    return this.value;
  }
  /**
   * Triggers a re-render of the component to reflect any state changes.
   */
  @Method()
  async refresh(): Promise<void> {
    forceUpdate(this);
  }
  /**
   * Sets the value of the component based on the provided argument.
   * @param {number | string} value - The index of the node or the id of the node.
   * @returns {Promise<KulTabbarState>} The newly set value.
   */
  @Method()
  async setValue(value: number | string): Promise<KulTabbarState> {
    let index: number;
    let node: KulDataNode;

    if (typeof value === "number") {
      index = value;
      node = this.kulData.nodes[index];
    } else if (typeof value === "string") {
      index = this.kulData.nodes.findIndex((node) => node.id === value);
      node = this.kulData.nodes[index];
    }

    this.value = {
      index,
      node,
    };

    return this.value;
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
    const { debug, theme } = kulManagerSingleton;

    const { kulData, kulValue } = this;

    try {
      if (kulValue !== null) {
        if (typeof kulValue === "number") {
          this.value = {
            index: kulValue,
            node: kulData.nodes[kulValue],
          };
        }
        if (typeof kulValue === "string") {
          const node = kulData.nodes.find((node) => node.id === kulValue);
          this.value = {
            index: kulData.nodes.indexOf(node),
            node,
          };
        }
      }
    } catch (error) {
      debug.logs.new(
        this,
        "Something went wrong while setting the initial selected value.",
        "warning",
      );
    }

    theme.register(this);
  }
  componentDidLoad() {
    const { debug, scrollOnHover } = kulManagerSingleton;

    if (this.#scrollArea) {
      scrollOnHover.register(this.#scrollArea);
    }

    this.onKulEvent(new CustomEvent("ready"), "ready");
    debug.info.update(this, "did-load");
  }
  componentWillRender() {
    const { debug, theme } = kulManagerSingleton;

    if (this.#rippleSurface?.length) {
      this.#rippleSurface.forEach((el) => {
        theme.ripple.setup(el);
      });
    }

    debug.info.update(this, "will-render");
  }
  componentDidRender() {
    const { info } = kulManagerSingleton.debug;

    info.update(this, "did-render");
  }
  render() {
    const { data, theme } = kulManagerSingleton;
    const { bemClass, setKulStyle } = theme;

    const { kulData, kulRipple, kulStyle, value } = this;

    if (!data.node.exists(kulData)) {
      return;
    }

    this.#rippleSurface = [];
    const nodes = kulData.nodes;
    const elements: Array<VNode> = [];

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const isActive = node === value?.node;

      elements.push(
        <button
          aria-selected={isActive ? true : false}
          class={bemClass("tab", null, { active: isActive })}
          data-cy={CY_ATTRIBUTES.button}
          onClick={(e) => {
            this.onKulEvent(e, "click", i, node);
          }}
          onPointerDown={(e) => {
            this.onKulEvent(e, "pointerdown", i, node);
          }}
          role="tab"
          tabIndex={i}
          title={node?.description ?? ""}
        >
          <div
            data-cy={CY_ATTRIBUTES.ripple}
            ref={(el) => {
              if (el && kulRipple) {
                this.#rippleSurface.push(el);
              }
            }}
          ></div>
          <span class={bemClass("tab", "content")} data-cy={CY_ATTRIBUTES.node}>
            {node.icon && (
              <kul-image
                class={bemClass("tab", "icon")}
                kulColor={`var(${KUL_THEME_COLORS.primary})`}
                kulSizeX="24px"
                kulSizeY="24px"
                kulValue={node.icon}
              />
            )}
            {node.value && (
              <span class={bemClass("tab", "text-label")}>{node.value}</span>
            )}
          </span>
          <span
            class={bemClass("tab", "indicator", {
              active: isActive,
            })}
          >
            <span
              class={bemClass("tab", "indicator-content", {
                underline: true,
              })}
            ></span>
          </span>
        </button>,
      );
    }

    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID}>
          <div class={bemClass("tabbar")} role="tablist">
            <div class={bemClass("tabbar", "scroller")}>
              <div
                class={bemClass("tabbar", "scroll-area")}
                ref={(el: HTMLElement) =>
                  (this.#scrollArea = el as KulScrollOnHoverElement)
                }
              >
                <div class={bemClass("tabbar", "scroll-content")}>
                  {elements}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
  disconnectedCallback() {
    const { scrollOnHover, theme } = kulManagerSingleton;

    if (this.#scrollArea) {
      scrollOnHover.unregister(this.#scrollArea);
    }
    theme.unregister(this);
  }
  //#endregion
}
