import { CandlestickSeriesOption, EChartsOption } from "echarts";

import { kulManagerSingleton } from "src";
import { KulChartAdapter } from "src/components/kul-chart/kul-chart-declarations";

//#region Candlestick
export const candlestick = (adapter: KulChartAdapter) => {
  const { stringify } = kulManagerSingleton.data.cell;

  const { state } = adapter;
  const { get } = state;
  const { compInstance, style } = get;
  const { kulAxis, kulData } = compInstance;
  const { layout, tooltip } = style;

  const xAxisKey = kulAxis[0];

  const data = kulData.nodes.map((node) => {
    const open = parseFloat(stringify(node.cells["Open"]?.value) || "0");
    const close = parseFloat(stringify(node.cells["Close"]?.value) || "0");
    const low = parseFloat(stringify(node.cells["Low"]?.value) || "0");
    const high = parseFloat(stringify(node.cells["High"]?.value) || "0");
    return [open, close, low, high];
  });

  const xAxisData = kulData.nodes.map((node) =>
    stringify(node.cells[xAxisKey]?.value || ""),
  );

  const options: EChartsOption = {
    color: [layout.success, layout.danger],
    xAxis: {
      type: "category",
      data: xAxisData,
      axisLabel: {
        color: layout.text,
        fontFamily: layout.font,
      },
      axisLine: {
        lineStyle: {
          color: layout.border,
        },
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: layout.text,
        fontFamily: layout.font,
      },
      axisLine: {
        lineStyle: {
          color: layout.border,
        },
      },
      splitLine: {
        lineStyle: {
          color: layout.border,
        },
      },
    },
    series: [
      {
        type: "candlestick",
        data: data,
        itemStyle: {
          color: layout.success,
          color0: layout.danger,
          borderColor: layout.success,
          borderColor0: layout.danger,
        },
      } as CandlestickSeriesOption,
    ],
    tooltip: tooltip(),
  };

  return options;
};
//#endregion
