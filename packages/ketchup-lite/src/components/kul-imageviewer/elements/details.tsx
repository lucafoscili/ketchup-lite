import { h } from "@stencil/core";
import { KulDataCyAttributes } from "src/types/GenericTypes";
import { IDS } from "../helpers/constants";
import {
  KulImageviewerAdapter,
  KulImageviewerAdapterJsx,
} from "../kul-imageviewer-declarations";

export const prepDetails = (
  getAdapter: () => KulImageviewerAdapter,
): KulImageviewerAdapterJsx["details"] => {
  return {
    // #region Canvas
    canvas: () => {
      const { controller, elements, handlers } = getAdapter();
      const { history, manager } = controller.get;
      const { details } = elements.refs;
      const { canvas } = handlers.details;
      const { currentSnapshot } = history;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      const snapshot = currentSnapshot();
      if (!snapshot) {
        return;
      }

      return (
        <kul-canvas
          class={bemClass("details-grid", "canvas")}
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
      const { history, manager } = controller.get;
      const { details } = elements.refs;
      const { button } = handlers.details;
      const { current } = history;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      const hasHistory = !!(current()?.length > 1);
      const isDisabled = !hasHistory;

      return (
        <kul-button
          class={`${bemClass("details-grid", "clear-history")} kul-danger kul-full-width`}
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
      const { controller, elements, handlers } = getAdapter();
      const { manager } = controller.get;
      const { details } = elements.refs;
      const { button } = handlers.details;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      return (
        <kul-button
          class={`${bemClass("details-grid", "delete")} kul-danger kul-full-width`}
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
      const { history, manager } = controller.get;
      const { current, index } = history;
      const { details } = elements.refs;
      const { button } = handlers.details;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      const currentHistory = current();
      const hasHistory = !!currentHistory?.length;
      const isDisabled = !(hasHistory && index() < currentHistory.length - 1);

      return (
        <kul-button
          class={`${bemClass("details-grid", "redo")} kul-full-width`}
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
      const { history, manager } = controller.get;
      const { current } = history;
      const { details } = elements.refs;
      const { button } = handlers.details;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      const hasHistory = !!(current()?.length > 1);
      const isDisabled = !hasHistory;

      return (
        <kul-button
          class={`${bemClass("details-grid", "commit-changes")} kul-success kul-full-width`}
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
      const { manager, spinnerStatus } = controller.get;
      const { details } = elements.refs;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      return (
        <kul-spinner
          class={`${bemClass("details-grid", "spinner")}`}
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
      const { compInstance, manager } = controller.get;
      const { details } = elements.refs;
      const { tree } = handlers.details;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      return (
        <kul-tree
          class={`${bemClass("details-grid", "tree")}`}
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
      const { history, manager } = controller.get;
      const { current, index } = history;
      const { details } = elements.refs;
      const { button } = handlers.details;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      const hasHistory = !!current()?.length;
      const isDisabled = !(hasHistory && index() > 0);

      return (
        <kul-button
          class={`${bemClass("details-grid", "undo")} kul-full-width`}
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
