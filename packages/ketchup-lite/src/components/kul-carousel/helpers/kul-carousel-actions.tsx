import {
  KulCarouselAdapter,
  KulCarouselAdapterActions,
} from "../kul-carousel-declarations";

export const createActions: (
  adapter: KulCarouselAdapter,
) => KulCarouselAdapterActions = (adapter) => {
  return {
    //#region Autoplay
    autoplay: {
      start() {
        const carousel = adapter.get.carousel();

        if (carousel.kulAutoPlay && carousel.kulInterval > 0) {
          adapter.set.interval(
            setInterval(() => {
              adapter.actions.next();
            }, carousel.kulInterval),
          );
        }
      },

      stop() {
        const interval = adapter.get.interval();

        if (interval) {
          clearInterval(interval);
          adapter.set.interval(null);
        }
      },
      //#endregion
    },

    //#region Next
    next: () => {
      const currentIndex = adapter.get.state.currentIndex();
      const totalSlides = adapter.get.totalSlides();

      adapter.set.state.currentIndex((currentIndex + 1) % totalSlides);
    },
    //#endregion

    //#region Previous
    previous: () => {
      const currentIndex = adapter.get.state.currentIndex();
      const totalSlides = adapter.get.totalSlides();

      adapter.set.state.currentIndex(
        (currentIndex - 1 + totalSlides) % totalSlides,
      );
    },
    //#endregion

    //#region ToSlide
    toSlide: (value) => {
      adapter.set.state.currentIndex(value);
    },
    //#endregion}
  };
};
