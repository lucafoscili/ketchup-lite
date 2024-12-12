import { KulEventPayload } from "../../types/GenericTypes";

//#region Events
export type KulHeaderEvent = "ready" | "unmount";
export interface KulHeaderEventPayload
  extends KulEventPayload<"KulHeader", KulHeaderEvent> {}
//#endregion

//#region Props
export enum KulHeaderProps {
  kulStyle = "Custom style of the component.",
}
export interface KulHeaderPropsInterface {
  kulStyle?: string;
}
//#endregion
