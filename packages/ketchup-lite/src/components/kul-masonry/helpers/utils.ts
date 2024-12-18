import { KulMasonryAdapter } from "src/components/kul-masonry/kul-masonry-declarations";

//#region addColumn
export const addColumn = async (adapter: KulMasonryAdapter) => {
  const { compInstance } = adapter.state.get;

  compInstance.kulColumns++;
};
//#endregion

//#region removeColumn
export const removeColumn = async (adapter: KulMasonryAdapter) => {
  const { compInstance } = adapter.state.get;

  if (compInstance.kulColumns > 2) {
    compInstance.kulColumns--;
  }
};
//#endregion

//#region changeView
export const changeView = async (adapter: KulMasonryAdapter) => {
  const { compInstance, isMasonry, isVertical } = adapter.state.get;

  if (isMasonry()) {
    compInstance.kulView = "vertical";
  } else if (isVertical()) {
    compInstance.kulView = "horizontal";
  } else {
    compInstance.kulView = "masonry";
  }
};
//#endregion
