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
export type ScrollOnHoverDirection = "bottom" | "left" | "right" | "top";
