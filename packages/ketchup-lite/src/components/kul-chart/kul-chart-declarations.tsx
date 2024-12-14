import {
  ECElementEvent,
  EChartsOption,
  LegendComponentOption,
  SeriesOption,
  TooltipComponentFormatterCallback,
  TooltipComponentOption,
  XAXisComponentOption,
  YAXisComponentOption,
} from "echarts";

import { KulChart } from "src/components/kul-chart/kul-chart";
import {
  KulDataColumn,
  KulDataDataset,
  KulDataNode,
} from "src/managers/kul-data/kul-data-declarations";
import {
  KulComponentAdapter,
  KulComponentAdapterHandlers,
  KulComponentAdapterStateGetters,
  KulComponentAdapterStateSetters,
  KulEventPayload,
} from "src/types/GenericTypes";

//#region Adapter
export interface KulChartAdapter extends KulComponentAdapter<KulChart> {
  handlers: KulChartAdapterHandlers;
  state: {
    get: KulChartAdapterStateGetters;
    set: KulChartAdapterStateSetters;
  };
}
export interface KulChartAdapterHandlers extends KulComponentAdapterHandlers {
  onClick: (e: ECElementEvent) => boolean | void;
}
export interface KulChartAdapterStateGetters
  extends KulComponentAdapterStateGetters<KulChart> {
  compInstance: KulChart;
  columnById: (id: string) => KulDataColumn;
  mappedType: (type: KulChartType) => SeriesOption["type"];
  options: KulChartAdapterOptions;
  seriesColumn: (seriesName: string) => KulDataColumn[];
  seriesData: () => KulChartSeriesData[];
  style: KulChartAdapterStyle;
  xAxesData: () => { id: string; data: string[] }[];
}
export interface KulChartAdapterStateSetters
  extends KulComponentAdapterStateSetters {
  style: {
    layout: () => KulChartAdapterLayoutStyle;
  };
}
export interface KulChartAdapterLayoutStyle {
  background: string;
  border: string;
  danger: string;
  font: string;
  success: string;
  text: string;
}
export interface KulChartAdapterStyle {
  axis: (
    axisType: KulChartAxesTypes,
  ) => XAXisComponentOption | YAXisComponentOption;
  label: () => EChartsOption;
  layout: KulChartAdapterLayoutStyle;
  legend: () => LegendComponentOption;
  tooltip: (
    formatter?: TooltipComponentFormatterCallback<unknown>,
  ) => TooltipComponentOption;
  series: (amount: number) => string[];
}
export interface KulChartAdapterOptions {
  basic: () => EChartsOption;
  bubble: () => EChartsOption;
  calendar: () => EChartsOption;
  candlestick: () => EChartsOption;
  funnel: () => EChartsOption;
  heatmap: () => EChartsOption;
  pie: () => EChartsOption;
  radar: () => EChartsOption;
  sankey: () => EChartsOption;
}
//#endregion

//#region Events
export type KulChartEvent = "click" | "ready" | "unmount";
export interface KulChartEventPayload
  extends KulEventPayload<"KulChart", KulChartEvent> {
  data?: KulChartEventData;
}
export interface KulChartEventData {
  column: KulDataColumn;
  node: KulDataNode;
  x: number | string;
  y: number | string;
}
//#endregion

//#region Internal usage
export type KulChartAxesTypes = "x" | "y";
export type KulChartTooltipDataArray = number[];
export type KulChartTooltipDataDictionary = {
  name?: string;
  source?: string;
  target?: string;
  value?: number;
};
export type KulChartTooltipData =
  | KulChartTooltipDataDictionary
  | KulChartTooltipDataArray;
export interface KulChartTooltipArguments<D extends KulChartTooltipData> {
  data: D;
  dataType: string;
  name: string;
  percent: number;
  seriesName: string;
  source: D extends {
    name?: string;
    source?: string;
    target?: string;
    value?: number;
  }
    ? string
    : undefined;
  target: D extends {
    name?: string;
    source?: string;
    target?: string;
    value?: number;
  }
    ? string
    : undefined;
  value: D extends {
    name?: string;
    source?: string;
    target?: string;
    value?: number;
  }
    ? number
    : undefined;
}
//#endregion

//#region Props
export interface KulChartPropsInterface {
  kulAxis?: KulChartAxis;
  kulColors?: string[];
  kulData?: KulDataDataset;
  kulLegend?: KulChartLegendPlacement;
  kulSeries?: string[];
  kulSizeX?: string;
  kulSizeY?: string;
  kulStyle?: string;
  kulTypes?: KulChartType[];
  kulXAxis?: KulChartXAxis;
  kulYAxis?: KulChartYAxis;
}
export type KulChartType =
  | "area"
  | "bar"
  | "bubble"
  | "calendar"
  | "candlestick"
  | "funnel"
  | "gaussian"
  | "hbar"
  | "heatmap"
  | "line"
  | "pie"
  | "radar"
  | "sankey"
  | "sbar"
  | "scatter";
export type KulChartLegendPlacement =
  | "bottom"
  | "left"
  | "hidden"
  | "right"
  | "top";
export type KulChartXAxis = XAXisComponentOption;
export type KulChartYAxis = YAXisComponentOption;
export type KulChartAxis = string | string[];
export interface KulChartSeriesData {
  name: string;
  data: number[];
  axisIndex: number;
  type: KulChartType;
}
//#endregion
