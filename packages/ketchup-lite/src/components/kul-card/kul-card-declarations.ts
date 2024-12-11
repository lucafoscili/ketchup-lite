import { VNode } from "@stencil/core";
import { KulManager } from "src/managers/kul-manager/kul-manager";
import {
  KulDataDataset,
  KulDataShapeDefaults,
  KulDataShapesMap,
} from "../../managers/kul-data/kul-data-declarations";
import { KulComponentAdapter, KulEventPayload } from "../../types/GenericTypes";
import { KulCard } from "./kul-card";

//#region Adapter
export interface KulCardAdapter extends KulComponentAdapter<KulCard> {
  hooks: {
    get: {
      comp: KulCard;
      defaults: KulCardAdapterDefaults;
      layout: KulCardAdapterLayoutHub;
      manager: KulManager;
      shapes: () => KulDataShapesMap;
    };
  };
}
export type KulCardAdapterDefaults = {
  [L in KulCardLayout]: KulDataShapeDefaults;
};
export type KulCardAdapterLayoutHub = {
  [K in KulCardLayout]: VNode;
};
//#endregion

//#region Events
export type KulCardEvent =
  | "click"
  | "contextmenu"
  | "kul-event"
  | "pointerdown"
  | "ready"
  | "unmount";
export interface KulCardEventPayload
  extends KulEventPayload<"KulCard", KulCardEvent> {}
//#endregion

//#region Internal usage
export enum KulCardCSSClasses {
  HAS_ACTIONS = "has-actions",
  HAS_CONTENT = "has-content",
}
export enum KulCardShapesIds {
  CLEAR = "clear",
  THEME = "theme",
}
//#endregion

//#region Props
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
//#endregion
