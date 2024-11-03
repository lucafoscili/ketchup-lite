import { columnFind } from './utils/kul-data-column-utils';
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
} from './kul-data-declarations';
import {
    cellDecorateShapes,
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
