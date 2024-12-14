import {
  clearHistory,
  clearSelection,
  deleteShape,
  findImage,
  load,
  redo,
  save,
} from "src/components/kul-imageviewer/handlers/kul-imageviewer-main";
import {
  KulImageviewerAdapter,
  KulImageviewerAdapterHandlers,
  KulImageviewerAdapterWidgets,
} from "src/components/kul-imageviewer/kul-imageviewer-declarations";
import { prepExplorer } from "src/components/kul-imageviewer/widgets/kul-imageviewer-explorer";
import { prepImageviewer } from "src/components/kul-imageviewer/widgets/kul-imageviewer-main";

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

export const createWidgets: (
  adapter: KulImageviewerAdapter,
) => KulImageviewerAdapterWidgets["jsx"] = (adapter) => {
  return {
    explorer: prepExplorer(adapter),
    imageviewer: prepImageviewer(adapter),
  };
};