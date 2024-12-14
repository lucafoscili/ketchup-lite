import { prepSideButtons } from "src/components/kul-carousel/elements/kul-carousel-main";
import {
  autoplay,
  navigation,
} from "src/components/kul-carousel/helpers/kul-carousel-utils";
import {
  KulCarouselAdapter,
  KulCarouselAdapterElementsJsx,
  KulCarouselAdapterStateSetters,
} from "src/components/kul-carousel/kul-carousel-declarations";

export const createElements: (
  adapter: KulCarouselAdapter,
) => KulCarouselAdapterElementsJsx = (adapter) => {
  return prepSideButtons(adapter);
};

export const createAutoplayStateSetters: (
  adapter: KulCarouselAdapter,
) => KulCarouselAdapterStateSetters["autoplay"] = (adapter) => {
  const { start, stop } = autoplay;

  return {
    start: () => start(adapter),
    stop: () => stop(adapter),
  };
};

export const createIndexStateSetters: (
  adapter: KulCarouselAdapter,
) => KulCarouselAdapterStateSetters["index"] = (adapter) => {
  const { next, previous, toSlide } = navigation;

  return {
    current: (value) => toSlide(adapter, value),
    next: () => next(adapter),
    previous: () => previous(adapter),
  };
};
