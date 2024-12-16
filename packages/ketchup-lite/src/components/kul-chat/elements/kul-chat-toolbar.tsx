import { h } from "@stencil/core";

import { IDS } from "src/components/kul-chat/helpers/kul-chat-constants";
import {
  KulChatAdapter,
  KulChatAdapterElementsJsx,
} from "src/components/kul-chat/kul-chat-declarations";

export const prepToolbar = (
  adapter: KulChatAdapter,
): KulChatAdapterElementsJsx["toolbar"] => {
  const { elements, handlers } = adapter;
  const { refs } = elements;
  const { toolbar } = refs;

  const className = {
    chat__messages__toolbar__button: true,
    "kul-slim": true,
  };

  return {
    //#region Copy content
    copyContent: (m) => {
      const { button } = handlers.toolbar;

      return (
        <kul-button
          class={className}
          id={IDS.toolbar.copyContent}
          kulIcon="content_copy"
          onKul-button-event={(e) => button(e, m)}
          ref={(el) => {
            if (el) {
              toolbar.copyContent = el;
            }
          }}
          title="Copy text to clipboard."
        ></kul-button>
      );
    },
    //#endregion

    //#region Delete message
    deleteMessage: (m) => {
      const { button } = handlers.toolbar;

      return (
        <kul-button
          class={{ ...className, "kul-danger": true }}
          id={IDS.toolbar.deleteMessage}
          kulIcon="delete"
          onKul-button-event={(e) => button(e, m)}
          ref={(el) => {
            if (el) {
              toolbar.deleteMessage = el;
            }
          }}
          title="Delete this message from the chat history."
        ></kul-button>
      );
    },
    //#endregion

    //#region Regenerate
    regenerate: (m) => {
      const { button } = handlers.toolbar;

      return (
        <kul-button
          class={className}
          id={IDS.toolbar.regenerate}
          kulIcon="refresh"
          onKul-button-event={(e) => button(e, m)}
          ref={(el) => {
            if (el) {
              toolbar.regenerate = el;
            }
          }}
          title="Regenerate the response to this request."
        ></kul-button>
      );
    },
    //#endregion
  };
};
