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
      //const customizationSetter = adapter.set.messenger.ui.customization;

      const {} = getAdapter();

      switch (eventType) {
        case "click":
          switch (id) {
            case IDS.options.customization:
              //      customizationSetter(true);
              break;
            case IDS.options.back:
              //    customizationSetter(false);
              break;
          }
          break;
      }
    },
    //#endregion
  };
};
