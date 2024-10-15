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
    'card',
    'chart',
    'chat',
    'chip',
    'code',
    'image',
    'lazy',
    'list',
    'messenger',
    'photoframe',
    'progressbar',
    'splash',
    'spinner',
    'switch',
    'tabbar',
    'textfield',
    'toast',
    'tree',
    'upload',
];
export const DOC_IDS = {
    content: '0.0.0.0',
    paragraph: '0.0.0',
    section: '0.0',
    root: '0',
};
export const DOC_STYLES = {
    hiddenSeparator: {
        ['display']: 'block',
        ['margin']: '1.5em 0',
        ['width']: '100%',
    },
    monoPrimaryContent: {
        ['--kul_article_content_color']: 'var(--kul-primary-color)',
        ['--kul_article_content_font_family']:
            'var(--kul-font-family-monospace)',
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
            description:
                'Displays a count and label to provide context to content.',
            icon: 'notifications',
            id: 'Badge',
            value: 'Badge',
        },
        {
            description:
                'Provides a reusable button for various user interactions.',
            icon: 'brightness-1',
            id: 'Button',
            value: 'Button',
        },
        {
            description:
                'Displays content and actions related to a single topic in card format.',
            icon: 'art_track',
            id: 'Card',
            value: 'Card',
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
            description: 'Displays images and supports different resolutions.',
            icon: 'image',
            id: 'Image',
            value: 'Image',
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
            description:
                'Simple component to toggle a boolean state on and off.',
            icon: 'toll',
            id: 'Switch',
            value: 'Switch',
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
            description:
                'Renders a tree structure to display hierarchical data.',
            icon: 'file-tree',
            id: 'Tree',
            value: 'Tree',
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
            description:
                'Utility useful for debugging and for code observability.',
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
            description: 'Handles various management tasks within the library.',
            icon: 'settings',
            id: 'KulManager',
            value: 'KulManager',
        },
        {
            description: 'Math operations and number formatting.',
            icon: 'calculator',
            id: 'KulMath',
            value: 'KulMath',
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
export const KUL_SHOWCASE_LAYOUT: KulDataDataset = {
    nodes: [
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
            description:
                'A small template that acts as an interface between the user and an LLM for roleplay.',
            icon: 'assistant',
            id: 'Messenger',
            value: 'Messenger',
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
            id: '0',
            value: 'Ketchup Lite',
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '1.5',
                                    value: 'Ketchup Lite is a Webcomponents library written in TypeScript and Sass.',
                                },
                                {
                                    id: '1.5',
                                    value: "It's a side project on which I'm working on in my free time.",
                                },
                                {
                                    children: [
                                        {
                                            id: '',
                                            value: 'It is a fork stemming from the original ',
                                        },
                                        {
                                            id: '',
                                            tagName: 'strong',
                                            value: 'Ketchup project',
                                        },
                                        {
                                            id: '',
                                            value: ', aiming to provide a streamlined and efficient set of tools for developers.',
                                        },
                                    ],
                                    id: '',
                                    value: '',
                                },
                            ],
                            id: '',
                            value: '',
                        },
                        {
                            children: [
                                {
                                    id: '',
                                    value: 'For more information you can visit the GitHub page of the project.',
                                },
                            ],
                            id: '',
                            value: '',
                        },
                    ],
                    id: '',
                    value: '',
                },
            ],
        },
    ],
};
