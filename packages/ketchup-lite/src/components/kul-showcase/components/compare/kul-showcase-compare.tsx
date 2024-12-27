import { Component, Element, Fragment, State, VNode, h } from "@stencil/core";
import { kulManagerSingleton } from "src/global/global";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { SHOWCASE_DYN_EXAMPLES } from "../../helpers/kul-showcase-dyn-sample";
import { KulShowcaseDynamicExampleType } from "../../kul-showcase-declarations";
import {
  CompareData,
  CompareExample,
} from "./kul-showcase-compare-declarations";
import { COMPARE_FIXTURES } from "./kul-showcase-compare-fixtures";

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
   * Data of the fixtures.
   */
  @State() fixtures = COMPARE_FIXTURES(kulManagerSingleton.assets.get);
  //#endregion

  //#region Internal variables
  #dynamicExamples: HTMLKulCompareElement[] = [];
  #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
  #interval: NodeJS.Timeout;
  //#endregion

  //#region Private methods
  #prepExamples() {
    const elements: VNode[] = [];
    for (const key in this.fixtures.examples) {
      if (Object.prototype.hasOwnProperty.call(this.fixtures.examples, key)) {
        const k = key as keyof CompareData;
        const props: CompareExample = this.fixtures.examples[k];
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
        <kul-article kulData={this.fixtures.documentation}></kul-article>
        <div class="examples-title" part="examples-title">
          Examples
        </div>
        <div
          class="grid"
          data-cy={CY_ATTRIBUTES.showcaseGridWrapper}
          part="grid"
        >
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
