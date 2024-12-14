import { EChartsOption, PieSeriesOption } from "echarts";

import {
  KulChartAdapter,
  KulChartTooltipArguments,
  KulChartTooltipDataDictionary,
} from "src/components/kul-chart/kul-chart-declarations";

//#region Pie
export const pie = (adapter: KulChartAdapter) => {
  const { state } = adapter;
  const { get } = state;
  const { columnById, compInstance, seriesData, style } = get;
  const { kulAxis } = compInstance;
  const { label, legend, tooltip } = style;

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

  const colors = style.series(data.length);
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
