import { KulDataDataset } from '../../../managers/kul-data/kul-data-declarations';
import { KulMessengerImageRootNodesIds } from '../kul-messenger-declarations';

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
