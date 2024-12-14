import { h } from "@stencil/core";

import { CHAT_IDS } from "src/components/kul-chat/helpers/kul-chat-utils";
import {
  KulChatAdapter,
  KulChatAdapterElementsJsx,
} from "src/components/kul-chat/kul-chat-declarations";

export const prepChat = (
  adapter: KulChatAdapter,
): KulChatAdapterElementsJsx["chat"] => {
  const { elements, handlers, state } = adapter;
  const { refs } = elements;
  const { get } = state;
  const { compInstance } = get;

  const progressbarClass = {
    chat__request__input__progressbar: true,
    ["kul-animated"]: true,
    ["kul-striped"]: true,
  };

  return {
    //#region Clear
    clear: () => {
      const { chat } = handlers;
      const { currentPrompt } = get;
      const { button } = chat;

      return (
        <kul-button
          id={CHAT_IDS.clear}
          kulDisabled={Boolean(currentPrompt())}
          kulLabel="Clear"
          kulStyling={"flat"}
          onKul-button-event={button}
          ref={(el) => {
            if (el) {
              refs.chat.clear = el;
            }
          }}
          title="Clear the textarea."
        ></kul-button>
      );
    },
    //#endregion

    //#region Progressbar
    progressbar: () => {
      const { currentTokens } = get;
      const { kulContextWindow } = compInstance;

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
          ref={(el) => {
            if (el) {
              refs.chat.progressbar = el;
            }
          }}
          title={title}
        ></kul-progressbar>
      );
    },
    //#endregion

    //#region Send
    send: () => {
      const { chat } = handlers;
      const { button } = chat;
      const { currentPrompt } = get;

      return (
        <kul-button
          id={CHAT_IDS.send}
          kulIcon="check"
          kulLabel="Send"
          kulShowSpinner={Boolean(currentPrompt())}
          onKul-button-event={button}
          ref={(el) => {
            if (el) {
              refs.chat.send = el;
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
      );
    },
    //#endregion

    //#region Settings
    settings: () => {
      const { chat } = handlers;
      const { button } = chat;

      return (
        <kul-button
          class="chat__request__input__button kul-full-height"
          id={CHAT_IDS.settings}
          kulIcon="settings"
          kulStyling="flat"
          onKul-button-event={button}
          ref={(el) => {
            if (el) {
              refs.chat.settings = el;
            }
          }}
        ></kul-button>
      );
    },
    //#endregion

    //#region Spinner
    spinner: () => {
      const { currentPrompt } = get;

      return (
        <kul-spinner
          kulActive={Boolean(currentPrompt())}
          kulBarVariant={true}
          ref={(el) => {
            if (el) {
              refs.chat.spinner = el;
            }
          }}
        ></kul-spinner>
      );
    },
    //#endregion

    //#region Stt
    stt: () => {
      const { chat } = handlers;
      const { button } = chat;

      return (
        <kul-button
          id={CHAT_IDS.stt}
          class="chat__request__buttons__stt"
          kulIcon="keyboard_voice"
          kulStyling="icon"
          onKul-button-event={button}
          ref={(el) => {
            if (el) {
              refs.chat.stt = el;
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
      );
    },
    //#endregion

    //#region Textarea
    textarea: () => {
      const { currentPrompt } = get;

      return (
        <kul-textfield
          class="chat__request__input__textarea"
          id={CHAT_IDS.prompt}
          kulDisabled={Boolean(currentPrompt())}
          kulFullWidth={true}
          kulLabel="What's on your mind?"
          kulStyling="textarea"
          ref={(el) => {
            if (el) {
              refs.chat.textarea = el;
            }
          }}
        ></kul-textfield>
      );
    },
    //#endregion
  };
};
