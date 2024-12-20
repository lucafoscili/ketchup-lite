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
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { KulLanguageGeneric } from "src/managers/kul-language/kul-language-declarations";
import { GenericObject, KulDataCyAttributes } from "src/types/GenericTypes";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "src/utils/constants";
import {
  KulArticleDataset,
  KulArticleEvent,
  KulArticleEventPayload,
  KulArticleNode,
} from "./kul-article-declarations";

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
  @State() debugInfo = kulManagerSingleton.debug.info.create();
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
  @Prop({ mutable: true }) kulStyle = "";
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
    const { bemClass } = kulManagerSingleton.theme;

    const { children, cssStyle, value } = node;

    return (
      <Fragment>
        <article
          class={bemClass("article")}
          data-cy={KulDataCyAttributes.NODE}
          data-depth={depth.toString()}
          style={cssStyle}
        >
          {value && <h1>{value}</h1>}
          {children && node.children.map((c) => this.#recursive(c, depth + 1))}
        </article>
      </Fragment>
    );
  }
  #sectionTemplate(node: KulArticleNode, depth: number): VNode {
    const { bemClass } = kulManagerSingleton.theme;

    const { children, cssStyle, value } = node;

    return (
      <Fragment>
        <section
          class={bemClass("section")}
          data-cy={KulDataCyAttributes.NODE}
          data-depth={depth.toString()}
          style={cssStyle}
        >
          {value && <h2>{value}</h2>}
          {children && children.map((c) => this.#recursive(c, depth + 1))}
        </section>
      </Fragment>
    );
  }
  #wrapperTemplate(node: KulArticleNode, depth: number): VNode {
    const { bemClass } = kulManagerSingleton.theme;

    const { children, cssStyle, tagName, value } = node;

    const isList = !!children?.some((c) => c.tagName === "li");

    const ComponentTag = isList ? "ul" : tagName ? tagName : "div";
    return (
      <Fragment>
        {value && <div>{value}</div>}
        <ComponentTag
          class={bemClass("content")}
          data-cy={KulDataCyAttributes.NODE}
          data-depth={depth.toString()}
          style={cssStyle}
        >
          {children && children.map((c) => this.#recursive(c, depth + 1))}
        </ComponentTag>
      </Fragment>
    );
  }
  #paragraphTemplate(node: KulArticleNode, depth: number): VNode {
    const { bemClass } = kulManagerSingleton.theme;

    const { children, cssStyle, value } = node;

    return (
      <Fragment>
        <p
          class={bemClass("paragraph")}
          data-cy={KulDataCyAttributes.NODE}
          data-depth={depth.toString()}
          style={cssStyle}
        >
          {value && <h3>{value}</h3>}
          {children && children.map((c) => this.#recursive(c, depth + 1))}
        </p>
      </Fragment>
    );
  }
  #contentTemplate(node: KulArticleNode, depth: number): VNode {
    const { data, theme } = kulManagerSingleton;
    const { decorate } = data.cell.shapes;

    const { cells, cssStyle, tagName, value } = node;
    const key = cells && Object.keys(cells)[0];
    const cell = cells?.[key];

    if (cell) {
      const shape = decorate(cell.shape, [cell], async (e) =>
        this.onKulEvent(e, "kul-event"),
      );
      return shape.element[0];
    } else {
      const ComponentTag = tagName ? tagName : "span";
      return (
        <ComponentTag
          class={theme.bemClass("content", "body", {
            [`content--${ComponentTag}`]: true,
          })}
          data-depth={depth.toString()}
          style={cssStyle}
        >
          {value}
        </ComponentTag>
      );
    }
  }
  #prepArticle(): VNode[] {
    const elements: VNode[] = [];
    const { nodes } = this.kulData;

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
    const { info } = kulManagerSingleton.debug;

    this.onKulEvent(new CustomEvent("ready"), "ready");
    info.update(this, "did-load");
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
    const { language, theme } = kulManagerSingleton;
    const { bemClass, setKulStyle } = theme;

    const { kulData, kulStyle } = this;

    return (
      <Host>
        {kulStyle && <style id={KUL_STYLE_ID}>{setKulStyle(this)}</style>}
        <div id={KUL_WRAPPER_ID}>
          {kulData?.nodes?.length ? (
            this.#prepArticle()
          ) : (
            <div class={bemClass("empty-data")}>
              <div class={bemClass("empty-data", "text")}>
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
