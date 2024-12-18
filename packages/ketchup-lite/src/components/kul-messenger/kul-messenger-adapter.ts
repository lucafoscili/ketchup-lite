import { prepDetails } from "./elements/details";
import { prepNavigation } from "./elements/navigation";
import { prepDetailsHandlers } from "./handlers/details";
import { prepNavigationHandlers } from "./handlers/navigation";
import { REFS } from "./helpers/constants";
import {
  KulMessengerAdapter,
  KulMessengerAdapterJsx,
  KulMessengerAdapterHandlers,
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
): KulMessengerAdapterControllerGetters => {
  return {
    ...getters,
  };
};
export const createSetters = (
  setters: KulMessengerAdapterInitializerSetters,
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterControllerSetters => {
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
    details: prepDetails(getAdapter),
    navigation: prepNavigation(getAdapter),
  };
};
//#endregion

//#region Handlers
export const createHandlers = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterHandlers => {
  return {
    details: prepDetailsHandlers(getAdapter),
    navigation: prepNavigationHandlers(getAdapter),
  };
};
//#endregion
