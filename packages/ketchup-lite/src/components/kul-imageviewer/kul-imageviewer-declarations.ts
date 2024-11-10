import { VNode } from '@stencil/core';
import {
    KulDataDataset,
    KulDataNode,
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
    load: (adapter: KulImageviewerAdapter) => Promise<void>;
}
export interface KulImageviewerAdapterComponents {
    jsx: {
        button: (adapter: KulImageviewerAdapter) => VNode;
        image: (adapter: KulImageviewerAdapter) => VNode;
        masonry: (adapter: KulImageviewerAdapter) => VNode;
        textfield: (adapter: KulImageviewerAdapter) => VNode;
        tree: (adapter: KulImageviewerAdapter) => VNode;
    };
    refs: {
        button: HTMLKulButtonElement;
        image: HTMLKulImageElement;
        masonry: HTMLKulMasonryElement;
        textfield: HTMLKulTextfieldElement;
        tree: HTMLKulTreeElement;
    };
}
export interface KulImageviewerAdapterGetters {
    imageviewer: () => KulImageviewer;
    manager: () => KulManager;
    state: {
        currentShape: () => { shape: KulMasonrySelectedShape; value: string };
    };
}
export interface KulImageviewerAdapterSetters {
    state: {
        currentShape: (node: KulMasonrySelectedShape) => void;
    };
}
//#endregion
//#region Events
export type KulImageviewerEvent = 'kul-event' | 'ready' | 'unmount';
export interface KulImageviewerEventPayload
    extends KulEventPayload<'KulImageviewer', KulImageviewerEvent> {}
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
