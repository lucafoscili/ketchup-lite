import { GenericObject, KulEventPayload } from "../../types/GenericTypes";

//#region Events
export type KulTextfieldEvent =
  | "blur"
  | "change"
  | "click"
  | "focus"
  | "input"
  | "ready"
  | "unmount";
export interface KulTextfieldEventPayload
  extends KulEventPayload<"KulTextfield", KulTextfieldEvent> {
  inputValue?: string;
  value?: string;
}
//#endregion

//#region States
export type KulTextfieldStatus =
  | "disabled"
  | "filled"
  | "focused"
  | "full-width"
  | "has-icon"
  | "has-label";
//#endregion

//#region Props
export interface KulTextfieldPropsInterface {
  kulDisabled?: boolean;
  kulFullWidth?: boolean;
  kulHelper?: KulTextfieldHelper;
  kulHtmlAttributes?: GenericObject;
  kulIcon?: string;
  kulLabel?: string;
  kulStyle?: string;
  kulStyling?: KulTextfieldStyling;
  kulTrailingIcon?: boolean;
  kulValue?: string;
}
export interface KulTextfieldHelper {
  showWhenFocused?: boolean;
  value: string;
}
export type KulTextfieldStyling = "flat" | "outlined" | "raised" | "textarea";
//#endregion
