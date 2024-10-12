import {
    KulDataDataset,
    KulDataNode,
} from '../../managers/kul-data/kul-data-declarations';
import { KulEventPayload } from '../../types/GenericTypes';
import { KulList } from './kul-list';

/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
export type KulListEvent =
    | 'blur'
    | 'click'
    | 'focus'
    | 'pointerdown'
    | 'ready'
    | 'delete';
export interface KulListEventPayload
    extends KulEventPayload<KulList, KulListEvent, Event | CustomEvent> {
    node: KulDataNode;
}
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
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
