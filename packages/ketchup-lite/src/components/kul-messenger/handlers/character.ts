import { KulListEventPayload } from "src/components/kul-list/kul-list-declarations";
import { downloadJson } from "../helpers/utils";
import {
  KulMessengerAdapter,
  KulMessengerAdapterHandlers,
} from "../kul-messenger-declarations";

export const prepCharacterHandlers = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterHandlers["character"] => {
  return {
    //#region Button
    button: async (e) => {
      const { eventType, originalEvent } = e.detail;

      const { controller, handlers } = getAdapter();
      const { get, set } = controller;
      const { list } = handlers.character;
      const { inProgress } = get.status.save;

      switch (eventType) {
        case "click":
          if (!inProgress()) {
            set.data();
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

      const { controller } = getAdapter();
      const { character, compInstance, config, history } = controller.get;

      let strJson = "";
      switch (eventType) {
        case "click":
          switch (node.id) {
            case "full_history":
              strJson = JSON.stringify(history(), null, 2);
              break;
            case "history":
              strJson = character.history();
              break;
            case "kulData":
              strJson = JSON.stringify(compInstance.kulData, null, 2);
              break;
            case "settings":
              strJson = JSON.stringify(config(), null, 2);
              break;
          }

          downloadJson(strJson, node);
      }
    },
    //#endregion
  };
};