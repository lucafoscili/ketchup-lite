import { KulDataDataset, KulDataNode } from '../kul-data-declarations';
import { cellStringify } from './kul-data-cell-utils';

export const nodeExists = (dataset: KulDataDataset) => {
    return !!(dataset && dataset.nodes?.length);
};
export const nodeFilter = (
    dataset: KulDataDataset,
    filters: Partial<KulDataNode>,
    partialMatch: boolean = false
) => {
    const matchingNodes: Set<KulDataNode> = new Set();
    const remainingNodes: Set<KulDataNode> = new Set();
    const ancestorNodes: Set<KulDataNode> = new Set();

    const recursive = (
        node: KulDataNode,
        ancestor: KulDataNode,
        ancestorSet: Set<KulDataNode>
    ) => {
        const hasChildren = node.children?.length;
        let matches = false;
        for (const key in filters) {
            const nodeValue = node[key];
            const filterValue = filters[key];
            const nodeValueStr = cellStringify(nodeValue).toLowerCase();
            const filterValueStr = cellStringify(filterValue).toLowerCase();

            if (partialMatch) {
                if (!nodeValueStr.includes(filterValueStr)) {
                    continue;
                }
            } else {
                if (nodeValue !== filterValue) {
                    continue;
                }
            }
            matches = true;
            break;
        }

        if (ancestor) {
            ancestorSet.add(ancestor);
        }

        if (matches) {
            matchingNodes.add(node);
        } else {
            remainingNodes.add(node);
        }

        if (hasChildren) {
            node.children.forEach((child) => {
                recursive(child, node, ancestorSet);
            });
        } else {
            if (matches) {
                ancestorSet.forEach((node) => {
                    ancestorNodes.add(node);
                });
            }
        }
    };

    dataset.nodes.forEach((node) => {
        const ancestorSet: Set<KulDataNode> = new Set();
        recursive(node, null, ancestorSet);
    });

    return {
        matchingNodes,
        remainingNodes,
        ancestorNodes,
    };
};
export const nodeFixIds = (nodes: KulDataNode[]) => {
    function updateNodeIds(node: KulDataNode, depth: string = '0'): void {
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
};
export const nodeGetAncestors = (node: KulDataNode, nodes: KulDataNode[]) => {
    const ancestors: KulDataNode[] = [];
    let current: KulDataNode = node;

    while (current) {
        ancestors.push(current);
        current = nodeGetParent(nodes, current);
    }
    ancestors.reverse();
    return ancestors;
};
export const nodeGetDrilldownInfo = (nodes: KulDataNode[]) => {
    let maxChildren = 0;
    let maxDepth = 0;

    const getDepth = function (n: KulDataNode) {
        const depth = 0;
        if (n.children) {
            n.children.forEach(function (d) {
                const tmpDepth = getDepth(d);
                if (tmpDepth > depth) {
                    maxDepth = tmpDepth;
                }
            });
        }
        return depth;
    };

    const recursive = (arr: KulDataNode[]) => {
        maxDepth++;
        for (let index = 0; index < arr.length; index++) {
            const node = arr[index];
            getDepth(node);
            if (
                Array.isArray(node.children) &&
                maxChildren < node.children.length
            ) {
                maxChildren = node.children.length;
                recursive(node.children);
            }
        }
    };

    recursive(nodes);
    return {
        maxChildren,
        maxDepth,
    };
};
export const nodeGetParent = (nodes: KulDataNode[], child: KulDataNode) => {
    let parent: KulDataNode = null;
    for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index];
        recursive(node);

        // Recursive function to traverse nodes and find the parent node
        function recursive(node: KulDataNode) {
            const hasChildren = !!node.children;

            if (hasChildren && node.children.includes(child)) {
                parent = node;
                return;
            }
            for (
                let index = 0;
                !parent && hasChildren && index < node.children.length;
                index++
            ) {
                recursive(node.children[index]);
            }
        }
    }
    return parent;
};
export const nodePop = (nodes: KulDataNode[], node2remove: KulDataNode) => {
    let removed: KulDataNode = null;
    for (let index = 0; index < nodes.length; index++) {
        recursive(nodes[index], nodes);

        function recursive(node: KulDataNode, array: KulDataNode[]) {
            const i = array.indexOf(node2remove);
            if (i > -1) {
                removed = { ...node2remove };
                array.splice(i, 1);
                return;
            }
            for (
                let index = 0;
                node.children && index < node.children.length;
                index++
            ) {
                if (node.children[index]) {
                    recursive(node.children[index], node.children);
                }
            }
        }
    }
    return removed;
};
export const nodeSort = (
    stringify: (value: unknown) => string,
    nodes: KulDataNode[],
    direction: 'asc' | 'desc' = 'asc'
) => {
    nodes.sort((a, b) => {
        let result = 0;
        const strA = stringify(a.value);
        const strB = stringify(b.value);
        if (strA < strB) {
            result = -1;
        } else if (strA > strB) {
            result = 1;
        }

        return direction === 'desc' ? result * -1 : result;
    });
    return nodes;
};
export const nodeSetProperties = (
    nodes: KulDataNode[],
    properties: Partial<KulDataNode>,
    recursively?: boolean,
    exclude?: KulDataNode[]
) => {
    const updated: KulDataNode[] = [];
    if (!exclude) {
        exclude = [];
    }
    if (recursively) {
        nodes = nodeToStream(nodes);
    }
    for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index];
        for (const key in properties) {
            if (!exclude.includes(node)) {
                node[key] = properties[key];
                updated.push(node);
            }
        }
    }
    return updated;
};
export const nodeToStream = (nodes: KulDataNode[]) => {
    const streamlined: KulDataNode[] = [];
    for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index];
        recursive(node);

        function recursive(node: KulDataNode) {
            streamlined.push(node);
            for (
                let index = 0;
                node.children && index < node.children.length;
                index++
            ) {
                recursive(node.children[index]);
            }
        }
    }
    return streamlined;
};
