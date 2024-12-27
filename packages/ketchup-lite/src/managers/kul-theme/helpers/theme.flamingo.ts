import { KulThemeElement } from "../kul-theme-declarations";
import { KUL_THEME_FONTFACE } from "./contants";

export const FLAMINGO: KulThemeElement = {
  cssVariables: {
    "--kul-primary-color": "#e88aab",
    "--kul-secondary-color": "#7f00e7",
    "--kul-background-color": "#222222",
    "--kul-header-background-color": "#2d2d2d",
    "--kul-header-color": "#ffffff",
    "--kul-drawer-background-color": "#1f1f1f",
    "--kul-drawer-color": "#f5f5f5",
    "--kul-header-height": "64px",
    "--kul-drawer-width": "300px",
    "--kul-font-family": "Mali, cursive;",
    "--kul-font-family-monospace": "Roboto Mono, consolas, monospace",
    "--kul-font-size": "14px",
    "--kul-text-color": "#f5f5f5",
    "--kul-text-on-primary-color": "#000000",
    "--kul-text-on-secondary-color": "#ffffff",
    "--kul-disabled-background-color": "#3c3c3c",
    "--kul-disabled-color": "#7e7e7e",
    "--kul-title-background-color": "#111111",
    "--kul-title-color": "#f5f5f5",
    "--kul-icon-color": "#e0e0e0",
    "--kul-border-color": "#535353",
    "--kul-box-shadow": "0px 0px 7.5px 0px rgba(128, 128, 128, 0.5)",
    "--kul-info-color": "#2592df",
    "--kul-success-color": "#4d9f02",
    "--kul-warning-color": "#ffc107",
    "--kul-danger-color": "#d91e18",
    "--kul-spinner-color": "#ffd0d8",
    "--kul-chart-color-1": "#e88aab",
    "--kul-chart-color-2": "#dc5584",
    "--kul-chart-color-3": "#c21350",
    "--kul-chart-color-4": "#c88da1",
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
  font: [KUL_THEME_FONTFACE.mali],
  isDark: true,
};
