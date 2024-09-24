import type { KulEventPayload } from '../../types/GenericTypes';
import {
    KulDataDataset,
    KulDataNode,
} from '../../managers/kul-data/kul-data-declarations';
import {
    KulChatPropsInterface,
    KulChatStatus,
} from '../kul-chat/kul-chat-declarations';

export interface KulMessengerAdapter {
    components: KulMessengerComponents;
    get: {
        character: {
            biography: (character?: KulMessengerCharacterNode) => string;
            byId: (id: string) => KulMessengerCharacterNode;
            chat: (
                character?: KulMessengerCharacterNode
            ) => KulChatPropsInterface;
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
            ) => {
                node?: KulMessengerImageChildNode;
                title?: string;
                value: string;
            };
            byType: <T extends KulMessengerImageRootNodesIds>(
                type: T,
                character?: KulMessengerCharacterNode
            ) => KulMessengerImageNodeTypeMap[T]['children'][number][];
            coverIndex: (
                type: KulMessengerImageRootNodesIds,
                character?: KulMessengerCharacterNode
            ) => number;
            root: <T extends KulMessengerImageRootNodesIds>(
                type: T,
                character?: KulMessengerCharacterNode
            ) => KulMessengerImageNodeTypeMap[T];
            title: (node: KulMessengerImageChildNode) => string;
        };
        messenger: {
            config: () => KulMessengerConfig;
            data: () => KulMessengerDataset;
            history: () => KulMessengerHistory;
            status: {
                connection: () => KulChatStatus;
                save: {
                    inProgress: () => boolean;
                };
            };
            ui: () => KulMessengerUI;
        };
    };
    set: {
        character: {
            chat: (
                chat: KulChatPropsInterface,
                character?: KulMessengerCharacterNode
            ) => void;
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
        };
        messenger: {
            data: () => void;
            status: {
                connection: (status: KulChatStatus) => void;
                save: {
                    inProgress: (value: boolean) => void;
                };
            };
            ui: {
                customization: (value: boolean) => void;
                editing: (
                    value: boolean,
                    type: KulMessengerImageRootNodesIds
                ) => void;
                filters: (filter: KulMessengerFilters) => void;
                options: (
                    value: boolean,
                    type: KulMessengerOptionRootNodesIds
                ) => void;
                panel: (
                    panel: KulMessengerPanelsValue,
                    value?: boolean
                ) => boolean;
            };
        };
    };
}

export interface KulMessengerBaseNode<T extends KulDataNode>
    extends KulDataNode {
    id: string;
    value: unknown;
    children?: T[];
}

export interface KulMessengerAvatarNode
    extends KulMessengerBaseNode<KulMessengerAvatarNode> {
    id: `avatar_${string}`;
    value: string;
}

export interface KulMessengerAvatarsNode
    extends KulMessengerBaseNode<KulMessengerAvatarNode> {
    id: 'avatars';
    value: number;
}

export interface KulMessengerBiographyNode extends KulMessengerBaseNode<never> {
    id: 'biography';
    value: string;
}

export interface KulMessengerCharacterNode
    extends KulMessengerBaseNode<KulDataNode> {
    children: [
        KulMessengerAvatarsNode,
        KulMessengerBiographyNode,
        KulMessengerChatNode,
        KulMessengerLocationsNode,
        KulMessengerOutfitsNode,
        KulMessengerStylesNode,
        KulMessengerTimeframesNode,
    ];
    id: `character_${string}`;
    value: string;
}

export interface KulMessengerChat {
    [index: `character_${string}`]: KulChatPropsInterface;
}

export interface KulMessengerChatNode extends KulMessengerBaseNode<never> {
    id: 'chat';
    value: string;
}

export interface KulMessengerComponents {
    editing: {
        [K in KulMessengerImageRootNodesIds]: KulMessengerImageEditComponents;
    };
    saveButton: HTMLKulButtonElement;
}

export interface KulMessengerCovers {
    [index: `character_${string}`]: {
        [K in KulMessengerImageRootNodesIds]: number;
    };
}

export interface KulMessengerDataset extends KulDataDataset {
    nodes?: KulMessengerCharacterNode[];
}

export type KulMessengerEvent = 'ready' | 'save';

export interface KulMessengerEventPayload extends KulEventPayload {
    config: KulMessengerConfig;
}

