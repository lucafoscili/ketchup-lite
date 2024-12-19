import {
  KulCanvasAdapter,
  KulCanvasAdapterToolkitCtx,
  KulCanvasType,
} from "../kul-canvas-declarations";

export const ctx = (
  getAdapter: () => KulCanvasAdapter,
): KulCanvasAdapterToolkitCtx => ({
  //#region Clear
  clear: (type: KulCanvasType) => {
    const { ctx, height, width } = getAdapter().toolkit.ctx.get(type);

    ctx.clearRect(0, 0, width, height);
  },
  //#endregion

  //#region Get
  get: (type: KulCanvasType) => {
    const { board, preview } = getAdapter().elements.refs;

    const canvas = type === "board" ? board : preview;
    const ctx = canvas.getContext("2d");
    const { height, width } = ctx.canvas;

    return { ctx, height, width };
  },
  //#endregion

  //#region Redraw
  redraw: (type: KulCanvasType) => {
    const { controller, toolkit } = getAdapter();
    const { points } = controller.get;

    const { ctx, height, width } = toolkit.ctx.get(type);
    toolkit.ctx.clear(type);
    toolkit.ctx.setup(type);

    const pts = points();
    if (pts.length === 1) {
      const singlePoint = pts[0];
      const x = singlePoint.x * width;
      const y = singlePoint.y * height;
      toolkit.draw.shape(type, x, y, true);
    } else if (pts.length > 1) {
      ctx.beginPath();
      const firstPoint = pts[0];
      ctx.moveTo(firstPoint.x * width, firstPoint.y * height);

      for (let i = 1; i < pts.length; i++) {
        const p = pts[i];
        ctx.lineTo(p.x * width, p.y * height);
      }

      ctx.stroke();
    }
  },
  //#endregion

  //#region Setup
  setup: (type: KulCanvasType, isFill = false) => {
    const { controller, toolkit } = getAdapter();
    const { kulColor, kulOpacity, kulSize } = controller.get.compInstance;

    const { ctx } = toolkit.ctx.get(type);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = kulOpacity;
    ctx.globalCompositeOperation = "source-over";

    if (isFill) {
      ctx.fillStyle = kulColor;
    } else {
      ctx.strokeStyle = kulColor;
      ctx.lineWidth = kulSize;
    }
  },
  //#endregion
});
