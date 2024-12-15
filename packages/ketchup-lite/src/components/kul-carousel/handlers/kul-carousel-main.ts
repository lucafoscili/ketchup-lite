import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import { IDS } from "src/components/kul-carousel/helpers/kul-carousel-constants";
import { navigation } from "src/components/kul-carousel/helpers/kul-carousel-utils";
import { KulCarouselAdapter } from "src/components/kul-carousel/kul-carousel-declarations";

export const carouselHandlers = (adapter: KulCarouselAdapter) => {
  const { next, previous } = navigation;

  return {
    button: (e: CustomEvent<KulButtonEventPayload>) => {
      const { eventType, id } = e.detail;

      switch (eventType) {
        case "click":
          switch (id) {
            case IDS.back:
              previous(adapter);
              break;
            case IDS.forward:
              next(adapter);
              break;
          }
      }
    },
  };
};
