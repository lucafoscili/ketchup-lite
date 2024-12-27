import { KulGenericEvent } from "src/types/GenericTypes";
import { clearSelection, load, toggleButtonSpinner } from "../helpers/utils";
import {
  KulImageviewerAdapter,
  KulImageviewerAdapterHandlers,
} from "../kul-imageviewer-declarations";

export const prepNavigationHandlers = (
  getAdapter: () => KulImageviewerAdapter,
): KulImageviewerAdapterHandlers["navigation"] => {
  return {
    //#region Button handler
    button: async (e) => {
      const { comp, eventType } = e.detail;

      const adapter = getAdapter();
      const { compInstance } = adapter.controller.get;

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

      const adapter = getAdapter();
      const { controller } = adapter;
      const { get, set } = controller;
      const { compInstance, history } = get;
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
      const adapter = getAdapter();
      const { compInstance } = adapter.controller.get;

      compInstance.onKulEvent(e, "kul-event");
    },
    //#endregion
  };
};
