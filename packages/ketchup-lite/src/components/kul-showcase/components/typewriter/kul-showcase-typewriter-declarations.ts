import { KulTypewriterPropsInterface } from '../../../kul-typewriter/kul-typewriter-declarations';
import { KulShowcaseDynamicExampleType } from '../../kul-showcase-declarations';

export const TYPEWRITER_EXAMPLES_KEYS = ['simple', 'style'] as const;

export interface TypewriterExample extends KulTypewriterPropsInterface {
    ['data-description']: string;
    ['data-dynamic']?: KulShowcaseDynamicExampleType;
}

export type TypewriterData = {
    [K in (typeof TYPEWRITER_EXAMPLES_KEYS)[number]]: TypewriterExample;
};
