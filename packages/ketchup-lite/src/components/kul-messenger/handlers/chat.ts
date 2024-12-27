import { ICONS, IDS } from "src/components/kul-messenger/helpers/constants";
import {
  KulMessengerAdapter,
  KulMessengerAdapterHandlers,
} from "src/components/kul-messenger/kul-messenger-declarations";
import { KulTabbarEventPayload } from "src/components/kul-tabbar/kul-tabbar-declarations";

export const prepChatHandlers = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterHandlers["chat"] => {
  return {
    //#region Button
    button: async (e) => {
      const { comp, eventType, id } = e.detail;

      const { set } = getAdapter().controller;

      switch (eventType) {
        case "click":
          switch (id) {
            case IDS.chat.leftExpander:
              const newLeft = set.ui.panel("left");
              comp.kulIcon = newLeft
                ? ICONS.chat.rightExpander
                : ICONS.chat.leftExpander;
              break;
            case IDS.chat.rightExpander:
              const newRight = set.ui.panel("right");
              comp.kulIcon = newRight
                ? ICONS.chat.leftExpander
                : ICONS.chat.rightExpander;
              break;
          }
      }
    },
    //#endregion

    //#region Chat
    chat: async (e) => {
      const { comp, eventType, history, status } = e.detail;
      const {
        kulEndpointUrl,
        kulMaxTokens,
        kulPollingInterval,
        kulSystem,
        kulTemperature,
      } = comp;

      const { set } = getAdapter().controller;

      switch (eventType) {
        case "config":
          set.character.chat({
            kulEndpointUrl,
            kulMaxTokens,
            kulPollingInterval,
            kulSystem,
            kulTemperature,
          });
          break;
        case "polling":
          set.status.connection(status);
          break;
        case "update":
          set.character.history(history);
          break;
      }
    },
    //#endregion

    //#region Tabbar
    tabbar: async (e: CustomEvent<KulTabbarEventPayload>) => {
      const { eventType, node } = e.detail;

      const { current, next, previous } = getAdapter().controller.set.character;

      switch (eventType) {
        case "click":
          switch (node.id) {
            case "next":
              next();
              break;
            case "previous":
              previous();
              break;
            default:
              current(null);
              break;
          }
      }
    },
  };
  //#endregion
};
