import { Component, Element, Fragment, h } from "@stencil/core";

import { DATA_DOC } from "./kul-showcase-kuldata-data";
import { KUL_WRAPPER_ID } from "../../../../utils/constants";

@Component({
  tag: "kul-showcase-kuldata",
  styleUrl: "kul-showcase-kuldata.scss",
  shadow: true,
})
export class KulShowcaseKuldata {
  /**
   * References the root HTML element of the component (<kul-showcase-kuldata>).
   */
  @Element() rootElement: HTMLKulShowcaseKuldataElement;

  //#region Lifecycle hooks
  render() {
    return (
      <Fragment>
        <div id={KUL_WRAPPER_ID}>
          <kul-article kulData={DATA_DOC}></kul-article>
        </div>
      </Fragment>
    );
  }
  //#endregion
}
