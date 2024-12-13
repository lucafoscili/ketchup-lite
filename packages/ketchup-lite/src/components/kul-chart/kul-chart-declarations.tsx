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
import { KulComponentAdapter, KulEventPayload } from "src/types/GenericTypes";

//#region Adapter
export interface KulChartAdapter extends KulComponentAdapter<KulChart> {
  handlers: KulChartAdapterHandlers;
  hooks: KulChartAdapterHooks;
}
export interface KulChartAdapterHandlers {
  getColors: (amount: number) => string[];
  onClick: (e: ECElementEvent) => boolean | void;
  setup: KulChartAdapterSetups;
}
export interface KulChartAdapterHooks {
  get: {
    comp: KulChart;
    columnById: (id: string) => KulDataColumn;
    mappedType: (type: KulChartType) => SeriesOption["type"];
    options: KulChartAdapterOptions;
    seriesColumn: (seriesName: string) => KulDataColumn[];
    seriesData: () => KulChartSeriesData[];
    theme: KulChartAdapterTheme;
    xAxesData: () => { id: string; data: string[] }[];
  };
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
export interface KulChartAdapterSetups {
  axis: (
    axisType: KulChartAxesTypes,
  ) => XAXisComponentOption | YAXisComponentOption;
  label: () => EChartsOption;
  legend: () => LegendComponentOption;
  tooltip: (
    formatter?: TooltipComponentFormatterCallback<unknown>,
  ) => TooltipComponentOption;
}
export interface KulChartAdapterTheme {
  backgroundColor: string;
  border: string;
  dangerColor: string;
  font: string;
  successColor: string;
  textColor: string;
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
