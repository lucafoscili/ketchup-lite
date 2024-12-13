import * as MAIN_ELEMENTS from "src/components/kul-canvas/elements/kul-canvas-main";
import * as MAIN_HANDLERS from "src/components/kul-canvas/handlers/kul-canvas-main";
import {
  KulCanvasAdapter,
  KulCanvasAdapterElementsJsx,
  KulCanvasAdapterHandlers,
} from "src/components/kul-canvas/kul-canvas-declarations";

export const createHandlers: (
  adapter: KulCanvasAdapter,
) => KulCanvasAdapterHandlers = (adapter) => {
  return MAIN_HANDLERS.board(adapter);
};

export const createElements: (
  adapter: KulCanvasAdapter,
) => KulCanvasAdapterElementsJsx = (adapter) => {
  return {
    board: () => MAIN_ELEMENTS.prepBoard(adapter),
    image: () => MAIN_ELEMENTS.prepImage(adapter),
    preview: () => MAIN_ELEMENTS.prepPreview(adapter),
  };
};
