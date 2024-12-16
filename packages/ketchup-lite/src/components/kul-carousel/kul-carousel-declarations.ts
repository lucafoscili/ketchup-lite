import { VNode } from "@stencil/core";
import {
  KulDataDataset,
  KulDataShapes,
} from "src/managers/kul-data/kul-data-declarations";
import {
  KulComponentAdapter,
  KulComponentAdapterControllerGetters,
  KulComponentAdapterControllerSetters,
  KulComponentAdapterHandlers,
  KulComponentAdapterJsx,
  KulComponentAdapterRefs,
  KulEventPayload,
} from "src/types/GenericTypes";
import { KulButtonEventPayload } from "../kul-button/kul-button-declarations";
import { KulCarousel } from "./kul-carousel";

//#region Adapter
export interface KulCarouselAdapter extends KulComponentAdapter<KulCarousel> {
  controller: {
    get: KulCarouselAdapterControllerGetters;
    set: KulCarouselAdapterControllerSetters;
  };
  elements: {
    jsx: KulCarouselAdapterElementsJsx;
    refs: KulCarouselAdapterElementsRefs;
  };
  handlers: KulCarouselAdapterHandlers;
}
export interface KulCarouselAdapterElementsJsx extends KulComponentAdapterJsx {
  back: () => VNode;
  forward: () => VNode;
}
export interface KulCarouselAdapterElementsRefs
  extends KulComponentAdapterRefs {
  back: HTMLKulButtonElement;
  forward: HTMLKulButtonElement;
}
export interface KulCarouselAdapterHandlers
  extends KulComponentAdapterHandlers {
  button: (e: CustomEvent<KulButtonEventPayload>) => void;
}
export type KulCarouselAdapterInitializerGetters = Pick<
  KulCarouselAdapterControllerGetters,
  "compInstance" | "index" | "interval" | "totalSlides"
>;
export type KulCarouselAdapterInitializerSetters = Pick<
  KulCarouselAdapterControllerSetters,
  "interval"
>;
export interface KulCarouselAdapterControllerGetters
  extends KulComponentAdapterControllerGetters<KulCarousel> {
  compInstance: KulCarousel;
  index: {
    current: () => number;
  };
  interval: () => NodeJS.Timeout;
  totalSlides: () => number;
}
export interface KulCarouselAdapterControllerSetters
  extends KulComponentAdapterControllerSetters {
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
