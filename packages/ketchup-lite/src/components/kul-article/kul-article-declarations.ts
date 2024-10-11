import { KulEventPayload } from '../../components';
import {
    KulDataDataset,
    KulDataNode,
} from '../../managers/kul-data/kul-data-declarations';
import { KulArticle } from './kul-article';

/*-------------------------------------------------*/
/*                     D a t a                     */
/*-------------------------------------------------*/
export interface KulArticleDataset extends KulDataDataset {
    nodes: KulArticleNode[];
}
export interface KulArticleNode extends KulDataNode {
    children?: KulArticleNode[];
    tagName?: 'br' | 'code' | 'h1' | 'h2' | 'h3' | 'li' | 'pre' | 'strong';
}
/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
export type KulArticleEvent = 'kul-event' | 'ready';
export interface KulArticleEventPayload
    extends KulEventPayload<KulArticle, KulArticleEvent, Event | CustomEvent> {}
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
export enum KulArticleProps {
    kulData = 'Actual data of the article',
    kulStyle = 'Custom style of the component.',
}
export interface KulArticlePropsInterface {
    kulData?: KulArticleDataset;
    kulStyle?: string;
}
