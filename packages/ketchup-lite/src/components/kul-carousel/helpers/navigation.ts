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
          set.index.next();
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
  calcNextIdx: (current: number, totalSlides: number) => {
    return (current + 1) % totalSlides;
  },
  //#endregion

  //#region Previous
  calcPreviousIdx: (current: number, totalSlides: number) => {
    return (current - 1 + totalSlides) % totalSlides;
  },
  //#endregion
};
