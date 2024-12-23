import { h } from "@stencil/core";
import { IDS } from "../helpers/constants";
import { KulChatAdapter, KulChatAdapterJsx } from "../kul-chat-declarations";

export const prepToolbar = (
  getAdapter: () => KulChatAdapter,
): KulChatAdapterJsx["toolbar"] => {
  return {
    //#region Copy content
    copyContent: (m) => {
      const { controller, elements, handlers } = getAdapter();
      const { manager } = controller.get;
      const { toolbar } = elements.refs;
      const { button } = handlers.toolbar;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      return (
        <kul-button
          class={bemClass("toolbar", "button")}
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
      const { controller, elements, handlers } = getAdapter();
      const { manager } = controller.get;
      const { toolbar } = elements.refs;
      const { button } = handlers.toolbar;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      return (
        <kul-button
          class={`${bemClass("toolbar", "button")} kul-danger`}
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
      const { controller, elements, handlers } = getAdapter();
      const { manager } = controller.get;
      const { toolbar } = elements.refs;
      const { button } = handlers.toolbar;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      return (
        <kul-button
          class={bemClass("toolbar", "button")}
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
