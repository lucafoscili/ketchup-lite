import { KulDynamicPositionPlacement } from "../kul-dynamic-position-declarations";

export const KUL_DYNAMIC_POSITION: {
  [index: string]: KulDynamicPositionPlacement;
} = {
  auto: "",
  bottom: "b",
  bottomLeft: "bl",
  bottomRight: "br",
  left: "l",
  right: "r",
  top: "t",
  topLeft: "tl",
  topRight: "tr",
} as const;
