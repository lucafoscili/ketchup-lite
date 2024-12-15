import { EChartsOption, HeatmapSeriesOption } from "echarts";

import { kulManagerSingleton } from "src";
import {
  KulChartAdapter,
  KulChartTooltipArguments,
  KulChartTooltipDataDictionary,
} from "src/components/kul-chart/kul-chart-declarations";

//#region Calendar
export const calendar = (adapter: KulChartAdapter) => {
  const { stringify } = kulManagerSingleton.data.cell;

  const { compInstance, style } = adapter.state.get;
  const { kulAxis, kulData, kulSeries } = compInstance;
  const { layout, seriesColor, tooltip } = style;

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
  const colors = seriesColor(1);
  const options: EChartsOption = {
    color: colors[0],
    calendar: {
      range: year,
      cellSize: ["auto", 24],
      itemStyle: {
        borderWidth: 1,
        borderColor: layout.border,
        color: layout.background,
      },
      dayLabel: {
        color: layout.text,
        fontFamily: layout.font,
      },
      monthLabel: {
        color: layout.text,
        fontFamily: layout.font,
      },
      yearLabel: {
        color: layout.text,
        fontFamily: layout.font,
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
        color: [layout.background, colors[0]],
      },
      left: "center",
      max: Math.max(...data.map(([_, value]) => Number(value))),
      min: Math.min(...data.map(([_, value]) => Number(value))),
      orient: "horizontal",
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
