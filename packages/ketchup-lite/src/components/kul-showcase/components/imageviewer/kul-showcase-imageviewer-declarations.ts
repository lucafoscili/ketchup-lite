import { KulImageviewerPropsInterface } from '../../../kul-imageviewer/kul-imageviewer-declarations';
import { KulShowcaseDynamicExampleType } from '../../kul-showcase-declarations';

export const IMAGEVIEWER_EXAMPLES_KEYS = ['simple', 'style'] as const;

export interface ImageviewerExample extends KulImageviewerPropsInterface {
    ['data-description']: string;
    ['data-dynamic']?: KulShowcaseDynamicExampleType;
}

export type ImageviewerData = {
    [K in (typeof IMAGEVIEWER_EXAMPLES_KEYS)[number]]: ImageviewerExample;
};
