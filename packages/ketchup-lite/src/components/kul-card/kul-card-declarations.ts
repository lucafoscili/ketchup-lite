import { KulCard } from "./kul-card";
import {
  KulDataDataset,
  KulDataShapeEventDispatcher,
  KulDataShapesMap,
} from "../../managers/kul-data/kul-data-declarations";
import { KulEventPayload } from "../../types/GenericTypes";

/*-------------------------------------------------*/
/*                  A d a p t e r                  */
/*-------------------------------------------------*/
export interface KulCardAdapter {
  actions: {
    dispatchEvent: KulDataShapeEventDispatcher;
  };
  get: {
    card: () => KulCard;
    shapes: () => KulDataShapesMap;
  };
}
/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
export type KulCardEvent =
  | "click"
  | "contextmenu"
  | "kul-event"
  | "pointerdown"
  | "ready"
  | "unmount";
export interface KulCardEventPayload
  extends KulEventPayload<"KulCard", KulCardEvent> {}
/*-------------------------------------------------*/
/*                 I n t e r n a l                 */
/*-------------------------------------------------*/
export enum KulCardCSSClasses {
  HAS_ACTIONS = "has-actions",
  HAS_CONTENT = "has-content",
}

export enum KulCardShapesIds {
  CLEAR = "clear",
  THEME = "theme",
}
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
export enum KulCardProps {
  kulData = "The actual data of the card.",
  kulLayout = "Sets the layout.",
  kulSizeX = "The width of the card, defaults to 100%. Accepts any valid CSS format (px, %, vw, etc.).",
  kulSizeY = "The height of the card, defaults to 100%. Accepts any valid CSS format (px, %, vh, etc.).",
  kulStyle = "Custom style of the component.",
}
export interface KulCardPropsInterface {
  kulData?: KulDataDataset;
  kulLayout?: KulCardLayout;
  kulSizeX?: string;
  kulSizeY?: string;
  kulStyle?: string;
}
export type KulCardLayout = "debug" | "keywords" | "material" | "upload";
