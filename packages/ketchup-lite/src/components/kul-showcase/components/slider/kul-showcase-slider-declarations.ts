import { KulSliderPropsInterface } from "../../../kul-slider/kul-slider-declarations";
import { KulShowcaseDynamicExampleType } from "../../kul-showcase-declarations";

export const SLIDER_EXAMPLES_KEYS = [
  "colors",
  "disabled",
  "simple",
  "style",
] as const;

export interface SliderExample extends KulSliderPropsInterface {
  ["data-description"]?: string;
  ["data-dynamic"]?: KulShowcaseDynamicExampleType;
  className?: string;
}

export type SliderData = {
  [K in (typeof SLIDER_EXAMPLES_KEYS)[number]]: Partial<SliderExample>;
};
