import {
    Component,
    Element,
    Event,
    EventEmitter,
    forceUpdate,
    Host,
    h,
    Method,
    Prop,
    State,
} from '@stencil/core';
import {
    KulChartEventPayload,
    KulChartEvent,
    KulChartType,
    KulChartProps,
    KulChartLegendPlacement,
    KulChartAdapter,
    KulChartEventData,
} from './kul-chart-declarations';
import {
    ECharts,
    XAXisComponentOption,
    YAXisComponentOption,
    dispose,
    init,
} from 'echarts';
import { kulManagerInstance } from '../../managers/kul-manager/kul-manager';
import { getProps } from '../../utils/componentUtils';
import { KulThemeColorValues } from '../../managers/kul-theme/kul-theme-declarations';
import { GenericObject } from '../../types/GenericTypes';
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from '../../variables/GenericVariables';
import { KulDebugLifecycleInfo } from '../../managers/kul-debug/kul-debug-declarations';
import { KulDataDataset } from '../../managers/kul-data/kul-data-declarations';
import { onClick } from './helpers/kul-chart-actions';
import { CHART_DESIGN } from './helpers/kul-chart-design';
import { CHART_OPTIONS } from './helpers/kul-chart-options';

@Component({
    tag: 'kul-chart',
    styleUrl: 'kul-chart.scss',
    shadow: true,
})
export class KulChart {
    /**
     * References the root HTML element of the component (<kul-chart>).
     */
    @Element() rootElement: HTMLKulChartElement;

    /*-------------------------------------------------*/
    /*                   S t a t e s                   */
    /*-------------------------------------------------*/

    /**
     * Debug information.
     */
    @State() debugInfo: KulDebugLifecycleInfo = {
        endTime: 0,
        renderCount: 0,
        renderEnd: 0,
        renderStart: 0,
        startTime: performance.now(),
    };

    /*-------------------------------------------------*/
    /*                    P r o p s                    */
    /*-------------------------------------------------*/

    /**
     * Sets the axis of the chart.
     * @default ""
     */
    @Prop({ mutable: true }) kulAxis = '';
    /**
     * Overrides theme's colors.
     * @default []
     */
    @Prop() kulColors: string[] = [];
    /**
     * The actual data of the chart.
     * @default null
     */
    @Prop() kulData: KulDataDataset = null;
    /**
     * Sets the position of the legend. Supported values: bottom, left, right, top, hidden. Keep in mind that legend types are tied to chart types, some combinations might not work.
     * @default "bottom"
     */
    @Prop() kulLegend: KulChartLegendPlacement = 'bottom';
    /**
     * The data series to be displayed. They must be of the same type.
     * @default []
     */
    @Prop() kulSeries: string[] = [];
    /**
     * The width of the chart, defaults to 100%. Accepts any valid CSS format (px, %, vw, etc.).
     * @default "100%"
     */
    @Prop() kulSizeX = '100%';
    /**
     * The height of the chart, defaults to 100%. Accepts any valid CSS format (px, %, vh, etc.).
     * @default "100%"
     */
    @Prop() kulSizeY = '100%';
    /**
     * Custom style of the component.
     * @default ""
     */
    @Prop() kulStyle = '';
    /**
     * The type of the chart. Supported formats: Bar, Gaussian, Line, Pie, Map and Scatter.
     * @default ["line"]
     */
    @Prop() kulTypes: KulChartType[] = ['line'];
    /**
     * Customization options for the x Axis.
     * @default null
     */
    @Prop() kulXAxis: XAXisComponentOption = null;
    /**
     * Customization options for the y Axis.
     * @default null
     */
    @Prop() kulYAxis: YAXisComponentOption = null;

    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/

    #kulManager = kulManagerInstance();
    #findColumn = this.#kulManager.data.column.find;
    #stringify = this.#kulManager.data.cell.stringify;

    #chartContainer: HTMLDivElement;
    #chartEl: ECharts;

    #x: string[] = [];
    #y: Record<string, number[]>;

    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/

