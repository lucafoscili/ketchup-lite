import { kulManagerSingleton } from "src";
import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import { KulCardShapesIds } from "src/components/kul-card/kul-card-declarations";
import { KulCodeEventPayload } from "src/components/kul-code/kul-code-declarations";
import { KulListEventPayload } from "src/components/kul-list/kul-list-declarations";
import { KulToggleEventPayload } from "src/components/kul-toggle/kul-toggle-declarations";

//#region Button
export const button = (e: CustomEvent<KulButtonEventPayload>) => {
  const { eventType, id, originalEvent } = e.detail;

  const { debug, theme } = kulManagerSingleton;

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
          list(originalEvent as CustomEvent<KulListEventPayload>);
          break;
      }
      break;
  }
};
//#endregion

//#region Code
export const code = (e: CustomEvent<KulCodeEventPayload>) => {
  const { comp, eventType } = e.detail;

  const { debug } = kulManagerSingleton;

  switch (eventType) {
    case "ready":
      debug.register(comp);
      break;
    case "unmount":
      debug.unregister(comp);
      break;
  }
};
//#endregion

//#region List
const list = (e: CustomEvent<KulListEventPayload>) => {
  const { eventType, node } = e.detail;

  const { theme } = kulManagerSingleton;

  switch (eventType) {
    case "click":
      theme.set(node.id);
      break;
  }
};
//#endregion

//#region Toggle
export const toggle = (e: CustomEvent<KulToggleEventPayload>) => {
  const { comp, eventType, value } = e.detail;

  const { debug } = kulManagerSingleton;
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
};
//#endregion
