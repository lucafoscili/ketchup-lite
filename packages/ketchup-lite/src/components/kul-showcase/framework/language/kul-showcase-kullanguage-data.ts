import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { PARAGRAPH_FACTORY } from '../../helpers/kul-showcase-paragraph';
import { DOC_IDS, DOC_NODES } from '../../kul-showcase-data';

export const LANGUAGE_DATA: KulArticleDataset = {
    nodes: [
        {
            id: DOC_IDS.root,
            value: 'KulLanguage',
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
                                    value: 'KulLanguage',
                                },
                                {
                                    id: DOC_IDS.content,
                                    value: ' is responsible for handling language translation and localization for the Ketchup Lite library. It allows developers to manage multiple languages and variants for their components.',
                                },
                            ],
                            id: DOC_IDS.paragraph,
                            value: '',
                        },
                        {
                            children: [
                                {
                                    id: DOC_IDS.content,
                                    value: 'KulLanguage provides tools to easily set and get the current language, handle translation keys, and manage component language changes dynamically.',
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
                        PARAGRAPH_FACTORY.asBulletListEntry('KulLanguageKey', [
                            {
                                title: 'KulLanguageCheckbox',
                                description:
                                    ': Language key for checkbox-related terms.',
                            },
                            {
                                title: 'KulLanguageColumn',
                                description:
                                    ': Language key for column-related terms.',
                            },
                            {
                                title: 'KulLanguageDashboard',
                                description:
                                    ': Language key for dashboard-related terms.',
                            },
                            {
                                title: 'KulLanguageDebug',
                                description:
                                    ': Language key for debugging-related terms.',
                            },
                            {
                                title: 'KulLanguageGeneric',
                                description:
                                    ': General language key for miscellaneous terms.',
                            },
                        ]),
                        DOC_NODES.hiddenSeparator,
                        PARAGRAPH_FACTORY.asBulletListEntry(
                            'KulLanguageValue',
                            [
                                {
                                    title: 'string | { [key: string]: KulLanguageValue }',
                                    description:
                                        ': Represents the translation value, which can be a string or a nested object for more complex translations.',
                                },
                            ]
                        ),
                        DOC_NODES.hiddenSeparator,
                        PARAGRAPH_FACTORY.asBulletListEntry(
                            'KulLanguageDefaults',
                            [
                                {
                                    title: 'en',
                                    description:
                                        ': Default language set to English.',
                                },
                                {
                                    title: 'it',
                                    description:
                                        ': Default language set to Italian.',
                                },
                                {
                                    title: 'fr',
                                    description:
                                        ': Default language set to French.',
                                },
                                {
                                    title: 'es',
                                    description:
                                        ': Default language set to Spanish.',
                                },
                            ]
                        ),
                    ],
                },
                {
                    id: DOC_IDS.section,
                    value: 'Available APIs',
                    children: [
                        PARAGRAPH_FACTORY.asListEntry(
                            'translate',
                            'Translates a given language key to the specified language.',
                            [
                                {
                                    name: 'key',
                                    type: 'KulLanguageKey',
                                    description:
                                        'The translation key to lookup.',
                                },
                                {
                                    name: 'language?',
                                    type: 'string',
                                    description:
                                        'Optional language to translate into. Defaults to the current language.',
                                },
                            ]
                        ),
                        DOC_NODES.hiddenSeparator,
                        PARAGRAPH_FACTORY.asListEntry(
                            'set',
                            'Sets the current language for the application.',
                            [
                                {
                                    name: 'language',
                                    type: 'string',
                                    description:
                                        'The language code to set as the current language.',
                                },
                            ]
                        ),
                        DOC_NODES.hiddenSeparator,
                        PARAGRAPH_FACTORY.asListEntry(
                            'decodeLanguage',
                            'Decodes the language string into a language and variant.',
                            [
                                {
                                    name: 'language',
                                    type: 'string',
                                    description:
                                        'The language string to decode, e.g., en_US.',
                                },
                            ]
                        ),
                        DOC_NODES.hiddenSeparator,
                        PARAGRAPH_FACTORY.asListEntry(
                            'getBCP47',
                            'Returns the BCP 47 language code for the given language.',
                            [
                                {
                                    name: 'language?',
                                    type: 'string',
                                    description:
                                        'Optional language to convert. Defaults to the current language.',
                                },
                            ]
                        ),
                        DOC_NODES.hiddenSeparator,
                        PARAGRAPH_FACTORY.asListEntry(
                            'getLanguages',
                            'Returns an array of available languages and their variants.',
                            []
                        ),
                        DOC_NODES.hiddenSeparator,
                        PARAGRAPH_FACTORY.asListEntry(
                            'register',
                            'Registers a component to be managed by KulLanguage.',
                            [
                                {
                                    name: 'component',
                                    type: 'any',
                                    description:
                                        'The component to register for language management.',
                                },
                            ]
                        ),
                        DOC_NODES.hiddenSeparator,
                        PARAGRAPH_FACTORY.asListEntry(
                            'unregister',
                            'Unregisters a component from being managed by KulLanguage.',
                            [
                                {
                                    name: 'component',
                                    type: 'any',
                                    description: 'The component to unregister.',
                                },
                            ]
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
                                    value: 'Translating a Key:',
                                },
                                DOC_NODES.hiddenSeparator,
                                {
                                    cells: {
                                        kulCode: {
                                            shape: 'code',
                                            value: "const kulLanguage = new KulLanguage();\nconst translation = kulLanguage.translate('KulLanguageDashboard');\nconsole.log(translation);  // Output: translated string for 'KulLanguageDashboard' in the current language",
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
                                    value: 'Setting the Language to Italian:',
                                },
                                DOC_NODES.hiddenSeparator,
                                {
                                    cells: {
                                        kulCode: {
                                            shape: 'code',
                                            value: "const kulLanguage = new KulLanguage();\nkulLanguage.set('it');\nconsole.log(kulLanguage.getLanguages());  // Output: array of available languages including 'it'",
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
