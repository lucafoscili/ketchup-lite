import {
  KulLLMChoiceMessage,
  KulLLMRequest,
} from "src/managers/kul-llm/kul-llm-declarations";
import { KulChatAdapter } from "../kul-chat-declarations";
import { kulManagerSingleton } from "src";

export const prepPrompt = (adapter: KulChatAdapter) => {
  const { debug, llm } = kulManagerSingleton;

  const { elements, handlers, state } = adapter;
  const { get, set } = state;
  const { refs } = elements;
  const { compInstance } = get;

  return {
    //#region Clear
    clear: async () => {
      const { textarea } = refs.chat;

      await textarea.setValue("");
      await textarea.setFocus();
    },
    //#endregion

    //#region Get
    get: async () => {
      const { textarea } = refs.chat;

      await textarea.setBlur();
      const message = await textarea.getValue();
      if (message) {
        const newMessage: KulLLMChoiceMessage = {
          role: "user",
          content: message,
        };
        return newMessage;
      }
    },
    //#endregion

    //#region newRequest
    newRequest: (): KulLLMRequest => {
      const { kulMaxTokens, kulSeed, kulSystem, kulTemperature } = compInstance;
      const { history } = get;

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
    },
    //#endregion

    //#region Submit
    submit: async () => {
      const { prompt } = handlers;
      const { history } = get;
      const { kulEndpointUrl } = compInstance;

      const message = await prompt.get();
      requestAnimationFrame(() => {
        set.currentPrompt(message);
      });
      const request = prompt.newRequest();
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
    },
    //#endregion
  };
};
