import {
  KulCanvasAdapter,
  KulCanvasAdapterToolkitDraw,
  KulCanvasType,
} from "../kul-canvas-declarations";

export const draw = (
  getAdapter: () => KulCanvasAdapter,
): KulCanvasAdapterToolkitDraw => ({
  //#region Cursor
  cursor: (e: PointerEvent) => {
    const { controller, elements, toolkit } = getAdapter();
    const { board } = elements.refs;
    const { compInstance, isPainting } = controller.get;

    if (!compInstance || isPainting()) {
      return;
    }

    toolkit.ctx.clear("preview");

    const rect = board.getBoundingClientRect();
    const { x, y } = toolkit.coordinates.get(e, rect);

    toolkit.ctx.setup("preview", true);
    toolkit.draw.shape("preview", x, y, true);
  },
  //#endregion

  //#region Shape
  shape: (type: KulCanvasType, x: number, y: number, isFill = true) => {
    const { controller, toolkit } = getAdapter();
    const { kulBrush, kulSize } = controller.get.compInstance;

    const { ctx } = toolkit.ctx.get(type);

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
  point: (e: PointerEvent) => {
    const { controller, elements, toolkit } = getAdapter();
    const { board } = elements.refs;
    const { points } = controller.get;

    const rect = board.getBoundingClientRect();

    const { x, y } = toolkit.coordinates.normalize(e, rect);
    points().push({ x, y });
  },
  //#endregion
});
