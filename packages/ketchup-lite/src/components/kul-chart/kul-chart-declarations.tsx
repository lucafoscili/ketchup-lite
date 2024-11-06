import {
    ECElementEvent,
    EChartsOption,
    LegendComponentOption,
    SeriesOption,
    TooltipComponentFormatterCallback,
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
        adapter: KulChartAdapter,
        axisType: 'x' | 'y'
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
    tooltip: (
        adapter: KulChartAdapter,
        formatter?: TooltipComponentFormatterCallback<unknown>
    ) => TooltipComponentOption;
}
export interface KulChartAdapterGetters {
    chart: () => KulChart;
    columnById: (id: string) => KulDataColumn;
    design: KulChartAdapterDesign;
    manager: () => KulManager;
    options: KulChartAdapterOptions;
    seriesColumn: (seriesName: string) => KulDataColumn[];
    xAxesData: () => { id: string; data: string[] }[];
    seriesData: () => KulChartSeriesData[];
}
export interface KulChartAdapterOptions {
    bubble: (adapter: KulChartAdapter) => EChartsOption;
    calendar: (adapter: KulChartAdapter) => EChartsOption;
    candlestick: (adapter: KulChartAdapter) => EChartsOption;
    default: (adapter: KulChartAdapter) => EChartsOption;
    funnel: (adapter: KulChartAdapter) => EChartsOption;
    heatmap: (adapter: KulChartAdapter) => EChartsOption;
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
    | 'area'
    | 'bar'
    | 'bubble'
    | 'calendar'
    | 'candlestick'
    | 'funnel'
    | 'gaussian'
    | 'hbar'
    | 'heatmap'
    | 'line'
    | 'pie'
    | 'radar'
    | 'sankey'
    | 'sbar'
    | 'scatter';
export type KulChartLegendPlacement =
    | 'bottom'
    | 'left'
    | 'hidden'
    | 'right'
    | 'top';
export type KulChartXAxis = XAXisComponentOption;
export type KulChartYAxis = YAXisComponentOption;
export type KulChartAxis = string | string[];
export interface KulChartSeriesData {
    name: string;
    data: number[];
    axisIndex: number;
    type: KulChartType;
}
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
