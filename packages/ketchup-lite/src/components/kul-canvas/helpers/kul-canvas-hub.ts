import { prepCanvasElements } from "src/components/kul-canvas/elements/kul-canvas-main";
import { prepCanvasHandlers } from "src/components/kul-canvas/handlers/kul-canvas-main";
import { context } from "src/components/kul-canvas/helpers/kul-canvas-context";
import { coordinates } from "src/components/kul-canvas/helpers/kul-canvas-coordinates";
import { draw } from "src/components/kul-canvas/helpers/kul-canvas-draw";
import {
  KulCanvasAdapter,
  KulCanvasAdapterElementsJsx,
  KulCanvasAdapterHandlers,
} from "src/components/kul-canvas/kul-canvas-declarations";

export const createHandlers: (
  adapter: KulCanvasAdapter,
) => KulCanvasAdapterHandlers = (adapter) => {
  return prepCanvasHandlers(adapter);
};

export const createElements: (
  adapter: KulCanvasAdapter,
) => KulCanvasAdapterElementsJsx = (adapter) => {
  return prepCanvasElements(adapter);
};

export const toolkit = {
  context,
  coordinates,
  draw,
};
