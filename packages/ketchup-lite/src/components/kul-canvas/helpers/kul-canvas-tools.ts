import { KulCanvas } from "../kul-canvas";
import { KulCanvasAdapter, KulCanvasPoints } from "../kul-canvas-declarations";

//#region coordinates
export const coordinates = {
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

    function getSqDist(p1: KulCanvasPoints[0], p2: KulCanvasPoints[0]): number {
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
//#endregion

//#region context
export const context = {
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
//#endregion

//#region draw
export const draw = {
  cursor: (adapter: KulCanvasAdapter, e: PointerEvent) => {
    const { components, handlers, hooks } = adapter;
    const { refs } = components;
    const { get } = hooks;
    const { comp, isPainting } = get;
    const { board, preview } = refs;

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
    const { components, hooks } = adapter;
    const { refs } = components;
    const { get } = hooks;
    const { board } = refs;
    const { points } = get;

    const rect = board.getBoundingClientRect();

    const { x, y } = coordinates.normalize(e, rect);
    points().push({ x, y });
  },
};
//#endregion
