import { IDS } from "../helpers/constants";
import {
  clearHistory,
  deleteShape,
  redo,
  save,
  toggleButtonSpinner,
  undo,
} from "../helpers/utils";
import {
  KulImageviewerAdapter,
  KulImageviewerAdapterHandlers,
} from "../kul-imageviewer-declarations";

export const prepDetailsHandlers = (
  getAdapter: () => KulImageviewerAdapter,
): KulImageviewerAdapterHandlers["details"] => {
  return {
    //#region Button handler
    button: async (e) => {
      const { comp, eventType, id } = e.detail;

      const adapter = getAdapter();
      const { compInstance, currentShape } = adapter.controller.get;

      compInstance.onKulEvent(e, "kul-event");

      switch (eventType) {
        case "click":
          switch (id) {
            case IDS.details.clearHistory:
              const index = currentShape().shape.index;
              const cb = async () => clearHistory(adapter, index);
              toggleButtonSpinner(comp, cb);
              break;
            case IDS.details.deleteShape:
              toggleButtonSpinner(comp, () => deleteShape(adapter));
              break;
            case IDS.details.redo:
              toggleButtonSpinner(comp, () => redo(adapter));
              break;

            case IDS.details.save:
              toggleButtonSpinner(comp, () => save(adapter));
              break;
            case IDS.details.undo:
              toggleButtonSpinner(comp, () => undo(adapter));
              break;
          }
      }
    },
    //#endregion

    //#region Canvas handler
    canvas: (e) => {
      const adapter = getAdapter();
      const { compInstance } = adapter.controller.get;

      compInstance.onKulEvent(e, "kul-event");
    },
    //#endregion

    //#region Tree handler
    tree: (e) => {
      const adapter = getAdapter();
      const { compInstance } = adapter.controller.get;

      compInstance.onKulEvent(e, "kul-event");
    },
    //#endregion
  };
};
