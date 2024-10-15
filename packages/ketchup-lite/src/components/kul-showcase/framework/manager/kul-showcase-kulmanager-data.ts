import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { DOC_IDS, DOC_NODES } from '../../kul-showcase-data';
import { SHOWCASE_DOC } from '../../kul-showcase-utils';

export const MANAGER_DATA: KulArticleDataset = {
    nodes: [
        {
            id: DOC_IDS.root,
            value: 'KulManager',
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
                                    value: 'KulManager',
                                },
                                {
                                    id: DOC_IDS.content,
                                    value: ' is a Javascript class that incorporates various functionalities and includes other manager classes, such as the theme manager.',
                                },
                            ],
                            id: DOC_IDS.paragraph,
                            value: '',
                        },
                        {
                            children: [
                                {
                                    id: DOC_IDS.content,
                                    tagName: 'strong',
                                    value: 'KulManager',
                                },
                                {
                                    id: DOC_IDS.content,
                                    value: ' is instantiated as a singleton by the first component loaded into the DOM.',
                                },
                            ],
                            id: DOC_IDS.paragraph,
                            value: '',
                        },
                        {
                            children: [
                                {
                                    id: DOC_IDS.content,
                                    value: 'Several default behaviors of the library can be modified. To achieve this, you can define a custom property on the ',
                                },
                                {
                                    id: DOC_IDS.content,
                                    tagName: 'strong',
                                    value: 'documentElement',
                                },
                                {
                                    id: DOC_IDS.content,
                                    value: ' called ',
                                },
                                {
                                    id: DOC_IDS.content,
                                    tagName: 'strong',
                                    value: 'ketchupLiteInit',
                                },
                                {
                                    id: DOC_IDS.content,
                                    value: ' before the document body.',
                                },
                            ],
                            id: DOC_IDS.paragraph,
                            value: '',
                        },
                        {
                            children: [
                                {
                                    id: DOC_IDS.content,
                                    value: "For instance, suppose you want to load Ketchup Lite with the 'Night' theme enabled.",
                                },
                                {
                                    id: DOC_IDS.content,
                                    tagName: 'strong',
                                    value: 'This is all you need to do within a script tag in the head tag:',
                                },
                                DOC_NODES.hiddenSeparator,
                                {
                                    cells: {
                                        kulCode: {
                                            shape: 'code',
                                            value: "const dom = document.documentElement;\ndom.ketchupLiteInit = {\n   theme: { name: 'night' },\n};",
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
                {
                    id: DOC_IDS.section,
                    value: 'Initialization Settings',
                    children: [
                        {
                            children: [
                                {
                                    id: DOC_IDS.content,
                                    value: 'This list includes all initialization parameters for the KulManager singleton.',
                                },
                            ],
                            id: DOC_IDS.paragraph,
                            value: '',
                        },
                        DOC_NODES.separator,
                        SHOWCASE_DOC.create.paragraph.asSimpleListEntry(
                            'assetsPath (string)',
                            ": sets the URL where the library's static assets, such as SVGs, are stored."
                        ),
                        SHOWCASE_DOC.create.paragraph.asSimpleListEntry(
                            'autoSetLocalization (boolean)',
                            ': when true, the library automatically configures KulLanguage and KulMath locales to align with KulDates.'
                        ),
                        DOC_NODES.hiddenSeparator,
                        SHOWCASE_DOC.create.paragraph.asBulletListEntry(
                            'dates',
                            [
                                {
                                    title: 'locale (string)',
                                    description:
                                        ': sets the locale for time and date-related functionalities within the library.',
                                },
                            ]
                        ),
                        DOC_NODES.hiddenSeparator,
                        SHOWCASE_DOC.create.paragraph.asBulletListEntry(
                            'debug',
                            [
                                {
                                    title: 'active (boolean)',
                                    description:
                                        ': determines whether the debug mode is enabled.',
                                },
                                {
                                    title: 'autoPrint (boolean)',
                                    description:
                                        ': specifies whether the debug widget automatically prints new logs.',
                                },
                                {
                                    title: 'logLimit (number)',
                                    description:
                                        ': sets the maximum number of debug logs to retain.',
                                },
                            ]
                        ),
                        DOC_NODES.hiddenSeparator,
                        SHOWCASE_DOC.create.paragraph.asBulletListEntry(
                            'language',
                            [
                                {
                                    title: 'list (JSON)',
                                    description:
                                        ': provides a custom list of languages.',
                                },
                                {
                                    title: 'name (string)',
                                    description:
                                        ': specifies the current language used by the library.',
                                },
                            ]
                        ),
                        DOC_NODES.hiddenSeparator,
                        SHOWCASE_DOC.create.paragraph.asBulletListEntry(
                            'math',
                            [
                                {
                                    title: 'locale (string)',
                                    description:
                                        ': sets the locale for mathematical and financial operations within the library.',
                                },
                            ]
                        ),
                        DOC_NODES.hiddenSeparator,
                        SHOWCASE_DOC.create.paragraph.asBulletListEntry(
                            'scrollOnHover',
                            [
                                {
                                    title: 'delay (number)',
                                    description:
                                        ': specifies the delay before initiating scrolling on hover.',
                                },
                                {
                                    title: 'step (number)',
                                    description:
                                        ': sets the scrolling increment in pixels.',
                                },
                            ]
                        ),
                        DOC_NODES.hiddenSeparator,
                        SHOWCASE_DOC.create.paragraph.asBulletListEntry(
                            'theme',
                            [
                                {
                                    title: 'name (string)',
                                    description:
                                        ': provides a custom list of themes.',
                                },
                                {
                                    title: 'step (number)',
                                    description:
                                        ": sets the library's initial theme.",
                                },
                            ]
                        ),
                    ],
                },
                {
                    id: DOC_IDS.section,
                    value: 'Utility functions',
                    children: [
                        {
                            children: [
                                {
                                    id: DOC_IDS.content,
                                    value: 'KulManager provides several utility functions available for application use.',
                                },
                            ],
                            id: DOC_IDS.paragraph,
                            value: '',
                        },
                        DOC_NODES.separator,
                        SHOWCASE_DOC.create.paragraph.asListEntry(
                            'addClickCallback',
                            'KulManager listens for click events on the document element. This utility function adds a new callback to the "click callbacks" set, which are executed when an element is located in the DOM tree of the event target.',
                            [
                                {
                                    name: 'cb',
                                    type: 'KulManagerClickCb',
                                    description: 'The callback to be added.',
                                },
                                {
                                    name: 'async?',
                                    type: 'boolean',
                                    description:
                                        'If true, the callback is added asynchronously to prevent immediate execution if added during a click event.',
                                },
                            ]
                        ),
                        DOC_NODES.hiddenSeparator,
                        SHOWCASE_DOC.create.paragraph.asListEntry(
                            'removeClickCallback',
                            'Removes the given click callback from the set of "click callbacks".',
                            [
                                {
                                    name: 'cb',
                                    type: 'KulManagerClickCb',
                                    description:
                                        'The callback to remove from the set.',
                                },
                            ]
                        ),
                        DOC_NODES.hiddenSeparator,
                        SHOWCASE_DOC.create.paragraph.asListEntry(
                            'setLibraryLocalization',
                            'Sets both locale and language library-wide.',
                            [
                                {
                                    name: 'locale',
                                    type: 'KulDatesLocales',
                                    description:
                                        'The locale to set (must be supported by the library).',
                                },
                            ]
                        ),
                    ],
                },
            ],
        },
    ],
};
