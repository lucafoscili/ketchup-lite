import {
  EChartsOption,
  LegendComponentOption,
  TooltipComponentFormatterCallback,
  TooltipComponentOption,
  XAXisComponentOption,
  YAXisComponentOption,
} from "echarts";

import { kulManagerSingleton } from "src";
import {
  KulChartAdapter,
  KulChartAxesTypes,
} from "src/components/kul-chart/kul-chart-declarations";

//#region baseAxis
const baseAxis = (
  adapter: KulChartAdapter,
): XAXisComponentOption | YAXisComponentOption => {
  const { state } = adapter;
  const { get } = state;
  const { style } = get;
  const { layout } = style;

  return {
    axisLabel: {
      color: layout.text,
      fontFamily: layout.font,
      hideOverlap: true,
      margin: 12,
      overflow: "truncate",
    },
    axisLine: { lineStyle: { color: layout.text } },
    axisTick: { lineStyle: { color: layout.border } },
    boundaryGap: ["0%", "0%"],
    splitLine: { lineStyle: { color: layout.border } },
  };
};
//#endregion

//#region applyOpacity
export const applyOpacity = (color: string, opacity: string) =>
  `${color}${opacity}`;
//#endregion

//#region getHexColor
export const getHexColor = (color: string) => {
  const { theme } = kulManagerSingleton;
  return theme.colorCheck(color).hexColor;
};
//#endregion

//#region prepAxis
export const prepAxis = (
  adapter: KulChartAdapter,
  axisType: KulChartAxesTypes,
) => {
  const commonAxis = baseAxis(adapter);

  return axisType === "x"
    ? (commonAxis as XAXisComponentOption)
    : (commonAxis as YAXisComponentOption);
};
//#endregion

//#region prepLabel
export const prepLabel = (adapter: KulChartAdapter) => {
  const { state } = adapter;
  const { get } = state;
  const { style } = get;
  const { layout } = style;

  const label: EChartsOption = {
    show: true,
    formatter: "{b|{b}}",
    rich: {
      b: {
        color: layout.text,
        fontFamily: layout.font,
        textShadow: "none",
      },
    },
    textShadowColor: "transparent",
    textShadowOffsetX: 0,
    textShadowOffsetY: 0,
    textShadowBlur: 0,
  };
  return label;
};
//#endregion

//#region prepLegend
export const prepLegend = (adapter: KulChartAdapter) => {
  const { state } = adapter;
  const { get } = state;
  const { compInstance, seriesData, style } = get;
  const { kulLegend } = compInstance;
  const { layout } = style;

  if (kulLegend === "hidden") {
    return null;
  }

  const data = seriesData().map((s) => s.name);
  const legend: LegendComponentOption = {
    data,
    [kulLegend]: 0,
    textStyle: {
      color: layout.text,
      fontFamily: layout.font,
    },
  };
  return legend;
};
//#endregion

//#region prepSeries
export const prepSeries = (adapter: KulChartAdapter, amount: number) => {
  const { theme } = kulManagerSingleton;
  const { cssVars, randomColor } = theme;

  const { state } = adapter;
  const { get } = state;
  const { compInstance } = get;
  const { kulColors } = compInstance;

  const colorArray: string[] = [];

  if (kulColors?.length > 0) {
    colorArray.push(...kulColors.map((c) => getHexColor(c)));
  } else {
    let index = 1;
    let colorVar = `--kul-chart-color-${index}`;
    while (cssVars[colorVar]) {
      colorArray.push(getHexColor(cssVars[colorVar]));
      index++;
      colorVar = `--kul-chart-color-${index}`;
    }
  }

  while (colorArray.length < amount) {
    colorArray.push(randomColor(128));
  }

  return colorArray.slice(0, amount);
};
//#endregion

//#region prepTooltip
export const prepTooltip = (
  adapter: KulChartAdapter,
  formatter?: TooltipComponentFormatterCallback<any>,
) => {
  const { state } = adapter;
  const { get } = state;
  const { style } = get;
  const { layout } = style;

  const tooltip: TooltipComponentOption = {
    backgroundColor: layout.background,
    formatter,
    textStyle: {
      color: layout.text,
      fontFamily: layout.font,
    },
  };
  return tooltip;
};
//#endregion
