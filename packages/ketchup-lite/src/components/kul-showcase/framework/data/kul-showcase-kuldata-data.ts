import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { PARAGRAPH_FACTORY } from '../../helpers/kul-showcase-paragraph';
import { DOC_IDS, DOC_NODES } from '../../kul-showcase-data';

export const DATA_DOC: KulArticleDataset = {
    nodes: [
        {
            id: DOC_IDS.root,
            value: 'KulData',
            children: [
                {
                    id: DOC_IDS.section,
                    value: 'Overview',
                    children: [
                        {
                            children: [
                                {
                                    id: DOC_IDS.content,
                                    tagName: 'strong',
                                    value: 'KulData',
                                },
                                {
                                    id: DOC_IDS.content,
                                    value: ' is the core data management engine for the Ketchup Lite library. It handles data structures such as cells, nodes, and datasets, allowing consistent UI state and efficient data flow.',
                                },
                            ],
                            id: DOC_IDS.paragraph,
                            value: '',
                        },
                        {
                            children: [
                                {
                                    id: DOC_IDS.content,
                                    value: 'KulData is responsible for managing the JSON structures used across different components, including KulDataDataset, KulDataNode, KulDataColumn, and KulDataCell types.',
                                },
                            ],
                            id: DOC_IDS.paragraph,
                            value: '',
                        },
                    ],
                },
                {
                    id: DOC_IDS.section,
                    value: 'Basic Types',
                    children: [
                        PARAGRAPH_FACTORY.asBulletListEntry('KulDataDataset', [
                            {
                                title: 'columns (KulDataColumn[])',
                                description:
                                    ': Defines the set of columns containing the cells, useful for organizing data in a tabular structure.',
                            },
                            {
                                title: 'nodes (KulDataNode[])',
                                description:
                                    ': Represents the data nodes, containing cells and other metadata.',
                            },
                        ]),
                        DOC_NODES.hiddenSeparator,
                        PARAGRAPH_FACTORY.asBulletListEntry('KulDataNode', [
                            {
                                title: 'id (string)',
                                description:
                                    ': Unique identifier for the node.',
                            },
                            {
                                title: 'cells (KulDataCellContainer)',
                                description:
                                    ': Contains one or more data cells.',
                            },
                            {
                                title: 'children (KulDataNode[])',
                                description:
                                    ': Defines hierarchical relationships between nodes.',
                            },
                            {
                                title: 'value (string | number)',
                                description:
                                    ': Represents the main content or identifier for this node.',
                            },
                            {
                                title: 'icon (string)',
                                description:
                                    ': Optional icon for the node representation.',
                            },
                        ]),
                        DOC_NODES.hiddenSeparator,
                        PARAGRAPH_FACTORY.asBulletListEntry('KulDataColumn', [
                            {
                                title: 'id (KulDataShapes | string)',
                                description:
                                    ': Identifier for the column, potentially linked to a shape.',
                            },
                            {
                                title: 'title (string)',
                                description:
                                    ': The name of the column, often displayed in the header.',
                            },
                        ]),
                        DOC_NODES.hiddenSeparator,
                        PARAGRAPH_FACTORY.asBulletListEntry('KulDataCell', [
                            {
                                title: 'Shapes',
                                description:
                                    ': Defines different shapes that a cell can take, such as badge, button, chart, etc.',
                            },
                            {
                                title: 'Shape-Specific Properties',
                                description:
                                    ': Every shape has unique properties, e.g., KulChart for chart data.',
                            },
                        ]),
                    ],
                },
                {
                    id: DOC_IDS.section,
                    value: 'Available APIs',
                    children: [
                        PARAGRAPH_FACTORY.asListEntry(
                            'node.exists',
                            'Checks if a given dataset has any nodes.',
                            [
                                {
                                    name: 'dataset',
                                    type: 'KulDataDataset',
                                    description: 'The dataset to verify.',
                                },
                            ]
                        ),
                        DOC_NODES.hiddenSeparator,
                        PARAGRAPH_FACTORY.asListEntry(
                            'node.filter',
                            'Filters the nodes in a dataset based on certain criteria.',
                            [
                                {
                                    name: 'dataset',
                                    type: 'KulDataDataset',
                                    description:
                                        'The dataset containing nodes.',
                                },
                                {
                                    name: 'filters',
                                    type: 'Partial<KulDataNode>',
                                    description: 'Filters to apply to nodes.',
                                },
                                {
                                    name: 'partialMatch',
                                    type: 'boolean',
                                    description:
                                        'If true, allows partial matching of node properties.',
                                },
                            ]
                        ),
                        DOC_NODES.hiddenSeparator,
                        PARAGRAPH_FACTORY.asListEntry(
                            'node.fixIds',
                            'Ensures that each node has a unique identifier.',
                            [
                                {
                                    name: 'nodes',
                                    type: 'KulDataNode[]',
                                    description: 'The nodes to fix IDs for.',
                                },
                            ]
                        ),
                        DOC_NODES.hiddenSeparator,
                        PARAGRAPH_FACTORY.asListEntry(
                            'node.getParent',
                            'Finds and returns the parent node of a given child node.',
                            [
                                {
                                    name: 'nodes',
                                    type: 'KulDataNode[]',
                                    description:
                                        'The dataset containing the nodes.',
                                },
                                {
                                    name: 'child',
                                    type: 'KulDataNode',
                                    description:
                                        'The child node for which to find the parent.',
                                },
                            ]
                        ),
                        DOC_NODES.hiddenSeparator,
                        PARAGRAPH_FACTORY.asListEntry(
                            'cell.shapes.decorate',
                            'Decorates cells with properties and event dispatchers.',
                            [
                                {
                                    name: 'shape',
                                    type: 'KulDataShapes',
                                    description: 'The shape type to decorate.',
                                },
                                {
                                    name: 'items',
                                    type: 'Partial<KulDataCell<S>>[]',
                                    description: 'Properties to be applied.',
                                },
                                {
                                    name: 'eventDispatcher',
                                    type: 'KulDataShapeEventDispatcher',
                                    description:
                                        'Event dispatcher for handling events.',
                                },
                            ]
                        ),
                    ],
                },
                {
                    id: DOC_IDS.section,
                    value: 'Examples',
                    children: [
                        {
                            children: [
                                {
                                    id: DOC_IDS.content,
                                    value: 'Adding a Node:',
                                },
                                DOC_NODES.hiddenSeparator,
                                {
                                    cells: {
                                        kulCode: {
                                            shape: 'code',
                                            value: "const dataset: KulDataDataset = {\n  nodes: []\n};\n\n// Add a node to dataset\ndataset.nodes?.push({\n  id: 'node1',\n  value: 'This is a new node',\n  cells: {\n    kulText: {\n      shape: 'text',\n      value: 'This is a cell text value'\n    }\n  }\n});",
                                        },
                                    },
                                    id: DOC_IDS.content,
                                },
                            ],
                            id: DOC_IDS.paragraph,
                            value: '',
                        },
                        {
                            children: [
                                {
                                    id: DOC_IDS.content,
                                    value: 'Filtering Nodes:',
                                },
                                DOC_NODES.hiddenSeparator,
                                {
                                    cells: {
                                        kulCode: {
                                            shape: 'code',
                                            value: "const filteredNodes = KulData.node.filter(dataset, { value: 'This is a new node' });\nconsole.log(filteredNodes.matchingNodes);",
                                        },
                                    },
                                    id: DOC_IDS.content,
                                },
                            ],
                            id: DOC_IDS.paragraph,
                            value: '',
                        },
                    ],
                },
            ],
        },
    ],
};
