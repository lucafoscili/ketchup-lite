import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { DOC_IDS } from '../../kul-showcase-data';
import { KulDataDataset } from '../../../../managers/kul-data/kul-data-declarations';
import { ChipData } from './kul-showcase-chip-declarations';
import {
    KulComponentEventName,
    KulComponentEventPayloadName,
    KulComponentName,
    KulComponentTag,
} from '../../../../types/GenericTypes';
import { SECTION_FACTORY } from '../../helpers/kul-showcase-section';

const COMPONENT_NAME: KulComponentName = 'KulChip';
const EVENT_NAME: KulComponentEventName<'KulChip'> = 'kul-chip-event';
const PAYLOAD_NAME: KulComponentEventPayloadName<'KulChip'> =
    'KulChipEventPayload';
const TAG_NAME: KulComponentTag<'KulChip'> = 'kul-chip';

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
            id: DOC_IDS.root,
            value: COMPONENT_NAME,
            children: [
                SECTION_FACTORY.overview(
                    COMPONENT_NAME,
                    'feats a tree-like data visualization with selectable or removable nodes'
                ),
                SECTION_FACTORY.usage(COMPONENT_NAME, {
                    data: JSON.stringify(kulData),
                    tag: TAG_NAME,
                }),
                SECTION_FACTORY.props(TAG_NAME),
                SECTION_FACTORY.events(
                    COMPONENT_NAME,
                    PAYLOAD_NAME,
                    [
                        {
                            type: 'blur',
                            description:
                                'emitted when the component loses focus',
                        },
                        {
                            type: 'click',
                            description:
                                'emitted when the component is clicked',
                        },
                        {
                            type: 'delete',
                            description: 'emitted when the a node is deleted',
                        },
                        {
                            type: 'focus',
                            description:
                                'emitted when the component is focused',
                        },
                        {
                            type: 'pointerdown',
                            description:
                                'emitted when as soon as the component is touched/clicked (before the click event)',
                        },
                        {
                            type: 'ready',
                            description:
                                'emitted when the component completes its first complete lifecycle',
                        },
                        {
                            type: 'unmount',
                            description:
                                'emitted when the component is disconnected from the DOM',
                        },
                    ],
                    EVENT_NAME
                ),
                SECTION_FACTORY.methods(TAG_NAME),
                SECTION_FACTORY.styling(TAG_NAME),
            ],
        },
    ],
};
