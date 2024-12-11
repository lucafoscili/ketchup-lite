import * as MAIN_COMPONENTS from "../components/kul-carousel-main";
import * as MAIN_HANDLERS from "../handlers/kul-carousel-main";
import {
  KulCarouselAdapter,
  KulCarouselAdapterComponents,
  KulCarouselAdapterHandlers,
} from "../kul-carousel-declarations";

export const createComponents: (
  adapter: KulCarouselAdapter,
) => KulCarouselAdapterComponents["jsx"] = (adapter) => {
  return {
    back: MAIN_COMPONENTS.prepBack(adapter),
    forward: MAIN_COMPONENTS.prepForward(adapter),
  };
};

export const createHandlers: (
  adapter: KulCarouselAdapter,
) => KulCarouselAdapterHandlers = (adapter) => {
  return {
    autoplay: MAIN_HANDLERS.prepAutoplay(adapter),
    next: () => MAIN_HANDLERS.prepNext(adapter),
    previous: () => MAIN_HANDLERS.prepPrevious(adapter),
    toSlide: (value: number) => MAIN_HANDLERS.prepToSlide(adapter, value),
  };
};
