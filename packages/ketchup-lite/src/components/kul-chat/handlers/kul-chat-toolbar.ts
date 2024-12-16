import { IDS } from "src/components/kul-chat/helpers/kul-chat-constants";
import {
  deleteMessage,
  regenerateMessage,
} from "src/components/kul-chat/helpers/kul-chat-utils";
import {
  KulChatAdapter,
  KulChatAdapterHandlers,
} from "src/components/kul-chat/kul-chat-declarations";

export const prepToolbarHandlers = (
  adapter: KulChatAdapter,
): KulChatAdapterHandlers["toolbar"] => {
  return {
    //#region Button
    button: async (e, m) => {
      const { eventType, id } = e.detail;

      switch (eventType) {
        case "click":
          switch (id) {
            case IDS.toolbar.copyContent:
              navigator.clipboard.writeText(m.content);
              break;
            case IDS.toolbar.deleteMessage:
              deleteMessage(adapter, m);
              break;
            case IDS.toolbar.regenerate:
              regenerateMessage(adapter, m);
              break;
          }
      }
    },
    //#endregion
  };
};
