import { KulEventPayload } from "src/types/GenericTypes";
import { KulImagePropsInterface } from "../kul-image/kul-image-declarations";

//#region Events
export type KulToastEvent = "ready" | "unmount";
export interface KulToastEventPayload
  extends KulEventPayload<"KulToast", KulToastEvent> {}
//#endregion

//#region Props
export interface KulToastPropsInterface {
  kulCloseCallback?: () => void;
  kulCloseIcon?: KulImagePropsInterface;
  kulIcon?: KulImagePropsInterface;
  kulMessage?: string;
  kulStyle?: string;
  kulTimer?: number;
}
//#endregion
