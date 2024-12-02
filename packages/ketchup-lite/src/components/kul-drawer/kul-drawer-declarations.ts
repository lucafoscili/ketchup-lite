import { KulEventPayload } from '../../types/GenericTypes';

/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
export type KulDrawerEvent = 'close' | 'open' | 'ready' | 'unmount';
export interface KulDrawerEventPayload
  extends KulEventPayload<'KulDrawer', KulDrawerEvent> {}
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
export enum KulDrawerProps {
  kulStyle = 'Custom style of the component.',
}
export interface KulDrawerPropsInterface {
  kulStyle?: string;
}
