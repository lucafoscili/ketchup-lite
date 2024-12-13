import { VNode } from "@stencil/core";

import { KulCard } from "src/components/kul-card/kul-card";
import {
  KulDataDataset,
  KulDataShapeDefaults,
  KulDataShapesMap,
} from "src/managers/kul-data/kul-data-declarations";
import { KulComponentAdapter, KulEventPayload } from "src/types/GenericTypes";

//#region Adapter
export interface KulCardAdapter extends KulComponentAdapter<KulCard> {
  hooks: {
    get: {
      comp: KulCard;
      defaults: KulCardAdapterDefaults;
      layout: KulCardAdapterLayoutHub;
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
export interface KulCardPropsInterface {
  kulData?: KulDataDataset;
  kulLayout?: KulCardLayout;
  kulSizeX?: string;
  kulSizeY?: string;
  kulStyle?: string;
}
export type KulCardLayout = "debug" | "keywords" | "material" | "upload";
//#endregion
