import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import { ICONS } from "src/components/kul-masonry/helpers/kul-masonry-utils";
import { KulMasonryAdapter } from "src/components/kul-masonry/kul-masonry-declarations";

//#region Button event handler
export const buttonEventHandler = (
  adapter: KulMasonryAdapter,
  e: CustomEvent<KulButtonEventPayload>,
) => {
  const { eventType, id } = e.detail;

  const { handlers } = adapter;
  const { addColumn, changeView, removeColumn } = handlers;

  switch (eventType) {
    case "click":
      switch (id) {
        case ICONS.masonry:
          changeView();
          break;
        case ICONS.removeColumn:
          removeColumn();
          break;
        case ICONS.addColumn:
          addColumn();
          break;
      }
      break;
  }
};
//#endregion
