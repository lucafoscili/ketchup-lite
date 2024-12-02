import { KulEventPayload } from '../../types/GenericTypes';

//#region Events
export type KulProgressbarEvent = 'ready' | 'unmount';
export interface KulProgressbarEventPayload
  extends KulEventPayload<'KulProgressbar', KulProgressbarEvent> {
  isPlaceholder?: boolean;
}
//#endregion

//#region Props
export enum KulProgressbarProps {
  kulCenteredLabel = "Displays the label in the middle of the progress bar. It's the default for the radial variant and can't be changed.",
  kulIcon = 'Specifies an icon to replace the label.',
  kulIsRadial = 'Radial version.',
  kulLabel = "Specifies a text for the bar's label.",
  kulShowLabel = "Flag to show or hide the progress bar's label.",
  kulStyle = 'Custom style of the component.',
  kulValue = 'The current value the progress bar must display.',
}
export interface KulProgressbarPropsInterface {
  kulCenteredLabel?: boolean;
  kulIcon?: string;
  kulIsRadial?: boolean;
  kulLabel?: string;
  kulShowLabel?: boolean;
  kulStyle?: string;
  kulValue?: number;
}
//#endregion