    @Event({
        eventName: 'kul-chart-event',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kulEvent: EventEmitter<KulChartEventPayload>;

    onKulEvent(
        e: Event | CustomEvent,
        eventType: KulChartEvent,
        data?: KulChartEventData
    ) {
        this.kulEvent.emit({
            comp: this,
            eventType,
            id: this.rootElement.id,
            originalEvent: e,
            data,
        });
    }

    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/

    /**
     * Fetches debug information of the component's current state.
     * @returns {Promise<KulDebugLifecycleInfo>} A promise that resolves with the debug information object.
     */
    @Method()
    async getDebugInfo(): Promise<KulDebugLifecycleInfo> {
        return this.debugInfo;
    }
    /**
     * Used to retrieve component's props values.
     * @param {boolean} descriptions - When provided and true, the result will be the list of props with their description.
     * @returns {Promise<GenericObject>} List of props as object, each key will be a prop.
     */
    @Method()
    async getProps(descriptions?: boolean): Promise<GenericObject> {
        return getProps(this, KulChartProps, descriptions);
    }
    /**
     * This method is used to trigger a new render of the component.
     */
    @Method()
    async refresh(): Promise<void> {
        forceUpdate(this);
    }
    /**
     * Initiates the unmount sequence, which removes the component from the DOM after a delay.
     * @param {number} ms - Number of milliseconds
     */
    @Method()
    async unmount(ms: number = 0): Promise<void> {
        setTimeout(() => {
            this.onKulEvent(new CustomEvent('unmount'), 'unmount');
            this.rootElement.remove();
        }, ms);
    }

    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/

    #adapter: KulChartAdapter = {
        actions: {
            mapType: (type) => {
                switch (type) {
                    case 'area':
                    case 'bubble':
                    case 'gaussian':
                        return 'line';
                    case 'calendar':
                    case 'hbar':
                        return 'bar';
                    default:
                        return type;
                }
            },
            onClick: (e) => onClick(this.#adapter, e),
            stringify: (str) => this.#stringify(str),
        },
        emit: {
            event: (eventType, data, e = new CustomEvent(eventType)) => {
                this.onKulEvent(e, eventType, data);
            },
        },
        get: {
            chart: () => this,
            design: CHART_DESIGN,
            manager: () => this.#kulManager,
            options: CHART_OPTIONS,
            seriesColumn: (series) =>
                this.#findColumn(this.kulData, { title: series }),
            x: () => this.#x,
            y: () => this.#y,
        },
    };

    #init() {
        if (this.#chartEl) {
            dispose(this.#chartContainer);
        }
        if (this.kulTypes && this.kulTypes.length > 0) {
            this.#chartEl = init(this.#chartContainer);
            this.#createChart();
        } else {
            this.#kulManager.debug.logs.new(
                this,
                "Can't initialize chart without specifying at least 1 type.",
                'warning'
            );
        }
    }

    #updateThemeColors() {
        const theme = this.#adapter.get.design.theme;
        const themeVars = this.#kulManager.theme.cssVars;
        theme.backgroundColor = themeVars[KulThemeColorValues.BACKGROUND];
        theme.border = themeVars[KulThemeColorValues.BORDER];
        theme.dangerColor = themeVars[KulThemeColorValues.DANGER];
        theme.font = themeVars['--kul-font-family'];
        theme.successColor = themeVars[KulThemeColorValues.SUCCESS];
        theme.textColor = themeVars[KulThemeColorValues.TEXT];
    }

    #createAxisData() {
        const x: string[] = [];
        const axisId = this.kulAxis;
        const dataset = this.kulData;

        if (dataset?.nodes?.length) {
            for (const node of dataset.nodes) {
                const cell =
                    axisId && node.cells
                        ? node.cells[axisId]
                        : Object.values(node.cells || {})[0];
                if (cell?.value != null) {
                    x.push(this.#stringify(cell.value));
                } else {
                    x.push(''); // Handle missing values appropriately
                }
            }
        }

        this.#x = x;
    }

    #createSeriesData() {
        const y: Record<string, number[]> = {};
        const seriesIds =
            this.kulSeries && this.kulSeries.length > 0
                ? this.kulSeries
                : this.kulData?.columns
                      ?.map((col) => col.id)
                      .filter((id) => id !== this.kulAxis) || [];
        const dataset = this.kulData;

        if (dataset?.nodes?.length) {
            for (const seriesId of seriesIds) {
                const seriesValues: number[] = [];
                for (const node of dataset.nodes) {
                    const cellValue = node.cells?.[seriesId]?.value;
                    const numericValue =
                        cellValue != null ? Number(cellValue) : NaN;
                    seriesValues.push(numericValue);
                }
                const seriesName =
                    this.#findColumn(dataset, {
                        id: seriesId,
                    })?.[0]?.title || seriesId;
                y[seriesName] = seriesValues;
            }
        }

        this.#y = y;
    }

    async #createChart() {
        const options = this.#createChartOptions();
        this.#chartEl.setOption(options, true);

        this.#chartEl.on('click', this.#adapter.actions.onClick);
    }

    #createChartOptions() {
        const options = this.#adapter.get.options;
        const firstType = this.kulTypes?.[0] || 'line';

        this.#createSeriesData();

        switch (firstType) {
            case 'calendar':
                return options.calendar(this.#adapter);
            case 'candlestick':
                return options.candlestick(this.#adapter);
            case 'funnel':
                return options.funnel(this.#adapter);
            case 'pie':
                return options.pie(this.#adapter);
            case 'radar':
                return options.radar(this.#adapter);
            case 'sankey':
                return options.sankey(this.#adapter);
            default:
                this.#createAxisData();
                return options.default(this.#adapter);
        }
    }

    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/

    componentWillLoad() {
        this.#kulManager.theme.register(this);
    }

    componentDidLoad() {
        this.onKulEvent(new CustomEvent('ready'), 'ready');
        this.#kulManager.debug.updateDebugInfo(this, 'did-load');
    }

    componentWillRender() {
        this.#updateThemeColors();
        this.#kulManager.debug.updateDebugInfo(this, 'will-render');
    }

    componentDidRender() {
        if (this.kulData && this.kulData.columns && this.kulData.nodes) {
            this.#init();
        } else {
            this.#kulManager.debug.logs.new(
                this,
                'Not enough data. (' + JSON.stringify(this.kulData) + ')',
                'informational'
            );
        }
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }

    render() {
        const style = {
            '--kul_chart_height': this.kulSizeY || '100%',
            '--kul_chart_width': this.kulSizeX || '100%',
        };

        return (
            <Host style={style}>
                {this.kulStyle ? (
                    <style id={KUL_STYLE_ID}>
                        {this.#kulManager.theme.setKulStyle(this)}
                    </style>
                ) : undefined}
                <div
                    id={KUL_WRAPPER_ID}
                    ref={(chartContainer) =>
                        (this.#chartContainer = chartContainer)
                    }
                ></div>
            </Host>
        );
    }

    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
}
