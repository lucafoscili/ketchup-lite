import { IDS } from "src/components/kul-masonry/helpers/kul-masonry-constants";
import {
  addColumn,
  changeView,
  removeColumn,
} from "src/components/kul-masonry/helpers/kul-masonry-utils";
import {
  KulMasonryAdapter,
  KulMasonryAdapterHandlers,
} from "src/components/kul-masonry/kul-masonry-declarations";

//#region Button
export const masonryHandlers = (
  adapter: KulMasonryAdapter,
): KulMasonryAdapterHandlers => {
  return {
    button: (e) => {
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
