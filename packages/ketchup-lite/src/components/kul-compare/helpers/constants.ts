import {
  KulCompareAdapterDefaults,
  KulCompareAdapterRefs,
  KulComparePropsInterface,
} from "../kul-compare-declarations";

//#region Props
export const KUL_COMPARE_PROPS: (keyof KulComparePropsInterface)[] = [
  "kulData",
  "kulShape",
  "kulStyle",
  "kulView",
];
//#endregion

//#region Icons
export const ICONS = {
  close: "view-sequential",
  changeView: "compare",
  changeViewOff: "book-open",
  leftButton: "view-sequential",
  rightButton: "view-sequential",
};
//#endregion

//#region Ids
export const IDS = {
  leftButton: "toggle-left-button",
  leftTree: "toggle-left-tree",
  rightButton: "toggle-right-button",
  rightTree: "toggle-right-tree",
  changeView: "change-view",
};
//#endregion

//#region Defaults
export const DEFAULTS = (): KulCompareAdapterDefaults => {
  return {
    left: {
      image: () => [
        {
          htmlProps: { className: "kul-fit" },
          kulSizeX: "100%",
          kulSizeY: "100%",
        },
      ],
    },
    right: {
      image: () => [
        {
          htmlProps: { className: "kul-fit" },
          kulSizeX: "100%",
          kulSizeY: "100%",
        },
      ],
    },
  };
};
//#endregion

//#region Refs
export const REFS = (): KulCompareAdapterRefs => {
  return {
    changeView: null,
    leftButton: null,
    leftTree: null,
    rightButton: null,
    rightTree: null,
  };
};
//#endregion
