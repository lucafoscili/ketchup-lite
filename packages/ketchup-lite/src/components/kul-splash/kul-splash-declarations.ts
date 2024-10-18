import { KulEventPayload } from '../../types/GenericTypes';

/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
export type KulSplashEvent = 'ready' | 'unmount';
export interface KulSplashEventPayload
    extends KulEventPayload<'KulSplash', KulSplashEvent> {}
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
export enum KulSplashProps {
    kulLabel = 'The text displayed inside the badge.',
    kulStyle = 'Custom style of the component.',
}
export interface KulSplashPropsInterface {
    kulLabel: string;
    kulStyle: string;
}
/*-------------------------------------------------*/
/*                    S t a t e                    */
/*-------------------------------------------------*/
export type KulSplashStates = 'initializing' | 'unmounting';
