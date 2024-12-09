import { KulCanvas } from "../kul-canvas";
import { KulCanvasAdapter, KulCanvasPoints } from "../kul-canvas-declarations";

//#region context
export const context = {
  setup: (ctx: CanvasRenderingContext2D, canvas: KulCanvas, isFill = false) => {
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
  brush: {
    cursor: (adapter: KulCanvasAdapter, e: PointerEvent) => {
      const { actions, components, get } = adapter;
      const { canvas, state } = get;
      const { board, preview } = components.refs;

      const ctx = preview.getContext("2d");

      if (!canvas || state.isPainting()) {
        return;
      }

      actions.preview.clear();

      const rect = board.getBoundingClientRect();
      const { x, y } = getCanvasCoordinate(e, rect);

      actions.preview.setup(true);
      draw.brush.shape(adapter, ctx, x, y, true);
    },
    shape: (
      adapter: KulCanvasAdapter,
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      isFill = true,
    ) => {
      const { canvas } = adapter.get;

      ctx.beginPath();
      switch (canvas.kulBrush) {
        case "round":
          ctx.arc(x, y, canvas.kulSize / 2, 0, Math.PI * 2);
          break;
        case "square":
          const halfSize = canvas.kulSize / 2;
          ctx.rect(x - halfSize, y - halfSize, canvas.kulSize, canvas.kulSize);
          break;
      }

      if (isFill) {
        ctx.fill();
      } else {
        ctx.stroke();
      }
    },
  },
};
//#endregion

//#region getCanvasCoordinate
export const getCanvasCoordinate = (e: PointerEvent, rect: DOMRect) => {
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  x = Math.max(0, Math.min(rect.width, x));
  y = Math.max(0, Math.min(rect.height, y));

  return { x, y };
};
//#endregion

//#region simplifyStroke
export const simplifyStroke = (points: KulCanvasPoints, tolerance: number) => {
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
};
//#endregion

//#region addPoint
export const addPoint = (adapter: KulCanvasAdapter, e: PointerEvent) => {
  const { components, get } = adapter;
  const { board } = components.refs;
  const { points } = get.state;

  const rect = board.getBoundingClientRect();

  const { x, y } = normalizeCoordinate(e, rect);
  const pts = points();
  pts.push({ x, y });
};
//#endregion

//#region normalizeCoordinate
export const normalizeCoordinate = (e: PointerEvent, rect: DOMRect) => {
  let x = (e.clientX - rect.left) / rect.width;
  let y = (e.clientY - rect.top) / rect.height;

  x = Math.max(0, Math.min(1, x));
  y = Math.max(0, Math.min(1, y));

  return { x, y };
};
//#endregion
