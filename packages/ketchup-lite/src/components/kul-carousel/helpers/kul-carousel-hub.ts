import * as MAIN_HANDLERS from "src/components/kul-carousel/handlers/kul-carousel-main";
import {
  KulCarouselAdapter,
  KulCarouselAdapterHandlers,
  KulCarouselAdapterWidgets,
} from "src/components/kul-carousel/kul-carousel-declarations";
import * as MAIN_WIDGETS from "src/components/kul-carousel/widgets/kul-carousel-main";

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

export const createWidgets: (
  adapter: KulCarouselAdapter,
) => KulCarouselAdapterWidgets["jsx"] = (adapter) => {
  return {
    back: MAIN_WIDGETS.prepBack(adapter),
    forward: MAIN_WIDGETS.prepForward(adapter),
  };
};
