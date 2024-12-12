import * as MAIN_COMPONENTS from "../components/kul-canvas-main";
import * as MAIN_HANDLERS from "../handlers/kul-canvas-main";
import {
  KulCanvasAdapter,
  KulCanvasAdapterComponents,
  KulCanvasAdapterHandlers,
} from "../kul-canvas-declarations";

export const createHandlers: (
  adapter: KulCanvasAdapter,
) => KulCanvasAdapterHandlers = (adapter) => {
  return {
    board: MAIN_HANDLERS.prepBoard(adapter),
    endCapture: (e: PointerEvent) => MAIN_HANDLERS.endCapture(adapter, e),
    preview: MAIN_HANDLERS.prepPreview(adapter),
  };
};

export const createComponents: (
  adapter: KulCanvasAdapter,
) => KulCanvasAdapterComponents["jsx"] = (adapter) => {
  return {
    board: () => MAIN_COMPONENTS.prepBoard(adapter),
    image: () => MAIN_COMPONENTS.prepImage(adapter),
    preview: () => MAIN_COMPONENTS.prepPreview(adapter),
  };
};
