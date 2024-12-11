import { prepChat } from "../components/kul-chat-main";
import { prepSettings } from "../components/kul-chat-settings";
import { prepToolbar } from "../components/kul-chat-toolbar";
import {
  disableInteractivity,
  send,
  sendPrompt,
  stt,
  updateHistory,
  updateTokensCount,
} from "../handlers/kul-chat-main";
import { deleteMessage, regenerate } from "../handlers/kul-chat-toolbar";
import {
  KulChatAdapter,
  KulChatAdapterComponents,
  KulChatAdapterHandlers,
} from "../kul-chat-declarations";

export const createComponents: (
  adapter: KulChatAdapter,
) => KulChatAdapterComponents["jsx"] = (adapter) => {
  const chat = prepChat(adapter);
  const settings = prepSettings(adapter);
  const toolbar = prepToolbar(adapter);

  return {
    chat,
    settings,
    toolbar,
  };
};

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
