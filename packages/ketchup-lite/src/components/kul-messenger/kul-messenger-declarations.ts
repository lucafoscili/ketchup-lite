import { KulDataDataset, KulDataNode } from '../../components';
import { KulChatState } from '../kul-chat/kul-chat-declarations';

export interface KulMessengerAdapter {
    get: {
        character: {
            biography: (character?: KulMessengerCharacterNode) => string;
            current: () => KulMessengerCharacterNode;
            history: (character?: KulMessengerCharacterNode) => KulChatState[];
            list: () => KulMessengerCharacterNode[];
            name: (character?: KulMessengerCharacterNode) => string;
            next: (
                character?: KulMessengerCharacterNode
            ) => KulMessengerCharacterNode;
            previous: (
                character?: KulMessengerCharacterNode
            ) => KulMessengerCharacterNode;
        };
        image: {
            asCover: (
                type: KulMessengerImageRootNodesIds,
                character?: KulMessengerCharacterNode
            ) => string;
            byType: (
                type: KulMessengerImageRootNodesIds,
                character?: KulMessengerCharacterNode
            ) => KulMessengerImageNodes;
            options: () => KulMessengerOptionsState;
        };
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
        image: {
            options: (
                type: KulMessengerImageRootNodesIds,
                value: boolean
            ) => void;
        };
    };
}

export interface KulMessengerAvatarNode extends KulDataNode {
    id: `avatar_${string}`;
    value: string;
}

export interface KulMessengerAvatarsNode extends KulDataNode {
    children?: KulMessengerAvatarNode[];
    id: 'avatars';
    value: number;
}

export interface KulMessengerBiographyNode extends KulDataNode {
    id: 'biography';
    value: string;
}

export interface KulMessengerCharacterNode extends KulDataNode {
    children: [
        KulMessengerAvatarsNode,
        KulMessengerBiographyNode,
        KulMessengerChatNode,
        KulMessengerLocationsNode,
        KulMessengerOutfitsNode,
        KulMessengerStylesNode,
    ];
    id: `character_${string}`;
    value: string;
}

export interface KulMessengerChatNode extends KulDataNode {
    id: 'chat';
    value: string;
}

export interface KulMessengerDataset extends KulDataDataset {
    nodes: KulMessengerCharacterNode[];
}

export type KulMessengerEvent = 'ready';

export interface KulMessengerHistory {
    [index: `character_${string}`]: KulChatState[];
}

export type KulMessengerImageNodes =
    | KulMessengerAvatarsNode
    | KulMessengerLocationsNode
    | KulMessengerOutfitsNode
    | KulMessengerStylesNode;

export type KulMessengerImageChildrenNodes =
    | KulMessengerAvatarsNode[]
    | KulMessengerLocationsNode[]
    | KulMessengerOutfitsNode[]
    | KulMessengerStylesNode[];

export type KulMessengerImageRootNodesIds =
    | 'avatars'
    | 'locations'
    | 'outfits'
    | 'styles';

export interface KulMessengerLocationNode extends KulDataNode {
    id: `location_${string}`;
}

export interface KulMessengerLocationsNode extends KulDataNode {
    children?: KulMessengerLocationNode[];
    id: 'locations';
    value: number;
}

export interface KulMessengerOptionsState {
    avatars: boolean;
    locations: boolean;
    outfits: boolean;
    styles: boolean;
}

export interface KulMessengerOutfitNode extends KulDataNode {
    id: `outfit_${string}`;
    value: string;
}

export interface KulMessengerOutfitsNode extends KulDataNode {
    children?: KulMessengerOutfitNode[];
    id: 'outfits';
    value: number;
}

export enum KulMessengerProps {
    kulData = 'The actual data of the component.',
    kulStyle = 'Custom style of the component.',
    kulValue = 'This method is used to trigger a new render of the component.',
}

export interface KulMessengerPropsInterface {
    kulData?: KulMessengerDataset;
    kulStyle?: string;
    kulValue?: KulMessengerHistory;
}

export interface KulMessengerStyleNode extends KulDataNode {
    id: `style_${string}`;
    value: string;
}

export interface KulMessengerStylesNode extends KulDataNode {
    children?: KulMessengerStyleNode[];
    id: 'styles';
    value: number;
}