export interface KulMessengerFilters extends KulMessengerOptions {
    avatars: boolean;
}

export interface KulMessengerHistory {
    [index: `character_${string}`]: string;
}

export type KulMessengerImageChildNode =
    | KulMessengerAvatarNode
    | KulMessengerLocationNode
    | KulMessengerOutfitNode
    | KulMessengerStyleNode
    | KulMessengerTimeframeNode;

export type KulMessengerImageChildrenNodes = KulMessengerImageChildNode[];

export interface KulMessengerImageEditComponents {
    descriptionTextarea: HTMLKulTextfieldElement;
    titleTextarea: HTMLKulTextfieldElement;
    imageUrlTextarea: HTMLKulTextfieldElement;
}

export type KulMessengerImageRootNodes =
    | KulMessengerAvatarsNode
    | KulMessengerLocationsNode
    | KulMessengerOutfitsNode
    | KulMessengerStylesNode
    | KulMessengerTimeframesNode;

export type KulMessengerImageNodeTypeMap = {
    avatars: KulMessengerAvatarsNode;
    locations: KulMessengerLocationsNode;
    outfits: KulMessengerOutfitsNode;
    styles: KulMessengerStylesNode;
    timeframes: KulMessengerTimeframesNode;
};

export type KulMessengerImageNodesPrefixes =
    `${'avatar' | 'location' | 'outfit' | 'style' | 'timeframe'}_`;

export type KulMessengerImageNodesIds =
    `${'avatar' | 'location' | 'outfit' | 'style' | 'timeframe'}_${string}`;

export type KulMessengerImageRootNodesIds = keyof KulMessengerImageNodeTypeMap;

export interface KulMessengerConfig {
    currentCharacter: string;
    ui: KulMessengerUI;
}

export interface KulMessengerLocationNode extends KulMessengerBaseNode<never> {
    id: `location_${string}`;
    value: string;
}

export interface KulMessengerLocationsNode
    extends KulMessengerBaseNode<KulMessengerLocationNode> {
    id: 'locations';
    value: number;
}

export type KulMessengerOptionNodeTypeMap = {
    locations: KulMessengerLocationsNode;
    outfits: KulMessengerOutfitsNode;
    styles: KulMessengerStylesNode;
    timeframes: KulMessengerTimeframesNode;
};

export interface KulMessengerOptions {
    locations: boolean;
    outfits: boolean;
    styles: boolean;
    timeframes: boolean;
}

export type KulMessengerOptionRootNodesIds =
    keyof KulMessengerOptionNodeTypeMap;

export interface KulMessengerOutfitNode extends KulMessengerBaseNode<never> {
    id: `outfit_${string}`;
    value: string;
}

export interface KulMessengerOutfitsNode
    extends KulMessengerBaseNode<KulMessengerOutfitNode> {
    id: 'outfits';
    value: number;
}

export interface KulMessengerPanels {
    isLeftCollapsed: boolean;
    isRightCollapsed: boolean;
}

export type KulMessengerPanelsValue = 'left' | 'right';

export enum KulMessengerProps {
    kulAutosave = 'Automatically saves the dataset when a chat updates.',
    kulData = 'The actual data of the component.',
    kulStyle = 'Custom style of the component.',
    kulValue = 'Sets the initial configuration, including active character and filters.',
}

export interface KulMessengerPropsInterface {
    kulAutosave?: boolean;
    kulData?: KulMessengerDataset;
    kulStyle?: string;
    kulValue?: KulMessengerConfig;
}

export interface KulMessengerStyleNode extends KulMessengerBaseNode<never> {
    id: `style_${string}`;
    value: string;
}

export interface KulMessengerStylesNode
    extends KulMessengerBaseNode<KulMessengerStyleNode> {
    id: 'styles';
    value: number;
}

export interface KulMessengerTimeframeNode extends KulMessengerBaseNode<never> {
    id: `timeframe_${string}`;
    value: string;
}

export interface KulMessengerTimeframesNode
    extends KulMessengerBaseNode<KulMessengerTimeframeNode> {
    id: 'timeframes';
    value: number;
}

export interface KulMessengerUI {
    customization: boolean;
    editing: KulMessengerFilters;
    filters: KulMessengerFilters;
    options: KulMessengerOptions;
    panels: KulMessengerPanels;
}
