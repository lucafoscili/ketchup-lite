import { CarouselData } from './kul-showcase-carousel-declarations';
import {
  KulComponentEventName,
  KulComponentEventPayloadName,
  KulComponentName,
  KulComponentTag,
} from '../../../../types/GenericTypes';
import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { MASONRY_KULDATA_FACTORY } from '../../assets/fixtures/masonry';
import { SECTION_FACTORY } from '../../helpers/kul-showcase-section';
import { DOC_IDS } from '../../kul-showcase-data';

const COMPONENT_NAME: KulComponentName = 'KulCarousel';
const EVENT_NAME: KulComponentEventName<'KulCarousel'> = 'kul-carousel-event';
const PAYLOAD_NAME: KulComponentEventPayloadName<'KulCarousel'> =
  'KulCarouselEventPayload';
const TAG_NAME: KulComponentTag<'KulCarousel'> = 'kul-carousel';

export const CAROUSEL_EXAMPLES: () => CarouselData = () => ({
  autoplay: {
    ['data-description']: 'Carousel with autoplay',
    kulAutoPlay: true,
    kulData: MASONRY_KULDATA_FACTORY.KulImage(),
  },
  simple: {
    ['data-description']: 'Simple carousel',
    kulData: MASONRY_KULDATA_FACTORY.KulImage(),
  },
  style: {
    ['data-description']: 'Carousel with custom style',
    ['data-dynamic']: 'custom',
    kulData: MASONRY_KULDATA_FACTORY.KulImage(),
  },
});

export const CAROUSEL_DOC: KulArticleDataset = {
  nodes: [
    {
      id: DOC_IDS.root,
      value: COMPONENT_NAME,
      children: [
        SECTION_FACTORY.overview(
          COMPONENT_NAME,
          'provides a navigable slideshow of images or content cards',
        ),
        SECTION_FACTORY.usage(COMPONENT_NAME, {
          data: JSON.stringify({
            nodes: [
              {
                value: 'Node 1',
                id: '0',
                cells: {
                  kulImage: { kulValue: 'url_of_image1' },
                },
              },
              {
                value: 'Node 2',
                id: '1',
                cells: {
                  kulImage: { kulValue: 'url_of_image2' },
                },
              },
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
              type: 'kul-event',
              description: 'emitted by shapes',
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
