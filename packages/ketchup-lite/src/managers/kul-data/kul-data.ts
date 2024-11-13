import { columnFind } from './utils/kul-data-column-utils';
import {
    KulDataCell,
    KulDataColumn,
    KulDataDataset,
    KulDataGenericCell,
    KulDataNode,
    KulDataNodeOperations,
    KulDataShapeCallback,
    KulDataShapeComponentMap,
    KulDataShapeEventDispatcher,
    KulDataShapes,
} from './kul-data-declarations';
import {
    cellDecorateShapes,
    cellExists,
    cellGetAllShapes,
    cellGetShape,
    cellStringify,
} from './utils/kul-data-cell-utils';
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
} from './utils/kul-data-node-utils';
import { KulComponentName } from '../../types/GenericTypes';

export class KulData {
    #SHAPES_MAP: KulDataShapeComponentMap = {
        badge: 'KulBadge',
        button: 'KulButton',
        card: 'KulCard',
        chart: 'KulChart',
        chat: 'KulChat',
        chip: 'KulChip',
        code: 'KulCode',
        image: 'KulImage',
        number: 'KulTextfield',
        switch: 'KulSwitch',
        text: 'KulTextfield',
        upload: 'KulUpload',
    };
    cell = {
        exists: (node: KulDataNode) => cellExists(node),
        shapes: {
            decorate: <
                C extends KulComponentName,
                S extends KulDataShapes | 'text',
            >(
                shape: S,
                items: Partial<KulDataCell<S>>[],
                eventDispatcher: KulDataShapeEventDispatcher,
                defaultProps?: Partial<KulDataCell<S>>[],
                defaultCb?: S extends 'text'
                    ? never
                    : KulDataShapeCallback<C, S>
            ) =>
                cellDecorateShapes(
                    this.#SHAPES_MAP[shape],
                    shape,
                    items,
                    eventDispatcher,
                    defaultProps,
                    defaultCb
                ),
            get: (cell: KulDataCell<KulDataShapes>, deepCopy = true) =>
                cellGetShape(cell, deepCopy),
            getAll: (dataset: KulDataDataset, deepCopy = true) =>
                cellGetAllShapes(dataset, deepCopy),
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
}
