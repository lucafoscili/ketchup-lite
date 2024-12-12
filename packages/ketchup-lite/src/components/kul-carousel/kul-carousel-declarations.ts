import { VNode } from "@stencil/core";

import {
  KulDataDataset,
  KulDataShapes,
} from "../../managers/kul-data/kul-data-declarations";
import { KulManager } from "../../managers/kul-manager/kul-manager";
import { KulComponentAdapter, KulEventPayload } from "../../types/GenericTypes";
import { KulCarousel } from "./kul-carousel";

//#region Adapter
export interface KulCarouselAdapter extends KulComponentAdapter<KulCarousel> {
  components: KulCarouselAdapterComponents;
  handlers: KulCarouselAdapterHandlers;
  hooks: KulCarouselAdapterHooks;
}
export interface KulCarouselAdapterComponents {
  jsx: {
    back: () => VNode;
    forward: () => VNode;
  };
  refs: {
    back: HTMLKulButtonElement;
    forward: HTMLKulButtonElement;
  };
}
export interface KulCarouselAdapterHandlers {
  autoplay: {
    start: () => void;
    stop: () => void;
  };
  next: () => void;
  previous: () => void;
  toSlide: (value: number) => void;
}
export interface KulCarouselAdapterHooks {
  get: {
    comp: KulCarousel;
    currentIndex: () => number;
    interval: () => NodeJS.Timeout;
    manager: KulManager;
    totalSlides: () => number;
  };
  set: {
    currentIndex: (value: number) => void;
    interval: (value: NodeJS.Timeout) => void;
  };
}
//#endregion

//#region Events
export type KulCarouselEvent = "kul-event" | "ready" | "unmount";
export interface KulCarouselEventPayload
  extends KulEventPayload<"KulCarousel", KulCarouselEvent> {}
//#endregion

//#region Props
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
//#endregion
