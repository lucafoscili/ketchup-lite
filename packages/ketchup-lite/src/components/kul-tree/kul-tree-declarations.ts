import { KulEventPayload } from '../../components';
import {
    KulDataDataset,
    KulDataNode,
} from '../../managers/kul-data/kul-data-declarations';
import { KulTree } from './kul-tree';

/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
export type KulTreeEvent = 'click' | 'kul-event' | 'pointerdown' | 'ready';
export interface KulTreeEventPayload
    extends KulEventPayload<KulTree, KulTreeEvent, Event | CustomEvent> {
    node?: KulDataNode;
}
export interface KulTreeEventArguments {
    expansion?: boolean;
    node?: KulDataNode;
}
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
export enum KulTreeProps {
    kulAccordionLayout = 'When enabled, the first level of depth will create an accordion-style appearance for nodes.',
    kulData = 'Actual data of the tree.',
    kulFilter = 'When true, displays a text field which enables filtering the dataset of the tree.',
    kulInitialExpansionDepth = 'Sets the initial expanded nodes based on the specified depth. If the property is not provided, all nodes in the tree will be expanded.',
    kulRipple = 'When set to true, the pointerdown event will trigger a ripple effect.',
    kulSelectable = 'When true, nodes can be selected.',
    kulStyle = 'Custom style of the component.',
}
export interface KulTreePropsInterface {
    kulAccordionLayout?: boolean;
    kulData?: KulDataDataset;
    kulFilter?: boolean;
    kulInitialExpansionDepth?: number;
    kulRipple?: boolean;
    kulSelectable?: boolean;
    kulStyle?: string;
}
