import { KulThemeElement } from "../kul-theme-declarations";
import { KUL_THEME_FONTS } from "./contants";

export const OBSIDIAN: KulThemeElement = {
  cssVariables: {
    "--kul-primary-color": "#8b1a2e",
    "--kul-secondary-color": "#8c8c8c",
    "--kul-background-color": "#ffffff",
    "--kul-header-background-color": "#1a1a1a",
    "--kul-header-color": "#ffffff",
    "--kul-drawer-background-color": "#f2f2f2",
    "--kul-font-family": "IBM Plex Sans, sans-serif",
    "--kul-text-color": "#333333",
    "--kul-icon-color": "#c1c1c1",
    "--kul-border-color": "#bbbbbb",
    "--kul-box-shadow": "0px 4px 12px rgba(0, 0, 0, 0.1)",
    "--kul-chart-color-1": "#a35761",
    "--kul-chart-color-2": "#63707e",
    "--kul-chart-color-3": "#9e9e9e",
    "--kul-chart-color-4": "#4a4a4a",
    "--kul-drawer-color": "#4c4c4d",
    "--kul-header-height": "64px",
    "--kul-drawer-width": "300px",
    "--kul-font-family-monospace": "Courier New, Courier, monospace",
    "--kul-font-size": "13px",
    "--kul-text-on-primary-color": "#ffffff",
    "--kul-text-on-secondary-color": "#a6192e",
    "--kul-disabled-background-color": "#ffffff",
    "--kul-disabled-color": "#4c4c4d",
    "--kul-title-background-color": "#068a9c",
    "--kul-title-color": "#ffffff",
    "--kul-info-color": "#2592df",
    "--kul-success-color": "#4d9f02",
    "--kul-warning-color": "#ffc107",
    "--kul-danger-color": "#A6192E",
    "--kul-spinner-color": "#a6192e",
    "--kul-chart-color-5": "yellow",
    "--kul-chart-color-6": "cyan",
    "--kul-chart-color-7": "brown",
    "--kul-chart-color-8": "magenta",
    "--kul-chart-color-9": "grey",
    "--kul-chart-color-10": "indigo",
    "--kul-card-zindex": 900,
    "--kul-drawer-zindex": 900,
    "--kul-header-zindex": 900,
  },
  icons: {
    "--kul-ascending-icon": "arrow_drop_up",
    "--kul-descending-icon": "arrow_drop_down",
    "--kul-expanded-icon": "arrow_drop_down",
    "--kul-collapsed-icon": "menu-right",
    "--kul-dropdown-icon": "arrow_drop_down",
    "--kul-clear-icon": "cancel",
    "--kul-filter-remove-icon": "filter-remove",
    "--kul-key-icon": "key-variant",
    "--kul-search-icon": "search",
    "--kul-warning-icon": "warning",
  },
  font: [KUL_THEME_FONTS.ibmPlex],
  isDark: false,
};