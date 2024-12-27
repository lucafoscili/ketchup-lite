import {
  KulCanvasPropsInterface,
  KulPhotoframePropsInterface,
  KulTypewriterPropsInterface,
} from "src/components";
import { KulBadgePropsInterface } from "src/components/kul-badge/kul-badge-declarations";
import { KulButtonPropsInterface } from "src/components/kul-button/kul-button-declarations";
import { KulCardPropsInterface } from "src/components/kul-card/kul-card-declarations";
import { KulChartPropsInterface } from "src/components/kul-chart/kul-chart-declarations";
import {
  KulChatHistory,
  KulChatPropsInterface,
} from "src/components/kul-chat/kul-chat-declarations";
import { KulChipPropsInterface } from "src/components/kul-chip/kul-chip-declarations";
import { KulCodePropsInterface } from "src/components/kul-code/kul-code-declarations";
import { KulImagePropsInterface } from "src/components/kul-image/kul-image-declarations";
import { KulTogglePropsInterface } from "src/components/kul-toggle/kul-toggle-declarations";
import { KulUploadPropsInterface } from "src/components/kul-upload/kul-upload-declarations";
import {
  GenericMap,
  KulComponent,
  KulComponentName,
  KulEventPayload,
  KulEventType,
} from "src/types/GenericTypes";

export interface KulDataBaseCell {
  value: string;
  shape?: KulDataShapes;
  htmlProps?: Partial<HTMLElement>;
}
export type KulDataCell<T extends KulDataShapes> = T extends "badge"
  ? Partial<KulBadgePropsInterface> & {
      shape: "badge";
      value: string;
      htmlProps?: Partial<HTMLKulBadgeElement>;
    }
  : T extends "button"
    ? Partial<KulButtonPropsInterface> & {
        shape: "button";
        value: string;
        htmlProps?: Partial<HTMLKulButtonElement>;
      }
    : T extends "canvas"
      ? Partial<KulCanvasPropsInterface> & {
          shape: "canvas";
          value: string;
          htmlProps?: Partial<HTMLKulCanvasElement>;
        }
      : T extends "card"
        ? Partial<KulCardPropsInterface> & {
            shape: "card";
            value: string;
            htmlProps?: Partial<HTMLKulCardElement>;
          }
        : T extends "chart"
          ? Partial<KulChartPropsInterface> & {
              shape: "chart";
              value: string;
              htmlProps?: Partial<HTMLKulChartElement>;
            }
          : T extends "chat"
            ? Partial<KulChatPropsInterface> & {
                shape: "chat";
                value: KulChatHistory;
                htmlProps?: Partial<HTMLKulChatElement>;
              }
            : T extends "chip"
              ? Partial<KulChipPropsInterface> & {
                  shape: "chip";
                  value: string;
                  htmlProps?: Partial<HTMLKulChipElement>;
                }
              : T extends "code"
                ? Partial<KulCodePropsInterface> & {
                    shape: "code";
                    value: string;
                    htmlProps?: Partial<HTMLKulCodeElement>;
                  }
                : T extends "image"
                  ? Partial<KulImagePropsInterface> & {
                      shape: "image";
                      value: string;
                      htmlProps?: Partial<HTMLKulImageElement>;
                    }
                  : T extends "number"
                    ? {
                        shape: "number";
                        value: number;
                      }
                    : T extends "photoframe"
                      ? Partial<KulPhotoframePropsInterface> & {
                          shape: "photoframe";
                          value: string;
                          htmlProps?: Partial<HTMLKulPhotoframeElement>;
                        }
                      : T extends "slot"
                        ? {
                            shape: "slot";
                            value: string;
                          }
                        : T extends "toggle"
                          ? Partial<KulTogglePropsInterface> & {
                              shape: "toggle";
                              value: boolean;
                              htmlProps?: Partial<HTMLKulToggleElement>;
                            }
                          : T extends "upload"
                            ? Partial<KulUploadPropsInterface> & {
                                shape: "upload";
                                value: string;
                                htmlProps?: Partial<HTMLKulUploadElement>;
                              }
                            : T extends "typewriter"
                              ? Partial<KulTypewriterPropsInterface> & {
                                  shape: "typewriter";
                                  value: string;
                                  htmlProps?: Partial<HTMLKulTypewriterElement>;
                                }
                              : T extends "text"
                                ? {
                                    shape?: "text";
                                    value: string;
                                  }
                                : KulDataBaseCell;
