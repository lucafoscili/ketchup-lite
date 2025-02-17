import { KulCarouselAdapterActions } from "../kul-carousel-declarations";

export const ACTIONS: KulCarouselAdapterActions = {
  autoplay: {
    start(adapter) {
      const carousel = adapter.get.carousel();

      if (carousel.kulAutoPlay && carousel.kulInterval > 0) {
        adapter.set.interval(
          setInterval(() => {
            adapter.actions.next(adapter);
          }, carousel.kulInterval),
        );
      }
    },

    stop(adapter) {
      const interval = adapter.get.interval();

      if (interval) {
        clearInterval(interval);
        adapter.set.interval(null);
      }
    },
  },
  next: (adapter) => {
    const currentIndex = adapter.get.state.currentIndex();
    const totalSlides = adapter.get.totalSlides();

    adapter.set.state.currentIndex((currentIndex + 1) % totalSlides);
  },
  previous: (adapter) => {
    const currentIndex = adapter.get.state.currentIndex();
    const totalSlides = adapter.get.totalSlides();

    adapter.set.state.currentIndex(
      (currentIndex - 1 + totalSlides) % totalSlides,
    );
  },
  toSlide: (adapter, value) => {
    adapter.set.state.currentIndex(value);
  },
};
