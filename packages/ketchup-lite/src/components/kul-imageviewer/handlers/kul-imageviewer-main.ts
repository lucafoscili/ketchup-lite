import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import { KulCanvasEventPayload } from "src/components/kul-canvas/kul-canvas-declarations";
import { IDS } from "src/components/kul-imageviewer/helpers/kul-imageviewer-constants";
import {
  clearHistory,
  deleteShape,
  redo,
  save,
  toggleButtonSpinner,
  undo,
} from "src/components/kul-imageviewer/helpers/kul-imageviewer-utils";
import { KulImageviewerAdapter } from "src/components/kul-imageviewer/kul-imageviewer-declarations";
import { KulTreeEventPayload } from "src/components/kul-tree/kul-tree-declarations";

export const imageviewerHandlers = (adapter: KulImageviewerAdapter) => {
  const { compInstance, currentShape } = adapter.state.get;

  return {
    //#region Button handler
    button: async (e: CustomEvent<KulButtonEventPayload>) => {
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
    canvas: (e: CustomEvent<KulCanvasEventPayload>) => {
      compInstance.onKulEvent(e, "kul-event");
    },
    //#endregion

    //#region Tree handler
    tree: (e: CustomEvent<KulTreeEventPayload>) => {
      compInstance.onKulEvent(e, "kul-event");
    },
    //#endregion
  };
};
