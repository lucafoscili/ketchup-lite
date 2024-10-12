import { KulEventPayload } from '../../types/GenericTypes';
import { KulDrawer } from './kul-drawer';

/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
export type KulDrawerEvent = 'close' | 'open' | 'ready';
export interface KulDrawerEventPayload
    extends KulEventPayload<KulDrawer, KulDrawerEvent, Event | CustomEvent> {}
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
export enum KulDrawerProps {
    kulStyle = 'Custom style of the component.',
}
export interface KulDrawerPropsInterface {
    kulStyle?: string;
}
