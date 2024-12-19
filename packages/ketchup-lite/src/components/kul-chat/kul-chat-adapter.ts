import { KulLLMChoiceMessage } from "src/managers/kul-llm/kul-llm-declarations";
import { prepChat } from "./elements/chat";
import { prepSettings } from "./elements/settings";
import { prepToolbar } from "./elements/toolbar";
import { prepChatHandlers } from "./handlers/chat";
import { prepSettingsHandlers } from "./handlers/settings";
import { prepToolbarHandlers } from "./handlers/toolbar";
import { REFS } from "./helpers/constants";
import {
  KulChatAdapter,
  KulChatAdapterControllerGetters,
  KulChatAdapterControllerSetters,
  KulChatAdapterHandlers,
  KulChatAdapterInitializerGetters,
  KulChatAdapterInitializerSetters,
  KulChatAdapterJsx,
} from "./kul-chat-declarations";

//#region Adapter
export const createAdapter = (
  getters: KulChatAdapterInitializerGetters,
  setters: KulChatAdapterInitializerSetters,
  getAdapter: () => KulChatAdapter,
): KulChatAdapter => {
  return {
    controller: {
      get: createGetters(getters, getAdapter),
      set: createSetters(setters),
    },
    elements: {
      jsx: createElementsJsx(getAdapter),
      refs: REFS(),
    },
    handlers: createHandlers(getAdapter),
  };
};
//#endregion

//#region Controller
export const createGetters = (
  getters: KulChatAdapterInitializerGetters,
  getAdapter: () => KulChatAdapter,
): KulChatAdapterControllerGetters => {
  return {
    ...getters,
    newPrompt: async () => {
      const { textarea } = getAdapter().elements.refs.chat;

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
  };
};
export const createSetters = (
  setters: KulChatAdapterInitializerSetters,
): KulChatAdapterControllerSetters => {
  return setters;
};
//#endregion

//#region Elements
export const createElementsJsx = (
  getAdapter: () => KulChatAdapter,
): KulChatAdapterJsx => {
  return {
    chat: prepChat(getAdapter),
    settings: prepSettings(getAdapter),
    toolbar: prepToolbar(getAdapter),
  };
};
//#endregion

//#region Handlers
export const createHandlers = (
  getAdapter: () => KulChatAdapter,
): KulChatAdapterHandlers => {
  return {
    chat: prepChatHandlers(getAdapter),
    settings: prepSettingsHandlers(getAdapter),
    toolbar: prepToolbarHandlers(getAdapter),
  };
};
//#endregion
