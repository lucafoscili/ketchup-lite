import { h } from "@stencil/core";

import { KulMasonryAdapter } from "src/components/kul-masonry/kul-masonry-declarations";
import { ICONS, STYLING } from "../helpers/kul-masonry-utils";
import { buttonEventHandler } from "../handlers/kul-masonry-main";

export const prepMasonry = (adapter: KulMasonryAdapter) => {
  const { handlers } = adapter;

  return {
    addColumn: () => {
      return (
        <kul-button
          class={"grid__add-column kul-slim"}
          id={ICONS.addColumn}
          key={ICONS.addColumn}
          kulIcon={ICONS.addColumn}
          kulStyling={STYLING}
          onKul-button-event={(e) => buttonEventHandler(adapter, e)}
          ref={(el) => {
            if (el) {
              adapter.components.buttons.addColumn = el;
            }
          }}
          title="Click to add a column to the masonry."
        ></kul-button>
      );
    },
    removeColumn: () => {
      return (
        <kul-button
          class={"grid__remove-column kul-slim"}
          id={ICONS.removeColumn}
          key={ICONS.removeColumn}
          kulIcon={ICONS.removeColumn}
          kulStyling={STYLING}
          onKul-button-event={(e) => buttonEventHandler(adapter, e)}
          ref={(el) => {
            if (el) {
              adapter.components.buttons.removeColumn = el;
            }
          }}
          title="Click to remove a column from the masonry."
        ></kul-button>
      );
    },
    changeView: () => {
      return (
        <kul-button
          class={"grid__change-view"}
          id={ICONS.masonry}
          key={ICONS.masonry}
          kulIcon={
            adapter.isMasonry()
              ? ICONS.vertical
              : adapter.isVertical()
                ? ICONS.horizontal
                : ICONS.masonry
          }
          kulStyling={STYLING}
          onKul-button-event={(e) => buttonEventHandler(adapter, e)}
          ref={(el) => {
            if (el) {
              adapter.components.buttons.changeView = el;
            }
          }}
          title={
            adapter.isMasonry()
              ? "Click to view the images arranged vertically."
              : adapter.isVertical()
                ? "Click to view the images arranged horizontally."
                : "Click to view the images arranged in a masonry."
          }
        ></kul-button>
      );
    },
  };
};
