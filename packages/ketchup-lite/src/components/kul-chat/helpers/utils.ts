import { KulChatAdapter } from "src/components/kul-chat/kul-chat-declarations";
import {
  KulLLMChoiceMessage,
  KulLLMRequest,
} from "src/managers/kul-llm/kul-llm-declarations";

//#region Api call
export const apiCall = async (adapter: KulChatAdapter) => {
  const { get, set } = adapter.controller;
  const { compInstance, history, manager } = get;
  const { kulEndpointUrl } = compInstance;
  const { debug, llm } = manager;

  try {
    const request = newRequest(adapter);
    const response = await llm.fetch(request, kulEndpointUrl);

    const message = response.choices?.[0]?.message?.content;
    const llmMessage: KulLLMChoiceMessage = {
      role: "assistant",
      content: message,
    };
    set.history(() => history().push(llmMessage));
  } catch (error) {
    debug.logs.new(compInstance, `Error calling LLM: ${error}`, "error");
  }
};

//#region calcTokens
export const calcTokens = async (adapter: KulChatAdapter) => {
  const { compInstance, history } = adapter.controller.get;
  const { kulContextWindow, kulSystem } = compInstance;

  if (!kulContextWindow) {
    return 0;
  }

  let count = kulSystem ? kulSystem.length / 4 : 0;
  history().forEach((m) => (count += m.content.length));
  const estimated = count ? count / 4 : 0;
  return (estimated / kulContextWindow) * 100;
};
//#endregion

//#region Clear textarea
export const clearTextarea = async (adapter: KulChatAdapter) => {
  const { textarea } = adapter.elements.refs.chat;

  requestAnimationFrame(async () => {
    await textarea.setValue("");
    await textarea.setFocus();
  });
};
//#endregion

//#region Delete message
export const deleteMessage = (
  adapter: KulChatAdapter,
  m: KulLLMChoiceMessage,
) => {
  const { get, set } = adapter.controller;

  const h = get.history();
  const index = h.indexOf(m);
  if (index !== -1) {
    set.history(() => h.splice(index, 1));
  }
};
//#endregion

//#region newRequest
export const newRequest = (adapter: KulChatAdapter) => {
  const { compInstance, history } = adapter.controller.get;
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

//#region Regenerate
export const regenerateMessage = async (
  adapter: KulChatAdapter,
  m: KulLLMChoiceMessage,
) => {
  const { get, set } = adapter.controller;

  const h = get.history();
  const index = h.indexOf(m);
  if (index !== -1) {
    set.history(() => h.slice(0, index + 1));
  }
  await apiCall(adapter);
  resetPrompt(adapter);
};
//#endregion

//#region Reset prompt
export const resetPrompt = async (adapter: KulChatAdapter) => {
  const { set } = adapter.controller;

  requestAnimationFrame(async () => {
    set.currentPrompt(null);
    clearTextarea(adapter);
  });
};
//#endregion

//#region Submit
export const submitPrompt = async (adapter: KulChatAdapter) => {
  const { get, set } = adapter.controller;
  const { history } = get;

  const userMessage = await get.newPrompt();

  requestAnimationFrame(() => {
    set.currentPrompt(userMessage);
  });

  if (userMessage) {
    const h = history();
    set.history(() => h.push(userMessage));
    await apiCall(adapter);
  }

  resetPrompt(adapter);
};
//#endregion
