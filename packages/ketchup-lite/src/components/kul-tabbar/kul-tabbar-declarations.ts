import {
  KulDataDataset,
  KulDataNode,
} from "src/managers/kul-data/kul-data-declarations";
import { KulEventPayload } from "src/types/GenericTypes";

//#region Events
export type KulTabbarEvent = "click" | "pointerdown" | "ready" | "unmount";
export interface KulTabbarEventPayload
  extends KulEventPayload<"KulTabbar", KulTabbarEvent> {
  index?: number;
  node?: KulDataNode;
}
//#endregion

//#region States
export interface KulTabbarState {
  index?: number;
  node?: KulDataNode;
}
//#endregion

//#region Props
export interface KulTabbarPropsInterface {
  kulData?: KulDataDataset;
  kulRipple?: boolean;
  kulStyle?: string;
  kulValue?: number;
}
//#endregion
