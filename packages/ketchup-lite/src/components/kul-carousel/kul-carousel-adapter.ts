import { prepSideButtonsJsx } from "./elements/side-buttons";
import { prepSideButtonHandlers } from "./handlers/side-buttons";
import { REFS } from "./helpers/constants";
import { autoplay, navigation } from "./helpers/navigation";
import {
  KulCarouselAdapter,
  KulCarouselAdapterControllerGetters,
  KulCarouselAdapterControllerSetters,
  KulCarouselAdapterElementsJsx,
  KulCarouselAdapterHandlers,
  KulCarouselAdapterInitializerGetters,
  KulCarouselAdapterInitializerSetters,
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
  return {
    ...getters,
  };
};
export const createSetters = (
  setters: KulCarouselAdapterInitializerSetters,
  getAdapter: () => KulCarouselAdapter,
): KulCarouselAdapterControllerSetters => {
  const { start, stop } = autoplay;
  const { next, previous, toSlide } = navigation;

  return {
    autoplay: {
      start: () => start(getAdapter()),
      stop: () => stop(getAdapter()),
    },
    index: {
      current: (value) => toSlide(getAdapter(), value),
      next: () => next(getAdapter()),
      previous: () => previous(getAdapter()),
    },
    ...setters,
  };
};
//#endregion

//#region Elements
export const createJsx = (
  getAdapter: () => KulCarouselAdapter,
): KulCarouselAdapterElementsJsx => {
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
