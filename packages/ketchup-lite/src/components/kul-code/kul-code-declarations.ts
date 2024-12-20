import { KulEventPayload } from "src/types/GenericTypes";

//#region Events
export type KulCodeEvent = "ready" | "unmount";
export interface KulCodeEventPayload
  extends KulEventPayload<"KulCode", KulCodeEvent> {}
//#endregion

//#region Props
export interface KulCodePropsInterface {
  kulFormat?: boolean;
  kulLanguage?: string;
  kulPreserveSpaces?: boolean;
  kulStyle?: string;
  kulValue?: string;
}
//#endregion
