import { KulThemeList } from "../kul-theme-declarations";
import { CINDER } from "./cinder.theme";
import { COBALT } from "./cobalt.theme";
import { FLAMINGO } from "./flamingo.theme";
import { GRAPHITE } from "./graphite.theme";
import { KETCHUP } from "./ketchup.theme";
import { NIGHT } from "./night.theme";
import { OBSIDIAN } from "./obsidian.theme";
import { OCEAN } from "./ocean.theme";
import { RAJ } from "./raj.theme";
import { RED } from "./red.theme";
import { SAPPHIRE } from "./sapphire.theme";
import { SILVER } from "./silver.theme";
import { SNOW } from "./snow.theme";
import { TEAL } from "./teal.theme";
import { prepKulThemeColors, prepKulThemeIcons } from "./utils";
import { WILDLIFE } from "./wildlife.theme";

//#region Colors
export const KUL_THEME_COLORS = prepKulThemeColors({
  primary: "--kul-primary-color",
  secondary: "--kul-secondary-color",
  background: "--kul-background-color",
  navBar: "--kul-header-color",
  navBarBackground: "--kul-header-background-color",
  drawer: "--kul-drawer-color",
  drawerBackground: "--kul-drawer-background-color",
  text: "--kul-text-color",
  textOnPrimary: "--kul-text-on-primary-color",
  textOnSecondary: "--kul-text-on-secondary-color",
  disabledBackground: "--kul-disabled-background-color",
  disabled: "--kul-disabled-color",
  titleBackground: "--kul-title-background-color",
  title: "--kul-title-color",
  icon: "--kul-icon-color",
  border: "--kul-border-color",
  info: "--kul-info-color",
  success: "--kul-success-color",
  warning: "--kul-warning-color",
  danger: "--kul-danger-color",
  spinner: "--kul-spinner-color",
  chart1: "--kul-chart-color-1",
  chart2: "--kul-chart-color-2",
  chart3: "--kul-chart-color-3",
  chart4: "--kul-chart-color-4",
});
//#endregion

//#region Fonts
export const KUL_THEME_FONTS = {
  abel: "Abel",
  blinker: "Blinker",
  crimsonText: "CrimsonText",
  firaCode: "FiraCode",
  ibmPlex: "IBMPlexSans",
  inter: "Inter",
  lato: "Lato",
  mali: "Mali",
  openSans: "Open_Sans",
  oswald: "Oswald",
  publicSans: "PublicSans",
  rajdhani: "Rajdhani",
  ubuntu: "Ubuntu",
} as const;
//#endregion;

//#region Icons
export const KUL_THEME_ICONS = prepKulThemeIcons({
  ascending: "--kul-ascending-icon",
  clear: "--kul-clear-icon",
  collapsed: "--kul-collapsed-icon",
  descending: "--kul-descending-icon",
  dropdown: "--kul-dropdown-icon",
  expanded: "--kul-expanded-icon",
  filterRemove: "--kul-filter-remove-icon",
  key: "--kul-key-icon",
  search: "--kul-search-icon",
  warning: "--kul-warning-icon",
});
//#endregion;

//#region Attribute
export const KUL_THEME_ATTRIBUTE = {
  dark: "kul-dark-theme",
  light: "kul-light-theme",
} as const;
//#endregion;

//#region Theme list
export const THEME_LIST: KulThemeList = {
  cinder: CINDER,
  cobalt: COBALT,
  flamingo: FLAMINGO,
  graphite: GRAPHITE,
  ketchup: KETCHUP,
  night: NIGHT,
  obsidian: OBSIDIAN,
  ocean: OCEAN,
  raj: RAJ,
  red: RED,
  sapphire: SAPPHIRE,
  silver: SILVER,
  snow: SNOW,
  teal: TEAL,
  wildlife: WILDLIFE,
} as const;
//#endregion