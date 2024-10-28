import {
    KulDataDataset,
    KulDataShapes,
} from '../../managers/kul-data/kul-data-declarations';
import { KulEventPayload } from '../../types/GenericTypes';

/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
export type KulMasonryEvent = 'kul-event' | 'ready' | 'unmount';
export interface KulMasonryEventPayload
    extends KulEventPayload<'KulMasonry', KulMasonryEvent> {}
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
export enum KulMasonryProps {
    kulData = 'Actual data to masonry.',
    kulShape = 'Sets the type of shapes to compare.',
    kulStyle = 'Sets a custom CSS style for the component.',
    kulView = 'Sets the type of view, either the actual masonry or a waterfall view.',
}
export interface KulMasonryPropsInterface {
    kulData?: KulDataDataset;
    kulShape?: KulDataShapes;
    kulStyle?: string;
    kulView?: KulMasonryView;
}
export type KulMasonryView = 'masonry' | 'waterfall';
