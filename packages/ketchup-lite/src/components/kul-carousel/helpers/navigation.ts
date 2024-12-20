import { KulCarouselAdapter } from "src/components/kul-carousel/kul-carousel-declarations";

export const autoplay = {
  //#region Start
  start: (adapter: KulCarouselAdapter) => {
    const { controller } = adapter;
    const { get, set } = controller;
    const { compInstance } = get;
    const { kulAutoPlay, kulInterval } = compInstance;

    const shouldStart = kulAutoPlay && kulInterval > 0;

    if (shouldStart) {
      set.interval(
        setInterval(() => {
          navigation.next(adapter);
        }, kulInterval),
      );
    }
  },
  //#endregion

  //#region Stop
  stop: (adapter: KulCarouselAdapter) => {
    const { controller } = adapter;
    const { get, set } = controller;
    const { interval } = get;

    if (interval()) {
      clearInterval(interval());
      set.interval(null);
    }
  },
  //#endregion
};

export const navigation = {
  //#region Next
  next: (adapter: KulCarouselAdapter) => {
    const { controller } = adapter;
    const { get, set } = controller;
    const { index, totalSlides } = get;
    const { current } = index;

    set.index.current((current() + 1) % totalSlides());
  },
  //#endregion

  //#region Previous
  previous: (adapter: KulCarouselAdapter) => {
    const { controller } = adapter;
    const { get, set } = controller;
    const { index, totalSlides } = get;
    const { current } = index;

    set.index.current((current() - 1 + totalSlides()) % totalSlides());
  },
  //#endregion

  //#region To slide
  toSlide: (adapter: KulCarouselAdapter, value: number) => {
    const { controller } = adapter;
    const { set } = controller;

    set.index.current(value);
  },
  //#endregion
};
