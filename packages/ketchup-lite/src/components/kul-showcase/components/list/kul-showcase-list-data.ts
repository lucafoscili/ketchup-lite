import { KulDataDataset } from '../../../../managers/kul-data/kul-data-declarations';
import {
    KulComponentEventName,
    KulComponentEventPayloadName,
    KulComponentName,
    KulComponentTag,
} from '../../../../types/GenericTypes';
import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { SECTION_FACTORY } from '../../helpers/kul-showcase-section';
import { DOC_IDS } from '../../kul-showcase-data';
import { ListData } from './kul-showcase-list-declarations';

const COMPONENT_NAME: KulComponentName = 'KulList';
const EVENT_NAME: KulComponentEventName<'KulList'> = 'kul-list-event';
const PAYLOAD_NAME: KulComponentEventPayloadName<'KulList'> =
    'KulListEventPayload';
const TAG_NAME: KulComponentTag<'KulList'> = 'kul-list';

const kulData: KulDataDataset = {
    nodes: [
        { id: '0', value: 'First item' },
        {
            description: 'Second item (subtitle)',
            id: '1',
            value: 'Second item (title)',
        },
        { icon: 'widgets', id: '2', value: 'Third item (icon)' },
    ],
};

export const LIST_EXAMPLES: ListData = {
    simple: {
        ['data-description']: 'Simple list',
        kulData,
    },
    enableDeletion: {
        ['data-description']: 'List with deletable items',
        kulData,
        kulEnableDeletions: true,
    },
    style: {
        ['data-description']: 'List with custom style',
        'data-dynamic': 'custom',
        kulData,
    },
};

export const LIST_DOC: KulArticleDataset = {
    nodes: [
        {
            id: DOC_IDS.root,
            value: COMPONENT_NAME,
            children: [
                SECTION_FACTORY.overview(
                    COMPONENT_NAME,
                    'is used to display a list of items vertically'
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
