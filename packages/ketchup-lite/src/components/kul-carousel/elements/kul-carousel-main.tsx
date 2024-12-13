import { h } from "@stencil/core";

import {
  ICONS,
  navigation,
} from "src/components/kul-carousel//helpers/kul-carousel-utils";
import { KulCarouselAdapter } from "src/components/kul-carousel/kul-carousel-declarations";

//#region Back
export const prepBack = (adapter: KulCarouselAdapter) => {
  const { previous } = navigation;

  return (
    <kul-button
      class="kul-full-height"
      id={ICONS.back}
      kulIcon={ICONS.back}
      onClick={() => previous(adapter)}
      title="View previous slide."
    ></kul-button>
  );
};
//#endregion

//#region Forward
export const prepForward = (adapter: KulCarouselAdapter) => {
  const { next } = navigation;

  return (
    <kul-button
      class="kul-full-height"
      id={ICONS.forward}
      kulIcon={ICONS.forward}
      onClick={() => next(adapter)}
      title="View next slide."
    ></kul-button>
  );
};
//#endregion
