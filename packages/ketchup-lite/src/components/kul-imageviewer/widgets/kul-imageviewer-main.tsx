import { h } from "@stencil/core";

import {
  buttonEventHandler,
  canvasEventHandler,
  treeEventHandler,
} from "src/components/kul-imageviewer/handlers/kul-imageviewer-main";
import { IMAGEVIEWER_IDS } from "src/components/kul-imageviewer/helpers/kul-imageviewer-utils";
import { KulImageviewerAdapter } from "src/components/kul-imageviewer/kul-imageviewer-declarations";
import { KulDataCyAttributes } from "src/types/GenericTypes";

export const prepImageviewer = (
  adapter: KulImageviewerAdapter,
): KulImageviewerAdapter["widgets"]["jsx"]["imageviewer"] => {
  const { hooks, widgets } = adapter;
  const { refs } = widgets;
  const { get } = hooks;
  const { imageviewer } = refs;
  const { comp, history, spinnerStatus } = get;
  const { current, currentSnapshot, index } = history;

  return {
    // #region Canvas
    canvas: () => {
      const className = {
        "details-grid__canvas": true,
      };

      const snapshot = currentSnapshot();
      if (!snapshot) {
        return;
      }

      return (
        <kul-canvas
          class={className}
          data-cy={KulDataCyAttributes.SHAPE}
          id={IMAGEVIEWER_IDS.canvas}
          kulImageProps={{ kulValue: snapshot.value }}
          onKul-canvas-event={(e) => canvasEventHandler(adapter, e)}
          ref={(el) => {
            if (el) {
              imageviewer.canvas = el;
            }
          }}
        ></kul-canvas>
      );
    },
    // #endregion

    // #region Clear history
    clearHistory: () => {
      const className = {
        "details-grid__clear-history": true,
        "kul-danger": true,
        "kul-full-width": true,
      };

      const hasHistory = !!(current()?.length > 1);
      const isDisabled = !hasHistory;

      return (
        <kul-button
          class={className}
          data-cy={KulDataCyAttributes.BUTTON}
          id={IMAGEVIEWER_IDS.clearHistory}
          kulDisabled={isDisabled}
          kulIcon="layers_clear"
          kulLabel="Clear history"
          kulStyling="flat"
          onKul-button-event={(e) => buttonEventHandler(adapter, e)}
          ref={(el) => {
            if (el) {
              imageviewer.clearHistory = el;
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

    // #region Delete shape
    deleteShape: () => {
      const className = {
        "details-grid__delete": true,
        "kul-danger": true,
        "kul-full-width": true,
      };

      return (
        <kul-button
          class={className}
          data-cy={KulDataCyAttributes.BUTTON}
          id={IMAGEVIEWER_IDS.deleteShape}
          kulIcon="delete-empty"
          kulLabel="Delete image"
          onKul-button-event={(e) => buttonEventHandler(adapter, e)}
          ref={(el) => {
            if (el) {
              imageviewer.deleteShape = el;
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

    // #region Redo
    redo: () => {
      const className = {
        "details-grid__redo": true,
        "kul-full-width": true,
      };

      const currentHistory = current();
      const hasHistory = !!currentHistory?.length;
      const isDisabled = !(hasHistory && index() < currentHistory.length - 1);

      return (
        <kul-button
          class={className}
          data-cy={KulDataCyAttributes.BUTTON}
          id={IMAGEVIEWER_IDS.redo}
          kulDisabled={isDisabled}
          kulIcon="redo"
          kulLabel="Redo"
          kulStyling="flat"
          onKul-button-event={(e) => buttonEventHandler(adapter, e)}
          ref={(el) => {
            if (el) {
              imageviewer.redo = el;
            }
          }}
        ></kul-button>
      );
    },
    // #endregion

    // #region Save
    save: () => {
      const className = {
        "details-grid__commit-changes": true,
        "kul-success": true,
        "kul-full-width": true,
      };

      const hasHistory = !!(current()?.length > 1);
      const isDisabled = !hasHistory;

      return (
        <kul-button
          class={className}
          data-cy={KulDataCyAttributes.BUTTON}
          id={IMAGEVIEWER_IDS.save}
          kulDisabled={isDisabled}
          kulIcon="save"
          kulLabel="Save snapshot"
          onKul-button-event={(e) => buttonEventHandler(adapter, e)}
          ref={(el) => {
            if (el) {
              imageviewer.save = el;
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

    // #region Spinner
    spinner: () => {
      const className = {
        "details-grid__spinner": true,
      };

      return (
        <kul-spinner
          class={className}
          id={IMAGEVIEWER_IDS.spinner}
          kulActive={spinnerStatus()}
          kulDimensions="16px"
          kulFader={true}
          kulFaderTimeout={125}
          kulLayout={14}
          ref={(el) => {
            if (el) {
              imageviewer.spinner = el;
            }
          }}
        ></kul-spinner>
      );
    },
    // #endregion

    // #region Tree
    tree: () => {
      const className = {
        "details-grid__tree": true,
      };

      return (
        <kul-tree
          class={className}
          data-cy={KulDataCyAttributes.INPUT}
          id={IMAGEVIEWER_IDS.tree}
          kulAccordionLayout={true}
          kulData={comp.kulValue}
          kulSelectable={true}
          onKul-tree-event={(e) => treeEventHandler(adapter, e)}
          ref={(el) => {
            if (el) {
              imageviewer.tree = el;
            }
          }}
        ></kul-tree>
      );
    },
    // #endregion

    // #region Undo
    undo: () => {
      const className = {
        "details-grid__undo": true,
        "kul-full-width": true,
      };

      const hasHistory = !!current()?.length;
      const isDisabled = !(hasHistory && index() > 0);

      return (
        <kul-button
          class={className}
          data-cy={KulDataCyAttributes.BUTTON}
          id={IMAGEVIEWER_IDS.undo}
          kulDisabled={isDisabled}
          kulIcon="undo"
          kulLabel="Undo"
          kulStyling="flat"
          onKul-button-event={(e) => buttonEventHandler(adapter, e)}
          ref={(el) => {
            if (el) {
              imageviewer.undo = el;
            }
          }}
        ></kul-button>
      );
    },
    // #endregion
  };
};
