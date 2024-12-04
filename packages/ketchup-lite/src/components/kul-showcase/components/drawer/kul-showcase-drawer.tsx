import { Component, Element, Fragment, State, VNode, h } from "@stencil/core";

import { KulDataCyAttributes } from "../../../../types/GenericTypes";
import { DrawerExample } from "./kul-showcase-drawer-declarations";
import { DRAWER_FIXTURES } from "./kul-showcase-drawer-fixtures";

@Component({
  tag: "kul-showcase-drawer",
  styleUrl: "kul-showcase-drawer.scss",
  shadow: true,
})
export class KulShowcaseDrawer {
  /**
   * References the root HTML element of the component (<kul-showcase-drawer>).
   */
  @Element() rootElement: HTMLKulShowcaseDrawerElement;

  //#region States
  /**
   * Data of the fixtures.
   */
  @State() fixtures = DRAWER_FIXTURES();
  //#endregion

  //#region Private methods
  #prepExamples() {
    const elements: VNode[] = [];
    for (const key in this.fixtures.examples) {
      if (Object.prototype.hasOwnProperty.call(this.fixtures.examples, key)) {
        const props: DrawerExample = this.fixtures.examples[key];
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
