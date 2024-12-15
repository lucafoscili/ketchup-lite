import { VNode } from "@stencil/core";

import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import { KulCanvasEventPayload } from "src/components/kul-canvas/kul-canvas-declarations";
import { KulImageviewer } from "src/components/kul-imageviewer/kul-imageviewer";
import {
  KulMasonryEventPayload,
  KulMasonrySelectedShape,
} from "src/components/kul-masonry/kul-masonry-declarations";
import { KulTextfieldEventPayload } from "src/components/kul-textfield/kul-textfield-declarations";
import { KulTreeEventPayload } from "src/components/kul-tree/kul-tree-declarations";
import { KulDataDataset } from "src/managers/kul-data/kul-data-declarations";
import {
  KulComponentAdapter,
  KulComponentAdapterHandlers,
  KulComponentAdapterJsx,
  KulComponentAdapterRefs,
  KulComponentAdapterStateGetters,
  KulComponentAdapterStateSetters,
  KulEventPayload,
} from "src/types/GenericTypes";

//#region Adapter
export interface KulImageviewerAdapter
  extends KulComponentAdapter<KulImageviewer> {
  elements: {
    jsx: KulImageviewerAdapterElementsJsx;
    refs: KulImageviewerAdapterElementsRefs;
  };
  handlers: KulImageviewerAdapterHandlers;
  state: {
    get: KulImageviewerAdapterStateGetters;
    set: KulImageviewerAdapterStateSetters;
  };
}
export interface KulImageviewerAdapterElementsJsx
  extends KulComponentAdapterJsx {
  explorer: {
    load: () => VNode;
    masonry: () => VNode;
    textfield: () => VNode;
  };
  imageviewer: {
    canvas: () => VNode;
    clearHistory: () => VNode;
    deleteShape: () => VNode;
    redo: () => VNode;
    save: () => VNode;
    spinner: () => VNode;
    tree: () => VNode;
    undo: () => VNode;
  };
}
export interface KulImageviewerAdapterElementsRefs
  extends KulComponentAdapterRefs {
  explorer: {
    load: HTMLKulButtonElement;
    masonry: HTMLKulMasonryElement;
    textfield: HTMLKulTextfieldElement;
  };
  imageviewer: {
    canvas: HTMLKulCanvasElement;
    clearHistory: HTMLKulButtonElement;
    deleteShape: HTMLKulButtonElement;
    redo: HTMLKulButtonElement;
    save: HTMLKulButtonElement;
    spinner: HTMLKulSpinnerElement;
    tree: HTMLKulTreeElement;
    undo: HTMLKulButtonElement;
  };
}
export interface KulImageviewerAdapterHandlers
  extends KulComponentAdapterHandlers {
  explorer: {
    button: (e: CustomEvent<KulButtonEventPayload>) => Promise<void>;
    masonry: (e: CustomEvent<KulMasonryEventPayload>) => void;
    textfield: (e: CustomEvent<KulTextfieldEventPayload>) => void;
  };
  imageviewer: {
    button: (e: CustomEvent<KulButtonEventPayload>) => Promise<void>;
    canvas: (e: CustomEvent<KulCanvasEventPayload>) => void;
    tree: (e: CustomEvent<KulTreeEventPayload>) => void;
  };
}
export interface KulImageviewerAdapterStateGetters
  extends KulComponentAdapterStateGetters<KulImageviewer> {
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
  spinnerStatus: () => boolean;
}
export interface KulImageviewerAdapterStateSetters
  extends KulComponentAdapterStateSetters {
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
