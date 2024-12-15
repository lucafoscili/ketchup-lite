import { h, VNode } from "@stencil/core";

import { TOOLBAR_IDS } from "src/components/kul-chat/helpers/kul-chat-utils";
import {
  KulChatAdapter,
  KulChatAdapterElementsJsx,
} from "src/components/kul-chat/kul-chat-declarations";
import { KulLLMChoiceMessage } from "src/managers/kul-llm/kul-llm-declarations";

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
    copyContent: (m: KulLLMChoiceMessage): VNode => {
      const { button } = handlers.toolbar;

      return (
        <kul-button
          class={className}
          id={TOOLBAR_IDS.copyContent}
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
    deleteMessage: (m: KulLLMChoiceMessage): VNode => {
      const { button } = handlers.toolbar;

      return (
        <kul-button
          class={{ ...className, "kul-danger": true }}
          id={TOOLBAR_IDS.deleteMessage}
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
    regenerate: (m: KulLLMChoiceMessage): VNode => {
      const { button } = handlers.toolbar;

      return (
        <kul-button
          class={className}
          id={TOOLBAR_IDS.regenerate}
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
