import { IDS } from "src/components/kul-imageviewer/helpers/kul-imageviewer-constants";
import {
  clearHistory,
  deleteShape,
  redo,
  save,
  toggleButtonSpinner,
  undo,
} from "src/components/kul-imageviewer/helpers/kul-imageviewer-utils";
import {
  KulImageviewerAdapter,
  KulImageviewerAdapterHandlers,
} from "src/components/kul-imageviewer/kul-imageviewer-declarations";

export const imageviewerHandlers = (
  adapter: KulImageviewerAdapter,
): KulImageviewerAdapterHandlers["imageviewer"] => {
  const { compInstance, currentShape } = adapter.state.get;

  return {
    //#region Button handler
    button: async (e) => {
      const { comp, eventType, id } = e.detail;

      compInstance.onKulEvent(e, "kul-event");

      switch (eventType) {
        case "click":
          switch (id) {
            case IDS.imageviewer.clearHistory:
              const index = currentShape().shape.index;
              const cb = async () => clearHistory(adapter, index);
              toggleButtonSpinner(comp, cb);
              break;
            case IDS.imageviewer.deleteShape:
              toggleButtonSpinner(comp, () => deleteShape(adapter));
              break;
            case IDS.imageviewer.redo:
              toggleButtonSpinner(comp, () => redo(adapter));
              break;

            case IDS.imageviewer.save:
              toggleButtonSpinner(comp, () => save(adapter));
              break;
            case IDS.imageviewer.undo:
              toggleButtonSpinner(comp, () => undo(adapter));
              break;
          }
      }
    },
    //#endregion

    //#region Canvas handler
    canvas: (e) => {
      compInstance.onKulEvent(e, "kul-event");
    },
    //#endregion

    //#region Tree handler
    tree: (e) => {
      compInstance.onKulEvent(e, "kul-event");
    },
    //#endregion
  };
};
