import { h } from "@stencil/core";
import { IDS } from "../helpers/constants";
import {
  KulMessengerAdapter,
  KulMessengerAdapterJsx,
} from "../kul-messenger-declarations";

export const prepOptions = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterJsx["options"] => {
  return {
    //#region Back
    back: () => {
      const { controller, elements, handlers } = getAdapter();
      const { assignRef } = controller.get.manager;
      const { options } = elements.refs;
      const { button } = handlers.options;

      return (
        <kul-button
          class="kul-full-width"
          id={IDS.options.back}
          kulIcon="arrow_back"
          kulLabel="Back"
          onKul-button-event={button}
          ref={assignRef(options, "back")}
        ></kul-button>
      );
    },
    //#endregion

    //#region Customization
    customize: () => {
      const { controller, elements, handlers } = getAdapter();
      const { assignRef } = controller.get.manager;
      const { options } = elements.refs;
      const { button } = handlers.options;

      return (
        <kul-button
          class="kul-full-width"
          id={IDS.options.customize}
          kulIcon="auto-fix"
          kulLabel="Customize"
          onKul-button-event={button}
          ref={assignRef(options, "customize")}
        ></kul-button>
      );
    },
    //#endregion
  };
};
