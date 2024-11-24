import { KulCanvasPropsInterface } from '../../../kul-canvas/kul-canvas-declarations';
import { KulShowcaseDynamicExampleType } from '../../kul-showcase-declarations';

export const CANVAS_EXAMPLES_KEYS = ['simple', 'style'] as const;

export interface CanvasExample extends KulCanvasPropsInterface {
    ['data-description']: string;
    ['data-dynamic']?: KulShowcaseDynamicExampleType;
    className: string;
}

export type CanvasData = {
    [K in (typeof CANVAS_EXAMPLES_KEYS)[number]]: Partial<CanvasExample>;
};
