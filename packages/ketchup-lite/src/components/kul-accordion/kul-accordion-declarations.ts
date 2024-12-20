import { KulDataDataset } from "src/managers/kul-data/kul-data-declarations";
import { KulEventPayload } from "src/types/GenericTypes";

//#region Events
export type KulAccordionEvent = "click" | "pointerdown" | "ready" | "unmount";
export interface KulAccordionEventPayload
  extends KulEventPayload<"KulAccordion", KulAccordionEvent> {}
//#endregion

//#region Props
export interface KulAccordionPropsInterface {
  kulData?: KulDataDataset;
  kulRipple?: boolean;
  kulStyle?: string;
}
//#endregion
