import { VNode } from "@stencil/core";
import { KulDataDataset } from "src/managers/kul-data/kul-data-declarations";
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
import { KulCanvasEventPayload } from "../kul-canvas/kul-canvas-declarations";
import {
  KulMasonryEventPayload,
  KulMasonrySelectedShape,
} from "../kul-masonry/kul-masonry-declarations";
import { KulTextfieldEventPayload } from "../kul-textfield/kul-textfield-declarations";
import { KulTreeEventPayload } from "../kul-tree/kul-tree-declarations";
import { KulImageviewer } from "./kul-imageviewer";

//#region Adapter
export interface KulImageviewerAdapter
  extends KulComponentAdapter<KulImageviewer> {
  controller: {
    get: KulImageviewerAdapterControllerGetters;
    set: KulImageviewerAdapterControllerSetters;
  };
  elements: {
    jsx: KulImageviewerAdapterJsx;
    refs: KulImageviewerAdapterRefs;
  };
  handlers: KulImageviewerAdapterHandlers;
}
export interface KulImageviewerAdapterJsx extends KulComponentAdapterJsx {
  details: {
    canvas: () => VNode;
    clearHistory: () => VNode;
    deleteShape: () => VNode;
    redo: () => VNode;
    save: () => VNode;
    spinner: () => VNode;
    tree: () => VNode;
    undo: () => VNode;
  };
  navigation: {
    load: () => VNode;
    masonry: () => VNode;
    textfield: () => VNode;
  };
}
export interface KulImageviewerAdapterRefs extends KulComponentAdapterRefs {
  details: {
    canvas: HTMLKulCanvasElement;
    clearHistory: HTMLKulButtonElement;
    deleteShape: HTMLKulButtonElement;
    redo: HTMLKulButtonElement;
    save: HTMLKulButtonElement;
    spinner: HTMLKulSpinnerElement;
    tree: HTMLKulTreeElement;
    undo: HTMLKulButtonElement;
  };
  navigation: {
    load: HTMLKulButtonElement;
    masonry: HTMLKulMasonryElement;
    textfield: HTMLKulTextfieldElement;
  };
}
export interface KulImageviewerAdapterHandlers
  extends KulComponentAdapterHandlers {
  details: {
    button: (e: CustomEvent<KulButtonEventPayload>) => Promise<void>;
    canvas: (e: CustomEvent<KulCanvasEventPayload>) => void;
    tree: (e: CustomEvent<KulTreeEventPayload>) => void;
  };
  navigation: {
    button: (e: CustomEvent<KulButtonEventPayload>) => Promise<void>;
    masonry: (e: CustomEvent<KulMasonryEventPayload>) => void;
    textfield: (e: CustomEvent<KulTextfieldEventPayload>) => void;
  };
}
export type KulImageviewerAdapterInitializerGetters = Pick<
  KulImageviewerAdapterControllerGetters,
  "compInstance" | "currentShape" | "history" | "manager" | "spinnerStatus"
>;
export type KulImageviewerAdapterInitializerSetters = Pick<
  KulImageviewerAdapterControllerSetters,
  "currentShape" | "history"
>;
export interface KulImageviewerAdapterControllerGetters
  extends KulComponentAdapterGetters<KulImageviewer> {
  compInstance: KulImageviewer;
  currentShape: () => { shape: KulMasonrySelectedShape; value: string };
  history: {
    current: () => KulMasonrySelectedShape[];
    currentSnapshot: () => {
      shape: KulMasonrySelectedShape;
      value: string;
    };
    full: () => KulImageviewerHistory;
    index: () => number;
  };
  manager: KulManager;
  spinnerStatus: () => boolean;
}
export interface KulImageviewerAdapterControllerSetters
  extends KulComponentAdapterSetters {
  currentShape: (node: KulMasonrySelectedShape) => void;
  history: {
    index: (index: number) => void;
    new: (shape: KulMasonrySelectedShape, isSnapshot?: boolean) => void;
    pop: (index?: number) => void;
  };
  spinnerStatus: (active: boolean) => void;
}
//#endregion

//#region Events
export type KulImageviewerEvent = "kul-event" | "ready" | "unmount";
export interface KulImageviewerEventPayload
  extends KulEventPayload<"KulImageviewer", KulImageviewerEvent> {}
//#endregion

//#region State
export type KulImageviewerHistory = {
  [index: number]: Array<KulMasonrySelectedShape>;
};
//#endregion

//#region Props
export interface KulImageviewerPropsInterface {
  kulData?: KulDataDataset;
  kulLoadCallback?: KulImageviewerLoadCallback;
  kulStyle?: string;
  kulValue?: KulDataDataset;
}
export type KulImageviewerLoadCallback = (
  imageviewer: KulImageviewer,
  dir: string,
) => Promise<void>;
//#endregion
