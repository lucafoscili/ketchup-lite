import { IDS } from "../helpers/constants";
import {
  KulChatAdapter,
  KulChatAdapterHandlers,
} from "../kul-chat-declarations";

export const prepSettingsHandlers = (
  getAdapter: () => KulChatAdapter,
): KulChatAdapterHandlers["settings"] => {
  return {
    //#region Button
    button: async (e) => {
      const { eventType, id } = e.detail;

      const { get, set } = getAdapter().controller;
      const { compInstance } = get;

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

      const { get } = getAdapter().controller;
      const { compInstance } = get;

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
