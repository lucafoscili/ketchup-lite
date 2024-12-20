import { KulEventPayload } from "src/types/GenericTypes";

//#region Events
export type KulToggleEvent =
  | "blur"
  | "change"
  | "focus"
  | "pointerdown"
  | "ready"
  | "unmount";
export interface KulToggleEventPayload
  extends KulEventPayload<"KulToggle", KulToggleEvent> {
  value: string;
  valueAsBoolean: boolean;
}
//#endregion

//#region States
export type KulToggleState = "off" | "on";
//#endregion

//#region Props
export interface KulTogglePropsInterface {
  kulDisabled?: boolean;
  kulLabel?: string;
  kulLeadingLabel?: boolean;
  kulRipple?: boolean;
  kulStyle?: string;
  kulValue?: boolean;
}
//#endregion
