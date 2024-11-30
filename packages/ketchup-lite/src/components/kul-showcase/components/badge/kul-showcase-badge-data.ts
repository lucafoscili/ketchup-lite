import {
    KulComponentEventName,
    KulComponentEventPayloadName,
    KulComponentName,
    KulComponentTag,
} from '../../../../types/GenericTypes';
import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { random2digitsNumber } from '../../helpers/kul-showcase-dyn-sample';
import { SECTION_FACTORY } from '../../helpers/kul-showcase-section';
import { DOC_IDS } from '../../kul-showcase-data';
import { BadgeData } from './kul-showcase-badge-declarations';

const COMPONENT_NAME: KulComponentName = 'KulBadge';
const EVENT_NAME: KulComponentEventName<'KulBadge'> = 'kul-badge-event';
const PAYLOAD_NAME: KulComponentEventPayloadName<'KulBadge'> =
    'KulBadgeEventPayload';
const TAG_NAME: KulComponentTag<'KulBadge'> = 'kul-badge';

export const BADGE_EXAMPLES: BadgeData = {
    colors: {
        ['data-description']: 'Badge states colors',
        ['data-dynamic']: 'state-colors',
    },
    empty: {
        ['data-description']: 'Empty badge',
    },
    icon: {
        ['data-description']: 'Badge with icon',
        kulImageProps: {
            kulValue: 'notifications',
        },
    },
    image: {
        ['data-description']: 'Badge with image',
        kulImageProps: {
            kulValue: 'https://avatars.githubusercontent.com/u/45429703?v=4',
        },
    },
    label: {
        ['data-description']: 'Badge with text',
        kulLabel: random2digitsNumber().toString(),
    },
    position: {
        ['data-description']: 'Badge positions',
        ['data-dynamic']: 'positions',
    },
    style: {
        ['data-description']: 'Badge with custom style',
        ['data-dynamic']: 'custom',
    },
};

export const BADGE_DOC: KulArticleDataset = {
    nodes: [
        {
            id: DOC_IDS.root,
            value: COMPONENT_NAME,
            children: [
                SECTION_FACTORY.overview(
                    COMPONENT_NAME,
                    'is designed to be attached to another element and display additional informations about it'
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
                                'emitted when a subcomponent is clicked',
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
