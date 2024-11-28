import { KulEventPayload } from '../../types/GenericTypes';

//#region Events
export type KulSplashEvent = 'ready' | 'unmount';
export interface KulSplashEventPayload
    extends KulEventPayload<'KulSplash', KulSplashEvent> {}
//#endregion

//#region States
export type KulSplashStates = 'initializing' | 'unmounting';
//#endregion

//#region Props
export enum KulSplashProps {
    kulLabel = 'The text displayed inside the badge.',
    kulStyle = 'Custom style of the component.',
}
export interface KulSplashPropsInterface {
    kulLabel: string;
    kulStyle: string;
}
//#endregion
