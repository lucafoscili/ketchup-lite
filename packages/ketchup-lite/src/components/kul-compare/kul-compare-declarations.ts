import { VNode } from "@stencil/core";
import {
  KulDataDataset,
  KulDataGenericCell,
  KulDataShapeDefaults,
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
  KulComponentAdapterSetters,
  KulEventPayload,
} from "src/types/GenericTypes";
import { KulButtonEventPayload } from "../kul-button/kul-button-declarations";
import { KulTreeEventPayload } from "../kul-tree/kul-tree-declarations";
import { KulCompare } from "./kul-compare";

//#region Adapter
export interface KulCompareAdapter extends KulComponentAdapter<KulCompare> {
  controller: {
    get: KulCompareAdapterControllerGetters;
    set: KulCompareAdapterControllerSetters;
  };
  elements: {
    jsx: KulCompareAdapterJsx;
    refs: KulCompareAdapterRefs;
  };
  handlers: KulCompareAdapterHandlers;
}
export type KulCompareAdapterInitializerGetters = Pick<
  KulCompareAdapterControllerGetters,
  "compInstance" | "isOverlay" | "manager" | "shapes"
>;
export type KulCompareAdapterInitializerSetters = Pick<
  KulCompareAdapterControllerSetters,
  | "leftPanelOpened"
  | "leftShape"
  | "rightPanelOpened"
  | "rightShape"
  | "splitView"
>;
export interface KulCompareAdapterControllerGetters
  extends KulComponentAdapterGetters<KulCompare> {
  compInstance: KulCompare;
  defaults: KulCompareAdapterDefaults;
  manager: KulManager;
  isOverlay: () => boolean;
  shapes: () => KulDataShapesMap[KulDataShapes];
}
export interface KulCompareAdapterControllerSetters
  extends KulComponentAdapterSetters {
  leftPanelOpened: (value?: boolean) => void;
  leftShape: (shape: KulDataGenericCell) => void;
  rightPanelOpened: (value?: boolean) => void;
  rightShape: (shape: KulDataGenericCell) => void;
  splitView: (value: boolean) => void;
}
export interface KulCompareAdapterJsx extends KulComponentAdapterJsx {
  changeView: () => VNode;
  leftButton: () => VNode;
  leftTree: () => VNode;
  rightButton: () => VNode;
  rightTree: () => VNode;
}
export interface KulCompareAdapterRefs extends KulComponentAdapterRefs {
  changeView: HTMLKulButtonElement;
  leftButton: HTMLKulButtonElement;
  leftTree: HTMLKulTreeElement;
  rightButton: HTMLKulButtonElement;
  rightTree: HTMLKulTreeElement;
}
export interface KulCompareAdapterHandlers extends KulComponentAdapterHandlers {
  button: (e: CustomEvent<KulButtonEventPayload>) => void;
  tree: (e: CustomEvent<KulTreeEventPayload>) => void;
}
export interface KulCompareAdapterDefaults {
  left: KulDataShapeDefaults;
  right: KulDataShapeDefaults;
}
//#endregion

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
