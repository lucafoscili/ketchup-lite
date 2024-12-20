import { KulImagePropsInterface } from "src/components/kul-image/kul-image-declarations";
import { KulEventPayload } from "src/types/GenericTypes";

//#region Events
export type KulBadgeEvent = "click" | "ready" | "unmount";
export interface KulBadgeEventPayload
  extends KulEventPayload<"KulBadge", KulBadgeEvent> {}
//#endregion

//#region Props
export interface KulBadgePropsInterface {
  kulImageProps?: KulImagePropsInterface;
  kulLabel?: string;
  kulStyle?: string;
}
//#endregion
