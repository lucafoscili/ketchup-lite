export const kulDynamicPositionAttribute = "kul-dynamic-position";
export const kulDynamicPositionAnchorAttribute = "kul-dynamic-position-anchor";
export type KulDynamicPositionAnchor =
  | HTMLElement
  | KulDynamicPositionCoordinates;
export interface KulDynamicPositionElement extends HTMLElement {
  kulDynamicPosition?: {
    anchor: KulDynamicPositionAnchor;
    detach: boolean;
    margin: number;
    originalPath: HTMLElement[];
    placement: KulDynamicPositionPlacement;
    rAF: number;
  };
}
export interface KulDynamicPositionCoordinates {
  x: number;
  y: number;
}
export type KulDynamicPositionPlacement =
  | ""
  | "b"
  | "bl"
  | "br"
  | "l"
  | "r"
  | "t"
  | "tl"
  | "tr";
