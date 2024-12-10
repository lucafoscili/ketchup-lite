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
} from "echarts";

import {
  KulChartAdapter,
  KulChartAdapterOptions,
  KulChartTooltipArguments,
  KulChartTooltipDataArray,
  KulChartTooltipDataDictionary,
} from "../kul-chart-declarations";

export const createOptions: (
  adapter: KulChartAdapter,
) => KulChartAdapterOptions = (adapter) => {
  return {
    //#region Bubble
    bubble: () => {
      const { get, stringify } = adapter;
      const { chart, columnById, design } = get;
      const { kulAxis, kulData, kulSeries } = chart();
      const { colors, theme, tooltip } = design;
      const { font, textColor } = theme;

      const xAxisKey = kulAxis[0];
      const yAxisKey = kulAxis[1];
      const sizeKey = kulSeries[0];

      const xData = kulData.nodes.map((node) =>
        parseFloat(stringify(node.cells[xAxisKey]?.value) || "0"),
      );
      const yData = kulData.nodes.map((node) =>
        parseFloat(stringify(node.cells[yAxisKey]?.value) || "0"),
      );
      const sizeData = kulData.nodes.map((node) =>
        parseFloat(stringify(node.cells[sizeKey]?.value) || "0"),
      );

      const data = xData.map((x, index) => [x, yData[index], sizeData[index]]);

      const formatter = (
        params: KulChartTooltipArguments<KulChartTooltipDataArray>,
      ) => {
        const { data } = params;
        const [x, y, size] = data;
        const xAxisLabel = columnById(xAxisKey)?.title || xAxisKey;
        const yAxisLabel = columnById(yAxisKey)?.title || yAxisKey;
        const sizeLabel = columnById(sizeKey)?.title || sizeKey;

        return `
                ${xAxisLabel}: ${x}<br/>
                ${yAxisLabel}: ${y}<br/>
                ${sizeLabel}: ${size}
            `;
      };

      const options: EChartsOption = {
        xAxis: {
          name: columnById(xAxisKey)?.title || xAxisKey,
          nameLocation: "middle",
          nameGap: 25,
          axisLabel: {
            color: textColor,
            fontFamily: font,
          },
        },
        yAxis: {
          name: columnById(yAxisKey)?.title || yAxisKey,
          axisLabel: {
            color: textColor,
            fontFamily: font,
          },
        },
        series: [
          {
            type: "scatter",
            data: data,
            symbolSize: (val) => val[2],
            itemStyle: {
              color: colors(1)[0],
            },
          },
        ],
        tooltip: tooltip(formatter),
      };

      return options;
    },
    //#endregion

    //#region Calendar
    calendar: () => {
      const { get, stringify } = adapter;
      const { chart, design } = get;
      const { kulAxis, kulData, kulSeries } = chart();
      const { colors, theme, tooltip } = design;
      const { border, backgroundColor, font, textColor } = theme;

      const dateKey = kulAxis[0];
      const valueKey = kulSeries[0];

      const data = kulData.nodes.map((node) => {
        return [
          String(
            node.cells[dateKey]?.value ||
              new Date().toISOString().split("T")[0],
          ),
          parseFloat(stringify(node.cells[valueKey]?.value) || "0"),
        ];
      });

      const year = new Date(
        Math.min(...data.map(([date]) => new Date(date).getTime())),
      ).getFullYear();

      const formatter = (
        params: KulChartTooltipArguments<KulChartTooltipDataDictionary>,
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
        color: colors(1),
        calendar: {
          range: year,
          cellSize: ["auto", 24],
          itemStyle: {
            borderWidth: 1,
            borderColor: border,
            color: backgroundColor,
          },
          dayLabel: {
            color: textColor,
            fontFamily: font,
          },
          monthLabel: {
            color: textColor,
            fontFamily: font,
          },
          yearLabel: {
            color: textColor,
            fontFamily: font,
          },
        },
        series: [
          {
            type: "heatmap",
            coordinateSystem: "calendar",
            data: data,
            label: {
              show: false,
            },
            itemStyle: {
              color: colors(1),
            },
          } as HeatmapSeriesOption,
        ],
        tooltip: tooltip(formatter),
        visualMap: {
          align: "auto",
          bottom: "bottom",
          inRange: {
            color: [backgroundColor, colors(1)],
          },
          left: "center",
          max: Math.max(...data.map(([_, value]) => Number(value))),
          min: Math.min(...data.map(([_, value]) => Number(value))),
          orient: "horizontal",
          text: ["High", "Low"],
          textStyle: {
            color: textColor,
            fontFamily: font,
          },
        },
      };

      return options;
    },
    //#endregion

    //#region Candlestick
    candlestick: () => {
      const { get, stringify } = adapter;
      const { chart, design } = get;
      const { kulAxis, kulData } = chart();
      const { theme, tooltip } = design;
      const { border, dangerColor, font, textColor, successColor } = theme;

      const xAxisKey = kulAxis[0];

      const data = kulData.nodes.map((node) => {
        const open = parseFloat(stringify(node.cells["Open"]?.value) || "0");
        const close = parseFloat(stringify(node.cells["Close"]?.value) || "0");
        const low = parseFloat(stringify(node.cells["Low"]?.value) || "0");
        const high = parseFloat(stringify(node.cells["High"]?.value) || "0");
        return [open, close, low, high];
      });

      const xAxisData = kulData.nodes.map((node) =>
        stringify(node.cells[xAxisKey]?.value || ""),
      );

      const options: EChartsOption = {
        color: [successColor, dangerColor],
        xAxis: {
          type: "category",
          data: xAxisData,
          axisLabel: {
            color: textColor,
            fontFamily: font,
          },
          axisLine: {
            lineStyle: {
              color: border,
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: textColor,
            fontFamily: font,
          },
          axisLine: {
            lineStyle: {
              color: border,
            },
          },
          splitLine: {
            lineStyle: {
              color: border,
            },
          },
        },
        series: [
          {
            type: "candlestick",
            data: data,
            itemStyle: {
              color: successColor,
              color0: dangerColor,
              borderColor: successColor,
              borderColor0: dangerColor,
            },
          } as CandlestickSeriesOption,
        ],
        tooltip: tooltip(),
      };

      return options;
    },
    //#endregion

    //#region Default
    default: () => {
      const { get } = adapter;
      const { design, manager, mappedType, seriesData, xAxesData } = get;
      const { axis, colors, legend, theme, tooltip } = design;

      const xAxes: XAXisComponentOption[] = [];
      const yAxes: YAXisComponentOption[] = [];

      const xAxisPositions: Array<"bottom" | "top"> = ["bottom", "top"];
      const yAxisPositions: Array<"left" | "right"> = ["left", "right"];

      for (let i = 0; i < xAxesData().length; i++) {
        const axisData = xAxesData()[i];
        const xAxisPosition = xAxisPositions[i % xAxisPositions.length];
        const yAxisPosition = yAxisPositions[i % yAxisPositions.length];

        xAxes.push({
          type: "category",
          data: axisData.data,
          position: xAxisPosition,
          offset: i * 30,
          axisLabel: {
            ...axis("x").axisLabel,
            interval: 0,
          },
          ...axis("x"),
        } as XAXisComponentOption);

        yAxes.push({
          type: "value",
          position: yAxisPosition,
          offset: i * 30,
          ...axis("y"),
        } as YAXisComponentOption);
      }

      const c = colors(seriesData().length);
      const seriesOptions: SeriesOption[] = seriesData().map(
        (seriesData, index) => {
          const color = c[index];
          const seriesType = mappedType(seriesData.type);

          let seriesOption: SeriesOption;

          if (seriesType === "line") {
            seriesOption = {
              name: seriesData.name,
              type: "line",
              data: seriesData.data,
              xAxisIndex: seriesData.axisIndex,
              yAxisIndex: seriesData.axisIndex,
              itemStyle: { color },
            } as LineSeriesOption;

            if (seriesData.type === "area") {
              (seriesOption as LineSeriesOption).areaStyle = {
                color: new graphic.LinearGradient(0, 0, 0, 0.25, [
                  {
                    offset: 0,
                    color: `rgba(${
                      manager().theme.colorCheck(color).rgbValues
                    }, 0.375)`,
                  },
                ]),
              };
            }

            if (seriesData.type === "gaussian") {
              (seriesOption as LineSeriesOption).smooth = true;
            }
          } else if (seriesType === "bar") {
            const isStacked = seriesData.type === "sbar";

            seriesOption = {
              name: seriesData.name,
              type: "bar",
              data: seriesData.data,
              xAxisIndex: seriesData.axisIndex,
              yAxisIndex: seriesData.axisIndex,
              itemStyle: { color },
              stack: isStacked ? "total" : undefined,
            } as BarSeriesOption;

            if (seriesData.type === "hbar") {
              xAxes[seriesData.axisIndex].type = "value";
              yAxes[seriesData.axisIndex].type = "category";
            }
          } else if (seriesType === "scatter") {
            seriesOption = {
              name: seriesData.name,
              type: "scatter",
              data: seriesData.data,
              xAxisIndex: seriesData.axisIndex,
              yAxisIndex: seriesData.axisIndex,
              itemStyle: { color },
            } as ScatterSeriesOption;
          } else if (seriesType === "heatmap") {
            seriesOption = {
              name: seriesData.name,
              type: "heatmap",
              data: seriesData.data,
              xAxisIndex: 0,
              yAxisIndex: 0,
              itemStyle: {
                borderColor: theme.border,
                borderWidth: 1,
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            } as unknown as HeatmapSeriesOption;
          } else {
            seriesOption = {
              name: seriesData.name,
              type: seriesType as SeriesOption["type"],
              data: seriesData.data,
              xAxisIndex: seriesData.axisIndex,
              yAxisIndex: seriesData.axisIndex,
              itemStyle: { color },
            } as SeriesOption;
          }

          return seriesOption;
        },
      );

      const hasVisualMap = seriesOptions.some((s) => s.type === "heatmap");

      const options: EChartsOption = {
        color: c,
        legend: legend(),
        tooltip: {
          ...tooltip(),
          trigger: "axis",
        },
        xAxis: xAxes,
        yAxis: yAxes,
        series: seriesOptions,
        visualMap: hasVisualMap
          ? {
              min: Math.min(
                ...seriesOptions
                  .filter((s) => s.type === "heatmap")
                  .flatMap((s) => s.data.map((d) => d[2])),
              ),
              max: Math.max(
                ...seriesOptions
                  .filter((s) => s.type === "heatmap")
                  .flatMap((s) => s.data.map((d) => d[2])),
              ),
              calculable: true,
              orient: "vertical",
              left: "left",
              bottom: "15%",
              inRange: {
                color: ["#f6efa6", colors(1)],
              },
              text: ["High", "Low"],
              textStyle: {
                color: theme.textColor,
                fontFamily: theme.font,
              },
            }
          : undefined,
      };

      return options;
    },
    //#endregion

    //#region Funnel
    funnel: (adapter) => {
      const { get, stringify } = adapter;
      const { chart, design } = get;
      const { kulData, kulSeries } = chart();
      const { colors, legend, theme, tooltip } = design;
      const { border, font, textColor } = theme;

      const data = kulSeries.map((seriesName) => {
        const totalValue = kulData.nodes.reduce((sum, node) => {
          return (
            sum + parseFloat(stringify(node.cells[seriesName]?.value) || "0")
          );
        }, 0);
        return {
          name: String(seriesName),
          value: totalValue,
        };
      });

      const formatter = (
        params: KulChartTooltipArguments<KulChartTooltipDataDictionary>,
      ) => {
        const { name, value, percent } = params;
        return `
                <strong>${name}</strong><br/>
                Value: ${value}<br/>
                Percent: ${percent}%
            `;
      };

      const options: EChartsOption = {
        color: colors(data.length),
        legend: {
          ...legend(),
          data: data.map((item) => item.name),
        },
        series: [
          {
            type: "funnel",
            data: data,
            sort: "descending",
            label: {
              show: true,
              position: "inside",
              color: textColor,
              fontFamily: font,
            },
            itemStyle: {
              borderColor: border,
              borderWidth: 1,
            },
          } as FunnelSeriesOption,
        ],
        tooltip: tooltip(formatter),
      };

      return options;
    },
    //#endregion

    //#region Heatmap
    heatmap: (adapter) => {
      const { get, stringify } = adapter;
      const { chart, design } = get;
      const { kulAxis, kulData, kulSeries } = chart();
      const { colors, theme, tooltip } = design;
      const { border, font, textColor } = theme;

      const xAxisKey = kulAxis[0];
      const yAxisKey = kulSeries[0];
      const valueKey = kulSeries[1];

      const xCategories: Set<string> = new Set();
      const yCategories: Set<string> = new Set();

      const data = kulData.nodes.map((node) => {
        const xValue = stringify(node.cells[xAxisKey]?.value) || "";
        const yValue = stringify(node.cells[yAxisKey]?.value) || "";
        const value = parseFloat(stringify(node.cells[valueKey]?.value) || "0");

        xCategories.add(xValue);
        yCategories.add(yValue);

        return [xValue, yValue, value];
      });

      const xCategoriesArray = Array.from(xCategories);
      const yCategoriesArray = Array.from(yCategories);

      const xMap = new Map(
        xCategoriesArray.map((value, index) => [value, index]),
      );
      const yMap = new Map(
        yCategoriesArray.map((value, index) => [value, index]),
      );

      const heatmapData = data.map(([xValue, yValue, value]) => [
        xMap.get(stringify(xValue)),
        yMap.get(stringify(yValue)),
        value,
      ]);

      const options: EChartsOption = {
        color: colors(1),
        xAxis: {
          type: "category",
          data: xCategoriesArray,
          axisLabel: {
            color: textColor,
            fontFamily: font,
          },
        },
        yAxis: {
          type: "category",
          data: yCategoriesArray,
          axisLabel: {
            color: textColor,
            fontFamily: font,
          },
        },
        series: [
          {
            type: "heatmap",
            data: heatmapData,
            label: {
              show: false,
            },
            itemStyle: {
              borderColor: border,
              borderWidth: 1,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
        tooltip: tooltip(),
        visualMap: {
          min: Math.min(...heatmapData.map((item) => Number(item[2]))),
          max: Math.max(...heatmapData.map((item) => Number(item[2]))),
          calculable: true,
          orient: "vertical",
          left: "left",
          bottom: "15%",
          inRange: {
            color: ["#f6efa6", colors(1)],
          },
          text: ["High", "Low"],
          textStyle: {
            color: textColor,
            fontFamily: font,
          },
        },
      };

      return options;
    },
    //#endregion

    //#region Pie
    pie: () => {
      const { get } = adapter;
      const { chart, columnById, design, seriesData } = get;
      const { kulAxis } = chart();
      const { colors, label, legend, tooltip } = design;

      const data = seriesData().map((series) => ({
        name: series.name,
        value: series.data.reduce((a, b) => a + b, 0),
      }));

      const formatter = (
        params: KulChartTooltipArguments<KulChartTooltipDataDictionary>,
      ) => {
        const {
          data: { name, value },
          percent,
          seriesName,
        } = params;
        const title = columnById(seriesName).title || seriesName;
        return `<strong>${title}</strong><br/>${name}: ${value.toLocaleString()} (${percent.toFixed(2)}%)`;
      };

      const options: EChartsOption = {
        color: colors(data.length),
        label: label(),
        legend: legend(),
        tooltip: {
          ...tooltip(formatter),
          trigger: "item",
        },
        series: [
          {
            name: kulAxis[0] || "Data",
            type: "pie",
            data,
          } as PieSeriesOption,
        ],
      };

      return options;
    },
    //#endregion

    //#region Radar
    radar: () => {
      const { get, stringify } = adapter;
      const { chart, design } = get;
      const { kulAxis, kulData, kulSeries } = chart();
      const { applyOpacity, colors, legend, theme, tooltip } = design;
      const { font, textColor } = theme;

      const indicator = kulSeries.map((seriesName) => {
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

      const data = kulData.nodes.map((node) => {
        const name = stringify(node.cells[kulAxis[0]]?.value) || "Entity";
        const value = kulSeries.map((seriesName) =>
          parseFloat(stringify(node.cells[seriesName]?.value) || "0"),
        );
        return {
          name,
          value,
        };
      });

      const chartColors = colors(data.length);
      const options: EChartsOption = {
        color: chartColors,
        legend: {
          ...legend(),
          data: data.map((item) => item.name),
        },
        radar: {
          indicator,
          shape: "circle",
          axisName: {
            color: textColor,
            fontFamily: font,
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: [
                applyOpacity(chartColors[0], "1A"),
                applyOpacity(chartColors[1], "0D"),
              ],
            },
          },
          splitLine: {
            lineStyle: {
              color: chartColors[2] || "rgba(128, 128, 128, 0.5)",
              type: "dashed",
            },
          },
          axisLine: {
            lineStyle: {
              color: chartColors[2] || "rgba(128, 128, 128, 0.5)",
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
            symbol: "circle",
            symbolSize: 6,
            type: "radar",
            data,
          } as RadarSeriesOption,
        ],
        tooltip: tooltip(),
      };

      return options;
    },
    //#endregion

    //#region Sankey
    sankey: () => {
      const { get, stringify } = adapter;
      const { chart, design } = get;
      const { kulAxis, kulSeries, kulData } = chart();
      const { colors, theme, tooltip } = design;
      const { font, textColor } = theme;

      const sourceKey = kulAxis[0];
      const targetKey = kulSeries[0];
      const valueKey = kulSeries[1];

      const links = kulData.nodes.map((node) => {
        return {
          source: stringify(node.cells[sourceKey]?.value || "Source"),
          target: stringify(node.cells[targetKey]?.value || "Target"),
          value: parseFloat(stringify(node.cells[valueKey]?.value) || "0"),
        };
      });

      const formatter = (
        params: KulChartTooltipArguments<KulChartTooltipDataDictionary>,
      ) => {
        if (params.dataType === "edge") {
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
        color: colors(links.length),
        series: [
          {
            type: "sankey",
            data: [
              ...new Set(links.flatMap((link) => [link.source, link.target])),
            ].map((name) => ({ name })),
            links: links,
            label: {
              show: true,
              color: textColor,
              fontFamily: font,
            },
            lineStyle: {
              color: "gradient",
              curveness: 0.5,
            },
          } as SankeySeriesOption,
        ],
        tooltip: tooltip(formatter),
      };

      return options;
    },
    //#endregion
  };
};
