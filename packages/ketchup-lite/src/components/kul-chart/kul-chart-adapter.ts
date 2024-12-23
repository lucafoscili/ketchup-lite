import { prepChartHandlers } from "./handlers/chart";
import { basic } from "./helpers/options.basic";
import { bubble } from "./helpers/options.bubble";
import { calendar } from "./helpers/options.calendar";
import { candlestick } from "./helpers/options.candlestick";
import { funnel } from "./helpers/options.funnel";
import { heatmap } from "./helpers/options.heatmap";
import { pie } from "./helpers/options.pie";
import { radar } from "./helpers/options.radar";
import { sankey } from "./helpers/options.sankey";
import {
  KulChartAdapter,
  KulChartAdapterControllerGetters,
  KulChartAdapterControllerSetters,
  KulChartAdapterHandlers,
  KulChartAdapterInitializerGetters,
  KulChartAdapterInitializerSetters,
} from "./kul-chart-declarations";

//#region Adapter
export const createAdapter = (
  getters: KulChartAdapterInitializerGetters,
  setters: KulChartAdapterInitializerSetters,
  getAdapter: () => KulChartAdapter,
): KulChartAdapter => {
  return {
    controller: {
      get: createGetters(getters, getAdapter),
      set: createSetters(setters),
    },
    handlers: createHandlers(getAdapter),
  };
};
//#endregion

//#region Controller
export const createGetters = (
  getters: KulChartAdapterInitializerGetters,
  getAdapter: () => KulChartAdapter,
): KulChartAdapterControllerGetters => {
  return {
    ...getters,
    options: {
      basic: () => basic(getAdapter),
      bubble: () => bubble(getAdapter),
      calendar: () => calendar(getAdapter),
      candlestick: () => candlestick(getAdapter),
      funnel: () => funnel(getAdapter),
      heatmap: () => heatmap(getAdapter),
      pie: () => pie(getAdapter),
      radar: () => radar(getAdapter),
      sankey: () => sankey(getAdapter),
    },
  };
};
export const createSetters = (
  setters: KulChartAdapterInitializerSetters,
): KulChartAdapterControllerSetters => {
  return setters;
};
//#endregion

//#region Handlers
export const createHandlers = (
  getAdapter: () => KulChartAdapter,
): KulChartAdapterHandlers => {
  return prepChartHandlers(getAdapter);
};
//#endregion
