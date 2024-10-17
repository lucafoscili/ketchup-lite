import {
    KulComponent,
    KulComponentName,
    KulEventPayload,
    KulEventType,
} from '../../types/GenericTypes';
import { KulCard } from './kul-card';
import {
    KulDataDataset,
    KulDataShapesMap,
} from '../../managers/kul-data/kul-data-declarations';

/*-------------------------------------------------*/
/*                  A d a p t e r                  */
/*-------------------------------------------------*/
export interface KulCardAdapter {
    actions: {
        dispatchEvent: <T extends KulComponentName>(
            e: CustomEvent<KulEventPayload<T, KulEventType<KulComponent<T>>>>
        ) => Promise<void>;
    };
    get: {
        card: () => KulCard;
        shapes: () => KulDataShapesMap;
    };
}
/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
export type KulCardEvent =
    | 'click'
    | 'contextmenu'
    | 'kul-event'
    | 'pointerdown'
    | 'ready';
export interface KulCardEventPayload
    extends KulEventPayload<'KulCard', KulCardEvent> {}
/*-------------------------------------------------*/
/*                 I n t e r n a l                 */
/*-------------------------------------------------*/
export enum KulCardCSSClasses {
    HAS_ACTIONS = 'has-actions',
    HAS_CONTENT = 'has-content',
}
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
export enum KulCardProps {
    kulData = 'The actual data of the card.',
    kulLayoutNumber = 'Sets the number of the layout.',
    kulSizeX = 'The width of the card, defaults to 100%. Accepts any valid CSS format (px, %, vw, etc.).',
    kulSizeY = 'The height of the card, defaults to 100%. Accepts any valid CSS format (px, %, vh, etc.).',
    kulStyle = 'Custom style of the component.',
}
export interface KulCardPropsInterface {
    kulData?: KulDataDataset;
    kulLayoutNumber?: number;
    kulSizeX?: string;
    kulSizeY?: string;
    kulStyle?: string;
}
export type KulCardLayout = 'material' | 'keywords';
