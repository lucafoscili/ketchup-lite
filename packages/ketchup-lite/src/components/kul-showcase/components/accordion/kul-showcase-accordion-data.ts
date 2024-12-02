import { AccordionData } from './kul-showcase-accordion-declarations';
import {
  KulComponentEventName,
  KulComponentEventPayloadName,
  KulComponentName,
  KulComponentTag,
} from '../../../../types/GenericTypes';
import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { ACCORDION_KULDATA } from '../../assets/fixtures/accordion';
import { SECTION_FACTORY } from '../../helpers/kul-showcase-section';
import { DOC_IDS } from '../../kul-showcase-data';

const COMPONENT_NAME: KulComponentName = 'KulAccordion';
const EVENT_NAME: KulComponentEventName<'KulAccordion'> = 'kul-accordion-event';
const PAYLOAD_NAME: KulComponentEventPayloadName<'KulAccordion'> =
  'KulAccordionEventPayload';
const TAG_NAME: KulComponentTag<'KulAccordion'> = 'kul-accordion';

export const ACCORDION_EXAMPLES: () => AccordionData = () => ({
  simple: {
    ['data-description']: 'Simple accordion',
    kulData: ACCORDION_KULDATA(),
  },
  style: {
    ['data-description']: 'Accordion with custom style',
    ['data-dynamic']: 'custom',
    kulData: ACCORDION_KULDATA(),
  },
});

export const ACCORDION_DOC: KulArticleDataset = {
  nodes: [
    {
      id: DOC_IDS.root,
      value: COMPONENT_NAME,
      children: [
        SECTION_FACTORY.overview(
          COMPONENT_NAME,
          'allows users to toggle between hiding and showing large amounts of content',
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
            {
              type: 'unmount',
              description:
                'emitted when the component is disconnected from the DOM',
            },
          ],
          EVENT_NAME,
        ),
        SECTION_FACTORY.methods(TAG_NAME),
        SECTION_FACTORY.styling(TAG_NAME),
      ],
    },
  ],
};
