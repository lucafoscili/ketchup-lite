import { EChartsOption } from "echarts";
import {
  KulChartAdapter,
  KulChartTooltipArguments,
  KulChartTooltipDataArray,
} from "../kul-chart-declarations";

//#region Bubble
export const bubble = (getAdapter: () => KulChartAdapter) => {
  const { get } = getAdapter().controller;
  const { columnById, compInstance, manager, style } = get;
  const { kulAxis, kulData, kulSeries } = compInstance;
  const { axis, seriesColor, theme, tooltip } = style;
  const { stringify } = manager.data.cell;
  const { font, text } = theme();

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
              ${xAxisLabel}: <strong>${x}</strong><br/>
              ${yAxisLabel}: <strong>${y}</strong><br/>
              ${sizeLabel}: <strong>${size}</strong>
          `;
  };

  const options: EChartsOption = {
    xAxis: {
      name: columnById(xAxisKey)?.title || xAxisKey,
      nameLocation: "middle",
      nameGap: 25,
      axisLabel: axis("x").axisLabel,
    },
    yAxis: {
      name: columnById(yAxisKey)?.title || yAxisKey,
      axisLabel: axis("y").axisLabel,
    },
    series: [
      {
        label: {
          color: text,
          fontFamily: font,
        },
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