export type KulCellNameToShape = {
  kulBadge: "badge";
  kulButton: "button";
  kulCanvas: "canvas";
  kulCard: "card";
  kulChart: "chart";
  kulChat: "chat";
  kulChip: "chip";
  kulCode: "code";
  kulImage: "image";
  kulNumber: "number";
  kulPhotoframe: "photoframe";
  kulSlot: "slot";
  kulText: "text";
  kulToggle: "toggle";
  kulTypewriter: "typewriter";
  kulUpload: "upload";
};
export type KulDataCellFromName<T extends keyof KulCellNameToShape> =
  KulDataCell<KulCellNameToShape[T]>;
export interface KulDataCellContainer {
  kulBadge?: KulDataCellFromName<"kulBadge">;
  kulButton?: KulDataCellFromName<"kulButton">;
  kulCanvas?: KulDataCellFromName<"kulCanvas">;
  kulCard?: KulDataCellFromName<"kulCard">;
  kulChart?: KulDataCellFromName<"kulChart">;
  kulChat?: KulDataCellFromName<"kulChat">;
  kulChip?: KulDataCellFromName<"kulChip">;
  kulCode?: KulDataCellFromName<"kulCode">;
  kulImage?: KulDataCellFromName<"kulImage">;
  kulNumber?: KulDataCellFromName<"kulNumber">;
  kulPhotoframe?: KulDataCellFromName<"kulPhotoframe">;
  kulSlot?: KulDataCellFromName<"kulSlot">;
  kulText?: KulDataCellFromName<"kulText">;
  kulToggle?: KulDataCellFromName<"kulToggle">;
  kulUpload?: KulDataCellFromName<"kulUpload">;
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
  value?: string | number;
}
export type KulDataShapes =
  | "badge"
  | "button"
  | "canvas"
  | "card"
  | "chart"
  | "chat"
  | "chip"
  | "code"
  | "image"
  | "number"
  | "photoframe"
  | "slot"
  | "toggle"
  | "text"
  | "typewriter"
  | "upload";
export type KulDataShapesMap = {
  [K in KulDataShapes]?: Partial<KulDataCell<K>>[];
};
export type KulDataShapeComponentMap = {
  [K in KulDataShapes]: KulComponentName;
};
export interface KulDataNodeOperations {
  exists: (dataset: KulDataDataset) => boolean;
  filter: (
    dataset: KulDataDataset,
    filters: Partial<KulDataNode>,
    partialMatch: boolean,
  ) => {
    matchingNodes: Set<KulDataNode>;
    remainingNodes: Set<KulDataNode>;
    ancestorNodes: Set<KulDataNode>;
  };
  findNodeByCell: (
    dataset: KulDataDataset,
    cell: KulDataGenericCell,
  ) => KulDataNode;
  fixIds: (nodes: KulDataNode[]) => KulDataNode[];
  getDrilldownInfo: (nodes: KulDataNode[]) => KulDataNodeDrilldownInfo;
  getParent: (nodes: KulDataNode[], child: KulDataNode) => KulDataNode;
  pop: (nodes: KulDataNode[], node2remove: KulDataNode) => KulDataNode;
  removeNodeByCell: (
    dataset: KulDataDataset,
    cell: KulDataGenericCell,
  ) => KulDataNode;
  setProperties: (
    nodes: KulDataNode[],
    properties: Partial<KulDataNode>,
    recursively?: boolean,
    exclude?: KulDataNode[],
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
export type KulDataShapeCallback<
  C extends KulComponentName,
  S extends KulDataShapes | "text",
> = S extends "text"
  ? never
  : (e: CustomEvent<KulEventPayload<C, KulEventType<KulComponent<C>>>>) => void;
export type KulDataShapeDefaults = Partial<{
  [S in KulDataShapes]: () => Partial<KulDataCell<S>>[];
}>;
export type KulDataShapeEventDispatcher = <T extends KulComponentName>(
  e: CustomEvent<KulEventPayload<T, KulEventType<KulComponent<T>>>>,
) => Promise<void>;
export type KulDataGenericCell = Partial<KulDataCell<KulDataShapes>>;
