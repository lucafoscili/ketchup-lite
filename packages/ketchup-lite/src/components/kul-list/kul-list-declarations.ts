import {
    KulDataDataset,
    KulDataNode,
} from '../../managers/kul-data/kul-data-declarations';
import { KulEventPayload } from '../../types/GenericTypes';

//#region Events
export type KulListEvent =
    | 'blur'
    | 'click'
    | 'delete'
    | 'focus'
    | 'pointerdown'
    | 'ready'
    | 'unmount';
export interface KulListEventPayload
    extends KulEventPayload<'KulList', KulListEvent> {
    node: KulDataNode;
}
//#endregion

//#region Props
export enum KulListProps {
    kulData = 'The actual data of the list.',
    kulEmptyLabel = 'Text displayed when the list is empty.',
    kulEnableDeletions = 'Defines whether items can be removed from the list or not.',
    kulNavigation = "When true, enables items' navigation through arrow keys.",
    kulRipple = 'When set to true, the pointerdown event will trigger a ripple effect.',
    kulSelectable = 'Defines whether items are selectable or not.',
    kulStyle = 'Custom style of the component.',
}
export interface KulListPropsInterface {
    kulData?: KulDataDataset;
    kulEmptyLabel?: string;
    kulEnableDeletions?: boolean;
    kulNavigation?: boolean;
    kulRipple?: boolean;
    kulSelectable?: boolean;
    kulStyle?: string;
}
//#endregion
