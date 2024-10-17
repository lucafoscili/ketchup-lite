import { KulDataDataset } from '../../managers/kul-data/kul-data-declarations';
import { KulEventPayload } from '../../types/GenericTypes';

/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
export type KulAccordionEvent = 'click' | 'pointerdown' | 'ready';
export interface KulAccordionEventPayload
    extends KulEventPayload<'KulAccordion', KulAccordionEvent> {}
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
export enum KulAccordionProps {
    kulData = 'Actual data of the accordion.',
    kulRipple = 'When set to true, the pointerdown event will trigger a ripple effect.',
    kulStyle = 'Sets a custom CSS style for the component.',
}
export interface KulAccordionPropsInterface {
    kulData?: KulDataDataset;
    kulRipple?: boolean;
    kulStyle?: string;
}
