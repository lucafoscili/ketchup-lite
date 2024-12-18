import { h } from "@stencil/core";
import { kulManagerSingleton } from "src";
import { IDS } from "../helpers/constants";
import { KulChatAdapter, KulChatAdapterJsx } from "../kul-chat-declarations";

export const prepToolbar = (
  getAdapter: () => KulChatAdapter,
): KulChatAdapterJsx["toolbar"] => {
  const { assignRef } = kulManagerSingleton;

  const className = {
    chat__messages__toolbar__button: true,
    "kul-slim": true,
  };

  return {
    //#region Copy content
    copyContent: (m) => {
      const { elements, handlers } = getAdapter();
      const { toolbar } = elements.refs;
      const { button } = handlers.toolbar;

      return (
        <kul-button
          class={className}
          id={IDS.toolbar.copyContent}
          kulIcon="content_copy"
          onKul-button-event={(e) => button(e, m)}
          ref={assignRef(toolbar, "copyContent")}
          title="Copy text to clipboard."
        ></kul-button>
      );
    },
    //#endregion

    //#region Delete message
    deleteMessage: (m) => {
      const { elements, handlers } = getAdapter();
      const { toolbar } = elements.refs;
      const { button } = handlers.toolbar;

      return (
        <kul-button
          class={{ ...className, "kul-danger": true }}
          id={IDS.toolbar.deleteMessage}
          kulIcon="delete"
          onKul-button-event={(e) => button(e, m)}
          ref={assignRef(toolbar, "deleteMessage")}
          title="Delete this message from the chat history."
        ></kul-button>
      );
    },
    //#endregion

    //#region Regenerate
    regenerate: (m) => {
      const { elements, handlers } = getAdapter();
      const { toolbar } = elements.refs;
      const { button } = handlers.toolbar;

      return (
        <kul-button
          class={className}
          id={IDS.toolbar.regenerate}
          kulIcon="refresh"
          onKul-button-event={(e) => button(e, m)}
          ref={assignRef(toolbar, "regenerate")}
          title="Regenerate the response to this request."
        ></kul-button>
      );
    },
    //#endregion
  };
};
