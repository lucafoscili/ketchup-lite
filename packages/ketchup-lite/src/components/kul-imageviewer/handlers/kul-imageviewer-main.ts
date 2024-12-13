import { kulManagerSingleton } from "src";
import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import { KulCanvasEventPayload } from "src/components/kul-canvas/kul-canvas-declarations";
import {
  IMAGEVIEWER_IDS,
  toggleButtonSpinner,
  updateValue,
} from "src/components/kul-imageviewer/helpers/kul-imageviewer-utils";
import { KulImageviewerAdapter } from "src/components/kul-imageviewer/kul-imageviewer-declarations";
import { KulTreeEventPayload } from "src/components/kul-tree/kul-tree-declarations";

//#region Button handler
export const buttonEventHandler = async (
  adapter: KulImageviewerAdapter,
  e: CustomEvent<KulButtonEventPayload>,
) => {
  const { comp, eventType, id } = e.detail;

  const { handlers, hooks } = adapter;
  const { clearHistory, deleteShape, redo, save, undo } = handlers;
  const { get } = hooks;
  const { currentShape } = get;

  get.comp.onKulEvent(e, "kul-event");

  switch (eventType) {
    case "click":
      switch (id) {
        case IMAGEVIEWER_IDS.clearHistory:
          const index = currentShape().shape.index;
          const cb = async () => clearHistory(index);
          toggleButtonSpinner(comp, cb);
          break;
        case IMAGEVIEWER_IDS.deleteShape:
          toggleButtonSpinner(comp, deleteShape);
          break;
        case IMAGEVIEWER_IDS.redo:
          toggleButtonSpinner(comp, redo);
          break;

        case IMAGEVIEWER_IDS.save:
          toggleButtonSpinner(comp, save);
          break;
        case IMAGEVIEWER_IDS.undo:
          toggleButtonSpinner(comp, undo);
          break;
      }
  }
};
//#endregion

//#region Canvas handler
export const canvasEventHandler = (
  adapter: KulImageviewerAdapter,
  e: CustomEvent<KulCanvasEventPayload>,
) => {
  const { hooks } = adapter;
  const { get } = hooks;
  const { comp } = get;

  comp.onKulEvent(e, "kul-event");
};
//#endregion

//#region Tree handler
export const treeEventHandler = (
  adapter: KulImageviewerAdapter,
  e: CustomEvent<KulTreeEventPayload>,
) => {
  const { hooks } = adapter;
  const { get } = hooks;
  const { comp } = get;

  comp.onKulEvent(e, "kul-event");
};
//#endregion

//#region Clear history
export const clearHistory = async (
  adapter: KulImageviewerAdapter,
  index: number = null,
) => {
  const { handlers, hooks } = adapter;
  const { clearSelection } = handlers;
  const { set } = hooks;
  const { history } = set;

  if (index === null) {
    history.pop();
    clearSelection();
  } else {
    history.pop(index);
  }
};
//#endregion

//#region Clear selection
export const clearSelection = async (adapter: KulImageviewerAdapter) => {
  const { hooks, widgets } = adapter;
  const { refs } = widgets;
  const { set } = hooks;
  const { explorer } = refs;
  const { masonry } = explorer;

  set.currentShape({});
  set.history.index(null);
  masonry.setSelectedShape(null);
};
//#endregion

//#region Delete shape
export const deleteShape = async (adapter: KulImageviewerAdapter) => {
  const { data } = kulManagerSingleton;
  const { handlers, hooks } = adapter;
  const { clearHistory, clearSelection, findImage } = handlers;
  const { get } = hooks;
  const { comp, currentShape } = get;
  const { kulData } = comp;

  await clearHistory(currentShape().shape.index);

  const cell = findImage();
  const node = data.node.findNodeByCell(kulData, cell);
  data.node.pop(kulData.nodes, node);
  comp.kulData = { ...kulData };

  await clearSelection();
};
//#endregion

//#region Find image
export const findImage = (adapter: KulImageviewerAdapter) => {
  const { data } = kulManagerSingleton;
  const { hooks } = adapter;
  const { get } = hooks;
  const { comp, currentShape } = get;
  const { kulData } = comp;

  const s = currentShape();
  const cells = data.cell.shapes.getAll(kulData, false);

  return cells["image"].find(
    (c) => c.value === s.value || c.kulValue === s.value,
  );
};
//#endregion

//#region Load
export const load = async (adapter: KulImageviewerAdapter) => {
  const { handlers, hooks, widgets } = adapter;
  const { refs } = widgets;
  const { clearHistory } = handlers;
  const { get } = hooks;
  const { explorer } = refs;
  const { comp } = get;
  const { textfield } = explorer;
  const { kulLoadCallback } = comp;

  try {
    await kulLoadCallback(comp, await textfield.getValue());
    clearHistory();
  } catch (error) {
    console.error("Load operation failed:", error);
  }
};
//#endregion

//#region Redo
export const redo = async (adapter: KulImageviewerAdapter) => {
  const { hooks } = adapter;
  const { get, set } = hooks;
  const { history } = get;

  const currentHistory = history.current();
  const index = history.index();
  if (currentHistory && index < currentHistory.length - 1) {
    set.history.index(index + 1);
  }
};
//#endregion

//#region Save
export const save = async (adapter: KulImageviewerAdapter) => {
  const { handlers, hooks } = adapter;
  const { clearHistory } = handlers;
  const { get } = hooks;
  const { comp, currentShape, history } = get;
  const { kulData } = comp;

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
  await clearHistory(index);

  comp.kulData = { ...kulData };
};
//#endregion

//#region Undo
export const undo = async (adapter: KulImageviewerAdapter) => {
  const { hooks } = adapter;
  const { get, set } = hooks;
  const { history } = get;

  const index = history.index();
  if (index > 0) {
    const newIndex = index - 1;
    set.history.index(newIndex);
  }
};
//#endregion
