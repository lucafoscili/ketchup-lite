import { GenericObject, KulEventPayload } from '../../types/GenericTypes';
import { KulShowcase } from './kul-showcase';

/*-------------------------------------------------*/
/*                     D a t a                     */
/*-------------------------------------------------*/
export interface KulShowcaseDocMethod {
    docs: string;
    name: string;
    returns: { docs: string; type: string };
    signature: string;
}
export interface KulShowcaseDocProp {
    docs: string;
    name: string;
    type: string;
}
export interface KulShowcaseDocStyle {
    docs: string;
    name: string;
}
export interface KulShowcaseDoc {
    [index: string]:
        | {
              methods: KulShowcaseDocMethod[];
              props: KulShowcaseDocProp[];
              styles: KulShowcaseDocStyle[];
          }
        | GenericObject;
}
export type KulShowcaseDynamicExampleType =
    | 'custom'
    | 'state-colors'
    | 'positions';
export type KulShowcaseTitle =
    | 'Components'
    | 'Framework'
    | 'Layout'
    | 'Utilities';
/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
export type KulShowcaseEvent = 'click';
export interface KulShowcaseEventPayload
    extends KulEventPayload<
        KulShowcase,
        KulShowcaseEvent,
        Event | CustomEvent
    > {}
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
export enum KulShowcaseProps {
    kulStyle = 'Custom style of the component.',
}
export interface KulShowcasePropsInterface {
    kulStyle: string;
}
