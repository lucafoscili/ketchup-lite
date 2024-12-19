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
  KulCanvasAdapterHandlers,
  KulCanvasAdapterInitializerGetters,
  KulCanvasAdapterInitializerSetters,
  KulCanvasAdapterJsx,
  KulCanvasAdapterToolkit,
} from "./kul-canvas-declarations";

//#region Controller
export const createGetters = (
  getters: KulCanvasAdapterControllerGetters,
): KulCanvasAdapterControllerGetters => {
  return getters;
};
export const createSetters = (
  setters: KulCanvasAdapterControllerSetters,
): KulCanvasAdapterControllerSetters => {
  return setters;
};
//#endregion

//#region Elements
export const createJsx = (
  getAdapter: () => KulCanvasAdapter,
): KulCanvasAdapterJsx => {
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
  getters: KulCanvasAdapterInitializerGetters,
  setters: KulCanvasAdapterInitializerSetters,
  getAdapter: () => KulCanvasAdapter,
): KulCanvasAdapter => {
  return {
    controller: {
      get: createGetters(getters),
      set: createSetters(setters),
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
