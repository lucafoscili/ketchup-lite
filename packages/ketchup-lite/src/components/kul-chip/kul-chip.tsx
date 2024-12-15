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
  KulChipEvent,
  KulChipEventArguments,
  KulChipEventPayload,
  KulChipStyling,
} from "src/components/kul-chip/kul-chip-declarations";
import {
  KulDataDataset,
  KulDataNode,
} from "src/managers/kul-data/kul-data-declarations";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { GenericObject, KulDataCyAttributes } from "src/types/GenericTypes";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "src/variables/GenericVariables";

@Component({
  tag: "kul-chip",
  styleUrl: "kul-chip.scss",
  shadow: true,
})
export class KulChip {
  /**
   * References the root HTML element of the component (<kul-chip>).
   */
  @Element() rootElement: HTMLKulChipElement;

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
   * Children of a collapsed node.
   */
  @State() hiddenNodes: Set<KulDataNode> = new Set();
  /**
   * The selected chip items.
   * @default []
   */
  @State() selectedNodes: Set<KulDataNode> = new Set();
  //#endregion

  //#region Props
  /**
   * The data of the chip list.
   * @default []
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
  @Prop({ mutable: true }) kulStyle = "";
  /**
   * Styling of the chip component, includes: "choice", "input", "filter" and "standard".
   * @default ""
   */
  @Prop({ mutable: true }) kulStyling: KulChipStyling = "standard";
  //#endregion

  //#region Internal variables
  #nodeItems: VNode[] = [];
  #rippleSurface: HTMLElement[] = [];
  //#endregion

