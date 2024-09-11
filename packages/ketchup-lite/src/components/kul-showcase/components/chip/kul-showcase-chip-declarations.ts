import { KulChipPropsInterface } from '../../../kul-chip/kul-chip-declarations';
import { KulShowcaseDynamicExampleType } from '../../kul-showcase-declarations';

export const CHIP_EXAMPLES_KEYS = [
    'children',
    'choice',
    'colors',
    'filter',
    'input',
    'standard',
    'style',
] as const;

export interface ChipExample extends KulChipPropsInterface {
    ['data-description']: string;
    ['data-dynamic']?: KulShowcaseDynamicExampleType;
}

export type ChipData = {
    [K in (typeof CHIP_EXAMPLES_KEYS)[number]]: ChipExample;
};
