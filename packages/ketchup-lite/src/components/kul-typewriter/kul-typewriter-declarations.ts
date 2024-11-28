import { KulEventPayload } from '../../types/GenericTypes';

//#region Events
export type KulTypewriterEvent = 'ready' | 'unmount';
export interface KulTypewriterEventPayload
    extends KulEventPayload<'KulTypewriter', KulTypewriterEvent> {}
//#endregion

//#region Props
export enum KulTypewriterProps {
    kulCursor = 'Enables or disables the blinking cursor.',
    kulDeleteSpeed = 'Sets the deleting speed in milliseconds.',
    kulLoop = 'Enables or disables looping of the text.',
    kulPause = 'Sets the duration of the pause after typing a complete text.',
    kulSpeed = 'Sets the typing speed in milliseconds.',
    kulStyle = 'Custom style of the component.',
    kulValue = 'Sets the text or array of texts to display with the typewriter effect.',
}
export interface KulTypewriterPropsInterface {
    kulCursor?: boolean;
    kulDeleteSpeed?: number;
    kulLoop?: boolean;
    kulPause?: number;
    kulSpeed?: number;
    kulStyle?: string;
    kulValue?: KulTypewriterValue;
}
export type KulTypewriterValue = string | string[];
//#endregion
