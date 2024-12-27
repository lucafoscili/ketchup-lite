import { VNode } from "@stencil/core";
import {
  KulDataCell,
  KulDataDataset,
  KulDataShapes,
  KulDataShapesMap,
} from "src/managers/kul-data/kul-data-declarations";
import type { KulManager } from "src/managers/kul-manager/kul-manager";
import {
  KulComponentAdapter,
  KulComponentAdapterGetters,
  KulComponentAdapterHandlers,
  KulComponentAdapterJsx,
  KulComponentAdapterRefs,
  KulEventPayload,
} from "src/types/GenericTypes";
import { KulButtonEventPayload } from "../kul-button/kul-button-declarations";
import { KulMasonry } from "./kul-masonry";

//#region Adapter
export interface KulMasonryAdapter extends KulComponentAdapter<KulMasonry> {
  controller: {
    get: KulMasonryAdapterGetters;
  };
  elements: {
    jsx: KulMasonryAdapterJsx;
    refs: KulMasonryAdapterRefs;
  };
  handlers: KulMasonryAdapterHandlers;
}
export interface KulMasonryAdapterJsx extends KulComponentAdapterJsx {
  addColumn: () => VNode;
  removeColumn: () => VNode;
  changeView: () => VNode;
}
export interface KulMasonryAdapterRefs extends KulComponentAdapterRefs {
  addColumn: HTMLKulButtonElement;
  removeColumn: HTMLKulButtonElement;
  changeView: HTMLKulButtonElement;
}
export interface KulMasonryAdapterHandlers extends KulComponentAdapterHandlers {
  button: (e: CustomEvent<KulButtonEventPayload>) => void;
}
export type KulMasonryAdapterInitializerGetters = Pick<
  KulMasonryAdapterGetters,
  "compInstance" | "isMasonry" | "isVertical" | "manager" | "shapes"
>;
export interface KulMasonryAdapterGetters
  extends KulComponentAdapterGetters<KulMasonry> {
  compInstance: KulMasonry;
  isMasonry: () => boolean;
  isVertical: () => boolean;
  manager: KulManager;
  shapes: () => KulDataShapesMap;
}
//#endregion

//#region Events
export type KulMasonryEvent = "kul-event" | "ready" | "unmount";
export interface KulMasonryEventPayload
  extends KulEventPayload<"KulMasonry", KulMasonryEvent> {
  selectedShape: KulMasonrySelectedShape;
}
//#endregion

//#region States
export type KulMasonrySelectedShape = {
  index?: number;
  shape?: Partial<KulDataCell<KulDataShapes>>;
};
//#endregion

//#region Props
export interface KulMasonryPropsInterface {
  kulColumns?: number;
  kulData?: KulDataDataset;
  kulSelectable?: boolean;
  kulShape?: KulDataShapes;
  kulStyle?: string;
  kulView?: KulMasonryView;
}
export type KulMasonryView = "horizontal" | "masonry" | "vertical";
//#endregion
