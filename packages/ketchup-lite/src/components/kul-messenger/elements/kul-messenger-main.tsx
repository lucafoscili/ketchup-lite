import { h } from "@stencil/core";

import {
  ICONS,
  IDS,
  NAV_DATASET,
} from "src/components/kul-messenger/helpers/kul-messenger-constants";
import { systemMessage } from "src/components/kul-messenger/helpers/kul-messenger-utils";
import {
  KulMessengerAdapter,
  KulMessengerAdapterElementsJsx,
} from "src/components/kul-messenger/kul-messenger-declarations";

export const prepMessenger = (
  adapter: KulMessengerAdapter,
): KulMessengerAdapterElementsJsx["messenger"] => {
  const { elements, handlers, state } = adapter;
  const { messenger } = elements.refs;
  const { get } = state;

  return {
    //#region Chat
    chat: () => {
      const system = systemMessage(adapter);

      const { chat, current, history } = get.character;

      return (
        <kul-chat
          key={current().id}
          kulLayout="bottom-textarea"
          kulSystem={system}
          kulValue={JSON.parse(history())}
          {...chat()}
          onKul-chat-event={handlers.messenger.chat}
          ref={(el) => {
            if (el) {
              messenger.chat = el;
            }
          }}
        ></kul-chat>
      );
    },
    //#endregion

    //#region Left expander
    leftExpander: () => {
      const { button } = handlers.messenger;

      return (
        <kul-button
          class="kul-full-height"
          id={IDS.messenger.leftExpander}
          kulIcon={ICONS.messenger.leftExpander}
          kulStyling="flat"
          onKul-button-event={button}
          ref={(el) => {
            if (el) {
              messenger.leftExpander = el;
            }
          }}
          title="Expand/collapse this section"
        ></kul-button>
      );
    },
    //#endregion

    //#region Right expander
    rightExpander: () => {
      const { button } = handlers.messenger;

      return (
        <kul-button
          class="kul-full-height"
          id={IDS.messenger.rightExpander}
          kulIcon={ICONS.messenger.rightExpander}
          kulStyling="flat"
          onKul-button-event={button}
          ref={(el) => {
            if (el) {
              messenger.rightExpander = el;
            }
          }}
          title="Expand/collapse this section"
        ></kul-button>
      );
    },
    //#endregion

    //#region Tabbar
    tabbar: () => {
      const { tabbar } = handlers.messenger;

      return (
        <kul-tabbar
          kulData={NAV_DATASET}
          kulValue={1}
          onKul-tabbar-event={tabbar}
          ref={(el) => {
            if (el) {
              messenger.tabbar = el;
            }
          }}
        ></kul-tabbar>
      );
    },
    //#endregion
  };
};
