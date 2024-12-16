import { kulManagerSingleton } from "src";
import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import { IDS } from "src/components/kul-chat/helpers/kul-chat-constants";
import {
  clearTextarea,
  submitPrompt,
} from "src/components/kul-chat/helpers/kul-chat-utils";
import {
  KulChatAdapter,
  KulChatAdapterHandlers,
} from "src/components/kul-chat/kul-chat-declarations";

export const prepChatHandlers = (
  adapter: KulChatAdapter,
): KulChatAdapterHandlers["chat"] => {
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
            case IDS.chat.clear:
              clearTextarea(adapter);
              break;
            case IDS.chat.send:
              submitPrompt(adapter);
              break;
            case IDS.chat.settings:
              set.view("settings");
              break;
            case IDS.chat.stt:
              llm.speechToText(textarea, stt);
              break;
          }
      }
    },
    //#endregion
  };
};
