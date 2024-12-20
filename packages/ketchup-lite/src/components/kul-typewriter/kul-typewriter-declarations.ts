import { KulEventPayload } from "src/types/GenericTypes";

//#region Events
export type KulTypewriterEvent = "ready" | "unmount";
export interface KulTypewriterEventPayload
  extends KulEventPayload<"KulTypewriter", KulTypewriterEvent> {}
//#endregion

//#region Props
export interface KulTypewriterPropsInterface {
  kulCursor?: KulTypewriterCursor;
  kulDeleteSpeed?: number;
  kulLoop?: boolean;
  kulPause?: number;
  kulSpeed?: number;
  kulStyle?: string;
  kulTag?: KulTypewriterTag;
  kulValue?: KulTypewriterValue;
}
export type KulTypewriterValue = string | string[];
export type KulTypewriterCursor = "enabled" | "disabled" | "auto";
export type KulTypewriterTag =
  | "div"
  | "span"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "pre"
  | "code"
  | "p";
//#endregion
