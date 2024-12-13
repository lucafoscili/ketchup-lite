import { VNode } from "@stencil/core";

import { KulCard } from "src/components/kul-card/kul-card";
import {
  KulDataDataset,
  KulDataShapeDefaults,
  KulDataShapesMap,
} from "src/managers/kul-data/kul-data-declarations";
import {
  KulComponentAdapter,
  KulComponentAdapterJsx,
  KulComponentAdapterStateGetters,
  KulEventPayload,
} from "src/types/GenericTypes";

//#region Adapter
export interface KulCardAdapter extends KulComponentAdapter<KulCard> {
  elements: {
    jsx: KulCardAdapterElementsJsx;
    refs: null;
  };
  state: {
    get: KulCardAdapterStateGetters;
  };
}
export interface KulCardAdapterElementsJsx extends KulComponentAdapterJsx {
  layouts: { [K in KulCardLayout]: () => VNode };
}
export type KulCardAdapterDefaults = {
  [K in KulCardLayout]: KulDataShapeDefaults;
};
export interface KulCardAdapterStateGetters
  extends KulComponentAdapterStateGetters<KulCard> {
  compInstance: KulCard;
  defaults: KulCardAdapterDefaults;
  shapes: () => KulDataShapesMap;
}
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
