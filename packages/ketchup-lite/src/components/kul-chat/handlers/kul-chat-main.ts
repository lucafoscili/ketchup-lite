import { kulManagerSingleton } from "src";
import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import {
  CHAT_IDS,
  clearTextarea,
  submitPrompt,
} from "src/components/kul-chat/helpers/kul-chat-utils";
import { KulChatAdapter } from "src/components/kul-chat/kul-chat-declarations";

export const prepChatHandlers = (adapter: KulChatAdapter) => {
  const { llm } = kulManagerSingleton;

  const { elements, state } = adapter;
  const { refs } = elements;
  const { set } = state;

  return {
    //#region Button
    button: async (e: CustomEvent<KulButtonEventPayload>) => {
      const { eventType, id } = e.detail;

      const { stt, textarea } = refs.chat;

      switch (eventType) {
        case "click":
          switch (id) {
            case CHAT_IDS.clear:
              clearTextarea(adapter);
              break;
            case CHAT_IDS.send:
              submitPrompt(adapter);
              break;
            case CHAT_IDS.settings:
              set.view("settings");
              break;
            case CHAT_IDS.stt:
              llm.speechToText(textarea, stt);
              break;
          }
      }
    },
    //#endregion
  };
};
