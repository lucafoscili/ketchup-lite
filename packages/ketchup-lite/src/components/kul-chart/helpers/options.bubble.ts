import { EChartsOption } from "echarts";
import { kulManagerSingleton } from "src/global/global";
import {
  KulChartAdapter,
  KulChartTooltipArguments,
  KulChartTooltipDataArray,
} from "../kul-chart-declarations";

//#region Bubble
export const bubble = (getAdapter: () => KulChartAdapter) => {
  const { stringify } = kulManagerSingleton.data.cell;

  const { get } = getAdapter().controller;
  const { columnById, compInstance, style } = get;
  const { kulAxis, kulData, kulSeries } = compInstance;
  const { seriesColor, theme, tooltip } = style;

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
        color: theme.text,
        fontFamily: theme.font,
      },
    },
    yAxis: {
      name: columnById(yAxisKey)?.title || yAxisKey,
      axisLabel: {
        color: theme.text,
        fontFamily: theme.font,
      },
    },
    series: [
      {
        type: "scatter",
        data,
        symbolSize: (val) => val[2],
        itemStyle: {
          color: seriesColor(1)[0],
        },
      },
    ],
    tooltip: tooltip(formatter),
  };

  return options;
};
//#endregion
