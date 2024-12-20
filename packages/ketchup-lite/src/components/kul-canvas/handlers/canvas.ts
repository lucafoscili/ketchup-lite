import {
  KulCanvasAdapter,
  KulCanvasAdapterHandlers,
} from "src/components/kul-canvas/kul-canvas-declarations";

export const prepCanvasHandlers = (
  getAdapter: () => KulCanvasAdapter,
): KulCanvasAdapterHandlers => {
  return {
    board: {
      //#region endCapture
      endCapture: (e) => {
        e.preventDefault();

        const { controller, elements, toolkit } = getAdapter();
        const { get, set } = controller;
        const { compInstance, points } = get;
        const { board } = elements.refs;

        board.releasePointerCapture(e.pointerId);
        const { ctx, height, width } = toolkit.ctx.get("board");

        const pts = points();
        if (pts.length > 0) {
          if (pts.length === 1) {
            toolkit.ctx.setup("board", true);

            const singlePoint = pts[0];
            const x = singlePoint.x * width;
            const y = singlePoint.y * height;

            toolkit.draw.shape("board", x, y, true);
          } else {
            toolkit.ctx.setup("board");

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

        toolkit.ctx.clear("preview");

        compInstance.onKulEvent(e, "stroke");

        set.isPainting(false);
      },
      //#endregion

      //#region onPointerDown
      onPointerDown: (e) => {
        e.preventDefault();

        const { controller, elements, toolkit } = getAdapter();
        const { set } = controller;
        const { board } = elements.refs;

        board.setPointerCapture(e.pointerId);
        requestAnimationFrame(() => {
          set.isPainting(true);
          set.points([]);

          toolkit.draw.point(e);
        });
      },
      //#endregion

      //#region onPointerMove
      onPointerMove: (e) => {
        e.preventDefault();

        const { controller, toolkit } = getAdapter();
        const { isPainting } = controller.get;

        if (!isPainting()) {
          toolkit.draw.cursor(e);
          return;
        }

        toolkit.draw.point(e);
        toolkit.ctx.redraw("preview");
      },
      //#endregion

      //#region onPointerOut
      onPointerOut: (e) => {
        const { controller, handlers } = getAdapter();
        const { isPainting } = controller.get;
        const { endCapture } = handlers.board;

        if (isPainting()) {
          endCapture(e);
        }
      },
      onPointerUp: (e: PointerEvent) => {
        const { handlers } = getAdapter();
        const { endCapture } = handlers.board;

        endCapture(e);
      },
      //#endregion
    },
  };
};
