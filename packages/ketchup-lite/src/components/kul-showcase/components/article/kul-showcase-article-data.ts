import { ArticleData } from './kul-showcase-article-declarations';
import {
  KulComponentEventName,
  KulComponentEventPayloadName,
  KulComponentName,
  KulComponentTag,
} from '../../../../types/GenericTypes';
import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { ARTICLE_KULDATA } from '../../assets/fixtures/article';
import { SECTION_FACTORY } from '../../helpers/kul-showcase-section';
import { DOC_IDS } from '../../kul-showcase-data';

const COMPONENT_NAME: KulComponentName = 'KulArticle';
const EVENT_NAME: KulComponentEventName<'KulArticle'> = 'kul-article-event';
const PAYLOAD_NAME: KulComponentEventPayloadName<'KulArticle'> =
  'KulArticleEventPayload';
const TAG_NAME: KulComponentTag<'KulArticle'> = 'kul-article';

export const ARTICLE_EXAMPLES: () => ArticleData = () => ({
  simple: {
    ['data-description']: 'Simple article',
    kulData: ARTICLE_KULDATA(),
  },
  style: {
    ['data-description']: 'Article with custom style',
    'data-dynamic': 'custom',
    kulData: ARTICLE_KULDATA(),
  },
});

export const ARTICLE_DOC: KulArticleDataset = {
  nodes: [
    {
      id: DOC_IDS.root,
      value: COMPONENT_NAME,
      children: [
        SECTION_FACTORY.overview(
          COMPONENT_NAME,
          'is designed to render semantic HTML based on a JSON structure',
        ),
        SECTION_FACTORY.usage(COMPONENT_NAME, {
          data: JSON.stringify({
            nodes: [
              {
                value: 'Article Title',
                id: DOC_IDS.root,
                children: [
                  {
                    value: 'Section Title',
                    id: DOC_IDS.section,
                    children: [
                      {
                        value: 'Paragraph title',
                        id: DOC_IDS.paragraph,
                        children: [
                          {
                            value: 'Text',
                            id: DOC_IDS.content,
                          },
                          {
                            value: 'Strong text',
                            id: DOC_IDS.content,
                            tagName: 'strong',
                          },
                        ],
                      },
                    ],
                  },
                ],
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
              description: 'wraps a subcomponent event',
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
