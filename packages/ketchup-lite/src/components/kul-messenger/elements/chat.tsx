import { h } from "@stencil/core";
import { ICONS, IDS, NAV_DATASET } from "../helpers/constants";
import { systemMessage } from "../helpers/utils";
import {
  KulMessengerAdapter,
  KulMessengerAdapterJsx,
} from "../kul-messenger-declarations";

export const prepChat = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterJsx["chat"] => {
  return {
    //#region Chat
    chat: () => {
      const adapter = getAdapter();
      const { controller, elements, handlers } = adapter;
      const { character, manager } = controller.get;
      const { refs } = elements;
      const { chat, current, history } = character;
      const { assignRef, sanitizeProps } = manager;

      const system = systemMessage(adapter);

      return (
        <kul-chat
          key={current().id}
          kulLayout="bottom-textarea"
          kulSystem={system}
          kulValue={JSON.parse(history())}
          {...sanitizeProps(chat(), "KulChat")}
          onKul-chat-event={handlers.chat.chat}
          ref={assignRef(refs.chat, "chat")}
        ></kul-chat>
      );
    },
    //#endregion

    //#region Left expander
    leftExpander: () => {
      const { controller, elements, handlers } = getAdapter();
      const { manager } = controller.get;
      const { refs } = elements;
      const { button } = handlers.chat;
      const { assignRef } = manager;

      return (
        <kul-button
          class="kul-full-height"
          id={IDS.chat.leftExpander}
          kulIcon={ICONS.chat.leftExpander}
          kulStyling="flat"
          onKul-button-event={button}
          ref={assignRef(refs.chat, "leftExpander")}
          title="Expand/collapse this section"
        ></kul-button>
      );
    },
    //#endregion

    //#region Right expander
    rightExpander: () => {
      const { controller, elements, handlers } = getAdapter();
      const { manager } = controller.get;
      const { refs } = elements;
      const { button } = handlers.chat;
      const { assignRef } = manager;

      return (
        <kul-button
          class="kul-full-height"
          id={IDS.chat.rightExpander}
          kulIcon={ICONS.chat.rightExpander}
          kulStyling="flat"
          onKul-button-event={button}
          ref={assignRef(refs.chat, "rightExpander")}
          title="Expand/collapse this section"
        ></kul-button>
      );
    },
    //#endregion

    //#region Tabbar
    tabbar: () => {
      const { controller, elements, handlers } = getAdapter();
      const { manager } = controller.get;
      const { refs } = elements;
      const { tabbar } = handlers.chat;
      const { assignRef } = manager;

      return (
        <kul-tabbar
          kulData={NAV_DATASET}
          kulValue={null}
          onKul-tabbar-event={tabbar}
          ref={assignRef(refs.chat, "tabbar")}
        ></kul-tabbar>
      );
    },
    //#endregion
  };
};
