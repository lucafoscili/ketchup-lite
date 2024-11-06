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
import {
    KulChartAdapterOptions,
    KulChartTooltipArguments,
    KulChartTooltipDataArray,
    KulChartTooltipDataDictionary,
} from '../kul-chart-declarations';

export const CHART_OPTIONS: KulChartAdapterOptions = {
    bubble: (adapter) => {
        const chart = adapter.get.chart();
        const design = adapter.get.design;
        const stringify = adapter.actions.stringify;
        const getColumn = adapter.get.columnById;

        const xAxisKey = chart.kulAxis[0];
        const yAxisKey = chart.kulAxis[1];
        const sizeKey = chart.kulSeries[0];

        const xData = chart.kulData.nodes.map((node) =>
            parseFloat(stringify(node.cells[xAxisKey]?.value) || '0')
        );
        const yData = chart.kulData.nodes.map((node) =>
            parseFloat(stringify(node.cells[yAxisKey]?.value) || '0')
        );
        const sizeData = chart.kulData.nodes.map((node) =>
            parseFloat(stringify(node.cells[sizeKey]?.value) || '0')
        );

        const data = xData.map((x, index) => [
            x,
            yData[index],
            sizeData[index],
        ]);

        const formatter = (
            params: KulChartTooltipArguments<KulChartTooltipDataArray>
        ) => {
            const { data } = params;
            const [x, y, size] = data;
            const xAxisLabel = getColumn(xAxisKey)?.title || xAxisKey;
            const yAxisLabel = getColumn(yAxisKey)?.title || yAxisKey;
            const sizeLabel = getColumn(sizeKey)?.title || sizeKey;

            return `
                ${xAxisLabel}: ${x}<br/>
                ${yAxisLabel}: ${y}<br/>
                ${sizeLabel}: ${size}
            `;
        };

        const options: EChartsOption = {
            xAxis: {
                name: getColumn(xAxisKey)?.title || xAxisKey,
                nameLocation: 'middle',
                nameGap: 25,
                axisLabel: {
                    color: design.theme.textColor,
                    fontFamily: design.theme.font,
                },
            },
            yAxis: {
                name: getColumn(yAxisKey)?.title || yAxisKey,
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
                        color: design.colors(adapter, 1)[0],
                    },
                },
            ],
            tooltip: design.tooltip(adapter, formatter),
        };

        return options;
    },
    calendar: (adapter) => {
        const chart = adapter.get.chart();
        const design = adapter.get.design;

        const dateKey = chart.kulAxis[0];
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

        const formatter = (
            params: KulChartTooltipArguments<KulChartTooltipDataDictionary>
        ) => {
            const { value } = params;
            const date = value[0];
            const dataValue = value[1];
            return `
                <strong>Date:</strong> ${date}<br/>
                <strong>Value:</strong> ${dataValue}
            `;
        };
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
            tooltip: design.tooltip(adapter, formatter),
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

        const xAxisKey = chart.kulAxis[0];

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

        const xAxisData = chart.kulData.nodes.map((node) =>
            stringify(node.cells[xAxisKey]?.value || '')
        );

        const colors = [design.theme.successColor, design.theme.dangerColor];
        const options: EChartsOption = {
            color: colors,
            xAxis: {
                type: 'category',
                data: xAxisData,
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
        const design = adapter.get.design;
        const colors = design.colors(adapter, adapter.get.seriesData().length);

        const xAxes: XAXisComponentOption[] = [];
        const yAxes: YAXisComponentOption[] = [];

        const xAxisPositions: Array<'bottom' | 'top'> = ['bottom', 'top'];
        const yAxisPositions: Array<'left' | 'right'> = ['left', 'right'];

        for (let i = 0; i < adapter.get.xAxesData().length; i++) {
            const axisData = adapter.get.xAxesData()[i];
            const xAxisPosition = xAxisPositions[i % xAxisPositions.length];
            const yAxisPosition = yAxisPositions[i % yAxisPositions.length];

            xAxes.push({
                type: 'category',
                data: axisData.data,
                position: xAxisPosition,
                offset: i * 30,
                axisLabel: {
                    ...design.axis(adapter, 'x').axisLabel,
                    interval: 0,
                },
                ...design.axis(adapter, 'x'),
            } as XAXisComponentOption);

            yAxes.push({
                type: 'value',
                position: yAxisPosition,
                offset: i * 30,
                ...design.axis(adapter, 'y'),
            } as YAXisComponentOption);
        }

        const seriesOptions: SeriesOption[] = adapter.get
            .seriesData()
            .map((seriesData, index) => {
                const color = colors[index];
                const seriesType = adapter.actions.mapType(seriesData.type);

                let seriesOption: SeriesOption;

                if (seriesType === 'line') {
                    seriesOption = {
                        name: seriesData.name,
                        type: 'line',
                        data: seriesData.data,
                        xAxisIndex: seriesData.axisIndex,
                        yAxisIndex: seriesData.axisIndex,
                        itemStyle: { color },
                    } as LineSeriesOption;

                    if (seriesData.type === 'area') {
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

                    if (seriesData.type === 'gaussian') {
                        (seriesOption as LineSeriesOption).smooth = true;
                    }
                } else if (seriesType === 'bar') {
                    const isStacked = seriesData.type === 'sbar';

                    seriesOption = {
                        name: seriesData.name,
                        type: 'bar',
                        data: seriesData.data,
                        xAxisIndex: seriesData.axisIndex,
                        yAxisIndex: seriesData.axisIndex,
                        itemStyle: { color },
                        stack: isStacked ? 'total' : undefined,
                    } as BarSeriesOption;

                    if (seriesData.type === 'hbar') {
                        xAxes[seriesData.axisIndex].type = 'value';
                        yAxes[seriesData.axisIndex].type = 'category';
                    }
                } else if (seriesType === 'scatter') {
                    seriesOption = {
                        name: seriesData.name,
                        type: 'scatter',
                        data: seriesData.data,
                        xAxisIndex: seriesData.axisIndex,
                        yAxisIndex: seriesData.axisIndex,
                        itemStyle: { color },
                    } as ScatterSeriesOption;
                } else if (seriesType === 'heatmap') {
                    seriesOption = {
                        name: seriesData.name,
                        type: 'heatmap',
                        data: seriesData.data,
                        xAxisIndex: 0,
                        yAxisIndex: 0,
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
                    } as unknown as HeatmapSeriesOption;
                } else {
                    seriesOption = {
                        name: seriesData.name,
                        type: seriesType as SeriesOption['type'],
                        data: seriesData.data,
                        xAxisIndex: seriesData.axisIndex,
                        yAxisIndex: seriesData.axisIndex,
                        itemStyle: { color },
                    } as SeriesOption;
                }

                return seriesOption;
            });

        const hasVisualMap = seriesOptions.some((s) => s.type === 'heatmap');

        const options: EChartsOption = {
            color: colors,
            legend: design.legend(adapter),
            tooltip: {
                ...design.tooltip(adapter),
                trigger: 'axis',
            },
            xAxis: xAxes,
            yAxis: yAxes,
            series: seriesOptions,
            visualMap: hasVisualMap
                ? {
                      min: Math.min(
                          ...seriesOptions
                              .filter((s) => s.type === 'heatmap')
                              .flatMap((s) => s.data.map((d) => d[2]))
                      ),
                      max: Math.max(
                          ...seriesOptions
                              .filter((s) => s.type === 'heatmap')
                              .flatMap((s) => s.data.map((d) => d[2]))
                      ),
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
                  }
                : undefined,
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

        const formatter = (
            params: KulChartTooltipArguments<KulChartTooltipDataDictionary>
        ) => {
            const { name, value, percent } = params;
            return `
                <strong>${name}</strong><br/>
                Value: ${value}<br/>
                Percent: ${percent}%
            `;
        };

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
            tooltip: design.tooltip(adapter, formatter),
        };

        return options;
    },
    heatmap: (adapter) => {
        const chart = adapter.get.chart();
        const design = adapter.get.design;
        const stringify = adapter.actions.stringify;

        const xAxisKey = chart.kulAxis[0];
        const yAxisKey = chart.kulSeries[0];
        const valueKey = chart.kulSeries[1];

        const xCategories: Set<string> = new Set();
        const yCategories: Set<string> = new Set();

        const data = chart.kulData.nodes.map((node) => {
            const xValue = stringify(node.cells[xAxisKey]?.value) || '';
            const yValue = stringify(node.cells[yAxisKey]?.value) || '';
            const value = parseFloat(
                stringify(node.cells[valueKey]?.value) || '0'
            );

            xCategories.add(xValue);
            yCategories.add(yValue);

            return [xValue, yValue, value];
        });

        const xCategoriesArray = Array.from(xCategories);
        const yCategoriesArray = Array.from(yCategories);

        const xMap = new Map(
            xCategoriesArray.map((value, index) => [value, index])
        );
        const yMap = new Map(
            yCategoriesArray.map((value, index) => [value, index])
        );

        const heatmapData = data.map(([xValue, yValue, value]) => [
            xMap.get(stringify(xValue)),
            yMap.get(stringify(yValue)),
            value,
        ]);

        const colors = design.colors(adapter, 1);

        const options: EChartsOption = {
            color: colors,
            xAxis: {
                type: 'category',
                data: xCategoriesArray,
                axisLabel: {
                    color: design.theme.textColor,
                    fontFamily: design.theme.font,
                },
            },
            yAxis: {
                type: 'category',
                data: yCategoriesArray,
                axisLabel: {
                    color: design.theme.textColor,
                    fontFamily: design.theme.font,
                },
            },
            series: [
                {
                    type: 'heatmap',
                    data: heatmapData,
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
            tooltip: design.tooltip(adapter),
            visualMap: {
                min: Math.min(...heatmapData.map((item) => Number(item[2]))),
                max: Math.max(...heatmapData.map((item) => Number(item[2]))),
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

        const data = adapter.get.seriesData().map((series) => ({
            name: series.name,
            value: series.data.reduce((a, b) => a + b, 0),
        }));

        const formatter = (
            params: KulChartTooltipArguments<KulChartTooltipDataDictionary>
        ) => {
            const {
                data: { name, value },
                percent,
                seriesName,
            } = params;
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
                    name: chart.kulAxis[0] || 'Data',
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
            const max =
                adapter.get
                    .seriesData()
                    .find((s) => s.name === seriesName)
                    ?.data.reduce((a, b) => Math.max(a, b), 0) || 100;
            return {
                name: seriesName,
                max,
            };
        });

        const data = chart.kulData.nodes.map((node) => {
            const name =
                stringify(node.cells[chart.kulAxis[0]]?.value) || 'Entity';
            const value = chart.kulSeries.map((seriesName) =>
                parseFloat(stringify(node.cells[seriesName]?.value) || '0')
            );
            return {
                name,
                value,
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
                        color: [
                            design.applyOpacity(colors[0], '1A'),
                            design.applyOpacity(colors[1], '0D'),
                        ],
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

        const sourceKey = chart.kulAxis[0];
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

        const formatter = (
            params: KulChartTooltipArguments<KulChartTooltipDataDictionary>
        ) => {
            if (params.dataType === 'edge') {
                const { source, target, value } = params.data;
                return `
                    <strong>Flow:</strong><br/>
                    ${source} → ${target}<br/>
                    Value: ${value}
                `;
            } else {
                return `<strong>${params.name}</strong>`;
            }
        };

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
            tooltip: design.tooltip(adapter, formatter),
        };

        return options;
    },
};
