import { KulChatAdapter } from "src/components/kul-chat/kul-chat-declarations";
import { KulLLMChoiceMessage } from "src/managers/kul-llm/kul-llm-declarations";

//#region Delete message
export const deleteMessage = (
  adapter: KulChatAdapter,
  m: KulLLMChoiceMessage,
) => {
  const { handlers, hooks } = adapter;
  const { updateHistory } = handlers;
  const { get } = hooks;
  const { comp, history } = get;

  const index = history().indexOf(m);
  if (index !== -1) {
    const cb = () => history().splice(index, 1);
    updateHistory(cb);
    comp.refresh();
  }
};
//#endregion

//#region Regenerate
export const regenerate = (adapter: KulChatAdapter, m: KulLLMChoiceMessage) => {
  const { handlers, hooks } = adapter;
  const { sendPrompt, updateHistory } = handlers;
  const { get, set } = hooks;
  const { history } = get;

  const index = history().indexOf(m);
  if (index !== -1) {
    const cb = () => {
      const sliced = history().slice(0, index + 1);
      set.history(sliced);
    };
    updateHistory(cb);
    sendPrompt();
  }
};
//#endregion
