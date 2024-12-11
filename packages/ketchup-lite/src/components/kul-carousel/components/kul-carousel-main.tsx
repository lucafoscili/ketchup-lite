import { h } from "@stencil/core";

import { KulCarouselAdapter } from "../kul-carousel-declarations";

const BACK_ICON = "chevron_left";
const FORWARD_ICON = "chevron_right";

//#region Back
export const prepBack = (adapter: KulCarouselAdapter) => {
  const { handlers } = adapter;
  const { previous } = handlers;

  return (
    <kul-button
      class="kul-full-height"
      id={BACK_ICON}
      kulIcon={BACK_ICON}
      onClick={previous}
      title="View previous slide."
    ></kul-button>
  );
};
//#endregion

//#region Forward
export const prepForward = (adapter: KulCarouselAdapter) => {
  const { handlers } = adapter;
  const { next } = handlers;

  return (
    <kul-button
      class="kul-full-height"
      id={FORWARD_ICON}
      kulIcon={FORWARD_ICON}
      onClick={next}
      title="View next slide."
    ></kul-button>
  );
};
//#endregion
