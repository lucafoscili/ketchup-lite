import {
  BarSeriesOption,
  EChartsOption,
  graphic,
  HeatmapSeriesOption,
  LineSeriesOption,
  ScatterSeriesOption,
  SeriesOption,
  XAXisComponentOption,
  YAXisComponentOption,
} from "echarts";

import { kulManagerSingleton } from "src";
import { KulChartAdapter } from "src/components/kul-chart/kul-chart-declarations";

//#region Basic
export const basic = (adapter: KulChartAdapter) => {
  const { theme } = kulManagerSingleton;

  const { state } = adapter;
  const { get } = state;
  const { mappedType, seriesData, style, xAxesData } = get;
  const { axis, layout, legend, tooltip } = style;

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

  const sColors = style.series(dataset.length);
  const seriesOptions: SeriesOption[] = dataset.map((s, index) => {
    const { axisIndex, data, name, type } = s;

    const color = sColors[index];
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
              color: `rgba(${theme.colorCheck(color).rgbValues}, 0.375)`,
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
          borderColor: layout.border,
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
    color: sColors,
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
        color: ["#f6efa6", sColors[0]],
      },
      text: ["High", "Low"],
      textStyle: {
        color: layout.text,
        fontFamily: layout.font,
      },
    },
  };

  return options;
};
//#endregion