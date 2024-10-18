import { KulEventPayload } from '../../types/GenericTypes';

/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
export type KulLazyEvent = 'kul-event' | 'load' | 'ready' | 'unmount';
export interface KulLazyEventPayload
    extends KulEventPayload<'KulLazy', KulLazyEvent> {}
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
export enum KulLazyProps {
    kulComponentName = 'Sets the tag name of the component to be lazy loaded.',
    kulComponentProps = 'Sets the data of the component to be lazy loaded.',
    kulRenderMode = 'Decides when the sub-component should be rendered. By default when both the component props exist and the component is in the viewport.',
    kulShowPlaceholder = 'Displays an animated SVG placeholder until the component is loaded.',
    kulStyle = 'Custom style of the component.',
}
export interface KulLazyPropsInterface {
    kulComponentName?: string;
    kulComponentProps?: unknown;
    kulRenderMode?: KulLazyRenderMode;
    kulShowPlaceholder?: boolean;
    kulStyle?: string;
}
export type KulLazyRenderMode = 'both' | 'props' | 'viewport';
