import { KulDataDataset } from "../../../../managers/kul-data/kul-data-declarations";
import {
  KulComponentEventName,
  KulComponentEventPayloadName,
  KulComponentName,
  KulComponentTag,
} from "../../../../types/GenericTypes";
import { KulArticleDataset } from "../../../kul-article/kul-article-declarations";
import { SECTION_FACTORY } from "../../helpers/kul-showcase-section";
import { DOC_IDS } from "../../kul-showcase-data";
import { TreeData } from "./kul-showcase-tree-declarations";

const COMPONENT_NAME: KulComponentName = "KulTree";
const EVENT_NAME: KulComponentEventName<"KulTree"> = "kul-tree-event";
const PAYLOAD_NAME: KulComponentEventPayloadName<"KulTree"> =
  "KulTreeEventPayload";
const TAG_NAME: KulComponentTag<"KulTree"> = "kul-tree";

export const TREE_FIXTURES: () => {
  documentation: KulArticleDataset;
  examples: TreeData;
} = () => {
  const kulData: KulDataDataset = {
    nodes: [
      {
        id: "0",
        value: "Depth 0 (0)",
        icon: "filter_1",
        children: [
          {
            id: "0.0",
            value: "Depth 1 (0)",
            icon: "filter_2",
            children: [
              {
                id: "0.0.0",
                value: "Depth 2 (0)",
                icon: "filter_3",
                children: [
                  {
                    id: "0.0.0.0",
                    value: "Depth 3 (0)",
                    icon: "filter_4",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "00022",
        value: "Depth 0 (1)",
        icon: "filter_2",
        children: [
          {
            id: "000221",
            value: "Depth 1 (0)",
            icon: "filter_3",
            children: [
              {
                id: "000222",
                value: "Depth 2 (0)",
                icon: "filter_4",
              },
            ],
          },
        ],
      },
      {
        id: "0003",
        value: "Depth 0 (2)",
        icon: "filter_2",
        children: [
          {
            id: "00031",
            value: "Depth 1 (0)",
            icon: "filter_3",
          },
        ],
      },
      {
        id: "0004",
        value: "Depth 0 (3)",
        icon: "filter_2",
        children: [
          {
            id: "00041",
            value: "Depth 1 (0)",
            icon: "filter_3",
            children: [
              {
                id: "000411",
                value: "Depth 2 (0)",
                icon: "filter_4",
                children: [
                  {
                    id: "0004111",
                    value: "Depth 3 (0)",
                    icon: "filter_5",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  const documentation: KulArticleDataset = {
    nodes: [
      {
        id: DOC_IDS.root,
        value: COMPONENT_NAME,
        children: [
          SECTION_FACTORY.overview(
            COMPONENT_NAME,
            "is designed to render a tree based on a JSON structure",
          ),
          SECTION_FACTORY.usage(COMPONENT_NAME, {
            data: JSON.stringify({
              nodes: [
                { value: "Node 1", id: "0" },
                { value: "Node 2", id: "1" },
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
      simple: {
        ["data-description"]: "Simple tree",
        kulData,
      },
      style: {
        ["data-description"]: "Tree with custom style",
        ["data-dynamic"]: "custom",
        kulData,
      },
    },
  };
};
