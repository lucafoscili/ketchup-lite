import { h } from "@stencil/core";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { ICONS, IDS } from "../helpers/constants";
import { prepTreeDataset } from "../helpers/utils";
import {
  KulCompareAdapter,
  KulCompareAdapterJsx,
} from "../kul-compare-declarations";

//#endregion
export const prepToolbarJsx = (
  getAdapter: () => KulCompareAdapter,
): KulCompareAdapterJsx => {
  return {
    //#region Change view
    changeView: () => {
      const { controller, elements, handlers } = getAdapter();
      const { isOverlay, manager } = controller.get;
      const { refs } = elements;
      const { button } = handlers;
      const { assignRef } = manager;

      return (
        <kul-button
          data-cy={CY_ATTRIBUTES.button}
          id={IDS.rightButton}
          kulIcon={ICONS.close}
          kulIconOff={ICONS.rightButton}
          kulStyling={"icon"}
          kulToggable={true}
          onKul-button-event={button}
          ref={assignRef(refs, "changeView")}
          title={
            isOverlay()
              ? "Click for split screen comparison."
              : "Click for overlay comparison"
          }
        ></kul-button>
      );
    },
    //#endregion

    //#region Left button
    leftButton: () => {
      const { controller, elements, handlers } = getAdapter();
      const { isOverlay, manager } = controller.get;
      const { refs } = elements;
      const { button } = handlers;
      const { assignRef } = manager;

      return (
        <kul-button
          data-cy={CY_ATTRIBUTES.button}
          id={IDS.leftButton}
          kulIcon={ICONS.close}
          kulIconOff={ICONS.leftButton}
          kulStyling={"icon"}
          kulToggable={true}
          onKul-button-event={button}
          ref={assignRef(refs, "leftButton")}
          title={
            isOverlay()
              ? "Click to open the left panel."
              : "Click to close the left panel."
          }
        ></kul-button>
      );
    },
    //#endregion

    //#region Left tree
    leftTree: () => {
      const { controller, elements, handlers } = getAdapter();
      const { compInstance, manager, shapes } = controller.get;
      const { refs } = elements;
      const { tree } = handlers;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      return (
        <kul-tree
          class={bemClass("view", "panel", { left: true })}
          id={IDS.leftTree}
          kulData={prepTreeDataset(compInstance.leftShape, shapes())}
          onKul-tree-event={tree}
          ref={assignRef(refs, "leftTree")}
        ></kul-tree>
      );
    },
    //#endregion

    //#region Right button
    rightButton: () => {
      const { controller, elements, handlers } = getAdapter();
      const { isOverlay, manager } = controller.get;
      const { refs } = elements;
      const { button } = handlers;
      const { assignRef } = manager;

      return (
        <kul-button
          data-cy={CY_ATTRIBUTES.button}
          id={IDS.changeView}
          kulIcon={ICONS.changeView}
          kulIconOff={ICONS.changeViewOff}
          kulStyling={"icon"}
          kulToggable={true}
          onKul-button-event={button}
          ref={assignRef(refs, "rightButton")}
          title={
            isOverlay()
              ? "Click to open the right panel."
              : "Click to close the right panel."
          }
        ></kul-button>
      );
    },
    //#endregion

    //#region Right tree
    rightTree: () => {
      const { controller, elements, handlers } = getAdapter();
      const { compInstance, manager, shapes } = controller.get;
      const { refs } = elements;
      const { tree } = handlers;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      return (
        <kul-tree
          class={bemClass("view", "panel", { right: true })}
          id={IDS.rightTree}
          kulData={prepTreeDataset(compInstance.rightShape, shapes())}
          onKul-tree-event={tree}
          ref={assignRef(refs, "rightTree")}
        ></kul-tree>
      );
    },
    //#endregion
  };
};
