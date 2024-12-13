import * as MAIN_HANDLERS from "src/components/kul-canvas/handlers/kul-canvas-main";
import {
  KulCanvasAdapter,
  KulCanvasAdapterHandlers,
  KulCanvasAdapterWidgets,
} from "src/components/kul-canvas/kul-canvas-declarations";
import * as MAIN_WIDGETS from "src/components/kul-canvas/elements/kul-canvas-main";

export const createHandlers: (
  adapter: KulCanvasAdapter,
) => KulCanvasAdapterHandlers = (adapter) => {
  return {
    board: MAIN_HANDLERS.prepBoard(adapter),
    endCapture: (e: PointerEvent) => MAIN_HANDLERS.endCapture(adapter, e),
    preview: MAIN_HANDLERS.prepPreview(adapter),
  };
};

export const createWidgets: (
  adapter: KulCanvasAdapter,
) => KulCanvasAdapterWidgets["jsx"] = (adapter) => {
  return {
    board: () => MAIN_WIDGETS.prepBoard(adapter),
    image: () => MAIN_WIDGETS.prepImage(adapter),
    preview: () => MAIN_WIDGETS.prepPreview(adapter),
  };
};
