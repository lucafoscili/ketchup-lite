import { toolkit } from "src/components/kul-canvas/helpers/kul-canvas-hub";
import { KulCanvasAdapter } from "src/components/kul-canvas/kul-canvas-declarations";

export const board = (adapter: KulCanvasAdapter) => {
  return {
    //#region endCapture
    endCapture: (e: PointerEvent) => {
      e.preventDefault();

      const { elements, state } = adapter;
      const { refs } = elements;
      const { get, set } = state;
      const { compInstance, points } = get;
      const { board } = refs;

      board.releasePointerCapture(e.pointerId);
      const { ctx, height, width } = toolkit.context.get(adapter, "board");

      const pts = points();
      if (pts.length > 0) {
        if (pts.length === 1) {
          toolkit.context.setup(adapter, "board", true);

          const singlePoint = pts[0];
          const x = singlePoint.x * width;
          const y = singlePoint.y * height;

          toolkit.draw.shape(adapter, "board", x, y, true);
        } else {
          toolkit.context.setup(adapter, "board");

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

      toolkit.context.clear(adapter, "preview");

      compInstance.onKulEvent(e, "stroke");

      set.isPainting(false);
    },
    //#endregion

    //#region onPointerDown
    onPointerDown: (e: PointerEvent) => {
      const { elements, state } = adapter;
      const { refs } = elements;
      const { set } = state;
      const { board } = refs;

      e.preventDefault();

      board.setPointerCapture(e.pointerId);
      requestAnimationFrame(() => {
        set.isPainting(true);
        set.points([]);

        toolkit.draw.point(adapter, e);
      });
    },
    //#endregion

    //#region onPointerMove
    onPointerMove: (e: PointerEvent) => {
      e.preventDefault();

      const { state } = adapter;
      const { get } = state;
      const { isPainting } = get;

      if (!isPainting()) {
        toolkit.draw.cursor(adapter, e);
        return;
      }

      toolkit.draw.point(adapter, e);
      toolkit.context.redraw(adapter, "preview");
    },
    //#endregion

    //#region onPointerOut
    onPointerOut: (e: PointerEvent) => {
      const { handlers, state } = adapter;
      const { endCapture } = handlers;
      const { get } = state;
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