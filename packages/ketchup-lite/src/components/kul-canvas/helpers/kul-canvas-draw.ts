import { toolkit } from "src/components/kul-canvas/helpers/kul-canvas-hub";
import {
  KulCanvasAdapter,
  KulCanvasType,
} from "src/components/kul-canvas/kul-canvas-declarations";

export const draw = {
  //#region Cursor
  cursor: (adapter: KulCanvasAdapter, e: PointerEvent) => {
    const { elements, state } = adapter;
    const { board } = elements.refs;
    const { compInstance, isPainting } = state.get;

    if (!compInstance || isPainting()) {
      return;
    }

    toolkit.context.clear(adapter, "preview");

    const rect = board.getBoundingClientRect();
    const { x, y } = toolkit.coordinates.get(e, rect);

    toolkit.context.setup(adapter, "preview", true);
    toolkit.draw.shape(adapter, "preview", x, y, true);
  },
  //#endregion

  //#region Shape
  shape: (
    adapter: KulCanvasAdapter,
    type: KulCanvasType,
    x: number,
    y: number,
    isFill = true,
  ) => {
    const { kulBrush, kulSize } = adapter.state.get.compInstance;

    const { ctx } = toolkit.context.get(adapter, type);

    ctx.beginPath();
    switch (kulBrush) {
      case "round":
        ctx.arc(x, y, kulSize / 2, 0, Math.PI * 2);
        break;
      case "square":
        const halfSize = kulSize / 2;
        ctx.rect(x - halfSize, y - halfSize, kulSize, kulSize);
        break;
    }

    if (isFill) {
      ctx.fill();
    } else {
      ctx.stroke();
    }
  },
  //#endregion

  //#region Point
  point: (adapter: KulCanvasAdapter, e: PointerEvent) => {
    const { elements, state } = adapter;
    const { board } = elements.refs;
    const { points } = state.get;

    const rect = board.getBoundingClientRect();

    const { x, y } = toolkit.coordinates.normalize(e, rect);
    points().push({ x, y });
  },
  //#endregion
};
