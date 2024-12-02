import { ToastData } from './kul-showcase-toast-declarations';
import {
  KulComponentEventName,
  KulComponentEventPayloadName,
  KulComponentName,
  KulComponentTag,
} from '../../../../types/GenericTypes';
import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { SECTION_FACTORY } from '../../helpers/kul-showcase-section';
import { DOC_IDS } from '../../kul-showcase-data';

const COMPONENT_NAME: KulComponentName = 'KulToast';
const EVENT_NAME: KulComponentEventName<'KulToast'> = 'kul-toast-event';
const PAYLOAD_NAME: KulComponentEventPayloadName<'KulToast'> =
  'KulToastEventPayload';
const TAG_NAME: KulComponentTag<'KulToast'> = 'kul-toast';

export const TOAST_EXAMPLES: ToastData = {
  icon: {
    ['data-description']: 'Toast with custom label',
  },
  style: {
    ['data-description']: 'Toast with custom style',
    ['data-dynamic']: 'custom',
  },
};

export const TOAST_DOC: KulArticleDataset = {
  nodes: [
    {
      id: DOC_IDS.root,
      value: COMPONENT_NAME,
      children: [
        SECTION_FACTORY.overview(
          COMPONENT_NAME,
          'is designed to display toast notifications',
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
