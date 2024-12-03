import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  Host,
  h,
  Method,
  Prop,
  State,
} from "@stencil/core";
import { ECharts, dispose, init } from "echarts";

import { onClick } from "./helpers/kul-chart-actions";
import { CHART_DESIGN } from "./helpers/kul-chart-design";
import { CHART_OPTIONS } from "./helpers/kul-chart-options";
import {
  KulChartEventPayload,
  KulChartEvent,
  KulChartType,
  KulChartProps,
  KulChartLegendPlacement,
  KulChartAdapter,
  KulChartEventData,
  KulChartXAxis,
  KulChartYAxis,
  KulChartAxis,
  KulChartSeriesData,
} from "./kul-chart-declarations";
import { KulDataDataset } from "../../managers/kul-data/kul-data-declarations";
import { KulDebugLifecycleInfo } from "../../managers/kul-debug/kul-debug-declarations";
import { kulManagerInstance } from "../../managers/kul-manager/kul-manager";
import { KulThemeColorValues } from "../../managers/kul-theme/kul-theme-declarations";
import { GenericObject } from "../../types/GenericTypes";
import { getProps } from "../../utils/componentUtils";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "../../variables/GenericVariables";

@Component({
  tag: "kul-chart",
  styleUrl: "kul-chart.scss",
  shadow: true,
})
export class KulChart {
  /**
   * References the root HTML element of the component (<kul-chart>).
   */
  @Element() rootElement: HTMLKulChartElement;

  /*-------------------------------------------------*/
  /*                   S t a t e s                   */
  /*-------------------------------------------------*/

  /**
   * Debug information.
   */
  @State() debugInfo: KulDebugLifecycleInfo = {
    endTime: 0,
    renderCount: 0,
    renderEnd: 0,
    renderStart: 0,
    startTime: performance.now(),
  };

  /*-------------------------------------------------*/
  /*                    P r o p s                    */
  /*-------------------------------------------------*/

  /**
   * Sets the axis of the chart.
   * @default ""
   */
  @Prop({ mutable: true }) kulAxis: KulChartAxis = "";
  /**
   * Overrides theme's colors.
   * @default []
   */
  @Prop() kulColors: string[] = [];
  /**
   * The actual data of the chart.
   * @default null
   */
  @Prop() kulData: KulDataDataset = null;
  /**
   * Sets the position of the legend. Supported values: bottom, left, right, top, hidden. Keep in mind that legend types are tied to chart types, some combinations might not work.
   * @default "bottom"
   */
  @Prop() kulLegend: KulChartLegendPlacement = "bottom";
  /**
   * The data series to be displayed. They must be of the same type.
   * @default []
   */
  @Prop() kulSeries: string[] = [];
  /**
   * The width of the chart, defaults to 100%. Accepts any valid CSS format (px, %, vw, etc.).
   * @default "100%"
   */
  @Prop() kulSizeX = "100%";
  /**
   * The height of the chart, defaults to 100%. Accepts any valid CSS format (px, %, vh, etc.).
   * @default "100%"
   */
  @Prop() kulSizeY = "100%";
  /**
   * Custom style of the component.
   * @default ""
   */
  @Prop() kulStyle = "";
  /**
   * The type of the chart. Supported formats: Bar, Gaussian, Line, Pie, Map and Scatter.
   * @default ["line"]
   */
  @Prop() kulTypes: KulChartType[] = ["line"];
  /**
   * Customization options for the x Axis.
   * @default null
   */
  @Prop() kulXAxis: KulChartXAxis = null;
  /**
   * Customization options for the y Axis.
   * @default null
   */
  @Prop() kulYAxis: KulChartYAxis = null;

  /*-------------------------------------------------*/
  /*       I n t e r n a l   V a r i a b l e s       */
  /*-------------------------------------------------*/

  #kulManager = kulManagerInstance();
  #findColumn = this.#kulManager.data.column.find;
  #stringify = this.#kulManager.data.cell.stringify;

  #chartContainer: HTMLDivElement;
  #chartEl: ECharts;

  #axesData: { id: string; data: string[] }[] = [];
  #seriesData: KulChartSeriesData[] = [];

  /*-------------------------------------------------*/
  /*                   E v e n t s                   */
  /*-------------------------------------------------*/

