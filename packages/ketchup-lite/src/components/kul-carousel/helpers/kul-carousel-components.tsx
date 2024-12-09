import { h } from "@stencil/core";

import {
  KulCarouselAdapter,
  KulCarouselAdapterComponents,
} from "../kul-carousel-declarations";

const BACK_ICON = "chevron_left";
const FORWARD_ICON = "chevron_right";

export const createComponents: (
  adapter: KulCarouselAdapter,
) => KulCarouselAdapterComponents = (adapter) => {
  const { next, previous } = adapter.actions;

  return {
    back: (
      <kul-button
        class="kul-full-height"
        id={BACK_ICON}
        kulIcon="chevron_left"
        onClick={previous}
        title="View previous slide."
      ></kul-button>
    ),
    forward: (
      <kul-button
        class="kul-full-height"
        id={BACK_ICON}
        kulIcon={FORWARD_ICON}
        onClick={next}
        title="View next slide."
      ></kul-button>
    ),
  };
};
