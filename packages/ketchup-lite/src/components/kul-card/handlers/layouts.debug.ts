import { kulManagerSingleton } from "src";
import {
  KulCardAdapter,
  KulCardAdapterHandlers,
  KulCardShapesIds,
} from "src/components/kul-card/kul-card-declarations";
import { KulListEventPayload } from "src/components/kul-list/kul-list-declarations";

export const prepDebugHandlers = (
  getAdapter: () => KulCardAdapter,
): KulCardAdapterHandlers["layouts"]["debug"] => {
  const { debug, theme } = kulManagerSingleton;

  return {
    //#region Button
    button: (e) => {
      const { eventType, id, originalEvent } = e.detail;

      const { layouts } = getAdapter().handlers;

      switch (eventType) {
        case "click":
          switch (id) {
            case KulCardShapesIds.CLEAR:
              debug.logs.dump();
              break;
            case KulCardShapesIds.THEME:
              theme.randomTheme();
              break;
          }
          break;
        case "kul-event":
          switch (id) {
            case KulCardShapesIds.THEME:
              layouts.debug.list(
                originalEvent as CustomEvent<KulListEventPayload>,
              );
              break;
          }
          break;
      }
    },
    //#endregion

    //#region Code
    code: (e) => {
      const { comp, eventType } = e.detail;

      switch (eventType) {
        case "ready":
          debug.register(comp);
          break;
        case "unmount":
          debug.unregister(comp);
          break;
      }
    },
    //#endregion

    //#region List
    list: (e) => {
      const { eventType, node } = e.detail;

      switch (eventType) {
        case "click":
          theme.set(node.id);
          break;
      }
    },
    //#endregion

    //#region Toggle
    toggle: (e) => {
      const { comp, eventType, value } = e.detail;

      const boolValue = value === "on" ? true : false;

      switch (eventType) {
        case "change":
          debug.toggle(boolValue, false);
          break;
        case "ready":
          debug.register(comp);
          break;
        case "unmount":
          debug.unregister(comp);
          break;
      }
    },
    //#endregion
  };
};