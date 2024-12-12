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
  KulChartTooltipArguments,
  KulChartTooltipDataArray,
  KulChartTooltipDataDictionary,
} from "../kul-chart-declarations";
import { applyOpacity } from "./kul-chart-utils";

//#region Basic
export const basic = (adapter: KulChartAdapter) => {
  const { handlers, hooks } = adapter;
  const { getColors, setup } = handlers;
  const { get } = hooks;
  const { axis, legend, tooltip } = setup;
  const { manager, mappedType, seriesData, theme, xAxesData } = get;
  const { border, font, textColor } = theme;

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

  const dataset = seriesData();

  const colors = getColors(dataset.length);
  const seriesOptions: SeriesOption[] = dataset.map((s, index) => {
    const { axisIndex, data, name, type } = s;

    const color = colors[index];
    const seriesType = mappedType(type);

    let seriesOption: SeriesOption;

    if (seriesType === "line") {
      seriesOption = {
        name: name,
        type: "line",
        data: data,
        xAxisIndex: axisIndex,
        yAxisIndex: axisIndex,
        itemStyle: { color },
      } as LineSeriesOption;

      if (type === "area") {
        (seriesOption as LineSeriesOption).areaStyle = {
          color: new graphic.LinearGradient(0, 0, 0, 0.25, [
            {
              offset: 0,
              color: `rgba(${
                manager.theme.colorCheck(color).rgbValues
              }, 0.375)`,
            },
          ]),
        };
      }

      if (type === "gaussian") {
        (seriesOption as LineSeriesOption).smooth = true;
      }
    } else if (seriesType === "bar") {
      const isStacked = type === "sbar";

      seriesOption = {
        name: name,
        type: "bar",
        data: data,
        xAxisIndex: axisIndex,
        yAxisIndex: axisIndex,
        itemStyle: { color },
        stack: isStacked && "total",
      } as BarSeriesOption;

      if (type === "hbar") {
        xAxes[axisIndex].type = "value";
        yAxes[axisIndex].type = "category";
      }
    } else if (seriesType === "scatter") {
      seriesOption = {
        name: name,
        type: "scatter",
        data: data,
        xAxisIndex: axisIndex,
        yAxisIndex: axisIndex,
        itemStyle: { color },
      } as ScatterSeriesOption;
    } else if (seriesType === "heatmap") {
      seriesOption = {
        name: name,
        type: "heatmap",
        data: data,
        xAxisIndex: 0,
        yAxisIndex: 0,
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
      } as unknown as HeatmapSeriesOption;
    } else {
      seriesOption = {
        name: name,
        type: type,
        data: data,
        xAxisIndex: axisIndex,
        yAxisIndex: axisIndex,
        itemStyle: { color },
      } as SeriesOption;
    }

    return seriesOption;
  });

  const hasVisualMap = seriesOptions.some((s) => s.type === "heatmap");

  const options: EChartsOption = {
    color: colors,
    legend: legend(),
    tooltip: {
      ...tooltip(),
      trigger: "axis",
    },
    xAxis: xAxes,
    yAxis: yAxes,
    series: seriesOptions,
    visualMap: hasVisualMap && {
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
        color: ["#f6efa6", colors[0]],
      },
      text: ["High", "Low"],
      textStyle: {
        color: textColor,
        fontFamily: font,
      },
    },
  };

  return options;
};
//#endregion

//#region Bubble
export const bubble = (adapter: KulChartAdapter) => {
  const { handlers, hooks } = adapter;
  const { getColors, setup } = handlers;
  const { get } = hooks;
  const { tooltip } = setup;
  const { comp, columnById, manager, theme } = get;
  const { kulAxis, kulData, kulSeries } = comp;
  const { font, textColor } = theme;
  const { stringify } = manager.data.cell;

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
        data,
        symbolSize: (val) => val[2],
        itemStyle: {
          color: getColors(1)[0],
        },
      },
    ],
    tooltip: tooltip(formatter),
  };

  return options;
};
//#endregion

