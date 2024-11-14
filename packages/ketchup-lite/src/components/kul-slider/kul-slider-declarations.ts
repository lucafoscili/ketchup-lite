import { KulEventPayload } from '../../types/GenericTypes';

//#region Events
export type KulSliderEvent =
    | 'blur'
    | 'change'
    | 'focus'
    | 'input'
    | 'pointerdown'
    | 'ready'
    | 'unmount';
export interface KulSliderEventPayload
    extends KulEventPayload<'KulSlider', KulSliderEvent> {
    value: KulSliderValue;
}
//#endregion
//#region State
export interface KulSliderValue {
    display: number;
    real: number;
}
//#endregion
//#region Props
export enum KulSliderProps {
    kulDisabled = 'When true, the component is disabled, preventing user interaction.',
    kulLabel = 'Defines text to display as a label for the slider.',
    kulLeadingLabel = 'When true, displays the label before the slider component.',
    kulMax = 'The maximum value allowed by the slider.',
    kulMin = 'The minimum value allowed by the slider.',
    kulRipple = 'Adds a ripple effect when interacting with the slider.',
    kulStep = 'Sets the increment or decrement steps for the slider.',
    kulStyle = 'Sets a custom CSS style for the component.',
    kulValue = 'The initial numeric value of the slider within the defined range.',
}
export interface KulSliderPropsInterface {
    kulDisabled?: boolean;
    kulLabel?: string;
    kulLeadingLabel?: boolean;
    kulMax?: number;
    kulMin?: number;
    kulRipple?: boolean;
    kulStep?: number;
    kulStyle?: string;
    kulValue?: number;
}
//#endregion
