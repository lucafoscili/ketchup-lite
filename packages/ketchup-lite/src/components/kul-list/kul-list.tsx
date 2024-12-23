import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
} from "@stencil/core";
import { kulManagerSingleton } from "src/global/global";
import {
  KulDataDataset,
  KulDataNode,
} from "src/managers/kul-data/kul-data-declarations";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import {
  CY_ATTRIBUTES,
  KUL_STYLE_ID,
  KUL_WRAPPER_ID,
  RIPPLE_SURFACE_CLASS,
} from "src/utils/constants";
import {
  KulListEvent,
  KulListEventPayload,
  KulListPropsInterface,
} from "./kul-list-declarations";

@Component({
  tag: "kul-list",
  styleUrl: "kul-list.scss",
  shadow: true,
})
export class KulList {
  /**
   * References the root HTML element of the component (<kul-list>).
   */
  @Element() rootElement: HTMLKulListElement;

  //#region States
  /**
   * Debug information.
   */
  @State() debugInfo = kulManagerSingleton.debug.info.create();
  /**
   * The focused list item.
   * @default undefined
   */
  @State() focused: number;
  /**
   * The selected list items.
   * @default undefined
   */
  @State() selected: number;
  //#endregion

  //#region Props
  /**
   * The data of the list.
   * @default []
   */
  @Prop({ mutable: true }) kulData: KulDataDataset = null;
  /**
   * Empty text displayed when there is no data.
   * @default "Empty data."
   */
  @Prop({ mutable: true }) kulEmpty = "Empty data.";
  /**
   * Defines whether items can be removed from the list or not.
   * @default false
   */
  @Prop({ mutable: true }) kulEnableDeletions = false;
  /**
   * When true, enables items' navigation through arrow keys.
   * @default true
   */
  @Prop({ mutable: true }) kulNavigation = true;
  /**
   * When set to true, the pointerdown event will trigger a ripple effect.
   * @default true
   */
  @Prop({ mutable: true }) kulRipple = true;
  /**
   * Defines whether items are selectable or not.
   * @default true
   */
  @Prop({ mutable: true }) kulSelectable = true;
  /**
   * Custom style of the component.
   * @default ""
   */
  @Prop({ mutable: true }) kulStyle = "";
  //#endregion

  //#region Internal variables
  #listItems: HTMLDivElement[] = [];
  #rippleSurface: HTMLElement[] = [];
  //#endregion

  //#region Events
  @Event({
    eventName: "kul-list-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulListEventPayload>;
  onKulEvent(
    e: Event | CustomEvent,
    eventType: KulListEvent,
    node?: KulDataNode,
    index = 0,
  ) {
    const { theme } = kulManagerSingleton;

    switch (eventType) {
      case "blur":
        this.focused = null;
        break;
      case "click":
        this.focused = index;
        this.#handleSelection(index);
        break;
      case "delete":
        if (index > -1) {
          this.kulData.nodes.splice(index, 1);
          this.refresh();
        }
        break;
      case "focus":
        this.focused = index;
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

  //#region Listeners
  @Listen("keydown")
  listenKeydown(e: KeyboardEvent) {
    const { focused, kulNavigation } = this;

    if (kulNavigation) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          e.stopPropagation();
          this.focusNext();
          break;
        case "ArrowUp":
          e.preventDefault();
          e.stopPropagation();
          this.focusPrevious();
          break;
        case "Enter":
          e.preventDefault();
          e.stopPropagation();
          this.#handleSelection(focused);
          break;
      }
    }
  }
  /**
   * Focuses the next element of the list.
   */
  @Method()
  async focusNext(): Promise<void> {
    const { focused, selected } = this;

    if (isNaN(focused) || focused === null || focused === undefined) {
      this.focused = selected;
    } else {
      this.focused++;
    }
    if (this.focused > this.#listItems.length - 1) {
      this.focused = 0;
    }
    this.#listItems[this.focused].focus();
  }
  /**
   * Focuses the previous element of the list.
   */
  @Method()
  async focusPrevious(): Promise<void> {
    const { focused, selected } = this;

    if (isNaN(focused) || focused === null || focused === undefined) {
      this.focused = selected;
    } else {
      this.focused--;
    }
    if (this.focused < 0) {
      this.focused = this.#listItems.length - 1;
    }
    this.#listItems[this.focused].focus();
  }
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
   * @returns {Promise<KulListPropsInterface>} Promise resolved with an object containing the component's properties.
   */
  @Method()
  async getProps(): Promise<KulListPropsInterface> {
    const { getProps } = kulManagerSingleton;

    return getProps(this);
  }
  /**
   * Returns the selected node.
   * @returns {Promise<KulListNode>} Selected node.
   */
  @Method()
  async getSelected(): Promise<KulDataNode> {
    return this.kulData.nodes[this.selected];
  }
  /**
   * This method is used to trigger a new render of the component.
   */
  @Method()
  async refresh(): Promise<void> {
    forceUpdate(this);
  }
  /**
   * Calls handleSelection private method to select the given item.
   * @param {number} index - Zero-based index of the item that must be selected, when not provided the list will attempt to select the focused element.
   */
  @Method()
  async selectNode(index?: number): Promise<void> {
    if (index === undefined) {
      index = this.focused;
    }
    this.#handleSelection(index);
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
  #handleSelection(index: number): void {
    if (
      this.kulSelectable &&
      index !== null &&
      index !== undefined &&
      !isNaN(index)
    ) {
      this.selected = index;
    }
  }
  #prepDeleteIcon(node: KulDataNode) {
    const { get } = kulManagerSingleton.assets;

    const { style } = get(`./assets/svg/clear.svg`);
    return (
      <div
        class="delete"
        data-cy={CY_ATTRIBUTES.button}
        onClick={(e) => {
          const index = this.kulData?.nodes?.indexOf(node);
          this.onKulEvent(e, "delete", node, index);
        }}
      >
        <div class="delete__icon" key={node.id + "_delete"} style={style}></div>
      </div>
    );
  }
  #prepIcon(node: KulDataNode) {
    const { get } = kulManagerSingleton.assets;

    const { style } = get(`./assets/svg/${node.icon}.svg`);
    return (
      <div
        class="node__icon"
        data-cy={CY_ATTRIBUTES.maskedSvg}
        style={style}
      ></div>
    );
  }
  #prepNode(node: KulDataNode, index: number) {
    const { bemClass } = kulManagerSingleton.theme;

