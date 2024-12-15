import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import { IDS } from "src/components/kul-masonry/helpers/kul-masonry-constants";
import {
  addColumn,
  changeView,
  removeColumn,
} from "src/components/kul-masonry/helpers/kul-masonry-utils";
import { KulMasonryAdapter } from "src/components/kul-masonry/kul-masonry-declarations";

//#region Button
export const masonryHandlers = (adapter: KulMasonryAdapter) => {
  return {
    button: (e: CustomEvent<KulButtonEventPayload>) => {
      const { eventType, id } = e.detail;

      switch (eventType) {
        case "click":
          switch (id) {
            case IDS.masonry:
              changeView(adapter);
              break;
            case IDS.removeColumn:
              removeColumn(adapter);
              break;
            case IDS.addColumn:
              addColumn(adapter);
              break;
          }
          break;
      }
    },
  };
};
//#endregion
