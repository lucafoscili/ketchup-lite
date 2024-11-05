import {
    BarSeriesOption,
    CandlestickSeriesOption,
    EChartsOption,
    FunnelSeriesOption,
    graphic,
    HeatmapSeriesOption,
    LineSeriesOption,
    PieSeriesOption,
    RadarSeriesOption,
    SankeySeriesOption,
    ScatterSeriesOption,
    SeriesOption,
    XAXisComponentOption,
    YAXisComponentOption,
} from 'echarts';
import { KulChartAdapterOptions } from '../kul-chart-declarations';

export const CHART_OPTIONS: KulChartAdapterOptions = {
    bubble: (adapter) => {
        const chart = adapter.get.chart();
        const design = adapter.get.design;
        const stringify = adapter.actions.stringify;

        const xAxisKey = chart.kulAxis;
        const xAxisColumn = adapter.get
            .manager()
            .data.column.find(chart.kulData, { id: xAxisKey })?.[0];
        const yAxisKey = chart.kulSeries[0];
        const bubbleSizeKey = chart.kulSeries[1];

        const xCategories: Set<string> = new Set();
        const yCategories: Set<string> = new Set();

        const data = chart.kulData.nodes.map((node) => {
            const xValue = stringify(node.cells[xAxisKey]?.value) || '0';
            const yValue = stringify(node.cells[yAxisKey]?.value) || '0';
            const bubbleSize = parseFloat(
                stringify(node.cells[bubbleSizeKey]?.value) || '0'
            );

            xCategories.add(xValue);
            yCategories.add(yValue);

            return [xValue, yValue, bubbleSize];
        });

        const colors = design.colors(adapter, 1);
        const formatter = (params: any) => {
            return `${xAxisColumn.title}: ${params.value[0]}<br>${yAxisKey}: ${params.value[1]}<br>Size: ${params.value[2]}`;
        };

        const options: EChartsOption = {
            color: colors,
            xAxis: {
                type: 'category',
                name: xAxisColumn ? xAxisColumn.title : 'X Axis',
                data: Array.from(xCategories),
                axisLabel: {
                    color: design.theme.textColor,
                    fontFamily: design.theme.font,
                },
            },
            yAxis: {
                type: 'category',
                name: yAxisKey ? yAxisKey : 'Y Axis',
                data: Array.from(yCategories),
                axisLabel: {
                    color: design.theme.textColor,
                    fontFamily: design.theme.font,
                },
            },
            series: [
                {
                    type: 'scatter',
                    data: data,
                    symbolSize: (val) => val[2],
                    itemStyle: {
                        borderColor: design.theme.border,
                        borderWidth: 1,
                        color: colors[0],
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                } as ScatterSeriesOption,
            ],
            tooltip: design.tooltip(adapter, formatter),
            visualMap: {
                min: Math.min(...data.map(([_, __, count]) => Number(count))),
                max: Math.max(...data.map(([_, __, count]) => Number(count))),
                calculable: true,
                orient: 'vertical',
                left: 'left',
                bottom: '15%',
                inRange: {
                    color: ['#f6efa6', colors[0]],
                },
                text: ['High', 'Low'],
                textStyle: {
                    color: design.theme.textColor,
                    fontFamily: design.theme.font,
                },
            },
        };

        return options;
    },
    calendar: (adapter) => {
        const chart = adapter.get.chart();
        const design = adapter.get.design;

        const dateKey = chart.kulAxis;
        const valueKey = chart.kulSeries[0];

        const data = chart.kulData.nodes.map((node) => {
            return [
                String(
                    node.cells[dateKey]?.value ||
                        new Date().toISOString().split('T')[0]
                ),
                parseFloat(
                    adapter.actions.stringify(node.cells[valueKey]?.value) ||
                        '0'
                ),
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
    },
    candlestick: (adapter) => {
        const chart = adapter.get.chart();
        const design = adapter.get.design;
        const stringify = adapter.actions.stringify;

        const data = chart.kulData.nodes.map((node) => {
            const open = parseFloat(
                stringify(node.cells['Open']?.value) || '0'
            );
            const close = parseFloat(
                stringify(node.cells['Close']?.value) || '0'
            );
            const low = parseFloat(stringify(node.cells['Low']?.value) || '0');
            const high = parseFloat(
                stringify(node.cells['High']?.value) || '0'
            );
            return [open, close, low, high];
        });

        const colors = [design.theme.successColor, design.theme.dangerColor];
        const options: EChartsOption = {
            color: colors,
            xAxis: {
                type: 'category',
                data: chart.kulData.nodes.map((node) =>
                    stringify(node.cells[chart.kulAxis]?.value || '')
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
            tooltip: design.tooltip(adapter),
        };

        return options;
    },
    default: (adapter) => {
        const chart = adapter.get.chart();
        const design = adapter.get.design;

        const seriesOptions: SeriesOption[] = [];
        const types = chart.kulTypes || [];
        const colors = design.colors(
            adapter,
            Object.keys(adapter.get.y()).length
        );

        let index = 0;
        for (const [seriesName, data] of Object.entries(adapter.get.y())) {
            const color = colors[index];
            const kulType = types[index] || types[0];
            const seriesType = adapter.actions.mapType(kulType);

            const seriesOption:
                | BarSeriesOption
                | LineSeriesOption
                | ScatterSeriesOption = {};

            switch (seriesType) {
                case 'bar':
                    seriesOption.color = color;
                    seriesOption.name = seriesName;
                    seriesOption.type = 'bar';
                    seriesOption.data = data;
                    seriesOption.itemStyle = { color };
                    break;
                case 'line':
                    seriesOption.color = color;
                    seriesOption.name = seriesName;
                    seriesOption.type = 'line';
                    seriesOption.data = data;
                    seriesOption.itemStyle = { color };
                    if (kulType === 'area') {
                        (seriesOption as LineSeriesOption).areaStyle = {
                            color: new graphic.LinearGradient(0, 0, 0, 0.25, [
                                {
                                    offset: 0,
                                    color: `rgba(${
                                        adapter.get
                                            .manager()
                                            .theme.colorCheck(color).rgbValues
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
                    seriesOption.color = color;
                    seriesOption.name = seriesName;
                    seriesOption.type = seriesType as 'scatter';
                    seriesOption.data = data;
                    seriesOption.itemStyle = { color: colors[index] };
                    break;
            }

            seriesOptions.push(seriesOption);
            index++;
        }

        const isHorizontal = chart.kulTypes?.[0] === 'hbar';
        const options: EChartsOption = {
            color: design.colors(adapter, Object.keys(adapter.get.y()).length),
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
                data: isHorizontal ? undefined : adapter.get.x(),
                ...chart.kulXAxis,
            } as XAXisComponentOption,
            yAxis: {
                ...design.axis(adapter),
                mainType: 'yAxis',
                type: isHorizontal ? 'category' : 'value',
                data: isHorizontal ? adapter.get.x() : undefined,
                ...chart.kulYAxis,
            } as YAXisComponentOption,
        };

        return options;
    },
    funnel: (adapter) => {
        const chart = adapter.get.chart();
        const design = adapter.get.design;

        const data = chart.kulSeries.map((seriesName) => {
            const totalValue = chart.kulData.nodes.reduce((sum, node) => {
                return (
                    sum +
                    parseFloat(
                        adapter.actions.stringify(
                            node.cells[seriesName]?.value
                        ) || '0'
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
    },
    heatmap: (adapter) => {
        const chart = adapter.get.chart();
        const design = adapter.get.design;
        const stringify = adapter.actions.stringify;

        const xAxisKey = chart.kulAxis;
        const xAxisColumn = adapter.get
            .manager()
            .data.column.find(chart.kulData, { id: xAxisKey })?.[0];
        const axisLabel = xAxisColumn ? xAxisColumn.title : 'X Axis';

        const seriesLabels = chart.kulSeries.map((seriesId) => {
            const column = adapter.get
                .manager()
                .data.column.find(chart.kulData, { id: seriesId })?.[0];
            return column ? column.title : 'Y Axis';
        });

        const xCategories: Set<string> = new Set();
        const yCategories: Set<string> = new Set();

        const data = chart.kulData.nodes.map((node) => {
            const sourceValue = stringify(node.cells[xAxisKey]?.value) || '0';
            const targetValue =
                stringify(node.cells[chart.kulSeries[0]]?.value) || '0';
            const mappingCount = parseFloat(
                stringify(node.cells[chart.kulSeries[1]]?.value) || '0'
            );

            xCategories.add(sourceValue);
            yCategories.add(targetValue);

            return [sourceValue, targetValue, mappingCount];
        });

        const colors = design.colors(adapter, 1);
        const formatter = (params: any) => {
            return `${axisLabel}: ${params.value[0]}<br>${seriesLabels[0]}: ${params.value[1]}<br>Frequency: ${params.value[2]}`;
        };

        const options: EChartsOption = {
            color: colors,
            xAxis: {
                type: 'category',
                name: axisLabel,
                data: Array.from(xCategories),
                axisLabel: {
                    color: design.theme.textColor,
                    fontFamily: design.theme.font,
                },
            },
            yAxis: {
                type: 'category',
                name: seriesLabels[0],
                data: Array.from(yCategories),
                axisLabel: {
                    color: design.theme.textColor,
                    fontFamily: design.theme.font,
                },
            },
            series: [
                {
                    type: 'heatmap',
                    data: data,
                    label: {
                        show: false,
                    },
                    itemStyle: {
                        borderColor: design.theme.border,
                        borderWidth: 1,
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                },
            ],
            tooltip: design.tooltip(adapter, formatter),
            visualMap: {
                min: Math.min(...data.map(([_, __, count]) => Number(count))),
                max: Math.max(...data.map(([_, __, count]) => Number(count))),
                calculable: true,
                orient: 'vertical',
                left: 'left',
                bottom: '15%',
                inRange: {
                    color: ['#f6efa6', colors[0]],
                },
                text: ['High', 'Low'],
                textStyle: {
                    color: design.theme.textColor,
                    fontFamily: design.theme.font,
                },
            },
        };

        return options;
    },
    pie: (adapter) => {
        const chart = adapter.get.chart();
        const design = adapter.get.design;

        const data = Object.entries(adapter.get.y()).map(([name, values]) => ({
            name,
            value: values.reduce((a, b) => a + b, 0),
        }));
        const formatter = (args: {
            data: { name: string; value: number };
            percent: number;
            seriesName: string;
        }) => {
            const {
                data: { name, value },
                percent,
                seriesName,
            } = args;
            debugger;
            return `<strong>${seriesName}</strong><br/>${name}: ${value.toLocaleString()} (${percent.toFixed(2)}%)`;
        };
        const options: EChartsOption = {
            color: design.colors(adapter, data.length),
            label: design.label(adapter),
            legend: design.legend(adapter),
            tooltip: {
                ...design.tooltip(adapter, formatter),
                trigger: 'item',
            },
            series: [
                {
                    name:
                        adapter.get.manager().data.column.find(chart.kulData, {
                            id: chart.kulAxis,
                        })?.[0].title || 'Data',
                    type: 'pie',
                    data,
                } as PieSeriesOption,
            ],
        };

        return options;
    },
    radar: (adapter) => {
        const chart = adapter.get.chart();
        const design = adapter.get.design;
        const stringify = adapter.actions.stringify;

        const indicator = chart.kulSeries.map((seriesName) => {
            const values = adapter.get.y()[seriesName] || [];
            return {
                name: seriesName,
                alignTicks: false,
            };
        });

        const data = chart.kulData.nodes.map((node) => {
            return {
                name: stringify(node.cells[chart.kulAxis]?.value) || 'Entity',
                value: chart.kulSeries.map((seriesName) =>
                    parseFloat(stringify(node.cells[seriesName]?.value) || '0')
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
                indicator,
                shape: 'circle',
                axisName: {
                    color: design.theme.textColor,
                    fontFamily: design.theme.font,
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
                axisTick: { alignWithLabel: false, show: false },
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
    },
    sankey: (adapter) => {
        const chart = adapter.get.chart();
        const design = adapter.get.design;
        const stringify = adapter.actions.stringify;

        const sourceKey = chart.kulAxis;
        const targetKey = chart.kulSeries[0];
        const valueKey = chart.kulSeries[1];

        const links = chart.kulData.nodes.map((node) => {
            return {
                source: stringify(node.cells[sourceKey]?.value || 'Source'),
                target: stringify(node.cells[targetKey]?.value || 'Target'),
                value: parseFloat(
                    stringify(node.cells[valueKey]?.value) || '0'
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
    },
};
