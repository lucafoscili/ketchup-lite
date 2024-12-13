import { KulEventPayload } from "src/types/GenericTypes";

//#region Events
export type KulLazyEvent = "kul-event" | "load" | "ready" | "unmount";
export interface KulLazyEventPayload
  extends KulEventPayload<"KulLazy", KulLazyEvent> {}
//#endregion

//#region Props
export interface KulLazyPropsInterface {
  kulComponentName?: string;
  kulComponentProps?: unknown;
  kulRenderMode?: KulLazyRenderMode;
  kulShowPlaceholder?: boolean;
  kulStyle?: string;
}
export type KulLazyRenderMode = "both" | "props" | "viewport";
//#endregion
