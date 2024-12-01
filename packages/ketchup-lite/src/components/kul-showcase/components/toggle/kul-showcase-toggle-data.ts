import { ToggleData } from './kul-showcase-toggle-declarations';
import {
  KulComponentEventName,
  KulComponentEventPayloadName,
  KulComponentName,
  KulComponentTag,
} from '../../../../types/GenericTypes';
import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { SECTION_FACTORY } from '../../helpers/kul-showcase-section';
import { DOC_IDS } from '../../kul-showcase-data';

const COMPONENT_NAME: KulComponentName = 'KulToggle';
const EVENT_NAME: KulComponentEventName<'KulToggle'> = 'kul-toggle-event';
const PAYLOAD_NAME: KulComponentEventPayloadName<'KulToggle'> =
  'KulToggleEventPayload';
const TAG_NAME: KulComponentTag<'KulToggle'> = 'kul-toggle';

export const TOGGLE_EXAMPLES: ToggleData = {
  colors: {
    ['data-description']: 'Toggle states colors',
    ['data-dynamic']: 'state-colors',
    kulLabel: 'States colors',
    kulDisabled: false,
    kulValue: true,
  },
  disabled: {
    ['data-description']: 'Disabled toggle',
    kulDisabled: true,
    kulLabel: 'Disabled',
  },
  simple: {
    ['data-description']: 'Toggle with leading label',
    kulLabel: 'Leading label',
    kulLeadingLabel: true,
  },
  style: {
    ['data-description']: 'Icon with custom style',
    ['data-dynamic']: 'custom',
    kulLabel: 'Custom style',
  },
};

export const TOGGLE_DOC: KulArticleDataset = {
  nodes: [
    {
      id: DOC_IDS.root,
      value: COMPONENT_NAME,
      children: [
        SECTION_FACTORY.overview(
          COMPONENT_NAME,
          'can be used as a simpler toggler',
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
              type: 'blur',
              description: 'emitted when the component loses focus',
            },
            {
              type: 'change',
              description: "emitted when the component's value changes",
            },
            {
              type: 'focus',
              description: 'emitted when the component is focused',
            },
            {
              type: 'pointerdown',
              description:
                'emitted when as soon as the component is touched/clicked (before the click event)',
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
