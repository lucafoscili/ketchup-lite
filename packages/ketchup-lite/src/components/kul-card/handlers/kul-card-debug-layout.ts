import { kulManagerInstance } from "src/managers/kul-manager/kul-manager";
import { KulButtonEventPayload } from "../../kul-button/kul-button-declarations";
import { KulCodeEventPayload } from "../../kul-code/kul-code-declarations";
import { KulListEventPayload } from "../../kul-list/kul-list-declarations";
import { KulToggleEventPayload } from "../../kul-toggle/kul-toggle-declarations";
import { KulCardShapesIds } from "../kul-card-declarations";

//#region Button
export const button = (e: CustomEvent<KulButtonEventPayload>) => {
  const { eventType, id, originalEvent } = e.detail;

  const { debug, theme } = kulManagerInstance();

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

  const { debug } = kulManagerInstance();

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

  const { theme } = kulManagerInstance();

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

  const { debug } = kulManagerInstance();
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
