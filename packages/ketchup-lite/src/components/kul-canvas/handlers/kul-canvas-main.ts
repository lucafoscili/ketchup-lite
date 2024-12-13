import {
  draw,
  setupContext,
} from "src/components/kul-canvas/helpers/kul-canvas-utils";
import { KulCanvasAdapter } from "src/components/kul-canvas/kul-canvas-declarations";

export const board = (adapter: KulCanvasAdapter) => {
  return {
    //#region endCapture
    endCapture: (e: PointerEvent) => {
      e.preventDefault();

      const { elements, handlers, state } = adapter;
      const { refs } = elements;
      const { get, set } = state;
      const { compInstance, points } = get;
      const { board } = refs;

      board.releasePointerCapture(e.pointerId);
      const ctx = board.getContext("2d");
      const { height, width } = board;

      const pts = points();
      if (pts.length > 0) {
        if (pts.length === 1) {
          setupContext(board, compInstance, true);
          const singlePoint = pts[0];
          const x = singlePoint.x * width;
          const y = singlePoint.y * height;
          draw.shape(adapter, ctx, x, y, true);
        } else {
          setupContext(board, compInstance, false);
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
    },
    //#endregion

    //#region onPointerDown
    onPointerDown: (e: PointerEvent) => {
      const { hooks, widgets } = adapter;
      const { refs } = widgets;
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
    //#endregion

    //#region onPointerMove
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
    //#endregion

    //#region onPointerOut
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
    //#endregion
  };
};
