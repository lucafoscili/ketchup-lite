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
  KulArticleDataset,
  KulArticleEvent,
  KulArticleEventPayload,
  KulArticleNode,
} from "src/components/kul-article/kul-article-declarations";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { KulLanguageGeneric } from "src/managers/kul-language/kul-language-declarations";
import { GenericObject } from "src/types/GenericTypes";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "src/variables/GenericVariables";

@Component({
  assetsDirs: ["assets/fonts"],
  tag: "kul-article",
  styleUrl: "kul-article.scss",
  shadow: true,
})
export class KulArticle {
  /**
   * References the root HTML element of the component (<kul-article>).
   */
  @Element() rootElement: HTMLKulArticleElement;

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
  //#endregion

  //#region Props
  /**
   * The actual data of the article.
   * @default null
   */
  @Prop({ mutable: true }) kulData: KulArticleDataset = null;
  /**
   * Enables customization of the component's style.
   * @default "" - No custom style applied by default.
   */
  @Prop({ mutable: true, reflect: true }) kulStyle = "";
  //#endregion

  //#region Events
  @Event({
    eventName: "kul-article-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulArticleEventPayload>;
  onKulEvent(e: Event | CustomEvent, eventType: KulArticleEvent) {
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
  #recursive(node: KulArticleNode, depth: number) {
    switch (depth) {
      case 0:
        return this.#articleTemplate(node, depth);
      case 1:
        return this.#sectionTemplate(node, depth);
      case 2:
        return this.#paragraphTemplate(node, depth);
      default:
        return node.children?.length
          ? this.#wrapperTemplate(node, depth)
          : this.#contentTemplate(node, depth);
    }
  }
  #articleTemplate(node: KulArticleNode, depth: number): VNode {
    return (
      <Fragment>
        <article
          class="article"
          data-depth={depth.toString()}
          style={node.cssStyle}
        >
          {node.value ? <h1>{node.value}</h1> : undefined}
          {node.children
            ? node.children.map((child) => this.#recursive(child, depth + 1))
            : null}
        </article>
      </Fragment>
    );
  }
  #sectionTemplate(node: KulArticleNode, depth: number): VNode {
    return (
      <Fragment>
        <section
          class="section"
          data-depth={depth.toString()}
          style={node.cssStyle}
        >
          {node.value ? <h2>{node.value}</h2> : undefined}
          {node.children
            ? node.children.map((child) => this.#recursive(child, depth + 1))
            : null}
        </section>
      </Fragment>
    );
  }
  #wrapperTemplate(node: KulArticleNode, depth: number): VNode {
    const ComponentTag = node.children?.some((child) => child.tagName === "li")
      ? "ul"
      : node.tagName
        ? node.tagName
        : "div";
    return (
      <Fragment>
        {node.value ? <div>{node.value}</div> : ""}
        <ComponentTag
          class="content-wrapper"
          data-depth={depth.toString()}
          style={node.cssStyle}
        >
          {node.children
            ? node.children.map((child) => this.#recursive(child, depth + 1))
            : null}
        </ComponentTag>
      </Fragment>
    );
  }
  #paragraphTemplate(node: KulArticleNode, depth: number): VNode {
    return (
      <Fragment>
        <p
          class="paragraph"
          data-depth={depth.toString()}
          style={node.cssStyle}
        >
          {node.value ? <h3>{node.value}</h3> : undefined}
          {node.children
            ? node.children.map((child) => this.#recursive(child, depth + 1))
            : null}
        </p>
      </Fragment>
    );
  }
  #contentTemplate(node: KulArticleNode, depth: number): VNode {
    const { data } = kulManagerSingleton;
    const { decorate } = data.cell.shapes;

    const key = node?.cells && Object.keys(node.cells)[0];
    const cell = node?.cells?.[key];

    if (cell) {
      const shape = decorate(cell.shape, [cell], async (e) =>
        this.onKulEvent(e, "kul-event"),
      );
      return shape.element[0];
    } else {
      const ComponentTag = node.tagName ? node.tagName : "span";
      return (
        <ComponentTag
          class={`content content--${ComponentTag}`}
          data-depth={depth.toString()}
          style={node.cssStyle}
        >
          {node.value}
        </ComponentTag>
      );
    }
  }
  #prepArticle(): VNode[] {
    const elements: VNode[] = [];
    const nodes = this.kulData.nodes;
    for (let index = 0; index < nodes.length; index++) {
      const node = nodes[index];
      elements.push(this.#recursive(node, 0));
    }
    return <Fragment>{elements}</Fragment>;
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
    const { debug } = kulManagerSingleton;

    debug.updateDebugInfo(this, "did-render");
  }
  render() {
    const { language, theme } = kulManagerSingleton;
    const { kulData, kulStyle } = this;

    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{theme.setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID}>
          {kulData?.nodes?.length ? (
            this.#prepArticle()
          ) : (
            <div class="empty-data">
              <div class="empty-data__text">
                {language.translate(KulLanguageGeneric.EMPTY_DATA)}
              </div>
            </div>
          )}
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
