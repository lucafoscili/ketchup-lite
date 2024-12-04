import { KulChartType, KulDataDataset } from "../../../../components";
import {
  KulComponentEventName,
  KulComponentEventPayloadName,
  KulComponentName,
  KulComponentTag,
} from "../../../../types/GenericTypes";
import { KulArticleDataset } from "../../../kul-article/kul-article-declarations";
import { SECTION_FACTORY } from "../../helpers/kul-showcase-section";
import { DOC_IDS } from "../../kul-showcase-data";
import { ChartData } from "./kul-showcase-chart-declarations";

const COMPONENT_NAME: KulComponentName = "KulChart";
const EVENT_NAME: KulComponentEventName<"KulChart"> = "kul-chart-event";
const PAYLOAD_NAME: KulComponentEventPayloadName<"KulChart"> =
  "KulChartEventPayload";
const TAG_NAME: KulComponentTag<"KulChart"> = "kul-chart";

export const CHART_FIXTURES: () => {
  documentation: KulArticleDataset;
  examples: ChartData;
} = () => {
  const baseData = {
    columns: [
      {
        id: "Axis",
        title: "Department",
      },
      {
        id: "Series_1",
        title: "Current Budget",
      },
      {
        id: "Series_2",
        title: "Projected Budget",
      },
      {
        id: "Series_3",
        title: "Allocated Budget",
      },
      {
        id: "Series_4",
        title: "Expenditures",
      },
      {
        id: "Series_5",
        title: "Savings",
      },
    ],
    nodes: [
      {
        cells: {
          Axis: {
            value: "Digital Marketing",
          },
          Series_1: {
            value: "15000",
          },
          Series_2: {
            value: "16000",
          },
          Series_3: {
            value: "15500",
          },
          Series_4: {
            value: "14500",
          },
          Series_5: {
            value: "500",
          },
        },
        id: "0",
      },
      {
        cells: {
          Axis: {
            value: "E-commerce Sales",
          },
          Series_1: {
            value: "8000",
          },
          Series_2: {
            value: "9000",
          },
          Series_3: {
            value: "8500",
          },
          Series_4: {
            value: "7500",
          },
          Series_5: {
            value: "1000",
          },
        },
        id: "1",
      },
      {
        cells: {
          Axis: {
            value: "Administrative Services",
          },
          Series_1: {
            value: "6000",
          },
          Series_2: {
            value: "6500",
          },
          Series_3: {
            value: "6250",
          },
          Series_4: {
            value: "6000",
          },
          Series_5: {
            value: "250",
          },
        },
        id: "2",
      },
      {
        cells: {
          Axis: {
            value: "Product Development",
          },
          Series_1: {
            value: "20000",
          },
          Series_2: {
            value: "22000",
          },
          Series_3: {
            value: "21000",
          },
          Series_4: {
            value: "20500",
          },
          Series_5: {
            value: "9500",
          },
        },
        id: "3",
      },
      {
        cells: {
          Axis: {
            value: "Customer Support",
          },
          Series_1: {
            value: "10000",
          },
          Series_2: {
            value: "11000",
          },
          Series_3: {
            value: "10500",
          },
          Series_4: {
            value: "10000",
          },
          Series_5: {
            value: "500",
          },
        },
        id: "4",
      },
    ],
  };
  const data: Partial<{
    [K in KulChartType]: () => KulDataDataset;
  }> = {
    bar: () => ({
      ...baseData,
      columns: baseData.columns,
      nodes: baseData.nodes.map((node) => ({
        ...node,
        cells: {
          ...node.cells,
          Series_1: {
            value: (
              parseInt(node.cells.Series_1.value as string) + 500
            ).toString(),
          },
          Series_2: {
            value: (
              parseInt(node.cells.Series_2.value as string) + 700
            ).toString(),
          },
        },
      })),
    }),
    bubble: () => ({
      columns: [
        { id: "X_Value", title: "X Axis Value" },
        { id: "Y_Value", title: "Y Axis Value" },
        { id: "Bubble_Size", title: "Bubble Size" },
      ],
      nodes: [
        {
          id: "0",
          cells: {
            X_Value: { value: "10" },
            Y_Value: { value: "15" },
            Bubble_Size: { value: "8" },
          },
        },
        {
          id: "1",
          cells: {
            X_Value: { value: "20" },
            Y_Value: { value: "25" },
            Bubble_Size: { value: "15" },
          },
        },
        {
          id: "2",
          cells: {
            X_Value: { value: "30" },
            Y_Value: { value: "35" },
            Bubble_Size: { value: "12" },
          },
        },
        {
          id: "3",
          cells: {
            X_Value: { value: "40" },
            Y_Value: { value: "45" },
            Bubble_Size: { value: "20" },
          },
        },
        {
          id: "4",
          cells: {
            X_Value: { value: "50" },
            Y_Value: { value: "55" },
            Bubble_Size: { value: "25" },
          },
        },
        {
          id: "5",
          cells: {
            X_Value: { value: "60" },
            Y_Value: { value: "65" },
            Bubble_Size: { value: "18" },
          },
        },
        {
          id: "6",
          cells: {
            X_Value: { value: "70" },
            Y_Value: { value: "75" },
            Bubble_Size: { value: "30" },
          },
        },
        {
          id: "7",
          cells: {
            X_Value: { value: "80" },
            Y_Value: { value: "85" },
            Bubble_Size: { value: "22" },
          },
        },
        {
          id: "8",
          cells: {
            X_Value: { value: "90" },
            Y_Value: { value: "95" },
            Bubble_Size: { value: "10" },
          },
        },
        {
          id: "9",
          cells: {
            X_Value: { value: "100" },
            Y_Value: { value: "105" },
            Bubble_Size: { value: "5" },
          },
        },
      ],
    }),
    calendar: () => {
      const today = new Date();
      const dataPoints = 365;
      const nodes = [];

      for (let i = 0; i < dataPoints; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        nodes.push({
          id: i.toString(),
          cells: {
            Date: { value: date.toISOString().split("T")[0] },
            Value: {
              value: Math.floor(Math.random() * 100).toString(),
            },
          },
        });
      }

      return {
        columns: [
          { id: "Date", title: "Date" },
          { id: "Value", title: "Value" },
        ],
        nodes,
      };
    },
    candlestick: () => ({
      columns: [
        { id: "Date", title: "Date" },
        { id: "Open", title: "Open" },
        { id: "Close", title: "Close" },
        { id: "Low", title: "Low" },
        { id: "High", title: "High" },
      ],
      nodes: [
        {
          id: "0",
          cells: {
            Date: { value: "2024-11-01" },
            Open: { value: "100" },
            Close: { value: "110" },
            Low: { value: "95" },
            High: { value: "115" },
          },
        },
        {
          id: "1",
          cells: {
            Date: { value: "2024-11-02" },
            Open: { value: "110" },
            Close: { value: "105" },
            Low: { value: "100" },
            High: { value: "120" },
          },
        },
        {
          id: "2",
          cells: {
            Date: { value: "2024-11-03" },
            Open: { value: "105" },
            Close: { value: "115" },
            Low: { value: "102" },
            High: { value: "118" },
          },
        },
        {
          id: "3",
          cells: {
            Date: { value: "2024-11-04" },
            Open: { value: "115" },
            Close: { value: "120" },
            Low: { value: "110" },
            High: { value: "125" },
          },
        },
      ],
    }),
    funnel: () => ({
      columns: [
        { id: "Stage", title: "Stage" },
        { id: "Value", title: "Value" },
        { id: "Revenue", title: "Revenue" },
      ],
      nodes: [
        {
          id: "0",
          cells: {
            Stage: { value: "Prospects" },
            Value: { value: "500" },
            Revenue: { value: "2000" },
          },
        },
        {
          id: "1",
          cells: {
            Stage: { value: "Qualified Leads" },
            Value: { value: "300" },
            Revenue: { value: "1500" },
          },
        },
        {
          id: "2",
          cells: {
            Stage: { value: "Proposals" },
            Value: { value: "200" },
            Revenue: { value: "1200" },
          },
        },
        {
          id: "3",
          cells: {
            Stage: { value: "Negotiations" },
            Value: { value: "100" },
            Revenue: { value: "800" },
          },
        },
        {
          id: "4",
          cells: {
            Stage: { value: "Closed Deals" },
            Value: { value: "50" },
            Revenue: { value: "500" },
          },
        },
      ],
    }),
    gaussian: () => ({
      columns: [
        { id: "X", title: "X Axis (Value)" },
        { id: "Frequency", title: "Frequency" },
      ],
      nodes: [
        {
          id: "0",
          cells: { X: { value: "-3" }, Frequency: { value: "5" } },
        },
        {
          id: "1",
          cells: { X: { value: "-2" }, Frequency: { value: "15" } },
        },
        {
          id: "2",
          cells: { X: { value: "-1" }, Frequency: { value: "40" } },
        },
        {
          id: "3",
          cells: { X: { value: "0" }, Frequency: { value: "70" } },
        },
        {
          id: "4",
          cells: { X: { value: "1" }, Frequency: { value: "40" } },
        },
        {
          id: "5",
          cells: { X: { value: "2" }, Frequency: { value: "15" } },
        },
        {
          id: "6",
          cells: { X: { value: "3" }, Frequency: { value: "5" } },
        },
      ],
    }),
    heatmap: () => ({
      columns: [
        { id: "Source_Channel", title: "Source Channel Intensity" },
        { id: "Target_Channel", title: "Target Channel Intensity" },
        { id: "Mapping_Count", title: "Mapping Count" },
      ],
      nodes: [
        {
          id: "0",
          cells: {
            Source_Channel: { value: "20" },
            Target_Channel: { value: "25" },
            Mapping_Count: { value: "12" },
          },
        },
        {
          id: "1",
          cells: {
            Source_Channel: { value: "45" },
            Target_Channel: { value: "55" },
            Mapping_Count: { value: "8" },
          },
        },
        {
          id: "2",
          cells: {
            Source_Channel: { value: "60" },
            Target_Channel: { value: "65" },
            Mapping_Count: { value: "20" },
          },
        },
        {
          id: "3",
          cells: {
            Source_Channel: { value: "100" },
            Target_Channel: { value: "110" },
            Mapping_Count: { value: "25" },
          },
        },
        {
          id: "4",
          cells: {
            Source_Channel: { value: "125" },
            Target_Channel: { value: "130" },
            Mapping_Count: { value: "18" },
          },
        },
        {
          id: "5",
          cells: {
            Source_Channel: { value: "150" },
            Target_Channel: { value: "140" },
            Mapping_Count: { value: "30" },
          },
        },
        {
          id: "6",
          cells: {
            Source_Channel: { value: "175" },
            Target_Channel: { value: "170" },
            Mapping_Count: { value: "22" },
          },
        },
        {
          id: "7",
          cells: {
            Source_Channel: { value: "200" },
            Target_Channel: { value: "210" },
            Mapping_Count: { value: "15" },
          },
        },
        {
          id: "8",
          cells: {
            Source_Channel: { value: "225" },
            Target_Channel: { value: "230" },
            Mapping_Count: { value: "10" },
          },
        },
        {
          id: "9",
          cells: {
            Source_Channel: { value: "240" },
            Target_Channel: { value: "250" },
            Mapping_Count: { value: "5" },
          },
        },
      ],
    }),
    line: () => baseData,
    pie: () => ({
      columns: [
        { id: "Axis", title: "Department" },
        { id: "Series_1", title: "Current Budget" },
        { id: "Series_2", title: "Projected Budget" },
        { id: "Series_3", title: "Allocated Budget" },
        { id: "Series_4", title: "Expenditures" },
        { id: "Series_5", title: "Savings" },
      ],
      nodes: [
        {
          id: "0",
          cells: {
            Axis: { value: "Digital Marketing" },
            Series_1: { value: "15000" },
            Series_2: { value: "16000" },
            Series_3: { value: "15500" },
            Series_4: { value: "14500" },
            Series_5: { value: "500" },
          },
        },
        {
          id: "1",
          cells: {
            Axis: { value: "E-commerce Sales" },
            Series_1: { value: "8000" },
            Series_2: { value: "9000" },
            Series_3: { value: "8500" },
            Series_4: { value: "7500" },
            Series_5: { value: "1000" },
          },
        },
        {
          id: "2",
          cells: {
            Axis: { value: "Administrative Services" },
            Series_1: { value: "6000" },
            Series_2: { value: "6500" },
            Series_3: { value: "6250" },
            Series_4: { value: "6000" },
            Series_5: { value: "250" },
          },
        },
        {
          id: "3",
          cells: {
            Axis: { value: "Product Development" },
            Series_1: { value: "20000" },
            Series_2: { value: "22000" },
            Series_3: { value: "21000" },
            Series_4: { value: "20500" },
            Series_5: { value: "9500" },
          },
        },
        {
          id: "4",
          cells: {
            Axis: { value: "Customer Support" },
            Series_1: { value: "10000" },
            Series_2: { value: "11000" },
            Series_3: { value: "10500" },
            Series_4: { value: "10000" },
            Series_5: { value: "500" },
          },
        },
      ],
    }),
    radar: () => ({
      columns: [
        { id: "Axis", title: "Category" },
        { id: "Speed", title: "Speed" },
        { id: "Agility", title: "Agility" },
        { id: "Strength", title: "Strength" },
        { id: "Endurance", title: "Endurance" },
        { id: "Intelligence", title: "Intelligence" },
      ],
      nodes: [
        {
          id: "0",
          cells: {
            Axis: { value: "Competitor A" },
            Speed: { value: "80" },
            Agility: { value: "70" },
            Strength: { value: "90" },
            Endurance: { value: "60" },
            Intelligence: { value: "85" },
          },
        },
        {
          id: "1",
          cells: {
            Axis: { value: "Competitor B" },
            Speed: { value: "75" },
            Agility: { value: "80" },
            Strength: { value: "85" },
            Endurance: { value: "70" },
            Intelligence: { value: "80" },
          },
        },
      ],
    }),
    sankey: () => ({
      columns: [
        { id: "Source", title: "Source" },
        { id: "Target", title: "Target" },
        { id: "Value", title: "Value" },
      ],
      nodes: [
        {
          id: "0",
          cells: {
            Source: { value: "Marketing" },
            Target: { value: "Sales" },
            Value: { value: "300" },
          },
        },
        {
          id: "1",
          cells: {
            Source: { value: "Sales" },
            Target: { value: "Support" },
            Value: { value: "150" },
          },
        },
        {
          id: "2",
          cells: {
            Source: { value: "Marketing" },
            Target: { value: "Development" },
            Value: { value: "200" },
          },
        },
        {
          id: "3",
          cells: {
            Source: { value: "Development" },
            Target: { value: "Operations" },
            Value: { value: "100" },
          },
        },
      ],
    }),
    scatter: () => ({
      columns: [
        { id: "X", title: "X Axis" },
        { id: "Y", title: "Y Axis" },
      ],
      nodes: [
        { id: "0", cells: { X: { value: "10" }, Y: { value: "20" } } },
        { id: "1", cells: { X: { value: "15" }, Y: { value: "30" } } },
        { id: "2", cells: { X: { value: "20" }, Y: { value: "40" } } },
        { id: "3", cells: { X: { value: "25" }, Y: { value: "50" } } },
        { id: "4", cells: { X: { value: "30" }, Y: { value: "60" } } },
      ],
    }),
  };

  const mixedHeatmap: () => KulDataDataset = () => {
    const xCategories = ["A", "B", "C", "D", "E"];
    const yCategories = ["W", "X", "Y", "Z"];
    const nodes = [];

    for (let i = 0; i < xCategories.length; i++) {
      for (let j = 0; j < yCategories.length; j++) {
        nodes.push({
          id: `${i}-${j}`,
          cells: {
            X: { value: xCategories[i] },
            Y: { value: yCategories[j] },
            Heat_Value: {
              value: Math.floor(Math.random() * 100).toString(),
            },
            Line_Value: { value: (i + j).toString() }, // Simple function for line values
          },
        });
      }
    }

    return {
      columns: [
        { id: "X", title: "X Axis" },
        { id: "Y", title: "Y Axis" },
        { id: "Heat_Value", title: "Heatmap Value" },
        { id: "Line_Value", title: "Line Value" },
      ],
      nodes,
    };
  };

  const documentation: KulArticleDataset = {
    nodes: [
      {
        id: DOC_IDS.root,
        value: COMPONENT_NAME,
        children: [
          SECTION_FACTORY.overview(
            COMPONENT_NAME,
            "is designed to plot data on charts",
          ),
          SECTION_FACTORY.usage(COMPONENT_NAME, {
            data: JSON.stringify({
              columns: [
                { id: "my_column_1", title: "My column" },
                { id: "my_column_2", title: "My column (2)" },
              ],
              nodes: [
                { id: "my_node_1", value: 1 },
                { id: "my_node_2", value: 2 },
              ],
            } as KulDataDataset),
            tag: TAG_NAME,
          }),
          SECTION_FACTORY.props(TAG_NAME),
          SECTION_FACTORY.events(
            COMPONENT_NAME,
            PAYLOAD_NAME,
            [
              {
                type: "click",
                description: "emitted when the component is clicked",
              },
              {
                type: "ready",
                description:
                  "emitted when the component completes its first complete lifecycle",
              },
              {
                type: "unmount",
                description:
                  "emitted when the component is disconnected from the DOM",
              },
            ],
            EVENT_NAME,
          ),
          SECTION_FACTORY.methods(TAG_NAME),
          SECTION_FACTORY.styling(TAG_NAME),
        ],
      },
    ],
  };

  return {
    documentation,
    examples: {
      area: {
        ["data-description"]: "Area",
        kulAxis: "Axis",
        kulData: data.line(),
        kulSeries: ["Series_1", "Series_2", "Series_3", "Series_4", "Series_5"],
        kulSizeY: "400px",
        kulTypes: ["area"],
      },
      bar: {
        ["data-description"]: "Bar",
        kulAxis: "Axis",
        kulData: data.bar(),
        kulSeries: ["Series_1"],
        kulSizeY: "400px",
        kulTypes: ["bar"],
      },
      bubble: {
        ["data-description"]: "Bubble",
        kulAxis: ["X_Value", "Y_Value"],
        kulData: data.bubble(),
        kulSeries: ["Bubble_Size"],
        kulSizeY: "400px",
        kulTypes: ["bubble"],
      },
      calendar: {
        ["data-description"]: "Calendar",
        kulAxis: "Date",
        kulData: data.calendar(),
        kulSeries: ["Value"],
        kulSizeY: "400px",
        kulTypes: ["calendar"],
      },
      candlestick: {
        ["data-description"]: "Candlestick",
        kulAxis: "Date",
        kulData: data.candlestick(),
        kulSeries: ["Open", "Close", "Low", "High"],
        kulSizeY: "400px",
        kulTypes: ["candlestick"],
      },
      dualAxis: {
        ["data-description"]: "Dual Axis Chart",
        kulAxis: ["Axis"],
        kulData: data.line(),
        kulSeries: ["Series_1", "Series_2", "Series_3", "Series_4"],
        kulSizeY: "400px",
        kulTypes: ["bar", "bar", "line", "line"],
      },
      funnel: {
        ["data-description"]: "Funnel",
        kulAxis: "Stage",
        kulData: data.funnel(),
        kulSeries: ["Value", "Revenue"],
        kulSizeY: "400px",
        kulTypes: ["funnel"],
      },
      gaussian: {
        ["data-description"]: "Gaussian",
        kulAxis: "X",
        kulData: data.gaussian(),
        kulSeries: ["Frequency"],
        kulSizeY: "400px",
        kulTypes: ["gaussian"],
      },
      hbar: {
        ["data-description"]: "Bar (horizontal)",
        kulAxis: "Axis",
        kulData: data.bar(),
        kulSeries: ["Series_1"],
        kulSizeY: "400px",
        kulTypes: ["hbar"],
      },
      heatmap: {
        ["data-description"]: "Heatmap",
        kulAxis: "Source_Channel",
        kulData: data.heatmap(),
        kulSeries: ["Target_Channel", "Mapping_Count"],
        kulSizeY: "400px",
        kulTypes: ["heatmap"],
      },
      heatmapWithLine: {
        ["data-description"]: "Heatmap with Line Overlay",
        kulAxis: ["X", "Y"],
        kulData: mixedHeatmap(),
        kulSeries: ["Heat_Value", "Line_Value"],
        kulSizeY: "400px",
        kulTypes: ["heatmap", "line"],
      },
      line: {
        ["data-description"]: "Line",
        kulAxis: "Axis",
        kulData: baseData,
        kulSeries: ["Series_1", "Series_2", "Series_3", "Series_4", "Series_5"],
        kulSizeY: "400px",
      },
      mixedLineBar: {
        ["data-description"]: "Mixed Line and Bar with Multiple Y-Axes",
        kulAxis: ["Axis"],
        kulData: baseData,
        kulSeries: ["Series_1", "Series_2", "Series_3", "Series_4"],
        kulSizeY: "400px",
        kulTypes: ["bar", "line", "bar", "line"],
      },
      mixedTypesMultiAxis: {
        ["data-description"]: "Mixed Types with Multiple Axes",
        kulAxis: ["Axis", "Axis"],
        kulData: baseData,
        kulSeries: ["Series_1", "Series_2", "Series_3", "Series_4", "Series_5"],
        kulSizeY: "400px",
        kulTypes: ["bar", "line", "scatter", "line", "bar"],
      },
      multiAxis: {
        ["data-description"]: "Multi-Axis Chart with Different Units",
        kulAxis: ["Axis", "Axis"],
        kulData: baseData,
        kulSeries: ["Series_1", "Series_2", "Series_3"],
        kulSizeY: "400px",
        kulTypes: ["line", "line", "line"],
      },
      multiAxisLine: {
        ["data-description"]: "Multi-Axis Line Chart",
        kulAxis: ["Axis", "Axis"],
        kulData: baseData,
        kulSeries: ["Series_1", "Series_4"],
        kulSizeY: "400px",
        kulTypes: ["line", "line"],
      },
      pie: {
        ["data-description"]: "Pie",
        kulAxis: "Axis",
        kulData: data.pie(),
        kulSeries: ["Series_1", "Series_2", "Series_3", "Series_4", "Series_5"],
        kulSizeY: "400px",
        kulTypes: ["pie"],
      },
      radar: {
        ["data-description"]: "Radar",
        kulAxis: "Axis",
        kulData: data.radar(),
        kulSeries: [
          "Speed",
          "Agility",
          "Strength",
          "Endurance",
          "Intelligence",
        ],
        kulSizeY: "400px",
        kulTypes: ["radar"],
      },
      sankey: {
        ["data-description"]: "Sankey",
        kulAxis: "Source",
        kulData: data.sankey(),
        kulSeries: ["Target", "Value"],
        kulSizeY: "400px",
        kulTypes: ["sankey"],
      },
      scatter: {
        ["data-description"]: "Scatter",
        kulAxis: "X",
        kulData: data.scatter(),
        kulSeries: ["Y"],
        kulSizeY: "400px",
        kulTypes: ["scatter"],
      },
      stackedBar: {
        ["data-description"]: "Stacked Bar Chart",
        kulAxis: ["Axis"],
        kulData: baseData,
        kulSeries: ["Series_1", "Series_2", "Series_3"],
        kulSizeY: "400px",
        kulTypes: ["sbar", "sbar", "sbar"],
      },
      style: {
        ["data-description"]: "Bar",
        ["data-dynamic"]: "custom",
        kulAxis: "Axis",
        kulData: baseData,
        kulSeries: ["Series_1"],
        kulSizeY: "400px",
        kulTypes: ["bar"],
      },
    },
  };
};
