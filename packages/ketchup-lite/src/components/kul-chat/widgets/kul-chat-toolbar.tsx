import { h, VNode } from "@stencil/core";

import {
  KulChatAdapter,
  KulChatAdapterWidgets,
} from "src/components/kul-chat/kul-chat-declarations";
import { KulLLMChoiceMessage } from "src/managers/kul-llm/kul-llm-declarations";

export const prepToolbar = (
  adapter: KulChatAdapter,
): KulChatAdapterWidgets["jsx"]["toolbar"] => {
  const { handlers, widgets } = adapter;
  const { refs } = widgets;
  const { deleteMessage, regenerate } = handlers;
  const { toolbar } = refs;

  const className = {
    chat__messages__toolbar__button: true,
    "kul-slim": true,
  };

  return {
    //#region Copy content
    copyContent: (m: KulLLMChoiceMessage): VNode => (
      <kul-button
        class={className}
        kulIcon="content_copy"
        onClick={() => navigator.clipboard.writeText(m.content)}
        ref={(el) => {
          if (el) {
            toolbar.copyContent = el;
          }
        }}
        title="Copy text to clipboard."
      ></kul-button>
    ),
    //#endregion

    //#region Delete message
    deleteMessage: (m: KulLLMChoiceMessage): VNode => (
      <kul-button
        class={{ ...className, "kul-danger": true }}
        kulIcon="delete"
        onClick={() => deleteMessage(m)}
        ref={(el) => {
          if (el) {
            toolbar.deleteMessage = el;
          }
        }}
        title="Remove this message from history."
      ></kul-button>
    ),
    //#endregion

    //#region Regenerate
    regenerate: (m: KulLLMChoiceMessage): VNode => (
      <kul-button
        class={className}
        kulIcon="refresh"
        onClick={() => regenerate(m)}
        ref={(el) => {
          if (el) {
            toolbar.regenerate = el;
          }
        }}
        title="Regenerate answer to this question."
      ></kul-button>
    ),
    //#endregion
  };
};