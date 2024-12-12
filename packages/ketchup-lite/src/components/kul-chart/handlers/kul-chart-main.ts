import {
  ECElementEvent,
  EChartsOption,
  LegendComponentOption,
  TooltipComponentOption,
  XAXisComponentOption,
  YAXisComponentOption,
} from "echarts";

import { getHexColor } from "../helpers/kul-chart-utils";
import {
  KulChartAdapter,
  KulChartAdapterSetups,
} from "../kul-chart-declarations";

//#region baseAxis
const baseAxis = (
  adapter: KulChartAdapter,
): XAXisComponentOption | YAXisComponentOption => {
  const { hooks } = adapter;
  const { get } = hooks;
  const { theme } = get;
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
};
//#endregion

//#region onClick
export const onClick = (adapter: KulChartAdapter, e: ECElementEvent) => {
  const { hooks } = adapter;
  const { get } = hooks;
  const { comp, seriesColumn } = get;
  const { kulData } = comp;

  const seriesName = e.seriesName;
  const dataIndex = e.dataIndex;
  const node = kulData?.nodes?.[dataIndex] || {
    id: "*NOTFOUND*",
  };
  const column = seriesColumn(seriesName)?.[0] || {
    id: "*NOTFOUND*",
    title: seriesName,
  };
  const x = e.name;
  let y: string | number =
    typeof e.value !== "number" && typeof e.value !== "string"
      ? String(e.value).valueOf()
      : e.value;

  if (typeof y !== "string" && typeof y !== "number") {
    y = String(y);
  }

  comp.onKulEvent(new Event("click"), "click", {
    column,
    node,
    x,
    y,
  });
};
//#endregion

//#region getColors
export const getColors = (adapter: KulChartAdapter, count: number) => {
  const { hooks } = adapter;
  const { get } = hooks;
  const { comp, manager } = get;
  const { kulColors } = comp;
  const { theme } = manager;
  const { cssVars, randomColor } = theme;

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

  while (colorArray.length < count) {
    colorArray.push(randomColor(128));
  }

  return colorArray.slice(0, count);
};
//#endregion

export const prepSetups = (adapter: KulChartAdapter): KulChartAdapterSetups => {
  return {
    //#region axis
    axis: (axisType) => {
      const commonAxis = baseAxis(adapter);

      return axisType === "x"
        ? (commonAxis as XAXisComponentOption)
        : (commonAxis as YAXisComponentOption);
    },
    //#endregion

    //#region label
    label: () => {
      const { hooks } = adapter;
      const { get } = hooks;
      const { theme } = get;
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
    //#endregion

    //#region legend
    legend: () => {
      const { hooks } = adapter;
      const { get } = hooks;
      const { seriesData, theme } = get;
      const { comp } = get;
      const { kulLegend } = comp;
      const { font, textColor } = theme;

      if (kulLegend === "hidden") {
        return null;
      }

      const data = seriesData().map((s) => s.name);
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
    //#endregion

    //#region tooltip
    tooltip: (formatter?) => {
      const { hooks } = adapter;
      const { get } = hooks;
      const { theme } = get;
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
    //#endregion
  };
};
