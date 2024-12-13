import { VNode } from "@stencil/core";

import { KulCarousel } from "src/components/kul-carousel/kul-carousel";
import {
  KulDataDataset,
  KulDataShapes,
} from "src/managers/kul-data/kul-data-declarations";
import { KulComponentAdapter, KulEventPayload } from "src/types/GenericTypes";

//#region Adapter
export interface KulCarouselAdapter extends KulComponentAdapter<KulCarousel> {
  handlers: KulCarouselAdapterHandlers;
  hooks: KulCarouselAdapterHooks;
  widgets: KulCarouselAdapterWidgets;
}
export interface KulCarouselAdapterWidgets {
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
export interface KulCarouselPropsInterface {
  kulAutoPlay?: boolean;
  kulData?: KulDataDataset;
  kulInterval?: number;
  kulShape?: KulDataShapes;
  kulStyle?: string;
}
//#endregion
