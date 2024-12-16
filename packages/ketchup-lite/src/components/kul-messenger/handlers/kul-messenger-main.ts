import {
  ICONS,
  IDS,
} from "src/components/kul-messenger/helpers/kul-messenger-constants";
import {
  KulMessengerAdapter,
  KulMessengerAdapterHandlers,
} from "src/components/kul-messenger/kul-messenger-declarations";
import { KulTabbarEventPayload } from "src/components/kul-tabbar/kul-tabbar-declarations";

export const messengerHandlers = (
  adapter: KulMessengerAdapter,
): KulMessengerAdapterHandlers["messenger"] => {
  const { set } = adapter.state;

  return {
    button: async (e) => {
      const { comp, eventType, id } = e.detail;

      switch (eventType) {
        case "click":
          switch (id) {
            case IDS.messenger.leftExpander:
              const newLeft = set.messenger.ui.panel("left");
              comp.kulIcon = newLeft
                ? ICONS.messenger.rightExpander
                : ICONS.messenger.leftExpander;
              break;
            case IDS.messenger.rightExpander:
              const newRight = set.messenger.ui.panel("right");
              comp.kulIcon = newRight
                ? ICONS.messenger.leftExpander
                : ICONS.messenger.rightExpander;
              break;
          }
      }
    },
    chat: async (e) => {
      const { comp, eventType, history, status } = e.detail;

      const {
        kulEndpointUrl,
        kulMaxTokens,
        kulPollingInterval,
        kulSystem,
        kulTemperature,
      } = comp;

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
          set.messenger.status.connection(status);
          break;
        case "update":
          set.character.history(history);
          break;
      }
    },
    tabbar: async (e: CustomEvent<KulTabbarEventPayload>) => {
      const { eventType, node } = e.detail;

      const { current, next, previous } = set.character;

      switch (eventType) {
        case "click":
          if (node.id === "previous") {
            previous();
          } else if (node.id === "next") {
            next();
          } else {
            current(null);
          }
      }
    },
  };
};
