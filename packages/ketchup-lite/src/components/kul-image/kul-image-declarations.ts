import { KulEventPayload } from "../../types/GenericTypes";
import { KulBadgePropsInterface } from "../kul-badge/kul-badge-declarations";

//#region Events
export type KulImageEvent =
  | "click"
  | "contextmenu"
  | "error"
  | "load"
  | "ready"
  | "unmount";
export interface KulImageEventPayload
  extends KulEventPayload<"KulImage", KulImageEvent> {}
//#endregion

//#region Props
export interface KulImagePropsInterface {
  kulBadgeProps?: KulBadgePropsInterface;
  kulColor?: string;
  kulShowSpinner?: boolean;
  kulSizeX?: string;
  kulSizeY?: string;
  kulStyle?: string;
  kulValue?: string;
}
//#endregion
