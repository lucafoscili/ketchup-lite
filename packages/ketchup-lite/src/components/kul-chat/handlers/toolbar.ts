import { IDS } from "../helpers/constants";
import { deleteMessage, regenerateMessage } from "../helpers/utils";
import {
  KulChatAdapter,
  KulChatAdapterHandlers,
} from "../kul-chat-declarations";

export const prepToolbarHandlers = (
  getAdapter: () => KulChatAdapter,
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
              deleteMessage(getAdapter(), m);
              break;
            case IDS.toolbar.regenerate:
              regenerateMessage(getAdapter(), m);
              break;
          }
      }
    },
    //#endregion
  };
};
