import { KulDataDataset, KulDataNode, KulEventPayload } from '../../components';
import { KulTabbar } from './kul-tabbar';

/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
export type KulTabbarEvent = 'click' | 'pointerdown' | 'ready';
export interface KulTabbarEventPayload
    extends KulEventPayload<KulTabbar, KulTabbarEvent, Event | CustomEvent> {
    index?: number;
    node?: KulDataNode;
}
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
export enum KulTabbarProps {
    kulData = 'Actual data of the component.',
    kulRipple = 'When set to true, the pointerdown event will trigger a ripple effect.',
    kulStyle = 'Custom style of the component.',
    kulValue = "Sets the initial selected node's index.",
}
export interface KulTabbarPropsInterface {
    kulData?: KulDataDataset;
    kulRipple?: boolean;
    kulStyle?: string;
    kulValue?: number;
}
/*-------------------------------------------------*/
/*                    S t a t e                    */
/*-------------------------------------------------*/
export interface KulTabbarState {
    index?: number;
    node?: KulDataNode;
}
