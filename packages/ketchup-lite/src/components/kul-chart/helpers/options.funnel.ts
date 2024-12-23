import { EChartsOption, FunnelSeriesOption } from "echarts";
import {
  KulChartAdapter,
  KulChartTooltipArguments,
  KulChartTooltipDataDictionary,
} from "../kul-chart-declarations";

//#region Funnel
export const funnel = (getAdapter: () => KulChartAdapter) => {
  const { compInstance, manager, style } = getAdapter().controller.get;
  const { kulData, kulSeries } = compInstance;
  const { legend, seriesColor, theme, tooltip } = style;
  const { stringify } = manager.data.cell;
  const { border, font, text } = theme();

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

  const colors = seriesColor(data.length);
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
          color: text,
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
