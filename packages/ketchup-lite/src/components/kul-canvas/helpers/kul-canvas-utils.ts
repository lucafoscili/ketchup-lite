import {
  KulCanvasAdapter,
  KulCanvasPoints,
  KulCanvasType,
} from "src/components/kul-canvas/kul-canvas-declarations";

//#region getContext
export const getContext = (adapter: KulCanvasAdapter, type: KulCanvasType) => {
  const { elements } = adapter;
  const { refs } = elements;
  const { board, preview } = refs;

  const canvas = type === "board" ? board : preview;
  const ctx = canvas.getContext("2d");
  const { height, width } = ctx.canvas;

  return { ctx, height, width };
};
//#endregion

export const toolkit = {
  context: {
    //#region Clear context
    clear: (adapter: KulCanvasAdapter, type: KulCanvasType) => {
      const { ctx, height, width } = getContext(adapter, type);

      ctx.clearRect(0, 0, width, height);
    },
    //#endregion

    //#region Redraw context
    redraw: (adapter: KulCanvasAdapter, type: KulCanvasType) => {
      const { state } = adapter;
      const { get } = state;
      const { points } = get;

      const { ctx, height, width } = getContext(adapter, type);
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

    //#region Setup context
    setup: (adapter: KulCanvasAdapter, type: KulCanvasType, isFill = false) => {
      const { state } = adapter;
      const { get } = state;
      const { compInstance } = get;
      const { kulColor, kulOpacity, kulSize } = compInstance;

      const { ctx } = getContext(adapter, type);

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
  },
  coordinates: {
    //#region Get coords
    get: (e: PointerEvent, rect: DOMRect) => {
      const { height, left, top, width } = rect;

      let x = e.clientX - left;
      let y = e.clientY - top;

      x = Math.max(0, Math.min(width, x));
      y = Math.max(0, Math.min(height, y));

      return { x, y };
    },
    //#endregion

    //#region Normalize coords
    normalize: (e: PointerEvent, rect: DOMRect) => {
      const { height, left, top, width } = rect;

      let x = (e.clientX - left) / width;
      let y = (e.clientY - top) / height;

      x = Math.max(0, Math.min(1, x));
      y = Math.max(0, Math.min(1, y));

      return { x, y };
    },
    //#endregion

    //#region Simplify coords
    simplify: (points: KulCanvasPoints, tolerance: number) => {
      if (points.length <= 2) {
        return points;
      }

      const sqTolerance = tolerance * tolerance;

      function getSqDist(
        p1: KulCanvasPoints[0],
        p2: KulCanvasPoints[0],
      ): number {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        return dx * dx + dy * dy;
      }

      function simplifyRecursive(
        start: number,
        end: number,
        sqTolerance: number,
        simplified: KulCanvasPoints,
      ) {
        let maxSqDist = sqTolerance;
        let index = -1;

        for (let i = start + 1; i < end; i++) {
          const sqDist = getSqDist(
            points[i],
            getClosestPoint(points[start], points[end], points[i]),
          );
          if (sqDist > maxSqDist) {
            index = i;
            maxSqDist = sqDist;
          }
        }

        if (maxSqDist > sqTolerance) {
          if (index - start > 1)
            simplifyRecursive(start, index, sqTolerance, simplified);
          simplified.push(points[index]);
          if (end - index > 1)
            simplifyRecursive(index, end, sqTolerance, simplified);
        }
      }

      function getClosestPoint(
        p1: KulCanvasPoints[0],
        p2: KulCanvasPoints[0],
        p: KulCanvasPoints[0],
      ) {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const t = ((p.x - p1.x) * dx + (p.y - p1.y) * dy) / (dx * dx + dy * dy);
        return { x: p1.x + t * dx, y: p1.y + t * dy };
      }

      const simplified = [points[0]];
      simplifyRecursive(0, points.length - 1, sqTolerance, simplified);
      simplified.push(points[points.length - 1]);
      return simplified;
    },
    //#endregion
  },
  draw: {
    //#region Cursor draw
    cursor: (adapter: KulCanvasAdapter, e: PointerEvent) => {
      const { elements, state } = adapter;
      const { refs } = elements;
      const { get } = state;
      const { board } = refs;
      const { compInstance, isPainting } = get;

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

    //#region Shape draw
    shape: (
      adapter: KulCanvasAdapter,
      type: KulCanvasType,
      x: number,
      y: number,
      isFill = true,
    ) => {
      const { state } = adapter;
      const { get } = state;
      const { compInstance } = get;
      const { kulBrush, kulSize } = compInstance;

      const { ctx } = getContext(adapter, type);

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

    //#region Point draw
    point: (adapter: KulCanvasAdapter, e: PointerEvent) => {
      const { elements, state } = adapter;
      const { refs } = elements;
      const { get } = state;
      const { board } = refs;
      const { points } = get;

      const rect = board.getBoundingClientRect();

      const { x, y } = toolkit.coordinates.normalize(e, rect);
      points().push({ x, y });
    },
    //#endregion
  },
};
