export interface KulScrollOnHoverElement extends HTMLElement {
    scrollOnHover: {
        active: boolean;
        children: NodeListOf<HTMLElement>;
        percentages: KulScrollOnHoverPercentages;
        rect: DOMRect;
        step?: number;
        vertical: boolean;
        x: number;
        y: number;
    };
}
export interface KulScrollOnHoverPercentages {
    back: number;
    forward: number;
}
export enum ScrollOnHoverDirection {
    BOTTOM = 'bottom',
    LEFT = 'left',
    RIGHT = 'right',
    TOP = 'top',
}
