import { KulMasonry } from './kul-masonry';
import {
  KulDataCell,
  KulDataDataset,
  KulDataShapes,
  KulDataShapesMap,
} from '../../managers/kul-data/kul-data-declarations';
import { KulEventPayload } from '../../types/GenericTypes';

//#region Adapter
export interface KulMasonryAdapter {
  actions: KulMasonryAdapterActions;
  components: {
    buttons: {
      addColumn: HTMLKulButtonElement;
      removeColumn: HTMLKulButtonElement;
      changeView: HTMLKulButtonElement;
    };
  };
  isMasonry: () => boolean;
  isVertical: () => boolean;
  get: {
    masonry: () => KulMasonry;
    shapes: () => KulDataShapesMap;
  };
}

export interface KulMasonryAdapterActions {
  addColumn: () => Promise<void>;
  removeColumn: () => Promise<void>;
  changeView: () => Promise<void>;
}
//#endregion

//#region Events
export type KulMasonryEvent = 'kul-event' | 'ready' | 'unmount';
export interface KulMasonryEventPayload
  extends KulEventPayload<'KulMasonry', KulMasonryEvent> {
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
export enum KulMasonryProps {
  kulColumns = 'Number of columns of the masonry.',
  kulData = 'Actual data to masonry.',
  kulSelectable = 'Allows for the selection of elements.',
  kulShape = 'Sets the type of shapes to compare.',
  kulStyle = 'Sets a custom CSS style for the component.',
  kulView = 'Sets the type of view, either the actual masonry or a sequential view.',
}
export interface KulMasonryPropsInterface {
  kulColumns?: number;
  kulData?: KulDataDataset;
  kulSelectable?: boolean;
  kulShape?: KulDataShapes;
  kulStyle?: string;
  kulView?: KulMasonryView;
}
export type KulMasonryView = 'horizontal' | 'masonry' | 'vertical';
//#endregion
