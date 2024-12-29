import { Component, Element, Fragment, h } from "@stencil/core";

import { DYNAMIC_POSITION_DATA } from "./kul-showcase-kulportal-data";
import { KUL_WRAPPER_ID } from "../../../../utils/constants";

@Component({
  tag: "kul-showcase-kulportal",
  styleUrl: "kul-showcase-kulportal.scss",
  shadow: true,
})
export class KulShowcaseKulportal {
  /**
   * References the root HTML element of the component (<kul-showcase-kulportal>).
   */
  @Element() rootElement: HTMLKulShowcaseKulportalElement;

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
