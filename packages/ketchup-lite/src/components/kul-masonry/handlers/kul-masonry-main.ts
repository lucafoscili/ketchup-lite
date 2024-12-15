import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import { IDS } from "src/components/kul-masonry/helpers/kul-masonry-utils";
import { KulMasonryAdapter } from "src/components/kul-masonry/kul-masonry-declarations";

//#region Button
export const buttonEventHandler = (adapter: KulMasonryAdapter) => {
  return {
    button: (e: CustomEvent<KulButtonEventPayload>) => {
      const { eventType, id } = e.detail;

      const { handlers } = adapter;
      const { addColumn, changeView, removeColumn } = handlers;

      switch (eventType) {
        case "click":
          switch (id) {
            case IDS.masonry:
              changeView();
              break;
            case IDS.removeColumn:
              removeColumn();
              break;
            case IDS.addColumn:
              addColumn();
              break;
          }
          break;
      }
    },
  };
};
//#endregion
