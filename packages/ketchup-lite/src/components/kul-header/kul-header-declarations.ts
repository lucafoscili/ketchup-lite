import { KulEventPayload } from '../../components';
import { KulHeader } from './kul-header';

/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
export type KulHeaderEvent = 'ready';
export interface KulHeaderEventPayload
    extends KulEventPayload<KulHeader, KulHeaderEvent, Event | CustomEvent> {}
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
export enum KulHeaderProps {
    kulStyle = 'Custom style of the component.',
}
export interface KulHeaderPropsInterface {
    kulStyle?: string;
}
