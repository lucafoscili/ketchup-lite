import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import { IDS } from "src/components/kul-chat/helpers/kul-chat-utils";
import { KulChatAdapter } from "src/components/kul-chat/kul-chat-declarations";
import { KulTextfieldEventPayload } from "src/components/kul-textfield/kul-textfield-declarations";

export const prepSettingsHandlers = (adapter: KulChatAdapter) => {
  const { state } = adapter;
  const { get, set } = state;
  const { compInstance } = get;

  return {
    //#region Button
    button: async (e: CustomEvent<KulButtonEventPayload>) => {
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
    textfield: (e: CustomEvent<KulTextfieldEventPayload>) => {
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
