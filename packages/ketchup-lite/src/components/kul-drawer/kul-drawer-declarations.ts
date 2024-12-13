import { KulEventPayload } from "src/types/GenericTypes";

//#region Events
export type KulDrawerEvent = "close" | "open" | "ready" | "unmount";
export interface KulDrawerEventPayload
  extends KulEventPayload<"KulDrawer", KulDrawerEvent> {}
//#endregion

//#region Props
export interface KulDrawerPropsInterface {
  kulStyle?: string;
}
//#endregion
