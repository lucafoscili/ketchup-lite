import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
    sourceMap: false,
    namespace: 'ketchup',
    outputTargets: [
        { type: 'dist' },
        { type: 'docs-readme' },
        {
            type: 'www',
            copy: [
                { src: 'accordion.html' },
                { src: 'autocomplete.html' },
                { src: 'box.html' },
                { src: 'box-performance.html' },
                { src: 'button.html' },
                { src: 'button-list.html' },
                { src: 'calendar.html' },
                { src: 'card.html' },
                { src: 'card-performance.html' },
                { src: 'cell.html' },
                { src: 'chart.html' },
                { src: 'checkbox.html' },
                { src: 'chip.html' },
                { src: 'color-picker.html' },
                { src: 'combobox.html' },
                { src: 'css-grid.html' },
                { src: 'dash.html' },
                { src: 'dash-list.html' },
                { src: 'dashboard.html' },
                { src: 'data-table.html' },
                { src: 'data-table-performance.html' },
                { src: 'date-picker.html' },
                { src: 'debug.html' },
                { src: 'drawer.html' },
                { src: 'dropdown-button.html' },
                { src: 'echart.html' },
                { src: 'form.html' },
                { src: 'gauge.html' },
                { src: 'grid.html' },
                { src: 'image.html' },
                { src: 'image-list.html' },
                { src: 'kupdata.html' },
                { src: 'kuptooltip.html' },
                { src: 'list.html' },
                { src: 'magic-box.html' },
                { src: 'nav-bar.html' },
                { src: 'numeric-picker.html' },
                { src: 'probe.html' },
                { src: 'radio.html' },
                { src: 'rating.html' },
                { src: 'switch.html' },
                { src: 'snackbar.html' },
                { src: 'tab-bar.html' },
                { src: 'time-picker.html' },
                { src: 'text-field.html' },
                { src: 'tree-performance.html' },
                { src: 'tree.html' },
            ],
            serviceWorker: null, // disable service workers
        },
    ],
    plugins: [
        sass({
            includePaths: ['./node_modules', './src/f-components'],
            injectGlobalPaths: ['src/style/global.scss'],
        }),
    ],
};
