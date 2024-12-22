import { h } from "@stencil/core";
import { ICONS, IDS, STYLING } from "../helpers/constants";
import {
  KulMasonryAdapter,
  KulMasonryAdapterJsx,
} from "../kul-masonry-declarations";

export const prepControls = (
  getAdapter: () => KulMasonryAdapter,
): KulMasonryAdapterJsx => {
  return {
    //#region Add column
    addColumn: () => {
      const { controller, elements, handlers } = getAdapter();
      const { refs } = elements;
      const { button } = handlers;
      const { assignRef, theme } = controller.get.manager;
      const { bemClass } = theme;

      return (
        <kul-button
          class={`${bemClass("grid", "add-column")} kul-slim`}
          id={IDS.addColumn}
          key={IDS.addColumn}
          kulIcon={ICONS.addColumn}
          kulStyling={STYLING}
          onKul-button-event={button}
          ref={assignRef(refs, "addColumn")}
          title="Click to add a column to the masonry."
        ></kul-button>
      );
    },
    //#endregion

    //#region Remove column
    removeColumn: () => {
      const { controller, elements, handlers } = getAdapter();
      const { refs } = elements;
      const { button } = handlers;
      const { assignRef, theme } = controller.get.manager;
      const { bemClass } = theme;

      return (
        <kul-button
          class={`${bemClass("grid", "remove-column")} kul-slim`}
          id={IDS.removeColumn}
          key={IDS.removeColumn}
          kulIcon={ICONS.removeColumn}
          kulStyling={STYLING}
          onKul-button-event={button}
          ref={assignRef(refs, "removeColumns")}
          title="Click to remove a column from the masonry."
        ></kul-button>
      );
    },
    //#endregion

    //#region Change view
    changeView: () => {
      const { controller, elements, handlers } = getAdapter();
      const { refs } = elements;
      const { isMasonry, isVertical, manager } = controller.get;
      const { button } = handlers;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      return (
        <kul-button
          class={bemClass("grid", "change-view")}
          id={IDS.masonry}
          key={IDS.masonry}
          kulIcon={
            isMasonry()
              ? ICONS.vertical
              : isVertical()
                ? ICONS.horizontal
                : ICONS.masonry
          }
          kulStyling={STYLING}
          onKul-button-event={button}
          ref={assignRef(refs, "changeView")}
          title={
            isMasonry()
              ? "Click to view the images arranged vertically."
              : isVertical()
                ? "Click to view the images arranged horizontally."
                : "Click to view the images arranged in a masonry."
          }
        ></kul-button>
      );
    },
    //#endregion
  };
};
