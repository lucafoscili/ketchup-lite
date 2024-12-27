import { VNode } from "@stencil/core";
import {
  KulDataDataset,
  KulDataShapes,
} from "src/managers/kul-data/kul-data-declarations";
import type { KulManager } from "src/managers/kul-manager/kul-manager";
import {
  KulComponentAdapter,
  KulComponentAdapterGetters,
  KulComponentAdapterHandlers,
  KulComponentAdapterJsx,
  KulComponentAdapterRefs,
  KulComponentAdapterSetters,
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
    jsx: KulCarouselAdapterJsx;
    refs: KulCarouselAdapterRefs;
  };
  handlers: KulCarouselAdapterHandlers;
}
export interface KulCarouselAdapterJsx extends KulComponentAdapterJsx {
  back: () => VNode;
  forward: () => VNode;
}
export interface KulCarouselAdapterRefs extends KulComponentAdapterRefs {
  back: HTMLKulButtonElement;
  forward: HTMLKulButtonElement;
}
export interface KulCarouselAdapterHandlers
  extends KulComponentAdapterHandlers {
  button: (e: CustomEvent<KulButtonEventPayload>) => void;
}
export type KulCarouselAdapterInitializerGetters = Pick<
  KulCarouselAdapterControllerGetters,
  "compInstance" | "index" | "interval" | "manager" | "totalSlides"
>;
export type KulCarouselAdapterInitializerSetters = Pick<
  KulCarouselAdapterControllerSetters,
  "index" | "interval"
>;
export interface KulCarouselAdapterControllerGetters
  extends KulComponentAdapterGetters<KulCarousel> {
  compInstance: KulCarousel;
  index: {
    current: () => number;
  };
  interval: () => NodeJS.Timeout;
  manager: KulManager;
  totalSlides: () => number;
}
export interface KulCarouselAdapterControllerSetters
  extends KulComponentAdapterSetters {
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
