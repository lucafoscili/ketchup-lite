import { IDS } from "src/components/kul-chat/helpers/kul-chat-constants";
import {
  KulChatAdapter,
  KulChatAdapterHandlers,
} from "src/components/kul-chat/kul-chat-declarations";

export const prepSettingsHandlers = (
  adapter: KulChatAdapter,
): KulChatAdapterHandlers["settings"] => {
  const { state } = adapter;
  const { get, set } = state;
  const { compInstance } = get;

  return {
    //#region Button
    button: async (e) => {
      const { eventType, id } = e.detail;

      switch (eventType) {
        case "click":
          switch (id) {
            case IDS.options.back:
              compInstance.onKulEvent(e, "config");
              set.view("chat");
              break;
          }
      }
    },
    //#endregion

    //#region Textfield
    textfield: (e) => {
      const { eventType, id, value } = e.detail;

      switch (eventType) {
        case "change":
          switch (id) {
            case IDS.options.contextWindow:
              compInstance.kulContextWindow = parseInt(value);
              break;
            case IDS.options.endpointUrl:
              compInstance.kulEndpointUrl = value;
              break;
            case IDS.options.maxTokens:
              compInstance.kulMaxTokens = parseInt(value);
              break;
            case IDS.options.polling:
              compInstance.kulPollingInterval = parseInt(value);
              break;
            case IDS.options.system:
              compInstance.kulSystem = value;
              break;
            case IDS.options.temperature:
              compInstance.kulTemperature = parseFloat(value);
              break;
          }
          break;
      }
    },
    //#endregion
  };
};
