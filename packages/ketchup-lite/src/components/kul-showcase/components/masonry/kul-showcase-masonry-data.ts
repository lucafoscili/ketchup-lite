import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { MasonryData } from './kul-showcase-masonry-declarations';
import { SECTION_FACTORY } from '../../helpers/kul-showcase-section';
import {
    KulComponentEventName,
    KulComponentEventPayloadName,
    KulComponentName,
    KulComponentTag,
} from '../../../../types/GenericTypes';
import { DOC_IDS } from '../../kul-showcase-data';
import { MASONRY_KULDATA_FACTORY } from '../../assets/fixtures/masonry';

const COMPONENT_NAME: KulComponentName = 'KulMasonry';
const EVENT_NAME: KulComponentEventName<'KulMasonry'> = 'kul-masonry-event';
const PAYLOAD_NAME: KulComponentEventPayloadName<'KulMasonry'> =
    'KulMasonryEventPayload';
const TAG_NAME: KulComponentTag<'KulMasonry'> = 'kul-masonry';

export const MASONRY_EXAMPLES: MasonryData = {
    simple: {
        ['data-description']: 'Simple masonry',
        kulData: MASONRY_KULDATA_FACTORY.KulImage(),
    },
    style: {
        ['data-description']: 'Masonry with custom style',
        ['data-dynamic']: 'custom',
        kulData: MASONRY_KULDATA_FACTORY.KulImage(),
    },
};

export const MASONRY_DOC: KulArticleDataset = {
    nodes: [
        {
            id: DOC_IDS.root,
            value: COMPONENT_NAME,
            children: [
                SECTION_FACTORY.overview(
                    COMPONENT_NAME,
                    'is designed to arrange images in two different views: masonry and waterfall'
                ),
                SECTION_FACTORY.usage(COMPONENT_NAME, {
                    data: JSON.stringify({
                        nodes: [
                            {
                                value: 'Node 1',
                                id: '0',
                                cells: {
                                    kulImage: { kulValue: 'url_of_image1' },
                                },
                            },
                            {
                                value: 'Node 2',
                                id: '1',
                                cells: {
                                    kulImage: { kulValue: 'url_of_image2' },
                                },
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
                            type: 'kul-event',
                            description: 'emitted by shapes',
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
