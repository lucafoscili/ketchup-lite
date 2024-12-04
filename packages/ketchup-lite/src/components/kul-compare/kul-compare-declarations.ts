import {
  KulDataDataset,
  KulDataShapes,
} from "../../managers/kul-data/kul-data-declarations";
import { KulEventPayload } from "../../types/GenericTypes";

/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
export type KulCompareEvent = "kul-event" | "ready" | "unmount";
export interface KulCompareEventPayload
  extends KulEventPayload<"KulCompare", KulCompareEvent> {}
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
export enum KulCompareProps {
  kulData = "Actual data to compare.",
  kulShape = "Sets the type of shapes to compare.",
  kulStyle = "Sets a custom CSS style for the component.",
  kulView = "Sets the type of view, either styled as a before-after or a side-by-side comparison.",
}
export interface KulComparePropsInterface {
  kulData?: KulDataDataset;
  kulShape?: KulDataShapes;
  kulStyle?: string;
  kulView?: KulCompareView;
}
export type KulCompareView = "overlay" | "split";
