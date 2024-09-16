import { KulDataDataset } from '../../../managers/kul-data/kul-data-declarations';
import { KulMessengerImageRootNodesIds } from '../kul-messenger-declarations';

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
                        'Download the starting Ketchup Lite JSON used as dataset.',
                    icon: 'download',
                    id: 'download',
                    value: 'Download characters',
                },
                {
                    description: 'Download the history of the chats.',
                    icon: 'history',
                    id: 'history',
                    value: 'Download history',
                },
                {
                    description:
                        'Emits the "save" event, which includes the current settings.',
                    icon: 'save',
                    id: 'save',
                    value: 'Save',
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
            icon: 'chevron_left',
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
            icon: 'chevron_right',
            id: 'next',
            value: '',
        },
    ],
};
