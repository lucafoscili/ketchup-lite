import { HTMLStencilElement } from '@stencil/core/internal';
import { KulBadgePropsInterface } from '../../components/kul-badge/kul-badge-declarations';
import { KulButtonPropsInterface } from '../../components/kul-button/kul-button-declarations';
import {
    KulChatHistory,
    KulChatPropsInterface,
} from '../../components/kul-chat/kul-chat-declarations';
import { KulCodePropsInterface } from '../../components/kul-code/kul-code-declarations';
import { KulImagePropsInterface } from '../../components/kul-image/kul-image-declarations';
import { KulSwitchPropsInterface } from '../../components/kul-switch/kul-switch-declarations';
import { GenericMap } from '../../types/GenericTypes';

export interface KulDataBaseCell {
    value: string;
    shape?: KulDataShapes;
    htmlProps?: Partial<HTMLStencilElement>;
}
export type KulDataCell<T extends KulDataShapes> = T extends 'badge'
    ? KulBadgePropsInterface & KulDataBaseCell & { value: string }
    : T extends 'button'
      ? KulButtonPropsInterface & KulDataBaseCell & { value: string }
      : T extends 'chat'
        ? KulChatPropsInterface & KulDataBaseCell & { value: KulChatHistory }
        : T extends 'code'
          ? KulCodePropsInterface & KulDataBaseCell & { value: string }
          : T extends 'image'
            ? KulImagePropsInterface & KulDataBaseCell & { value: string }
            : T extends 'switch'
              ? KulSwitchPropsInterface & KulDataBaseCell & { value: boolean }
              : T extends 'number'
                ? KulDataBaseCell & { value: number }
                : T extends 'text'
                  ? KulDataBaseCell & { value: string }
                  : KulDataBaseCell;
export interface KulDataCellContainer {
    [index: string]: KulDataCell<KulDataShapes>;
}
export interface KulDataColumn {
    id: KulDataShapes | string;
    title: string;
}
export interface KulDataComponentBaseProps {
    kulStyle?: string;
}
export interface KulDataDataset {
    columns?: KulDataColumn[];
    nodes?: KulDataNode[];
}
export type KulDataDynamicComponentProps = {
    [K in `kul${Capitalize<string>}`]?: any;
};
export interface KulDataNode {
    id: string;
    cells?: KulDataCellContainer;
    children?: KulDataNode[];
    cssStyle?: GenericMap;
    description?: string;
    icon?: string;
    value?: unknown;
}
export type KulDataShapes =
    | 'badge'
    | 'button'
    | 'chat'
    | 'code'
    | 'image'
    | 'number'
    | 'switch'
    | 'text';
export type KulDataShapesMap = {
    [K in KulDataShapes]?: Partial<KulDataCell<K>>[];
};
export interface KulDataNodeOperations {
    exists: (dataset: KulDataDataset) => boolean;
    filter: (
        dataset: KulDataDataset,
        filters: Partial<KulDataNode>,
        partialMatch: boolean
    ) => {
        matchingNodes: Set<KulDataNode>;
        remainingNodes: Set<KulDataNode>;
        ancestorNodes: Set<KulDataNode>;
    };
    fixIds: (nodes: KulDataNode[]) => KulDataNode[];
    getDrilldownInfo: (nodes: KulDataNode[]) => KulDataNodeDrilldownInfo;
    getParent: (nodes: KulDataNode[], child: KulDataNode) => KulDataNode;
    pop: (nodes: KulDataNode[], node2remove: KulDataNode) => KulDataNode;
    setProperties: (
        nodes: KulDataNode[],
        properties: Partial<KulDataNode>,
        recursively?: boolean,
        exclude?: KulDataNode[]
    ) => KulDataNode[];
    toStream: (nodes: KulDataNode[]) => KulDataNode[];
}
export interface KulDataNodeDrilldownInfo {
    maxChildren?: number;
    maxDepth?: number;
}
export interface KulDataFindCellFilters {
    columns?: string[];
    range?: KulDataFilterRange;
    value?: string;
}
export interface KulDataFilterRange {
    min?: number | string;
    max?: number | string;
}
