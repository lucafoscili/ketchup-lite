import { Component, Element, Fragment, State, VNode, h } from "@stencil/core";

import { KulDataCyAttributes } from "../../../../types/GenericTypes";
import { SHOWCASE_DYN_EXAMPLES } from "../../helpers/kul-showcase-dyn-sample";
import { KulShowcaseDynamicExampleType } from "../../kul-showcase-declarations";
import { BadgeData, BadgeExample } from "./kul-showcase-badge-declarations";
import { BADGE_FIXTURES } from "./kul-showcase-badge-fixtures";

@Component({
  tag: "kul-showcase-badge",
  styleUrl: "kul-showcase-badge.scss",
  shadow: true,
})
export class KulShowcaseBadge {
  /**
   * References the root HTML element of the component (<kul-showcase-badge>).
   */
  @Element() rootElement: HTMLKulShowcaseBadgeElement;

  //#region States
  /**
   * Data of the fixtures.
   */
  @State() fixtures = BADGE_FIXTURES();
  //#endregion

  //#region Internal variables
  #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
  #dynamicExamples: HTMLKulBadgeElement[] = [];
  #interval: NodeJS.Timeout;
  //#endregion

  //#region Private methods
  #prepExamples() {
    const elements: VNode[] = [];
    for (const key in this.fixtures.examples) {
      if (Object.prototype.hasOwnProperty.call(this.fixtures.examples, key)) {
        const k = key as keyof BadgeData;
        const props: BadgeExample = this.fixtures.examples[k];
        elements.push(
          <div class="example" part="example">
            <div class="description" part="description">
              {props["data-description"]}
            </div>
            <div class="comp-wrapper" part="comp-wrapper">
              <div class="badge-wrapper">
                <div class="badge-anchor">Simple div</div>
                <kul-badge
                  key={key}
                  id={key}
                  ref={(el) => {
                    if (el && props["data-dynamic"]) {
                      this.#dynamicExamples.push(el);
                    }
                  }}
                  {...props}
                ></kul-badge>
              </div>
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
            case "positions":
              comp.className =
                "hydrated " + this.#dynamicExampleManager.position.get(comp.id);
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
