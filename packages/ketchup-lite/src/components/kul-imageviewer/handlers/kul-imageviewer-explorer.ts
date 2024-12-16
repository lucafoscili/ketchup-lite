import {
  clearSelection,
  load,
  toggleButtonSpinner,
} from "src/components/kul-imageviewer/helpers/kul-imageviewer-utils";
import {
  KulImageviewerAdapter,
  KulImageviewerAdapterHandlers,
} from "src/components/kul-imageviewer/kul-imageviewer-declarations";
import { KulGenericEvent } from "src/types/GenericTypes";

export const prepExplorerHandlers = (
  adapter: KulImageviewerAdapter,
): KulImageviewerAdapterHandlers["explorer"] => {
  const { compInstance } = adapter.state.get;

  return {
    //#region Button handler
    button: async (e) => {
      const { comp, eventType } = e.detail;

      compInstance.onKulEvent(e, "kul-event");

      switch (eventType) {
        case "click":
          toggleButtonSpinner(comp, () => load(adapter));
          break;
      }
    },
    //#endregion

    //#region Masonry handler
    masonry: (e) => {
      const { eventType, originalEvent, selectedShape } = e.detail;

      const { state } = adapter;
      const { get, set } = state;
      const { history } = get;
      const { current } = history;

      compInstance.onKulEvent(e, "kul-event");

      switch (eventType) {
        case "kul-event":
          const orig = originalEvent as KulGenericEvent;
          switch (orig.detail.eventType) {
            case "click":
              const currentShape = get.currentShape();
              if (currentShape?.shape?.index === selectedShape.index) {
                clearSelection(adapter);
              } else {
                set.currentShape(selectedShape);

                const h = current();
                set.history.index(h ? h.length - 1 : 0);
                set.history.new(selectedShape);
              }
              break;
          }
      }
    },
    //#endregion

    //#region Textfield handler
    textfield: (e) => {
      compInstance.onKulEvent(e, "kul-event");
    },
    //#endregion
  };
};
