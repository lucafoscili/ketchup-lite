import { KulMasonryAdapter } from "src/components/kul-masonry/kul-masonry-declarations";
import { COLUMNS_CSS_VAR } from "./constants";
import { KulMasonry } from "../kul-masonry";

//#region addColumn
export const addColumn = async (adapter: KulMasonryAdapter) => {
  const { compInstance, currentColumns } = adapter.controller.get;

  const current = getCSSValue(compInstance) || currentColumns();
  setCSSValue(compInstance, current + 1);
};
//#endregion

//#region removeColumn
export const removeColumn = async (adapter: KulMasonryAdapter) => {
  const { compInstance, currentColumns } = adapter.controller.get;

  const current = getCSSValue(compInstance) || currentColumns();
  if (current > 1) {
    setCSSValue(compInstance, current - 1);
  }
};
//#endregion

//#region changeView
export const changeView = async (adapter: KulMasonryAdapter) => {
  const { compInstance, isMasonry, isVertical } = adapter.controller.get;

  if (isMasonry()) {
    compInstance.kulView = "vertical";
  } else if (isVertical()) {
    compInstance.kulView = "horizontal";
  } else {
    compInstance.kulView = "masonry";
  }
};
//#endregion

//#region Helpers
const getCSSValue = (compInstance: KulMasonry) => {
  return Number(
    compInstance.rootElement.style.getPropertyValue(COLUMNS_CSS_VAR),
  );
};
const setCSSValue = (compInstance: KulMasonry, value: number) => {
  return Number(
    compInstance.rootElement.style.setProperty(COLUMNS_CSS_VAR, String(value)),
  );
};
//#endregion
