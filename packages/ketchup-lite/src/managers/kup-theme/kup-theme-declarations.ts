import { GenericObject, KupTagNames } from '../../types/GenericTypes';

/**
 * Variable used to fetch the MASTER customStyle (used in every component).
 */
export const masterCustomStyle = 'MASTER';
/**
 * Components using the MDC ripple effect.
 */
export const rippleUsers = [
    KupTagNames.ACCORDION,
    KupTagNames.CARD,
    KupTagNames.IMAGE_LIST,
    KupTagNames.TAB_BAR,
    KupTagNames.TREE,
];
/**
 * Interface of the themes JSON.
 */
export interface KupThemeJSON {
    [index: string]: KupThemeElement;
}
/**
 * Interface wrapping all the others.
 */
export interface KupThemeElement {
    cssVariables: KupThemeCSSVariables;
    icons: KupThemeIcons;
    customStyles?: GenericObject;
    imports?: string[];
}
/**
 * All CSS variables managed by KupTheme.
 */
export interface KupThemeCSSVariables {
    [KupThemeColorValues.PRIMARY]: string;
    [KupThemeColorValues.SECONDARY]: string;
    [KupThemeColorValues.BACKGROUND]: string;
    [KupThemeColorValues.NAV_BAR_BACKGROUND]: string;
    [KupThemeColorValues.NAV_BAR]: string;
    [KupThemeColorValues.DRAWER]: string;
    [KupThemeColorValues.DRAWER_BACKGROUND]: string;
    '--kup-navbar-height': string;
    '--kup-drawer-width': string;
    '--kup-font-family': string;
    '--kup-font-size': string;
    [KupThemeColorValues.TEXT]: string;
    [KupThemeColorValues.TEXT_ON_PRIMARY]: string;
    [KupThemeColorValues.DISABLED_BACKGROUND]: string;
    [KupThemeColorValues.DISABLED]: string;
    [KupThemeColorValues.HOVER_BACKGROUND]: string;
    [KupThemeColorValues.HOVER]: string;
    [KupThemeColorValues.TITLE_BACKGROUND]: string;
    [KupThemeColorValues.TITLE]: string;
    [KupThemeColorValues.ICON]: string;
    [KupThemeColorValues.BORDER]: string;
    '--kup-box-shadow': string;
    [KupThemeColorValues.INFO]: string;
    [KupThemeColorValues.SUCCESS]: string;
    [KupThemeColorValues.WARNING]: string;
    [KupThemeColorValues.DANGER]: string;
    [KupThemeColorValues.SPINNER]: string;
    [KupThemeColorValues.CHART_1]: string;
    [KupThemeColorValues.CHART_2]: string;
    [KupThemeColorValues.CHART_3]: string;
    [KupThemeColorValues.CHART_4]: string;
    '--kup-font-family-monospace': string;
    '--kup-obj-cursor': string;
    [KupThemeColorValues.TEXT_ON_SECONDARY]: string;
    '--kup-card-zindex': number;
    '--kup-drawer-zindex': number;
    '--kup-navbar-zindex': number;
}
/**
 * All icons managed by KupTheme.
 */
export interface KupThemeIcons {
    [KupThemeIconValues.ASCENDING]: string;
    [KupThemeIconValues.CLEAR]: string;
    [KupThemeIconValues.COLLAPSED]: string;
    [KupThemeIconValues.DESCENDING]: string;
    [KupThemeIconValues.DROPDOWN]: string;
    [KupThemeIconValues.EXPANDED]: string;
    [KupThemeIconValues.FILTER_REMOVE]: string;
}
/**
 * Object returned by the colorCheck method, containing hex/rgb/hsl CSS colors and rgb/hsl values.
 */
export interface KupThemeColor {
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
export interface KupThemeRGBValues {
    r: number;
    g: number;
    b: number;
}
/**
 * Interface of a color described by HSL colors.
 */
export interface KupThemeHSLValues {
    h: number;
    s: number;
    l: number;
}
/**
 * List of all colors.
 */
export enum KupThemeColorValues {
    PRIMARY = '--kup-primary-color',
    SECONDARY = '--kup-secondary-color',
    BACKGROUND = '--kup-background-color',
    NAV_BAR = '--kup-navbar-color',
    NAV_BAR_BACKGROUND = '--kup-navbar-background-color',
    DRAWER = '--kup-drawer-color',
    DRAWER_BACKGROUND = '--kup-drawer-background-color',
    TEXT = '--kup-text-color',
    TEXT_ON_PRIMARY = '--kup-text-on-primary-color',
    TEXT_ON_SECONDARY = '--kup-text-on-secondary-color',
    DISABLED_BACKGROUND = '--kup-disabled-background-color',
    DISABLED = '--kup-disabled-color',
    HOVER_BACKGROUND = '--kup-hover-background-color',
    HOVER = '--kup-hover-color',
    TITLE_BACKGROUND = '--kup-title-background-color',
    TITLE = '--kup-title-color',
    ICON = '--kup-icon-color',
    BORDER = '--kup-border-color',
    INFO = '--kup-info-color',
    SUCCESS = '--kup-success-color',
    WARNING = '--kup-warning-color',
    DANGER = '--kup-danger-color',
    SPINNER = '--kup-spinner-color',
    CHART_1 = '--kup-chart-color-1',
    CHART_2 = '--kup-chart-color-2',
    CHART_3 = '--kup-chart-color-3',
    CHART_4 = '--kup-chart-color-4',
}
/**
 * List of all icons.
 */
export enum KupThemeIconValues {
    ASCENDING = '--kup-ascending-icon',
    CLEAR = '--kup-clear-icon',
    COLLAPSED = '--kup-collapsed-icon',
    DESCENDING = '--kup-descending-icon',
    DROPDOWN = '--kup-dropdown-icon',
    EXPANDED = '--kup-expanded-icon',
    FILTER_REMOVE = '--kup-filter-remove-icon',
    KEY = '--kup-key-icon',
    SEARCH = '--kup-search-icon',
}
