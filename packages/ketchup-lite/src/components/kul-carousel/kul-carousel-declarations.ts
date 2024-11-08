import {
    KulDataCell,
    KulDataDataset,
    KulDataShapes,
    KulDataShapesMap,
} from '../../managers/kul-data/kul-data-declarations';
import { KulEventPayload } from '../../types/GenericTypes';
import { KulCarousel } from './kul-carousel';

/*-------------------------------------------------*/
/*                  A d a p t e r                  */
/*-------------------------------------------------*/
export interface KulCarouselAdapter {
    actions: KulCarouselAdapterActions;
    components: {
        buttons: {
            addColumn: HTMLKulButtonElement;
            removeColumn: HTMLKulButtonElement;
            changeView: HTMLKulButtonElement;
        };
    };
    isCarousel: () => boolean;
    isVertical: () => boolean;
    get: {
        carousel: () => KulCarousel;
        shapes: () => KulDataShapesMap;
    };
}

export interface KulCarouselAdapterActions {
    addColumn: () => Promise<void>;
    removeColumn: () => Promise<void>;
    changeView: () => Promise<void>;
}
/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
export type KulCarouselEvent = 'kul-event' | 'ready' | 'unmount';
export interface KulCarouselEventPayload
    extends KulEventPayload<'KulCarousel', KulCarouselEvent> {}
/*-------------------------------------------------*/
/*                   S t a t e s                   */
/*-------------------------------------------------*/
export type KulCarouselSelectedShape = {
    index?: number;
    shape?: Partial<KulDataCell<KulDataShapes>>;
};
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
export enum KulCarouselProps {
    kulColumns = 'Number of columns of the carousel.',
    kulData = 'Actual data to carousel.',
    kulSelectable = 'Allows for the selection of elements.',
    kulShape = 'Sets the type of shapes to compare.',
    kulStyle = 'Sets a custom CSS style for the component.',
    kulView = 'Sets the type of view, either the actual carousel or a sequential view.',
}
export interface KulCarouselPropsInterface {
    kulColumns?: number;
    kulData?: KulDataDataset;
    kulSelectable?: boolean;
    kulShape?: KulDataShapes;
    kulStyle?: string;
    kulView?: KulCarouselView;
}
export type KulCarouselView = 'horizontal' | 'carousel' | 'vertical';
