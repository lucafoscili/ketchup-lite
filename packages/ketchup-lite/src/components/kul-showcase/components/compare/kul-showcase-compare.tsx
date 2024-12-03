import { Component, Element, Fragment, State, VNode, h } from "@stencil/core";

import { COMPARE_DOC, COMPARE_EXAMPLES } from "./kul-showcase-compare-data";
import { CompareExample } from "./kul-showcase-compare-declarations";
import { SHOWCASE_DYN_EXAMPLES } from "../../helpers/kul-showcase-dyn-sample";
import { KulShowcaseDynamicExampleType } from "../../kul-showcase-declarations";

@Component({
  tag: "kul-showcase-compare",
  styleUrl: "kul-showcase-compare.scss",
  shadow: true,
})
export class KulShowcaseCompare {
  /**
   * References the root HTML element of the component (<kul-showcase-compare>).
   */
  @Element() rootElement: HTMLKulShowcaseCompareElement;

  //#region States
  /**
   * Data of the examples.
   */
  @State() examples = COMPARE_EXAMPLES();
  //#endregion

  //#region Internal variables
  #dynamicExamples: HTMLKulCompareElement[] = [];
  #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
  #interval: NodeJS.Timeout;
  //#endregion

  //#region Private methods
  #prepExamples() {
    const elements: VNode[] = [];
    for (const key in this.examples) {
      if (Object.prototype.hasOwnProperty.call(this.examples, key)) {
        const props: CompareExample = this.examples[key];
        elements.push(
          <div class="example" part="example">
            <div class="description" part="description">
              {props["data-description"]}
            </div>
            <div class="comp-wrapper" part="comp-wrapper">
              <kul-compare
                key={key}
                id={key}
                ref={(el) => {
                  if (el && props["data-dynamic"]) {
                    this.#dynamicExamples.push(el);
                  }
                }}
                {...props}
              ></kul-compare>
            </div>
          </div>,
        );
      }
    }
    return elements;
  }
  //#endregion

  //#region Lifecycle hooks
  componentDidLoad() {
    if (this.#dynamicExamples.length > 0) {
      this.#interval = setInterval(() => {
        this.#dynamicExamples.forEach((comp) => {
          switch (comp.dataset.dynamic as KulShowcaseDynamicExampleType) {
            case "custom":
              comp.kulStyle = this.#dynamicExampleManager.custom.get(comp.id);
              break;
          }
        });
      }, 500);
    }
  }

  render() {
    return (
      <Fragment>
        <kul-article kulData={COMPARE_DOC}></kul-article>
        <div class="examples-title" part="examples-title">
          Examples
        </div>
        <div class="grid" data-cy="wrapper" part="grid">
          {this.#prepExamples()}
        </div>
      </Fragment>
    );
  }

  disconnectedCallback() {
    clearInterval(this.#interval);
  }
  //#endregion
}
