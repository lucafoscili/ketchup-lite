import { VNode } from "@stencil/core";

import { KulImageviewer } from "src/components/kul-imageviewer/kul-imageviewer";
import { KulMasonrySelectedShape } from "src/components/kul-masonry/kul-masonry-declarations";
import {
  KulDataCell,
  KulDataDataset,
} from "src/managers/kul-data/kul-data-declarations";
import { KulComponentAdapter } from "src/types/GenericTypes";

//#region Adapter
export interface KulImageviewerAdapter
  extends KulComponentAdapter<KulImageviewer> {
  handlers: KulImageviewerAdapterHandlers;
  hooks: KulImageviewerAdapterHooks;
  widgets: KulImageviewerAdapterWidgets;
}
export interface KulImageviewerAdapterWidgets {
  jsx: {
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
  };
  refs: {
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
  };
}
export interface KulImageviewerAdapterHandlers {
  clearHistory: (index?: number) => Promise<void>;
  clearSelection: () => Promise<void>;
  deleteShape: () => Promise<void>;
  findImage: () => Partial<KulDataCell<"image">>;
  load: () => Promise<void>;
  redo: () => Promise<void>;
  save: () => Promise<void>;
  undo: () => Promise<void>;
}
export interface KulImageviewerAdapterHooks {
  get: {
    currentShape: () => { shape: KulMasonrySelectedShape; value: string };
    comp: KulImageviewer;
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
  };
  set: {
    currentShape: (node: KulMasonrySelectedShape) => void;
    history: {
      index: (index: number) => void;
      new: (shape: KulMasonrySelectedShape, isSnapshot?: boolean) => void;
      pop: (index?: number) => void;
    };
    spinnerStatus: (active: boolean) => void;
  };
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
