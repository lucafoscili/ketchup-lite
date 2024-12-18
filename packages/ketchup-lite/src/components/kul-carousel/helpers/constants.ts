import { KulCarouselAdapterRefs } from "../kul-carousel-declarations";

//#region Icons
export const ICONS = {
  back: "chevron_left",
  forward: "chevron_right",
};
//#endregion

//#region Ids
export const IDS = {
  back: "back-button",
  forward: "forward-button",
};
//#endregion

//#region Refs
export const REFS = (): KulCarouselAdapterRefs => {
  return { back: null, forward: null };
};
//#endregion
