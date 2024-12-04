import { Component, Element, Fragment, State, VNode, h } from "@stencil/core";

import { SHOWCASE_DYN_EXAMPLES } from "../../helpers/kul-showcase-dyn-sample";
import { KulShowcaseDynamicExampleType } from "../../kul-showcase-declarations";
import { AccordionExample } from "./kul-showcase-accordion-declarations";
import { ACCORDION_FIXTURES } from "./kul-showcase-accordion-fixtures";

@Component({
  tag: "kul-showcase-accordion",
  styleUrl: "kul-showcase-accordion.scss",
  shadow: true,
})
export class KulShowcaseAccordion {
  /**
   * References the root HTML element of the component (<kul-showcase-accordion>).
   */
  @Element() rootElement: HTMLKulShowcaseAccordionElement;

  //#region States
  /**
   * Data of the fixtures.
   */
  @State() fixtures = ACCORDION_FIXTURES();
  //#endregion

  //#region Internal variables
  #dynamicExamples: HTMLKulAccordionElement[] = [];
  #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
  #interval: NodeJS.Timeout;
  //#endregion

  //#region Private methods
  #prepExamples() {
    const elements: VNode[] = [];
    for (const key in this.fixtures.examples) {
      if (Object.prototype.hasOwnProperty.call(this.fixtures.examples, key)) {
        const props: AccordionExample = this.fixtures.examples[key];
        elements.push(
          <div class="example" part="example">
            <div class="description" part="description">
              {props["data-description"]}
            </div>
            <div class="comp-wrapper" part="comp-wrapper">
              <kul-accordion
                key={key}
                id={key}
                ref={(el) => {
                  if (el && props["data-dynamic"]) {
                    this.#dynamicExamples.push(el);
                  }
                }}
                {...props}
              >
                <slot slot={"0"}>
                  <div class="slot-content">First slot</div>
                </slot>
                <slot slot={"1"}>
                  <div class="slot-content">Second slot</div>
                </slot>
                <slot slot={"2"}>
                  <div class="slot-content">Third slot</div>
                </slot>
              </kul-accordion>
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
