import { prepControls } from "./elements/controls";
import { controlsHandlers } from "./handlers/controls";
import { REFS } from "./helpers/constants";
import {
  KulMasonryAdapter,
  KulMasonryAdapterGetters,
  KulMasonryAdapterHandlers,
  KulMasonryAdapterInitializerGetters,
  KulMasonryAdapterJsx,
} from "./kul-masonry-declarations";

//#region Adapter
export const createAdapter = (
  getters: KulMasonryAdapterInitializerGetters,
  getAdapter: () => KulMasonryAdapter,
): KulMasonryAdapter => {
  return {
    controller: {
      get: createGetters(getters),
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
  getters: KulMasonryAdapterInitializerGetters,
): KulMasonryAdapterGetters => {
  return getters;
};
//#endregion

//#region Elements
export const createJsx = (
  getAdapter: () => KulMasonryAdapter,
): KulMasonryAdapterJsx => {
  return prepControls(getAdapter);
};
//#endregion

//#region Handlers
export const createHandlers = (
  getAdapter: () => KulMasonryAdapter,
): KulMasonryAdapterHandlers => {
  return controlsHandlers(getAdapter);
};
//#endregion
