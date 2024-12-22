import { Component, Element, Fragment, State, VNode, h } from "@stencil/core";

import { kulManagerSingleton } from "src/global/global";
import { KulDataCyAttributes } from "../../../../types/GenericTypes";
import { SHOWCASE_DYN_EXAMPLES } from "../../helpers/kul-showcase-dyn-sample";
import { KulShowcaseDynamicExampleType } from "../../kul-showcase-declarations";
import { CanvasData, CanvasExample } from "./kul-showcase-canvas-declarations";
import { CANVAS_FIXTURES } from "./kul-showcase-canvas-fixtures";

@Component({
  tag: "kul-showcase-canvas",
  styleUrl: "kul-showcase-canvas.scss",
  shadow: true,
})
export class KulShowcaseCanvas {
  /**
   * References the root HTML element of the component (<kul-showcase-canvas>).
   */
  @Element() rootElement: HTMLKulShowcaseCanvasElement;

  //#region States
  /**
   * Data of the fixtures.
   */
  @State() fixtures = CANVAS_FIXTURES(kulManagerSingleton.assets.get);
  //#endregion

  //#region Internal variables
  #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
  #dynamicExamples: HTMLKulCanvasElement[] = [];
  #interval: NodeJS.Timeout;
  //#endregion

  //#region Private methods
  #prepExamples() {
    const elements: VNode[] = [];
    for (const key in this.fixtures.examples) {
      if (Object.prototype.hasOwnProperty.call(this.fixtures.examples, key)) {
        const k = key as keyof CanvasData;
        const props: CanvasExample = this.fixtures.examples[k];
        elements.push(
          <div class="example" part="example">
            <div class="description" part="description">
              {props["data-description"]}
            </div>
            <div class="comp-wrapper" part="comp-wrapper">
              <kul-canvas
                key={key}
                id={key}
                ref={(el) => {
                  if (el && props["data-dynamic"]) {
                    this.#dynamicExamples.push(el);
                  }
                }}
                {...props}
              ></kul-canvas>
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
          data-cy={KulDataCyAttributes.SHOWCASE_GRID_WRAPPER}
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
