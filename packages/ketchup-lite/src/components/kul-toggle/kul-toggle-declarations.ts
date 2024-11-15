import { KulEventPayload } from '../../types/GenericTypes';

/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
export type KulToggleEvent =
    | 'blur'
    | 'change'
    | 'focus'
    | 'pointerdown'
    | 'ready'
    | 'unmount';
export interface KulToggleEventPayload
    extends KulEventPayload<'KulToggle', KulToggleEvent> {
    value: string;
    valueAsBoolean: boolean;
}
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
export enum KulToggleProps {
    kulDisabled = 'When true, the component is disabled.',
    kulLabel = 'Defines text to display along with the toggle.',
    kulLeadingLabel = ' Defaults at false. When set to true, the label will be displayed before the component',
    kulRipple = 'When set to true, the pointerdown event will trigger a ripple effect.',
    kulStyle = 'Sets a custom CSS style for the component.',
    kulValue = 'If true, the button is marked as checked.',
}
export interface KulTogglePropsInterface {
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
export type KulToggleState = 'off' | 'on';
