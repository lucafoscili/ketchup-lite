import { KulChatAdapter } from "src/components/kul-chat/kul-chat-declarations";
import { KulLLMChoiceMessage } from "src/managers/kul-llm/kul-llm-declarations";

export const prepToolbarHandlers = (adapter: KulChatAdapter) => {
  const { handlers, state } = adapter;
  const { get, set } = state;

  return {
    //#region Delete message
    deleteMessage: (m: KulLLMChoiceMessage) => {
      const { history } = get;

      const h = history();
      const index = h.indexOf(m);
      if (index !== -1) {
        set.history(() => h.splice(index, 1));
      }
    },
    //#endregion

    //#region Regenerate
    regenerate: (m: KulLLMChoiceMessage) => {
      const { prompt } = handlers;
      const { history } = get;
      const { submit } = prompt;

      const h = history();
      const index = h.indexOf(m);
      if (index !== -1) {
        set.history(() => h.slice(0, index + 1));
      }
      submit();
    },
    //#endregion
  };
};
