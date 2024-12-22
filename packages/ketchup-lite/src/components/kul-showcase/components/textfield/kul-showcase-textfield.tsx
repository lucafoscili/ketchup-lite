import { Component, Element, Fragment, State, VNode, h } from "@stencil/core";
import { KulDataCyAttributes } from "../../../../types/GenericTypes";
import { KulTextfieldStyling } from "../../../kul-textfield/kul-textfield-declarations";
import { SHOWCASE_DYN_EXAMPLES } from "../../helpers/kul-showcase-dyn-sample";
import { KulShowcaseDynamicExampleType } from "../../kul-showcase-declarations";
import {
  TextfieldData,
  TextfieldExample,
} from "./kul-showcase-textfield-declarations";
import { TEXTFIELD_FIXTURES } from "./kul-showcase-textfield-fixtures";

@Component({
  tag: "kul-showcase-textfield",
  styleUrl: "kul-showcase-textfield.scss",
  shadow: true,
})
export class KulShowcaseTextfield {
  /**
   * References the root HTML element of the component (<kul-showcase-textfield>).
   */
  @Element() rootElement: HTMLKulShowcaseTextfieldElement;

  //#region States
  /**
   * Data of the fixtures.
   */
  @State() fixtures = TEXTFIELD_FIXTURES();
  //#endregion

  //#region Internal variables
  #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
  #dynamicExamples: HTMLKulTextfieldElement[] = [];
  #interval: NodeJS.Timeout;
  //#endregion

  //#region Private methods
  #prepExamples() {
    const elements: VNode[] = [];
    for (const k1 in this.fixtures.examples) {
      if (Object.prototype.hasOwnProperty.call(this.fixtures.examples, k1)) {
        const k = k1 as keyof TextfieldData;
        const category: { [key: string]: Partial<TextfieldExample> } =
          this.fixtures.examples[k];
        const group: VNode[] = [];

        for (const k2 in category) {
          if (Object.prototype.hasOwnProperty.call(category, k2)) {
            const props: TextfieldExample = category[k2];
            group.push(
              <div class="example" part="example">
                <div class="description" part="description">
                  {props["data-description"]}
                </div>
                <div class="comp-wrapper" part="comp-wrapper">
                  <kul-textfield
                    key={k1 + "-" + k2}
                    id={k1 + "-" + k2}
                    ref={(el) => {
                      if (el && props["data-dynamic"]) {
                        this.#dynamicExamples.push(el);
                      }
                    }}
                    {...props}
                    kulStyling={k1 as KulTextfieldStyling}
                  ></kul-textfield>
                </div>
              </div>,
            );
          }
        }

        elements.push(
          <div class="grid-container" part="grid-container">
            <div class="grid-title" part="grid-title">
              {k1}
            </div>
            <div class="grid" part="grid">
              {group}
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
            case "state-colors":
              comp.className =
                "hydrated " +
                this.#dynamicExampleManager.stateColors.get(comp.id);
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
