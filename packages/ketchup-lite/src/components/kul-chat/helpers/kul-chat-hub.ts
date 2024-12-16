import { prepChat } from "src/components/kul-chat/elements/kul-chat-main";
import { prepSettings } from "src/components/kul-chat/elements/kul-chat-settings";
import { prepToolbar } from "src/components/kul-chat/elements/kul-chat-toolbar";
import { prepChatHandlers } from "src/components/kul-chat/handlers/kul-chat-main";
import { prepSettingsHandlers } from "src/components/kul-chat/handlers/kul-chat-settings";
import { prepToolbarHandlers } from "src/components/kul-chat/handlers/kul-chat-toolbar";
import { REFS } from "src/components/kul-chat/helpers/kul-chat-constants";
import {
  KulChatAdapter,
  KulChatAdapterElementsJsx,
  KulChatAdapterHandlers,
} from "src/components/kul-chat/kul-chat-declarations";

export const createElements: (
  adapter: KulChatAdapter,
) => KulChatAdapterElementsJsx = (adapter) => {
  return {
    chat: prepChat(adapter),
    settings: prepSettings(adapter),
    toolbar: prepToolbar(adapter),
  };
};

export const createHandlers: (
  adapter: KulChatAdapter,
) => KulChatAdapterHandlers = (adapter) => {
  return {
    chat: prepChatHandlers(adapter),
    settings: prepSettingsHandlers(adapter),
    toolbar: prepToolbarHandlers(adapter),
  };
};

export const createRefs = REFS;