  //#region Events
  @Event({
    eventName: "kul-chip-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulChipEventPayload>;
  onKulEvent(
    e: Event | CustomEvent,
    eventType: KulChipEvent,
    args?: KulChipEventArguments,
  ) {
    const { theme } = kulManagerSingleton;

    const { expandedNodes, kulData, kulRipple, refresh, selectedNodes } = this;

    const { expansion, node } = args || {};

    switch (eventType) {
      case "click":
        if (expansion && this.#hasChildren(node)) {
          if (expandedNodes.has(node)) {
            expandedNodes.delete(node);
          } else {
            expandedNodes.add(node);
          }
          this.expandedNodes = new Set(expandedNodes);
        } else if (node) {
          if (selectedNodes.has(node)) {
            selectedNodes.delete(node);
          } else {
            selectedNodes.add(node);
          }
          this.selectedNodes = new Set(selectedNodes);
        }
        break;
      case "delete":
        const nodeIndex = kulData?.nodes?.indexOf(node);
        if (nodeIndex > -1) {
          kulData.nodes.splice(nodeIndex, 1);
          refresh();
        }
        break;
      case "pointerdown":
        if (kulRipple && this.#isClickable()) {
          theme.ripple.trigger(e as PointerEvent, this.#rippleSurface[node.id]);
        }
        break;
    }

    this.kulEvent.emit({
      comp: this,
      eventType,
      id: this.rootElement.id,
      originalEvent: e,
      node,
      selectedNodes: this.selectedNodes,
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
   * Selects one or more nodes in the chip component.
   * @param {KulDataNode[] | string[]} nodes - An array of KulDataNode objects or node IDs to be selected.
   * @returns {Promise<void>}
   */
  @Method()
  async setSelectedNodes(
    nodes: (KulDataNode[] | string[]) & Array<any>,
  ): Promise<void> {
    const nodesToAdd: Set<KulDataNode> = new Set();

    const isStringArray =
      Array.isArray(nodes) && nodes.every((item) => typeof item === "string");

    this.kulData?.nodes?.forEach((n: KulDataNode) => {
      if (isStringArray) {
        if (typeof n.id === "string" && nodes.includes(n.id)) {
          nodesToAdd.add(n);
        }
      } else {
        if (nodes.includes(n)) {
          nodesToAdd.add(n);
        }
      }
    });
    this.selectedNodes = nodesToAdd;
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
  #hasChildren(node: KulDataNode) {
    return !!(node.children && node.children.length);
  }
  #hasIconOnly(node: KulDataNode) {
    return !!(node.icon && !node.value);
  }
  #isChoice() {
    return this.kulStyling === "choice";
  }
  #isClickable() {
    return this.kulStyling === "choice" || this.kulStyling === "filter";
  }
  #isExpanded(node: KulDataNode) {
    return this.expandedNodes.has(node);
  }
  #isFilter() {
    return this.kulStyling === "filter";
  }
  #isInput() {
    return this.kulStyling === "input";
  }
  #isSelected(node: KulDataNode) {
    return this.selectedNodes.has(node);
  }
  #prepChip(node: KulDataNode, i: number) {
    const className = {
      chip: true,
      "chip--only-icon": this.#hasIconOnly(node),
      "chip--selected": this.#isSelected(node),
    };
    return (
      <div
        class={className}
        data-value={node.id}
        onClick={(e) => {
          this.onKulEvent(e, "click", { node });
        }}
        role="row"
        title={node.description ?? ""}
      >
        {this.#prepRipple(node)}
        <span class="indent"></span>
        {this.#prepIcons(node)}
        <span
          role="button"
          tabindex={i}
          class="chip__primary-action"
          data-cy={KulDataCyAttributes.INPUT}
          onBlur={(e) => {
            this.onKulEvent(e, "blur", { node });
          }}
          onFocus={(e) => {
            this.onKulEvent(e, "focus", { node });
          }}
        >
          <span class="chip__text">{node.value}</span>
        </span>
        {this.#isInput() && this.#prepDeleteIcon(node)}
      </div>
    );
  }
  #prepChipSet() {
    const elements: VNode[] = [];

    const nodeCount = this.kulData?.nodes?.length;
    for (let i = 0; nodeCount && i < nodeCount; i++) {
      this.#nodeItems = [];
      const node = this.kulData.nodes[i];
      this.#prepNode(node, 0);
      elements.push(<div class="node">{this.#nodeItems}</div>);
    }

    return elements;
  }
  #prepDeleteIcon(node: KulDataNode) {
    const { get } = kulManagerSingleton.assets;

    const path = get(`./assets/svg/clear.svg`);
    const style = {
      mask: `url('${path}') no-repeat center`,
      webkitMask: `url('${path}') no-repeat center`,
    };
    return (
      <div
        class="chip__icon chip__icon--trailing"
        data-cy={KulDataCyAttributes.BUTTON}
        key={node.id + "_delete"}
        onClick={(e) => {
          this.onKulEvent(e, "delete", { node });
        }}
        style={style}
      ></div>
    );
  }
  #prepIcons(node: KulDataNode) {
    const { get } = kulManagerSingleton.assets;

    const icons: VNode[] = [];

    const className = {
      chip__icon: true,
      "chip__icon--leading": true,
      "chip__icon--leading-hidden":
        this.kulStyling === "filter" && this.#isSelected(node),
    };

    if (node.icon) {
      const path = get(`./assets/svg/${node.icon}.svg`);
      const style = {
        mask: `url('${path}') no-repeat center`,
        webkitMask: `url('${path}') no-repeat center`,
      };
      icons.push(<div class={className} style={style}></div>);
    }

    if (this.#isFilter()) {
      icons.push(
        <span class="chip__checkmark">
          <svg class="chip__checkmark-svg" viewBox="-2 -3 30 30">
            <path
              class="chip__checkmark-path"
              fill="none"
              stroke="black"
              d="M1.73,12.91 8.1,19.28 22.79,4.59"
            />
          </svg>
        </span>,
      );
    }

    return icons;
  }
  #prepNode(node: KulDataNode, indent: number) {
    const className = {
      "chip-wrapper": true,
      "chip-wrapper--hidden-children":
        this.#hasChildren(node) && !this.#showChildren(node),
    };
    const indentStyle = {
      ["--kul_chip_indent_offset"]: indent.toString(),
    };

    this.#nodeItems.push(
      <div class={className}>
        <div class="indent" style={indentStyle}></div>
        {this.#hasChildren(node) ? (
          <div
            class={`node__expand ${this.#isExpanded(node) ? "node__expand--expanded" : ""}`}
            onClick={(e) => {
              this.onKulEvent(e, "click", {
                expansion: true,
                node,
              });
            }}
          ></div>
        ) : indent ? (
          <div class={`node__expand node__expand--placeholder`}></div>
        ) : null}
        {this.#prepChip(node, indent)}
      </div>,
    );

    if (this.#showChildren(node)) {
      for (let index = 0; index < node.children.length; index++) {
        if (node.children[index]) {
          this.#prepNode(node.children[index], indent + 1);
        }
      }
    }
  }
  #prepRipple(node: KulDataNode) {
    if (this.kulRipple && this.#isClickable()) {
      return (
        <div
          onPointerDown={(e) => this.onKulEvent(e, "pointerdown", { node })}
          ref={(el) => {
            if (el && this.kulRipple) {
              this.#rippleSurface[node.id] = el;
            }
          }}
        ></div>
      );
    }
  }
  #showChildren(node: KulDataNode) {
    return this.expandedNodes.has(node);
  }
  //#endregion

  //#region Lifecycle hooks
  componentWillLoad() {
    const { theme } = kulManagerSingleton;

    theme.register(this);
  }
  componentDidLoad() {
    const { debug, theme } = kulManagerSingleton;

    if (this.#rippleSurface?.length) {
      this.#rippleSurface.forEach((el) => {
        theme.ripple.setup(el);
      });
    }
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

    this.#nodeItems = [];
    const className = {
      "chip-set": true,
      "chip-set--choice": this.#isChoice(),
      "chip-set--filter": this.#isFilter(),
      "chip-set--input": this.#isInput(),
    };

    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{theme.setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID}>
          <div class={className} role="grid">
            {this.#prepChipSet()}
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
