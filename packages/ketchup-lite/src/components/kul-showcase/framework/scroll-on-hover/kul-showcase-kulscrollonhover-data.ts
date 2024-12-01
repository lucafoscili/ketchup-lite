import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { PARAGRAPH_FACTORY } from '../../helpers/kul-showcase-paragraph';
import { DOC_IDS, DOC_NODES } from '../../kul-showcase-data';

export const SCROLL_ON_HOVER_DATA: KulArticleDataset = {
  nodes: [
    {
      id: DOC_IDS.root,
      value: 'KulScrollOnHover',
      children: [
        {
          id: DOC_IDS.section,
          value: 'Overview',
          children: [
            {
              children: [
                {
                  id: DOC_IDS.content,
                  tagName: 'strong',
                  value: 'KulScrollOnHover',
                },
                {
                  id: DOC_IDS.content,
                  value:
                    ' allows elements to scroll automatically when the user hovers near the edges. It is designed to simplify navigation through wide or long containers in the Ketchup Lite library.',
                },
              ],
              id: DOC_IDS.paragraph,
              value: '',
            },
            {
              children: [
                {
                  id: DOC_IDS.content,
                  value:
                    'This utility is useful for enhancing the user experience when working with overflow content by automatically scrolling the container based on mouse position.',
                },
              ],
              id: DOC_IDS.paragraph,
              value: '',
            },
          ],
        },
        {
          id: DOC_IDS.section,
          value: 'Basic Types',
          children: [
            PARAGRAPH_FACTORY.asBulletListEntry('KulScrollOnHoverElement', [
              {
                title: 'scrollOnHover',
                description:
                  ': An object containing configuration properties such as active state, children, percentages, direction, and step settings for the scroll effect.',
              },
            ]),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asBulletListEntry('KulScrollOnHoverPercentages', [
              {
                title: 'back (number)',
                description:
                  ': Defines the percentage of the element where the scroll-back effect should begin.',
              },
              {
                title: 'forward (number)',
                description:
                  ': Defines the percentage of the element where the scroll-forward effect should begin.',
              },
            ]),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asBulletListEntry('ScrollOnHoverDirection', [
              {
                title: 'BOTTOM',
                description: ': Scrolls towards the bottom of the element.',
              },
              {
                title: 'LEFT',
                description: ': Scrolls towards the left of the element.',
              },
              {
                title: 'RIGHT',
                description: ': Scrolls towards the right of the element.',
              },
              {
                title: 'TOP',
                description: ': Scrolls towards the top of the element.',
              },
            ]),
          ],
        },
        {
          id: DOC_IDS.section,
          value: 'Available APIs',
          children: [
            PARAGRAPH_FACTORY.asListEntry(
              'register',
              'Registers an element to enable scroll on hover behavior.',
              [
                {
                  name: 'el',
                  type: 'KulScrollOnHoverElement',
                  description:
                    'The element to be registered for scroll on hover.',
                },
                {
                  name: 'vertical?',
                  type: 'boolean',
                  description:
                    'Optional flag indicating whether vertical scrolling should be enabled.',
                },
                {
                  name: 'percentages?',
                  type: 'KulScrollOnHoverPercentages',
                  description:
                    'Optional percentages object to customize the activation areas for scrolling.',
                },
                {
                  name: 'step?',
                  type: 'number',
                  description:
                    'Optional scroll step value defining the increment per scroll action.',
                },
              ],
            ),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asListEntry(
              'unregister',
              'Unregisters an element from scroll on hover management.',
              [
                {
                  name: 'el',
                  type: 'KulScrollOnHoverElement',
                  description: 'The element to be unregistered.',
                },
              ],
            ),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asListEntry(
              'isRegistered',
              'Checks if an element is registered for scroll on hover.',
              [
                {
                  name: 'el',
                  type: 'KulScrollOnHoverElement',
                  description: 'The element to check registration for.',
                },
              ],
            ),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asListEntry(
              'start',
              'Starts the scroll on hover behavior for the given element.',
              [
                {
                  name: 'event',
                  type: 'MouseEvent',
                  description: 'The mouse event that triggers the scroll.',
                },
              ],
            ),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asListEntry(
              'stop',
              'Stops the scroll on hover behavior for the given element.',
              [
                {
                  name: 'el',
                  type: 'KulScrollOnHoverElement',
                  description:
                    'The element for which to stop the scrolling behavior.',
                },
              ],
            ),
          ],
        },
        {
          id: DOC_IDS.section,
          value: 'Examples',
          children: [
            {
              children: [
                {
                  id: DOC_IDS.content,
                  value: 'Registering an Element for Scroll on Hover:',
                },
                DOC_NODES.hiddenSeparator,
                {
                  cells: {
                    kulCode: {
                      shape: 'code',
                      value:
                        "const kulScrollOnHover = new KulScrollOnHover();\nconst element = document.querySelector('#myScrollableElement');\nkulScrollOnHover.register(element, true, { back: 0.15, forward: 0.85 }, 40);",
                    },
                  },
                  id: DOC_IDS.content,
                },
              ],
              id: DOC_IDS.paragraph,
              value: '',
            },
            {
              children: [
                {
                  id: DOC_IDS.content,
                  value: 'Stopping Scroll on Hover:',
                },
                DOC_NODES.hiddenSeparator,
                {
                  cells: {
                    kulCode: {
                      shape: 'code',
                      value:
                        "const kulScrollOnHover = new KulScrollOnHover();\nconst element = document.querySelector('#myScrollableElement');\nkulScrollOnHover.stop(element);",
                    },
                  },
                  id: DOC_IDS.content,
                },
              ],
              id: DOC_IDS.paragraph,
              value: '',
            },
          ],
        },
      ],
    },
  ],
};
