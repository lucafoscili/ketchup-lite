import { Component, Element, Fragment, State, VNode, h } from "@stencil/core";
import { kulManager } from "src/global/global";
import { SHOWCASE_DYN_EXAMPLES } from "../../helpers/kul-showcase-dyn-sample";
import { KulShowcaseDynamicExampleType } from "../../kul-showcase-declarations";
import {
  ImageviewerData,
  ImageviewerExample,
} from "./kul-showcase-imageviewer-declarations";
import { IMAGEVIEWER_FIXTURES } from "./kul-showcase-imageviewer-fixtures";
import { CY_ATTRIBUTES } from "src/utils/constants";

@Component({
  tag: "kul-showcase-imageviewer",
  styleUrl: "kul-showcase-imageviewer.scss",
  shadow: true,
})
export class KulShowcaseImageviewer {
  /**
   * References the root HTML element of the component (<kul-showcase-imageviewer>).
   */
  @Element() rootElement: HTMLKulShowcaseImageviewerElement;

  //#region States
  /**
   * Data of the fixtures.
   */
  @State() fixtures = IMAGEVIEWER_FIXTURES(kulManager.assets.get);
  //#endregion

  //#region Internal variables
  #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
  #dynamicExamples: HTMLKulImageviewerElement[] = [];
  #interval: NodeJS.Timeout;
  //#endregion

  //#region Private methods
  #prepExamples() {
    const elements: VNode[] = [];
    for (const key in this.fixtures.examples) {
      if (Object.prototype.hasOwnProperty.call(this.fixtures.examples, key)) {
        const k = key as keyof ImageviewerData;
        const props: ImageviewerExample = this.fixtures.examples[k];
        elements.push(
          <div class="example" part="example">
            <div class="description" part="description">
              {props["data-description"]}
            </div>
            <div class="comp-wrapper" part="comp-wrapper">
              <kul-imageviewer
                key={key}
                id={key}
                ref={(el) => {
                  if (el && props["data-dynamic"]) {
                    this.#dynamicExamples.push(el);
                  }
                }}
                {...props}
              ></kul-imageviewer>
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
