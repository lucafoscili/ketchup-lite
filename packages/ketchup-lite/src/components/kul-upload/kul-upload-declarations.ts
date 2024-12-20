import { KulEventPayload } from "../../types/GenericTypes";

//#region Events
export type KulUploadEvent =
  | "delete"
  | "pointerdown"
  | "ready"
  | "unmount"
  | "upload";
export interface KulUploadEventPayload
  extends KulEventPayload<"KulUpload", KulUploadEvent> {
  selectedFiles: File[];
}
//#endregion

//#region Props
export interface KulUploadPropsInterface {
  kulLabel?: string;
  kulRipple?: boolean;
  kulStyle?: string;
  kulValue?: File[];
}
//#endregion
