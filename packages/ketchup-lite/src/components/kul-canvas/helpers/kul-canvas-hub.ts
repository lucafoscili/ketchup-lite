import { context } from "src/components/kul-canvas/helpers/kul-canvas-context";
import { coordinates } from "src/components/kul-canvas/helpers/kul-canvas-coordinates";
import { draw } from "src/components/kul-canvas/helpers/kul-canvas-draw";
import {
  KulCanvasAdapter,
  KulCanvasAdapterElementsJsx,
  KulCanvasAdapterHandlers,
} from "src/components/kul-canvas/kul-canvas-declarations";
import { prepCanvasHandlers } from "../handlers/kul-canvas-main";
import { prepCanvasElements } from "../elements/kul-canvas-main";

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
