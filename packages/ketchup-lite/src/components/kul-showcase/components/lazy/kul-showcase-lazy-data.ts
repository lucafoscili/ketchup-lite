import { LazyData } from './kul-showcase-lazy-declarations';
import {
  KulComponentEventName,
  KulComponentEventPayloadName,
  KulComponentName,
  KulComponentTag,
} from '../../../../types/GenericTypes';
import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { KulButtonPropsInterface } from '../../../kul-button/kul-button-declarations';
import { SECTION_FACTORY } from '../../helpers/kul-showcase-section';
import { DOC_IDS } from '../../kul-showcase-data';

const COMPONENT_NAME: KulComponentName = 'KulLazy';
const EVENT_NAME: KulComponentEventName<'KulLazy'> = 'kul-lazy-event';
const PAYLOAD_NAME: KulComponentEventPayloadName<'KulLazy'> =
  'KulLazyEventPayload';
const TAG_NAME: KulComponentTag<'KulLazy'> = 'kul-lazy';

export const LAZY_EXAMPLES: LazyData = {
  simple: {
    ['data-description']: 'Simple lazy with button',
    kulComponentName: 'kul-button',
    kulComponentProps: { kulLabel: 'Button' } as KulButtonPropsInterface,
  },
  style: {
    ['data-description']: 'Simple lazy with button and custom style',
    'data-dynamic': 'custom',
    kulComponentName: 'kul-button',
    kulComponentProps: { kulLabel: 'Button' } as KulButtonPropsInterface,
  },
};

export const LAZY_DOC: KulArticleDataset = {
  nodes: [
    {
      id: DOC_IDS.root,
      value: COMPONENT_NAME,
      children: [
        SECTION_FACTORY.overview(
          COMPONENT_NAME,
          "main purpose is to prevent long page loading times, displaying a placeholder until it's relevant to switch to the actual component",
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
              type: 'kul-event',
              description: 'wraps a subcomponent event',
            },
            {
              type: 'load',
              description:
                'emitted when the subcomponent is successfully loaded',
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
