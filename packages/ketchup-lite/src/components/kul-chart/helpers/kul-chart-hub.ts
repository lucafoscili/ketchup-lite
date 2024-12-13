import {
  getColors,
  onClick,
  prepSetups,
} from "src/components/kul-chart/handlers/kul-chart-main";
import {
  basic,
  bubble,
  calendar,
  candlestick,
  funnel,
  heatmap,
  pie,
  radar,
  sankey,
} from "src/components/kul-chart/helpers/kul-chart-options";
import {
  KulChartAdapter,
  KulChartAdapterHandlers,
  KulChartAdapterOptions,
} from "src/components/kul-chart/kul-chart-declarations";

export const createHandlers: (
  adapter: KulChartAdapter,
) => KulChartAdapterHandlers = (adapter) => {
  return {
    getColors: (amount: number) => getColors(adapter, amount),
    onClick: (e) => onClick(adapter, e),
    setup: prepSetups(adapter),
  };
};

export const createOptions: (
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
