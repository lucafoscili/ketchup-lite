import { h } from "@stencil/core";
import { kulManagerSingleton } from "src";
import { IDS } from "../helpers/constants";
import { KulChatAdapter, KulChatAdapterJsx } from "../kul-chat-declarations";

export const prepSettings = (
  getAdapter: () => KulChatAdapter,
): KulChatAdapterJsx["settings"] => {
  const { assignRef, data } = kulManagerSingleton;
  const { stringify } = data.cell;

  return {
    //#region Back
    back: () => {
      const { elements, handlers } = getAdapter();
      const { settings } = elements.refs;
      const { button } = handlers.settings;

      return (
        <kul-button
          class="kul-full-width"
          id={IDS.options.back}
          kulIcon="arrow_back"
          kulLabel="Back"
          onKul-button-event={button}
          ref={assignRef(settings, "back")}
        ></kul-button>
      );
    },
    //#endregion

    //#region Endpoint
    endpoint: () => {
      const { controller, elements, handlers } = getAdapter();
      const { compInstance } = controller.get;
      const { settings } = elements.refs;
      const { textfield } = handlers.settings;

      return (
        <kul-textfield
          id={IDS.options.endpointUrl}
          kulIcon="http"
          kulLabel="Endpoint URL"
          kulValue={compInstance.kulEndpointUrl}
          onKul-textfield-event={textfield}
          ref={assignRef(settings, "endpoint")}
        ></kul-textfield>
      );
    },
    //#endregion

    //#region Max tokens
    maxTokens: () => {
      const { controller, elements, handlers } = getAdapter();
      const { compInstance } = controller.get;
      const { settings } = elements.refs;
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
          ref={assignRef(settings, "maxTokens")}
        ></kul-textfield>
      );
    },
    //#endregion

    //#region Polling
    polling: () => {
      const { controller, elements, handlers } = getAdapter();
      const { compInstance } = controller.get;
      const { settings } = elements.refs;
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
          ref={assignRef(settings, "polling")}
        ></kul-textfield>
      );
    },
    //#endregion

    //#region System
    system: () => {
      const { controller, elements, handlers } = getAdapter();
      const { compInstance } = controller.get;
      const { settings } = elements.refs;
      const { textfield } = handlers.settings;

      return (
        <kul-textfield
          id={IDS.options.system}
          class="settings__system kul-full-height"
          kulLabel="System prompt"
          kulStyling="textarea"
          kulValue={compInstance.kulSystem}
          onKul-textfield-event={textfield}
          ref={assignRef(settings, "system")}
        ></kul-textfield>
      );
    },
    //#endregion

    //#region Temperature
    temperature: () => {
      const { controller, elements, handlers } = getAdapter();
      const { compInstance } = controller.get;
      const { settings } = elements.refs;
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
          ref={assignRef(settings, "temperature")}
        ></kul-textfield>
      );
    },
    //#endregion
  };
};
