import { ECElementEvent } from "echarts";

import { KulChartAdapter } from "src/components/kul-chart/kul-chart-declarations";

//#region onClick
export const onClick = (adapter: KulChartAdapter, e: ECElementEvent) => {
  const { state } = adapter;
  const { get } = state;
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
