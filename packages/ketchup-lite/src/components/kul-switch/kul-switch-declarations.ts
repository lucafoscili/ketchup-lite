import { KulEventPayload } from '../../types/GenericTypes';

/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
export type KulSwitchEvent =
    | 'blur'
    | 'change'
    | 'focus'
    | 'pointerdown'
    | 'ready'
    | 'unmount';
export interface KulSwitchEventPayload
    extends KulEventPayload<'KulSwitch', KulSwitchEvent> {
    value: string;
}
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
export enum KulSwitchProps {
    kulDisabled = 'When true, the component is disabled.',
    kulLabel = 'Defines text to display along with the switch.',
    kulLeadingLabel = ' Defaults at false. When set to true, the label will be displayed before the component',
    kulRipple = 'When set to true, the pointerdown event will trigger a ripple effect.',
    kulStyle = 'Sets a custom CSS style for the component.',
    kulValue = 'If true, the button is marked as checked.',
}
export interface KulSwitchPropsInterface {
    kulDisabled?: boolean;
    kulLabel?: string;
    kulLeadingLabel?: boolean;
    kulRipple?: boolean;
    kulStyle?: string;
    kulValue?: boolean;
}
/*-------------------------------------------------*/
/*                    S t a t e                    */
/*-------------------------------------------------*/
export type KulSwitchState = 'off' | 'on';
