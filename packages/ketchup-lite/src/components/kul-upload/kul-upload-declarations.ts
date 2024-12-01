import { KulEventPayload } from '../../types/GenericTypes';

/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
export type KulUploadEvent =
  | 'delete'
  | 'pointerdown'
  | 'ready'
  | 'unmount'
  | 'upload';
export interface KulUploadEventPayload
  extends KulEventPayload<'KulUpload', KulUploadEvent> {
  selectedFiles: File[];
}
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
export enum KulUploadProps {
  kulLabel = "Sets the button's label.",
  kulRipple = 'When set to true, the pointerdown event will trigger a ripple effect.',
  kulStyle = 'Custom style of the component.',
  kulValue = 'Initializes the component with these files.',
}
export interface KulUploadPropsInterface {
  kulLabel?: string;
  kulRipple?: boolean;
  kulStyle?: string;
  kulValue?: File[];
}
