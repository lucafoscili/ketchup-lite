import { h } from "@stencil/core";

import { kulManagerSingleton } from "src";
import { IDS } from "src/components/kul-chat/helpers/kul-chat-utils";
import {
  KulChatAdapter,
  KulChatAdapterElementsJsx,
} from "src/components/kul-chat/kul-chat-declarations";

export const prepSettings = (
  adapter: KulChatAdapter,
): KulChatAdapterElementsJsx["settings"] => {
  const { stringify } = kulManagerSingleton.data.cell;

  const { elements, handlers, state } = adapter;
  const { refs } = elements;
  const { get } = state;
  const { settings } = refs;
  const { compInstance } = get;

  return {
    //#region Back
    back: () => {
      const { button } = handlers.settings;

      return (
        <kul-button
          class="kul-full-width"
          id={IDS.options.back}
          kulIcon="arrow_back"
          kulLabel="Back"
          onKul-button-event={button}
          ref={(el) => {
            if (el) {
              settings.back = el;
            }
          }}
        ></kul-button>
      );
    },
    //#endregion

    //#region Endpoint
    endpoint: () => {
      const { textfield } = handlers.settings;

      return (
        <kul-textfield
          id={IDS.options.endpointUrl}
          kulIcon="http"
          kulLabel="Endpoint URL"
          kulValue={compInstance.kulEndpointUrl}
          onKul-textfield-event={textfield}
          ref={(el) => {
            if (el) {
              settings.endpoint = el;
            }
          }}
        ></kul-textfield>
      );
    },
    //#endregion

    //#region Max tokens
    maxTokens: () => {
      const { textfield } = handlers.settings;

      return (
        <kul-textfield
          id={IDS.options.maxTokens}
          kulHtmlAttributes={{
            min: 10,
            step: 100,
            type: "number",
          }}
          kulIcon="plus_one"
          kulLabel="Max tokens count"
          kulValue={stringify(compInstance.kulMaxTokens)}
          onKul-textfield-event={textfield}
          ref={(el) => {
            if (el) {
              settings.maxTokens = el;
            }
          }}
        ></kul-textfield>
      );
    },
    //#endregion

    //#region Polling
    polling: () => {
      const { textfield } = handlers.settings;

      return (
        <kul-textfield
          id={IDS.options.polling}
          kulHtmlAttributes={{
            min: 10,
            step: 10,
            type: "number",
          }}
          kulIcon="timer"
          kulLabel="Polling interval"
          kulValue={stringify(compInstance.kulPollingInterval)}
          onKul-textfield-event={textfield}
          ref={(el) => {
            if (el) {
              settings.polling = el;
            }
          }}
        ></kul-textfield>
      );
    },
    //#endregion

    //#region System
    system: () => {
      const { textfield } = handlers.settings;

      return (
        <kul-textfield
          id={IDS.options.system}
          class="settings__system kul-full-height"
          kulLabel="System prompt"
          kulStyling="textarea"
          kulValue={compInstance.kulSystem}
          onKul-textfield-event={textfield}
          ref={(el) => {
            if (el) {
              settings.system = el;
            }
          }}
        ></kul-textfield>
      );
    },
    //#endregion

    //#region Temperature
    temperature: () => {
      const { textfield } = handlers.settings;

      return (
        <kul-textfield
          id={IDS.options.temperature}
          kulHtmlAttributes={{
            min: 0,
            step: 0.1,
            type: "number",
          }}
          kulIcon="thermometer"
          kulLabel="Temperature"
          kulValue={stringify(compInstance.kulTemperature)}
          onKul-textfield-event={textfield}
          ref={(el) => {
            if (el) {
              settings.temperature = el;
            }
          }}
        ></kul-textfield>
      );
    },
    //#endregion
  };
};
