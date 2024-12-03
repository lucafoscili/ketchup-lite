import { Component, Element, Fragment, State, VNode, h } from "@stencil/core";

import { SPINNER_DOC, SPINNER_EXAMPLES } from "./kul-showcase-spinner-data";
import {
  SpinnerBranch,
  SpinnerLeaf,
} from "./kul-showcase-spinner-declarations";
import { KulDataCyAttributes } from "../../../../types/GenericTypes";
import { SHOWCASE_DYN_EXAMPLES } from "../../helpers/kul-showcase-dyn-sample";
import { KulShowcaseDynamicExampleType } from "../../kul-showcase-declarations";

@Component({
  tag: "kul-showcase-spinner",
  styleUrl: "kul-showcase-spinner.scss",
  shadow: true,
})
export class KulShowcaseSpinner {
  /**
   * References the root HTML element of the component (<kul-showcase-spinner>).
   */
  @Element() rootElement: HTMLKulShowcaseSpinnerElement;

  //#region States
  /**
   * Data of the examples.
   */
  @State() examples = SPINNER_EXAMPLES;
  //#endregion

  //#region Internal variables
  #interval: NodeJS.Timeout;
  #dynamicExamples: HTMLKulSpinnerElement[] = [];
  #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
  //#endregion

  //#region Private methods
  #prepExamples() {
    const elements: VNode[] = [];
    for (const k1 in this.examples) {
      if (Object.prototype.hasOwnProperty.call(this.examples, k1)) {
        const type: SpinnerBranch = this.examples[k1];

        for (const k2 in type) {
          if (Object.prototype.hasOwnProperty.call(type, k2)) {
            const layout: SpinnerLeaf = type[k2];
            const layoutWrapper: VNode[] = [];

            for (const k3 in layout) {
              if (Object.prototype.hasOwnProperty.call(layout, k3)) {
                const props = layout[k3];
                layoutWrapper.push(
                  <div class="example" part="example">
                    <div class="description" part="description">
                      {props["data-description"]}
                    </div>
                    <div class="comp-wrapper" part="comp-wrapper">
                      <kul-spinner
                        key={k2}
                        id={k1 + "-" + k3}
                        {...props}
                        ref={(el) => {
                          if (el && props["data-dynamic"]) {
                            this.#dynamicExamples.push(el);
                          }
                        }}
                      ></kul-spinner>
                    </div>
                  </div>,
                );
              }
            }
            elements.push(
              <div class="grid-container" part="grid-container">
                <div class="grid-title" part="grid-title">
                  {k1} (Layout {k2})
                </div>
                <div class="grid" part="grid">
                  {layoutWrapper}
                </div>
              </div>,
            );
          }
        }
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
        <kul-article kulData={SPINNER_DOC}></kul-article>
        <div class="examples-title" part="examples-title">
          Examples
        </div>
        <div data-cy={KulDataCyAttributes.SHOWCASE_GRID_WRAPPER}>
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
