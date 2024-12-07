import { KulEventPayload } from "../../types/GenericTypes";

//#region Events
export type KulTypewriterEvent = "ready" | "unmount";
export interface KulTypewriterEventPayload
  extends KulEventPayload<"KulTypewriter", KulTypewriterEvent> {}
//#endregion

//#region Props
export enum KulTypewriterProps {
  kulCursor = "Sets the behavior of the bliking cursor.",
  kulDeleteSpeed = "Sets the deleting speed in milliseconds.",
  kulLoop = "Enables or disables looping of the text.",
  kulPause = "Sets the duration of the pause after typing a complete text.",
  kulSpeed = "Sets the typing speed in milliseconds.",
  kulStyle = "Custom style of the component.",
  kulTag = "The name of the HTML tag that will wrap the text.",
  kulValue = "Sets the text or array of texts to display with the typewriter effect.",
}
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
