import { KulEventPayload } from '../../components';
import { KulUpload } from './kul-upload';

/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
export type KulUploadEvent = 'delete' | 'pointerdown' | 'ready' | 'upload';
export interface KulUploadEventPayload
    extends KulEventPayload<KulUpload, KulUploadEvent, Event | CustomEvent> {
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
