import {
  KulDataDataset,
  KulDataShapes,
} from "src/managers/kul-data/kul-data-declarations";
import { KulEventPayload } from "src/types/GenericTypes";

//#region Events
export type KulCompareEvent = "kul-event" | "ready" | "unmount";
export interface KulCompareEventPayload
  extends KulEventPayload<"KulCompare", KulCompareEvent> {}
//#endregion

//#region Props
export interface KulComparePropsInterface {
  kulData?: KulDataDataset;
  kulShape?: KulDataShapes;
  kulStyle?: string;
  kulView?: KulCompareView;
}
export type KulCompareView = "overlay" | "split";
//#endregion
