import { prepDetails } from "./elements/details";
import { prepNavigation } from "./elements/navigation";
import { prepDetailsHandlers } from "./handlers/details";
import { prepNavigationHandlers } from "./handlers/navigation";
import { REFS } from "./helpers/constants";
import {
  KulImageviewerAdapter,
  KulImageviewerAdapterControllerGetters,
  KulImageviewerAdapterControllerSetters,
  KulImageviewerAdapterJsx,
  KulImageviewerAdapterHandlers,
  KulImageviewerAdapterInitializerGetters,
  KulImageviewerAdapterInitializerSetters,
} from "./kul-imageviewer-declarations";

//#region Adapter
export const createAdapter = (
  getters: KulImageviewerAdapterInitializerGetters,
  setters: KulImageviewerAdapterInitializerSetters,
  getAdapter: () => KulImageviewerAdapter,
): KulImageviewerAdapter => {
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
  getters: KulImageviewerAdapterInitializerGetters,
): KulImageviewerAdapterControllerGetters => {
  return getters;
};
export const createSetters = (
  setters: KulImageviewerAdapterInitializerSetters,
  getAdapter: () => KulImageviewerAdapter,
): KulImageviewerAdapterControllerSetters => {
  return {
    ...setters,
    spinnerStatus: (active) =>
      (getAdapter().elements.refs.details.spinner.kulActive = active),
  };
};
//#endregion

//#region Elements
export const createJsx = (
  getAdapter: () => KulImageviewerAdapter,
): KulImageviewerAdapterJsx => {
  return {
    details: prepDetails(getAdapter),
    navigation: prepNavigation(getAdapter),
  };
};
//#endregion

//#region Handlers
export const createHandlers = (
  getAdapter: () => KulImageviewerAdapter,
): KulImageviewerAdapterHandlers => {
  return {
    details: prepDetailsHandlers(getAdapter),
    navigation: prepNavigationHandlers(getAdapter),
  };
};
//#endregion
