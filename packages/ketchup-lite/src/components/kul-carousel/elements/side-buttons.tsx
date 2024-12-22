import { h } from "@stencil/core";
import { ICONS, IDS } from "../helpers/constants";
import {
  KulCarouselAdapter,
  KulCarouselAdapterJsx,
} from "../kul-carousel-declarations";

//#endregion
export const prepSideButtonsJsx = (
  getAdapter: () => KulCarouselAdapter,
): KulCarouselAdapterJsx => {
  return {
    //#region Back
    back: () => {
      const { controller, elements, handlers } = getAdapter();
      const { assignRef } = controller.get.manager;
      const { refs } = elements;
      const { button } = handlers;

      return (
        <kul-button
          class="kul-full-height"
          id={IDS.back}
          kulIcon={ICONS.back}
          onKul-button-event={button}
          ref={assignRef(refs, "back")}
          title="View previous slide."
        ></kul-button>
      );
    },
    //#endregion

    //#region Forward
    forward: () => {
      const { controller, elements, handlers } = getAdapter();
      const { assignRef } = controller.get.manager;
      const { refs } = elements;
      const { button } = handlers;

      return (
        <kul-button
          class="kul-full-height"
          id={IDS.forward}
          kulIcon={ICONS.forward}
          onKul-button-event={button}
          ref={assignRef(refs, "forward")}
          title="View next slide."
        ></kul-button>
      );
    },
    //#endregion
  };
};
