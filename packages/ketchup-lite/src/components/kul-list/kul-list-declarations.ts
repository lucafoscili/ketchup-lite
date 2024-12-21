import {
  KulDataDataset,
  KulDataNode,
} from "src/managers/kul-data/kul-data-declarations";
import { KulEventPayload } from "src/types/GenericTypes";

//#region Events
export type KulListEvent =
  | "blur"
  | "click"
  | "delete"
  | "focus"
  | "pointerdown"
  | "ready"
  | "unmount";
export interface KulListEventPayload
  extends KulEventPayload<"KulList", KulListEvent> {
  node: KulDataNode;
}
//#endregion

//#region Props
export interface KulListPropsInterface {
  kulData?: KulDataDataset;
  kulEmpty?: string;
  kulEnableDeletions?: boolean;
  kulNavigation?: boolean;
  kulRipple?: boolean;
  kulSelectable?: boolean;
  kulStyle?: string;
}
//#endregion
