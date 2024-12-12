import { KulButton } from "src/components/kul-button/kul-button";
import { KulMasonrySelectedShape } from "src/components/kul-masonry/kul-masonry-declarations";
import {
  KulDataCell,
  KulDataShapes,
} from "src/managers/kul-data/kul-data-declarations";

//#region Explorer IDs
export const EXPLORER_IDS = {
  load: "explorer-load",
  masonry: "explorer-masonry",
  textfield: "explorer-textfield",
};
//#endregion

//#region Imageviewer IDs
export const IMAGEVIEWER_IDS = {
  canvas: "imageviewer-canvas",
  clearHistory: "imageviewer-clear-history",
  deleteShape: "imageviewer-delete-shape",
  redo: "imageviewer-redo",
  save: "imageviewer-save",
  spinner: "imageviewer-spinner",
  tree: "imageviewer-tree",
  undo: "imageviewer-undo",
};
//#endregion

//#region newShape
export const newShape = (
  shape: KulMasonrySelectedShape,
): KulMasonrySelectedShape => {
  return JSON.parse(JSON.stringify(shape));
};
//#endregion

//#region updateValue
export const updateValue = (
  shape: Partial<KulDataCell<KulDataShapes>>,
  value: string,
) => {
  const s = shape as Partial<KulDataCell<"image">>;
  shape.value = value;
  if (s.kulValue) {
    s.kulValue = value;
  }
};
//#endregion

//#region toggleButtonSpinner
export const toggleButtonSpinner = async (
  button: KulButton,
  cb: () => Promise<unknown>,
) => {
  requestAnimationFrame(() => (button.kulShowSpinner = true));

  await cb();

  requestAnimationFrame(() => (button.kulShowSpinner = false));
};
//#endregion
