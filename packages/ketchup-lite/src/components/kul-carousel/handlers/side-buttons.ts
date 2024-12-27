import { IDS } from "../helpers/constants";
import {
  KulCarouselAdapter,
  KulCarouselAdapterHandlers,
} from "../kul-carousel-declarations";

export const prepSideButtonHandlers = (
  getAdapter: () => KulCarouselAdapter,
): KulCarouselAdapterHandlers => {
  return {
    button: (e) => {
      const { eventType, id } = e.detail;

      const { next, previous } = getAdapter().controller.set.index;

      switch (eventType) {
        case "click":
          switch (id) {
            case IDS.back:
              previous();
              break;
            case IDS.forward:
              next();
              break;
          }
      }
    },
  };
};
