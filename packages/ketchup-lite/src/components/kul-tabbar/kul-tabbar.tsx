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

import {
  KulTabbarEventPayload,
  KulTabbarEvent,
  KulTabbarProps,
  KulTabbarState,
} from "./kul-tabbar-declarations";
import {
  KulDataDataset,
  KulDataNode,
} from "../../managers/kul-data/kul-data-declarations";
import { KulDebugLifecycleInfo } from "../../managers/kul-debug/kul-debug-declarations";
import { kulManagerInstance } from "../../managers/kul-manager/kul-manager";
import { KulScrollOnHoverElement } from "../../managers/kul-scroll-on-hover/kul-scroll-on-hover-declarations";
import { KulThemeColorValues } from "../../managers/kul-theme/kul-theme-declarations";
import { GenericObject, KulDataCyAttributes } from "../../types/GenericTypes";
import { getProps } from "../../utils/componentUtils";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "../../variables/GenericVariables";

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
   * The node currently selected.
   */
  @State() value: KulTabbarState = null;

  /*-------------------------------------------------*/
  /*                    P r o p s                    */
  /*-------------------------------------------------*/

  /**
   * Actual data of the component.
   * @default null
   */
  @Prop() kulData: KulDataDataset = null;
  /**
   * When set to true, the pointerdown event will trigger a ripple effect.
   * @default true
   */
  @Prop({ mutable: true, reflect: true }) kulRipple = true;
  /**
   * Custom style of the component.
   * @default ""
   */
  @Prop({ mutable: true, reflect: true }) kulStyle = "";
  /**
   * Sets the initial selected node's index.
   * @default null
   */
  @Prop({ mutable: false, reflect: true }) kulValue: number | string = 0;

  /*-------------------------------------------------*/
  /*       I n t e r n a l   V a r i a b l e s       */
  /*-------------------------------------------------*/

  #kulManager = kulManagerInstance();
  #rippleSurface: HTMLElement[];
  #scrollArea: KulScrollOnHoverElement;

  /*-------------------------------------------------*/
  /*                   E v e n t s                   */
  /*-------------------------------------------------*/

  /**
   * Describes events emitted.
   */
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
    if (eventType === "pointerdown") {
      if (this.kulRipple) {
        this.#kulManager.theme.ripple.trigger(
          e as PointerEvent,
          this.#rippleSurface[index],
        );
      }
    }
    if (eventType === "click") {
      this.value = {
        index,
        node,
      };
    }

    this.kulEvent.emit({
      comp: this,
      eventType,
      id: this.rootElement.id,
      originalEvent: e,
      node,
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

  /*-------------------------------------------------*/
  /*          L i f e c y c l e   H o o k s          */
  /*-------------------------------------------------*/

  componentWillLoad() {
    try {
      if (this.kulValue !== null) {
        if (typeof this.kulValue === "number") {
          this.value = {
            index: this.kulValue,
            node: this.kulData.nodes[this.kulValue],
          };
        }
        if (typeof this.kulValue === "string") {
          const node = this.kulData.nodes.find(
            (node) => node.id === this.kulValue,
          );
          this.value = {
            index: this.kulData.nodes.indexOf(node),
            node,
          };
        }
      }
    } catch (error) {
      this.#kulManager.debug.logs.new(
        this,
        "Something went wrong while setting the initial selected value.",
        "warning",
      );
    }

    this.#kulManager.theme.register(this);
  }

  componentDidLoad() {
    if (this.#scrollArea) {
      this.#kulManager.scrollOnHover.register(this.#scrollArea);
    }
    this.onKulEvent(new CustomEvent("ready"), "ready");
    this.#kulManager.debug.updateDebugInfo(this, "did-load");
  }

  componentWillRender() {
    if (this.#rippleSurface?.length) {
      this.#rippleSurface.forEach((el) => {
        this.#kulManager.theme.ripple.setup(el);
      });
    }
    this.#kulManager.debug.updateDebugInfo(this, "will-render");
  }

  componentDidRender() {
    this.#kulManager.debug.updateDebugInfo(this, "did-render");
  }

  render() {
    if (!this.#kulManager.data.node.exists(this.kulData)) {
      return;
    }

    this.#rippleSurface = [];
    const nodes = this.kulData.nodes;
    const elements: Array<VNode> = [];

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const isActive = node === this.value?.node;
      const tabClass: Record<string, boolean> = {
        tab: true,
        "tab--active": isActive ? true : false,
      };

      elements.push(
        <button
          aria-selected={isActive ? true : false}
          class={tabClass}
          data-cy={KulDataCyAttributes.BUTTON}
          onClick={(e) => {
            this.onKulEvent(e, "click", i, node);
          }}
          onPointerDown={(e) => {
            this.onKulEvent(e, "pointerdown", i, node);
          }}
          role="tab"
          tabIndex={i}
          title={node.description ? node.description : null}
        >
          <div
            ref={(el) => {
              if (el && this.kulRipple) {
                this.#rippleSurface.push(el);
              }
            }}
          ></div>
          <span class="tab__content">
            {node.icon ? (
              <kul-image
                class="tab__icon"
                kulColor={`var(${KulThemeColorValues.PRIMARY})`}
                kulSizeX="24px"
                kulSizeY="24px"
                kulValue={node.icon}
              />
            ) : null}
            {node.value ? (
              <span class="tab__text-label">{node.value}</span>
            ) : null}
          </span>
          <span
            class={`tab__indicator ${
              isActive ? " tab__indicator--active" : ""
            }`}
          >
            <span class="tab__indicator-content tab__indicator-content--underline"></span>
          </span>
        </button>,
      );
    }

    return (
      <Host>
        {this.kulStyle ? (
          <style id={KUL_STYLE_ID}>
            {this.#kulManager.theme.setKulStyle(this)}
          </style>
        ) : undefined}
        <div id={KUL_WRAPPER_ID}>
          <div class="tabbar" role="tablist">
            <div class="tabbar_scroller">
              <div
                class="tabbar__scroll-area"
                ref={(el: HTMLElement) =>
                  (this.#scrollArea = el as KulScrollOnHoverElement)
                }
              >
                <div class="tabbar__scroll-content">{elements}</div>
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }

  disconnectedCallback() {
    if (this.#scrollArea) {
      this.#kulManager.scrollOnHover.unregister(this.#scrollArea);
    }
    this.#kulManager.theme.unregister(this);
  }
}
