import { GenericObject, KulEventPayload } from "../../types/GenericTypes";

/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
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
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
export enum KulTextfieldProps {
  kulDisabled = "Enables or disables the text field to prevent user interaction.",
  kulFullWidth = "Applies a full-width styling to the text field, making it occupy all available horizontal space.",
  kulHelper = "Specifies helper text to display alongside the text field.",
  kulHtmlAttributes = "Allows customization of the input or textarea element through additional HTML attributes.",
  kulIcon = "Defines the icon to be displayed within the text field.",
  kulLabel = "Assigns a label to the text field, improving accessibility and providing context to the user about what kind of input is expected.",
  kulStyle = "Accepts custom CSS styles to apply directly to the text field component.",
  kulStyling = "Determines the overall styling theme of the text field, affecting its shape and border.",
  kulTrailingIcon = "Controls whether the icon should appear after the text input, typically used for action buttons like clear or search.",
  kulValue = "Initializes the text field with a default value when the component is first rendered.",
}
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
/*-------------------------------------------------*/
/*                    S t a t e                    */
/*-------------------------------------------------*/
export type KulTextfieldStatus =
  | "disabled"
  | "filled"
  | "focused"
  | "full-width"
  | "has-icon"
  | "has-label";
