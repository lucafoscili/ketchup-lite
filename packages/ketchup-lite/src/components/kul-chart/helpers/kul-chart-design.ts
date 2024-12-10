import {
  EChartsOption,
  LegendComponentOption,
  TooltipComponentOption,
  XAXisComponentOption,
  YAXisComponentOption,
} from "echarts";

import {
  KulChartAdapter,
  KulChartAdapterDesign,
} from "../kul-chart-declarations";

function baseAxis(
  adapter: KulChartAdapter,
): XAXisComponentOption | YAXisComponentOption {
  const { get } = adapter;
  const { design } = get;
  const { theme } = design;
  const { border, font, textColor } = theme;

  return {
    axisLabel: {
      color: textColor,
      fontFamily: font,
      hideOverlap: true,
      margin: 12,
      overflow: "truncate",
    },
    axisLine: { lineStyle: { color: textColor } },
    axisTick: { lineStyle: { color: border } },
    boundaryGap: ["0%", "0%"],
    splitLine: { lineStyle: { color: border } },
  };
}

export const createDesign: (
  adapter: KulChartAdapter,
) => KulChartAdapterDesign = (adapter) => {
  return {
    applyOpacity: (color, opacity) => `${color}${opacity}`,
    axis: (axisType) => {
      const commonAxis = baseAxis(adapter);

      return axisType === "x"
        ? (commonAxis as XAXisComponentOption)
        : (commonAxis as YAXisComponentOption);
    },
    colors: (count) => {
      const { get } = adapter;
      const { chart, manager } = get;
      const { kulColors } = chart();

      const kupTheme = manager().theme;

      const hex = (color: string) => {
        return manager().theme.colorCheck(color).hexColor;
      };
      const colorArray: string[] = [];

      if (kulColors?.length > 0) {
        colorArray.push(...kulColors.map((c) => hex(c)));
      } else {
        let index = 1;
        let colorVar = `--kul-chart-color-${index}`;
        while (kupTheme.cssVars[colorVar]) {
          colorArray.push(hex(kupTheme.cssVars[colorVar]));
          index++;
          colorVar = `--kul-chart-color-${index}`;
        }
      }

      while (colorArray.length < count) {
        colorArray.push(kupTheme.randomColor(128));
      }

      return colorArray.slice(0, count);
    },
    label: () => {
      const { get } = adapter;
      const { design } = get;
      const { theme } = design;
      const { font, textColor } = theme;

      const label: EChartsOption = {
        show: true,
        formatter: "{b|{b}}",
        rich: {
          b: {
            color: textColor,
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
    },
    legend: () => {
      const { get } = adapter;
      const { chart, design } = get;
      const { kulLegend } = chart();
      const { theme } = design;
      const { font, textColor } = theme;

      if (kulLegend === "hidden") {
        return null;
      }

      const data = adapter.get.seriesData().map((s) => s.name);
      const legend: LegendComponentOption = {
        data,
        [kulLegend]: 0,
        textStyle: {
          color: textColor,
          fontFamily: font,
        },
      };
      return legend;
    },
    theme: {
      backgroundColor: "",
      border: "",
      dangerColor: "",
      font: "",
      successColor: "",
      textColor: "",
    },
    tooltip: (formatter?) => {
      const { get } = adapter;
      const { design } = get;
      const { theme } = design;
      const { backgroundColor, font, textColor } = theme;

      const tooltip: TooltipComponentOption = {
        backgroundColor,
        formatter,
        textStyle: {
          color: textColor,
          fontFamily: font,
        },
      };
      return tooltip;
    },
  };
};
