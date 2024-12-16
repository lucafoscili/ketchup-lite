import { KulButtonStyling } from "src/components/kul-button/kul-button-declarations";
import { KulMasonryAdapterElementsRefs } from "../kul-masonry-declarations";

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
export const REFS = (): KulMasonryAdapterElementsRefs => {
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
