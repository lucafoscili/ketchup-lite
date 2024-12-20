import { KulButtonStyling } from "src/components/kul-button/kul-button-declarations";
import {
  KulMasonryAdapterRefs,
  KulMasonryPropsInterface,
} from "../kul-masonry-declarations";

//#region Props
export const KUL_MASONRY_PROPS: (keyof KulMasonryPropsInterface)[] = [
  "kulColumns",
  "kulData",
  "kulSelectable",
  "kulStyle",
  "kulView",
];
//#endregion

//#region Icons
export const ICONS = {
  addColumn: "plus",
  horizontal: "view_column",
  masonry: "view_quilt",
  removeColumn: "remove",
  vertical: "view_day",
};
//#endregion

//#region Icons
export const IDS = {
  addColumn: "add-column",
  horizontal: "horizontal",
  masonry: "masonry",
  removeColumn: "remove-column",
  vertical: "vertical",
};
//#endregion

//#region Refs
export const REFS = (): KulMasonryAdapterRefs => {
  return {
    addColumn: null,
    removeColumn: null,
    changeView: null,
  };
};
//#endregion

//#region Button styling
export const STYLING: KulButtonStyling = "floating";
//#endregion
