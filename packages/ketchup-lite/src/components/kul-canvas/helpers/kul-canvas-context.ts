import { toolkit } from "src/components/kul-canvas/helpers/kul-canvas-hub";
import {
  KulCanvasAdapter,
  KulCanvasType,
} from "src/components/kul-canvas/kul-canvas-declarations";

export const context = {
  //#region Clear
  clear: (adapter: KulCanvasAdapter, type: KulCanvasType) => {
    const { ctx, height, width } = toolkit.context.get(adapter, type);

    ctx.clearRect(0, 0, width, height);
  },
  //#endregion

  //#region Get
  get: (adapter: KulCanvasAdapter, type: KulCanvasType) => {
    const { board, preview } = adapter.elements.refs;

    const canvas = type === "board" ? board : preview;
    const ctx = canvas.getContext("2d");
    const { height, width } = ctx.canvas;

    return { ctx, height, width };
  },
  //#endregion

  //#region Redraw
  redraw: (adapter: KulCanvasAdapter, type: KulCanvasType) => {
    const { points } = adapter.state.get;

    const { ctx, height, width } = toolkit.context.get(adapter, type);
    toolkit.context.clear(adapter, type);
    toolkit.context.setup(adapter, type);

    const pts = points();
    if (pts.length === 1) {
      const singlePoint = pts[0];
      const x = singlePoint.x * width;
      const y = singlePoint.y * height;
      toolkit.draw.shape(adapter, type, x, y, true);
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
  setup: (adapter: KulCanvasAdapter, type: KulCanvasType, isFill = false) => {
    const { kulColor, kulOpacity, kulSize } = adapter.state.get.compInstance;

    const { ctx } = toolkit.context.get(adapter, type);

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
};
