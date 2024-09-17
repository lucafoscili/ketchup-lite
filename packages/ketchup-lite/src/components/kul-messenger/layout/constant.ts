import { KulDataDataset } from '../../../managers/kul-data/kul-data-declarations';
import { KulMessengerImageRootNodesIds } from '../kul-messenger-declarations';

export const LEFT_EXPANDER_ICON = 'chevron_left';
export const RIGHT_EXPANDER_ICON = 'chevron_right';

export const AVATAR_COVER = 'portrait';
export const LOCATION_COVER = 'landscape';
export const OUTFIT_COVER = 'loyalty';
export const STYLE_COVER = 'style';
export const COVER_ICONS = [
    AVATAR_COVER,
    LOCATION_COVER,
    OUTFIT_COVER,
    STYLE_COVER,
];

export const FILTER_DATASET: KulDataDataset = {
    nodes: [
        {
            description: 'View avatars',
            id: 'avatars',
            value: 'Avatars',
        },
        {
            description: 'View outfits',
            id: 'outfits',
            value: 'Outfits',
        },
        {
            description: 'View locations',
            id: 'locations',
            value: 'Locations',
        },
        {
            description: 'View styles',
            id: 'styles',
            value: 'Styles',
        },
    ],
};

export const MENU_DATASET: KulDataDataset = {
    nodes: [
        {
            children: [
                {
                    description:
                        'Download the Ketchup Lite JSON, used as a dataset.',
                    icon: 'download',
                    id: 'kulData',
                    value: 'Download characters',
                },
                {
                    description:
                        'Download the chat history with this character.',
                    icon: 'history',
                    id: 'history',
                    value: 'Download history',
                },
                {
                    description:
                        'Download the chat history for all characters.',
                    icon: 'people',
                    id: 'full_history',
                    value: 'Download complete history',
                },
                {
                    description: 'Download the widget configuration.',
                    icon: 'settings',
                    id: 'settings',
                    value: 'Download configuration',
                },
            ],
            id: 'root',
            value: '',
        },
    ],
};

export const IMAGE_TYPE_IDS: KulMessengerImageRootNodesIds[] = [
    'avatars',
    'locations',
    'outfits',
    'styles',
];

export const NAV_DATASET: KulDataDataset = {
    nodes: [
        {
            description: 'Previous character',
            icon: LEFT_EXPANDER_ICON,
            id: 'previous',
            value: '',
        },
        {
            description: 'Character selection',
            icon: 'account',
            id: 'character_list',
            value: 'Character list',
        },
        {
            description: 'Next character',
            icon: RIGHT_EXPANDER_ICON,
            id: 'next',
            value: '',
        },
    ],
};
