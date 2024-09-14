import { KulDataDataset, KulDataNode } from '../../components';

export interface KulMessengerAdapter {
    get: {
        avatar: (character?: KulMessengerCharacterNode) => string;
        biography: (character?: KulMessengerCharacterNode) => string;
        characters: () => KulMessengerCharacterNode[];
        comps: () => void;
        currentCharacter: () => KulMessengerCharacterNode;
        image: (type: KulMessengerImages) => string;
        name: (character?: KulMessengerCharacterNode) => string;
    };
    set: {
        comps: () => void;
        currentCharacter: (character: KulMessengerCharacterNode) => void;
    };
}

export interface KulMessengerAvatarNode extends KulDataNode {
    id: 'avatar';
}

export interface KulMessengerBiographyNode extends KulDataNode {
    id: 'biography';
}

export interface KulMessengerCharacterNode extends KulDataNode {
    children: [
        KulMessengerAvatarNode,
        KulMessengerBiographyNode,
        KulMessengerChatNode,
        KulMessengerLocationNode,
        KulMessengerOutfitNode,
        KulMessengerStyleNode,
    ];
    id: `character_${string}`;
    value: string;
}

export interface KulMessengerChatNode extends KulDataNode {
    id: 'chat';
}

export interface KulMessengerDataset extends KulDataDataset {
    nodes: KulMessengerCharacterNode[];
}

export type KulMessengerEvent = 'ready';

export type KulMessengerImages = 'avatar' | 'location' | 'outfit' | 'style';

export interface KulMessengerLocationNode extends KulDataNode {
    id: 'location';
}

export interface KulMessengerOutfitNode extends KulDataNode {
    id: 'outfit';
}

export interface KulMessengerNavigation extends KulDataNode {
    children: [
        KulMessengerNavigationPreviousTab,
        KulMessengerCharacterNode,
        KulMessengerNavigationNextTab,
    ];
    id: 'navigation';
}

export interface KulMessengerNavigationCharacterTab extends KulDataNode {
    icon: 'account';
    id: 'char_name';
    value: string;
}

export interface KulMessengerNavigationNextTab extends KulDataNode {
    icon: 'chevron_right';
    id: 'next';
    value: 'Next';
}

export interface KulMessengerNavigationPreviousTab extends KulDataNode {
    icon: 'chevron_left';
    id: 'previous';
    value: 'Previous';
}

export enum KulMessengerProps {
    kulData = 'The actual data of the component.',
    kulStyle = 'Custom style of the component.',
}

export interface KulMessengerPropsInterface {
    kulData: KulMessengerDataset;
    kulStyle?: string;
}

export interface KulMessengerStyleNode extends KulDataNode {
    id: 'style';
}
