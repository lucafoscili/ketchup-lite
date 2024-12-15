import { EChartsOption, SankeySeriesOption } from "echarts";

import { kulManagerSingleton } from "src";
import {
  KulChartAdapter,
  KulChartTooltipArguments,
  KulChartTooltipDataDictionary,
} from "src/components/kul-chart/kul-chart-declarations";

//#region Sankey
export const sankey = (adapter: KulChartAdapter) => {
  const { stringify } = kulManagerSingleton.data.cell;

  const { compInstance, style } = adapter.state.get;
  const { kulAxis, kulData, kulSeries } = compInstance;
  const { layout, seriesColor, tooltip } = style;

  const sourceKey = kulAxis[0];
  const targetKey = kulSeries[0];
  const valueKey = kulSeries[1];

  const links = kulData.nodes.map((node) => {
    return {
      source: stringify(node.cells[sourceKey]?.value || "Source"),
      target: stringify(node.cells[targetKey]?.value || "Target"),
      value: parseFloat(stringify(node.cells[valueKey]?.value) || "0"),
    };
  });

  const formatter = (
    params: KulChartTooltipArguments<KulChartTooltipDataDictionary>,
  ) => {
    if (params.dataType === "edge") {
      const { source, target, value } = params.data;
      return `
                  <strong>Flow:</strong><br/>
                  ${source} → ${target}<br/>
                  Value: ${value}
              `;
    } else {
      return `<strong>${params.name}</strong>`;
    }
  };
  const colors = seriesColor(links.length);
  const options: EChartsOption = {
    color: colors,
    series: [
      {
        type: "sankey",
        data: [
          ...new Set(links.flatMap((link) => [link.source, link.target])),
        ].map((name) => ({ name })),
        links: links,
        label: {
          show: true,
          color: layout.text,
          fontFamily: layout.font,
        },
        lineStyle: {
          color: "gradient",
          curveness: 0.5,
        },
      } as SankeySeriesOption,
    ],
    tooltip: tooltip(formatter),
  };

  return options;
};
//#endregion
