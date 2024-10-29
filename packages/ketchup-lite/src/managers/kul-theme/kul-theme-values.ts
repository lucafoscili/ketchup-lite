import { KulThemeFonts, KulThemeJSON } from './kul-theme-declarations';

export const themesJson: KulThemeJSON = {
    bubbles: {
        cssVariables: {
            '--kul-primary-color': '#c18f00',
            '--kul-secondary-color': '#1d1d1d',
            '--kul-background-color': '#ffffff',
            '--kul-header-background-color': '#beb08d',
            '--kul-header-color': '#ffffff',
            '--kul-drawer-background-color': '#ffffff',
            '--kul-drawer-color': '#000000',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-family': 'Lato, sans-serif',
            '--kul-font-family-monospace': 'Roboto Mono, consolas, monospace',
            '--kul-font-size': '14px',
            '--kul-text-color': '#2e2e2e',
            '--kul-text-on-primary-color': '#ffffff',
            '--kul-text-on-secondary-color': '#ffffff',
            '--kul-disabled-background-color': '#eaeaea',
            '--kul-disabled-color': '#5c5c5c',
            '--kul-title-background-color': '#f1f3f4',
            '--kul-title-color': '#2e2e2e',
            '--kul-icon-color': '#505050',
            '--kul-border-color': '#e0e0e0',
            '--kul-box-shadow':
                'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#d91e18',
            '--kul-spinner-color': '#1D1D1B',
            '--kul-chart-color-1': '#ff5959',
            '--kul-chart-color-2': '#e0a0a0',
            '--kul-chart-color-3': '#8e1010',
            '--kul-chart-color-4': '#f5f5dc',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        icons: {
            '--kul-ascending-icon': 'sort-ascending',
            '--kul-descending-icon': 'sort-descending',
            '--kul-expanded-icon': 'chevron-down',
            '--kul-collapsed-icon': 'chevron_right',
            '--kul-dropdown-icon': 'chevron-down',
            '--kul-clear-icon': 'clear',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        font: [KulThemeFonts.LATO],
        isDark: false,
    },
    candy: {
        cssVariables: {
            '--kul-primary-color': '#ffffff',
            '--kul-secondary-color': '#e0e0e0',
            '--kul-background-color': '#f7f9fc',
            '--kul-header-background-color': '#ffffff',
            '--kul-header-color': '#333333',
            '--kul-drawer-background-color': '#ffffff',
            '--kul-drawer-color': '#333333',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-family': 'Inter, sans-serif',
            '--kul-font-family-monospace': 'Fira Code, monospace',
            '--kul-font-size': '16px',
            '--kul-text-color': '#333333',
            '--kul-text-on-primary-color': '#ffffff',
            '--kul-text-on-secondary-color': '#333333',
            '--kul-disabled-background-color': '#eaeaea',
            '--kul-disabled-color': '#9c9c9c',
            '--kul-title-background-color': '#ffffff',
            '--kul-title-color': '#333333',
            '--kul-icon-color': '#5a5a5a',
            '--kul-border-color': '#d3d3d3',
            '--kul-box-shadow': '0 8px 32px rgba(31, 38, 135, 0.2)',
            '--kul-info-color': '#56ccf2',
            '--kul-success-color': '#6fcf97',
            '--kul-warning-color': '#f2c94c',
            '--kul-danger-color': '#eb5757',
            '--kul-spinner-color': '#8e8e8e',
            '--kul-chart-color-1': '#56ccf2',
            '--kul-chart-color-2': '#bb6bd9',
            '--kul-chart-color-3': '#f2994a',
            '--kul-chart-color-4': '#27ae60',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        icons: {
            '--kul-ascending-icon': 'arrow_drop_up',
            '--kul-descending-icon': 'arrow_drop_down',
            '--kul-expanded-icon': 'arrow_drop_down',
            '--kul-collapsed-icon': 'menu-right',
            '--kul-dropdown-icon': 'arrow_drop_down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        font: [KulThemeFonts.INTER, KulThemeFonts.FIRA_CODE],
        isDark: false,
    },
    cinder: {
        cssVariables: {
            '--kul-primary-color': '#1e1e1e',
            '--kul-secondary-color': '#333333',
            '--kul-background-color': '#101010',
            '--kul-header-background-color': '#1b1b1b',
            '--kul-header-color': '#e0e0e0',
            '--kul-drawer-background-color': '#1b1b1b',
            '--kul-drawer-color': '#e0e0e0',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-family': 'Inter, sans-serif',
            '--kul-font-family-monospace': 'Fira Code, monospace',
            '--kul-font-size': '16px',
            '--kul-text-color': '#e0e0e0',
            '--kul-text-on-primary-color': '#1e1e1e',
            '--kul-text-on-secondary-color': '#e0e0e0',
            '--kul-disabled-background-color': '#333333',
            '--kul-disabled-color': '#666666',
            '--kul-title-background-color': '#2b2b2b',
            '--kul-title-color': '#e0e0e0',
            '--kul-icon-color': '#a1a1a1',
            '--kul-border-color': '#444444',
            '--kul-box-shadow': '0 8px 32px rgba(0, 0, 0, 0.4)',
            '--kul-info-color': '#56ccf2',
            '--kul-success-color': '#6fcf97',
            '--kul-warning-color': '#f2c94c',
            '--kul-danger-color': '#eb5757',
            '--kul-spinner-color': '#56ccf2',
            '--kul-chart-color-1': '#735DED',
            '--kul-chart-color-2': '#00B2CB',
            '--kul-chart-color-3': '#F2994A',
            '--kul-chart-color-4': '#27ae60',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        icons: {
            '--kul-ascending-icon': 'arrow_drop_up',
            '--kul-descending-icon': 'arrow_drop_down',
            '--kul-expanded-icon': 'arrow_drop_down',
            '--kul-collapsed-icon': 'menu-right',
            '--kul-dropdown-icon': 'arrow_drop_down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        font: [KulThemeFonts.INTER, KulThemeFonts.FIRA_CODE],
        isDark: true,
    },

    cobalt: {
        cssVariables: {
            '--kul-primary-color': '#248aff',
            '--kul-secondary-color': '#65cbe9',
            '--kul-background-color': '#222222',
            '--kul-header-background-color': '#131313',
            '--kul-header-color': '#65cbe9',
            '--kul-drawer-background-color': '#2e2e2e',
            '--kul-drawer-color': '#65cbe9',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-family': 'Blinker, sans-serif;',
            '--kul-font-family-monospace': 'Andalé Mono, monospace',
            '--kul-font-size': '14px',
            '--kul-text-color': '#65cbe9',
            '--kul-text-on-primary-color': '#f1f7ff',
            '--kul-text-on-secondary-color': '#000000',
            '--kul-disabled-background-color': '#3c3c3c',
            '--kul-disabled-color': '#7e7e7e',
            '--kul-title-background-color': '#2e2e2e',
            '--kul-title-color': '#f5f5f5',
            '--kul-icon-color': '#65cbe9',
            '--kul-border-color': '#535353',
            '--kul-box-shadow': '0px 0px 7.5px 0px rgba(128, 128, 128, 0.5)',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#d91e18',
            '--kul-spinner-color': '#a4d9f7',
            '--kul-chart-color-1': '#308aff',
            '--kul-chart-color-2': '#5eb6d1',
            '--kul-chart-color-3': '#b1eafb',
            '--kul-chart-color-4': '#ffffff',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        icons: {
            '--kul-ascending-icon': 'arrow_drop_up',
            '--kul-descending-icon': 'arrow_drop_down',
            '--kul-expanded-icon': 'arrow_drop_down',
            '--kul-collapsed-icon': 'menu-right',
            '--kul-dropdown-icon': 'arrow_drop_down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        font: [KulThemeFonts.BLINKER],
        isDark: true,
    },
    night: {
        cssVariables: {
            '--kul-primary-color': '#82f0e2',
            '--kul-secondary-color': '#f9ff00',
            '--kul-background-color': '#2d2d2d',
            '--kul-header-background-color': '#2d2d2d',
            '--kul-header-color': '#ffffff',
            '--kul-drawer-background-color': '#1f1f1f',
            '--kul-drawer-color': '#f5f5f5',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-family': 'Lato, sans-serif',
            '--kul-font-family-monospace': 'Roboto Mono, consolas, monospace',
            '--kul-font-size': '14px',
            '--kul-text-color': '#f5f5f5',
            '--kul-text-on-primary-color': '#555555',
            '--kul-text-on-secondary-color': '#000000',
            '--kul-disabled-background-color': '#3c3c3c',
            '--kul-disabled-color': '#7e7e7e',
            '--kul-title-background-color': '#111111',
            '--kul-title-color': '#f5f5f5',
            '--kul-icon-color': '#e0e0e0',
            '--kul-border-color': '#535353',
            '--kul-box-shadow': '0px 0px 7.5px 0px rgba(128, 128, 128, 0.5)',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#d91e18',
            '--kul-spinner-color': '#f2e114',
            '--kul-chart-color-1': '#60c3fc',
            '--kul-chart-color-2': '#e268d8',
            '--kul-chart-color-3': '#860bb5',
            '--kul-chart-color-4': '#1a83e4',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        icons: {
            '--kul-ascending-icon': 'arrow_drop_up',
            '--kul-descending-icon': 'arrow_drop_down',
            '--kul-expanded-icon': 'arrow_drop_down',
            '--kul-collapsed-icon': 'menu-right',
            '--kul-dropdown-icon': 'arrow_drop_down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        font: [KulThemeFonts.LATO],
        isDark: true,
    },
    flamingo: {
        cssVariables: {
            '--kul-primary-color': '#e88aab',
            '--kul-secondary-color': '#7f00e7',
            '--kul-background-color': '#222222',
            '--kul-header-background-color': '#2d2d2d',
            '--kul-header-color': '#ffffff',
            '--kul-drawer-background-color': '#1f1f1f',
            '--kul-drawer-color': '#f5f5f5',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-family': 'Mali, cursive;',
            '--kul-font-family-monospace': 'Roboto Mono, consolas, monospace',
            '--kul-font-size': '14px',
            '--kul-text-color': '#f5f5f5',
            '--kul-text-on-primary-color': '#000000',
            '--kul-text-on-secondary-color': '#ffffff',
            '--kul-disabled-background-color': '#3c3c3c',
            '--kul-disabled-color': '#7e7e7e',
            '--kul-title-background-color': '#111111',
            '--kul-title-color': '#f5f5f5',
            '--kul-icon-color': '#e0e0e0',
            '--kul-border-color': '#535353',
            '--kul-box-shadow': '0px 0px 7.5px 0px rgba(128, 128, 128, 0.5)',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#d91e18',
            '--kul-spinner-color': '#ffd0d8',
            '--kul-chart-color-1': '#e88aab',
            '--kul-chart-color-2': '#dc5584',
            '--kul-chart-color-3': '#c21350',
            '--kul-chart-color-4': '#c88da1',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        icons: {
            '--kul-ascending-icon': 'arrow_drop_up',
            '--kul-descending-icon': 'arrow_drop_down',
            '--kul-expanded-icon': 'arrow_drop_down',
            '--kul-collapsed-icon': 'menu-right',
            '--kul-dropdown-icon': 'arrow_drop_down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        font: [KulThemeFonts.MALI],
        isDark: true,
    },
    graphite: {
        cssVariables: {
            '--kul-primary-color': '#888888',
            '--kul-secondary-color': '#d91e18',
            '--kul-background-color': '#ffffff',
            '--kul-header-background-color': '#535353',
            '--kul-header-color': '#ffffff',
            '--kul-drawer-background-color': '#ffffff',
            '--kul-drawer-color': '#545454',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-family': 'Roboto, sans-serif',
            '--kul-font-family-monospace': 'Roboto Mono, consolas, monospace',
            '--kul-font-size': '13px',
            '--kul-text-color': '#545454',
            '--kul-text-on-primary-color': '#ffffff',
            '--kul-text-on-secondary-color': '#ffffff',
            '--kul-disabled-color': '#5c5c5c',
            '--kul-disabled-background-color': '#eaeaea',
            '--kul-title-background-color': '#f0f0f0',
            '--kul-title-color': '#545454',
            '--kul-icon-color': '#808080',
            '--kul-border-color': '#e0e0e0',
            '--kul-box-shadow': '0px 0px 7.5px 0px rgba(128, 128, 128, 0.5)',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#d91e18',
            '--kul-spinner-color': '#eaa710',
            '--kul-chart-color-1': 'red',
            '--kul-chart-color-2': 'blue',
            '--kul-chart-color-3': 'orange',
            '--kul-chart-color-4': 'green',
            '--kul-chart-color-5': 'yellow',
            '--kul-chart-color-6': 'cyan',
            '--kul-chart-color-7': 'brown',
            '--kul-chart-color-8': 'magenta',
            '--kul-chart-color-9': 'grey',
            '--kul-chart-color-10': 'indigo',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        customStyles: {
            'kul-BUTTON':
                '#kul-component button {\ntext-transform: unset;\n}\n\n',
        },
        icons: {
            '--kul-ascending-icon': 'arrow_drop_up',
            '--kul-descending-icon': 'arrow_drop_down',
            '--kul-expanded-icon': 'arrow_drop_down',
            '--kul-collapsed-icon': 'menu-right',
            '--kul-dropdown-icon': 'arrow_drop_down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        isDark: false,
    },
    ketchup: {
        cssVariables: {
            '--kul-primary-color': '#d64325',
            '--kul-secondary-color': '#a6192e',
            '--kul-background-color': '#ffffff',
            '--kul-header-background-color': '#2e2e2e',
            '--kul-header-color': '#ffffff',
            '--kul-drawer-background-color': '#ffffff',
            '--kul-drawer-color': '#595959',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-family': 'Ubuntu, sans-serif',
            '--kul-font-family-monospace': 'Roboto Mono, consolas, monospace',
            '--kul-font-size': '14px',
            '--kul-text-color': '#595959',
            '--kul-text-on-primary-color': '#ffffff',
            '--kul-text-on-secondary-color': '#ffffff',
            '--kul-disabled-background-color': '#eaeaea',
            '--kul-disabled-color': '#5c5c5c',
            '--kul-title-background-color': '#f1f3f4',
            '--kul-title-color': '#2e2e2e',
            '--kul-icon-color': '#505050',
            '--kul-border-color': '#e0e0e0',
            '--kul-box-shadow':
                'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#d91e18',
            '--kul-spinner-color': '#eaa710',
            '--kul-chart-color-1': '#ff5959',
            '--kul-chart-color-2': '#e0a0a0',
            '--kul-chart-color-3': '#8e1010',
            '--kul-chart-color-4': '#f5f5dc',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        icons: {
            '--kul-ascending-icon': 'sort-ascending',
            '--kul-descending-icon': 'sort-descending',
            '--kul-expanded-icon': 'chevron-down',
            '--kul-collapsed-icon': 'chevron_right',
            '--kul-dropdown-icon': 'chevron-down',
            '--kul-clear-icon': 'clear',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        font: [KulThemeFonts.UBUNTU],
        isDark: false,
    },
    obsidian: {
        cssVariables: {
            '--kul-primary-color': '#8b1a2e',
            '--kul-secondary-color': '#8c8c8c',
            '--kul-background-color': '#ffffff',
            '--kul-header-background-color': '#1a1a1a',
            '--kul-header-color': '#ffffff',
            '--kul-drawer-background-color': '#f2f2f2',
            '--kul-font-family': 'IBM Plex Sans, sans-serif',
            '--kul-text-color': '#333333',
            '--kul-icon-color': '#c1c1c1',
            '--kul-border-color': '#bbbbbb',
            '--kul-box-shadow': '0px 4px 12px rgba(0, 0, 0, 0.1)',
            '--kul-chart-color-1': '#a35761',
            '--kul-chart-color-2': '#63707e',
            '--kul-chart-color-3': '#9e9e9e',
            '--kul-chart-color-4': '#4a4a4a',
            '--kul-drawer-color': '#4c4c4d',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-family-monospace': 'Courier New, Courier, monospace',
            '--kul-font-size': '13px',
            '--kul-text-on-primary-color': '#ffffff',
            '--kul-text-on-secondary-color': '#a6192e',
            '--kul-disabled-background-color': '#ffffff',
            '--kul-disabled-color': '#4c4c4d',
            '--kul-title-background-color': '#068a9c',
            '--kul-title-color': '#ffffff',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#A6192E',
            '--kul-spinner-color': '#a6192e',
            '--kul-chart-color-5': 'yellow',
            '--kul-chart-color-6': 'cyan',
            '--kul-chart-color-7': 'brown',
            '--kul-chart-color-8': 'magenta',
            '--kul-chart-color-9': 'grey',
            '--kul-chart-color-10': 'indigo',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        icons: {
            '--kul-ascending-icon': 'arrow_drop_up',
            '--kul-descending-icon': 'arrow_drop_down',
            '--kul-expanded-icon': 'arrow_drop_down',
            '--kul-collapsed-icon': 'menu-right',
            '--kul-dropdown-icon': 'arrow_drop_down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        font: [KulThemeFonts.IBM_PLEX],
        isDark: false,
    },
    ocean: {
        cssVariables: {
            '--kul-primary-color': '#0074b7',
            '--kul-secondary-color': '#a2d5f2',
            '--kul-background-color': '#f0f8ff',
            '--kul-header-background-color': '#013a6b',
            '--kul-header-color': '#ffffff',
            '--kul-drawer-background-color': '#e1eff7',
            '--kul-font-family': 'Public Sans, sans-serif',
            '--kul-text-color': '#1e2a33',
            '--kul-icon-color': '#5a7da0',
            '--kul-border-color': '#b8d3e4',
            '--kul-box-shadow': '0px 2px 8px rgba(0, 0, 0, 0.1)',
            '--kul-chart-color-1': '#8fcfe3',
            '--kul-chart-color-2': '#a2b7cf',
            '--kul-chart-color-3': '#d9f1ff',
            '--kul-chart-color-4': '#93b1c4',
            '--kul-drawer-color': '#1b1b1b',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-family-monospace': 'Roboto Mono, consolas, monospace',
            '--kul-font-size': '16px',
            '--kul-text-on-primary-color': '#ffffff',
            '--kul-text-on-secondary-color': '#ffffff',
            '--kul-disabled-background-color': '#eaeaea',
            '--kul-disabled-color': '#5c5c5c',
            '--kul-title-background-color': '#f1f3f4',
            '--kul-title-color': '#1b1b1b',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#d91e18',
            '--kul-spinner-color': '#6edeff',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        icons: {
            '--kul-ascending-icon': 'arrow_drop_up',
            '--kul-descending-icon': 'arrow_drop_down',
            '--kul-expanded-icon': 'arrow_drop_down',
            '--kul-collapsed-icon': 'menu-right',
            '--kul-dropdown-icon': 'arrow_drop_down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        font: [KulThemeFonts.PUBLIC_SANS],
        isDark: false,
    },
    raj: {
        cssVariables: {
            '--kul-primary-color': 'rgb(187, 198, 5)',
            '--kul-secondary-color': '#ffe600',
            '--kul-background-color': '#000000',
            '--kul-header-background-color': '#000000',
            '--kul-header-color': '#ffffff',
            '--kul-drawer-background-color': '#000000',
            '--kul-drawer-color': '#ffffff',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-family': "'Rajdhani', sans-serif",
            '--kul-font-family-monospace': 'Roboto Mono, consolas, monospace',
            '--kul-font-size': '15px',
            '--kul-text-color': '#ffffff',
            '--kul-text-on-primary-color': '#000000',
            '--kul-text-on-secondary-color': '#000000',
            '--kul-disabled-background-color': '#151515',
            '--kul-disabled-color': '#7b7b7b',
            '--kul-title-background-color': '#ffe600',
            '--kul-title-color': '#000000',
            '--kul-icon-color': '#9d9d9d',
            '--kul-border-color': '#9d9d9d',
            '--kul-box-shadow': '0px 0px 7.5px 0px rgba(128, 128, 128, 0.5)',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#d91e18',
            '--kul-spinner-color': '#ffe600',
            '--kul-chart-color-1': '#ffffff',
            '--kul-chart-color-2': 'rgb(187, 198, 5)',
            '--kul-chart-color-3': '#ffe600',
            '--kul-chart-color-4': '#effd02',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        icons: {
            '--kul-ascending-icon': 'sort-ascending',
            '--kul-descending-icon': 'sort-descending',
            '--kul-expanded-icon': 'chevron-down',
            '--kul-collapsed-icon': 'chevron_right',
            '--kul-dropdown-icon': 'chevron-down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        font: [KulThemeFonts.RAJDHANI],
        isDark: true,
    },
    red: {
        cssVariables: {
            '--kul-primary-color': '#a6192e',
            '--kul-secondary-color': '#ffc107',
            '--kul-background-color': '#ffffff',
            '--kul-header-background-color': '#a6192e',
            '--kul-header-color': '#ffffff',
            '--kul-drawer-background-color': '#f5f5f5',
            '--kul-drawer-color': '#000000',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-family': 'Open Sans, arial, helvatica',
            '--kul-font-family-monospace': 'Roboto Mono, consolas, monospace',
            '--kul-font-size': '13px',
            '--kul-text-color': '#000000',
            '--kul-text-on-primary-color': '#ffffff',
            '--kul-text-on-secondary-color': '#ffffff',
            '--kul-disabled-background-color': '#eaeaea',
            '--kul-disabled-color': '#333333',
            '--kul-title-background-color': '#f1f3f4',
            '--kul-title-color': '#2e2e2e',
            '--kul-icon-color': '#808080',
            '--kul-border-color': '#ededed',
            '--kul-box-shadow':
                'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#A6192E',
            '--kul-spinner-color': '#1D1D1B',
            '--kul-chart-color-1': '#735DED',
            '--kul-chart-color-2': '#00B2CB',
            '--kul-chart-color-3': '#EDC900',
            '--kul-chart-color-4': '#a6192e',
            '--kul-chart-color-5': 'yellow',
            '--kul-chart-color-6': 'cyan',
            '--kul-chart-color-7': 'brown',
            '--kul-chart-color-8': 'magenta',
            '--kul-chart-color-9': 'grey',
            '--kul-chart-color-10': 'indigo',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        icons: {
            '--kul-ascending-icon': 'arrow_drop_up',
            '--kul-descending-icon': 'arrow_drop_down',
            '--kul-expanded-icon': 'arrow_drop_down',
            '--kul-collapsed-icon': 'menu-right',
            '--kul-dropdown-icon': 'arrow_drop_down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        font: [KulThemeFonts.OPEN_SANS],
        isDark: false,
    },
    sapphire: {
        cssVariables: {
            '--kul-primary-color': '#003b77',
            '--kul-secondary-color': '#ff1414',
            '--kul-background-color': '#ffffff',
            '--kul-header-background-color': '#003b77',
            '--kul-header-color': '#ffffff',
            '--kul-drawer-background-color': '#002244',
            '--kul-drawer-color': '#ffffff',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '20em',
            '--kul-font-family': 'Arial',
            '--kul-font-family-monospace': 'Arial',
            '--kul-font-size': '13px',
            '--kul-text-color': '#333333',
            '--kul-text-on-primary-color': '#fafafa',
            '--kul-text-on-secondary-color': '#ffffff',
            '--kul-disabled-background-color': '#ddecf8',
            '--kul-disabled-color': '#333333',
            '--kul-title-background-color': '#003b77',
            '--kul-title-color': '#ffffff',
            '--kul-icon-color': '#808080',
            '--kul-border-color': '#93c4ec',
            '--kul-box-shadow':
                'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#a94442',
            '--kul-spinner-color': '#003b77',
            '--kul-chart-color-1': '#0781fd',
            '--kul-chart-color-2': '#002244',
            '--kul-chart-color-3': '#c6cff8',
            '--kul-chart-color-4': '#66bdda',
            '--kul-chart-color-5': 'yellow',
            '--kul-chart-color-6': 'cyan',
            '--kul-chart-color-7': 'brown',
            '--kul-chart-color-8': 'magenta',
            '--kul-chart-color-9': 'grey',
            '--kul-chart-color-10': 'indigo',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        icons: {
            '--kul-ascending-icon': 'arrow_drop_up',
            '--kul-descending-icon': 'arrow_drop_down',
            '--kul-expanded-icon': 'arrow_drop_down',
            '--kul-collapsed-icon': 'menu-right',
            '--kul-dropdown-icon': 'arrow_drop_down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        isDark: false,
    },
    silver: {
        cssVariables: {
            '--kul-primary-color': '#c0c0c0',
            '--kul-secondary-color': '#c0c0c0',
            '--kul-background-color': '#000000',
            '--kul-header-background-color': '#ffffff',
            '--kul-header-color': '#000000',
            '--kul-drawer-background-color': '#ffffff',
            '--kul-drawer-color': '#000000',
            '--kul-header-height': '80px',
            '--kul-drawer-width': '320px',
            '--kul-font-family': 'Oswald, sans-serif',
            '--kul-font-family-monospace': 'Xanh Mono, monospace',
            '--kul-font-size': '16px',
            '--kul-text-color': '#fefefe',
            '--kul-text-on-primary-color': '#4a4a4a',
            '--kul-text-on-secondary-color': '#4a4a4a',
            '--kul-disabled-background-color': '#3c3c3c',
            '--kul-disabled-color': '#7e7e7e',
            '--kul-title-background-color': '#151515',
            '--kul-title-color': '#d9d9d9',
            '--kul-icon-color': '#c0c0c0',
            '--kul-border-color': '#c0c0c0',
            '--kul-box-shadow': '0px 0px 7.5px 0px rgba(128, 128, 128, 0.5)',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#d91e18',
            '--kul-spinner-color': '#c0c0c0',
            '--kul-chart-color-1': '#ffffff',
            '--kul-chart-color-2': '#979797',
            '--kul-chart-color-3': '#bababa',
            '--kul-chart-color-4': '#000000',
            '--kul-chart-color-5': '#b35454',
            '--kul-chart-color-6': '#59af57',
            '--kul-chart-color-7': '#aeaa5d',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        icons: {
            '--kul-ascending-icon': 'arrow_drop_up',
            '--kul-descending-icon': 'arrow_drop_down',
            '--kul-expanded-icon': 'arrow_drop_down',
            '--kul-collapsed-icon': 'menu-right',
            '--kul-dropdown-icon': 'arrow_drop_down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        font: [KulThemeFonts.OSWALD],
        isDark: true,
    },
    teal: {
        cssVariables: {
            '--kul-primary-color': '#068A9C',
            '--kul-secondary-color': '#ffc107',
            '--kul-background-color': '#ffffff',
            '--kul-header-background-color': '#068A9C',
            '--kul-header-color': '#ffffff',
            '--kul-drawer-background-color': '#ffffff',
            '--kul-drawer-color': '#000000',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-family': 'Roboto, sans-serif',
            '--kul-font-family-monospace': 'Roboto Mono, consolas, monospace',
            '--kul-font-size': '13px',
            '--kul-text-color': '#000000',
            '--kul-text-on-primary-color': '#ffffff',
            '--kul-text-on-secondary-color': '#ffffff',
            '--kul-disabled-background-color': '#eaeaea',
            '--kul-disabled-color': '#333333',
            '--kul-title-background-color': '#f1f3f4',
            '--kul-title-color': '#2e2e2e',
            '--kul-icon-color': '#808080',
            '--kul-border-color': '#ededed',
            '--kul-box-shadow':
                'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#A6192E',
            '--kul-spinner-color': '#eaa710',
            '--kul-chart-color-1': '#068A9C',
            '--kul-chart-color-2': '#009643',
            '--kul-chart-color-3': '#EDC900',
            '--kul-chart-color-4': '#188F00',
            '--kul-chart-color-5': '#758700',
            '--kul-chart-color-6': '#7D2F00',
            '--kul-chart-color-7': '#710008',
            '--kul-chart-color-8': '#640056',
            '--kul-chart-color-9': '#1C0056',
            '--kul-chart-color-10': '#000046',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        icons: {
            '--kul-ascending-icon': 'arrow_drop_up',
            '--kul-descending-icon': 'arrow_drop_down',
            '--kul-expanded-icon': 'arrow_drop_down',
            '--kul-collapsed-icon': 'menu-right',
            '--kul-dropdown-icon': 'arrow_drop_down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        isDark: false,
    },
    wildlife: {
        cssVariables: {
            '--kul-primary-color': '#1a7340',
            '--kul-secondary-color': '#826a4a',
            '--kul-background-color': '#f9f9f5',
            '--kul-header-background-color': '#12522e',
            '--kul-header-color': '#ffffff',
            '--kul-drawer-background-color': '#e7f2e1',
            '--kul-drawer-color': '#000000',
            '--kul-font-family': 'Crimson Text, serif',
            '--kul-font-family-monospace': 'Roboto Mono, consolas, monospace',
            '--kul-text-color': '#1a1a1a',
            '--kul-box-shadow': '0px 4px 10px rgba(0, 0, 0, 0.15)',
            '--kul-icon-color': '#4e8c57',
            '--kul-border-color': '#c4c4c4',
            '--kul-chart-color-1': '#58a27f',
            '--kul-chart-color-2': '#a9c1a1',
            '--kul-chart-color-3': '#6e8d5e',
            '--kul-chart-color-4': '#f0f2e7',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-size': '16px',
            '--kul-text-on-primary-color': '#ffffff',
            '--kul-text-on-secondary-color': '#ffffff',
            '--kul-disabled-background-color': '#eaeaea',
            '--kul-disabled-color': '#5c5c5c',
            '--kul-title-background-color': '#f1f3f4',
            '--kul-title-color': '#000000',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#d91e18',
            '--kul-spinner-color': '#44b383',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        icons: {
            '--kul-ascending-icon': 'arrow_drop_up',
            '--kul-descending-icon': 'arrow_drop_down',
            '--kul-expanded-icon': 'arrow_drop_down',
            '--kul-collapsed-icon': 'menu-right',
            '--kul-dropdown-icon': 'arrow_drop_down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        font: [KulThemeFonts.CRIMSON_TEXT],
        isDark: false,
    },
};
