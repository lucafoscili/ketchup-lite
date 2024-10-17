import { getAssetPath } from '@stencil/core';
import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { DOC_IDS } from '../../kul-showcase-data';
import { CardData } from './kul-showcase-card-declarations';
import {
    KulComponentEventName,
    KulComponentEventPayloadName,
    KulComponentName,
    KulComponentTag,
} from '../../../../types/GenericTypes';
import { SECTION_FACTORY } from '../../helpers/kul-showcase-section';
import { CARD_KULDATA_FACTORY } from '../../assets/fixtures/card';

const COMPONENT_NAME: KulComponentName = 'KulCard';
const EVENT_NAME: KulComponentEventName<'KulCard'> = 'kul-card-event';
const PAYLOAD_NAME: KulComponentEventPayloadName<'KulCard'> =
    'KulCardEventPayload';
const TAG_NAME: KulComponentTag<'KulCard'> = 'kul-card';

export const CARD_EXAMPLES: CardData = {
    keywords: {
        image: {
            ['data-description']: 'Card with custom style',
            kulSizeX: '320px',
            kulSizeY: '320px',
            kulData: CARD_KULDATA_FACTORY.keywords(),
        },
        style: {
            ['data-description']: 'Card with custom style',
            ['data-dynamic']: 'custom',
            kulSizeX: '320px',
            kulSizeY: '320px',
            kulData: CARD_KULDATA_FACTORY.keywords(),
        },
    },
    material: {
        image: {
            ['data-description']: 'Card with custom style',
            kulSizeX: '320px',
            kulSizeY: '320px',
            kulData: CARD_KULDATA_FACTORY.material(),
        },
        style: {
            ['data-description']: 'Card with custom style',
            ['data-dynamic']: 'custom',
            kulSizeX: '320px',
            kulSizeY: '320px',
            kulData: CARD_KULDATA_FACTORY.material(),
        },
    },
    upload: {
        image: {
            ['data-description']: 'Card with custom style',
            kulSizeX: '320px',
            kulSizeY: '320px',
            kulData: CARD_KULDATA_FACTORY.upload(),
        },
        style: {
            ['data-description']: 'Card with custom style',
            ['data-dynamic']: 'custom',
            kulSizeX: '320px',
            kulSizeY: '320px',
            kulData: CARD_KULDATA_FACTORY.upload(),
        },
    },
};

export const CARD_DOC: KulArticleDataset = {
    nodes: [
        {
            id: DOC_IDS.root,
            value: COMPONENT_NAME,
            children: [
                SECTION_FACTORY.overview(
                    COMPONENT_NAME,
                    'component is designed to render cards based on a JSON structure'
                ),
                SECTION_FACTORY.usage(COMPONENT_NAME, {
                    data: JSON.stringify({
                        nodes: [
                            {
                                cells: {
                                    icon: { shape: 'image', value: 'widgets' },
                                    text1: { value: 'Title' },
                                    text2: { value: 'Subtitle' },
                                    text3: { value: 'Description.' },
                                },
                                id: 'card',
                            },
                        ],
                    }),
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
                            type: 'contextmenu',
                            description:
                                'emitted when the component is right-clicked',
                        },
                        {
                            type: 'kul-event',
                            description: 'wraps a subcomponent event',
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
                    ],
                    EVENT_NAME
                ),
                SECTION_FACTORY.methods(TAG_NAME),
                SECTION_FACTORY.styling(TAG_NAME),
            ],
        },
    ],
};
