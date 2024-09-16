export type KulCodeEvent = 'ready';

export enum KulCodeProps {
    kulFormat = 'Automatically formats the value.',
    kulLanguage = 'Sets the language of the snippet.',
    kulPreserveSpaces = 'Whether to preserve spaces or not. When missing it is set automatically.',
    kulStyle = 'Custom style of the component.',
    kulValue = 'String containing the snippet of code to display.',
}

export interface KulCodePropsInterface {
    kulFormat?: boolean;
    kulLanguage?: string;
    kulPreserveSpaces?: boolean;
    kulStyle?: string;
    kulValue?: string;
}
