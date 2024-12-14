import { EChartsOption } from "echarts";

import { kulManagerSingleton } from "src";
import { KulChartAdapter } from "src/components/kul-chart/kul-chart-declarations";

//#region Heatmap
export const heatmap = (adapter: KulChartAdapter) => {
  const { stringify } = kulManagerSingleton.data.cell;

  const { state } = adapter;
  const { get } = state;
  const { compInstance, style } = get;
  const { kulAxis, kulData, kulSeries } = compInstance;
  const { layout, tooltip } = style;

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

  const colors = style.series(1);
  const options: EChartsOption = {
    color: colors[0],
    xAxis: {
      type: "category",
      data: xCategoriesArray,
      axisLabel: {
        color: layout.text,
        fontFamily: layout.font,
      },
    },
    yAxis: {
      type: "category",
      data: yCategoriesArray,
      axisLabel: {
        color: layout.text,
        fontFamily: layout.font,
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
          borderColor: layout.border,
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
        color: layout.text,
        fontFamily: layout.font,
      },
    },
  };

  return options;
};
//#endregion
