import { h } from "@stencil/core";
import { ICONS, IDS } from "../helpers/constants";
import {
  KulCarouselAdapter,
  KulCarouselAdapterElementsJsx,
} from "../kul-carousel-declarations";

//#endregion
export const prepSideButtonsJsx = (
  getAdapter: () => KulCarouselAdapter,
): KulCarouselAdapterElementsJsx => {
  return {
    //#region Back
    back: () => {
      const { button } = getAdapter().handlers;

      return (
        <kul-button
          class="kul-full-height"
          id={IDS.back}
          kulIcon={ICONS.back}
          onKul-button-event={button}
          title="View previous slide."
        ></kul-button>
      );
    },
    //#endregion

    //#region Forward
    forward: () => {
      const { button } = getAdapter().handlers;

      return (
        <kul-button
          class="kul-full-height"
          id={IDS.forward}
          kulIcon={ICONS.forward}
          onKul-button-event={button}
          title="View next slide."
        ></kul-button>
      );
    },
    //#endregion
  };
};
