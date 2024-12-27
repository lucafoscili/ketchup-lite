import { GenericMap } from "src/types/GenericTypes";

export interface KulThemeList {
  [index: string]: KulThemeElement;
}
export interface KulThemeElement {
  cssVariables: KulThemeCSSVariables;
  customStyles?: GenericMap;
  font?: string[];
  icons: KulThemeIcons;
  isDark: boolean;
}
export type KulThemeBEMModifier = Record<string, boolean>;
export type KulThemeChartColorKey = `--kul-chart-color-${number}`;
export type KulThemeAllChartColorKeys = KulThemeChartColorKey[];
export type KulThemeChartColors = {
  [K in KulThemeAllChartColorKeys[number]]: string;
};
export interface KulThemeCSSVariables extends KulThemeColors, KulThemeFonts {}
export interface KulThemeColors extends KulThemeChartColors {
  "--kul-background-color": string;
  "--kul-border-color": string;
  "--kul-danger-color": string;
  "--kul-disabled-background-color": string;
  "--kul-disabled-color": string;
  "--kul-drawer-background-color": string;
  "--kul-drawer-color": string;
  "--kul-header-background-color": string;
  "--kul-header-color": string;
  "--kul-icon-color": string;
  "--kul-info-color": string;
  "--kul-primary-color": string;
  "--kul-secondary-color": string;
  "--kul-spinner-color": string;
  "--kul-success-color": string;
  "--kul-text-color": string;
  "--kul-text-on-primary-color": string;
  "--kul-text-on-secondary-color": string;
  "--kul-title-background-color": string;
  "--kul-title-color": string;
  "--kul-warning-color": string;
}
export interface KulThemeIcons {
  "--kul-ascending-icon": string;
  "--kul-clear-icon": string;
  "--kul-collapsed-icon": string;
  "--kul-descending-icon": string;
  "--kul-dropdown-icon": string;
  "--kul-expanded-icon": string;
  "--kul-filter-remove-icon": string;
  "--kul-key-icon": string;
  "--kul-search-icon": string;
  "--kul-warning-icon": string;
}
export interface KulThemeFonts {
  "--kul-font-family": string;
  "--kul-font-family-monospace": string;
  "--kul-font-size": string;
  "--kul-header-height": string;
  "--kul-header-zindex": number;
  "--kul-box-shadow": string;
  "--kul-card-zindex": number;
  "--kul-drawer-width": string;
  "--kul-drawer-zindex": number;
}
export interface KulThemeColor {
  hexColor: string;
  hslColor: string;
  hslValues: string;
  hue: string;
  lightness: string;
  saturation: string;
  rgbColor: string;
  rgbValues: string;
}
export interface KulThemeRGBValues {
  r: number;
  g: number;
  b: number;
}
export interface KulThemeHSLValues {
  h: number;
  s: number;
  l: number;
}
