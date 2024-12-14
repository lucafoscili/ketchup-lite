import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  h,
  Host,
  Method,
  Prop,
  State,
} from "@stencil/core";
import { dispose, ECharts, init } from "echarts";

import { kulManagerSingleton } from "src";
import {
  createHandlers,
  createOptionsStateGetters,
  createStyleStateGetters,
} from "src/components/kul-chart/helpers/kul-chart-hub";
import {
  KulChartAdapter,
  KulChartAdapterLayoutStyle,
  KulChartAxis,
  KulChartEvent,
  KulChartEventData,
  KulChartEventPayload,
  KulChartLegendPlacement,
  KulChartSeriesData,
  KulChartType,
  KulChartXAxis,
  KulChartYAxis,
} from "src/components/kul-chart/kul-chart-declarations";
import { KulDataDataset } from "src/managers/kul-data/kul-data-declarations";
import { KulDebugLifecycleInfo } from "src/managers/kul-debug/kul-debug-declarations";
import { KulThemeColorValues } from "src/managers/kul-theme/kul-theme-declarations";
import { GenericObject } from "src/types/GenericTypes";
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from "src/variables/GenericVariables";

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

  //#region States
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
  /**
   * Layout style.
   */
  @State() layoutStyle: KulChartAdapterLayoutStyle = {
    background: null,
    border: null,
    danger: null,
    font: null,
    success: null,
    text: null,
  };
  //#endregion

  //#region Props
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
  //#endregion

  //#region Internal variables
  #findColumn = kulManagerSingleton.data.column.find;
  #stringify = kulManagerSingleton.data.cell.stringify;
  #chartContainer: HTMLDivElement;
  #chartEl: ECharts;
  #axesData: { id: string; data: string[] }[] = [];
  #seriesData: KulChartSeriesData[] = [];
  #adapter: KulChartAdapter = {
    handlers: null,
    state: {
      get: {
        compInstance: this,
        columnById: (id: string) => this.#findColumn(this.kulData, { id })[0],
        mappedType: (type) => {
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
        options: null,
        seriesColumn: (series) =>
          this.#findColumn(this.kulData, { title: series }),
        seriesData: () => this.#seriesData,
        style: null,
        xAxesData: () => this.#axesData,
      },
      set: null,
    },
  };
  //#endregion

  //#region Events
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
  //#endregion

  //#region Public methods
  /**
   * Fetches debug information of the component's current state.
   * @returns {Promise<KulDebugLifecycleInfo>} A promise that resolves with the debug information object.
   */
  @Method()
  async getDebugInfo(): Promise<KulDebugLifecycleInfo> {
    return this.debugInfo;
  }
  /**
   * Used to retrieve component's properties and descriptions.
   * @returns {Promise<GenericObject>} Promise resolved with an object containing the component's properties.
   */
  @Method()
  async getProps(): Promise<GenericObject> {
    const { getProps } = kulManagerSingleton;

    return getProps(this);
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
  //#endregion

  //#region Private methods
  #init() {
    const { debug } = kulManagerSingleton;

    if (this.#chartEl) {
      dispose(this.#chartContainer);
    }
    if (this.kulTypes && this.kulTypes.length > 0) {
      this.#chartEl = init(this.#chartContainer);
      this.#createChart();
    } else {
      debug.logs.new(
        this,
        "Can't initialize chart without specifying at least 1 type.",
        "warning",
      );
    }
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
          const lineDataMap = new Map<string, number>();
          for (const node of dataset.nodes) {
            const xValue = this.#stringify(node.cells[this.kulAxis[0]]?.value);
            const value = parseFloat(
              this.#stringify(node.cells[seriesId]?.value) || "0",
            );
            lineDataMap.set(xValue, value);
          }
          for (const xValue of xCategories) {
            seriesValues.push(lineDataMap.get(xValue) ?? 0);
          }
        }

        const seriesName =
          this.#findColumn(dataset, { id: seriesId })?.[0]?.title || seriesId;
        const axisIndex = 0;

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

    this.#chartEl.on("click", this.#adapter.handlers.onClick);
  }
  #createChartOptions() {
    const { state } = this.#adapter;
    const { get } = state;
    const { options } = get;
    const {
      basic,
      bubble,
      calendar,
      candlestick,
      funnel,
      heatmap,
      pie,
      radar,
      sankey,
    } = options;

    const firstType = this.kulTypes?.[0] || "line";

    switch (firstType) {
      case "bubble":
        return bubble();
      case "calendar":
        return calendar();
      case "candlestick":
        return candlestick();
      case "funnel":
        return funnel();
      case "heatmap":
        return heatmap();
      case "pie":
        return pie();
      case "radar":
        return radar();
      case "sankey":
        return sankey();
      default:
        this.#createAxisData();
        return basic();
    }
  }
  #updateThemeColors() {
    const { theme } = kulManagerSingleton;
    const { cssVars } = theme;
    const { layoutStyle } = this;

    layoutStyle.background = cssVars[KulThemeColorValues.BACKGROUND];
    layoutStyle.border = cssVars[KulThemeColorValues.BORDER];
    layoutStyle.danger = cssVars[KulThemeColorValues.DANGER];
    layoutStyle.font = cssVars["--kul-font-family"];
    layoutStyle.success = cssVars[KulThemeColorValues.SUCCESS];
    layoutStyle.text = cssVars[KulThemeColorValues.TEXT];
  }
  //#endregion

  //#region Lifecycle hooks
  componentWillLoad() {
    const { theme } = kulManagerSingleton;

    theme.register(this);

    this.#updateThemeColors();

    this.#adapter.handlers = createHandlers(this.#adapter);
    this.#adapter.state.get.options = createOptionsStateGetters(this.#adapter);
    this.#adapter.state.get.style = createStyleStateGetters(
      this.#adapter,
      this.layoutStyle,
    );

    if (typeof this.kulAxis === "string") {
      this.kulAxis = [this.kulAxis];
    }
  }
  componentDidLoad() {
    const { debug } = kulManagerSingleton;

    this.onKulEvent(new CustomEvent("ready"), "ready");
    debug.updateDebugInfo(this, "did-load");
  }
  componentWillUpdate() {
    this.#updateThemeColors();
  }
  componentWillRender() {
    const { debug } = kulManagerSingleton;

    debug.updateDebugInfo(this, "will-render");
  }
  componentDidRender() {
    const { debug } = kulManagerSingleton;
    const { kulData } = this;

    if (kulData?.columns && kulData?.nodes) {
      this.#init();
    } else {
      debug.logs.new(
        this,
        "Not enough data. (" + JSON.stringify(kulData) + ")",
        "informational",
      );
    }
    debug.updateDebugInfo(this, "did-render");
  }
  render() {
    const { theme } = kulManagerSingleton;
    const { kulSizeX, kulSizeY, kulStyle } = this;

    const style = {
      "--kul_chart_height": kulSizeY || "100%",
      "--kul_chart_width": kulSizeX || "100%",
    };

    return (
      <Host style={style}>
        {kulStyle && <style id={KUL_STYLE_ID}>{theme.setKulStyle(this)}</style>}
        <div
          id={KUL_WRAPPER_ID}
          ref={(chartContainer) => (this.#chartContainer = chartContainer)}
        ></div>
      </Host>
    );
  }
  disconnectedCallback() {
    const { theme } = kulManagerSingleton;

    theme.unregister(this);
  }
  //#endregion
}
