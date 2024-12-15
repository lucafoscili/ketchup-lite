import { EChartsOption, FunnelSeriesOption } from "echarts";

import { kulManagerSingleton } from "src";
import {
  KulChartAdapter,
  KulChartTooltipArguments,
  KulChartTooltipDataDictionary,
} from "src/components/kul-chart/kul-chart-declarations";

//#region Funnel
export const funnel = (adapter: KulChartAdapter) => {
  const { stringify } = kulManagerSingleton.data.cell;

  const { compInstance, style } = adapter.state.get;
  const { kulData, kulSeries } = compInstance;
  const { layout, legend, seriesColor, tooltip } = style;

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
          color: layout.text,
          fontFamily: layout.font,
        },
        itemStyle: {
          borderColor: layout.border,
          borderWidth: 1,
        },
      } as FunnelSeriesOption,
    ],
    tooltip: tooltip(formatter),
  };

  return options;
};
//#endregion
