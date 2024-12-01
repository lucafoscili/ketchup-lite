import { KulMasonryPropsInterface } from '../../../kul-masonry/kul-masonry-declarations';
import { KulShowcaseDynamicExampleType } from '../../kul-showcase-declarations';

export const MASONRY_EXAMPLES_KEYS = ['selectable', 'simple', 'style'] as const;

export interface MasonryExample extends KulMasonryPropsInterface {
  ['data-description']: string;
  ['data-dynamic']?: KulShowcaseDynamicExampleType;
}

export type MasonryData = {
  [K in (typeof MASONRY_EXAMPLES_KEYS)[number]]: MasonryExample;
};