  @Event({
    eventName: "kul-chart-event",
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kulEvent: EventEmitter<KulChartEventPayload>;

  onKulEvent(
    e: Event | CustomEvent,
    eventType: KulChartEvent,
    data?: KulChartEventData,
  ) {
    this.kulEvent.emit({
      comp: this,
      eventType,
      id: this.rootElement.id,
      originalEvent: e,
      data,
    });
  }

  /*-------------------------------------------------*/
  /*           P u b l i c   M e t h o d s           */
  /*-------------------------------------------------*/

  /**
   * Fetches debug information of the component's current state.
   * @returns {Promise<KulDebugLifecycleInfo>} A promise that resolves with the debug information object.
   */
  @Method()
  async getDebugInfo(): Promise<KulDebugLifecycleInfo> {
    return this.debugInfo;
  }
  /**
   * Used to retrieve component's props values.
   * @param {boolean} descriptions - When provided and true, the result will be the list of props with their description.
   * @returns {Promise<GenericObject>} List of props as object, each key will be a prop.
   */
  @Method()
  async getProps(descriptions?: boolean): Promise<GenericObject> {
    return getProps(this, KulChartProps, descriptions);
  }
  /**
   * This method is used to trigger a new render of the component.
   */
  @Method()
  async refresh(): Promise<void> {
    forceUpdate(this);
  }
  /**
   * Initiates the unmount sequence, which removes the component from the DOM after a delay.
   * @param {number} ms - Number of milliseconds
   */
  @Method()
  async unmount(ms: number = 0): Promise<void> {
    setTimeout(() => {
      this.onKulEvent(new CustomEvent("unmount"), "unmount");
      this.rootElement.remove();
    }, ms);
  }

  /*-------------------------------------------------*/
  /*           P r i v a t e   M e t h o d s         */
  /*-------------------------------------------------*/

  #adapter: KulChartAdapter = {
    actions: {
      mapType: (type) => {
        switch (type) {
          case "area":
          case "gaussian":
            return "line";
          case "calendar":
          case "hbar":
          case "sbar":
            return "bar";
          case "bubble":
            return "scatter";
          default:
            return type;
        }
      },
      onClick: (e) => onClick(this.#adapter, e),
      stringify: (str) => this.#stringify(str),
    },
    emit: {
      event: (eventType, data, e = new CustomEvent(eventType)) => {
        this.onKulEvent(e, eventType, data);
      },
    },
    get: {
      chart: () => this,
      columnById: (id: string) => this.#findColumn(this.kulData, { id })[0],
      design: CHART_DESIGN,
      manager: () => this.#kulManager,
      options: CHART_OPTIONS,
      seriesColumn: (series) =>
        this.#findColumn(this.kulData, { title: series }),
      seriesData: () => this.#seriesData,
      xAxesData: () => this.#axesData,
    },
  };

  #init() {
    if (this.#chartEl) {
      dispose(this.#chartContainer);
    }
    if (this.kulTypes && this.kulTypes.length > 0) {
      this.#chartEl = init(this.#chartContainer);
      this.#createChart();
    } else {
      this.#kulManager.debug.logs.new(
        this,
        "Can't initialize chart without specifying at least 1 type.",
        "warning",
      );
    }
  }

  #updateThemeColors() {
    const theme = this.#adapter.get.design.theme;
    const themeVars = this.#kulManager.theme.cssVars;
    theme.backgroundColor = themeVars[KulThemeColorValues.BACKGROUND];
    theme.border = themeVars[KulThemeColorValues.BORDER];
    theme.dangerColor = themeVars[KulThemeColorValues.DANGER];
    theme.font = themeVars["--kul-font-family"];
    theme.successColor = themeVars[KulThemeColorValues.SUCCESS];
    theme.textColor = themeVars[KulThemeColorValues.TEXT];
  }

  #createAxisData() {
    this.#axesData = [];
    const axisIds = this.kulAxis || [];
    const dataset = this.kulData;

    if (dataset?.nodes?.length) {
      for (const axisId of axisIds) {
        const xData: string[] = [];
        for (const node of dataset.nodes) {
          const cell = node.cells?.[axisId];
          xData.push(cell?.value != null ? this.#stringify(cell.value) : "");
        }
        this.#axesData.push({ id: axisId, data: xData });
      }
    }
  }

