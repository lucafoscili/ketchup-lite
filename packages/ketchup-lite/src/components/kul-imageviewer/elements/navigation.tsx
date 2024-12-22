import { h } from "@stencil/core";
import { KulDataCyAttributes } from "src/types/GenericTypes";
import { IDS } from "../helpers/constants";
import {
  KulImageviewerAdapter,
  KulImageviewerAdapterJsx,
} from "../kul-imageviewer-declarations";

export const prepNavigation = (
  getAdapter: () => KulImageviewerAdapter,
): KulImageviewerAdapterJsx["navigation"] => {
  return {
    // #region Load
    load: () => {
      const { controller, elements, handlers } = getAdapter();
      const { manager } = controller.get;
      const { navigation } = elements.refs;
      const { button } = handlers.navigation;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      return (
        <kul-button
          class={bemClass("navigation-grid", "button")}
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
      const { compInstance, manager } = controller.get;
      const { navigation } = elements.refs;
      const { masonry } = handlers.navigation;
      const { kulData } = compInstance;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      return (
        <kul-masonry
          class={`${bemClass("navigation-grid", "masonry")}`}
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
      const { controller, elements, handlers } = getAdapter();
      const { manager } = controller.get;
      const { navigation } = elements.refs;
      const { textfield } = handlers.navigation;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      return (
        <kul-textfield
          class={`${bemClass("navigation-grid", "textfield")}`}
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
