import {
  KulImageviewerAdapterRefs,
  KulImageviewerPropsInterface,
} from "../kul-imageviewer-declarations";

//#region Props
export const KUL_IMAGEVIEWER_PROPS: (keyof KulImageviewerPropsInterface)[] = [
  "kulData",
  "kulLoadCallback",
  "kulStyle",
  "kulValue",
];
//#endregion

//#region Ids
export const IDS = {
  details: {
    canvas: "details-canvas",
    clearHistory: "details-clear-history",
    deleteShape: "details-delete-shape",
    redo: "details-redo",
    save: "details-save",
    spinner: "details-spinner",
    tree: "details-tree",
    undo: "details-undo",
  },
  navigation: {
    load: "navigation-load",
    masonry: "navigation-masonry",
    textfield: "navigation-textfield",
  },
};
//#endregion

//#region Refs
export const REFS = (): KulImageviewerAdapterRefs => {
  return {
    details: {
      canvas: null,
      clearHistory: null,
      deleteShape: null,
      redo: null,
      save: null,
      spinner: null,
      undo: null,
      tree: null,
    },
    navigation: {
      load: null,
      masonry: null,
      textfield: null,
    },
  };
};
//#endregion
