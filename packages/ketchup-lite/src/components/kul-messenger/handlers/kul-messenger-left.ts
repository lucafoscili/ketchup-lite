import { KulListEventPayload } from "src/components/kul-list/kul-list-declarations";
import { downloadJson } from "src/components/kul-messenger/helpers/kul-messenger-utils";
import {
  KulMessengerAdapter,
  KulMessengerAdapterHandlers,
} from "src/components/kul-messenger/kul-messenger-declarations";

export const prepLeftHandlers = (
  adapter: KulMessengerAdapter,
): KulMessengerAdapterHandlers["left"] => {
  const { handlers, state } = adapter;
  const { get, set } = state;

  return {
    //#region Button
    button: async (e) => {
      const { eventType, originalEvent } = e.detail;

      const { list } = handlers.left;
      const { inProgress } = get.messenger.status.save;

      switch (eventType) {
        case "click":
          if (!inProgress()) {
            set.messenger.data();
          }
          break;
        case "kul-event":
          list(originalEvent as CustomEvent<KulListEventPayload>);
          break;
      }
    },
    //#endregion

    //#region List
    list: async (e) => {
      const { eventType, node } = e.detail;

      const { character, messenger } = get;

      let strJson = "";
      switch (eventType) {
        case "click":
          switch (node.id) {
            case "full_history":
              strJson = JSON.stringify(messenger.history(), null, 2);
              break;
            case "history":
              strJson = character.history();
              break;
            case "kulData":
              strJson = JSON.stringify(messenger.data(), null, 2);
              break;
            case "settings":
              strJson = JSON.stringify(messenger.config(), null, 2);
              break;
          }

          downloadJson(strJson, node);
      }
    },
    //#endregion
  };
};
