import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { PARAGRAPH_FACTORY } from '../../helpers/kul-showcase-paragraph';
import { DOC_IDS, DOC_NODES } from '../../kul-showcase-data';

export const DYNAMIC_POSITION_DATA: KulArticleDataset = {
    nodes: [
        {
            id: DOC_IDS.root,
            value: 'KulDynamicPosition',
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
                                    value: 'KulDynamicPosition',
                                },
                                {
                                    id: DOC_IDS.content,
                                    value: ' is a utility that manages the positioning of elements dynamically, based on anchor points, user interactions, and specific placement requirements within the Ketchup Lite library.',
                                },
                            ],
                            id: DOC_IDS.paragraph,
                            value: '',
                        },
                        {
                            children: [
                                {
                                    id: DOC_IDS.content,
                                    value: 'KulDynamicPosition allows elements to be anchored relative to other elements or coordinates, providing a flexible way to handle dropdowns, tooltips, popovers, and more.',
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
                        PARAGRAPH_FACTORY.asBulletListEntry(
                            'KulDynamicPositionAnchor',
                            [
                                {
                                    title: 'HTMLElement',
                                    description:
                                        ': The HTML element to which another element is anchored.',
                                },
                                {
                                    title: 'KulDynamicPositionCoordinates',
                                    description:
                                        ': Specific coordinates (x, y) to anchor an element.',
                                },
                            ]
                        ),
                        DOC_NODES.hiddenSeparator,
                        PARAGRAPH_FACTORY.asBulletListEntry(
                            'KulDynamicPositionElement',
                            [
                                {
                                    title: 'kulDynamicPosition',
                                    description:
                                        ': An optional property that includes details about anchor, placement, margin, and other positioning settings for the element.',
                                },
                            ]
                        ),
                        DOC_NODES.hiddenSeparator,
                        PARAGRAPH_FACTORY.asBulletListEntry(
                            'KulDynamicPositionPlacement',
                            [
                                {
                                    title: 'AUTO',
                                    description:
                                        ': Automatically determines the best position for the element.',
                                },
                                {
                                    title: 'BOTTOM, BOTTOM_LEFT, BOTTOM_RIGHT',
                                    description:
                                        ': Positions the element at the bottom, with optional left or right alignment.',
                                },
                                {
                                    title: 'TOP, TOP_LEFT, TOP_RIGHT',
                                    description:
                                        ': Positions the element at the top, with optional left or right alignment.',
                                },
                                {
                                    title: 'LEFT, RIGHT',
                                    description:
                                        ': Positions the element on the left or right of the anchor.',
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
                            'register',
                            'Registers an element for dynamic positioning based on an anchor and other settings.',
                            [
                                {
                                    name: 'el',
                                    type: 'KulDynamicPositionElement',
                                    description:
                                        'The element to be positioned.',
                                },
                                {
                                    name: 'anchorEl',
                                    type: 'KulDynamicPositionAnchor',
                                    description:
                                        'The anchor element or coordinates for positioning.',
                                },
                                {
                                    name: 'margin?',
                                    type: 'number',
                                    description:
                                        'Optional margin around the element for spacing.',
                                },
                                {
                                    name: 'placement?',
                                    type: 'KulDynamicPositionPlacement',
                                    description:
                                        'Optional placement setting for the element.',
                                },
                                {
                                    name: 'detach?',
                                    type: 'boolean',
                                    description:
                                        'Whether to detach the element from its original parent and place it in a dynamic container.',
                                },
                            ]
                        ),
                        DOC_NODES.hiddenSeparator,
                        PARAGRAPH_FACTORY.asListEntry(
                            'changeAnchor',
                            'Changes the anchor for an already registered element.',
                            [
                                {
                                    name: 'el',
                                    type: 'KulDynamicPositionElement',
                                    description:
                                        'The element whose anchor needs to be changed.',
                                },
                                {
                                    name: 'anchorEl',
                                    type: 'KulDynamicPositionAnchor',
                                    description:
                                        'The new anchor element or coordinates.',
                                },
                            ]
                        ),
                        DOC_NODES.hiddenSeparator,
                        PARAGRAPH_FACTORY.asListEntry(
                            'unregister',
                            'Unregisters one or more elements from dynamic positioning.',
                            [
                                {
                                    name: 'elements',
                                    type: 'KulDynamicPositionElement[]',
                                    description:
                                        'The elements to be unregistered.',
                                },
                            ]
                        ),
                        DOC_NODES.hiddenSeparator,
                        PARAGRAPH_FACTORY.asListEntry(
                            'isRegistered',
                            'Checks if an element is registered for dynamic positioning.',
                            [
                                {
                                    name: 'el',
                                    type: 'KulDynamicPositionElement',
                                    description: 'The element to check.',
                                },
                            ]
                        ),
                        DOC_NODES.hiddenSeparator,
                        PARAGRAPH_FACTORY.asListEntry(
                            'start',
                            'Starts the positioning process for an element.',
                            [
                                {
                                    name: 'el',
                                    type: 'KulDynamicPositionElement',
                                    description:
                                        'The element to start positioning.',
                                },
                            ]
                        ),
                        DOC_NODES.hiddenSeparator,
                        PARAGRAPH_FACTORY.asListEntry(
                            'stop',
                            'Stops the positioning process for an element.',
                            [
                                {
                                    name: 'el',
                                    type: 'KulDynamicPositionElement',
                                    description:
                                        'The element to stop positioning.',
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
                                    value: 'Registering an Element for Positioning:',
                                },
                                DOC_NODES.hiddenSeparator,
                                {
                                    cells: {
                                        kulCode: {
                                            shape: 'code',
                                            value: "const kulDynamicPosition = new KulDynamicPosition();\nconst element = document.querySelector('#myElement');\nconst anchor = document.querySelector('#anchorElement');\nkulDynamicPosition.register(element, anchor, 10, 'BOTTOM_LEFT', true);",
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
                                    value: 'Changing the Anchor of an Element:',
                                },
                                DOC_NODES.hiddenSeparator,
                                {
                                    cells: {
                                        kulCode: {
                                            shape: 'code',
                                            value: "const newAnchor = document.querySelector('#newAnchor');\nkulDynamicPosition.changeAnchor(element, newAnchor);",
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
