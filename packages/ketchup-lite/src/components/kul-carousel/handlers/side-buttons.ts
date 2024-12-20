import { IDS } from "../helpers/constants";
import { navigation } from "../helpers/navigation";
import {
  KulCarouselAdapter,
  KulCarouselAdapterHandlers,
} from "../kul-carousel-declarations";

export const prepSideButtonHandlers = (
  getAdapter: () => KulCarouselAdapter,
): KulCarouselAdapterHandlers => {
  const { next, previous } = navigation;

  return {
    button: (e) => {
      const { eventType, id } = e.detail;

      switch (eventType) {
        case "click":
          switch (id) {
            case IDS.back:
              previous(getAdapter());
              break;
            case IDS.forward:
              next(getAdapter());
              break;
          }
      }
    },
  };
};
