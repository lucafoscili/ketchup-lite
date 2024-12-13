import { kulManagerSingleton } from "src";
import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import { CHAT_IDS } from "src/components/kul-chat/helpers/kul-chat-utils";
import { KulChatAdapter } from "src/components/kul-chat/kul-chat-declarations";
import { KulProgressbarEventPayload } from "src/components/kul-progressbar/kul-progressbar-declarations";
import {
  KulLLMChoiceMessage,
  KulLLMRequest,
} from "src/managers/kul-llm/kul-llm-declarations";

//#region Button handler
export const buttonEventHandler = async (
  adapter: KulChatAdapter,
  e: CustomEvent<KulButtonEventPayload>,
) => {
  const { eventType, id } = e.detail;

  const { handlers, hooks, widgets } = adapter;
  const { send, stt } = handlers;
  const { refs } = widgets;
  const { set } = hooks;
  const { chat } = refs;
  const { prompt } = chat;

  switch (eventType) {
    case "click":
      switch (id) {
        case CHAT_IDS.clear:
          await prompt.setValue("");
          await prompt.setFocus();
          break;
        case CHAT_IDS.send:
          send();
          break;
        case CHAT_IDS.settings:
          set.view("settings");
          break;
        case CHAT_IDS.stt:
          stt();
          break;
      }
  }
};
//#endregion

//#region Progressbar handler
export const progressbarEventHandler = async (
  adapter: KulChatAdapter,
  e: CustomEvent<KulProgressbarEventPayload>,
) => {
  const { eventType } = e.detail;

  const { handlers } = adapter;
  const { updateTokensCount } = handlers;

  switch (eventType) {
    case "ready":
      updateTokensCount();
      break;
  }
};
//#endregion

//#region Disable interactivity
export const disableInteractivity = (
  adapter: KulChatAdapter,
  shouldDisable: boolean,
) => {
  const { widgets } = adapter;
  const { refs } = widgets;
  const { chat } = refs;
  const { prompt, send, stt } = chat;

  send.kulShowSpinner = shouldDisable;
  prompt.kulDisabled = shouldDisable;
  stt.kulDisabled = shouldDisable;
};
//#endregion

//#region Send
export const send = async (adapter: KulChatAdapter) => {
  const { handlers, hooks, widgets } = adapter;
  const { refs } = widgets;
  const { sendPrompt, updateHistory } = handlers;
  const { get, set } = hooks;
  const { chat } = refs;
  const { prompt } = chat;
  const { history } = get;

  await prompt.setBlur();
  const message = await prompt.getValue();
  if (message) {
    const newMessage: KulLLMChoiceMessage = {
      role: "user",
      content: message,
    };
    const cb = () => {
      const updatedH = [...history(), newMessage];
      set.history(updatedH);
    };
    updateHistory(cb);
    sendPrompt();
  }
};
//#endregion

//#region Send prompt
export const sendPrompt = async (adapter: KulChatAdapter) => {
  const { debug, llm } = kulManagerSingleton;
  const { handlers, hooks, widgets } = adapter;
  const { refs } = widgets;
  const { disableInteractivity, updateHistory } = handlers;
  const { get } = hooks;
  const { chat } = refs;
  const { comp, history } = get;
  const { prompt, spinner } = chat;
  const { kulEndpointUrl, kulMaxTokens, kulSeed, kulSystem, kulTemperature } =
    comp;

  requestAnimationFrame(() => {
    spinner.kulActive = true;
    disableInteractivity(true);
  });

  const request: KulLLMRequest = {
    temperature: kulTemperature,
    max_tokens: kulMaxTokens,
    seed: kulSeed,
    messages: history().map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
  };

  if (kulSystem) {
    request.messages.unshift({
      role: "system",
      content: kulSystem,
    });
  }

  try {
    const response = await llm.fetch(request, kulEndpointUrl);
    const message = response.choices?.[0]?.message?.content;
    const llmMessage: KulLLMChoiceMessage = {
      role: "assistant",
      content: message,
    };
    const cb = () => history().push(llmMessage);
    updateHistory(cb);
    await comp.refresh();

    requestAnimationFrame(() => {
      disableInteractivity(false);
      spinner.kulActive = false;
    });

    await prompt.setValue("");
    await prompt.setFocus();
  } catch (error) {
    debug.logs.new(comp, `Error calling LLM: ${error}`, "error");
    const cb = () => history().pop();
    updateHistory(cb);
  }
};
//#endregion

//#region Update history
export const updateHistory = async (
  adapter: KulChatAdapter,
  cb: () => unknown,
) => {
  const { handlers, hooks } = adapter;
  const { updateTokensCount } = handlers;
  const { get } = hooks;
  const { comp } = get;

  cb();
  updateTokensCount();
  comp.onKulEvent(new CustomEvent("update"), "update");
};
//#endregion

//#region STT
export const stt = (adapter: KulChatAdapter) => {
  const { llm } = kulManagerSingleton;
  const { widgets } = adapter;
  const { refs } = widgets;
  const { chat } = refs;
  const { prompt, stt } = chat;

  llm.speechToText(prompt, stt);
};
//#endregion

//#region Update tokens count
export const updateTokensCount = async (adapter: KulChatAdapter) => {
  const { hooks, widgets } = adapter;
  const { refs } = widgets;
  const { get } = hooks;
  const { comp, history } = get;
  const { chat, settings } = refs;
  const { kulContextWindow, kulSystem } = comp;
  const { progressbar } = chat;
  const { system } = settings;

  if (!kulContextWindow || !progressbar) {
    return;
  }

  let count = kulSystem ? kulSystem.length / 4 : 0;
  history().forEach((m) => (count += m.content.length));
  const estimated = count ? count / 4 : 0;
  const value = (estimated / kulContextWindow) * 100;

  requestAnimationFrame(() => {
    if (progressbar) {
      if (value > 90) {
        progressbar.classList.add("kul-danger");
      } else {
        progressbar.classList.remove("kul-danger");
      }
      progressbar.kulValue = value;
      progressbar.title = `Estimated tokens used: ${estimated}/${kulContextWindow}`;
    }
    if (system) {
      system.setValue(kulSystem);
    }
  });
};
//#endregion
