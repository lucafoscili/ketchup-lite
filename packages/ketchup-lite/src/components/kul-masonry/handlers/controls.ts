import { IDS } from "../helpers/constants";
import { addColumn, changeView, removeColumn } from "../helpers/utils";
import {
  KulMasonryAdapter,
  KulMasonryAdapterHandlers,
} from "../kul-masonry-declarations";

export const controlsHandlers = (
  getAdapter: () => KulMasonryAdapter,
): KulMasonryAdapterHandlers => {
  return {
    //#region Button
    button: (e) => {
      const { eventType, id } = e.detail;

      switch (eventType) {
        case "click":
          switch (id) {
            case IDS.masonry:
              changeView(getAdapter());
              break;
            case IDS.removeColumn:
              removeColumn(getAdapter());
              break;
            case IDS.addColumn:
              addColumn(getAdapter());
              break;
          }
          break;
      }
    },
    //#endregion
  };
};
