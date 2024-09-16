import {
    KulDataDataset,
    KulDataNode,
} from '../../managers/kul-data/kul-data-declarations';
export interface KulMessengerAdapter {
    get: {
        character: {
            biography: (character?: KulMessengerCharacterNode) => string;
            byId: (id: string) => KulMessengerCharacterNode;
            current: () => KulMessengerCharacterNode;
            history: (character?: KulMessengerCharacterNode) => string;
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
            byType: <T extends KulMessengerImageRootNodesIds>(
                type: T,
                character?: KulMessengerCharacterNode
            ) => KulMessengerImageNodeTypeMap[T]['children'][number][];
            coverIndex: (
                type: KulMessengerImageRootNodesIds,
                character?: KulMessengerCharacterNode
            ) => number;
            filters: () => KulMessengerFilters;
            root: <T extends KulMessengerImageRootNodesIds>(
                type: T,
                character?: KulMessengerCharacterNode
            ) => KulMessengerImageNodeTypeMap[T];
        };
    };
    set: {
        character: {
            current: (character?: KulMessengerCharacterNode) => void;
            history: (
                history: string,
                character?: KulMessengerCharacterNode
            ) => void;
            next: (character?: KulMessengerCharacterNode) => void;
            previous: (character?: KulMessengerCharacterNode) => void;
        };
        image: {
            cover: (
                type: KulMessengerImageRootNodesIds,
                value: number,
                character?: KulMessengerCharacterNode
            ) => void;
            filters: (filter: KulMessengerFilters) => void;
        };
    };
}

// Base Node with optional children array
export interface KulMessengerBaseNode<T extends KulDataNode>
    extends KulDataNode {
    id: string;
    value: unknown;
    children?: T[];
}

// Avatar Node
export interface KulMessengerAvatarNode
    extends KulMessengerBaseNode<KulMessengerAvatarNode> {
    id: `avatar_${string}`;
    value: string;
}

// Avatars Node
export interface KulMessengerAvatarsNode
    extends KulMessengerBaseNode<KulMessengerAvatarNode> {
    id: 'avatars';
    value: number;
}

// Biography Node
export interface KulMessengerBiographyNode extends KulMessengerBaseNode<never> {
    id: 'biography';
    value: string;
}

// Character Node
export interface KulMessengerCharacterNode
    extends KulMessengerBaseNode<KulDataNode> {
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

// Chat Node
export interface KulMessengerChatNode extends KulMessengerBaseNode<never> {
    id: 'chat';
    value: string;
}

// Messenger Covers
export interface KulMessengerCovers {
    [index: `character_${string}`]: {
        [K in KulMessengerImageRootNodesIds]: number;
    };
}

// Dataset Node
export interface KulMessengerDataset extends KulDataDataset {
    nodes?: KulMessengerCharacterNode[];
}

// Messenger Event
export type KulMessengerEvent = 'ready';

export interface KulMessengerFilters {
    avatars?: boolean;
    locations?: boolean;
    outfits?: boolean;
    styles?: boolean;
}

// Messenger History
export interface KulMessengerHistory {
    [index: `character_${string}`]: string;
}

// Image Children Nodes Types
export type KulMessengerImageChildNode =
    | KulMessengerOutfitNode
    | KulMessengerStyleNode
    | KulMessengerAvatarNode
    | KulMessengerLocationNode;

export type KulMessengerImageChildrenNodes = KulMessengerImageChildNode[];

// Image Root Nodes, using a generalized base node
export type KulMessengerImageRootNodes =
    | KulMessengerAvatarsNode
    | KulMessengerLocationsNode
    | KulMessengerOutfitsNode
    | KulMessengerStylesNode;

// Strongly typed mapping of image node types
export type KulMessengerImageNodeTypeMap = {
    avatars: KulMessengerAvatarsNode;
    locations: KulMessengerLocationsNode;
    outfits: KulMessengerOutfitsNode;
    styles: KulMessengerStylesNode;
};

// Image Root Node ID Types
export type KulMessengerImageRootNodesIds = keyof KulMessengerImageNodeTypeMap;

// Initializes the component state
export interface KulMessengerInitialization {
    currentCharacter?: string;
    filters?: KulMessengerFilters;
}

// Location Node
export interface KulMessengerLocationNode extends KulMessengerBaseNode<never> {
    id: `location_${string}`;
}

// Locations Node
export interface KulMessengerLocationsNode
    extends KulMessengerBaseNode<KulMessengerLocationNode> {
    id: 'locations';
    value: number;
}

// Outfit Node
export interface KulMessengerOutfitNode extends KulMessengerBaseNode<never> {
    id: `outfit_${string}`;
    value: string;
}

// Outfits Node
export interface KulMessengerOutfitsNode
    extends KulMessengerBaseNode<KulMessengerOutfitNode> {
    id: 'outfits';
    value: number;
}

// Messenger Props Enum
export enum KulMessengerProps {
    kulData = 'The actual data of the component.',
    kulStyle = 'Custom style of the component.',
}

// Messenger Props Interface
export interface KulMessengerPropsInterface {
    kulData?: KulMessengerDataset;
    kulStyle?: string;
}

// Style Node
export interface KulMessengerStyleNode extends KulMessengerBaseNode<never> {
    id: `style_${string}`;
    value: string;
}

// Styles Node
export interface KulMessengerStylesNode
    extends KulMessengerBaseNode<KulMessengerStyleNode> {
    id: 'styles';
    value: number;
}
