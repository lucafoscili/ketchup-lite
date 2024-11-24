import { VNode } from '@stencil/core';
import {
    KulDataCell,
    KulDataDataset,
    KulDataGenericCell,
} from '../../managers/kul-data/kul-data-declarations';
import { KulManager } from '../../managers/kul-manager/kul-manager';
import { KulEventPayload } from '../../types/GenericTypes';
import { KulImageviewer } from './kul-imageviewer';
import { KulMasonrySelectedShape } from '../kul-masonry/kul-masonry-declarations';

//#region Adapter
export interface KulImageviewerAdapter {
    actions: KulImageviewerAdapterActions;
    components: KulImageviewerAdapterComponents;
    get: KulImageviewerAdapterGetters;
    set: KulImageviewerAdapterSetters;
}
export interface KulImageviewerAdapterActions {
    clearHistory: (
        adapter: KulImageviewerAdapter,
        index?: number
    ) => Promise<void>;
    clearSelection: (adapter: KulImageviewerAdapter) => Promise<void>;
    delete: (adapter: KulImageviewerAdapter) => Promise<void>;
    findImage: (
        adapter: KulImageviewerAdapter
    ) => Partial<KulDataCell<'image'>>;
    load: (adapter: KulImageviewerAdapter) => Promise<void>;
    redo: (adapter: KulImageviewerAdapter) => Promise<void>;
    save: (adapter: KulImageviewerAdapter) => Promise<void>;
    undo: (adapter: KulImageviewerAdapter) => Promise<void>;
    updateValue: (shape: KulDataGenericCell, value: string) => void;
}
export interface KulImageviewerAdapterComponents {
    jsx: KulImageviewerAdapterJsx;
    refs: KulImageviewerAdapterRefs;
}
export interface KulImageviewerAdapterJsx {
    canvas: (adapter: KulImageviewerAdapter) => VNode;
    clearHistory: (adapter: KulImageviewerAdapter) => VNode;
    delete: (adapter: KulImageviewerAdapter) => VNode;
    load: (adapter: KulImageviewerAdapter) => VNode;
    masonry: (adapter: KulImageviewerAdapter) => VNode;
    redo: (adapter: KulImageviewerAdapter) => VNode;
    save: (adapter: KulImageviewerAdapter) => VNode;
    spinner: (adapter: KulImageviewerAdapter) => VNode;
    textfield: (adapter: KulImageviewerAdapter) => VNode;
    tree: (adapter: KulImageviewerAdapter) => VNode;
    undo: (adapter: KulImageviewerAdapter) => VNode;
}
export interface KulImageviewerAdapterRefs {
    canvas: HTMLKulCanvasElement;
    clearHistory: HTMLKulButtonElement;
    delete: HTMLKulButtonElement;
    load: HTMLKulButtonElement;
    masonry: HTMLKulMasonryElement;
    redo: HTMLKulButtonElement;
    save: HTMLKulButtonElement;
    spinner: HTMLKulSpinnerElement;
    textfield: HTMLKulTextfieldElement;
    tree: HTMLKulTreeElement;
    undo: HTMLKulButtonElement;
}
export interface KulImageviewerAdapterGetters {
    imageviewer: () => KulImageviewer;
    manager: () => KulManager;
    state: {
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
    };
}
export interface KulImageviewerAdapterSetters {
    state: {
        currentShape: (node: KulMasonrySelectedShape) => void;
        history: {
            clear: (index?: number) => void;
            index: (index: number) => void;
            new: (shape: KulMasonrySelectedShape, isSnapshot?: boolean) => void;
        };
        spinnerStatus: (active: boolean) => void;
    };
}
//#endregion
//#region Events
export type KulImageviewerEvent = 'kul-event' | 'ready' | 'unmount';
export interface KulImageviewerEventPayload
    extends KulEventPayload<'KulImageviewer', KulImageviewerEvent> {}
//#endregion
//#region State
export type KulImageviewerHistory = {
    [index: number]: Array<KulMasonrySelectedShape>;
};
//#endregion
//#region Props
export enum KulImageviewerProps {
    kulData = 'Actual data of the image viewer.',
    kulLoadCallback = 'Callback invoked when the load button is clicked.',
    kulStyle = 'Sets a custom CSS style for the component.',
    kulValue = 'Configuration parameters of the detail view.',
}
export interface KulImageviewerPropsInterface {
    kulData?: KulDataDataset;
    kulLoadCallback?: KulImageviewerLoadCallback;
    kulStyle?: string;
    kulValue?: KulDataDataset;
}
export type KulImageviewerLoadCallback = (
    imageviewer: KulImageviewer,
    dir: string
) => Promise<void>;
//#endregion
