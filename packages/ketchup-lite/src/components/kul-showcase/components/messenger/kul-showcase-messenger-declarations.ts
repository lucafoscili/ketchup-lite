import { KulMessengerPropsInterface } from '../../../kul-messenger/kul-messenger-declarations';
import { KulShowcaseDynamicExampleType } from '../../kul-showcase-declarations';

export const MESSENGER_EXAMPLES_KEYS = ['simple', 'style'] as const;

export interface MessengerExample extends KulMessengerPropsInterface {
    ['data-description']: string;
    ['data-dynamic']?: KulShowcaseDynamicExampleType;
}

export type MessengerData = {
    [K in (typeof MESSENGER_EXAMPLES_KEYS)[number]]: MessengerExample;
};
