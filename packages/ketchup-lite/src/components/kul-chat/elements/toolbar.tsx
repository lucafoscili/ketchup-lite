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
      const { currentPrompt, manager } = controller.get;
      const { toolbar } = elements.refs;
      const { button } = handlers.toolbar;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      const isDisabled = Boolean(currentPrompt());

      return (
        <kul-button
          class={`${bemClass("toolbar", "button")} kul-slim`}
          id={IDS.toolbar.copyContent}
          kulDisabled={isDisabled}
          kulIcon="content_copy"
          kulStyling="flat"
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
      const { currentPrompt, manager } = controller.get;
      const { toolbar } = elements.refs;
      const { button } = handlers.toolbar;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      const isDisabled = Boolean(currentPrompt());

      return (
        <kul-button
          class={`${bemClass("toolbar", "button")} kul-danger kul-slim`}
          id={IDS.toolbar.deleteMessage}
          kulDisabled={isDisabled}
          kulIcon="delete"
          kulStyling="flat"
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
      const { currentPrompt, manager } = controller.get;
      const { toolbar } = elements.refs;
      const { button } = handlers.toolbar;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      const isDisabled = Boolean(currentPrompt());

      return (
        <kul-button
          class={`${bemClass("toolbar", "button")} kul-slim`}
          id={IDS.toolbar.regenerate}
          kulDisabled={isDisabled}
          kulIcon="refresh"
          kulStyling="flat"
          onKul-button-event={(e) => button(e, m)}
          ref={assignRef(toolbar, "regenerate")}
          title="Regenerate the response to this request."
        ></kul-button>
      );
    },
    //#endregion
  };
};
