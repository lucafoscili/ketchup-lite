import {
    ECElementEvent,
    EChartsOption,
    LegendComponentOption,
    SeriesOption,
    TooltipComponentOption,
    XAXisComponentOption,
    YAXisComponentOption,
} from 'echarts';
import {
    KulDataCell,
    KulDataColumn,
    KulDataDataset,
    KulDataNode,
    KulDataShapes,
} from '../../managers/kul-data/kul-data-declarations';
import { KulEventPayload } from '../../types/GenericTypes';
import { KulChart } from './kul-chart';
import { KulManager } from '../../managers/kul-manager/kul-manager';

/*-------------------------------------------------*/
/*                  A d a p t e r                  */
/*-------------------------------------------------*/
export interface KulChartAdapter {
    actions: {
        mapType: (type: KulChartType) => SeriesOption['type'];
        onClick: (e: ECElementEvent) => boolean | void;
        stringify: (str: KulDataCell<KulDataShapes>['value']) => string;
    };
    emit: {
        event: (
            eventType: KulChartEvent,
            data?: KulChartEventData,
            e?: Event
        ) => void;
    };
    get: KulChartAdapterGetters;
}
export interface KulChartAdapterDesign {
    axis: (
        adapter: KulChartAdapter
    ) => XAXisComponentOption | YAXisComponentOption;
    colors: (adapter: KulChartAdapter, count: number) => string[];
    label: (adapter: KulChartAdapter) => EChartsOption;
    legend: (adapter: KulChartAdapter) => LegendComponentOption;
    theme: {
        backgroundColor: string;
        border: string;
        dangerColor: string;
        font: string;
        successColor: string;
        textColor: string;
    };
    tooltip: (adapter: KulChartAdapter) => TooltipComponentOption;
}
export interface KulChartAdapterGetters {
    chart: () => KulChart;
    design: KulChartAdapterDesign;
    manager: () => KulManager;
    options: KulChartAdapterOptions;
    seriesColumn: (seriesName: string) => KulDataColumn[];
    x: () => string[];
    y: () => Record<string, number[]>;
}
export interface KulChartAdapterOptions {
    calendar: (adapter: KulChartAdapter) => EChartsOption;
    candlestick: (adapter: KulChartAdapter) => EChartsOption;
    default: (adapter: KulChartAdapter) => EChartsOption;
    funnel: (adapter: KulChartAdapter) => EChartsOption;
    pie: (adapter: KulChartAdapter) => EChartsOption;
    radar: (adapter: KulChartAdapter) => EChartsOption;
    sankey: (adapter: KulChartAdapter) => EChartsOption;
}
/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
export type KulChartEvent = 'click' | 'ready' | 'unmount';
export interface KulChartEventPayload
    extends KulEventPayload<'KulChart', KulChartEvent> {
    data?: KulChartEventData;
}
export interface KulChartEventData {
    column: KulDataColumn;
    node: KulDataNode;
    x: number | string;
    y: number | string;
}
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
export enum KulChartProps {
    kulAxis = 'Sets the axis of the chart.',
    kulColors = "Overrides theme's colors.",
    kulData = 'The actual data of the chart.',
    kulLegend = 'Sets the position of the legend. Supported values: bottom, left, right, top. Keep in mind that legend types are tied to chart types, some combinations might not work.',
    kulSeries = 'The data series to be displayed. They must be of the same type.',
    kulSizeX = 'The width of the chart, defaults to 100%. Accepts any valid CSS format (px, %, vw, etc.).',
    kulSizeY = 'The height of the chart, defaults to 100%. Accepts any valid CSS format (px, %, vh, etc.).',
    kulStyle = 'Custom style of the component.',
    kulTypes = 'The type of the chart. Supported formats: Line, Pie, Map, Scatter.',
    kulXAxis = 'Customization options for the x Axis.',
    kulYAxis = 'Customization options for the y Axis.',
}
export interface KulChartPropsInterface {
    kulAxis?: string;
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
    | 'area'
    | 'bar'
    | 'bubble'
    | 'calendar'
    | 'candlestick'
    | 'funnel'
    | 'gaussian'
    | 'hbar'
    | 'line'
    | 'pie'
    | 'radar'
    | 'sankey'
    | 'scatter';
export type KulChartLegendPlacement =
    | 'bottom'
    | 'left'
    | 'hidden'
    | 'right'
    | 'top';
export type KulChartXAxis = XAXisComponentOption;
export type KulChartYAxis = YAXisComponentOption;
