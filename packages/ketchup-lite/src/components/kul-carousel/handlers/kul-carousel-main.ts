import {
  KulCarouselAdapter,
  KulCarouselAdapterHandlers,
} from "../kul-carousel-declarations";

export const prepAutoplay: (
  adapter: KulCarouselAdapter,
) => KulCarouselAdapterHandlers["autoplay"] = (adapter) => {
  return {
    //#region Autoplay
    start: () => {
      const { handlers, hooks } = adapter;
      const { next } = handlers;
      const { get, set } = hooks;
      const { comp } = get;
      const { kulAutoPlay, kulInterval } = comp;

      const shouldStart = kulAutoPlay && kulInterval > 0;

      if (shouldStart) {
        set.interval(
          setInterval(() => {
            next();
          }, kulInterval),
        );
      }
    },

    stop: () => {
      const { hooks } = adapter;
      const { get, set } = hooks;
      const { interval } = get;

      if (interval()) {
        clearInterval(interval());
        set.interval(null);
      }
    },
    //#endregion
  };
};

//#region Next
export const prepNext = (adapter: KulCarouselAdapter) => {
  const { hooks } = adapter;
  const { get, set } = hooks;
  const { currentIndex, totalSlides } = get;

  set.currentIndex((currentIndex() + 1) % totalSlides());
};
//#endregion

//#region Previous
export const prepPrevious = (adapter: KulCarouselAdapter) => {
  const { hooks } = adapter;
  const { get, set } = hooks;
  const { currentIndex, totalSlides } = get;

  set.currentIndex((currentIndex() - 1 + totalSlides()) % totalSlides());
};
//#endregion

//#region ToSlide
export const prepToSlide = (adapter: KulCarouselAdapter, value: number) => {
  const { hooks } = adapter;
  const { set } = hooks;

  set.currentIndex(value);
};
//#endregion
