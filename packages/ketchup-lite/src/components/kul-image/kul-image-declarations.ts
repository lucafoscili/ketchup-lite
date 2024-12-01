import { KulEventPayload } from '../../types/GenericTypes';
import { KulBadgePropsInterface } from '../kul-badge/kul-badge-declarations';

//#region Events
export type KulImageEvent =
  | 'click'
  | 'contextmenu'
  | 'error'
  | 'load'
  | 'ready'
  | 'unmount';
export interface KulImageEventPayload
  extends KulEventPayload<'KulImage', KulImageEvent> {}
//#endregion
//#region Props
export enum KulImageProps {
  kulBadgeProps = 'Sets the props to show a badge.',
  kulColor = 'The color of the icon, defaults to the CSS variable --kul-icon-color.',
  kulShowSpinner = 'When set to true, a spinner will be displayed until the image finished loading. Not compatible with SVGs.',
  kulSizeX = 'The width of the icon, defaults to 100%. Accepts any valid CSS format (px, %, vh, etc.).',
  kulSizeY = 'The height of the icon, defaults to 100%. Accepts any valid CSS format (px, %, vh, etc.).',
  kulStyle = 'Custom style of the component.',
  kulValue = 'Defines the source URL of the image. This property is used to set the image resource that the component should display.',
}
export interface KulImagePropsInterface {
  kulBadgeProps?: KulBadgePropsInterface;
  kulColor?: string;
  kulShowSpinner?: boolean;
  kulSizeX?: string;
  kulSizeY?: string;
  kulStyle?: string;
  kulValue?: string;
}
//#endregion
