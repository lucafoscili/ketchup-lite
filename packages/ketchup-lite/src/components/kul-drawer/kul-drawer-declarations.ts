export type KulDrawerEvent = 'close' | 'open' | 'ready';

export enum KulDrawerProps {
    kulStyle = 'Custom style of the component.',
}

export interface KulDrawerPropsInterface {
    kulStyle?: string;
}
