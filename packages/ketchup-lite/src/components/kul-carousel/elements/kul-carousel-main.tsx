import { h } from "@stencil/core";

import {
  ICONS,
  IDS,
} from "src/components/kul-carousel/helpers/kul-carousel-constants";
import { KulCarouselAdapter } from "src/components/kul-carousel/kul-carousel-declarations";

//#endregion
export const prepSideButtons = (adapter: KulCarouselAdapter) => {
  const { handlers } = adapter;

  return {
    //#region Back
    back: () => {
      const { button } = handlers;

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
      const { button } = handlers;

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
