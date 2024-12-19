import { ECElementEvent } from "echarts";
import {
  KulChartAdapter,
  KulChartAdapterHandlers,
} from "../kul-chart-declarations";

//#region prepChartHandlers
export const prepChartHandlers = (
  getAdapter: () => KulChartAdapter,
): KulChartAdapterHandlers => {
  return {
    onClick: (e: ECElementEvent) => {
      const { compInstance, seriesColumn } = getAdapter().controller.get;
      const { kulData } = compInstance;

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

      compInstance.onKulEvent(new Event("click"), "click", {
        column,
        node,
        x,
        y,
      });
    },
  };
};
//#endregion
