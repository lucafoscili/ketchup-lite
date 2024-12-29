import { KulManagerClickCb } from "../kul-manager/kul-manager-declarations";

export type KulPortalAnchor = HTMLElement | KulPortalCoordinates;
export interface KulPortalState {
  anchor: KulPortalAnchor;
  dismissCb: KulManagerClickCb;
  margin: number;
  parent: HTMLElement;
  placement: KulPortalPlacement;
}
export interface KulPortalCoordinates {
  x: number;
  y: number;
}
export type KulPortalPlacement =
  | "auto"
  | "b"
  | "bl"
  | "br"
  | "l"
  | "r"
  | "t"
  | "tl"
  | "tr";
