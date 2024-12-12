import { h } from "@stencil/core";
import { KulDataCyAttributes } from "src/types/GenericTypes";
import {
  buttonEventHandler,
  masonryEventHandler,
  textfieldEventHandler,
} from "../handlers/kul-imageviewer-explorer";
import { EXPLORER_IDS } from "../helpers/kul-imageviewer-utils";
import { KulImageviewerAdapter } from "../kul-imageviewer-declarations";

export const prepExplorer = (
  adapter: KulImageviewerAdapter,
): KulImageviewerAdapter["components"]["jsx"]["explorer"] => {
  const { components, hooks } = adapter;
  const { refs } = components;
  const { get } = hooks;
  const { explorer } = refs;
  const { comp } = get;

  return {
    // #region Load
    load: () => {
      const className = {
        "navigation-grid__button": true,
        "kul-full-width": true,
      };

      return (
        <kul-button
          class={className}
          data-cy={KulDataCyAttributes.BUTTON}
          id={EXPLORER_IDS.load}
          kulIcon="find_replace"
          kulLabel="Load"
          onKul-button-event={(e) => buttonEventHandler(adapter, e)}
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

      return (
        <kul-masonry
          class={className}
          id={EXPLORER_IDS.masonry}
          kulData={comp.kulData}
          kulSelectable={true}
          onKul-masonry-event={(e) => masonryEventHandler(adapter, e)}
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

      return (
        <kul-textfield
          class={className}
          id={EXPLORER_IDS.textfield}
          kulIcon="folder"
          kulLabel="Directory"
          kulStyling="flat"
          onKul-textfield-event={(e) => textfieldEventHandler(adapter, e)}
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
