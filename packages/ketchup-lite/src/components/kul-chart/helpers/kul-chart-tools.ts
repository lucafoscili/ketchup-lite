import { kulManagerInstance } from "src/managers/kul-manager/kul-manager";

//#region applyOpacity
export const applyOpacity = (color: string, opacity: string) =>
  `${color}${opacity}`;
//#endregion

//#region getHexColor
export const getHexColor = (color: string) => {
  const { theme } = kulManagerInstance();
  return theme.colorCheck(color).hexColor;
};
//#endregion
