import { KulTypewriterPropsInterface } from "../../../kul-typewriter/kul-typewriter-declarations";
import { KulShowcaseDynamicExampleType } from "../../kul-showcase-declarations";

export const TYPEWRITER_EXAMPLES_KEYS = [
  "div",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "code",
  "pre",
  "p",
  "span",
  "style",
] as const;

export interface TypewriterExample extends KulTypewriterPropsInterface {
  ["data-description"]: string;
  ["data-dynamic"]?: KulShowcaseDynamicExampleType;
}

export type TypewriterData = {
  [K in (typeof TYPEWRITER_EXAMPLES_KEYS)[number]]: TypewriterExample;
};
