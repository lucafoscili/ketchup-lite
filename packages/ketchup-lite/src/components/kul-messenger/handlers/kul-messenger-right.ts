import { IDS } from "src/components/kul-messenger/helpers/kul-messenger-constants";
import {
  KulMessengerAdapter,
  KulMessengerAdapterHandlers,
} from "src/components/kul-messenger/kul-messenger-declarations";

export const rightHandlers = (
  adapter: KulMessengerAdapter,
): KulMessengerAdapterHandlers["right"] => {
  const {} = adapter;

  return {
    button: async (e) => {
      const { eventType, id } = e.detail;
      //const customizationSetter = adapter.set.messenger.ui.customization;

      switch (eventType) {
        case "click":
          switch (id) {
            case IDS.right.customization:
              //      customizationSetter(true);
              break;
            case IDS.right.back:
              //    customizationSetter(false);
              break;
          }
          break;
      }
    },
  };
};
