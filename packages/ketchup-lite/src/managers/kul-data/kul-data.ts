import type { KulManager } from "../kul-manager/kul-manager";
import { KulComponentName } from "../../types/GenericTypes";
import {
  KulDataCell,
  KulDataColumn,
  KulDataDataset,
  KulDataNode,
  KulDataNodeOperations,
  KulDataShapeCallback,
  KulDataShapeComponentMap,
  KulDataShapeEventDispatcher,
  KulDataShapes,
} from "./kul-data-declarations";
import {
  cellDecorateShapes,
  cellExists,
  cellGetAllShapes,
  cellGetShape,
  cellStringify,
} from "./utils/cell";
import { columnFind } from "./utils/column";
import {
  findNodeByCell,
  nodeExists,
  nodeFilter,
  nodeFixIds,
  nodeGetDrilldownInfo,
  nodeGetParent,
  nodePop,
  nodeSetProperties,
  nodeToStream,
} from "./utils/node";

export class KulData {
  #KUL_MANAGER: KulManager;
  #SHAPES_MAP: KulDataShapeComponentMap = {
    badge: "KulBadge",
    button: "KulButton",
    canvas: "KulCanvas",
    card: "KulCard",
    chart: "KulChart",
    chat: "KulChat",
    chip: "KulChip",
    code: "KulCode",
    image: "KulImage",
    number: "KulTextfield",
    photoframe: "KulPhotoframe",
    slot: "KulTextfield",
    text: "KulTextfield",
    toggle: "KulToggle",
    typewriter: "KulTypewriter",
    upload: "KulUpload",
  };

  constructor(kulManager: KulManager) {
    this.#KUL_MANAGER = kulManager;
  }

  //#region Cell
  cell = {
    exists: (node: KulDataNode) => cellExists(node),
    shapes: {
      decorate: <C extends KulComponentName, S extends KulDataShapes | "text">(
        shape: S,
        items: Partial<KulDataCell<S>>[],
        eventDispatcher: KulDataShapeEventDispatcher,
        defaultProps?: Partial<KulDataCell<S>>[],
        defaultCb?: S extends "text" ? never : KulDataShapeCallback<C, S>,
      ) =>
        cellDecorateShapes(
          this.#KUL_MANAGER,
          this.#SHAPES_MAP[shape],
          shape,
          items,
          eventDispatcher,
          defaultProps,
          defaultCb,
        ),
      get: (cell: KulDataCell<KulDataShapes>, deepCopy = true) =>
        cellGetShape(cell, deepCopy),
      getAll: (dataset: KulDataDataset, deepCopy = true) =>
        cellGetAllShapes(dataset, deepCopy),
    },
    stringify: (value: KulDataCell<KulDataShapes>["value"]) =>
      cellStringify(value),
  };
  //#endregion

  //#region Column
  column = {
    find: (
      dataset: KulDataDataset | KulDataColumn[],
      filters: Partial<KulDataColumn>,
    ) => columnFind(dataset, filters),
  };
  //#endregion

  //#region Node
  node: KulDataNodeOperations = {
    exists: (dataset) => nodeExists(dataset),
    filter: (dataset, filters, partialMatch = false) =>
      nodeFilter(dataset, filters, partialMatch),
    findNodeByCell: (dataset, cell) => findNodeByCell(dataset, cell),
    fixIds: (nodes) => nodeFixIds(nodes),
    getDrilldownInfo: (nodes) => nodeGetDrilldownInfo(nodes),
    getParent: (nodes, child) => nodeGetParent(nodes, child),
    pop: (nodes, node2remove) => nodePop(nodes, node2remove),
    removeNodeByCell: (dataset, cell) => findNodeByCell(dataset, cell),
    setProperties: (nodes, properties, recursively?, exclude?) =>
      nodeSetProperties(nodes, properties, recursively, exclude),
    toStream: (nodes) => nodeToStream(nodes),
  };
  //#endregion
}
