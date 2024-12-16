import { prepCanvasJsx } from "./elements/canvas";
import { prepCanvasHandlers } from "./handlers/canvas";
import { REFS } from "./helpers/constants";
import { coordinates } from "./helpers/toolkit.coordinates";
import { ctx } from "./helpers/toolkit.ctx";
import { draw } from "./helpers/toolkit.draw";
import {
  KulCanvasAdapter,
  KulCanvasAdapterControllerGetters,
  KulCanvasAdapterControllerSetters,
  KulCanvasAdapterElementsJsx,
  KulCanvasAdapterHandlers,
  KulCanvasAdapterInitializerGetters,
  KulCanvasAdapterInitializerSetters,
  KulCanvasAdapterToolkit,
} from "./kul-canvas-declarations";

//#region Controller
export const createGetters = (
  getters: KulCanvasAdapterControllerGetters,
): KulCanvasAdapterControllerGetters => {
  return {
    ...getters,
  };
};
export const createSetters = (
  setters: KulCanvasAdapterControllerSetters,
): KulCanvasAdapterControllerSetters => {
  return {
    ...setters,
  };
};
//#endregion

//#region Elements
export const createJsx = (
  getAdapter: () => KulCanvasAdapter,
): KulCanvasAdapterElementsJsx => {
  return prepCanvasJsx(getAdapter);
};
export const createRefs = REFS;
//#endregion

//#region Handlers
export const createHandlers = (
  getAdapter: () => KulCanvasAdapter,
): KulCanvasAdapterHandlers => {
  return prepCanvasHandlers(getAdapter);
};
//#endregion

//#region Toolkit
export const getToolkit = (
  getAdapter: () => KulCanvasAdapter,
): KulCanvasAdapterToolkit => ({
  ctx: ctx(getAdapter),
  coordinates,
  draw: draw(getAdapter),
});
//#endregion

//#region Adapter
export const createAdapter = (
  get: KulCanvasAdapterInitializerGetters,
  set: KulCanvasAdapterInitializerSetters,
  getAdapter: () => KulCanvasAdapter,
): KulCanvasAdapter => {
  return {
    controller: {
      get: createGetters(get),
      set: createSetters(set),
    },
    elements: {
      jsx: createJsx(getAdapter),
      refs: createRefs(),
    },
    handlers: createHandlers(getAdapter),
    toolkit: getToolkit(getAdapter),
  };
};
//#endregion
