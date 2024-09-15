import { getAssetPath } from '@stencil/core';
import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { KulMessengerDataset } from '../../../kul-messenger/kul-messenger-declarations';
import { DOC_STYLES } from '../../kul-showcase-data';
import { SHOWCASE_DOC } from '../../kul-showcase-utils';
import { MessengerData } from './kul-showcase-messenger-declarations';
import {
    FREYA_AVATARS,
    FREYA_BIO,
    FREYA_LOCATIONS,
    FREYA_OUTFITS,
    FREYA_STYLES,
    THOR_AVATARS,
    THOR_BIO,
    THOR_LOCATIONS,
    THOR_OUTFITS,
    THOR_STYLES,
} from '../../assets/mock-ups/messenger';

const component = 'messenger';

const kulData: KulMessengerDataset = {
    nodes: [
        {
            children: [
                {
                    children: THOR_AVATARS,
                    id: 'avatars',
                    value: 0,
                },
                { id: 'biography', value: THOR_BIO },
                { id: 'chat', value: '' },
                {
                    children: THOR_LOCATIONS,
                    id: 'locations',
                    value: 0,
                },
                {
                    children: THOR_OUTFITS,
                    id: 'outfits',
                    value: 0,
                },
                {
                    children: THOR_STYLES,
                    id: 'styles',
                    value: 0,
                },
            ],
            id: 'character_Thor',
            value: 'Thor',
        },
        {
            children: [
                {
                    children: FREYA_AVATARS,
                    id: 'avatars',
                    value: 1,
                },
                { id: 'biography', value: FREYA_BIO },
                { id: 'chat', value: '' },
                {
                    children: FREYA_LOCATIONS,
                    id: 'locations',
                    value: 0,
                },
                {
                    children: FREYA_OUTFITS,
                    id: 'outfits',
                    value: 0,
                },
                {
                    children: FREYA_STYLES,
                    id: 'styles',
                    value: 0,
                },
            ],
            id: 'character_Freya',
            value: 'Freya',
        },
    ],
};

export const MESSENGER_EXAMPLES: MessengerData = {
    simple: {
        ['data-description']: 'Simple messenger component',
        kulData,
    },
    style: {
        ['data-description']: 'Messenger with custom style',
        ['data-dynamic']: 'custom',
        kulData,
    },
};

export const MESSENGER_DOC: KulArticleDataset = {
    nodes: [
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.0.0.0.0',
                                            value: 'The ',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulMessenger',
                                        },
                                        {
                                            id: '0.0.0.0.2',
                                            value: ' component offers a layout designed to chat with an LLM for roleplay purposes.',
                                        },
                                    ],
                                    id: '0.0.0.0',
                                },
                            ],
                            id: '0.0.0',
                        },
                    ],
                    id: '0.0',
                    value: 'Overview',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.1.1.0',
                                    tagName: 'strong',
                                    value: 'Customizable Styling',
                                },
                                {
                                    id: '0.1.1.1',
                                    value: ": Offers the ability to customize the component's style through the ",
                                },
                                {
                                    id: '0.1.1.2',
                                    tagName: 'strong',
                                    value: 'kulStyle',
                                },
                                {
                                    id: '0.1.1.3',
                                    value: ' property.',
                                },
                            ],
                            id: '0.1.1',
                            tagName: 'li',
                        },
                    ],
                    id: '0.1',
                    value: 'Features',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.2.0.0.0',
                                            value: 'To use the ',
                                        },
                                        {
                                            id: '0.2.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulMessenger',
                                        },
                                        {
                                            id: '0.2.0.0.2',
                                            value: ' component, include it in your HTML and provide the ',
                                        },
                                        {
                                            id: '0.2.0.0.3',
                                            tagName: 'strong',
                                            value: 'slot',
                                        },
                                        {
                                            id: '0.2.0.0.4',
                                            value: ' that must be displayed inside it.',
                                        },
                                    ],
                                    id: '0.2.0.0',
                                },
                                {
                                    children: [
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'markup',
                                                    value: '<kul-messenger>\n   <kul-image slot="avatar">\n   </kul-image>\n</kul-messenger>',
                                                },
                                            },
                                            id: '0.2.0.1.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.2.0.1',
                                },
                            ],
                            id: '0.2.0',
                            value: 'Basic Usage',
                        },
                    ],
                    id: '0.2',
                    value: 'Usage',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.3.1.0.0',
                                            value: 'Type:',
                                        },
                                        {
                                            id: '0.3.1.0.1',
                                            tagName: 'strong',
                                            value: 'string',
                                        },
                                    ],
                                    id: '0.3.1.0',
                                    value: '',
                                },
                                {
                                    children: [
                                        {
                                            id: '0.3.1.1.0',
                                            value: "Enables customization of the component's style. This property accepts a string of CSS styles that will be applied to the component.",
                                        },
                                    ],
                                    id: '0.3.1.1',
                                    value: '',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.3.1',
                            value: 'kulStyle',
                        },
                    ],
                    id: '0.3',
                    value: 'Properties',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.4.0.0',
                                    value: 'This event is emitted during various lifecycle stages of the component. It carries a payload of type ',
                                },
                                {
                                    id: '0.4.0.1',
                                    value: 'KulEventPayload',
                                },
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [
                                                        {
                                                            children: [
                                                                {
                                                                    id: '0.4.0.2.0.0.0.0',
                                                                    tagName:
                                                                        'strong',
                                                                    value: 'ready',
                                                                },
                                                                {
                                                                    id: '0.4.0.2.0.0.0.1',
                                                                    value: ': emitted when the component completes its first complete lifecycle.',
                                                                },
                                                            ],
                                                            id: '0.4.0.2.0.0.0',
                                                            tagName: 'li',
                                                            value: '',
                                                        },
                                                    ],
                                                    id: '0.4.0.2.0.0',
                                                    value: '',
                                                },
                                            ],
                                            id: '0.4.0.2.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.4.0.2',
                                    value: ', which includes information about the component and the event type.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.4.0',
                            tagName: 'strong',
                            value: 'kul-messenger-event',
                        },
                    ],
                    id: '0.4',
                    value: 'Events',
                },
                {
                    children: SHOWCASE_DOC.get.methods(component),
                    id: '0.5',
                    value: 'Methods',
                },
                {
                    children: SHOWCASE_DOC.get.styles(component),
                    id: '0.7',
                    value: 'Styling',
                },
            ],
            id: '0',
            value: 'KulMessenger',
        },
    ],
};
