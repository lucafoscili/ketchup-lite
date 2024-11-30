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
import { TabbarData } from './kul-showcase-tabbar-declarations';

const COMPONENT_NAME: KulComponentName = 'KulTabbar';
const EVENT_NAME: KulComponentEventName<'KulTabbar'> = 'kul-tabbar-event';
const PAYLOAD_NAME: KulComponentEventPayloadName<'KulTabbar'> =
    'KulTabbarEventPayload';
const TAG_NAME: KulComponentTag<'KulTabbar'> = 'kul-tabbar';

const kulData: KulDataDataset = {
    nodes: [
        { id: '0', value: 'First tab' },
        {
            description: 'Second tab (title)',
            id: '1',
            value: 'Second tab (title)',
        },
        { icon: 'widgets', id: '2', value: 'Third tab (icon)' },
    ],
};

export const TABBAR_EXAMPLES: TabbarData = {
    simple: {
        ['data-description']: 'Simple tab bar',
        kulData,
    },
    style: {
        ['data-description']: 'Tab bar with custom style',
        'data-dynamic': 'custom',
        kulData,
    },
};

export const TABBAR_DOC: KulArticleDataset = {
    nodes: [
        {
            id: DOC_IDS.root,
            value: COMPONENT_NAME,
            children: [
                SECTION_FACTORY.overview(
                    COMPONENT_NAME,
                    'is designed to render tab bars based on a JSON structure'
                ),
                SECTION_FACTORY.usage(COMPONENT_NAME, {
                    tag: TAG_NAME,
                }),
                SECTION_FACTORY.props(TAG_NAME),
                SECTION_FACTORY.events(
                    COMPONENT_NAME,
                    PAYLOAD_NAME,
                    [
                        {
                            type: 'click',
                            description:
                                'emitted when the component is clicked',
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
