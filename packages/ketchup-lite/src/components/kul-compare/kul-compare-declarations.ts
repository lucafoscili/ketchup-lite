import { KulDataDataset } from '../../managers/kul-data/kul-data-declarations';
import { KulEventPayload } from '../../types/GenericTypes';

/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
export type KulCompareEvent = 'click' | 'pointerdown' | 'ready' | 'unmount';
export interface KulCompareEventPayload
    extends KulEventPayload<'KulCompare', KulCompareEvent> {}
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
export enum KulCompareProps {
    kulData = 'Actual data to compare.',
    kulStyle = 'Sets a custom CSS style for the component.',
}
export interface KulComparePropsInterface {
    kulData?: KulDataDataset;
    kulStyle?: string;
}
