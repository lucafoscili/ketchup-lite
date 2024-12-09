import {
  KulCanvasAdapter,
  KulCanvasAdapterActions,
} from "../kul-canvas-declarations";
import { context, draw } from "./kul-canvas-helpers";

export const createActions: (
  adapter: KulCanvasAdapter,
) => KulCanvasAdapterActions = (adapter) => {
  return {
    //#region board
    board: {
      clear: () => {
        const { board } = adapter.components.refs;

        const ctx = board.getContext("2d");
        const { height, width } = ctx.canvas;

        ctx.clearRect(0, 0, width, height);
      },
      setup: (isFill = false) => {
        const { components, get } = adapter;
        const { canvas } = get;
        const { board } = components.refs;

        const ctx = board.getContext("2d");

        context.setup(ctx, canvas, isFill);
      },
    },
    //#endregion

    //#region preview
    preview: {
      clear: () => {
        const { preview } = adapter.components.refs;

        const ctx = preview.getContext("2d");
        const { height, width } = ctx.canvas;

        ctx.clearRect(0, 0, width, height);
      },
      redraw: () => {
        const { actions, components, get } = adapter;
        const { points } = get.state;
        const { refs } = components;
        const { preview } = refs;

        const ctx = preview.getContext("2d");
        const { height, width } = ctx.canvas;

        ctx.clearRect(0, 0, width, height);
        actions.preview.setup(false);

        const pts = points();
        if (pts.length === 1) {
          const singlePoint = pts[0];
          const x = singlePoint.x * width;
          const y = singlePoint.y * height;
          draw.brush.shape(adapter, ctx, x, y, true);
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
      setup: (isFill = false) => {
        const { components, get } = adapter;
        const { canvas } = get;
        const { preview } = components.refs;

        const ctx = preview.getContext("2d");
        context.setup(ctx, canvas, isFill);
      },
    },
    //#endregion

    //#region endCapture
    endCapture: (e) => {
      e.preventDefault();

      const { actions, components, get, set } = adapter;
      const { points } = get.state;
      const { board } = components.refs;
      const { state } = set;

      board.releasePointerCapture(e.pointerId);
      const ctx = board.getContext("2d");
      const { height, width } = board;

      const pts = points();
      if (pts.length > 0) {
        if (pts.length === 1) {
          actions.board.setup(true);
          const singlePoint = pts[0];
          const x = singlePoint.x * width;
          const y = singlePoint.y * height;
          draw.brush.shape(adapter, ctx, x, y, true);
        } else {
          actions.board.setup(false);
          ctx.beginPath();
          const firstPoint = pts[0];
          ctx.moveTo(firstPoint.x * width, firstPoint.y * height);

          for (let i = 1; i < pts.length; i++) {
            const p = pts[i];
            ctx.lineTo(p.x * width, p.y * height);
          }
          ctx.stroke();
        }
      }

      actions.preview.clear();

      get.canvas.onKulEvent(e, "stroke");

      state.isPainting(false);
    },
    //#endregion
  };
};
