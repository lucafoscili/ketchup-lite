import { KulComparePropsInterface } from '../../../kul-compare/kul-compare-declarations';
import { KulShowcaseDynamicExampleType } from '../../kul-showcase-declarations';

export const COMPARE_EXAMPLES_KEYS = ['simple', 'style'] as const;

export interface CompareExample extends KulComparePropsInterface {
  ['data-description']: string;
  ['data-dynamic']?: KulShowcaseDynamicExampleType;
}

export type CompareData = {
  [K in (typeof COMPARE_EXAMPLES_KEYS)[number]]: CompareExample;
};
