import { EChartsOption } from "echarts";
import { KulChartAdapter } from "../kul-chart-declarations";

//#region Heatmap
export const heatmap = (getAdapter: () => KulChartAdapter) => {
  const { compInstance, manager, style } = getAdapter().controller.get;
  const { kulAxis, kulData, kulSeries } = compInstance;
  const { seriesColor, theme, tooltip } = style;
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

  const colors = seriesColor(1);
  const options: EChartsOption = {
    color: colors[0],
    xAxis: {
      type: "category",
      data: xCategoriesArray,
      axisLabel: {
        color: theme.text,
        fontFamily: theme.font,
      },
    },
    yAxis: {
      type: "category",
      data: yCategoriesArray,
      axisLabel: {
        color: theme.text,
        fontFamily: theme.font,
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
          borderColor: theme.border,
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
        color: theme.text,
        fontFamily: theme.font,
      },
    },
  };

  return options;
};
//#endregion
