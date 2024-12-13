import { KulMasonry } from "src/components/kul-masonry/kul-masonry";
import {
  KulDataCell,
  KulDataDataset,
  KulDataShapes,
  KulDataShapesMap,
} from "src/managers/kul-data/kul-data-declarations";
import { KulEventPayload } from "src/types/GenericTypes";

//#region Adapter
export interface KulMasonryAdapter {
  handlers: KulMasonryAdapterHandlers;
  hooks: KulMasonryAdapterHooks;
  widgets: KulMasonryAdapterWidgets;
}
export interface KulMasonryAdapterHandlers {
  addColumn: () => Promise<void>;
  removeColumn: () => Promise<void>;
  changeView: () => Promise<void>;
}
export interface KulMasonryAdapterHooks {
  get: {
    isMasonry: () => boolean;
    isVertical: () => boolean;
    masonry: () => KulMasonry;
    shapes: () => KulDataShapesMap;
  };
}
export interface KulMasonryAdapterWidgets {
  buttons: {
    addColumn: HTMLKulButtonElement;
    removeColumn: HTMLKulButtonElement;
    changeView: HTMLKulButtonElement;
  };
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
