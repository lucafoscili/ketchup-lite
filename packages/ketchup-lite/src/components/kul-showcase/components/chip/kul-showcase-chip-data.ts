import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { DOC_STYLES } from '../../kul-showcase-data';
import { KulDataDataset } from '../../../../managers/kul-data/kul-data-declarations';
import { ChipData } from './kul-showcase-chip-declarations';
import { SHOWCASE_DOC } from '../../kul-showcase-utils';

const component = 'chip';

const kulData: KulDataDataset = {
    nodes: [
        {
            id: '0001',
            value: 'Depth 0 (1)',
            icon: 'filter_1',
        },
        {
            id: '0002',
            value: 'Depth 0 (2)',
            icon: 'filter_2',
        },
        {
            id: '0003',
            value: 'Depth 0 (3)',
            icon: 'filter_3',
        },
        {
            id: '0004',
            value: 'Depth 0 (4)',
            icon: 'filter_4',
        },
    ],
};

const kulTreeData: KulDataDataset = {
    nodes: [
        {
            id: '0001',
            value: 'Depth 0 (0)',
            icon: 'filter_1',
            children: [
                {
                    id: '0002',
                    value: 'Depth 1 (0)',
                    icon: 'filter_2',
                    children: [
                        {
                            id: '00021',
                            value: 'Depth 2 (0)',
                            icon: 'filter_3',
                            children: [
                                {
                                    id: '000211',
                                    value: 'Depth 3 (0)',
                                    icon: 'filter_4',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: '00022',
            value: 'Depth 0 (1)',
            icon: 'filter_2',
            children: [
                {
                    id: '000221',
                    value: 'Depth 1 (0)',
                    icon: 'filter_3',
                    children: [
                        {
                            id: '000222',
                            value: 'Depth 2 (0)',
                            icon: 'filter_4',
                        },
                    ],
                },
            ],
        },
        {
            id: '0003',
            value: 'Depth 0 (2)',
            icon: 'filter_2',
            children: [
                {
                    id: '00031',
                    value: 'Depth 1 (0)',
                    icon: 'filter_3',
                },
            ],
        },
        {
            id: '0004',
            value: 'Depth 0 (3)',
            icon: 'filter_2',
            children: [
                {
                    id: '00041',
                    value: 'Depth 1 (0)',
                    icon: 'filter_3',
                    children: [
                        {
                            id: '000411',
                            value: 'Depth 2 (0)',
                            icon: 'filter_4',
                            children: [
                                {
                                    id: '0004111',
                                    value: 'Depth 3 (0)',
                                    icon: 'filter_5',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};

export const CHIP_EXAMPLES: ChipData = {
    children: {
        ['data-description']: 'Chips with children',
        kulData: kulTreeData,
    },
    choice: {
        ['data-description']: 'Choice chips',
        kulData,
        kulStyling: 'choice',
    },
    colors: {
        ['data-description']: 'Chips states colors',
        ['data-dynamic']: 'state-colors',
        kulData,
        kulStyling: 'choice',
    },
    filter: {
        ['data-description']: 'Filter chips',
        kulData,
        kulStyling: 'filter',
    },
    input: {
        ['data-description']: 'Input chips',
        kulData: JSON.parse(JSON.stringify(kulData)),
        kulStyling: 'input',
    },
    standard: {
        ['data-description']: 'Standard chips',
        kulData,
    },
    style: {
        ['data-description']: 'Chip with custom style',
        ['data-dynamic']: 'custom',
        kulData,
    },
};

export const CHIP_DOC: KulArticleDataset = {
    nodes: [
        {
            children: [
                SHOWCASE_DOC.create.component.overview(
                    'KulChip',
                    ' component feats a tree-like data visualization with selectable or deletable nodes.'
                ),
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.2.0.0.0',
                                            value: 'To use the ',
                                        },
                                        {
                                            id: '0.2.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulChip',
                                        },
                                        {
                                            id: '0.2.0.0.2',
                                            value: ' component, include it in your HTML and provide the ',
                                        },
                                        {
                                            id: '0.2.0.0.3',
                                            tagName: 'strong',
                                            value: 'kulData',
                                        },
                                        {
                                            id: '0.2.0.0.4',
                                            value: ' property with the JSON structure representing the chip.',
                                        },
                                    ],
                                    id: '0.2.0.0',
                                },
                                {
                                    children: [
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'markup',
                                                    value: '<kul-chip></kul-chip>',
                                                },
                                            },
                                            id: '0.2.0.1.0',
                                            value: '',
                                        },
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'json',
                                                    value: '{ "nodes": [{"value": "Node 1", "id": "0"}, {"value": "Node 2", "id": "1"}]}',
                                                },
                                            },
                                            id: '0.2.0.1.1',
                                            value: '',
                                        },
                                    ],
                                    id: '0.2.0.1',
                                },
                            ],
                            id: '0.2.0',
                            value: 'Basic Usage',
                        },
                    ],
                    id: '0.2',
                    value: 'Usage',
                },
                {
                    children: SHOWCASE_DOC.get.props(component),
                    id: '0.3',
                    value: 'Properties',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.4.0.0',
                                    value: 'This event is emitted during various lifecycle stages of the component. It carries a payload of type ',
                                },
                                {
                                    id: '0.4.0.1',
                                    value: 'KulChipEventPayload',
                                },
                                {
                                    id: '0.4.0.2',
                                    value: ', which includes information about the component, its state and the event type.',
                                },
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'strong',
                                                            value: 'click',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.1',
                                                            value: ': emitted when a node is clicked.',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.0',
                                                    tagName: 'li',
                                                    value: '',
                                                },
                                                {
                                                    children: [
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'strong',
                                                            value: 'pointerdown',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.1',
                                                            value: ': emitted when as soon as a node is touched/clicked (before the click event).',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.0',
                                                    tagName: 'li',
                                                    value: '',
                                                },
                                                {
                                                    children: [
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'strong',
                                                            value: 'ready',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.1',
                                                            value: ': emitted when the component completes its first complete lifecycle.',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.0',
                                                    tagName: 'li',
                                                    value: '',
                                                },
                                            ],
                                            id: '0.4.0.3.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.4.0.3',
                                    value: '',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.4.0',
                            tagName: 'strong',
                            value: 'kul-chip-event',
                        },
                    ],
                    id: '0.4',
                    value: 'Events',
                },
                {
                    children: SHOWCASE_DOC.get.methods(component),
                    id: '0.5',
                    value: 'Methods',
                },
                {
                    children: SHOWCASE_DOC.get.styles(component),
                    id: '0.7',
                    value: 'Styling',
                },
            ],
            id: '0',
            value: 'KulChip',
        },
    ],
};
