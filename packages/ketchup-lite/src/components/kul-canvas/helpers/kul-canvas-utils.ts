import { KulCanvas } from "src/components/kul-canvas/kul-canvas";
import {
  KulCanvasAdapter,
  KulCanvasPoints,
  KulCanvasType,
} from "src/components/kul-canvas/kul-canvas-declarations";

//#region coordinatesTools
export const coordinatesTools = () => {
  return {
    get: (e: PointerEvent, rect: DOMRect) => {
      const { height, left, top, width } = rect;

      let x = e.clientX - left;
      let y = e.clientY - top;

      x = Math.max(0, Math.min(width, x));
      y = Math.max(0, Math.min(height, y));

      return { x, y };
    },
    normalize: (e: PointerEvent, rect: DOMRect) => {
      const { height, left, top, width } = rect;

      let x = (e.clientX - left) / width;
      let y = (e.clientY - top) / height;

      x = Math.max(0, Math.min(1, x));
      y = Math.max(0, Math.min(1, y));

      return { x, y };
    },
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
  };
};
//#endregion

//#region contextTools
export const contextTools = (adapter: KulCanvasAdapter) => {
  const { elements, handlers, state } = adapter;
  const { refs } = elements;
  const { get } = state;

  return {
    clear: (type: KulCanvasType) => {
      const { board, preview } = refs;

      const ctx = getContext(type, board, preview);
      const { height, width } = ctx.canvas;

      ctx.clearRect(0, 0, width, height);
    },
    redraw: (type: KulCanvasType) => {
      const { handlers } = adapter;
      const { points } = get;
      const { preview } = refs;

      const ctx = getContext(type, board, preview);
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
    setup: (canvasEl: HTMLCanvasElement, canvas: KulCanvas, isFill = false) => {
      const ctx = canvasEl.getContext("2d");

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalAlpha = canvas.kulOpacity;
      ctx.globalCompositeOperation = "source-over";

      if (isFill) {
        ctx.fillStyle = canvas.kulColor;
      } else {
        ctx.strokeStyle = canvas.kulColor;
        ctx.lineWidth = canvas.kulSize;
      }
    },
  };
};
//#endregion

//#region drawingTools
export const drawingTools = (adapter: KulCanvasAdapter) => {
  const { elements, handlers, state } = adapter;
  const { refs } = elements;
  const { get } = state;
  const { board, preview } = refs;
  const { comp, isPainting } = get;

  const coordinates = coordinatesTools();
  const { clear } = contextTools(adapter);

  return {
    cursor: (adapter: KulCanvasAdapter, e: PointerEvent) => {
      const ctx = preview.getContext("2d");

      if (!comp || isPainting()) {
        return;
      }

      handlers.preview.clear();

      const rect = board.getBoundingClientRect();
      const { x, y } = coordinates.get(e, rect);

      handlers.preview.setup(true);
      draw.shape(adapter, ctx, x, y, true);
    },
    shape: (
      adapter: KulCanvasAdapter,
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      isFill = true,
    ) => {
      const { hooks } = adapter;
      const { get } = hooks;
      const { comp } = get;
      const { kulBrush, kulSize } = comp;

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
    point: (adapter: KulCanvasAdapter, e: PointerEvent) => {
      const { hooks, widgets } = adapter;
      const { refs } = widgets;
      const { get } = hooks;
      const { board } = refs;
      const { points } = get;

      const rect = board.getBoundingClientRect();

      const { x, y } = coordinates.normalize(e, rect);
      points().push({ x, y });
    },
  };
};
//#endregion

//#region getContext
const getContext = (
  type: KulCanvasType,
  board: HTMLCanvasElement,
  preview: HTMLCanvasElement,
) => (type === "board" ? board.getContext("2d") : preview.getContext("2d"));
//#endregion
