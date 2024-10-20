import { columnFind } from './utils/kul-data-column-utils';
import {
    KulDataCell,
    KulDataColumn,
    KulDataDataset,
    KulDataNode,
    KulDataNodeDrilldownInfo,
    KulDataNodeOperations,
    KulDataShapes,
} from './kul-data-declarations';
import {
    cellExists,
    cellGetAllShapes,
    cellGetShape,
    cellStringify,
} from './utils/kul-data-cell-utils';
import {
    nodeExists,
    nodeFilter,
    nodeFixIds,
    nodeGetDrilldownInfo,
    nodeGetParent,
    nodePop,
    nodeSetProperties,
    nodeToStream,
} from './utils/kul-data-node-utils';

/**
 * Handles data operations.
 * @module KulData
 */
export class KulData {
    cell = {
        exists: (node: KulDataNode) => cellExists(node),
        shapes: {
            get: (cell: KulDataCell<KulDataShapes>) => cellGetShape(cell),
            getAll: (dataset: KulDataDataset) => cellGetAllShapes(dataset),
        },
        stringify: (value: KulDataCell<KulDataShapes>['value']) =>
            cellStringify(value),
    };
    column = {
        find: (
            dataset: KulDataDataset | KulDataColumn[],
            filters: Partial<KulDataColumn>
        ) => columnFind(dataset, filters),
    };
    node: KulDataNodeOperations = {
        exists: (dataset: KulDataDataset) => nodeExists(dataset),
        filter: (
            dataset: KulDataDataset,
            filters: Partial<KulDataNode>,
            partialMatch: boolean = false
        ) => nodeFilter(dataset, filters, partialMatch),
        fixIds: (nodes: KulDataNode[]) => nodeFixIds(nodes),
        getDrilldownInfo: (nodes: KulDataNode[]) => nodeGetDrilldownInfo(nodes),
        getParent: (nodes: KulDataNode[], child: KulDataNode) =>
            nodeGetParent(nodes, child),
        pop: (nodes: KulDataNode[], node2remove: KulDataNode) =>
            nodePop(nodes, node2remove),
        setProperties: (
            nodes: KulDataNode[],
            properties: Partial<KulDataNode>,
            recursively?: boolean,
            exclude?: KulDataNode[]
        ) => nodeSetProperties(nodes, properties, recursively, exclude),
        toStream: (nodes: KulDataNode[]) => nodeToStream(nodes),
    };
}
