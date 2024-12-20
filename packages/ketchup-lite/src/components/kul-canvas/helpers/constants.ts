import {
  KulCanvasAdapterRefs,
  KulCanvasPropsInterface,
} from "src/components/kul-canvas/kul-canvas-declarations";

//#region Props
export const KUL_CANVAS_PROPS: (keyof KulCanvasPropsInterface)[] = [
  "kulBrush",
  "kulColor",
  "kulCursor",
  "kulImageProps",
  "kulOpacity",
  "kulPreview",
  "kulSize",
  "kulStrokeTolerance",
  "kulStyle",
];
//#endregion

//#region Refs
export const REFS = (): KulCanvasAdapterRefs => {
  return {
    board: null,
    image: null,
    preview: null,
  };
};
//#endregion
