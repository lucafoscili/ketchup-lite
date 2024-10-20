import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { CompareData } from './kul-showcase-compare-declarations';
import { SECTION_FACTORY } from '../../helpers/kul-showcase-section';
import {
    KulComponentEventName,
    KulComponentEventPayloadName,
    KulComponentName,
    KulComponentTag,
} from '../../../../types/GenericTypes';
import { DOC_IDS } from '../../kul-showcase-data';
import { COMPARE_KULDATA_FACTORY } from '../../assets/fixtures/compare';

const COMPONENT_NAME: KulComponentName = 'KulCompare';
const EVENT_NAME: KulComponentEventName<'KulCompare'> = 'kul-compare-event';
const PAYLOAD_NAME: KulComponentEventPayloadName<'KulCompare'> =
    'KulCompareEventPayload';
const TAG_NAME: KulComponentTag<'KulCompare'> = 'kul-compare';

export const COMPARE_EXAMPLES: CompareData = {
    simple: {
        ['data-description']: 'Simple compare',
        kulData: COMPARE_KULDATA_FACTORY.KulImage(),
    },
    style: {
        ['data-description']: 'Compare with custom style',
        ['data-dynamic']: 'custom',
        kulData: COMPARE_KULDATA_FACTORY.KulImage(),
    },
};

export const COMPARE_DOC: KulArticleDataset = {
    nodes: [
        {
            id: DOC_IDS.root,
            value: COMPONENT_NAME,
            children: [
                SECTION_FACTORY.overview(
                    COMPONENT_NAME,
                    'is handy when two components must be compared in order to spot differences'
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
