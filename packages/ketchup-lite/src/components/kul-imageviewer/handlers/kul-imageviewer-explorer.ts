import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import { toggleButtonSpinner } from "src/components/kul-imageviewer/helpers/kul-imageviewer-utils";
import { KulImageviewerAdapter } from "src/components/kul-imageviewer/kul-imageviewer-declarations";
import { KulMasonryEventPayload } from "src/components/kul-masonry/kul-masonry-declarations";
import { KulTextfieldEventPayload } from "src/components/kul-textfield/kul-textfield-declarations";
import { KulGenericEvent } from "src/types/GenericTypes";

//#region Button handler
export const buttonEventHandler = async (
  adapter: KulImageviewerAdapter,
  e: CustomEvent<KulButtonEventPayload>,
) => {
  const { comp, eventType } = e.detail;

  const { handlers, hooks } = adapter;
  const { load } = handlers;
  const { get } = hooks;

  get.comp.onKulEvent(e, "kul-event");

  switch (eventType) {
    case "click":
      toggleButtonSpinner(comp, load);
      break;
  }
};
//#endregion

//#region Masonry handler
export const masonryEventHandler = (
  adapter: KulImageviewerAdapter,
  e: CustomEvent<KulMasonryEventPayload>,
) => {
  const { eventType, originalEvent, selectedShape } = e.detail;

  const { handlers, hooks } = adapter;
  const { clearSelection } = handlers;
  const { get, set } = hooks;
  const { history } = get;
  const { current } = history;

  get.comp.onKulEvent(e, "kul-event");

  switch (eventType) {
    case "kul-event":
      const orig = originalEvent as KulGenericEvent;
      switch (orig.detail.eventType) {
        case "click":
          const currentShape = get.currentShape();
          if (currentShape?.shape?.index === selectedShape.index) {
            clearSelection();
          } else {
            set.currentShape(selectedShape);

            const currentHistory = current();
            set.history.index(currentHistory ? currentHistory.length - 1 : 0);
            set.history.new(selectedShape);
          }
          break;
      }
  }
};
//#endregion

//#region Textfield handler
export const textfieldEventHandler = (
  adapter: KulImageviewerAdapter,
  e: CustomEvent<KulTextfieldEventPayload>,
) => {
  const { hooks } = adapter;
  const { get } = hooks;
  const { comp } = get;

  comp.onKulEvent(e, "kul-event");
};
//#endregion
