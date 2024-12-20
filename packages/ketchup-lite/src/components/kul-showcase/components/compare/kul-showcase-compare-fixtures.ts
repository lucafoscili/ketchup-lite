import { kulManagerSingleton } from "src/global/global";
import { KulDataDataset } from "src/components";
import {
  KulComponentEventName,
  KulComponentEventPayloadName,
  KulComponentName,
  KulComponentTag,
} from "../../../../types/GenericTypes";
import { KulArticleDataset } from "../../../kul-article/kul-article-declarations";
import { SECTION_FACTORY } from "../../helpers/kul-showcase-section";
import { DOC_IDS } from "../../kul-showcase-data";
import { CompareData } from "./kul-showcase-compare-declarations";

const COMPONENT_NAME: KulComponentName = "KulCompare";
const EVENT_NAME: KulComponentEventName<"KulCompare"> = "kul-compare-event";
const PAYLOAD_NAME: KulComponentEventPayloadName<"KulCompare"> =
  "KulCompareEventPayload";
const TAG_NAME: KulComponentTag<"KulCompare"> = "kul-compare";

export const COMPARE_FIXTURES: () => {
  documentation: KulArticleDataset;
  examples: CompareData;
} = () => {
  const { get } = kulManagerSingleton.assets;

  const kulData: Partial<{
    [K in KulComponentName]: KulDataDataset;
  }> = {
    KulImage: {
      nodes: [
        {
          cells: {
            kulImage: {
              shape: "image",
              value: get(`./assets/media/avatar_thor.png`).path,
            },
          },
          id: "image_1",
          value: "First node",
        },
        {
          cells: {
            kulImage: {
              shape: "image",
              value: get(`./assets/media/avatar_freya.png`).path,
            },
          },
          id: "image_2",
          value: "Second node",
        },
        {
          cells: {
            kulImage: {
              shape: "image",
              value: get(`./assets/media/avatar_thor_2.png`).path,
            },
          },
          id: "image_3",
          value: "Third node",
        },
        {
          cells: {
            kulImage: {
              shape: "image",
              value: get(`./assets/media/avatar_freya_2.png`).path,
            },
          },
          id: "image_4",
          value: "Fourth node",
        },
      ],
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
            "is handy when two components must be compared in order to spot differences",
          ),
          SECTION_FACTORY.usage(COMPONENT_NAME, {
            data: JSON.stringify({
              nodes: [
                {
                  value: "Node 1",
                  id: "0",
                  cells: {
                    kulImage: { kulValue: "url_of_image1" },
                  },
                },
                {
                  value: "Node 2",
                  id: "1",
                  cells: {
                    kulImage: { kulValue: "url_of_image2" },
                  },
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
      simple: {
        ["data-description"]: "Simple compare",
        kulData: kulData.KulImage,
      },
      style: {
        ["data-description"]: "Compare with custom style",
        ["data-dynamic"]: "custom",
        kulData: kulData.KulImage,
      },
    },
  };
};
