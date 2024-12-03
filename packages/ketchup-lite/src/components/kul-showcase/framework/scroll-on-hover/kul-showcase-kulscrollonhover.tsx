import { Component, Element, Fragment, h } from "@stencil/core";

import { SCROLL_ON_HOVER_DATA } from "./kul-showcase-kulscrollonhover-data";
import { KUL_WRAPPER_ID } from "../../../../variables/GenericVariables";

@Component({
  tag: "kul-showcase-kulscrollonhover",
  styleUrl: "kul-showcase-kulscrollonhover.scss",
  shadow: true,
})
export class KulShowcaseKulscrollonhover {
  /**
   * References the root HTML element of the component (<kul-showcase-kulscrollonhover>).
   */
  @Element() rootElement: HTMLKulShowcaseKulscrollonhoverElement;

  //#region Lifecycle hooks
  render() {
    return (
      <Fragment>
        <div id={KUL_WRAPPER_ID}>
          <kul-article kulData={SCROLL_ON_HOVER_DATA}></kul-article>
        </div>
      </Fragment>
    );
  }
  //#endregion
}
