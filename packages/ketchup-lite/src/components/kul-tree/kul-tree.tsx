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
  KulDataDataset,
  KulDataNode,
} from "src/managers/kul-data/kul-data-declarations";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import {
  KulLanguageGeneric,
  KulLanguageSearch,
} from "src/managers/kul-language/kul-language-declarations";
import { GenericObject } from "src/types/GenericTypes";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "src/utils/constants";
import { KulTextfieldEventPayload } from "../kul-textfield/kul-textfield-declarations";
import { TreeNode } from "./components/node";
import {
  KulTreeEvent,
  KulTreeEventArguments,
  KulTreeEventPayload,
  KulTreeNodeProps,
} from "./kul-tree-declarations";

@Component({
  tag: "kul-tree",
  styleUrl: "kul-tree.scss",
  shadow: true,
})
export class KulTree {
  /**
   * References the root HTML element of the component (<kul-tree>).
   */
  @Element() rootElement: HTMLKulTreeElement;

  //#region States
  /**
   * Debug information.
   */
  @State() debugInfo = kulManagerSingleton.debug.info.create();
  /**
   * Set of expanded nodes.
   */
  @State() expandedNodes: Set<KulDataNode> = new Set();
  /**
   * When filters are active, this set contains the nodes that don't match the filter.
   */
  @State() hiddenNodes: Set<KulDataNode> = new Set();
  /**
   * Selected node.
   */
  @State() selectedNode: KulDataNode = null;
  //#endregion

  //#region Props
  /**
   * When enabled, the first level of depth will create an accordion-style appearance for nodes.
   * @default false
   */
  @Prop({ mutable: true, reflect: true }) kulAccordionLayout = true;
  /**
   * The actual data of the tree.
   * @default null
   */
  @Prop({ mutable: true }) kulData: KulDataDataset = null;
  /**
   * When true, displays a text field which enables filtering the dataset of the tree.
   * @default null
   */
  @Prop({ mutable: true }) kulFilter = true;
  /**
   * Sets the initial expanded nodes based on the specified depth.
   * If the property is not provided, all nodes in the tree will be expanded.
   * @default null
   */
  @Prop({ mutable: true }) kulInitialExpansionDepth: number;
  /**
   * When set to true, the pointerdown event will trigger a ripple effect.
   * @default true
   */
  @Prop({ mutable: true }) kulRipple = true;
  /**
   * When true, nodes can be selected.
   * @default null
   */
  @Prop({ mutable: true, reflect: true }) kulSelectable = true;
  /**
   * Enables customization of the component's style.
   * @default ""
   */
  @Prop({ mutable: true }) kulStyle = "";
  //#endregion

  //#region Internal variables
  #filterTimeout: ReturnType<typeof setTimeout>;
  #filterValue = "";
  #rippleSurface: { [id: string]: HTMLElement } = {};
  //#endregion

