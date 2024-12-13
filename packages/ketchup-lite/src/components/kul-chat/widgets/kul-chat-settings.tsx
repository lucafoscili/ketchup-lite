import { h } from "@stencil/core";

import { kulManagerSingleton } from "src";
import {
  buttonEventHandler,
  textfieldEventHandler,
} from "src/components/kul-chat/handlers/kul-chat-settings";
import { OPTIONS_IDS } from "src/components/kul-chat/helpers/kul-chat-utils";
import {
  KulChatAdapter,
  KulChatAdapterWidgets,
} from "src/components/kul-chat/kul-chat-declarations";

export const prepSettings = (
  adapter: KulChatAdapter,
): KulChatAdapterWidgets["jsx"]["settings"] => {
  const { hooks, widgets } = adapter;
  const { refs } = widgets;
  const { get } = hooks;
  const { settings } = refs;
  const { comp } = get;
  const { data } = kulManagerSingleton;
  const { cell } = data;
  const { stringify } = cell;

  return {
    //#region Back
    back: () => (
      <kul-button
        class="kul-full-width"
        id={OPTIONS_IDS.back}
        kulIcon="arrow_back"
        kulLabel="Back"
        onKul-button-event={(e) => buttonEventHandler(adapter, e)}
        ref={(el) => {
          if (el) {
            settings.back = el;
          }
        }}
      ></kul-button>
    ),
    //#endregion

    //#region Endpoint
    endpoint: () => (
      <kul-textfield
        id={OPTIONS_IDS.endpointUrl}
        kulIcon="http"
        kulLabel="Endpoint URL"
        kulValue={comp.kulEndpointUrl}
        onKul-textfield-event={(e) => textfieldEventHandler(adapter, e)}
        ref={(el) => {
          if (el) {
            settings.endpoint = el;
          }
        }}
      ></kul-textfield>
    ),
    //#endregion

    //#region Max tokens
    maxTokens: () => (
      <kul-textfield
        id={OPTIONS_IDS.maxTokens}
        kulHtmlAttributes={{
          min: 10,
          step: 100,
          type: "number",
        }}
        kulIcon="plus_one"
        kulLabel="Max tokens count"
        kulValue={stringify(comp.kulMaxTokens)}
        onKul-textfield-event={(e) => textfieldEventHandler(adapter, e)}
        ref={(el) => {
          if (el) {
            settings.maxTokens = el;
          }
        }}
      ></kul-textfield>
    ),
    //#endregion

    //#region Polling
    polling: () => (
      <kul-textfield
        id={OPTIONS_IDS.polling}
        kulHtmlAttributes={{
          min: 10,
          step: 10,
          type: "number",
        }}
        kulIcon="timer"
        kulLabel="Polling interval"
        kulValue={stringify(comp.kulPollingInterval)}
        onKul-textfield-event={(e) => textfieldEventHandler(adapter, e)}
        ref={(el) => {
          if (el) {
            settings.polling = el;
          }
        }}
      ></kul-textfield>
    ),
    //#endregion

    //#region System
    system: () => (
      <kul-textfield
        id={OPTIONS_IDS.system}
        class="settings__system kul-full-height"
        kulLabel="System prompt"
        kulStyling="textarea"
        kulValue={comp.kulSystem}
        onKul-textfield-event={textfieldEventHandler.bind(
          textfieldEventHandler,
          adapter,
        )}
        ref={(el) => {
          if (el) {
            settings.system = el;
          }
        }}
      ></kul-textfield>
    ),
    //#endregion

    //#region Temperature
    temperature: () => (
      <kul-textfield
        id={OPTIONS_IDS.temperature}
        kulHtmlAttributes={{
          min: 0,
          step: 0.1,
          type: "number",
        }}
        kulIcon="thermometer"
        kulLabel="Temperature"
        kulValue={stringify(comp.kulTemperature)}
        onKul-textfield-event={(e) => textfieldEventHandler(adapter, e)}
        ref={(el) => {
          if (el) {
            settings.temperature = el;
          }
        }}
      ></kul-textfield>
    ),
    //#endregion
  };
};
