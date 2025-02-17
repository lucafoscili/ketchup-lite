import { KulCanvasPoints } from "../kul-canvas-declarations";

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
