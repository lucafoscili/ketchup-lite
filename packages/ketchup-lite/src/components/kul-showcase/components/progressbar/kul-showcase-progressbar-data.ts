import { ProgressbarData } from './kul-showcase-progressbar-declarations';
import {
  KulComponentEventName,
  KulComponentEventPayloadName,
  KulComponentName,
  KulComponentTag,
} from '../../../../types/GenericTypes';
import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { SECTION_FACTORY } from '../../helpers/kul-showcase-section';
import { DOC_IDS } from '../../kul-showcase-data';

const COMPONENT_NAME: KulComponentName = 'KulProgressbar';
const EVENT_NAME: KulComponentEventName<'KulProgressbar'> =
  'kul-progressbar-event';
const PAYLOAD_NAME: KulComponentEventPayloadName<'KulProgressbar'> =
  'KulProgressbarEventPayload';
const TAG_NAME: KulComponentTag<'KulProgressbar'> = 'kul-progressbar';

export const PROGRESSBAR_EXAMPLES: ProgressbarData = {
  animated: {
    ['data-description']: 'Animated progress bar',
    className: 'kul-animated',
    kulValue: 100,
  },
  centeredLabel: {
    ['data-description']: 'Progress bar with centered label',
    kulCenteredLabel: true,
    kulValue: 90,
  },
  colors: {
    ['data-description']: 'Progress bar states colors',
    ['data-dynamic']: 'state-colors',
    kulValue: 70,
  },
  icon: {
    ['data-description']: 'Progress bar with icon',
    kulIcon: 'widgets',
    kulValue: 60,
  },
  isRadial: {
    ['data-description']: 'Radial progress bar',
    kulIsRadial: true,
    kulValue: 55,
  },
  isRadialIcon: {
    ['data-description']: 'Radial progress bar with icon',
    kulIsRadial: true,
    kulIcon: 'widgets',
    kulValue: 45,
  },
  label: {
    ['data-description']: 'Progress bar with label',
    kulLabel: "I'm a label",
    kulValue: 40,
  },
  padded: {
    ['data-description']: 'Progress bar with padding',
    className: 'kul-padded',
    kulValue: 20,
  },
  slim: {
    ['data-description']: 'Slim progress bar',
    className: 'kul-slim',
    kulValue: 10,
  },
  style: {
    ['data-description']: 'Progress bar with custom style',
    ['data-dynamic']: 'custom',
    kulValue: 0,
  },
};

export const PROGRESSBAR_DOC: KulArticleDataset = {
  nodes: [
    {
      id: DOC_IDS.root,
      value: COMPONENT_NAME,
      children: [
        SECTION_FACTORY.overview(
          COMPONENT_NAME,
          'is designed to display a state of advancement. It can be displayed as a horizontal bar or as a radial widget',
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
