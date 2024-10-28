import {
    KulDataCell,
    KulDataDataset,
    KulDataShapes,
} from '../../managers/kul-data/kul-data-declarations';
import { KulEventPayload } from '../../types/GenericTypes';

/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
export type KulMasonryEvent = 'kul-event' | 'ready' | 'unmount';
export interface KulMasonryEventPayload
    extends KulEventPayload<'KulMasonry', KulMasonryEvent> {
    selectedShape: KulMasonrySelectedShape;
}
/*-------------------------------------------------*/
/*                   S t a t e s                   */
/*-------------------------------------------------*/
export type KulMasonrySelectedShape = {
    index?: number;
    shape?: Partial<KulDataCell<KulDataShapes>>;
};
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
export enum KulMasonryProps {
    kulColumns = 'Number of columns of the masonry.',
    kulData = 'Actual data to masonry.',
    kulSelectable = 'Allows for the selection of elements.',
    kulShape = 'Sets the type of shapes to compare.',
    kulStyle = 'Sets a custom CSS style for the component.',
    kulView = 'Sets the type of view, either the actual masonry or a waterfall view.',
}
export interface KulMasonryPropsInterface {
    kulColumns?: number;
    kulData?: KulDataDataset;
    kulSelectable?: boolean;
    kulShape?: KulDataShapes;
    kulStyle?: string;
    kulView?: KulMasonryView;
}
export type KulMasonryView = 'masonry' | 'waterfall';
