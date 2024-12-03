import { KulCarouselPropsInterface } from "../../../kul-carousel/kul-carousel-declarations";
import { KulShowcaseDynamicExampleType } from "../../kul-showcase-declarations";

export const CAROUSEL_EXAMPLES_KEYS = ["autoplay", "simple", "style"] as const;

export interface CarouselExample extends KulCarouselPropsInterface {
  ["data-description"]: string;
  ["data-dynamic"]?: KulShowcaseDynamicExampleType;
}

export type CarouselData = {
  [K in (typeof CAROUSEL_EXAMPLES_KEYS)[number]]: CarouselExample;
};
