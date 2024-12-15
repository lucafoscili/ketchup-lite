import { kulManagerSingleton } from "src";
import { KulChatAdapter } from "src/components/kul-chat/kul-chat-declarations";
import {
  KulLLMChoiceMessage,
  KulLLMRequest,
} from "src/managers/kul-llm/kul-llm-declarations";

//#region Ids
export const IDS = {
  chat: {
    clear: "chat-clear",
    prompt: "chat-prompt",
    send: "chat-send",
    settings: "chat-settings",
    stt: "chat-stt",
  },
  options: {
    back: "option-back",
    contextWindow: "option-context",
    endpointUrl: "option-endpoint",
    maxTokens: "option-maxtokens",
    polling: "option-polling",
    system: "option-system",
    temperature: "option-temperature",
  },
  toolbar: {
    copyContent: "toolbar-copy-content",
    deleteMessage: "toolbar-delete-message",
    regenerate: "toolbar-regenerate",
  },
};
//#endregion

//#region calcTokens
export const calcTokens = async (adapter: KulChatAdapter) => {
  const { get } = adapter.state;
  const { compInstance, history } = get;
  const { kulContextWindow, kulSystem } = compInstance;

  if (!kulContextWindow) {
    return;
  }

  let count = kulSystem ? kulSystem.length / 4 : 0;
  history().forEach((m) => (count += m.content.length));
  const estimated = count ? count / 4 : 0;
  return (estimated / kulContextWindow) * 100;
};
//#endregion

//#region newRequest
export const newRequest = (adapter: KulChatAdapter) => {
  const { get } = adapter.state;
  const { compInstance, history } = get;
  const { kulMaxTokens, kulSeed, kulSystem, kulTemperature } = compInstance;

  const messages: KulLLMRequest["messages"] = [];

  if (kulSystem) {
    messages.push({
      role: "system",
      content: kulSystem,
    });
  }

  history().map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  return {
    temperature: kulTemperature,
    max_tokens: kulMaxTokens,
    seed: kulSeed,
    messages,
  };
};
//#endregion

//#region Submit
export const submitPrompt = async (adapter: KulChatAdapter) => {
  const { debug, llm } = kulManagerSingleton;

  const { state } = adapter;
  const { get, set } = state;
  const { compInstance, history } = get;
  const { kulEndpointUrl } = compInstance;

  const message = await get.newPrompt();
  requestAnimationFrame(() => {
    set.currentPrompt(message);
  });
  const request = newRequest(adapter);
  const h = history();

  try {
    const response = await llm.fetch(request, kulEndpointUrl);
    const message = response.choices?.[0]?.message?.content;
    const llmMessage: KulLLMChoiceMessage = {
      role: "assistant",
      content: message,
    };
    set.history(() => h.push(llmMessage));
    set.currentPrompt(null);
  } catch (error) {
    debug.logs.new(compInstance, `Error calling LLM: ${error}`, "error");
    set.history(() => h.pop());
  }
};
//#endregion

//#region Clear textarea
export const clearTextarea = async (adapter: KulChatAdapter) => {
  const { textarea } = adapter.elements.refs.chat;

  await textarea.setValue("");
  await textarea.setFocus();
};
//#endregion

//#region Delete message
export const deleteMessage = (
  adapter: KulChatAdapter,
  m: KulLLMChoiceMessage,
) => {
  const { get, set } = adapter.state;

  const h = get.history();
  const index = h.indexOf(m);
  if (index !== -1) {
    set.history(() => h.splice(index, 1));
  }
};
//#endregion

//#region Regenerate
export const regenerateMessage = (
  adapter: KulChatAdapter,
  m: KulLLMChoiceMessage,
) => {
  const { get, set } = adapter.state;

  const h = get.history();
  const index = h.indexOf(m);
  if (index !== -1) {
    set.history(() => h.slice(0, index + 1));
  }
  submitPrompt(adapter);
};
//#endregion
