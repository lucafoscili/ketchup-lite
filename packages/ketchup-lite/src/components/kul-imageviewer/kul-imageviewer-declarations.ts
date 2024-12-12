import { VNode } from "@stencil/core";

import {
  KulDataCell,
  KulDataDataset,
} from "../../managers/kul-data/kul-data-declarations";
import { KulManager } from "../../managers/kul-manager/kul-manager";
import { KulComponentAdapter, KulEventPayload } from "../../types/GenericTypes";
import { KulMasonrySelectedShape } from "../kul-masonry/kul-masonry-declarations";
import { KulImageviewer } from "./kul-imageviewer";

//#region Adapter
export interface KulImageviewerAdapter
  extends KulComponentAdapter<KulImageviewer> {
  components: KulImageviewerAdapterComponents;
  handlers: KulImageviewerAdapterHandlers;
  hooks: KulImageviewerAdapterHooks;
}
export interface KulImageviewerAdapterComponents {
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
    manager: KulManager;
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
export enum KulImageviewerProps {
  kulData = "Actual data of the image viewer.",
  kulLoadCallback = "Callback invoked when the load button is clicked.",
  kulStyle = "Sets a custom CSS style for the component.",
  kulValue = "Configuration parameters of the detail view.",
}
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
