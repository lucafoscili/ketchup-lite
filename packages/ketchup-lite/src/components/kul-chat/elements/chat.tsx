import { h } from "@stencil/core";
import { IDS } from "../helpers/constants";
import { KulChatAdapter, KulChatAdapterJsx } from "../kul-chat-declarations";

export const prepChat = (
  getAdapter: () => KulChatAdapter,
): KulChatAdapterJsx["chat"] => {
  return {
    //#region Clear
    clear: () => {
      const { controller, elements, handlers } = getAdapter();
      const { currentPrompt, manager } = controller.get;
      const { button } = handlers.chat;
      const { chat } = elements.refs;
      const { assignRef } = manager;

      return (
        <kul-button
          id={IDS.chat.clear}
          kulDisabled={Boolean(currentPrompt())}
          kulLabel="Clear"
          kulStyling={"flat"}
          onKul-button-event={button}
          ref={assignRef(chat, "clear")}
          title="Clear the textarea."
        ></kul-button>
      );
    },
    //#endregion

    //#region Configuration
    configuration: () => {
      const { controller, elements, handlers } = getAdapter();
      const { manager } = controller.get;
      const { chat } = elements.refs;
      const { button } = handlers.chat;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      return (
        <kul-button
          class={`${bemClass("chat", "config")} kul-full-width`}
          kulIcon="wrench"
          kulLabel="Configuration"
          kulStyling="flat"
          onKul-button-event={button}
          ref={assignRef(chat, "configuration")}
        ></kul-button>
      );
    },
    //#endregion

    //#region Progressbar
    progressbar: () => {
      const { controller, elements } = getAdapter();
      const { chat } = elements.refs;
      const { compInstance, currentTokens, manager } = controller.get;
      const { kulContextWindow } = compInstance;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      const value = currentTokens();
      const title = `Estimated tokens used: ${value}/${kulContextWindow}`;

      return (
        <kul-progressbar
          class={`${bemClass("input", "progressbar")} kul-animated kul-striped`}
          kulCenteredLabel={true}
          kulIcon="data_usage"
          kulLabel="Context window"
          kulValue={value}
          ref={assignRef(chat, "progressbar")}
          title={title}
        ></kul-progressbar>
      );
    },
    //#endregion

    //#region Send
    send: () => {
      const { controller, elements, handlers } = getAdapter();
      const { currentPrompt, manager } = controller.get;
      const { chat } = elements.refs;
      const { button } = handlers.chat;
      const { assignRef } = manager;

      const showSpinner = Boolean(currentPrompt());

      return (
        <kul-button
          id={IDS.chat.send}
          kulIcon="check"
          kulLabel="Send"
          kulShowSpinner={showSpinner}
          onKul-button-event={button}
          ref={assignRef(chat, "send")}
          title="Send your prompt (CTRL + Enter)."
        >
          <kul-spinner
            kulActive={showSpinner}
            kulDimensions="0.6em"
            slot="spinner"
          ></kul-spinner>
        </kul-button>
      );
    },
    //#endregion

    //#region Settings
    settings: () => {
      const { controller, elements, handlers } = getAdapter();
      const { manager } = controller.get;
      const { chat } = elements.refs;
      const { button } = handlers.chat;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      return (
        <kul-button
          class={`${bemClass("input", "button")} kul-full-height`}
          id={IDS.chat.settings}
          kulIcon="settings"
          kulStyling="flat"
          onKul-button-event={button}
          ref={assignRef(chat, "settings")}
        ></kul-button>
      );
    },
    //#endregion

    //#region Spinner
    spinner: () => {
      const { controller, elements } = getAdapter();
      const { currentPrompt, manager } = controller.get;
      const { chat } = elements.refs;
      const { assignRef } = manager;

      const showSpinner = Boolean(currentPrompt());

      return (
        <kul-spinner
          kulActive={showSpinner}
          kulBarVariant={true}
          ref={assignRef(chat, "spinner")}
        ></kul-spinner>
      );
    },
    //#endregion

    //#region Stt
    stt: () => {
      const { controller, elements, handlers } = getAdapter();
      const { manager } = controller.get;
      const { chat } = elements.refs;
      const { button } = handlers.chat;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      //const showSpinner = Boolean(currentPrompt());

      return (
        <kul-button
          id={IDS.chat.stt}
          class={bemClass("commands", "stt")}
          kulIcon="keyboard_voice"
          //  kulShowSpinner={showSpinner}
          kulStyling="icon"
          onKul-button-event={button}
          ref={assignRef(chat, "stt")}
          title="Activate Speech To Text with your browser's API (if supported)."
        >
          <kul-spinner
            //    kulActive={showSpinner}
            kulDimensions="0.6em"
            kulLayout={6}
            slot="spinner"
          ></kul-spinner>
        </kul-button>
      );
    },
    //#endregion

    //#region Textarea
    textarea: () => {
      const { controller, elements } = getAdapter();
      const { currentPrompt, manager } = controller.get;
      const { chat } = elements.refs;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      return (
        <kul-textfield
          class={`${bemClass("input", "textarea")}`}
          id={IDS.chat.prompt}
          kulDisabled={Boolean(currentPrompt())}
          kulFullWidth={true}
          kulLabel="What's on your mind?"
          kulStyling="textarea"
          ref={assignRef(chat, "textarea")}
        ></kul-textfield>
      );
    },
    //#endregion
  };
};
