import { KulEventPayload } from "src/types/GenericTypes";

//#region Events
export type KulSliderEvent =
  | "blur"
  | "change"
  | "focus"
  | "input"
  | "pointerdown"
  | "ready"
  | "unmount";
export interface KulSliderEventPayload
  extends KulEventPayload<"KulSlider", KulSliderEvent> {
  value: KulSliderValue;
}
//#endregion

//#region State
export interface KulSliderValue {
  display: number;
  real: number;
}
//#endregion

//#region Props
export interface KulSliderPropsInterface {
  kulDisabled?: boolean;
  kulLabel?: string;
  kulLeadingLabel?: boolean;
  kulMax?: number;
  kulMin?: number;
  kulRipple?: boolean;
  kulStep?: number;
  kulStyle?: string;
  kulValue?: number;
}
//#endregion
