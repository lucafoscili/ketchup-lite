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

import {
  KulDataColumn,
  KulDataDataset,
  KulDataNode,
} from "../../managers/kul-data/kul-data-declarations";
import { KulManager } from "../../managers/kul-manager/kul-manager";
import { KulComponentAdapter, KulEventPayload } from "../../types/GenericTypes";
import { KulChart } from "./kul-chart";

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
    manager: KulManager;
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
export enum KulChartProps {
  kulAxis = "Sets the axis of the chart.",
  kulColors = "Overrides theme's colors.",
  kulData = "The actual data of the chart.",
  kulLegend = "Sets the position of the legend. Supported values: bottom, left, right, top. Keep in mind that legend types are tied to chart types, some combinations might not work.",
  kulSeries = "The data series to be displayed. They must be of the same type.",
  kulSizeX = "The width of the chart, defaults to 100%. Accepts any valid CSS format (px, %, vw, etc.).",
  kulSizeY = "The height of the chart, defaults to 100%. Accepts any valid CSS format (px, %, vh, etc.).",
  kulStyle = "Custom style of the component.",
  kulTypes = "The type of the chart. Supported formats: Line, Pie, Map, Scatter.",
  kulXAxis = "Customization options for the x Axis.",
  kulYAxis = "Customization options for the y Axis.",
}
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
