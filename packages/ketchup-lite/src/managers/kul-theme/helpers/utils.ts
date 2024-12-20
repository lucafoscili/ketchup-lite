import { KulThemeCSSVariables, KulThemeIcons } from "../kul-theme-declarations";

export function prepKulThemeColors<
  T extends Record<string, keyof KulThemeCSSVariables>,
>(colors: T): Readonly<T> {
  return colors;
}

export function prepKulThemeIcons<
  T extends Record<string, keyof KulThemeIcons>,
>(icons: T): Readonly<T> {
  return icons;
}
