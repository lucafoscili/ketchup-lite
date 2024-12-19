import { KulDataDataset } from "src/managers/kul-data/kul-data-declarations";
import { KulEventPayload } from "src/types/GenericTypes";

//#region Events
export type KulButtonEvent =
  | "blur"
  | "click"
  | "focus"
  | "kul-event"
  | "pointerdown"
  | "ready"
  | "unmount";
export interface KulButtonEventPayload
  extends KulEventPayload<"KulButton", KulButtonEvent> {
  value: string;
}
//#endregion

//#region States
export type KulButtonState = "off" | "on";
//#endregion

//#region Props
export interface KulButtonPropsInterface {
  kulData?: KulDataDataset;
  kulDisabled?: boolean;
  kulIcon?: string;
  kulIconOff?: string;
  kulLabel?: string;
  kulRipple?: boolean;
  kulShowSpinner?: boolean;
  kulStyle?: string;
  kulStyling?: KulButtonStyling;
  kulToggable?: boolean;
  kulTrailingIcon?: boolean;
  kulType?: "button" | "submit" | "reset";
  kulValue?: boolean;
}
export type KulButtonStyling =
  | "flat"
  | "floating"
  | "icon"
  | "outlined"
  | "raised";
//#endregion