//#region Calendar
export const calendar = (adapter: KulChartAdapter) => {
  const { handlers, hooks } = adapter;
  const { getColors, setup } = handlers;
  const { get } = hooks;
  const { tooltip } = setup;
  const { comp, manager, theme } = get;
  const { kulAxis, kulData, kulSeries } = comp;
  const { backgroundColor, border, font, textColor } = theme;
  const { stringify } = manager.data.cell;

  const dateKey = kulAxis[0];
  const valueKey = kulSeries[0];

  const data = kulData.nodes.map((node) => {
    return [
      String(
        node.cells[dateKey]?.value || new Date().toISOString().split("T")[0],
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
  const colors = getColors(1);
  const options: EChartsOption = {
    color: colors[0],
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
          color: colors[0],
        },
      } as HeatmapSeriesOption,
    ],
    tooltip: tooltip(formatter),
    visualMap: {
      align: "auto",
      bottom: "bottom",
      inRange: {
        color: [backgroundColor, colors[0]],
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
};
//#endregion

//#region Candlestick
export const candlestick = (adapter: KulChartAdapter) => {
  const { handlers, hooks } = adapter;
  const { setup } = handlers;
  const { get } = hooks;
  const { tooltip } = setup;
  const { comp, manager, theme } = get;
  const { kulAxis, kulData } = comp;
  const { border, dangerColor, font, successColor, textColor } = theme;
  const { stringify } = manager.data.cell;

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
};
//#endregion

//#region Funnel
export const funnel = (adapter: KulChartAdapter) => {
  const { handlers, hooks } = adapter;
  const { getColors, setup } = handlers;
  const { get } = hooks;
  const { legend, tooltip } = setup;
  const { comp, manager, theme } = get;
  const { kulData, kulSeries } = comp;
  const { border, font, textColor } = theme;
  const { stringify } = manager.data.cell;

  const data = kulSeries.map((seriesName) => {
    const totalValue = kulData.nodes.reduce((sum, node) => {
      return sum + parseFloat(stringify(node.cells[seriesName]?.value) || "0");
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

  const colors = getColors(data.length);
  const options: EChartsOption = {
    color: colors,
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
};
//#endregion

//#region Heatmap
export const heatmap = (adapter: KulChartAdapter) => {
  const { handlers, hooks } = adapter;
  const { getColors, setup } = handlers;
  const { get } = hooks;
  const { tooltip } = setup;
  const { comp, manager, theme } = get;
  const { kulAxis, kulData, kulSeries } = comp;
  const { border, font, textColor } = theme;
  const { stringify } = manager.data.cell;

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

  const xMap = new Map(xCategoriesArray.map((value, index) => [value, index]));
  const yMap = new Map(yCategoriesArray.map((value, index) => [value, index]));

  const heatmapData = data.map(([xValue, yValue, value]) => [
    xMap.get(stringify(xValue)),
    yMap.get(stringify(yValue)),
    value,
  ]);

  const colors = getColors(1);
  const options: EChartsOption = {
    color: colors[0],
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
        color: ["#f6efa6", colors[0]],
      },
      text: ["High", "Low"],
      textStyle: {
        color: textColor,
        fontFamily: font,
      },
    },
  };

  return options;
};
//#endregion

//#region Pie
export const pie = (adapter: KulChartAdapter) => {
  const { handlers, hooks } = adapter;
  const { getColors, setup } = handlers;
  const { get } = hooks;
  const { label, legend, tooltip } = setup;
  const { columnById, comp, seriesData } = get;
  const { kulAxis } = comp;

  const data = seriesData().map((s) => ({
    name: s.name,
    value: s.data.reduce((a, b) => a + b, 0),
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

  const colors = getColors(data.length);
  const options: EChartsOption = {
    color: colors,
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
};
//#endregion

//#region Radar
export const radar = (adapter: KulChartAdapter) => {
  const { handlers, hooks } = adapter;
  const { getColors, setup } = handlers;
  const { get } = hooks;
  const { legend, tooltip } = setup;
  const { comp, manager, seriesData, theme } = get;
  const { kulAxis, kulData, kulSeries } = comp;
  const { font, textColor } = theme;
  const { stringify } = manager.data.cell;

  const indicator = kulSeries.map((seriesName) => {
    const max =
      seriesData()
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

  const colors = getColors(data.length);
  const options: EChartsOption = {
    color: colors,
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
          color: [applyOpacity(colors[0], "1A"), applyOpacity(colors[1], "0D")],
        },
      },
      splitLine: {
        lineStyle: {
          color: colors[2] || "rgba(128, 128, 128, 0.5)",
          type: "dashed",
        },
      },
      axisLine: {
        lineStyle: {
          color: colors[2] || "rgba(128, 128, 128, 0.5)",
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
};
//#endregion

//#region Sankey
export const sankey = (adapter: KulChartAdapter) => {
  const { handlers, hooks } = adapter;
  const { getColors, setup } = handlers;
  const { get } = hooks;
  const { tooltip } = setup;
  const { comp, manager, theme } = get;
  const { kulAxis, kulData, kulSeries } = comp;
  const { font, textColor } = theme;
  const { stringify } = manager.data.cell;

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
  const colors = getColors(links.length);
  const options: EChartsOption = {
    color: colors,
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
};
//#endregion
