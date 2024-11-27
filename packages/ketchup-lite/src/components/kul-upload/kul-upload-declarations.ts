import { KulEventPayload } from '../../types/GenericTypes';

//#region Events
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
//#endregion

//#region Props
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
//#endregion
