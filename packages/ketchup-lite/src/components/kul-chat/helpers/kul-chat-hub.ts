import {
  deleteMessage,
  regenerate,
} from "src/components/kul-chat/handlers/kul-chat-toolbar";
import {
  KulChatAdapter,
  KulChatAdapterHandlers,
  KulChatAdapterWidgets,
} from "src/components/kul-chat/kul-chat-declarations";
import { prepChat } from "src/components/kul-chat/widgets/kul-chat-main";
import { prepSettings } from "src/components/kul-chat/widgets/kul-chat-settings";
import { prepToolbar } from "src/components/kul-chat/widgets/kul-chat-toolbar";
import {
  disableInteractivity,
  send,
  sendPrompt,
  stt,
  updateHistory,
  updateTokensCount,
} from "../handlers/kul-chat-main";

export const createHandlers: (
  adapter: KulChatAdapter,
) => KulChatAdapterHandlers = (adapter) => {
  return {
    deleteMessage: (m) => deleteMessage(adapter, m),
    disableInteractivity: (shouldDisable) =>
      disableInteractivity(adapter, shouldDisable),
    regenerate: (m) => regenerate(adapter, m),
    send: () => send(adapter),
    sendPrompt: () => sendPrompt(adapter),
    stt: () => stt(adapter),
    updateHistory: (cb) => updateHistory(adapter, cb),
    updateTokensCount: () => updateTokensCount(adapter),
  };
};

export const createWidgets: (
  adapter: KulChatAdapter,
) => KulChatAdapterWidgets["jsx"] = (adapter) => {
  const chat = prepChat(adapter);
  const settings = prepSettings(adapter);
  const toolbar = prepToolbar(adapter);

  return {
    chat,
    settings,
    toolbar,
  };
};
