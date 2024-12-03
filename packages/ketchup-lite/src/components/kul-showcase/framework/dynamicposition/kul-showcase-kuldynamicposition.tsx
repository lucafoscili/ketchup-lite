import { Component, Element, Fragment, h } from "@stencil/core";

import { DYNAMIC_POSITION_DATA } from "./kul-showcase-kuldynamicposition-data";
import { KUL_WRAPPER_ID } from "../../../../variables/GenericVariables";

@Component({
  tag: "kul-showcase-kuldynamicposition",
  styleUrl: "kul-showcase-kuldynamicposition.scss",
  shadow: true,
})
export class KulShowcaseKuldynamicposition {
  /**
   * References the root HTML element of the component (<kul-showcase-kuldynamicposition>).
   */
  @Element() rootElement: HTMLKulShowcaseKuldynamicpositionElement;

  //#region Lifecycle hooks
  render() {
    return (
      <Fragment>
        <div id={KUL_WRAPPER_ID}>
          <kul-article kulData={DYNAMIC_POSITION_DATA}></kul-article>
        </div>
      </Fragment>
    );
  }
  //#endregion
}
