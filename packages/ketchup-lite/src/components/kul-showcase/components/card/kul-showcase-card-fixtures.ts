import { kulManagerSingleton } from "src";
import { KulCardLayout, KulDataDataset } from "src/components";
import {
  KulComponentEventName,
  KulComponentEventPayloadName,
  KulComponentName,
  KulComponentTag,
} from "../../../../types/GenericTypes";
import { KulArticleDataset } from "../../../kul-article/kul-article-declarations";
import { SECTION_FACTORY } from "../../helpers/kul-showcase-section";
import { DOC_IDS } from "../../kul-showcase-data";
import { CardData } from "./kul-showcase-card-declarations";

const COMPONENT_NAME: KulComponentName = "KulCard";
const EVENT_NAME: KulComponentEventName<"KulCard"> = "kul-card-event";
const PAYLOAD_NAME: KulComponentEventPayloadName<"KulCard"> =
  "KulCardEventPayload";
const TAG_NAME: KulComponentTag<"KulCard"> = "kul-card";

export const CARD_FIXTURES: () => {
  documentation: KulArticleDataset;
  examples: CardData;
} = () => {
  const { get } = kulManagerSingleton.assets;

  const data: {
    [K in KulCardLayout]: () => KulDataDataset;
  } = {
    debug: () => {
      return {
        nodes: [
          {
            cells: {
              kulCode: { shape: "code", value: "" },
              kulButton: {
                shape: "button",
                value: "",
              },
              kulButton_2: {
                shape: "button",
                value: "",
              },
              kulToggle: {
                shape: "toggle",
                value: false,
              },
            },
            id: "debug",
          },
        ],
      };
    },
    keywords: () => {
      return {
        nodes: [
          {
            cells: {
              kulChart: {
                kulAxis: "Axis_0",
                kulData: {
                  columns: [
                    {
                      id: "Axis_0",
                      title: "Keyword",
                    },
                    {
                      id: "Series_0",
                      title: "Count",
                    },
                  ],
                  nodes: [
                    {
                      cells: {
                        Axis_0: {
                          value: "key_1",
                        },
                        Series_0: {
                          shape: "number",
                          value: 1,
                        },
                      },
                      id: "0",
                    },
                    {
                      cells: {
                        Axis_0: {
                          value: "key_2",
                        },
                        Series_0: {
                          shape: "number",
                          value: 2,
                        },
                      },
                      id: "1",
                    },
                    {
                      cells: {
                        Axis_0: {
                          value: "key_3",
                        },
                        Series_0: {
                          shape: "number",
                          value: 6,
                        },
                      },
                      id: "2",
                    },
                    {
                      cells: {
                        Axis_0: {
                          value: "key_4",
                        },
                        Series_0: {
                          shape: "number",
                          value: 0,
                        },
                      },
                      id: "3",
                    },
                    {
                      cells: {
                        Axis_0: {
                          value: "key_5",
                        },
                        Series_0: {
                          shape: "number",
                          value: 12,
                        },
                      },
                      id: "4",
                    },
                  ],
                },
                kulSeries: ["Series_0"],
                shape: "chart",
                value: "",
              },
              kulChip: {
                kulData: {
                  nodes: [
                    {
                      id: "key_1",
                      value: "key_1",
                    },
                    {
                      id: "key_2",
                      value: "key_2",
                    },
                    {
                      id: "key_3",
                      value: "key_3",
                    },
                    {
                      id: "key_4",
                      value: "key_4",
                    },
                    {
                      id: "key_5",
                      value: "key_5",
                    },
                  ],
                },
                kulStyle: "#kul-component .chip-set { height: auto; }",
                kulStyling: "filter",
                shape: "chip",
                value: "",
              },
              kulButton: {
                kulIcon: "content_copy",
                kulLabel: "Copy selected",
                kulStyling: "flat",
                shape: "button",
                value: "",
              },
            },
            id: "keywords",
          },
        ],
      };
    },
    material: () => {
      return {
        nodes: [
          {
            cells: {
              1: { value: "Title" },
              2: { value: "Subtitle" },
              3: { value: "Description" },
              kulImage: {
                shape: "image",
                value: get(`./assets/media/color_splash.jpg`).path,
              },
            },
            id: "material",
          },
        ],
      };
    },
    upload: () => {
      return {
        nodes: [
          {
            cells: {
              kulButton: { shape: "button", value: "" },
              kulUpload: {
                shape: "upload",
                value: "",
              },
            },
            id: "upload",
          },
        ],
      };
    },
  };

  const documentation: KulArticleDataset = {
    nodes: [
      {
        id: DOC_IDS.root,
        value: COMPONENT_NAME,
        children: [
          SECTION_FACTORY.overview(
            COMPONENT_NAME,
            "component is designed to render cards based on a JSON structure",
          ),
          SECTION_FACTORY.usage(COMPONENT_NAME, {
            data: JSON.stringify({
              nodes: [
                {
                  cells: {
                    icon: { shape: "image", value: "widgets" },
                    text1: { value: "Title" },
                    text2: { value: "Subtitle" },
                    text3: { value: "Description." },
                  },
                  id: "card",
                },
              ],
            }),
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
                type: "contextmenu",
                description: "emitted when the component is right-clicked",
              },
              {
                type: "kul-event",
                description: "wraps a subcomponent event",
              },
              {
                type: "pointerdown",
                description:
                  "emitted when as soon as the component is touched/clicked (before the click event)",
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
      debug: {
        image: {
          ["data-description"]: "Card with custom style",
          kulSizeX: "320px",
          kulSizeY: "320px",
          kulData: data.debug(),
        },
        style: {
          ["data-description"]: "Card with custom style",
          ["data-dynamic"]: "custom",
          kulSizeX: "320px",
          kulSizeY: "320px",
          kulData: data.debug(),
        },
      },
      keywords: {
        image: {
          ["data-description"]: "Card with custom style",
          kulSizeX: "320px",
          kulSizeY: "320px",
          kulData: data.keywords(),
        },
        style: {
          ["data-description"]: "Card with custom style",
          ["data-dynamic"]: "custom",
          kulSizeX: "320px",
          kulSizeY: "320px",
          kulData: data.keywords(),
        },
      },
      material: {
        image: {
          ["data-description"]: "Card with custom style",
          kulSizeX: "320px",
          kulSizeY: "320px",
          kulData: data.material(),
        },
        style: {
          ["data-description"]: "Card with custom style",
          ["data-dynamic"]: "custom",
          kulSizeX: "320px",
          kulSizeY: "320px",
          kulData: data.material(),
        },
      },
      upload: {
        image: {
          ["data-description"]: "Card with custom style",
          kulSizeX: "320px",
          kulSizeY: "320px",
          kulData: data.upload(),
        },
        style: {
          ["data-description"]: "Card with custom style",
          ["data-dynamic"]: "custom",
          kulSizeX: "320px",
          kulSizeY: "320px",
          kulData: data.upload(),
        },
      },
    },
  };
};
