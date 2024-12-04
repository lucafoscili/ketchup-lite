import { KulDataDataset } from "../../managers/kul-data/kul-data-declarations";
import { KulEventPayload } from "../../types/GenericTypes";

//#region Events
export type KulAccordionEvent = "click" | "pointerdown" | "ready" | "unmount";
export interface KulAccordionEventPayload
  extends KulEventPayload<"KulAccordion", KulAccordionEvent> {}
//#endregion

//#region Props
export enum KulAccordionProps {
  kulData = "Actual data of the accordion.",
  kulRipple = "When set to true, the pointerdown event will trigger a ripple effect.",
  kulStyle = "Sets a custom CSS style for the component.",
}
export interface KulAccordionPropsInterface {
  kulData?: KulDataDataset;
  kulRipple?: boolean;
  kulStyle?: string;
}
//#endregion
