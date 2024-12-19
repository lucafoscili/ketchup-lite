import { kulManagerSingleton } from "src";
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
import { MasonryData } from "./kul-showcase-masonry-declarations";

const COMPONENT_NAME: KulComponentName = "KulMasonry";
const EVENT_NAME: KulComponentEventName<"KulMasonry"> = "kul-masonry-event";
const PAYLOAD_NAME: KulComponentEventPayloadName<"KulMasonry"> =
  "KulMasonryEventPayload";
const TAG_NAME: KulComponentTag<"KulMasonry"> = "kul-masonry";

export const MASONRY_FIXTURES: () => {
  documentation: KulArticleDataset;
  examples: MasonryData;
} = () => {
  const { get } = kulManagerSingleton.assets;

  const data: Partial<{
    [K in KulComponentName]: () => KulDataDataset;
  }> = {
    KulImage: () => {
      return {
        nodes: [
          {
            cells: {
              kulImage: {
                shape: "image",
                value: get(`./assets/media/avatar_thor_2.png`),
              },
            },
            id: "image_0",
            value: "Node 0",
          },
          {
            cells: {
              kulImage: {
                shape: "image",
                value: get(`./assets/media/location_forest.png`),
              },
            },
            id: "image_1",
            value: "Node 1",
          },
          {
            cells: {
              kulImage: {
                shape: "image",
                value: get(`./assets/media/avatar_freya.png`),
              },
            },
            id: "image_2",
            value: "Node 2",
          },
          {
            cells: {
              kulImage: {
                shape: "image",
                value: get(`./assets/media/avatar_thor_2.png`),
              },
            },
            id: "image_3",
            value: "Node 3",
          },
          {
            cells: {
              kulImage: {
                shape: "image",
                value: get(`./assets/media/avatar_thor_2.png`),
              },
            },
            id: "image_4",
            value: "Node 4",
          },
          {
            cells: {
              kulImage: {
                shape: "image",
                value: get(`./assets/media/avatar_freya_2.png`),
              },
            },
            id: "image_5",
            value: "Node 5",
          },
          {
            cells: {
              kulImage: {
                shape: "image",
                value: get(`./assets/media/avatar_thor_2.png`),
              },
            },
            id: "image_6",
            value: "Node 6",
          },
          {
            cells: {
              kulImage: {
                shape: "image",
                value: get(`./assets/media/avatar_thor_2.png`),
              },
            },
            id: "image_7",
            value: "Node 7",
          },
          {
            cells: {
              kulImage: {
                shape: "image",
                value: get(`./assets/media/outfit_armor_2.png`),
              },
            },
            id: "image_8",
            value: "Node 8",
          },
          {
            cells: {
              kulImage: {
                shape: "image",
                value: get(`./assets/media/outfit_armor_3.png`),
              },
            },
            id: "image_9",
            value: "Node 9",
          },
          {
            cells: {
              kulImage: {
                shape: "image",
                value: get(`./assets/media/location_lake.png`),
              },
            },
            id: "image_10",
            value: "Node 10",
          },
          {
            cells: {
              kulImage: {
                shape: "image",
                value: get(`./assets/media/avatar_freya_2.png`),
              },
            },
            id: "image_11",
            value: "Node 11",
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
            "is designed to arrange images in two different views: masonry and waterfall",
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
                type: "kul-event",
                description: "emitted by shapes",
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
      selectable: {
        ["data-description"]: "Selectable masonry",
        kulData: data.KulImage(),
        kulSelectable: true,
      },
      simple: {
        ["data-description"]: "Simple masonry",
        kulData: data.KulImage(),
      },
      style: {
        ["data-description"]: "Masonry with custom style",
        ["data-dynamic"]: "custom",
        kulData: data.KulImage(),
      },
    },
  };
};
