import { h } from "@stencil/core";

import {
  buttonEventHandler,
  progressbarEventHandler,
} from "../handlers/kul-chat-main";
import { CHAT_IDS } from "../helpers/kul-chat-tools";
import {
  KulChatAdapter,
  KulChatAdapterComponents,
} from "../kul-chat-declarations";

export const prepChat = (
  adapter: KulChatAdapter,
): KulChatAdapterComponents["jsx"]["chat"] => {
  const { components } = adapter;
  const { refs } = components;
  const { chat } = refs;

  const progressbarClass = {
    chat__request__input__progressbar: true,
    ["kul-animated"]: true,
    ["kul-striped"]: true,
  };

  return {
    //#region Clear
    clear: () => (
      <kul-button
        id={CHAT_IDS.clear}
        kulLabel="Clear"
        kulStyling={"flat"}
        onKul-button-event={(e) => buttonEventHandler(adapter, e)}
        ref={(el) => {
          if (el) {
            chat.clear = el;
          }
        }}
        title="Clear the textarea."
      ></kul-button>
    ),
    //#endregion

    //#region Progressbar
    progressbar: () => (
      <kul-progressbar
        class={progressbarClass}
        kulCenteredLabel={true}
        kulIcon="data_usage"
        kulLabel="Context window"
        onKul-progressbar-event={(e) => progressbarEventHandler(adapter, e)}
        ref={(el) => {
          if (el) {
            chat.progressbar = el;
          }
        }}
      ></kul-progressbar>
    ),
    //#endregion

    //#region Prompt
    prompt: () => (
      <kul-textfield
        class="chat__request__input__textarea"
        id={CHAT_IDS.prompt}
        kulFullWidth={true}
        kulLabel="What's on your mind?"
        kulStyling="textarea"
        ref={(el) => {
          if (el) {
            chat.prompt = el;
          }
        }}
      ></kul-textfield>
    ),
    //#endregion

    //#region Send
    send: () => (
      <kul-button
        id={CHAT_IDS.send}
        kulIcon="check"
        kulLabel="Send"
        onKul-button-event={(e) => buttonEventHandler(adapter, e)}
        ref={(el) => {
          if (el) {
            chat.send = el;
          }
        }}
        title="Send your prompt (CTRL + Enter)."
      >
        <kul-spinner
          kulActive={true}
          kulDimensions="0.6em"
          slot="spinner"
        ></kul-spinner>
      </kul-button>
    ),
    //#endregion

    //#region Settings
    settings: () => (
      <kul-button
        class="chat__request__input__button kul-full-height"
        id={CHAT_IDS.settings}
        kulIcon="settings"
        kulStyling="flat"
        onKul-button-event={(e) => buttonEventHandler(adapter, e)}
        ref={(el) => {
          if (el) {
            chat.settings = el;
          }
        }}
      ></kul-button>
    ),
    //#endregion

    //#region Spinner
    spinner: () => (
      <kul-spinner
        kulBarVariant={true}
        ref={(el) => {
          if (el) {
            chat.spinner = el;
          }
        }}
      ></kul-spinner>
    ),
    //#endregion

    //#region Stt
    stt: () => (
      <kul-button
        id={CHAT_IDS.stt}
        class="chat__request__buttons__stt"
        kulIcon="keyboard_voice"
        kulStyling="icon"
        onKul-button-event={(e) => buttonEventHandler(adapter, e)}
        ref={(el) => {
          if (el) {
            chat.stt = el;
          }
        }}
        title="Activate Speech To Text with your browser's API (if supported)."
      >
        <kul-spinner
          kulActive={true}
          kulDimensions="0.6em"
          kulLayout={6}
          slot="spinner"
        ></kul-spinner>
      </kul-button>
    ),
    //#endregion
  };
};
