import { GenericObject, KulEventPayload } from "src/types/GenericTypes";

//#region Events
export type KulPhotoframeEvent = "load" | "overlay" | "ready" | "unmount";
export interface KulPhotoframeEventPayload
  extends KulEventPayload<"KulPhotoframe", KulPhotoframeEvent> {
  isPlaceholder?: boolean;
}
//#endregion

//#region States
export type KulPhotoframeOrientation = "" | "landscape" | "portrait";
//#endregion

//#region Props
export interface KulPhotoframePropsInterface {
  kulOverlay?: KulPhotoframeOverlay;
  kulPlaceholder?: GenericObject;
  kulStyle?: string;
  kulThreshold?: number;
  kulValue?: GenericObject;
}
export interface KulPhotoframeOverlay {
  description?: string;
  icon?: string;
  hideOnClick?: boolean;
  title?: string;
}
//#endregion
