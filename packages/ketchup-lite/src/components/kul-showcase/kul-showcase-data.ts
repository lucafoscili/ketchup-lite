import { KulDataDataset } from '../../managers/kul-data/kul-data-declarations';
import {
  KulArticleDataset,
  KulArticleNode,
} from '../kul-article/kul-article-declarations';
export const COMPONENTS = [
  'accordion',
  'article',
  'badge',
  'button',
  'canvas',
  'card',
  'carousel',
  'chart',
  'chat',
  'chip',
  'code',
  'compare',
  'image',
  'lazy',
  'list',
  'masonry',
  'messenger',
  'photoframe',
  'progressbar',
  'slider',
  'splash',
  'spinner',
  'toggle',
  'tabbar',
  'textfield',
  'toast',
  'tree',
  'typewriter',
  'upload',
];
export const DOC_IDS = {
  content: 'content',
  contentList: 'content-list',
  contentListItem: 'content-list-item',
  contentWrapper: 'content-wrapper',
  paragraph: 'paragraph',
  section: 'section',
  root: 'root',
};
export const DOC_STYLES = {
  hiddenSeparator: {
    ['display']: 'block',
    ['margin']: '1.5em 0',
    ['width']: '100%',
  },
  monoPrimaryContent: {
    ['--kul_article_content_color']: 'var(--kul-primary-color)',
    ['--kul_article_content_font_family']: 'var(--kul-font-family-monospace)',
  },
  monoPrimaryH3: {
    ['--kul_article_h3_color']: 'var(--kul-primary-color)',
    ['--kul_article_h3_font_family']: 'var(--kul-font-family-monospace)',
    ['--kul_article_h3_font_size']: 'var(--kul-font-size)',
  },
  monoPrimaryH3Large: {
    ['--kul_article_h3_color']: 'var(--kul-primary-color)',
    ['--kul_article_h3_font_family']: 'var(--kul-font-family-monospace)',
    ['--kul_article_h3_font_size']: 'calc(var(--kul-font-size) * 1.5)',
  },
  separator: {
    ['border']: '1px solid var(--kul-border-color)',
    ['display']: 'block',
    ['margin']: '2em auto',
    ['opacity']: '0.375',
    ['width']: '25%',
  },
  underConstruction: {
    ['boxSizing']: 'border-box',
    ['display']: 'block',
    ['fontSize']: '1.5em',
    ['letterSpacing']: '1px',
    ['margin']: 'auto',
    ['padding']: '1em',
    ['textAlign']: 'center',
    ['textTransform']: 'uppercase',
    ['width']: '100%',
  },
};
type NodeName = 'hiddenSeparator' | 'lineBreak' | 'separator';
export const DOC_NODES: Record<NodeName, KulArticleNode> = {
  hiddenSeparator: {
    cssStyle: DOC_STYLES.hiddenSeparator,
    id: 'content',
    value: '',
  },
  lineBreak: {
    id: 'content',
    tagName: 'br',
    value: '',
  },
  separator: {
    cssStyle: DOC_STYLES.separator,
    id: 'content',
    value: '',
  },
};
export const KUL_SHOWCASE_COMPONENTS: KulDataDataset = {
  nodes: [
    {
      description: 'Displays slots as an accordion.',
      icon: 'view-sequential',
      id: 'Accordion',
      value: 'Accordion',
    },
    {
      description:
        'Generates semantic HTML for articles based on a JSON input.',
      icon: 'document',
      id: 'Article',
      value: 'Article',
    },
    {
      description: 'Displays a count and label to provide context to content.',
      icon: 'notifications',
      id: 'Badge',
      value: 'Badge',
    },
    {
      description: 'Provides a reusable button for various user interactions.',
      icon: 'brightness-1',
      id: 'Button',
      value: 'Button',
    },
    {
      description:
        'Invisible canvas to draw upon, emitting stroke-related events.',
      icon: 'palette',
      id: 'Canvas',
      value: 'Canvas',
    },
    {
      description:
        'Displays content and actions related to a single topic in card format.',
      icon: 'art_track',
      id: 'Card',
      value: 'Card',
    },
    {
      description: 'Provides a navigable slideshow of images or content cards.',
      icon: 'slideshow',
      id: 'Carousel',
      value: 'Carousel',
    },
    {
      description:
        'Integrates multiple types of charts using the Echarts library.',
      icon: 'pie_chart',
      id: 'Chart',
      value: 'Chart',
    },
    {
      description: 'A simple chat module to interact with a local LLM.',
      icon: 'message',
      id: 'Chat',
      value: 'Chat',
    },
    {
      description: 'Widget that can be used to display multiple items',
      icon: 'storage',
      id: 'Chip',
      value: 'Chip',
    },
    {
      description: 'Visualizes code in a readable format.',
      icon: 'code',
      id: 'Code',
      value: 'Code',
    },
    {
      description: 'Compare two different components.',
      icon: 'compare',
      id: 'Compare',
      value: 'Compare',
    },
    {
      description: 'Acts as the side menu within the application layout.',
      icon: 'web',
      id: 'Drawer',
      value: 'Drawer',
    },
    {
      description: 'Serves as the top header bar for the application.',
      icon: 'web_asset',
      id: 'Header',
      value: 'Header',
    },
    {
      description: 'Displays images and supports different resolutions.',
      icon: 'image',
      id: 'Image',
      value: 'Image',
    },
    {
      description: 'A layout designed to display images.',
      icon: 'folder-image',
      id: 'Imageviewer',
      value: 'Image viewer',
    },
    {
      description:
        'Displays a placeholder until content is ready or enters viewport.',
      icon: 'flip_to_back',
      id: 'Lazy',
      value: 'Lazy',
    },
    {
      description: 'A component that displays a list of items.',
      icon: 'list',
      id: 'List',
      value: 'List',
    },
    {
      description:
        'Designed to display images as a masonry or in waterfall view.',
      icon: 'view-quilt',
      id: 'Masonry',
      value: 'Masonry',
    },
    {
      description:
        'A small template that acts as an interface between the user and an LLM for roleplay.',
      icon: 'assistant',
      id: 'Messenger',
      value: 'Messenger',
    },
    {
      description:
        'Shows a placeholder image until the actual image is loaded upon entering viewport.',
      icon: 'photo_album',
      id: 'Photoframe',
      value: 'Photoframe',
    },
    {
      description: 'Displays the percentage of completion.',
      icon: 'data_usage',
      id: 'Progressbar',
      value: 'Progress bar',
    },
    {
      description: 'Simple component for selecting a range of values.',
      icon: 'linear_scale',
      id: 'Slider',
      value: 'Slider',
    },
    {
      description:
        'Full-screen component for prominent app branding or introductory content.',
      icon: 'water',
      id: 'Splash',
      value: 'Splash',
    },
    {
      description:
        'Indicates a loading state, commonly used during content or page loading.',
      icon: 'vanish',
      id: 'Spinner',
      value: 'Spinner',
    },
    {
      description: 'Provides a bar of clickable tabs for navigation.',
      icon: 'featured_play_list',
      id: 'Tabbar',
      value: 'Tab bar',
    },
    {
      description: 'Component for text input fields.',
      icon: 'text_fields',
      id: 'Textfield',
      value: 'Text field',
    },
    {
      description: 'Displays notification messages in a simple format.',
      icon: 'information-variant',
      id: 'Toast',
      value: 'Toast',
    },
    {
      description: 'Simple component to toggle a boolean state on and off.',
      icon: 'toll',
      id: 'Toggle',
      value: 'Toggle',
    },
    {
      description: 'Renders a tree structure to display hierarchical data.',
      icon: 'file-tree',
      id: 'Tree',
      value: 'Tree',
    },
    {
      description:
        "Simulates a typewriter's behavior by displaying text gradually.",
      icon: 'sign-text',
      id: 'Typewriter',
      value: 'Typewriter',
    },
    {
      description: 'Provides functionality to upload files easily.',
      icon: 'upload',
      id: 'Upload',
      value: 'Upload',
    },
  ],
};
export const KUL_SHOWCASE_FRAMEWORK: KulDataDataset = {
  nodes: [
    {
      description: 'Dataset management and manipulation.',
      icon: 'table-edit',
      id: 'KulData',
      value: 'KulData',
    },
    {
      description: 'Date and time management.',
      icon: 'calendar',
      id: 'KulDates',
      value: 'KulDates',
    },
    {
      description: 'Utility useful for debugging and for code observability.',
      icon: 'developer_mode',
      id: 'KulDebug',
      value: 'KulDebug',
    },
    {
      description: 'Takes care of displaying elements dynamically.',
      icon: 'location_searching',
      id: 'KulDynamicPosition',
      value: 'KulDynamicPosition',
    },
    {
      description: 'JSON-based utility to handle translations.',
      icon: 'g_translate',
      id: 'KulLanguage',
      value: 'KulLanguage',
    },
    {
      description: 'Utility to connect with Open-AI compatible endpoints.',
      icon: 'language',
      id: 'KulLlm',
      value: 'KulLlm',
    },
    {
      description: 'Handles various management tasks within the library.',
      icon: 'settings',
      id: 'KulManager',
      value: 'KulManager',
    },
    {
      description:
        'Simple script that activates a scroll-on-hover effect on an element.',
      icon: 'compare_arrows',
      id: 'KulScrollOnHover',
      value: 'KulScrollOnHover',
    },
    {
      description: 'Design system of the library.',
      icon: 'style',
      id: 'KulTheme',
      value: 'KulTheme',
    },
  ],
};
export const KUL_SHOWCASE_UTILITIES: KulDataDataset = {
  nodes: [
    {
      description:
        'Provides an environment to test individual component functionality.',
      icon: 'bug',
      id: 'Debug',
      value: 'Debug',
    },
  ],
};
export const KUL_DOC: KulArticleDataset = {
  nodes: [
    {
      id: DOC_IDS.root,
      value: 'Ketchup Lite',
      children: [
        {
          id: DOC_IDS.section,
          value: '',
          children: [
            {
              id: DOC_IDS.paragraph,
              value: '',
              children: [
                {
                  id: DOC_IDS.contentWrapper,
                  value:
                    'Ketchup Lite is a framework-agnostic web components library in TypeScript and Sass, built with Stencil.js for simplicity and speed.',
                },
                {
                  id: DOC_IDS.contentWrapper,
                  value: '',
                  children: [
                    {
                      id: DOC_IDS.content,
                      value: 'As a fork of the ',
                    },
                    {
                      id: DOC_IDS.content,
                      tagName: 'strong',
                      value: 'original Ketchup project',
                    },
                    {
                      id: DOC_IDS.content,
                      value:
                        ', it offers a refined toolset optimized for lightweight, scalable web applications.',
                    },
                  ],
                },
              ],
            },
            {
              id: DOC_IDS.paragraph,
              value: '',
              children: [
                {
                  id: DOC_IDS.contentWrapper,
                  value:
                    "Notable for a clean glassmorphism design, Ketchup Lite's components are perfect for intuitive and visually appealing UIs.",
                },
              ],
            },
            {
              id: DOC_IDS.contentList,
              value: 'Core Features',
              children: [
                {
                  id: DOC_IDS.contentListItem,
                  value:
                    'Lightweight and fast for improved performance on any web project.',
                },
                {
                  id: DOC_IDS.contentListItem,
                  value:
                    'Accessible design principles for inclusive UI components.',
                },
                {
                  id: DOC_IDS.contentListItem,
                  value:
                    'Compatible with frameworks like React, Vue, and Angular.',
                },
              ],
            },
            {
              id: DOC_IDS.paragraph,
              value: '',
              children: [
                {
                  id: DOC_IDS.contentWrapper,
                  value:
                    'Get started quickly with the GitHub repository for installation guides, usage examples, and full documentation.',
                },
              ],
            },
          ],
        },
        {
          id: DOC_IDS.section,
          value: 'Why Choose Ketchup Lite?',
          children: [
            {
              id: DOC_IDS.paragraph,
              value: '',
              children: [
                {
                  id: DOC_IDS.contentWrapper,
                  value:
                    'Ketchup Lite provides a unique blend of performance and flexibility. Designed to be framework-agnostic, it easily adapts to various project needs, ensuring your applications remain lightweight and scalable.',
                },
              ],
            },
            {
              id: DOC_IDS.paragraph,
              value: '',
              children: [
                {
                  id: DOC_IDS.contentWrapper,
                  value:
                    "Whether you're building with React, Vue, Angular, or vanilla JavaScript, Ketchup Lite's components integrate smoothly with your stack of choice.",
                },
              ],
            },
          ],
        },
        {
          id: DOC_IDS.section,
          value: 'Getting Started',
          children: [
            {
              id: DOC_IDS.paragraph,
              value: '',
              children: [
                {
                  id: DOC_IDS.contentWrapper,
                  value:
                    'Install the library effortlessly via npm and dive into the documentation for component demos and usage examples.',
                },
              ],
            },
            {
              id: DOC_IDS.contentList,
              value: 'Installation',
              children: [
                {
                  id: DOC_IDS.contentListItem,
                  value:
                    'Run `npm install ketchup-lite` in your project directory.',
                },
                {
                  id: DOC_IDS.contentListItem,
                  value:
                    'Import components directly into your code with zero configuration.',
                },
                {
                  id: DOC_IDS.contentListItem,
                  value:
                    "Explore component customization options to fit your project's style.",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