  //#region Events
  @Event({
    eventName: "kul-tree-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulTreeEventPayload>;
  onKulEvent(
    e: Event | CustomEvent,
    eventType: KulTreeEvent,
    args?: KulTreeEventArguments,
  ) {
    const { theme } = kulManagerSingleton;

    const { expansion, node } = args || {};

    switch (eventType) {
      case "click":
        if (expansion && node.children?.length) {
          if (this.expandedNodes.has(node)) {
            this.expandedNodes.delete(node);
          } else {
            this.expandedNodes.add(node);
          }
          this.expandedNodes = new Set(this.expandedNodes);
        } else if (node) {
          this.selectedNode = node;
        }
        break;
      case "pointerdown":
        if (this.kulRipple) {
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
  #filter(e: CustomEvent<KulTextfieldEventPayload>) {
    const { filter } = kulManagerSingleton.data.node;

    clearTimeout(this.#filterTimeout);
    this.#filterTimeout = setTimeout(() => {
      this.#filterValue = e.detail.inputValue?.toLowerCase();

      if (!this.#filterValue) {
        this.hiddenNodes = new Set();
      } else {
        const { ancestorNodes, remainingNodes } = filter(
          this.kulData,
          { value: this.#filterValue },
          true,
        );

        this.hiddenNodes = new Set(remainingNodes);

        if (ancestorNodes) {
          ancestorNodes.forEach((ancestor) => {
            this.hiddenNodes.delete(ancestor);
          });
        }
      }
    }, 300);
  }
  #prepTree(): VNode[] {
    const elements: VNode[] = [];

    const nodes = this.kulData.nodes;
    for (let index = 0; index < nodes.length; index++) {
      const node = nodes[index];
      this.#recursive(elements, node, 0);
    }

    return elements.length ? (
      elements
    ) : this.#filterValue ? (
      <div class="no-matches">
        <div class="no-matches__icon"></div>
        <div class="no-matches__text">
          No matches found for "
          <strong class="no-matches__filter">{this.#filterValue}</strong>
          ".
        </div>
      </div>
    ) : undefined;
  }
  #recursive(elements: VNode[], node: KulDataNode, depth: number) {
    const { stringify } = kulManagerSingleton.data.cell;

    if (!this.debugInfo.endTime) {
      if (
        this.kulInitialExpansionDepth === null ||
        this.kulInitialExpansionDepth === undefined ||
        this.kulInitialExpansionDepth > depth
      ) {
        this.expandedNodes.add(node);
      }
    }
    const isExpanded = this.#filterValue ? true : this.expandedNodes.has(node);
    const isHidden = this.hiddenNodes.has(node);
    const isSelected = this.selectedNode === node;
    const nodeProps: KulTreeNodeProps = {
      accordionLayout: this.kulAccordionLayout && depth === 0,
      depth,
      elements: {
        ripple: (
          <div
            ref={(el) => {
              if (el && this.kulRipple) {
                this.#rippleSurface[node.id] = el;
              }
            }}
          ></div>
        ),
        value: <div class="node__value">{stringify(node.value)}</div>,
      },
      events: {
        onClick: (e) => {
          this.onKulEvent(e, "click", { node });
        },
        onClickExpand: (e) => {
          this.onKulEvent(e, "click", { expansion: true, node });
        },
        onPointerDown: (e) => {
          this.onKulEvent(e, "pointerdown", { node });
        },
      },
      expanded: isExpanded,
      node,
      selected: isSelected,
    };

    if (!isHidden) {
      elements.push(<TreeNode {...nodeProps}></TreeNode>);
      if (isExpanded) {
        node.children?.map((child) =>
          this.#recursive(elements, child, depth + 1),
        );
      }
    }
  }
  #setExpansion(node: KulDataNode) {
    if (this.expandedNodes.has(node)) {
      this.expandedNodes.delete(node);
    } else {
      this.expandedNodes.add(node);
    }

    if (node.children?.length) {
      node.children.forEach((child) => {
        this.#setExpansion(child);
      });
    }
  }
  //#endregion

  //#region Lifecycle hooks
  componentWillLoad() {
    const { theme } = kulManagerSingleton;

    theme.register(this);
  }
  componentDidLoad() {
    const { info } = kulManagerSingleton.debug;

    this.onKulEvent(new CustomEvent("ready"), "ready");
    info.update(this, "did-load");
  }
  componentWillRender() {
    const { info } = kulManagerSingleton.debug;

    info.update(this, "will-render");
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

    debug.info.update(this, "did-render");
  }
  render() {
    const { language, theme } = kulManagerSingleton;

    const { kulData, kulFilter, kulStyle } = this;

    const isEmpty = !!!kulData?.nodes?.length;
    this.#rippleSurface = {};

    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{theme.setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID}>
          <div class="tree">
            {kulFilter && (
              <kul-textfield
                kulFullWidth={true}
                kulIcon="magnify"
                kulLabel={language.translate(KulLanguageSearch.SEARCH)}
                kulStyling="flat"
                onKul-textfield-event={(e) => {
                  this.onKulEvent(e, "kul-event");
                  if (e.detail.eventType === "input") {
                    this.#filter(e);
                  }
                }}
              ></kul-textfield>
            )}
            {isEmpty ? (
              <div class="empty-data">
                <div class="empty-data__text">
                  {language.translate(KulLanguageGeneric.EMPTY_DATA)}
                </div>
              </div>
            ) : (
              this.#prepTree()
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
