import { VNode } from "@stencil/core";

import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import { KulMasonry } from "src/components/kul-masonry/kul-masonry";
import {
  KulDataCell,
  KulDataDataset,
  KulDataShapes,
  KulDataShapesMap,
} from "src/managers/kul-data/kul-data-declarations";
import {
  KulComponentAdapter,
  KulComponentAdapterHandlers,
  KulComponentAdapterJsx,
  KulComponentAdapterRefs,
  KulComponentAdapterStateGetters,
  KulEventPayload,
} from "src/types/GenericTypes";

//#region Adapter
export interface KulMasonryAdapter extends KulComponentAdapter<KulMasonry> {
  elements: {
    jsx: KulMasonryAdapterElementsJsx;
    refs: KulMasonryAdapterElementsRefs;
  };
  handlers: KulMasonryAdapterHandlers;
  state: {
    get: KulMasonryAdapterStateGetters;
  };
}
export interface KulMasonryAdapterElementsJsx extends KulComponentAdapterJsx {
  addColumn: () => VNode;
  removeColumn: () => VNode;
  changeView: () => VNode;
}
export interface KulMasonryAdapterElementsRefs extends KulComponentAdapterRefs {
  addColumn: HTMLKulButtonElement;
  removeColumn: HTMLKulButtonElement;
  changeView: HTMLKulButtonElement;
}
export interface KulMasonryAdapterHandlers extends KulComponentAdapterHandlers {
  button: (e: CustomEvent<KulButtonEventPayload>) => void;
}
export interface KulMasonryAdapterStateGetters
  extends KulComponentAdapterStateGetters<KulMasonry> {
  compInstance: KulMasonry;
  isMasonry: () => boolean;
  isVertical: () => boolean;
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
