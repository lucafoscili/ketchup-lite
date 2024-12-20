import { h } from "@stencil/core";
import { kulManagerSingleton } from "src/global/global";
import { IDS } from "../helpers/constants";
import { KulChatAdapter, KulChatAdapterJsx } from "../kul-chat-declarations";

export const prepChat = (
  getAdapter: () => KulChatAdapter,
): KulChatAdapterJsx["chat"] => {
  const { assignRef } = kulManagerSingleton;

  return {
    //#region Clear
    clear: () => {
      const { controller, elements, handlers } = getAdapter();
      const { button } = handlers.chat;
      const { chat } = elements.refs;
      const { currentPrompt } = controller.get;

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

    //#region Progressbar
    progressbar: () => {
      const { controller, elements } = getAdapter();
      const { chat } = elements.refs;
      const { compInstance, currentTokens } = controller.get;
      const { kulContextWindow } = compInstance;

      const progressbarClass = {
        chat__request__input__progressbar: true,
        ["kul-animated"]: true,
        ["kul-striped"]: true,
      };

      const value = currentTokens();
      const className = { ...progressbarClass, "kul-danger": value > 90 };
      const title = `Estimated tokens used: ${value}/${kulContextWindow}`;

      return (
        <kul-progressbar
          class={className}
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
      const { currentPrompt } = controller.get;
      const { chat } = elements.refs;
      const { button } = handlers.chat;

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
      const { elements, handlers } = getAdapter();
      const { chat } = elements.refs;
      const { button } = handlers.chat;

      return (
        <kul-button
          class="chat__request__input__button kul-full-height"
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
      const { currentPrompt } = controller.get;
      const { chat } = elements.refs;

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
      //const { controller, elements, handlers } = getAdapter();
      //const { isSttActive } = controller.get;
      const { elements, handlers } = getAdapter();
      const { chat } = elements.refs;
      const { button } = handlers.chat;

      //const showSpinner = Boolean(currentPrompt());

      return (
        <kul-button
          id={IDS.chat.stt}
          class="chat__request__buttons__stt"
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
      const { currentPrompt } = controller.get;
      const { chat } = elements.refs;

      return (
        <kul-textfield
          class="chat__request__input__textarea"
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
