import { KulEventPayload } from "../../types/GenericTypes";

//#region Events
export type KulDrawerEvent = "close" | "open" | "ready" | "unmount";
export interface KulDrawerEventPayload
  extends KulEventPayload<"KulDrawer", KulDrawerEvent> {}
//#endregion

//#region Props
export enum KulDrawerProps {
  kulStyle = "Custom style of the component.",
}
export interface KulDrawerPropsInterface {
  kulStyle?: string;
}
//#endregion
