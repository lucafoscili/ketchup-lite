import { context, draw } from "../helpers/kul-canvas-tools";
import { KulCanvasAdapter } from "../kul-canvas-declarations";

//#region Board
export const prepBoard = (adapter: KulCanvasAdapter) => {
  return {
    clear: () => {
      const { components } = adapter;
      const { refs } = components;
      const { board } = refs;

      const ctx = board.getContext("2d");
      const { height, width } = ctx.canvas;

      ctx.clearRect(0, 0, width, height);
    },
    onPointerDown: (e: PointerEvent) => {
      const { components, hooks } = adapter;
      const { refs } = components;
      const { set } = hooks;
      const { board } = refs;

      e.preventDefault();

      board.setPointerCapture(e.pointerId);
      requestAnimationFrame(() => {
        set.isPainting(true);
        set.points([]);
        draw.point(adapter, e);
      });
    },
    onPointerMove: (e: PointerEvent) => {
      e.preventDefault();

      const { handlers, hooks } = adapter;
      const { preview } = handlers;
      const { get } = hooks;
      const { isPainting } = get;
      const { redraw } = preview;

      if (!isPainting()) {
        draw.cursor(adapter, e);
        return;
      }

      draw.point(adapter, e);
      redraw();
    },
    onPointerOut: (e: PointerEvent) => {
      const { handlers, hooks } = adapter;
      const { endCapture } = handlers;
      const { get } = hooks;
      const { isPainting } = get;

      if (isPainting()) {
        endCapture(e);
      }
    },
    onPointerUp: (e: PointerEvent) => {
      const { handlers } = adapter;
      const { endCapture } = handlers;

      endCapture(e);
    },
    setup: (isFill = false) => {
      const { components, hooks } = adapter;
      const { refs } = components;
      const { get } = hooks;
      const { board } = refs;
      const { comp } = get;

      context.setup(board, comp, isFill);
    },
  };
};
//#endregion

//#region Preview
export const prepPreview = (adapter: KulCanvasAdapter) => {
  return {
    clear: () => {
      const { components } = adapter;
      const { refs } = components;
      const { preview } = refs;

      const ctx = preview.getContext("2d");
      const { height, width } = ctx.canvas;

      ctx.clearRect(0, 0, width, height);
    },
    redraw: () => {
      const { components, handlers, hooks } = adapter;
      const { refs } = components;
      const { get } = hooks;
      const { points } = get;
      const { preview } = refs;

      const ctx = preview.getContext("2d");
      const { height, width } = ctx.canvas;

      ctx.clearRect(0, 0, width, height);
      handlers.preview.setup(false);

      const pts = points();
      if (pts.length === 1) {
        const singlePoint = pts[0];
        const x = singlePoint.x * width;
        const y = singlePoint.y * height;
        draw.shape(adapter, ctx, x, y, true);
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
      const { components, hooks } = adapter;
      const { refs } = components;
      const { get } = hooks;
      const { preview } = refs;
      const { comp } = get;

      context.setup(preview, comp, isFill);
    },
  };
};
//#endregion

//#region endCapture
export const endCapture = (adapter: KulCanvasAdapter, e: PointerEvent) => {
  e.preventDefault();

  const { components, handlers, hooks } = adapter;
  const { refs } = components;
  const { get, set } = hooks;
  const { comp, points } = get;
  const { board } = refs;

  board.releasePointerCapture(e.pointerId);
  const ctx = board.getContext("2d");
  const { height, width } = board;

  const pts = points();
  if (pts.length > 0) {
    if (pts.length === 1) {
      handlers.board.setup(true);
      const singlePoint = pts[0];
      const x = singlePoint.x * width;
      const y = singlePoint.y * height;
      draw.shape(adapter, ctx, x, y, true);
    } else {
      handlers.board.setup(false);
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

  handlers.preview.clear();

  comp.onKulEvent(e, "stroke");

  set.isPainting(false);
};
//#endregion
