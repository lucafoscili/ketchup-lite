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

import { kulManagerSingleton } from "src";
import {
  KulAccordionEvent,
  KulAccordionEventPayload,
} from "src/components/kul-accordion//kul-accordion-declarations";
import {
  KulDataDataset,
  KulDataNode,
} from "src/managers/kul-data/kul-data-declarations";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { GenericObject, KulDataCyAttributes } from "src/types/GenericTypes";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "src/variables/GenericVariables";

@Component({
  tag: "kul-accordion",
  styleUrl: "kul-accordion.scss",
  shadow: true,
})
export class KulAccordion {
  /**
   * References the root HTML element of the component (<kul-accordion>).
   */
  @Element() rootElement: HTMLKulAccordionElement;

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
   * Set of expanded nodes.
   */
  @State() expandedNodes: Set<KulDataNode> = new Set();
  /**
   * Selected nodes.
   */
  @State() selectedNodes: Set<KulDataNode> = new Set();
  //#endregion

  //#region Props
  /**
   * Actual data of the accordion.
   * @default null
   */
  @Prop({ mutable: true }) kulData: KulDataDataset = null;
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
  //#endregion

  //#region Internal variables
  #rippleSurface: { [id: string]: HTMLElement } = {};
  #slotsNames: string[] = [];
  //#endregion

  //#region Events
  @Event({
    eventName: "kul-accordion-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulAccordionEventPayload>;
  onKulEvent(
    e: Event | CustomEvent,
    eventType: KulAccordionEvent,
    node?: KulDataNode,
  ) {
    switch (eventType) {
      case "pointerdown":
        if (this.kulRipple) {
          kulManagerSingleton.theme.ripple.trigger(
            e as PointerEvent,
            this.#rippleSurface[node.id],
          );
        }
        break;
    }

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
   * Returns the selected nodes.
   * @returns {Promise<KulDataNode[]>} Selected nodes.
   */
  @Method()
  async getSelectedNodes(): Promise<Set<KulDataNode>> {
    return this.selectedNodes;
  }
  /**
   * This method is used to trigger a new render of the component.
   */
  @Method()
  async refresh(): Promise<void> {
    forceUpdate(this);
  }
  /**
   * This method activates or deactivates an node.
   * @param {string} id - Id of the node.
   */
  @Method()
  async toggleNode(id: string, e?: Event) {
    const node = this.kulData.nodes.find((n) => n.id === id);
    if (!node) {
      return;
    }
    if (this.#isExpandible(node)) {
      if (this.#isExpanded(node)) {
        this.expandedNodes.delete(node);
      } else {
        this.expandedNodes.add(node);
      }
    } else if (this.#isSelected(node)) {
      this.selectedNodes.delete(node);
    } else {
      this.selectedNodes.add(node);
    }

    if (!this.#isExpandible(node)) {
      this.onKulEvent(e || new CustomEvent("click"), "click");
    }
    this.refresh();
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
  #isExpanded(node: KulDataNode): boolean {
    return this.expandedNodes.has(node);
  }
  #isExpandible(node: KulDataNode): boolean {
    return this.#slotsNames.includes(node.id);
  }
  #isSelected(node: KulDataNode): boolean {
    return this.selectedNodes.has(node);
  }
  #prepIcon(icon: string) {
    const { assets } = kulManagerSingleton;

    const path = assets.get(`./assets/svg/${icon}.svg`);
    const style = {
      mask: `url('${path}') no-repeat center`,
      webkitMask: `url('${path}') no-repeat center`,
    };
    return <div class={"node__icon"} style={style}></div>;
  }
  #prepAccordion(): VNode[] {
    const nodes: VNode[] = [];
    const slots: Array<HTMLElement> = Array.prototype.slice.call(
      this.rootElement.children,
      0,
    );
    this.#slotsNames = [];
    for (let index = 0; index < slots.length; index++) {
      const slot = slots[index];
      this.#slotsNames.push(slot.slot);
    }

    for (let i = 0; i < this.kulData.nodes.length; i++) {
      const node = this.kulData.nodes[i];
      const isExpanded = this.#isExpanded(node);
      const isExpandible = this.#isExpandible(node);
      const isSelected = this.#isSelected(node);
      const headerClassName = {
        node__header: true,
        "node__header--selected": !isExpandible && isSelected ? true : false,
        "node__header--expanded": isExpandible && isExpanded ? true : false,
      };
      const contentClassname: { [className: string]: boolean } = {
        node__content: true,
        "node__content--selected": isSelected ? true : false,
      };
      nodes.push(
        <div class="node">
          <div
            tabindex="1"
            title={node.description}
            class={headerClassName}
            data-cy={isExpandible ? undefined : KulDataCyAttributes.BUTTON}
            onClick={(e) => this.toggleNode(node.id, e)}
            onPointerDown={(e) => {
              this.onKulEvent(e, "pointerdown", node);
            }}
          >
            <div
              ref={(el) => {
                if (el && this.kulRipple) {
                  this.#rippleSurface[node.id] = el;
                }
              }}
            ></div>
            {node.icon ? this.#prepIcon(node.icon) : null}
            <span class="node__text">{node.value}</span>
            {isExpandible ? (
              <div
                class={`node__expand ${
                  isExpanded ? "node__expand--expanded" : ""
                } `}
              ></div>
            ) : null}
          </div>
          {isExpanded ? (
            <div class={contentClassname}>
              <slot name={node.id}></slot>
            </div>
          ) : null}
        </div>,
      );
    }
    return nodes;
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
    const { debug, theme } = kulManagerSingleton;

    if (Object.keys(this.#rippleSurface).length) {
      for (const key in this.#rippleSurface) {
        if (Object.prototype.hasOwnProperty.call(this.#rippleSurface, key)) {
          const surface = this.#rippleSurface[key];
          theme.ripple.setup(surface);
        }
      }
    }
    debug.updateDebugInfo(this, "did-render");
  }
  render() {
    const { theme } = kulManagerSingleton;
    const { kulStyle } = this;

    this.#rippleSurface = {};

    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{theme.setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID}>
          <div class="accordion">{this.#prepAccordion()}</div>
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
