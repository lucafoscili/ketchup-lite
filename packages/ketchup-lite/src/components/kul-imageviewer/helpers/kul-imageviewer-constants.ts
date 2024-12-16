import { KulImageviewerAdapterElementsRefs } from "../kul-imageviewer-declarations";

//#region Ids
export const IDS = {
  explorer: {
    load: "explorer-load",
    masonry: "explorer-masonry",
    textfield: "explorer-textfield",
  },
  imageviewer: {
    canvas: "imageviewer-canvas",
    clearHistory: "imageviewer-clear-history",
    deleteShape: "imageviewer-delete-shape",
    redo: "imageviewer-redo",
    save: "imageviewer-save",
    spinner: "imageviewer-spinner",
    tree: "imageviewer-tree",
    undo: "imageviewer-undo",
  },
};
//#endregion

//#region Refs
export const REFS = (): KulImageviewerAdapterElementsRefs => {
  return {
    explorer: {
      load: null,
      masonry: null,
      textfield: null,
    },
    imageviewer: {
      canvas: null,
      clearHistory: null,
      deleteShape: null,
      redo: null,
      save: null,
      spinner: null,
      undo: null,
      tree: null,
    },
  };
};
//#endregion
