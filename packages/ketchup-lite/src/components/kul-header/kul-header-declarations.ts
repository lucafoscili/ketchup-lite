import { KulEventPayload } from "src/types/GenericTypes";

//#region Events
export type KulHeaderEvent = "ready" | "unmount";
export interface KulHeaderEventPayload
  extends KulEventPayload<"KulHeader", KulHeaderEvent> {}
//#endregion

//#region Props
export interface KulHeaderPropsInterface {
  kulStyle?: string;
}
//#endregion
