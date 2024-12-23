import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import { IDS } from "../helpers/constants";
import { clearTextarea, submitPrompt } from "../helpers/utils";
import {
  KulChatAdapter,
  KulChatAdapterHandlers,
} from "../kul-chat-declarations";

export const prepChatHandlers = (
  getAdapter: () => KulChatAdapter,
): KulChatAdapterHandlers["chat"] => {
  return {
    //#region Button
    button: async (e: CustomEvent<KulButtonEventPayload>) => {
      const { eventType, id } = e.detail;

      const adapter = getAdapter();
      const { controller, elements } = adapter;
      const { get, set } = controller;
      const { refs } = elements;
      const { stt, textarea } = refs.chat;
      const { llm } = get.manager;

      switch (eventType) {
        case "click":
          switch (id) {
            case IDS.chat.clear:
              clearTextarea(adapter);
              break;
            case IDS.chat.send:
              submitPrompt(adapter);
              break;
            case IDS.chat.configuration:
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
