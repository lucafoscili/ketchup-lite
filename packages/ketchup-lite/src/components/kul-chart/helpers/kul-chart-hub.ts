import { onClick } from "src/components/kul-chart/handlers/kul-chart-main";
import { basic } from "src/components/kul-chart/helpers/kul-chart-basic";
import { bubble } from "src/components/kul-chart/helpers/kul-chart-bubble";
import { calendar } from "src/components/kul-chart/helpers/kul-chart-calendar";
import { candlestick } from "src/components/kul-chart/helpers/kul-chart-candlestick";
import { funnel } from "src/components/kul-chart/helpers/kul-chart-funnel";
import { heatmap } from "src/components/kul-chart/helpers/kul-chart-heatmap";
import { pie } from "src/components/kul-chart/helpers/kul-chart-pie";
import { radar } from "src/components/kul-chart/helpers/kul-chart-radar";
import { sankey } from "src/components/kul-chart/helpers/kul-chart-sankey";
import {
  prepAxis,
  prepLabel,
  prepLegend,
  prepSeries,
  prepTooltip,
} from "src/components/kul-chart/helpers/kul-chart-utils";
import {
  KulChartAdapter,
  KulChartAdapterHandlers,
  KulChartAdapterLayoutStyle,
  KulChartAdapterOptions,
  KulChartAdapterStyle,
} from "src/components/kul-chart/kul-chart-declarations";

//#region Handlers
export const createHandlers: (
  adapter: KulChartAdapter,
) => KulChartAdapterHandlers = (adapter) => {
  return {
    onClick: (e) => onClick(adapter, e),
  };
};
//#endregion

//#region State getters
export const createOptionsStateGetters: (
  adapter: KulChartAdapter,
) => KulChartAdapterOptions = (adapter) => {
  return {
    basic: () => basic(adapter),
    bubble: () => bubble(adapter),
    calendar: () => calendar(adapter),
    candlestick: () => candlestick(adapter),
    funnel: () => funnel(adapter),
    heatmap: () => heatmap(adapter),
    pie: () => pie(adapter),
    radar: () => radar(adapter),
    sankey: () => sankey(adapter),
  };
};
export const createStyleStateGetters: (
  adapter: KulChartAdapter,
  layout: KulChartAdapterLayoutStyle,
) => KulChartAdapterStyle = (adapter, layout) => {
  return {
    axis: (axisType) => prepAxis(adapter, axisType),
    label: () => prepLabel(adapter),
    layout: layout,
    legend: () => prepLegend(adapter),
    series: (amount: number) => prepSeries(adapter, amount),
    tooltip: (formatter) => prepTooltip(adapter, formatter),
  };
};
//#endregion
