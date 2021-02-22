export interface GenericObject {
    [index: string]: any;
}

export interface Identifiable {
    id?: string;
}
/**
 * Props in common with every f-component.
 */
export interface FComponent {
    id?: string;
    title?: string;
    wrapperClass?: string;
}
