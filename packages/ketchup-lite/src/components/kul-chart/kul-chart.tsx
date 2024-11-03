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
    BarSeriesOption,
    CandlestickSeriesOption,
    ECharts,
    EChartsOption,
    FunnelSeriesOption,
    HeatmapSeriesOption,
    LineSeriesOption,
    PieSeriesOption,
    RadarSeriesOption,
    SankeySeriesOption,
    SeriesOption,
    XAXisComponentOption,
    YAXisComponentOption,
    dispose,
    graphic,
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

    #chartContainer: HTMLDivElement;
    #chartEl: ECharts;
    #kulManager = kulManagerInstance();
    #findColumn = this.#kulManager.data.column.find;
    #stringify = this.#kulManager.data.cell.stringify;
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
            onClick: (e) => onClick(this.#adapter, e),
        },
        design: CHART_DESIGN,
        emit: {
            event: (eventType, data, e = new CustomEvent(eventType)) => {
                this.onKulEvent(e, eventType, data);
            },
        },
        get: {
            chart: () => this,
            manager: () => this.#kulManager,
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
        const theme = this.#adapter.design.theme;
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

    #buildSeriesOptions(yData: Record<string, number[]>): SeriesOption[] {
        const seriesOptions: SeriesOption[] = [];
        const types = this.kulTypes || [];
        const colors = this.#adapter.design.colors(
            this.#adapter,
            Object.keys(yData).length
        );

        let index = 0;
        for (const [seriesName, data] of Object.entries(yData)) {
            const color = colors[index];
            const kulType = types[index] || types[0];
            const seriesType = this.#mapKulChartTypeToSeriesType(kulType);

            let seriesOption: SeriesOption;

            switch (seriesType) {
                case 'bar':
                    seriesOption = {
                        color,
                        name: seriesName,
                        type: 'bar',
                        data,
                        itemStyle: { color },
                    } as BarSeriesOption;
                    break;
                case 'line':
                    seriesOption = {
                        color,
                        name: seriesName,
                        type: 'line',
                        data,
                        itemStyle: { color },
                    } as LineSeriesOption;

                    if (kulType === 'area') {
                        (seriesOption as LineSeriesOption).areaStyle = {
                            color: new graphic.LinearGradient(0, 0, 0, 0.25, [
                                {
                                    offset: 0,
                                    color: `rgba(${
                                        this.#kulManager.theme.colorCheck(color)
                                            .rgbValues
                                    }, 0.375)`,
                                },
                            ]),
                        };
                    }

                    if (kulType === 'gaussian') {
                        (seriesOption as LineSeriesOption).smooth = true;
                    }
                    break;
                default:
                    seriesOption = {
                        color,
                        name: seriesName,
                        type: seriesType as 'scatter',
                        data,
                        itemStyle: { color: colors[index] },
                    };
                    break;
            }

            seriesOptions.push(seriesOption);
            index++;
        }

        return seriesOptions;
    }

    #mapKulChartTypeToSeriesType(kulType: KulChartType): SeriesOption['type'] {
        switch (kulType) {
            case 'area':
            case 'bubble':
            case 'gaussian':
                return 'line';
            case 'calendar':
            case 'hbar':
                return 'bar';
            default:
                return kulType;
        }
    }

    async #createChart() {
        const options = this.#createChartOptions();
        this.#chartEl.setOption(options, true);

        this.#chartEl.on('click', this.#adapter.actions.onClick);
    }

    #createChartOptions() {
        const firstType = this.kulTypes?.[0] || 'line';
        switch (firstType) {
            case 'calendar':
                return this.#setCalendarOptions();
            case 'candlestick':
                return this.#setCandlestickOptions();
            case 'funnel':
                return this.#setFunnelOptions();
            case 'pie':
                return this.#setPieOptions();
            case 'radar':
                return this.#setRadarOptions();
            case 'sankey':
                return this.#setSankeyOptions();
            default:
                return this.#setDefaultOptions();
        }
    }

    #setDefaultOptions() {
        const adapter = this.#adapter;
        const design = adapter.design;
        this.#createAxisData();
        this.#createSeriesData();
        const seriesOptions = this.#buildSeriesOptions(this.#y);
        const isHorizontal = this.kulTypes?.[0] === 'hbar';
        const options: EChartsOption = {
            color: design.colors(adapter, Object.keys(this.#y).length),
            legend: design.legend(adapter),
            tooltip: {
                ...design.tooltip(adapter),
                trigger: 'axis',
            },
            series: seriesOptions,
            xAxis: {
                ...design.axis(adapter),
                mainType: 'xAxis',
                type: isHorizontal ? 'value' : 'category',
                data: isHorizontal ? undefined : this.#x,
                ...this.kulXAxis,
            } as XAXisComponentOption,
            yAxis: {
                ...design.axis(adapter),
                mainType: 'yAxis',
                type: isHorizontal ? 'category' : 'value',
                data: isHorizontal ? this.#x : undefined,
                ...this.kulYAxis,
            } as YAXisComponentOption,
        };
        return options;
    }

    #setPieOptions() {
        const adapter = this.#adapter;
        const design = adapter.design;
        this.#createSeriesData();
        const data = Object.entries(this.#y).map(([name, values]) => ({
            name,
            value: values.reduce((a, b) => a + b, 0),
        }));
        const options: EChartsOption = {
            color: design.colors(adapter, data.length),
            label: design.label(adapter),
            legend: design.legend(adapter),
            tooltip: {
                ...design.tooltip(adapter),
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)',
            },
            series: [
                {
                    name:
                        this.#findColumn(this.kulData, {
                            id: this.kulAxis,
                        })?.[0].title || 'Data',
                    type: 'pie',
                    data,
                } as PieSeriesOption,
            ],
        };

        return options;
    }

    #setRadarOptions() {
        const adapter = this.#adapter;
        const design = adapter.design;
        this.#createSeriesData();

        const indicators = this.kulSeries.map((seriesName) => {
            const values = this.#y[seriesName] || [];
            const max = Math.max(...values);
            return {
                name: seriesName,
                max: isNaN(max) ? 100 : max,
            };
        });

        const data = this.kulData.nodes.map((node) => {
            return {
                name:
                    this.#stringify(
                        node.cells[this.kulAxis]?.value
                    ).valueOf() || 'Entity',
                value: this.kulSeries.map((seriesName) =>
                    parseFloat(
                        this.#stringify(
                            node.cells[seriesName]?.value
                        ).valueOf() || '0'
                    )
                ),
            };
        });

        const colors = design.colors(adapter, data.length);

        const options: EChartsOption = {
            color: colors,
            legend: {
                ...design.legend(adapter),
                data: data.map((item) => item.name),
            },
            radar: {
                indicator: indicators,
                shape: 'circle',
                axisName: {
                    color: adapter.design.theme.textColor,
                    fontFamily: adapter.design.theme.font,
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: [colors[0] + '1A', colors[1] + '0D'],
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: colors[2] || 'rgba(128, 128, 128, 0.5)',
                        type: 'dashed',
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: colors[2] || 'rgba(128, 128, 128, 0.5)',
                    },
                },
            },
            series: [
                {
                    areaStyle: {
                        opacity: 0.2,
                    },
                    lineStyle: {
                        width: 2,
                    },
                    symbol: 'circle',
                    symbolSize: 6,
                    type: 'radar',
                    data: data,
                } as RadarSeriesOption,
            ],
            tooltip: design.tooltip(adapter),
        };

        return options;
    }

    #setCandlestickOptions() {
        const adapter = this.#adapter;
        const design = adapter.design;
        this.#createSeriesData();

        const data = this.kulData.nodes.map((node) => {
            const open = parseFloat(
                this.#stringify(node.cells['Open']?.value) || '0'
            );
            const close = parseFloat(
                this.#stringify(node.cells['Close']?.value) || '0'
            );
            const low = parseFloat(
                this.#stringify(node.cells['Low']?.value) || '0'
            );
            const high = parseFloat(
                this.#stringify(node.cells['High']?.value) || '0'
            );
            return [open, close, low, high];
        });

        const colors = [design.theme.successColor, design.theme.dangerColor];
        const options: EChartsOption = {
            color: colors,
            xAxis: {
                type: 'category',
                data: this.kulData.nodes.map((node) =>
                    this.#stringify(node.cells[this.kulAxis]?.value || '')
                ),
                axisLabel: {
                    color: design.theme.textColor,
                    fontFamily: design.theme.font,
                },
                axisLine: {
                    lineStyle: {
                        color: design.theme.border,
                    },
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: design.theme.textColor,
                    fontFamily: design.theme.font,
                },
                axisLine: {
                    lineStyle: {
                        color: design.theme.border,
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: design.theme.border,
                    },
                },
            },
            series: [
                {
                    type: 'candlestick',
                    data: data,
                    itemStyle: {
                        color: colors[0],
                        color0: colors[1],
                        borderColor: colors[0],
                        borderColor0: colors[1],
                    },
                } as CandlestickSeriesOption,
            ],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                },
                backgroundColor: design.theme.backgroundColor,
                textStyle: {
                    color: design.theme.textColor,
                    fontFamily: design.theme.font,
                },
            },
        };

        return options;
    }

    #setFunnelOptions() {
        const adapter = this.#adapter;
        const design = adapter.design;
        this.#createSeriesData();

        const data = this.kulSeries.map((seriesName) => {
            const totalValue = this.kulData.nodes.reduce((sum, node) => {
                return (
                    sum +
                    parseFloat(
                        this.#stringify(node.cells[seriesName]?.value) || '0'
                    )
                );
            }, 0);
            return {
                name: String(seriesName),
                value: totalValue,
            };
        });

        const colors = design.colors(adapter, data.length);

        const options: EChartsOption = {
            color: colors,
            legend: {
                ...design.legend(adapter),
                data: data.map((item) => item.name),
            },
            series: [
                {
                    type: 'funnel',
                    data: data,
                    sort: 'descending',
                    label: {
                        show: true,
                        position: 'inside',
                        color: design.theme.textColor,
                        fontFamily: design.theme.font,
                    },
                    itemStyle: {
                        borderColor: design.theme.border,
                        borderWidth: 1,
                    },
                } as FunnelSeriesOption,
            ],
            tooltip: design.tooltip(adapter),
        };

        return options;
    }

    #setSankeyOptions() {
        const adapter = this.#adapter;
        const design = adapter.design;
        this.#createSeriesData();

        const sourceKey = this.kulAxis;
        const targetKey = this.kulSeries[0];
        const valueKey = this.kulSeries[1];

        const links = this.kulData.nodes.map((node) => {
            return {
                source: this.#stringify(
                    node.cells[sourceKey]?.value || 'Source'
                ),
                target: this.#stringify(
                    node.cells[targetKey]?.value || 'Target'
                ),
                value: parseFloat(
                    this.#stringify(node.cells[valueKey]?.value) || '0'
                ),
            };
        });

        const colors = design.colors(adapter, links.length);

        const options: EChartsOption = {
            color: colors,
            series: [
                {
                    type: 'sankey',
                    data: [
                        ...new Set(
                            links.flatMap((link) => [link.source, link.target])
                        ),
                    ].map((name) => ({ name })),
                    links: links,
                    label: {
                        show: true,
                        color: design.theme.textColor,
                        fontFamily: design.theme.font,
                    },
                    lineStyle: {
                        color: 'gradient',
                        curveness: 0.5,
                    },
                } as SankeySeriesOption,
            ],
            tooltip: design.tooltip(adapter),
        };

        return options;
    }

    #setCalendarOptions(): EChartsOption {
        const adapter = this.#adapter;
        const design = adapter.design;
        this.#createSeriesData();

        const dateKey = this.kulAxis;
        const valueKey = this.kulSeries[0];

        const data = this.kulData.nodes.map((node) => {
            return [
                String(
                    node.cells[dateKey]?.value ||
                        new Date().toISOString().split('T')[0]
                ),
                parseFloat(this.#stringify(node.cells[valueKey]?.value) || '0'),
            ];
        });

        const colors = design.colors(adapter, 1);
        const year = new Date(
            Math.min(...data.map(([date]) => new Date(date).getTime()))
        ).getFullYear();

        const options: EChartsOption = {
            color: colors,
            calendar: {
                range: year,
                cellSize: ['auto', 24],
                itemStyle: {
                    borderWidth: 1,
                    borderColor: design.theme.border,
                    color: design.theme.backgroundColor,
                },
                dayLabel: {
                    color: design.theme.textColor,
                    fontFamily: design.theme.font,
                },
                monthLabel: {
                    color: design.theme.textColor,
                    fontFamily: design.theme.font,
                },
                yearLabel: {
                    color: design.theme.textColor,
                    fontFamily: design.theme.font,
                },
            },
            series: [
                {
                    type: 'heatmap',
                    coordinateSystem: 'calendar',
                    data: data,
                    label: {
                        show: false,
                    },
                    itemStyle: {
                        color: colors[0],
                    },
                } as HeatmapSeriesOption,
            ],
            tooltip: design.tooltip(adapter),
            visualMap: {
                align: 'auto',
                bottom: 'bottom',
                inRange: {
                    color: [design.theme.backgroundColor, colors[0]],
                },
                left: 'center',
                max: Math.max(...data.map(([_, value]) => Number(value))),
                min: Math.min(...data.map(([_, value]) => Number(value))),
                orient: 'horizontal',
                text: ['High', 'Low'],
                textStyle: {
                    color: design.theme.textColor,
                    fontFamily: design.theme.font,
                },
            },
        };

        return options;
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
