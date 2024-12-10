import { ECElementEvent } from "echarts";

import { KulChartAdapter } from "../kul-chart-declarations";

export const createActions = (adapter: KulChartAdapter) => {
  return {
    //#region onClick
    onClick: (e: ECElementEvent) => {
      const { get } = adapter;
      const { chart, seriesColumn } = get;
      const { kulData } = chart();

      const dataset = kulData;
      const seriesName = e.seriesName;
      const dataIndex = e.dataIndex;
      const node = dataset?.nodes?.[dataIndex] || {
        id: "*NOTFOUND*",
      };
      const column = seriesColumn(seriesName)?.[0] || {
        id: "*NOTFOUND*",
        title: seriesName,
      };
      const xValue = e.name;
      let yValue: string | number =
        typeof e.value !== "number" && typeof e.value !== "string"
          ? String(e.value).valueOf()
          : e.value;

      if (typeof yValue !== "string" && typeof yValue !== "number") {
        yValue = String(yValue);
      }

      chart().onKulEvent(new Event("click"), "click", {
        column,
        node,
        x: xValue,
        y: yValue,
      });
    },
  };
  //#endregion
};
