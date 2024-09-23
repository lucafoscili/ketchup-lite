import { KulDataDataset } from '../../../managers/kul-data/kul-data-declarations';
import { KulMessengerImageRootNodesIds } from '../kul-messenger-declarations';

export const LEFT_EXPANDER_ICON = 'chevron_left';
export const RIGHT_EXPANDER_ICON = 'chevron_right';

export const AVATAR_COVER = 'portrait';
export const LOCATION_COVER = 'landscape';
export const OUTFIT_COVER = 'loyalty';
export const STYLE_COVER = 'style';
export const TIMEFRAME_COVER = 'clock';
export const COVER_ICONS = [
    AVATAR_COVER,
    LOCATION_COVER,
    OUTFIT_COVER,
    STYLE_COVER,
    TIMEFRAME_COVER,
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
        {
            description: 'View timeframes',
            id: 'timeframes',
            value: 'Timeframes',
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
                    value: 'Download dataset',
                },
                {
                    description: 'Download the current configuration settings.',
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

export const OPTION_TYPE_IDS: KulMessengerImageRootNodesIds[] = [
    'locations',
    'outfits',
    'styles',
    'timeframes',
];

export const IMAGE_TYPE_IDS: KulMessengerImageRootNodesIds[] = [
    'avatars',
    ...OPTION_TYPE_IDS,
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
