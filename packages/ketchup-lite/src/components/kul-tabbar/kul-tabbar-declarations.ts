import {
    KulDataDataset,
    KulDataNode,
} from '../../managers/kul-data/kul-data-declarations';
import { KulEventPayload } from '../../types/GenericTypes';

//#region Events
export type KulTabbarEvent = 'click' | 'pointerdown' | 'ready' | 'unmount';
export interface KulTabbarEventPayload
    extends KulEventPayload<'KulTabbar', KulTabbarEvent> {
    index?: number;
    node?: KulDataNode;
}
//#endregion

//#region States
export interface KulTabbarState {
    index?: number;
    node?: KulDataNode;
}
//#endregion

//#region Props
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
//#endregion
