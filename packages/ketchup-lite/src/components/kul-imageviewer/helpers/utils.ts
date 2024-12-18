import { kulManagerSingleton } from "src";
import { KulButton } from "src/components/kul-button/kul-button";
import { KulMasonrySelectedShape } from "src/components/kul-masonry/kul-masonry-declarations";
import {
  KulDataCell,
  KulDataShapes,
} from "src/managers/kul-data/kul-data-declarations";
import { KulImageviewerAdapter } from "../kul-imageviewer-declarations";

//#region Clear history
export const clearHistory = async (
  adapter: KulImageviewerAdapter,
  index: number = null,
) => {
  const { history } = adapter.controller.set;

  if (index === null) {
    history.pop();
    clearSelection(adapter);
  } else {
    history.pop(index);
  }
};
//#endregion

//#region Clear selection
export const clearSelection = async (adapter: KulImageviewerAdapter) => {
  const { controller, elements } = adapter;
  const { masonry } = elements.refs.navigation;
  const { set } = controller;

  set.currentShape({});
  set.history.index(null);
  masonry.setSelectedShape(null);
};
//#endregion

//#region Delete shape
export const deleteShape = async (adapter: KulImageviewerAdapter) => {
  const { findNodeByCell, pop } = kulManagerSingleton.data.node;

  const { compInstance, currentShape } = adapter.controller.get;
  const { kulData } = compInstance;

  await clearHistory(adapter, currentShape().shape.index);

  const cell = findImage(adapter);
  const node = findNodeByCell(kulData, cell);
  pop(kulData.nodes, node);
  compInstance.kulData = { ...kulData };

  await clearSelection(adapter);
};
//#endregion

//#region Find image
export const findImage = (adapter: KulImageviewerAdapter) => {
  const { getAll } = kulManagerSingleton.data.cell.shapes;

  const { compInstance, currentShape } = adapter.controller.get;
  const { kulData } = compInstance;

  const s = currentShape();
  const cells = getAll(kulData, false);

  return cells["image"].find(
    (c) => c.value === s.value || c.kulValue === s.value,
  );
};
//#endregion

//#region Load
export const load = async (adapter: KulImageviewerAdapter) => {
  const { controller, elements } = adapter;
  const { textfield } = elements.refs.navigation;
  const { compInstance } = controller.get;
  const { kulLoadCallback } = compInstance;

  try {
    await kulLoadCallback(compInstance, await textfield.getValue());
    clearHistory(adapter);
  } catch (error) {
    console.error("Load operation failed:", error);
  }
};
//#endregion

//#region Redo
export const redo = async (adapter: KulImageviewerAdapter) => {
  const { controller } = adapter;
  const { get, set } = controller;
  const { current, index } = get.history;

  const currentHistory = current();
  const idx = index();
  if (currentHistory && idx < currentHistory.length - 1) {
    set.history.index(idx + 1);
  }
};
//#endregion

//#region Save
export const save = async (adapter: KulImageviewerAdapter) => {
  const { compInstance, currentShape, history } = adapter.controller.get;
  const { kulData } = compInstance;

  const s = currentShape();
  if (!s) {
    return;
  }
  const index = s.shape.index;
  const shape = s.shape.shape;

  const currentSnapshot = history.currentSnapshot();
  const value = currentSnapshot.value;

  const cell = findImage(adapter);
  cell.value = value;
  cell.kulValue = value;

  updateValue(shape, value);
  await clearHistory(adapter, index);

  compInstance.kulData = { ...kulData };
};
//#endregion

//#region newShape
export const newShape = (
  shape: KulMasonrySelectedShape,
): KulMasonrySelectedShape => {
  return JSON.parse(JSON.stringify(shape));
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

//#region Undo
export const undo = async (adapter: KulImageviewerAdapter) => {
  const { controller } = adapter;
  const { get, set } = controller;
  const { history } = get;
  const { index } = history;

  const idx = index();
  if (idx > 0) {
    const newIdx = idx - 1;
    set.history.index(newIdx);
  }
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
