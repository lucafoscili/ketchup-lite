import { h } from "@stencil/core";

import { IDS } from "src/components/kul-imageviewer/helpers/kul-imageviewer-constants";
import {
  KulImageviewerAdapter,
  KulImageviewerAdapterElementsJsx,
} from "src/components/kul-imageviewer/kul-imageviewer-declarations";
import { KulDataCyAttributes } from "src/types/GenericTypes";

export const prepExplorer = (
  adapter: KulImageviewerAdapter,
): KulImageviewerAdapterElementsJsx["explorer"] => {
  const { elements, handlers, state } = adapter;
  const { explorer } = elements.refs;
  const { compInstance } = state.get;

  return {
    // #region Load
    load: () => {
      const className = {
        "navigation-grid__button": true,
        "kul-full-width": true,
      };

      const { button } = handlers.explorer;

      return (
        <kul-button
          class={className}
          data-cy={KulDataCyAttributes.BUTTON}
          id={IDS.explorer.load}
          kulIcon="find_replace"
          kulLabel="Load"
          onKul-button-event={button}
          ref={(el) => {
            if (el) {
              explorer.load = el;
            }
          }}
        >
          <kul-spinner
            kulActive={true}
            kulDimensions="2px"
            kulLayout={1}
            slot="spinner"
          ></kul-spinner>
        </kul-button>
      );
    },
    // #endregion

    // #region Masonry
    masonry: () => {
      const className = {
        "navigation-grid__masonry": true,
      };

      const { masonry } = handlers.explorer;

      return (
        <kul-masonry
          class={className}
          id={IDS.explorer.masonry}
          kulData={compInstance.kulData}
          kulSelectable={true}
          onKul-masonry-event={masonry}
          ref={(el) => {
            if (el) {
              explorer.masonry = el;
            }
          }}
        ></kul-masonry>
      );
    },
    // #endregion

    // #region Textfield
    textfield: () => {
      const className = {
        "navigation-grid__textfield": true,
      };

      const { textfield } = handlers.explorer;

      return (
        <kul-textfield
          class={className}
          id={IDS.explorer.textfield}
          kulIcon="folder"
          kulLabel="Directory"
          kulStyling="flat"
          onKul-textfield-event={textfield}
          ref={(el) => {
            if (el) {
              explorer.textfield = el;
            }
          }}
        ></kul-textfield>
      );
    },
    // #endregion
  };
};
