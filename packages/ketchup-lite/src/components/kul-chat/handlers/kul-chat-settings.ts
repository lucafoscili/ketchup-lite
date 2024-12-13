import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import { OPTIONS_IDS } from "src/components/kul-chat/helpers/kul-chat-utils";
import { KulChatAdapter } from "src/components/kul-chat/kul-chat-declarations";
import { KulTextfieldEventPayload } from "src/components/kul-textfield/kul-textfield-declarations";

//#region Button handler
export const buttonEventHandler = async (
  adapter: KulChatAdapter,
  e: CustomEvent<KulButtonEventPayload>,
) => {
  const { eventType, id } = e.detail;

  const { hooks } = adapter;
  const { get, set } = hooks;
  const { comp } = get;

  switch (eventType) {
    case "click":
      switch (id) {
        case OPTIONS_IDS.back:
          comp.onKulEvent(e, "config");
          set.view("chat");
          break;
      }
  }
};
//#endregion

//#region Textfield handler
export const textfieldEventHandler = (
  adapter: KulChatAdapter,
  e: CustomEvent<KulTextfieldEventPayload>,
) => {
  const { eventType, id, value } = e.detail;

  const { hooks } = adapter;
  const { get } = hooks;
  const { comp } = get;

  switch (eventType) {
    case "change":
      switch (id) {
        case OPTIONS_IDS.contextWindow:
          comp.kulContextWindow = parseInt(value);
          break;
        case OPTIONS_IDS.endpointUrl:
          comp.kulEndpointUrl = value;
          break;
        case OPTIONS_IDS.maxTokens:
          comp.kulMaxTokens = parseInt(value);
          break;
        case OPTIONS_IDS.polling:
          comp.kulPollingInterval = parseInt(value);
          break;
        case OPTIONS_IDS.system:
          comp.kulSystem = value;
          break;
        case OPTIONS_IDS.temperature:
          comp.kulTemperature = parseFloat(value);
          break;
      }
      break;
  }
};
//#endregion
