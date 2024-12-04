import { Component, Element, Fragment, State, VNode, h } from "@stencil/core";

import { HEADER_DOC, HEADER_EXAMPLES } from "./kul-showcase-header-data";
import { HeaderExample } from "./kul-showcase-header-declarations";
import { KulDataCyAttributes } from "../../../../types/GenericTypes";

@Component({
  tag: "kul-showcase-header",
  styleUrl: "kul-showcase-header.scss",
  shadow: true,
})
export class KulShowcaseHeader {
  /**
   * References the root HTML element of the component (<kul-showcase-header>).
   */
  @Element() rootElement: HTMLKulShowcaseHeaderElement;

  //#region States
  /**
   * Data of the examples.
   */
  @State() examples = HEADER_EXAMPLES;
  //#endregion

  //#region Private methods
  #prepExamples() {
    const elements: VNode[] = [];
    for (const key in this.examples) {
      if (Object.prototype.hasOwnProperty.call(this.examples, key)) {
        const props: HeaderExample = this.examples[key];
        elements.push(
          <div class="example" part="example">
            <div class="description" part="description">
              {props["data-description"]}
            </div>
            <div class="comp-wrapper" part="comp-wrapper">
              <iframe key={key} id={key} {...props.iframeProps}></iframe>
            </div>
          </div>,
        );
      }
    }
    return elements;
  }
  //#endregion

  //#region Lifecycle hooks
  render() {
    return (
      <Fragment>
        <kul-article kulData={HEADER_DOC}></kul-article>
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
  //#endregion
}
