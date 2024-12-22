import { prepSideButtonsJsx } from "./elements/side-buttons";
import { prepSideButtonHandlers } from "./handlers/side-buttons";
import { REFS } from "./helpers/constants";
import { autoplay } from "./helpers/navigation";
import {
  KulCarouselAdapter,
  KulCarouselAdapterControllerGetters,
  KulCarouselAdapterControllerSetters,
  KulCarouselAdapterHandlers,
  KulCarouselAdapterInitializerGetters,
  KulCarouselAdapterInitializerSetters,
  KulCarouselAdapterJsx,
} from "./kul-carousel-declarations";

//#region Adapter
export const createAdapter = (
  getters: KulCarouselAdapterInitializerGetters,
  setters: KulCarouselAdapterInitializerSetters,
  getAdapter: () => KulCarouselAdapter,
): KulCarouselAdapter => {
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
  getters: KulCarouselAdapterInitializerGetters,
): KulCarouselAdapterControllerGetters => {
  return getters;
};
export const createSetters = (
  setters: KulCarouselAdapterInitializerSetters,
  getAdapter: () => KulCarouselAdapter,
): KulCarouselAdapterControllerSetters => {
  const { start, stop } = autoplay;

  return {
    ...setters,
    autoplay: {
      start: () => start(getAdapter()),
      stop: () => stop(getAdapter()),
    },
  };
};
//#endregion

//#region Elements
export const createJsx = (
  getAdapter: () => KulCarouselAdapter,
): KulCarouselAdapterJsx => {
  return prepSideButtonsJsx(getAdapter);
};
//#endregion

//#region Handlers
export const createHandlers = (
  getAdapter: () => KulCarouselAdapter,
): KulCarouselAdapterHandlers => {
  return prepSideButtonHandlers(getAdapter);
};
//#endregion
