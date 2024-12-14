import { kulManagerSingleton } from "src";
import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import {
  KulCardAdapter,
  KulCardShapesIds,
} from "src/components/kul-card/kul-card-declarations";
import { KulCodeEventPayload } from "src/components/kul-code/kul-code-declarations";
import { KulListEventPayload } from "src/components/kul-list/kul-list-declarations";
import { KulToggleEventPayload } from "src/components/kul-toggle/kul-toggle-declarations";

export const prepDebugHandlers = (adapter: KulCardAdapter) => {
  const { debug, theme } = kulManagerSingleton;
  const { handlers } = adapter;
  const { layouts } = handlers;

  return {
    //#region Button
    button: (e: CustomEvent<KulButtonEventPayload>) => {
      const { eventType, id, originalEvent } = e.detail;

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
    code: (e: CustomEvent<KulCodeEventPayload>) => {
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
    list: (e: CustomEvent<KulListEventPayload>) => {
      const { eventType, node } = e.detail;

      switch (eventType) {
        case "click":
          theme.set(node.id);
          break;
      }
    },
    //#endregion

    //#region Toggle
    toggle: (e: CustomEvent<KulToggleEventPayload>) => {
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
