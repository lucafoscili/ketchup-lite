import { prepChat } from "src/components/kul-chat/elements/kul-chat-main";
import { prepSettings } from "src/components/kul-chat/elements/kul-chat-settings";
import { prepToolbar } from "src/components/kul-chat/elements/kul-chat-toolbar";
import { prepChatHandlers } from "src/components/kul-chat/handlers/kul-chat-main";
import {
  KulChatAdapter,
  KulChatAdapterElementsJsx,
  KulChatAdapterHandlers,
} from "src/components/kul-chat/kul-chat-declarations";
import { prepSettingsHandlers } from "../handlers/kul-chat-settings";
import { prepPrompt } from "../handlers/kul-chat-prompt";

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
    prompt: prepPrompt(adapter),
    settings: prepSettingsHandlers(adapter),
  };
};
