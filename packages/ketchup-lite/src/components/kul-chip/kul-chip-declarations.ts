import {
    KulDataDataset,
    KulDataNode,
} from '../../managers/kul-data/kul-data-declarations';
import { KulEventPayload } from '../../types/GenericTypes';

export type KulChipEvent =
    | 'blur'
    | 'click'
    | 'focus'
    | 'pointerdown'
    | 'ready'
    | 'delete';

export interface KulChipEventArguments {
    expansion?: boolean;
    node?: KulDataNode;
}

export interface KulChipDataset extends KulDataDataset {}

export interface KulChipEventPayload extends KulEventPayload {
    node: KulDataNode;
    selectedNodes: Set<KulDataNode>;
}

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
