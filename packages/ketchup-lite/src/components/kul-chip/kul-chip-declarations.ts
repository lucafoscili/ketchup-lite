import {
    KulDataDataset,
    KulDataNode,
} from '../../managers/kul-data/kul-data-declarations';
import { KulEventPayload } from '../../types/GenericTypes';

//#region Events
export type KulChipEvent =
    | 'blur'
    | 'click'
    | 'delete'
    | 'focus'
    | 'pointerdown'
    | 'ready'
    | 'unmount';
export interface KulChipEventPayload
    extends KulEventPayload<'KulChip', KulChipEvent> {
    node: KulDataNode;
    selectedNodes: Set<KulDataNode>;
}
//#endregion

//#region Internal usage
export interface KulChipEventArguments {
    expansion?: boolean;
    node?: KulDataNode;
}
//#endregion

//#region Props
export enum KulChipProps {
    kulData = 'The data of the chip chip.',
    kulRipple = 'When set to true, the pointerdown event will trigger a ripple effect.',
    kulStyle = 'Custom style of the component.',
    kulStyling = 'Styling of the chip component, includes: "choice", "input", "filter" and "standard".',
}
export interface KulChipPropsInterface {
    kulData?: KulDataDataset;
    kulRipple?: boolean;
    kulStyle?: string;
    kulStyling?: KulChipStyling;
}
export type KulChipStyling = 'choice' | 'filter' | 'input' | 'standard';
//#endregion
