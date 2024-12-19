import {
  EChartsOption,
  LegendComponentOption,
  TooltipComponentFormatterCallback,
  TooltipComponentOption,
  XAXisComponentOption,
  YAXisComponentOption,
} from "echarts";
import { kulManagerSingleton } from "src";
import { KulChartAdapter, KulChartAxesTypes } from "../kul-chart-declarations";

//#region baseAxis
const baseAxis = (
  getAdapter: () => KulChartAdapter,
): XAXisComponentOption | YAXisComponentOption => {
  const { border, font, text } = getAdapter().controller.get.style.theme;

  return {
    axisLabel: {
      color: text,
      fontFamily: font,
      hideOverlap: true,
      margin: 12,
      overflow: "truncate",
    },
    axisLine: { lineStyle: { color: text } },
    axisTick: { lineStyle: { color: border } },
    boundaryGap: ["0%", "0%"],
    splitLine: { lineStyle: { color: border } },
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
  getAdapter: () => KulChartAdapter,
  axisType: KulChartAxesTypes,
) => {
  const commonAxis = baseAxis(getAdapter);

  return axisType === "x"
    ? (commonAxis as XAXisComponentOption)
    : (commonAxis as YAXisComponentOption);
};
//#endregion

//#region prepLabel
export const prepLabel = (getAdapter: () => KulChartAdapter) => {
  const { font, text } = getAdapter().controller.get.style.theme;

  const label: EChartsOption = {
    show: true,
    formatter: "{b|{b}}",
    rich: {
      b: {
        color: text,
        fontFamily: font,
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
export const prepLegend = (getAdapter: () => KulChartAdapter) => {
  const { compInstance, seriesData, style } = getAdapter().controller.get;
  const { kulLegend } = compInstance;
  const { theme } = style;

  if (kulLegend === "hidden") {
    return null;
  }

  const data = seriesData().map((s) => s.name);
  const legend: LegendComponentOption = {
    data,
    [kulLegend]: 0,
    textStyle: {
      color: theme.text,
      fontFamily: theme.font,
    },
  };
  return legend;
};
//#endregion

//#region prepSeries
export const prepSeries = (
  getAdapter: () => KulChartAdapter,
  amount: number,
) => {
  const { theme } = kulManagerSingleton;
  const { cssVars, randomColor } = theme;

  const { kulColors } = getAdapter().controller.get.compInstance;

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
  getAdapter: () => KulChartAdapter,
  formatter?: TooltipComponentFormatterCallback<any>,
) => {
  const { background, font, text } = getAdapter().controller.get.style.theme;

  const tooltip: TooltipComponentOption = {
    backgroundColor: background,
    formatter,
    textStyle: {
      color: text,
      fontFamily: font,
    },
  };
  return tooltip;
};
//#endregion
