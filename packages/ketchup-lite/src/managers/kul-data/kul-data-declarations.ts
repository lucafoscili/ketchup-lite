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
    ? Partial<KulBadgePropsInterface> & {
          shape: 'badge';
          value: string;
          htmlProps?: Partial<HTMLKulBadgeElement>;
      }
    : T extends 'button'
      ? Partial<KulButtonPropsInterface> & {
            shape: 'button';
            value: string;
            htmlProps?: Partial<HTMLKulButtonElement>;
        }
      : T extends 'chat'
        ? Partial<KulChatPropsInterface> & {
              shape: 'chat';
              value: KulChatHistory;
              htmlProps?: Partial<HTMLKulChatElement>;
          }
        : T extends 'code'
          ? Partial<KulCodePropsInterface> & {
                shape: 'code';
                value: string;
                htmlProps?: Partial<HTMLKulCodeElement>;
            }
          : T extends 'image'
            ? Partial<KulImagePropsInterface> & {
                  shape: 'image';
                  value: string;
                  htmlProps?: Partial<HTMLKulImageElement>;
              }
            : T extends 'switch'
              ? Partial<KulSwitchPropsInterface> & {
                    shape: 'switch';
                    value: boolean;
                    htmlProps?: Partial<HTMLKulSwitchElement>;
                }
              : T extends 'number'
                ? {
                      shape: 'number';
                      value: number;
                  }
                : T extends 'text'
                  ? {
                        shape?: 'text';
                        value: string;
                    }
                  : KulDataBaseCell;
export type KulCellNameToShape = {
    kulBadge: 'badge';
    kulButton: 'button';
    kulChat: 'chat';
    kulCode: 'code';
    kulImage: 'image';
    kulSwitch: 'switch';
    kulNumber: 'number';
    kulText: 'text';
};
export type KulDataCellFromName<T extends keyof KulCellNameToShape> =
    KulDataCell<KulCellNameToShape[T]>;
export interface KulDataCellContainer {
    kulBadge?: KulDataCellFromName<'kulBadge'>;
    kulButton?: KulDataCellFromName<'kulButton'>;
    kulChat?: KulDataCellFromName<'kulChat'>;
    kulCode?: KulDataCellFromName<'kulCode'>;
    kulImage?: KulDataCellFromName<'kulImage'>;
    kulSwitch?: KulDataCellFromName<'kulSwitch'>;
    kulNumber?: KulDataCellFromName<'kulNumber'>;
    kulText?: KulDataCellFromName<'kulText'>;
}
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
