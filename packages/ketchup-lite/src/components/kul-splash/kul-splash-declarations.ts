import { KulEventPayload } from "src/types/GenericTypes";

//#region Events
export type KulSplashEvent = "ready" | "unmount";
export interface KulSplashEventPayload
  extends KulEventPayload<"KulSplash", KulSplashEvent> {}
//#endregion

//#region States
export type KulSplashStates = "initializing" | "unmounting";
//#endregion

//#region Props
export interface KulSplashPropsInterface {
  kulLabel?: string;
  kulStyle?: string;
}
