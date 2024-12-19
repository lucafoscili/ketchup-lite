import { IDS } from "../helpers/constants";
import {
  KulMessengerAdapter,
  KulMessengerAdapterHandlers,
} from "../kul-messenger-declarations";

export const prepOptionsHandlers = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterHandlers["options"] => {
  return {
    //#region Button
    button: async (e) => {
      const { eventType, id } = e.detail;

      const { customization } = getAdapter().controller.set.ui;

      switch (eventType) {
        case "click":
          switch (id) {
            case IDS.options.customize:
              customization(true);
              break;
            case IDS.options.back:
              customization(false);
              break;
          }
          break;
      }
    },
    //#endregion
  };
};
