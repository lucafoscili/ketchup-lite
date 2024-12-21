import { h } from "@stencil/core";
import { kulManagerSingleton } from "src/global/global";
import { KulDataCyAttributes } from "src/types/GenericTypes";
import { IDS } from "../helpers/constants";
import {
  KulImageviewerAdapter,
  KulImageviewerAdapterJsx,
} from "../kul-imageviewer-declarations";

export const prepNavigation = (
  getAdapter: () => KulImageviewerAdapter,
): KulImageviewerAdapterJsx["navigation"] => {
  const { assignRef, theme } = kulManagerSingleton;
  const { bemClass } = theme;

  const className = {
    load: bemClass("navigation-grid", "button"),
    masonry: `${bemClass("navigation-grid", "masonry")}`,
    textfield: `${bemClass("navigation-grid", "textfield")}`,
  };

  return {
    // #region Load
    load: () => {
      const { elements, handlers } = getAdapter();
      const { navigation } = elements.refs;
      const { button } = handlers.navigation;

      return (
        <kul-button
          class={className.load}
          data-cy={KulDataCyAttributes.BUTTON}
          id={IDS.navigation.load}
          kulIcon="find_replace"
          kulLabel="Load"
          onKul-button-event={button}
          ref={assignRef(navigation, "load")}
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
      const { controller, elements, handlers } = getAdapter();
      const { compInstance } = controller.get;
      const { navigation } = elements.refs;
      const { masonry } = handlers.navigation;
      const { kulData } = compInstance;

      return (
        <kul-masonry
          class={className.masonry}
          id={IDS.navigation.masonry}
          kulData={kulData}
          kulSelectable={true}
          onKul-masonry-event={masonry}
          ref={assignRef(navigation, "masonry")}
        ></kul-masonry>
      );
    },
    // #endregion

    // #region Textfield
    textfield: () => {
      const { elements, handlers } = getAdapter();
      const { navigation } = elements.refs;
      const { textfield } = handlers.navigation;

      return (
        <kul-textfield
          class={className.textfield}
          id={IDS.navigation.textfield}
          kulIcon="folder"
          kulLabel="Directory"
          kulStyling="flat"
          onKul-textfield-event={textfield}
          ref={assignRef(navigation, "textfield")}
        ></kul-textfield>
      );
    },
    // #endregion
  };
};
