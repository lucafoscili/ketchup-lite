import { prepToolbarJsx } from "./elements/toolbar";
import { prepToolbarHandlers } from "./handlers/toolbar";
import { DEFAULTS, REFS } from "./helpers/constants";
import {
  KulCompareAdapter,
  KulCompareAdapterControllerGetters,
  KulCompareAdapterControllerSetters,
  KulCompareAdapterHandlers,
  KulCompareAdapterInitializerGetters,
  KulCompareAdapterInitializerSetters,
  KulCompareAdapterJsx,
} from "./kul-compare-declarations";

//#region Adapter
export const createAdapter = (
  getters: KulCompareAdapterInitializerGetters,
  setters: KulCompareAdapterInitializerSetters,
  getAdapter: () => KulCompareAdapter,
): KulCompareAdapter => {
  return {
    controller: {
      get: createGetters(getters),
      set: createSetters(setters),
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
  getters: KulCompareAdapterInitializerGetters,
): KulCompareAdapterControllerGetters => {
  return { ...getters, defaults: DEFAULTS() };
};
export const createSetters = (
  setters: KulCompareAdapterInitializerSetters,
): KulCompareAdapterControllerSetters => {
  return setters;
};
//#endregion

//#region Elements
export const createJsx = (
  getAdapter: () => KulCompareAdapter,
): KulCompareAdapterJsx => {
  return prepToolbarJsx(getAdapter);
};
//#endregion

//#region Handlers
export const createHandlers = (
  getAdapter: () => KulCompareAdapter,
): KulCompareAdapterHandlers => {
  return prepToolbarHandlers(getAdapter);
};
//#endregion
