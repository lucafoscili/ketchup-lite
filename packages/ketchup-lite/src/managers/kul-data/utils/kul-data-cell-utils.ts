import {
    KulDataCell,
    KulDataDataset,
    KulDataNode,
    KulDataShapes,
    KulDataShapesMap,
} from '../kul-data-declarations';
import { nodeExists } from './kul-data-node-utils';

export const cellExists = (node: KulDataNode) => {
    return !!(node && node.cells && Object.keys(node.cells).length);
};
export const cellGetShape = <T extends KulDataShapes>(cell: KulDataCell<T>) => {
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
                        prefix + prop.charAt(0).toUpperCase() + prop.slice(1);
                    if (!shapeProps[prefixedProp]) {
                        shapeProps[prefixedProp] = cell[prop];
                    }
                }
                break;
        }
    }
    return shapeProps;
};
export const cellGetAllShapes = (dataset: KulDataDataset) => {
    if (!nodeExists(dataset)) {
        return;
    }

    const shapes: KulDataShapesMap = {
        badge: [],
        button: [],
        card: [],
        chart: [],
        chat: [],
        chip: [],
        code: [],
        image: [],
        number: [],
        switch: [],
        text: [],
        upload: [],
    };
    const nodes = dataset.nodes;

    const browseCells = (node: KulDataNode) => {
        if (!cellExists(node)) {
            return;
        }
        const cells = node.cells;
        for (const key in cells) {
            if (Object.prototype.hasOwnProperty.call(cells, key)) {
                const cell = cells[key];
                const extracted = cellGetShape(cell);
                switch (cell.shape) {
                    case 'badge':
                        shapes.badge.push(extracted as KulDataCell<'badge'>);
                        break;
                    case 'button':
                        shapes.button.push(extracted as KulDataCell<'button'>);
                        break;
                    case 'card':
                        shapes.card.push(extracted as KulDataCell<'card'>);
                        break;
                    case 'chart':
                        shapes.chart.push(extracted as KulDataCell<'chart'>);
                        break;
                    case 'chat':
                        shapes.chat.push(extracted as KulDataCell<'chat'>);
                        break;
                    case 'chip':
                        shapes.chip.push(extracted as KulDataCell<'chip'>);
                        break;
                    case 'code':
                        shapes.code.push(extracted as KulDataCell<'code'>);
                        break;
                    case 'image':
                        shapes.image.push(extracted as KulDataCell<'image'>);
                        break;
                    case 'switch':
                        shapes.switch.push(extracted as KulDataCell<'switch'>);
                        break;
                    case 'number':
                        shapes.number.push(cell as KulDataCell<'number'>);
                        break;
                    case 'upload':
                        shapes.upload.push(extracted as KulDataCell<'upload'>);
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
};
export const cellStringify = (value: KulDataCell<KulDataShapes>['value']) => {
    if (value === null || value === undefined) {
        return String(value).valueOf();
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
        return String(value).valueOf();
    }
};
