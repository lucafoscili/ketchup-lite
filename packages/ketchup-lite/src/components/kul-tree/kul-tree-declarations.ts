import { VNode } from "@stencil/core";
import {
  KulDataDataset,
  KulDataNode,
} from "src/managers/kul-data/kul-data-declarations";
import type { KulManager } from "src/managers/kul-manager/kul-manager";
import { KulEventPayload } from "src/types/GenericTypes";

//#region Events
export type KulTreeEvent =
  | "click"
  | "kul-event"
  | "pointerdown"
  | "ready"
  | "unmount";
export interface KulTreeEventPayload
  extends KulEventPayload<"KulTree", KulTreeEvent> {
  node?: KulDataNode;
}
export interface KulTreeEventArguments {
  expansion?: boolean;
  node?: KulDataNode;
}
//#endregion

//#region Internal usage
export interface KulTreeNodeProps {
  accordionLayout: boolean;
  depth: number;
  elements: { ripple: VNode; value: VNode };
  events: {
    onClick: (event: MouseEvent) => void;
    onClickExpand: (event: MouseEvent) => void;
    onPointerDown: (event: MouseEvent) => void;
  };
  expanded: boolean;
  manager: KulManager;
  node: KulDataNode;
  selected: boolean;
}

//#endregion

//#region Props
export interface KulTreePropsInterface {
  kulAccordionLayout?: boolean;
  kulData?: KulDataDataset;
  kulEmpty?: string;
  kulFilter?: boolean;
  kulInitialExpansionDepth?: number;
  kulRipple?: boolean;
  kulSelectable?: boolean;
  kulStyle?: string;
}
//#endregion
