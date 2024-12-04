import { VNode } from "@stencil/core";

import { KulCarousel } from "./kul-carousel";
import {
  KulDataDataset,
  KulDataShapes,
} from "../../managers/kul-data/kul-data-declarations";
import { KulManager } from "../../managers/kul-manager/kul-manager";
import { KulEventPayload } from "../../types/GenericTypes";

/*-------------------------------------------------*/
/*                  A d a p t e r                  */
/*-------------------------------------------------*/
export interface KulCarouselAdapter {
  actions: KulCarouselAdapterActions;
  components: KulCarouselAdapterComponents;
  get: KulCarouselAdapterGetters;
  set: KulCarouselAdapterSetters;
}
export interface KulCarouselAdapterActions {
  autoplay: {
    start: (adapter: KulCarouselAdapter) => void;
    stop: (adapter: KulCarouselAdapter) => void;
  };
  next: (adapter: KulCarouselAdapter) => void;
  previous: (adapter: KulCarouselAdapter) => void;
  toSlide: (adapter: KulCarouselAdapter, value: number) => void;
}
export interface KulCarouselAdapterComponents {
  back: (adapter: KulCarouselAdapter) => VNode;
  forward: (adapter: KulCarouselAdapter) => VNode;
}
export interface KulCarouselAdapterGetters {
  carousel: () => KulCarousel;
  interval: () => NodeJS.Timeout;
  manager: () => KulManager;
  state: {
    currentIndex: () => number;
  };
  totalSlides: () => number;
}
export interface KulCarouselAdapterSetters {
  interval: (value: NodeJS.Timeout) => void;
  state: { currentIndex: (value: number) => void };
}
/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
export type KulCarouselEvent = "kul-event" | "ready" | "unmount";
export interface KulCarouselEventPayload
  extends KulEventPayload<"KulCarousel", KulCarouselEvent> {}
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
export enum KulCarouselProps {
  kulAutoPlay = "Enable or disable autoplay for the carousel.",
  kulData = "Actual data to carousel.",
  kulInterval = "Interval in milliseconds for autoplay.",
  kulShape = "Sets the type of shapes to compare.",
  kulStyle = "Sets a custom CSS style for the component.",
}
export interface KulCarouselPropsInterface {
  kulAutoPlay?: boolean;
  kulData?: KulDataDataset;
  kulInterval?: number;
  kulShape?: KulDataShapes;
  kulStyle?: string;
}
