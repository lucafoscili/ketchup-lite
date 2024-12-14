import { kulManagerSingleton } from "src";
import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import { CHAT_IDS } from "src/components/kul-chat/helpers/kul-chat-utils";
import { KulChatAdapter } from "src/components/kul-chat/kul-chat-declarations";
import { KulLLMChoiceMessage } from "src/managers/kul-llm/kul-llm-declarations";

export const prepChatHandlers = (adapter: KulChatAdapter) => {
  const { debug, llm } = kulManagerSingleton;

  const { elements, handlers, state } = adapter;
  const { refs } = elements;
  const { get, set } = state;
  const { compInstance } = get;

  return {
    //#region Button
    button: async (e: CustomEvent<KulButtonEventPayload>) => {
      const { eventType, id } = e.detail;

      const { submit } = handlers.chat;
      const { chat } = refs;
      const { stt, textarea } = chat;

      switch (eventType) {
        case "click":
          switch (id) {
            case CHAT_IDS.clear:
              prompt.clear(textarea);
              break;
            case CHAT_IDS.send:
              submit();
              break;
            case CHAT_IDS.settings:
              set.view("settings");
              break;
            case CHAT_IDS.stt:
              llm.speechToText(textarea, stt);
              break;
          }
      }
    },
    //#endregion

    //#region Submit
    submit: async () => {
      const { chat } = refs;
      const { history } = get;
      const { kulEndpointUrl } = compInstance;
      const { textarea } = chat;

      const message = await prompt.get(textarea);
      requestAnimationFrame(() => {
        set.currentPrompt(message);
      });
      const request = prompt.newRequest(compInstance, history());

      try {
        const response = await llm.fetch(request, kulEndpointUrl);
        const message = response.choices?.[0]?.message?.content;
        const llmMessage: KulLLMChoiceMessage = {
          role: "assistant",
          content: message,
        };
        set.history(() => history().push(llmMessage));
        set.currentPrompt(null);
      } catch (error) {
        debug.logs.new(compInstance, `Error calling LLM: ${error}`, "error");
        set.history(() => history().pop());
      }
    },
    //#endregion
  };
};