  #stringToIndexMap(array: string[]): Map<string, number> {
    const map = new Map<string, number>();
    array.forEach((value, index) => map.set(value, index));
    return map;
  }

  #createSeriesData() {
    this.#seriesData = [];
    const seriesIds = this.kulSeries || [];
    const dataset = this.kulData;

    if (dataset?.nodes?.length) {
      const xCategories = this.#axesData[0]?.data || [];
      const yCategories = this.#axesData[1]?.data || [];
      const xMap = this.#stringToIndexMap(xCategories);
      const yMap = this.#stringToIndexMap(yCategories);

      for (let index = 0; index < seriesIds.length; index++) {
        const seriesId = seriesIds[index];
        const seriesType =
          this.kulTypes?.[index] || this.kulTypes?.[0] || "line";
        const seriesValues: any[] = [];

        if (seriesType === "heatmap") {
          for (const node of dataset.nodes) {
            const xValue = this.#stringify(node.cells[this.kulAxis[0]]?.value);
            const yValue = this.#stringify(node.cells[this.kulAxis[1]]?.value);
            const value = parseFloat(
              this.#stringify(node.cells[seriesId]?.value) || "0",
            );
            seriesValues.push([xMap.get(xValue), yMap.get(yValue), value]);
          }
        } else {
          // For line series
          const lineDataMap = new Map<string, number>();
          for (const node of dataset.nodes) {
            const xValue = this.#stringify(node.cells[this.kulAxis[0]]?.value);
            const value = parseFloat(
              this.#stringify(node.cells[seriesId]?.value) || "0",
            );
            lineDataMap.set(xValue, value);
          }
          // Ensure data aligns with x-axis categories
          for (const xValue of xCategories) {
            seriesValues.push(lineDataMap.get(xValue) ?? 0);
          }
        }

        const seriesName =
          this.#findColumn(dataset, { id: seriesId })?.[0]?.title || seriesId;
        const axisIndex = 0; // Assign to the primary axis or adjust as needed

        this.#seriesData.push({
          name: seriesName,
          data: seriesValues,
          axisIndex,
          type: seriesType,
        });
      }
    }
  }

  async #createChart() {
    this.#createAxisData();
    this.#createSeriesData();
    const options = this.#createChartOptions();
    this.#chartEl.setOption(options, true);

    this.#chartEl.on("click", this.#adapter.actions.onClick);
  }

  #createChartOptions() {
    const options = this.#adapter.get.options;
    const firstType = this.kulTypes?.[0] || "line";

    switch (firstType) {
      case "bubble":
        return options.bubble(this.#adapter);
      case "calendar":
        return options.calendar(this.#adapter);
      case "candlestick":
        return options.candlestick(this.#adapter);
      case "funnel":
        return options.funnel(this.#adapter);
      case "heatmap":
        return options.heatmap(this.#adapter);
      case "pie":
        return options.pie(this.#adapter);
      case "radar":
        return options.radar(this.#adapter);
      case "sankey":
        return options.sankey(this.#adapter);
      default:
        this.#createAxisData();
        return options.default(this.#adapter);
    }
  }

  /*-------------------------------------------------*/
  /*          L i f e c y c l e   H o o k s          */
  /*-------------------------------------------------*/

  componentWillLoad() {
    this.#kulManager.theme.register(this);
    if (typeof this.kulAxis === "string") {
      this.kulAxis = [this.kulAxis];
    }
  }

  componentDidLoad() {
    this.onKulEvent(new CustomEvent("ready"), "ready");
    this.#kulManager.debug.updateDebugInfo(this, "did-load");
  }

  componentWillRender() {
    this.#updateThemeColors();
    this.#kulManager.debug.updateDebugInfo(this, "will-render");
  }

  componentDidRender() {
    if (this.kulData && this.kulData.columns && this.kulData.nodes) {
      this.#init();
    } else {
      this.#kulManager.debug.logs.new(
        this,
        "Not enough data. (" + JSON.stringify(this.kulData) + ")",
        "informational",
      );
    }
    this.#kulManager.debug.updateDebugInfo(this, "did-render");
  }

  render() {
    const style = {
      "--kul_chart_height": this.kulSizeY || "100%",
      "--kul_chart_width": this.kulSizeX || "100%",
    };

    return (
      <Host style={style}>
        {this.kulStyle ? (
          <style id={KUL_STYLE_ID}>
            {this.#kulManager.theme.setKulStyle(this)}
          </style>
        ) : undefined}
        <div
          id={KUL_WRAPPER_ID}
          ref={(chartContainer) => (this.#chartContainer = chartContainer)}
        ></div>
      </Host>
    );
  }

  disconnectedCallback() {
    this.#kulManager.theme.unregister(this);
  }
}
