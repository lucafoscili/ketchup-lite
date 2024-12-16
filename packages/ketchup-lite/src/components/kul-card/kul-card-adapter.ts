import { prepDebug } from "./elements/layouts.debug";
import { prepKeywords } from "./elements/layouts.keywords";
import { prepMaterial } from "./elements/layouts.material";
import { prepUpload } from "./elements/layouts.upload";
import { prepDebugHandlers } from "./handlers/layouts.debug";
import { prepKeywordsHandlers } from "./handlers/layouts.keywords";
import { DEFAULTS, REFS } from "./helpers/constants";
import {
  KulCardAdapter,
  KulCardAdapterControllerGetters,
  KulCardAdapterElementsJsx,
  KulCardAdapterHandlers,
  KulCardAdapterInitializerGetters,
} from "./kul-card-declarations";

//#region Adapter
export const createAdapter = (
  getters: KulCardAdapterInitializerGetters,
  getAdapter: () => KulCardAdapter,
): KulCardAdapter => {
  return {
    controller: {
      get: createGetters(getters),
    },
    elements: {
      jsx: { layouts: createJsx(getAdapter) },
      refs: REFS(),
    },
    handlers: { layouts: createHandlers(getAdapter) },
  };
};
//#endregion

//#region Controller
export const createGetters = (
  getters: KulCardAdapterInitializerGetters,
): KulCardAdapterControllerGetters => {
  return {
    ...getters,
    defaults: DEFAULTS(),
  };
};
//#endregion

//#region Elements
export const createJsx = (
  getAdapter: () => KulCardAdapter,
): KulCardAdapterElementsJsx["layouts"] => {
  return {
    debug: () => prepDebug(getAdapter),
    keywords: () => prepKeywords(getAdapter),
    material: () => prepMaterial(getAdapter),
    upload: () => prepUpload(getAdapter),
  };
};
//#endregion

//#region Handlers
export const createHandlers = (
  getAdapter: () => KulCardAdapter,
): KulCardAdapterHandlers["layouts"] => {
  return {
    debug: prepDebugHandlers(getAdapter),
    keywords: prepKeywordsHandlers(getAdapter),
  };
};
//#endregion
