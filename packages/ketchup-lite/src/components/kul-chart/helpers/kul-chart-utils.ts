import { kulManagerSingleton } from "src";

//#region applyOpacity
export const applyOpacity = (color: string, opacity: string) =>
  `${color}${opacity}`;
//#endregion

//#region getHexColor
export const getHexColor = (color: string) => {
  const { theme } = kulManagerSingleton;
  return theme.colorCheck(color).hexColor;
};
//#endregion
