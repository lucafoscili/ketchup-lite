import { GenericObject } from '../../types/GenericTypes';

/**
 * Variable used to fetch the MASTER customStyle (used in every component).
 */
export const masterCustomStyle = 'MASTER';
/**
 * Interface of the themes JSON.
 */
export interface KulThemeJSON {
    [index: string]: KulThemeElement;
}
/**
 * Interface wrapping all the others.
 */
export interface KulThemeElement {
    cssVariables: KulThemeCSSVariables;
    icons: KulThemeIcons;
    isDark: boolean;
    customStyles?: GenericObject;
    imports?: string[];
}
// Represents a chart color key
export type KulThemeChartColorKey = `--kul-chart-color-${number}`;
// Define a type that represents all possible chart color keys
export type KulThemeAllChartColorKeys = KulThemeChartColorKey[];
// Represents the CSS variables for chart colors
export type KulThemeChartColorCSSVariables = {
    [K in KulThemeAllChartColorKeys[number]]: string;
};
/**
 * All CSS variables managed by KulTheme.
 */
export interface KulThemeCSSVariables extends KulThemeChartColorCSSVariables {
    [KulThemeColorValues.PRIMARY]: string;
    [KulThemeColorValues.SECONDARY]: string;
    [KulThemeColorValues.BACKGROUND]: string;
    [KulThemeColorValues.NAV_BAR_BACKGROUND]: string;
    [KulThemeColorValues.NAV_BAR]: string;
    [KulThemeColorValues.DRAWER]: string;
    [KulThemeColorValues.DRAWER_BACKGROUND]: string;
    '--kul-header-height': string;
    '--kul-drawer-width': string;
    '--kul-font-family': string;
    '--kul-font-size': string;
    [KulThemeColorValues.TEXT]: string;
    [KulThemeColorValues.TEXT_ON_PRIMARY]: string;
    [KulThemeColorValues.DISABLED_BACKGROUND]: string;
    [KulThemeColorValues.DISABLED]: string;
    [KulThemeColorValues.TITLE_BACKGROUND]: string;
    [KulThemeColorValues.TITLE]: string;
    [KulThemeColorValues.ICON]: string;
    [KulThemeColorValues.BORDER]: string;
    '--kul-box-shadow': string;
    [KulThemeColorValues.INFO]: string;
    [KulThemeColorValues.SUCCESS]: string;
    [KulThemeColorValues.WARNING]: string;
    [KulThemeColorValues.DANGER]: string;
    [KulThemeColorValues.SPINNER]: string;
    '--kul-font-family-monospace': string;
    '--kul-obj-cursor': string;
    [KulThemeColorValues.TEXT_ON_SECONDARY]: string;
    '--kul-card-zindex': number;
    '--kul-drawer-zindex': number;
    '--kul-header-zindex': number;
}
/**
 * All icons managed by KulTheme.
 */
export interface KulThemeIcons {
    [KulThemeIconValues.ASCENDING]: string;
    [KulThemeIconValues.CLEAR]: string;
    [KulThemeIconValues.COLLAPSED]: string;
    [KulThemeIconValues.DESCENDING]: string;
    [KulThemeIconValues.DROPDOWN]: string;
    [KulThemeIconValues.EXPANDED]: string;
    [KulThemeIconValues.KEY]: string;
    [KulThemeIconValues.FILTER_REMOVE]: string;
    [KulThemeIconValues.SEARCH]: string;
    [KulThemeIconValues.WARNING]: string;
}
/**
 * Object returned by the colorCheck method, containing hex/rgb/hsl CSS colors and rgb/hsl values.
 */
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
/**
 * Interface of a color described by RGB colors.
 */
export interface KulThemeRGBValues {
    r: number;
    g: number;
    b: number;
}
/**
 * Interface of a color described by HSL colors.
 */
export interface KulThemeHSLValues {
    h: number;
    s: number;
    l: number;
}
/**
 * List of all colors.
 */
export enum KulThemeColorValues {
    PRIMARY = '--kul-primary-color',
    SECONDARY = '--kul-secondary-color',
    BACKGROUND = '--kul-background-color',
    NAV_BAR = '--kul-header-color',
    NAV_BAR_BACKGROUND = '--kul-header-background-color',
    DRAWER = '--kul-drawer-color',
    DRAWER_BACKGROUND = '--kul-drawer-background-color',
    TEXT = '--kul-text-color',
    TEXT_ON_PRIMARY = '--kul-text-on-primary-color',
    TEXT_ON_SECONDARY = '--kul-text-on-secondary-color',
    DISABLED_BACKGROUND = '--kul-disabled-background-color',
    DISABLED = '--kul-disabled-color',
    HOVER_BACKGROUND = '--kul-hover-background-color',
    HOVER = '--kul-hover-color',
    TITLE_BACKGROUND = '--kul-title-background-color',
    TITLE = '--kul-title-color',
    ICON = '--kul-icon-color',
    BORDER = '--kul-border-color',
    INFO = '--kul-info-color',
    SUCCESS = '--kul-success-color',
    WARNING = '--kul-warning-color',
    DANGER = '--kul-danger-color',
    SPINNER = '--kul-spinner-color',
    CHART_1 = '--kul-chart-color-1',
    CHART_2 = '--kul-chart-color-2',
    CHART_3 = '--kul-chart-color-3',
    CHART_4 = '--kul-chart-color-4',
}
/**
 * List of all icons.
 */
export enum KulThemeIconValues {
    ASCENDING = '--kul-ascending-icon',
    CLEAR = '--kul-clear-icon',
    COLLAPSED = '--kul-collapsed-icon',
    DESCENDING = '--kul-descending-icon',
    DROPDOWN = '--kul-dropdown-icon',
    EXPANDED = '--kul-expanded-icon',
    FILTER_REMOVE = '--kul-filter-remove-icon',
    KEY = '--kul-key-icon',
    SEARCH = '--kul-search-icon',
    WARNING = '--kul-warning-icon',
}
