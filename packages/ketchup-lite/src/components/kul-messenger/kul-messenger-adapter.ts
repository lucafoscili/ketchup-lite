import { prepCharacter } from "./elements/character";
import { prepChat } from "./elements/chat";
import { prepOptions } from "./elements/options";
import { prepCharacterHandlers } from "./handlers/character";
import { prepChatHandlers } from "./handlers/chat";
import { prepOptionsHandlers } from "./handlers/options";
import { REFS } from "./helpers/constants";
import {
  KulMessengerAdapter,
  KulMessengerAdapterGetters,
  KulMessengerAdapterHandlers,
  KulMessengerAdapterJsx,
  KulMessengerAdapterSetters,
} from "./kul-messenger-declarations";

//#region Adapter
export const createAdapter = (
  getters: KulMessengerAdapterInitializerGetters,
  setters: KulMessengerAdapterInitializerSetters,
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapter => {
  return {
    controller: {
      get: createGetters(getters),
      set: createSetters(setters, getAdapter),
    },
    elements: {
      jsx: createJsx(getAdapter),
      refs: REFS(),
    },
    handlers: createHandlers(getAdapter),
  };
};
//#endregion

//#region Controller
export const createGetters = (
  getters: KulMessengerAdapterInitializerGetters,
): KulMessengerAdapterGetters => {
  return {
    ...getters,
  };
};
export const createSetters = (
  setters: KulMessengerAdapterInitializerSetters,
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterSetters => {
  return {
    ...setters,
    spinnerStatus: (active) =>
      (getAdapter().elements.refs.details.spinner.kulActive = active),
  };
};
//#endregion

//#region Elements
export const createJsx = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterJsx => {
  return {
    character: prepCharacter(getAdapter),
    chat: prepChat(getAdapter),
    options: prepOptions(getAdapter),
  };
};
//#endregion

//#region Handlers
export const createHandlers = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterHandlers => {
  return {
    character: prepCharacterHandlers(getAdapter),
    chat: prepChatHandlers(getAdapter),
    options: prepOptionsHandlers(getAdapter),
  };
};
//#endregion
