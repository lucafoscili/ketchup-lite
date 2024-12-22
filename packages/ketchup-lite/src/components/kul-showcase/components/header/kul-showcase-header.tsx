import { Component, Element, Fragment, State, VNode, h } from "@stencil/core";

import { KulDataCyAttributes } from "../../../../types/GenericTypes";
import { HeaderData, HeaderExample } from "./kul-showcase-header-declarations";
import { HEADER_FIXTURES } from "./kul-showcase-header-fixtures";

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
   * Data of the fixtures.
   */
  @State() fixtures = HEADER_FIXTURES();
  //#endregion

  //#region Private methods
  #prepExamples() {
    const elements: VNode[] = [];
    for (const key in this.fixtures.examples) {
      if (Object.prototype.hasOwnProperty.call(this.fixtures.examples, key)) {
        const k = key as keyof HeaderData;
        const props: HeaderExample = this.fixtures.examples[k];
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
  //#endregion
}
