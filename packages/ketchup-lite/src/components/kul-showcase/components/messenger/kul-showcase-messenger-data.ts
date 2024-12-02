import { MessengerData } from './kul-showcase-messenger-declarations';
import {
  KulComponentEventName,
  KulComponentEventPayloadName,
  KulComponentName,
  KulComponentTag,
} from '../../../../types/GenericTypes';
import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { MESSENGER_KULDATA } from '../../assets/fixtures/messenger';
import { SECTION_FACTORY } from '../../helpers/kul-showcase-section';
import { DOC_IDS } from '../../kul-showcase-data';

const COMPONENT_NAME: KulComponentName = 'KulMessenger';
const EVENT_NAME: KulComponentEventName<'KulMessenger'> = 'kul-messenger-event';
const PAYLOAD_NAME: KulComponentEventPayloadName<'KulMessenger'> =
  'KulMessengerEventPayload';
const TAG_NAME: KulComponentTag<'KulMessenger'> = 'kul-messenger';

export const MESSENGER_EXAMPLES: () => MessengerData = () => ({
  simple: {
    ['data-description']: 'Simple messenger component',
    kulData: MESSENGER_KULDATA(),
  },
  style: {
    ['data-description']: 'Messenger with custom style',
    ['data-dynamic']: 'custom',
    kulData: MESSENGER_KULDATA(),
  },
});

export const MESSENGER_DOC: KulArticleDataset = {
  nodes: [
    {
      id: DOC_IDS.root,
      value: COMPONENT_NAME,
      children: [
        SECTION_FACTORY.overview(
          COMPONENT_NAME,
          'offers a layout designed to chat with an LLM for roleplay purposes',
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
              type: 'ready',
              description:
                'emitted when the component completes its first complete lifecycle',
            },
            {
              type: 'save',
              description:
                'emitted when the save button is clicked (or after each response if autosave is enabled)',
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
