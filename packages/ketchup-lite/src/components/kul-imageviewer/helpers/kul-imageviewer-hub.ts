import { prepExplorer } from "../components/kul-imageviewer-explorer";
import { prepImageviewer } from "../components/kul-imageviewer-main";
import {
  clearHistory,
  clearSelection,
  deleteShape,
  findImage,
  load,
  redo,
  save,
} from "../handlers/kul-imageviewer-main";
import {
  KulImageviewerAdapter,
  KulImageviewerAdapterComponents,
  KulImageviewerAdapterHandlers,
} from "../kul-imageviewer-declarations";

export const createComponents: (
  adapter: KulImageviewerAdapter,
) => KulImageviewerAdapterComponents["jsx"] = (adapter) => {
  return {
    explorer: prepExplorer(adapter),
    imageviewer: prepImageviewer(adapter),
  };
};

export const createHandlers: (
  adapter: KulImageviewerAdapter,
) => KulImageviewerAdapterHandlers = (adapter) => {
  return {
    clearHistory: (index: number) => clearHistory(adapter, index),
    clearSelection: () => clearSelection(adapter),
    deleteShape: () => deleteShape(adapter),
    findImage: () => findImage(adapter),
    load: () => load(adapter),
    redo: () => redo(adapter),
    save: () => save(adapter),
    undo: () => clearHistory(adapter),
    updateValue: () => clearHistory(adapter),
  };
};
