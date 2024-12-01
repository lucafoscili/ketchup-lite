import { KulProgressbarPropsInterface } from '../../../kul-progressbar/kul-progressbar-declarations';
import { KulShowcaseDynamicExampleType } from '../../kul-showcase-declarations';

export const PROGRESSBAR_EXAMPLES_KEYS = [
  'animated',
  'centeredLabel',
  'colors',
  'icon',
  'isRadial',
  'isRadialIcon',
  'label',
  'padded',
  'slim',
  'style',
] as const;

export interface ProgressbarExample extends KulProgressbarPropsInterface {
  className?: string;
  ['data-description']: string;
  ['data-dynamic']?: KulShowcaseDynamicExampleType;
}

export type ProgressbarData = {
  [K in (typeof PROGRESSBAR_EXAMPLES_KEYS)[number]]: ProgressbarExample;
};
