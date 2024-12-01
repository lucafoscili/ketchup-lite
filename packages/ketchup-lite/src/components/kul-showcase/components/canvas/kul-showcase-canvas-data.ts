import { getAssetPath } from '@stencil/core';

import { CanvasData } from './kul-showcase-canvas-declarations';
import {
  KulComponentEventName,
  KulComponentEventPayloadName,
  KulComponentName,
  KulComponentTag,
} from '../../../../types/GenericTypes';
import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { SECTION_FACTORY } from '../../helpers/kul-showcase-section';
import { DOC_IDS } from '../../kul-showcase-data';

const COMPONENT_NAME: KulComponentName = 'KulCanvas';
const EVENT_NAME: KulComponentEventName<'KulCanvas'> = 'kul-canvas-event';
const PAYLOAD_NAME: KulComponentEventPayloadName<'KulCanvas'> =
  'KulCanvasEventPayload';
const TAG_NAME: KulComponentTag<'KulCanvas'> = 'kul-canvas';

export const CANVAS_EXAMPLES: () => CanvasData = () => ({
  simple: {
    ['data-description']: 'Canvas over image',
    kulImageProps: {
      kulSizeX: '256px',
      kulSizeY: '256px',
      kulValue: getAssetPath(`./assets/media/color_splash.jpg`),
    },
  },
  style: {
    ['data-description']: 'Canvas with custom style',
    ['data-dynamic']: 'custom',
    kulImageProps: {
      kulSizeX: '256px',
      kulSizeY: '256px',
      kulValue: getAssetPath(`./assets/media/color_splash.jpg`),
    },
  },
});

export const CANVAS_DOC: KulArticleDataset = {
  nodes: [
    {
      id: DOC_IDS.root,
      value: COMPONENT_NAME,
      children: [
        SECTION_FACTORY.overview(
          COMPONENT_NAME,
          'main purpose is to allow painting over the image. The actual canvasing must be done downstream, it just emits an event when a stroke is complete (from pointerdown to pointerup).',
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
              type: 'stroke',
              description: 'emitted after the pointer is released',
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
