import { SplashData } from './kul-showcase-splash-declarations';
import {
  KulComponentEventName,
  KulComponentEventPayloadName,
  KulComponentName,
  KulComponentTag,
} from '../../../../types/GenericTypes';
import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { SECTION_FACTORY } from '../../helpers/kul-showcase-section';
import { DOC_IDS } from '../../kul-showcase-data';

const COMPONENT_NAME: KulComponentName = 'KulSplash';
const EVENT_NAME: KulComponentEventName<'KulSplash'> = 'kul-splash-event';
const PAYLOAD_NAME: KulComponentEventPayloadName<'KulSplash'> =
  'KulSplashEventPayload';
const TAG_NAME: KulComponentTag<'KulSplash'> = 'kul-splash';

export const SPLASH_EXAMPLES: SplashData = {
  label: {
    ['data-description']: 'Splash with custom label',
    kulLabel: 'This is a custom label!',
  },
  style: {
    ['data-description']: 'Splash with custom style',
    kulStyle: `.wrapper { animation: pulse 1.275s infinite; } @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.25; } 100% { opacity: 1; } }`,
  },
};

export const SPLASH_DOC: KulArticleDataset = {
  nodes: [
    {
      id: DOC_IDS.root,
      value: COMPONENT_NAME,
      children: [
        SECTION_FACTORY.overview(
          COMPONENT_NAME,
          'is typically displayed as a splash screen when a user first arrives on a webpage to prevent the appearance of an incomplete page',
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
