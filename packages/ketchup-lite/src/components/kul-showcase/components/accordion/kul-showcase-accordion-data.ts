import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { KulDataDataset } from '../../../../managers/kul-data/kul-data-declarations';
import { AccordionData } from './kul-showcase-accordion-declarations';
import { SECTION_FACTORY } from '../../helpers/kul-showcase-section';
import {
    KulComponentEventName,
    KulComponentEventPayloadName,
    KulComponentName,
    KulComponentTag,
} from '../../../../types/GenericTypes';
import { DOC_IDS } from '../../kul-showcase-data';

const COMPONENT_NAME: KulComponentName = 'KulAccordion';
const EVENT_NAME: KulComponentEventName<'KulAccordion'> = 'kul-accordion-event';
const PAYLOAD_NAME: KulComponentEventPayloadName<'KulAccordion'> =
    'KulAccordionEventPayload';
const TAG_NAME: KulComponentTag<'KulAccordion'> = 'kul-accordion';

const kulData: KulDataDataset = {
    nodes: [
        {
            id: '0',
            value: 'Item 1',
            icon: 'filter_1',
        },
        {
            id: '1',
            value: 'Item 2',
            icon: 'filter_2',
        },
        {
            id: '2',
            value: 'Item 3',
            icon: 'filter_3',
        },
        {
            id: '3',
            value: 'Item 4',
            icon: 'filter_4',
        },
    ],
};

export const ACCORDION_EXAMPLES: AccordionData = {
    simple: {
        ['data-description']: 'Simple accordion',
        kulData,
    },
    style: {
        ['data-description']: 'Accordion with custom style',
        ['data-dynamic']: 'custom',
        kulData,
    },
};

export const ACCORDION_DOC: KulArticleDataset = {
    nodes: [
        {
            id: DOC_IDS.root,
            value: COMPONENT_NAME,
            children: [
                SECTION_FACTORY.overview(
                    COMPONENT_NAME,
                    'allows users to toggle between hiding and showing large amounts of content'
                ),
                SECTION_FACTORY.usage(COMPONENT_NAME, {
                    data: JSON.stringify({
                        nodes: [
                            { value: 'Node 1', id: '0' },
                            { value: 'Node 2', id: '1' },
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
                            description: 'emitted when a node is clicked',
                        },
                        {
                            type: 'pointerdown',
                            description:
                                'emitted when as soon as a node is touched/clicked (before the click event)',
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
