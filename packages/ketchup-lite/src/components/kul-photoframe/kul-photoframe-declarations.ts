import { GenericObject, KulEventPayload } from "src/types/GenericTypes";

//#region Events
export type KulPhotoframeEvent = "load" | "ready" | "unmount";
export interface KulPhotoframeEventPayload
  extends KulEventPayload<"KulPhotoframe", KulPhotoframeEvent> {
  isPlaceholder?: boolean;
}
//#endregion

//#region Props
export interface KulPhotoframePropsInterface {
  kulPlaceholder?: GenericObject;
  kulStyle?: string;
  kulThreshold?: number;
  kulValue?: GenericObject;
}
//#endregion