    const { focused, kulData, kulRipple, selected } = this;

    const isFocused =
      focused === kulData.nodes.findIndex((n) => n.id === node.id);
    const isSelected =
      selected === kulData.nodes.findIndex((n) => n.id === node.id);

    return (
      <li class={bemClass("list-item")}>
        {this.kulEnableDeletions ? this.#prepDeleteIcon(node) : null}
        <div
          aria-selected={isSelected}
          aria-checked={isSelected}
          class={bemClass("node", null, {
            focused: isFocused,
            "has-description": !!node.description,
            selected: isSelected,
          })}
          data-cy={CY_ATTRIBUTES.node}
          data-index={index.toString()}
          onBlur={(e) => this.onKulEvent(e, "blur", node, index)}
          onClick={(e) => this.onKulEvent(e, "click", node, index)}
          onFocus={(e) => this.onKulEvent(e, "focus", node, index)}
          onPointerDown={(e) => this.onKulEvent(e, "pointerdown", node, index)}
          ref={(el) => {
            if (el) {
              this.#listItems.push(el);
            }
          }}
          role={"option"}
          tabindex={isSelected ? "0" : "-1"}
        >
          <div
            class={RIPPLE_SURFACE_CLASS}
            data-cy={CY_ATTRIBUTES.ripple}
            ref={(el) => {
              if (kulRipple && el) {
                this.#rippleSurface.push(el);
              }
            }}
          ></div>
          {node.icon && this.#prepIcon(node)}
          <span class={bemClass("node", "text")}>
            {this.#prepTitle(node)}
            {this.#prepSubtitle(node)}
          </span>
        </div>
      </li>
    );
  }
  #prepSubtitle(node: KulDataNode) {
    const { bemClass } = kulManagerSingleton.theme;

    return (
      node.description && (
        <div class={bemClass("node", "subtitle")}>{node.description}</div>
      )
    );
  }
  #prepTitle(node: KulDataNode) {
    const { bemClass } = kulManagerSingleton.theme;

    return (
      String(node.value).valueOf() && (
        <div class={bemClass("node", "title")}>
          {String(node.value).valueOf()}
        </div>
      )
    );
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
    const { bemClass, setKulStyle } = kulManagerSingleton.theme;

    const { kulData, kulEmpty, kulSelectable, kulStyle } = this;

    const isEmpty = !!!kulData?.nodes?.length;
    this.#listItems = [];

    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID}>
          {isEmpty ? (
            <div class={bemClass("empty-data")}>
              <div class={bemClass("empty-data", "text")}>{kulEmpty}</div>
            </div>
          ) : (
            <ul
              aria-multiselectable={"false"}
              class={bemClass("list", null, {
                empty: isEmpty,
                selectable: kulSelectable,
              })}
              role={"listbox"}
            >
              {kulData.nodes.map((item, index) => this.#prepNode(item, index))}
            </ul>
          )}
        </div>
      </Host>
    );
  }

  disconnectedCallback() {
    const { theme } = kulManagerSingleton;

    theme.unregister(this);
  }
}
