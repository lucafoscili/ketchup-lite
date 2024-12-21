import { IDS } from "../helpers/constants";
import {
  KulCompareAdapter,
  KulCompareAdapterHandlers,
} from "../kul-compare-declarations";

export const prepToolbarHandlers = (
  getAdapter: () => KulCompareAdapter,
): KulCompareAdapterHandlers => {
  return {
    //#region Button
    button: (e) => {
      const { eventType, id, valueAsBoolean } = e.detail;

      const { set } = getAdapter().controller;

      switch (eventType) {
        case "click":
          switch (id) {
            case IDS.leftButton:
              set.leftPanelOpened(valueAsBoolean);
              break;
            case IDS.changeView:
              set.splitView(valueAsBoolean);
              break;
            case IDS.rightButton:
              set.rightPanelOpened(valueAsBoolean);
              break;
          }
          break;
      }
    },
    //#endregion

    //#region Tree
    tree: (e) => {
      const { eventType, id, node } = e.detail;

      const { get, set } = getAdapter().controller;
      const { shapes } = get;

      switch (eventType) {
        case "click":
          const shape = shapes()[parseInt(node.id)];
          switch (id) {
            case IDS.leftTree:
              set.leftShape(shape);
              break;
            case IDS.rightTree:
              set.rightShape(shape);
              break;
          }
          break;
      }
    },
  };
  //#endregion
};
