import { findColumns } from './utils/kul-data-column-utils';
import {
    filter,
    getDrilldownInfo,
    getParent,
    pop,
    setProperties,
    toStream,
} from './utils/kul-data-node-utils';
import {
    KulDataCell,
    KulDataColumn,
    KulDataDataset,
    KulDataNode,
    KulDataNodeDrilldownInfo,
    KulDataNodeOperations,
    KulDataShapes,
    KulDataShapesMap,
} from './kul-data-declarations';

/**
 * Handles data operations.
 * @module KulData
 */
export class KulData {
    cell = {
        exists: (node: KulDataNode) => {
            return !!(node && node.cells && Object.keys(node.cells).length);
        },
        stringify: (value: unknown) => {
            if (value === null || value === undefined) {
                return String(value);
            } else if (value instanceof Date) {
                return value.toISOString();
            } else if (typeof value === 'object') {
                try {
                    return JSON.stringify(value, null, 2);
                } catch (error) {
                    console.error('Failed to stringify object:', error);
                    return '[object Object]';
                }
            } else {
                return String(value);
            }
        },
    };
    column = {
        find(
            dataset: KulDataDataset | KulDataColumn[],
            filters: Partial<KulDataColumn>
        ): KulDataColumn[] {
            return findColumns(dataset, filters);
        },
    };
    extract = {
        shapes: (dataset: KulDataDataset) => {
            if (!this.node.exists(dataset)) {
                return;
            }

            const shapes: KulDataShapesMap = {
                badge: [],
                button: [],
                chart: [],
                chat: [],
                chip: [],
                code: [],
                image: [],
                number: [],
                switch: [],
                text: [],
            };
            const nodes = dataset.nodes;

            const browseCells = (node: KulDataNode) => {
                if (!this.cell.exists(node)) {
                    return;
                }
                const cells = node.cells;
                for (const key in cells) {
                    if (Object.prototype.hasOwnProperty.call(cells, key)) {
                        const cell = cells[key];
                        const extracted = this.extract.singleShape(cell);
                        switch (cell.shape) {
                            case 'badge':
                                shapes.badge.push(
                                    extracted as KulDataCell<'badge'>
                                );
                                break;
                            case 'button':
                                shapes.button.push(
                                    extracted as KulDataCell<'button'>
                                );
                                break;
                            case 'chart':
                                shapes.chart.push(
                                    extracted as KulDataCell<'chart'>
                                );
                                break;
                            case 'chat':
                                shapes.chat.push(
                                    extracted as KulDataCell<'chat'>
                                );
                                break;
                            case 'chip':
                                shapes.chip.push(
                                    extracted as KulDataCell<'chip'>
                                );
                                break;
                            case 'code':
                                shapes.code.push(
                                    extracted as KulDataCell<'code'>
                                );
                                break;
                            case 'image':
                                shapes.image.push(
                                    extracted as KulDataCell<'image'>
                                );
                                break;
                            case 'switch':
                                shapes.switch.push(
                                    extracted as KulDataCell<'switch'>
                                );
                                break;
                            case 'number':
                                shapes.number.push(
                                    cell as KulDataCell<'number'>
                                );
                                break;
                            case 'text':
                            default:
                                shapes.text.push(cell);
                                break;
                        }
                    }
                }
            };
            const recursive = (node: KulDataNode) => {
                for (
                    let index = 0;
                    node.children && index < node.children.length;
                    index++
                ) {
                    recursive(node.children[index]);
                }
            };
            for (let index = 0; index < nodes.length; index++) {
                const node = nodes[index];
                browseCells(node);
                recursive(node);
            }
            return shapes;
        },
        singleShape: <T extends KulDataShapes>(cell: KulDataCell<T>) => {
            const prefix = 'kul';
            const shapeProps: Partial<KulDataCell<T>> = {};
            for (const prop in cell) {
                switch (prop) {
                    case 'htmlProps':
                        Object.assign(shapeProps, cell[prop]);
                        break;
                    case 'shape':
                        break;
                    default:
                        if (prop.indexOf(prefix) === 0) {
                            shapeProps[prop] = cell[prop];
                        } else {
                            const prefixedProp =
                                prefix +
                                prop.charAt(0).toUpperCase() +
                                prop.slice(1);
                            if (!shapeProps[prefixedProp]) {
                                shapeProps[prefixedProp] = cell[prop];
                            }
                        }
                        break;
                }
            }
            return shapeProps;
        },
    };
    node: KulDataNodeOperations = {
        exists: (dataset: KulDataDataset) => {
            return !!(dataset && dataset.nodes?.length);
        },
        filter: (
            dataset: KulDataDataset,
            filters: Partial<KulDataNode>,
            partialMatch: boolean = false
        ): {
            matchingNodes: Set<KulDataNode>;
            remainingNodes: Set<KulDataNode>;
            ancestorNodes: Set<KulDataNode>;
        } => {
            return filter(this.cell.stringify, dataset, filters, partialMatch);
        },
        fixIds: (nodes: KulDataNode[]) => {
            function updateNodeIds(
                node: KulDataNode,
                depth: string = '0'
            ): void {
                node.id = depth;

                if (node.children) {
                    node.children.forEach((child: any, index: number) => {
                        const newDepth = `${depth}.${index}`;
                        updateNodeIds(child, newDepth);
                    });
                }
            }
            nodes.forEach((node: KulDataNode) => {
                updateNodeIds(node, '0');
            });
            return nodes;
        },
        getDrilldownInfo(nodes: KulDataNode[]): KulDataNodeDrilldownInfo {
            return getDrilldownInfo(nodes);
        },
        getParent(nodes: KulDataNode[], child: KulDataNode): KulDataNode {
            return getParent(nodes, child);
        },
        pop(nodes: KulDataNode[], node2remove: KulDataNode): KulDataNode {
            return pop(nodes, node2remove);
        },
        setProperties(
            nodes: KulDataNode[],
            properties: Partial<KulDataNode>,
            recursively?: boolean,
            exclude?: KulDataNode[]
        ): KulDataNode[] {
            return setProperties(nodes, properties, recursively, exclude);
        },
        toStream(nodes: KulDataNode[]): KulDataNode[] {
            return toStream(nodes);
        },
    };
}
