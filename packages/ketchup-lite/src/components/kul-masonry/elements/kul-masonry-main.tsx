import { h } from "@stencil/core";

import {
  ICONS,
  IDS,
  STYLING,
} from "src/components/kul-masonry/helpers/kul-masonry-constants";
import {
  KulMasonryAdapter,
  KulMasonryAdapterElementsJsx,
} from "src/components/kul-masonry/kul-masonry-declarations";

export const prepMasonry = (
  adapter: KulMasonryAdapter,
): KulMasonryAdapterElementsJsx => {
  const { elements, handlers, state } = adapter;
  const { refs } = elements;
  const { isMasonry, isVertical } = state.get;

  return {
    addColumn: () => {
      const { button } = handlers;

      return (
        <kul-button
          class={"grid__add-column kul-slim"}
          id={IDS.addColumn}
          key={IDS.addColumn}
          kulIcon={ICONS.addColumn}
          kulStyling={STYLING}
          onKul-button-event={button}
          ref={(el) => {
            if (el) {
              refs.addColumn = el;
            }
          }}
          title="Click to add a column to the masonry."
        ></kul-button>
      );
    },
    removeColumn: () => {
      const { button } = handlers;

      return (
        <kul-button
          class={"grid__remove-column kul-slim"}
          id={IDS.removeColumn}
          key={IDS.removeColumn}
          kulIcon={ICONS.removeColumn}
          kulStyling={STYLING}
          onKul-button-event={button}
          ref={(el) => {
            if (el) {
              refs.removeColumn = el;
            }
          }}
          title="Click to remove a column from the masonry."
        ></kul-button>
      );
    },
    changeView: () => {
      const { button } = handlers;

      return (
        <kul-button
          class={"grid__change-view"}
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
          ref={(el) => {
            if (el) {
              refs.changeView = el;
            }
          }}
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
  };
};
