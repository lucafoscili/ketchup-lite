import { VNode } from "@stencil/core";

import { KulCarousel } from "src/components/kul-carousel/kul-carousel";
import {
  KulDataDataset,
  KulDataShapes,
} from "src/managers/kul-data/kul-data-declarations";
import {
  KulComponentAdapter,
  KulComponentAdapterHandlers,
  KulComponentAdapterJsx,
  KulComponentAdapterRef,
  KulComponentAdapterStateGetters,
  KulComponentAdapterStateSetters,
  KulEventPayload,
} from "src/types/GenericTypes";

//#region Adapter
export interface KulCarouselAdapter extends KulComponentAdapter<KulCarousel> {
  elements: {
    jsx: KulCarouselAdapterElementsJsx;
    refs: KulCarouselAdapterElementsRefs;
  };
  handlers: KulCarouselAdapterHandlers;
  state: {
    get: KulCarouselAdapterStateGetters;
    set: KulCarouselAdapterStateSetters;
  };
}
export interface KulCarouselAdapterElementsJsx extends KulComponentAdapterJsx {
  back: () => VNode;
  forward: () => VNode;
}
export interface KulCarouselAdapterElementsRefs extends KulComponentAdapterRef {
  back: HTMLKulButtonElement;
  forward: HTMLKulButtonElement;
}
export interface KulCarouselAdapterHandlers
  extends KulComponentAdapterHandlers {}
export interface KulCarouselAdapterStateGetters
  extends KulComponentAdapterStateGetters<KulCarousel> {
  compInstance: KulCarousel;
  index: {
    current: () => number;
  };
  interval: () => NodeJS.Timeout;
  totalSlides: () => number;
}
export interface KulCarouselAdapterStateSetters
  extends KulComponentAdapterStateSetters {
  autoplay: {
    start: () => void;
    stop: () => void;
  };
  index: {
    current: (value: number) => void;
    next: () => void;
    previous: () => void;
  };
  interval: (value: NodeJS.Timeout) => void;
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
