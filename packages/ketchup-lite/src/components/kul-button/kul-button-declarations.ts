import { KulDataDataset } from "../../managers/kul-data/kul-data-declarations";
import { KulEventPayload } from "../../types/GenericTypes";

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
export enum KulButtonProps {
  kulData = "Actual data of the button, used to render dropdown buttons.",
  kulDisabled = "When true, the component is disabled.",
  kulIcon = "Specifies an icon to display.",
  kulIconOff = "Icon to be used for the off state when the button is toggable.",
  kulLabel = "Defines text to display on the button.",
  kulRipple = "When set to true, the pointerdown event will trigger a ripple effect.",
  kulShowSpinner = "When true, a spinner will be shown on the button.",
  kulStyle = "Sets a custom CSS style for the component.",
  kulStyling = 'Defines the button appearance. Possible values are "flat", "floating", "icon", "outlined", and "raised". The default is "raised".',
  kulToggable = "Makes the button toggable between an on and off state.",
  kulTrailingIcon = "If set, displays an icon after the text.",
  kulType = "Defines the button type attribute.",
  kulValue = "If true, the button is marked as checked.",
}
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
