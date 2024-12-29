import { KulPortalPlacement } from "../kul-portal-declarations";

export const KUL_PORTAL_PLACEMENTS: {
  [index: string]: KulPortalPlacement;
} = {
  auto: "auto",
  bottom: "b",
  bottomLeft: "bl",
  bottomRight: "br",
  left: "l",
  right: "r",
  top: "t",
  topLeft: "tl",
  topRight: "tr",
} as const;
