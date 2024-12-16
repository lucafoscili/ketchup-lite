import { h } from "@stencil/core";

import { IDS } from "src/components/kul-messenger/helpers/kul-messenger-constants";
import {
  KulMessengerAdapter,
  KulMessengerAdapterElementsJsx,
} from "src/components/kul-messenger/kul-messenger-declarations";

export const prepRight = (
  adapter: KulMessengerAdapter,
): KulMessengerAdapterElementsJsx["right"] => {
  const { handlers } = adapter;

  return {
    back: () => {
      const { button } = handlers.right;

      return (
        <kul-button
          class="kul-full-width"
          id={IDS.right.back}
          kulIcon="arrow_back"
          kulLabel="Back"
          onKul-button-event={button}
        ></kul-button>
      );
    },
    customization: () => {
      const { button } = handlers.right;

      return (
        <kul-button
          class="kul-full-width"
          id={IDS.right.customization}
          kulIcon="auto-fix"
          kulLabel="Customize"
          onKul-button-event={button}
        ></kul-button>
      );
    },
  };
};
