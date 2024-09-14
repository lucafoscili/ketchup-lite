import { KulDataDataset, KulDataNode } from '../../components';
import { KulChatState } from '../kul-chat/kul-chat-declarations';

export interface KulMessengerAdapter {
    get: {
        avatar: (character?: KulMessengerCharacterNode) => string;
        biography: (character?: KulMessengerCharacterNode) => string;
        character: {
            current: () => KulMessengerCharacterNode;
            history: (character?: KulMessengerCharacterNode) => KulChatState[];
            list: () => KulMessengerCharacterNode[];
            next: (
                character?: KulMessengerCharacterNode
            ) => KulMessengerCharacterNode;
            previous: (
                character?: KulMessengerCharacterNode
            ) => KulMessengerCharacterNode;
        };
        comps: () => void;
        image: (type: KulMessengerImages) => string;
        name: (character?: KulMessengerCharacterNode) => string;
    };
    set: {
        character: {
            current: (character?: KulMessengerCharacterNode) => void;
            history: (
                history: KulChatState[],
                character?: KulMessengerCharacterNode
            ) => void;
            next: (character?: KulMessengerCharacterNode) => void;
            previous: (character?: KulMessengerCharacterNode) => void;
        };
        comps: () => void;
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

export interface KulMessengerHistory {
    [index: `character_${string}`]: KulChatState[];
}

export type KulMessengerImages = 'avatar' | 'location' | 'outfit' | 'style';

export interface KulMessengerLocationNode extends KulDataNode {
    id: 'location';
}

export interface KulMessengerOutfitNode extends KulDataNode {
    id: 'outfit';
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
