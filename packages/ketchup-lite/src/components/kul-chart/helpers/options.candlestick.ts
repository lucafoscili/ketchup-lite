import { CandlestickSeriesOption, EChartsOption } from "echarts";
import { KulChartAdapter } from "../kul-chart-declarations";

//#region Candlestick
export const candlestick = (getAdapter: () => KulChartAdapter) => {
  const { compInstance, manager, style } = getAdapter().controller.get;
  const { kulAxis, kulData } = compInstance;
  const { theme, tooltip } = style;
  const { stringify } = manager.data.cell;

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
    color: [theme.success, theme.danger],
    xAxis: {
      type: "category",
      data: xAxisData,
      axisLabel: {
        color: theme.text,
        fontFamily: theme.font,
      },
      axisLine: {
        lineStyle: {
          color: theme.border,
        },
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: theme.text,
        fontFamily: theme.font,
      },
      axisLine: {
        lineStyle: {
          color: theme.border,
        },
      },
      splitLine: {
        lineStyle: {
          color: theme.border,
        },
      },
    },
    series: [
      {
        type: "candlestick",
        data: data,
        itemStyle: {
          color: theme.success,
          color0: theme.danger,
          borderColor: theme.success,
          borderColor0: theme.danger,
        },
      } as CandlestickSeriesOption,
    ],
    tooltip: tooltip(),
  };

  return options;
};
//#endregion
