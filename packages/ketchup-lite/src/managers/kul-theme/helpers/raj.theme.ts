import { KulThemeElement } from "../kul-theme-declarations";
import { KUL_THEME_FONTS } from "./contants";

export const RAJ: KulThemeElement = {
  cssVariables: {
    "--kul-primary-color": "rgb(187, 198, 5)",
    "--kul-secondary-color": "#ffe600",
    "--kul-background-color": "#000000",
    "--kul-header-background-color": "#000000",
    "--kul-header-color": "#ffffff",
    "--kul-drawer-background-color": "#000000",
    "--kul-drawer-color": "#ffffff",
    "--kul-header-height": "64px",
    "--kul-drawer-width": "300px",
    "--kul-font-family": "'Rajdhani', sans-serif",
    "--kul-font-family-monospace": "Roboto Mono, consolas, monospace",
    "--kul-font-size": "15px",
    "--kul-text-color": "#ffffff",
    "--kul-text-on-primary-color": "#000000",
    "--kul-text-on-secondary-color": "#000000",
    "--kul-disabled-background-color": "#151515",
    "--kul-disabled-color": "#7b7b7b",
    "--kul-title-background-color": "#ffe600",
    "--kul-title-color": "#000000",
    "--kul-icon-color": "#9d9d9d",
    "--kul-border-color": "#9d9d9d",
    "--kul-box-shadow": "0px 0px 7.5px 0px rgba(128, 128, 128, 0.5)",
    "--kul-info-color": "#2592df",
    "--kul-success-color": "#4d9f02",
    "--kul-warning-color": "#ffc107",
    "--kul-danger-color": "#d91e18",
    "--kul-spinner-color": "#ffe600",
    "--kul-chart-color-1": "#ffffff",
    "--kul-chart-color-2": "rgb(187, 198, 5)",
    "--kul-chart-color-3": "#ffe600",
    "--kul-chart-color-4": "#effd02",
    "--kul-card-zindex": 900,
    "--kul-drawer-zindex": 900,
    "--kul-header-zindex": 900,
  },
  icons: {
    "--kul-ascending-icon": "sort-ascending",
    "--kul-descending-icon": "sort-descending",
    "--kul-expanded-icon": "chevron-down",
    "--kul-collapsed-icon": "chevron_right",
    "--kul-dropdown-icon": "chevron-down",
    "--kul-clear-icon": "cancel",
    "--kul-filter-remove-icon": "filter-remove",
    "--kul-key-icon": "key-variant",
    "--kul-search-icon": "search",
    "--kul-warning-icon": "warning",
  },
  font: [KUL_THEME_FONTS.rajdhani],
  isDark: true,
};