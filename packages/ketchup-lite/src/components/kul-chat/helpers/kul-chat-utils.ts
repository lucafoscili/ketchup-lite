import { KulChat } from "src/components/kul-chat/kul-chat";
import { KulChatHistory } from "src/components/kul-chat/kul-chat-declarations";

//#region Chat IDs
export const CHAT_IDS = {
  clear: "chat-clear",
  prompt: "chat-prompt",
  send: "chat-send",
  settings: "chat-settings",
  stt: "chat-stt",
};
//#endregion

//#region Options IDs
export const OPTIONS_IDS = {
  back: "option-back",
  contextWindow: "option-context",
  endpointUrl: "option-endpoint",
  maxTokens: "option-maxtokens",
  polling: "option-polling",
  system: "option-system",
  temperature: "option-temperature",
};
//#endregion

//#region calcTokens
export const calcTokens = async (comp: KulChat, history: KulChatHistory) => {
  const { kulContextWindow, kulSystem } = comp;

  if (!kulContextWindow) {
    return;
  }

  let count = kulSystem ? kulSystem.length / 4 : 0;
  history.forEach((m) => (count += m.content.length));
  const estimated = count ? count / 4 : 0;
  return (estimated / kulContextWindow) * 100;
};
//#endregion
