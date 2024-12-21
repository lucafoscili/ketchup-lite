import { h } from "@stencil/core";
import { kulManagerSingleton } from "src/global/global";
import { KulDataCyAttributes } from "src/types/GenericTypes";
import { IDS } from "../helpers/constants";
import {
  KulImageviewerAdapter,
  KulImageviewerAdapterJsx,
} from "../kul-imageviewer-declarations";

export const prepDetails = (
  getAdapter: () => KulImageviewerAdapter,
): KulImageviewerAdapterJsx["details"] => {
  const { assignRef, theme } = kulManagerSingleton;
  const { bemClass } = theme;

  const className = {
    canvas: bemClass("details-grid", "canvas"),
    clearHistory: `${bemClass("details-grid", "clear-history")} kul-danger kul-full-width`,
    deleteShape: `${bemClass("details-grid", "delete")} kul-danger kul-full-width`,
    redo: `${bemClass("details-grid", "redo")} kul-full-width`,
    save: `${bemClass("details-grid", "commit-changes")} kul-success kul-full-width`,
    spinner: `${bemClass("details-grid", "spinner")}`,
    tree: `${bemClass("details-grid", "tree")}`,
    undo: `${bemClass("details-grid", "undo")} kul-full-width`,
  };

  return {
    // #region Canvas
    canvas: () => {
      const { controller, elements, handlers } = getAdapter();
      const { currentSnapshot } = controller.get.history;
      const { details } = elements.refs;
      const { canvas } = handlers.details;

      const snapshot = currentSnapshot();
      if (!snapshot) {
        return;
      }

      return (
        <kul-canvas
          class={className.canvas}
          data-cy={KulDataCyAttributes.SHAPE}
          id={IDS.details.canvas}
          kulImageProps={{ kulValue: snapshot.value }}
          onKul-canvas-event={canvas}
          ref={assignRef(details, "canvas")}
        ></kul-canvas>
      );
    },
    // #endregion

    // #region Clear history
    clearHistory: () => {
      const { controller, elements, handlers } = getAdapter();
      const { current } = controller.get.history;
      const { details } = elements.refs;
      const { button } = handlers.details;

      const hasHistory = !!(current()?.length > 1);
      const isDisabled = !hasHistory;

      return (
        <kul-button
          class={className.clearHistory}
          data-cy={KulDataCyAttributes.BUTTON}
          id={IDS.details.clearHistory}
          kulDisabled={isDisabled}
          kulIcon="layers_clear"
          kulLabel="Clear history"
          kulStyling="flat"
          onKul-button-event={button}
          ref={assignRef(details, "clearHistory")}
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

    // #region Delete shape
    deleteShape: () => {
      const { elements, handlers } = getAdapter();
      const { details } = elements.refs;
      const { button } = handlers.details;

      return (
        <kul-button
          class={className.deleteShape}
          data-cy={KulDataCyAttributes.BUTTON}
          id={IDS.details.deleteShape}
          kulIcon="delete-empty"
          kulLabel="Delete image"
          onKul-button-event={button}
          ref={assignRef(details, "deleteShape")}
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

    // #region Redo
    redo: () => {
      const { controller, elements, handlers } = getAdapter();
      const { current, index } = controller.get.history;
      const { details } = elements.refs;
      const { button } = handlers.details;

      const currentHistory = current();
      const hasHistory = !!currentHistory?.length;
      const isDisabled = !(hasHistory && index() < currentHistory.length - 1);

      return (
        <kul-button
          class={className.redo}
          data-cy={KulDataCyAttributes.BUTTON}
          id={IDS.details.redo}
          kulDisabled={isDisabled}
          kulIcon="redo"
          kulLabel="Redo"
          kulStyling="flat"
          onKul-button-event={button}
          ref={assignRef(details, "redo")}
        ></kul-button>
      );
    },
    // #endregion

    // #region Save
    save: () => {
      const { controller, elements, handlers } = getAdapter();
      const { current } = controller.get.history;
      const { details } = elements.refs;
      const { button } = handlers.details;

      const hasHistory = !!(current()?.length > 1);
      const isDisabled = !hasHistory;

      return (
        <kul-button
          class={className.save}
          data-cy={KulDataCyAttributes.BUTTON}
          id={IDS.details.save}
          kulDisabled={isDisabled}
          kulIcon="save"
          kulLabel="Save snapshot"
          onKul-button-event={button}
          ref={assignRef(details, "save")}
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

    // #region Spinner
    spinner: () => {
      const { controller, elements } = getAdapter();
      const { spinnerStatus } = controller.get;
      const { details } = elements.refs;

      return (
        <kul-spinner
          class={className.spinner}
          id={IDS.details.spinner}
          kulActive={spinnerStatus()}
          kulDimensions="16px"
          kulFader={true}
          kulFaderTimeout={125}
          kulLayout={14}
          ref={assignRef(details, "save")}
        ></kul-spinner>
      );
    },
    // #endregion

    // #region Tree
    tree: () => {
      const { controller, elements, handlers } = getAdapter();
      const { compInstance } = controller.get;
      const { details } = elements.refs;
      const { tree } = handlers.details;

      return (
        <kul-tree
          class={className.tree}
          data-cy={KulDataCyAttributes.INPUT}
          id={IDS.details.tree}
          kulAccordionLayout={true}
          kulData={compInstance.kulValue}
          kulSelectable={true}
          onKul-tree-event={tree}
          ref={assignRef(details, "tree")}
        ></kul-tree>
      );
    },
    // #endregion

    // #region Undo
    undo: () => {
      const { controller, elements, handlers } = getAdapter();
      const { current, index } = controller.get.history;
      const { details } = elements.refs;
      const { button } = handlers.details;

      const hasHistory = !!current()?.length;
      const isDisabled = !(hasHistory && index() > 0);

      return (
        <kul-button
          class={className.undo}
          data-cy={KulDataCyAttributes.BUTTON}
          id={IDS.details.undo}
          kulDisabled={isDisabled}
          kulIcon="undo"
          kulLabel="Undo"
          kulStyling="flat"
          onKul-button-event={button}
          ref={assignRef(details, "undo")}
        ></kul-button>
      );
    },
    // #endregion
  };
};
