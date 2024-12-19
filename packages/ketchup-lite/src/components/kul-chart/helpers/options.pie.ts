import { EChartsOption, PieSeriesOption } from "echarts";
import {
  KulChartAdapter,
  KulChartTooltipArguments,
  KulChartTooltipDataDictionary,
} from "../kul-chart-declarations";

//#region Pie
export const pie = (getAdapter: () => KulChartAdapter) => {
  const { columnById, compInstance, seriesData, style } =
    getAdapter().controller.get;
  const { kulAxis } = compInstance;
  const { label, legend, seriesColor, tooltip } = style;

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

  const colors = seriesColor(data.length);
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
