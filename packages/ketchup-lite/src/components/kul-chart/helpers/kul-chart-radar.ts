import { EChartsOption, RadarSeriesOption } from "echarts";

import { kulManagerSingleton } from "src";
import { applyOpacity } from "src/components/kul-chart/helpers/kul-chart-utils";
import { KulChartAdapter } from "src/components/kul-chart/kul-chart-declarations";

//#region Radar
export const radar = (adapter: KulChartAdapter) => {
  const { stringify } = kulManagerSingleton.data.cell;

  const { state } = adapter;
  const { get } = state;
  const { compInstance, seriesData, style } = get;
  const { kulAxis, kulData, kulSeries } = compInstance;
  const { layout, legend, tooltip } = style;

  const indicator = kulSeries.map((seriesName) => {
    const max =
      seriesData()
        .find((s) => s.name === seriesName)
        ?.data.reduce((a, b) => Math.max(a, b), 0) || 100;
    return {
      name: seriesName,
      max,
    };
  });

  const data = kulData.nodes.map((node) => {
    const name = stringify(node.cells[kulAxis[0]]?.value) || "Entity";
    const value = kulSeries.map((seriesName) =>
      parseFloat(stringify(node.cells[seriesName]?.value) || "0"),
    );
    return {
      name,
      value,
    };
  });

  const colors = style.series(data.length);
  const options: EChartsOption = {
    color: colors,
    legend: {
      ...legend(),
      data: data.map((item) => item.name),
    },
    radar: {
      indicator,
      shape: "circle",
      axisName: {
        color: layout.text,
        fontFamily: layout.font,
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: [applyOpacity(colors[0], "1A"), applyOpacity(colors[1], "0D")],
        },
      },
      splitLine: {
        lineStyle: {
          color: colors[2] || "rgba(128, 128, 128, 0.5)",
          type: "dashed",
        },
      },
      axisLine: {
        lineStyle: {
          color: colors[2] || "rgba(128, 128, 128, 0.5)",
        },
      },
      axisTick: { alignWithLabel: false, show: false },
    },
    series: [
      {
        areaStyle: {
          opacity: 0.2,
        },
        lineStyle: {
          width: 2,
        },
        symbol: "circle",
        symbolSize: 6,
        type: "radar",
        data,
      } as RadarSeriesOption,
    ],
    tooltip: tooltip(),
  };

  return options;
};
//#endregion