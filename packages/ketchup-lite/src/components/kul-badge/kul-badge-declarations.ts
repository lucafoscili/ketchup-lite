import { KulEventPayload } from '../../components';
import { KulImagePropsInterface } from '../kul-image/kul-image-declarations';
import { KulBadge } from './kul-badge';

/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
export type KulBadgeEvent = 'click' | 'ready';
export interface KulBadgeEventPayload
    extends KulEventPayload<KulBadge, KulBadgeEvent, Event | CustomEvent> {}
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
export enum KulBadgeProps {
    kulImageProps = 'The props of the image displayed inside the badge.',
    kulLabel = 'The text displayed inside the badge.',
    kulStyle = 'Custom style of the component.',
}
export interface KulBadgePropsInterface {
    kulImageProps?: KulImagePropsInterface;
    kulLabel?: string;
    kulStyle?: string;
}
