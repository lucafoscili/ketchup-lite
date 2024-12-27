import { KulTogglePropsInterface } from "../../../kul-toggle/kul-toggle-declarations";
import { KulShowcaseDynamicExampleType } from "../../kul-showcase-declarations";

export const TOGGLE_EXAMPLES_KEYS = [
  "colors",
  "disabled",
  "simple",
  "style",
] as const;

export interface ToggleExample extends KulTogglePropsInterface {
  ["data-description"]?: string;
  ["data-dynamic"]?: KulShowcaseDynamicExampleType;
  className?: string;
}

export type ToggleData = {
  [K in (typeof TOGGLE_EXAMPLES_KEYS)[number]]: Partial<ToggleExample>;
};
