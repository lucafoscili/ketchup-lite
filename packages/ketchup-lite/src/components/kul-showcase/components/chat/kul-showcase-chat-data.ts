import { ChatData } from './kul-showcase-chat-declarations';
import {
  KulComponentEventName,
  KulComponentEventPayloadName,
  KulComponentName,
  KulComponentTag,
} from '../../../../types/GenericTypes';
import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { SECTION_FACTORY } from '../../helpers/kul-showcase-section';
import { DOC_IDS } from '../../kul-showcase-data';

const COMPONENT_NAME: KulComponentName = 'KulChat';
const EVENT_NAME: KulComponentEventName<'KulChat'> = 'kul-chat-event';
const PAYLOAD_NAME: KulComponentEventPayloadName<'KulChat'> =
  'KulChatEventPayload';
const TAG_NAME: KulComponentTag<'KulChat'> = 'kul-chat';

export const CHAT_EXAMPLES: ChatData = {
  bottomLayout: {
    ['data-description']: 'Chat with textarea below',
    kulLayout: 'bottom-textarea',
  },
  simple: {
    ['data-description']: 'Simple chat component',
  },
  style: {
    ['data-description']: 'Chat with custom style',
    ['data-dynamic']: 'custom',
  },
};

export const CHAT_DOC: KulArticleDataset = {
  nodes: [
    {
      id: DOC_IDS.root,
      value: COMPONENT_NAME,
      children: [
        SECTION_FACTORY.overview(
          COMPONENT_NAME,
          'lets you chat with an LLM running locally. It is designed to work along with Koboldcpp',
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
              type: 'config',
              description: 'emitted when the config of the component changes',
            },
            {
              type: 'polling',
              description:
                'emitted when the component checks whether the LLM endpoint is online or not',
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
            {
              type: 'update',
              description: 'emitted when a new message is received',
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
