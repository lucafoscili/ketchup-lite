import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import {
  deleteMessage,
  regenerateMessage,
  TOOLBAR_IDS,
} from "src/components/kul-chat/helpers/kul-chat-utils";
import { KulChatAdapter } from "src/components/kul-chat/kul-chat-declarations";
import { KulLLMChoiceMessage } from "src/managers/kul-llm/kul-llm-declarations";

export const prepToolbarHandlers = (adapter: KulChatAdapter) => {
  return {
    //#region Button
    button: async (
      e: CustomEvent<KulButtonEventPayload>,
      m: KulLLMChoiceMessage,
    ) => {
      const { eventType, id } = e.detail;

      switch (eventType) {
        case "click":
          switch (id) {
            case TOOLBAR_IDS.copyContent:
              navigator.clipboard.writeText(m.content);
              break;
            case TOOLBAR_IDS.deleteMessage:
              deleteMessage(adapter, m);
              break;
            case TOOLBAR_IDS.regenerate:
              regenerateMessage(adapter, m);
              break;
          }
      }
    },
    //#endregion
  };
};
