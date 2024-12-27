import {
  KulDataDataset,
  KulDataGenericCell,
} from "src/managers/kul-data/kul-data-declarations";

//#region prepTreeDataset
export const prepTreeDataset = (
  currentShape: KulDataGenericCell,
  shapes: KulDataGenericCell[],
) => {
  const dataset: KulDataDataset = { nodes: [] };

  for (let index = 0; index < shapes.length; index++) {
    const shape = shapes[index];
    const strIndex = String(index).valueOf();

    dataset.nodes.push({
      icon: currentShape === shape && "check",
      id: strIndex,
      value: `#${strIndex}`,
    });
  }

  return dataset;
};
//#endregion
