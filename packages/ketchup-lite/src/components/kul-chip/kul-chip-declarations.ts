import {
  KulDataDataset,
  KulDataNode,
} from "src/managers/kul-data/kul-data-declarations";
import { KulEventPayload } from "src/types/GenericTypes";

//#region Events
export type KulChipEvent =
  | "blur"
  | "click"
  | "delete"
  | "focus"
  | "pointerdown"
  | "ready"
  | "unmount";
export interface KulChipEventPayload
  extends KulEventPayload<"KulChip", KulChipEvent> {
  node: KulDataNode;
  selectedNodes: Set<KulDataNode>;
}
//#endregion

//#region Internal usage
export interface KulChipEventArguments {
  expansion?: boolean;
  node?: KulDataNode;
}
//#endregion

//#region Props
export interface KulChipPropsInterface {
  kulData?: KulDataDataset;
  kulRipple?: boolean;
  kulStyle?: string;
  kulStyling?: KulChipStyling;
}
export type KulChipStyling = "choice" | "filter" | "input" | "standard";
//#endregion
