import { KulDataDataset } from "src/managers/kul-data/kul-data-declarations";
import { KulManagerComputedGetAssetPath } from "src/managers/kul-manager/kul-manager-declarations";
import {
  KulComponentEventName,
  KulComponentEventPayloadName,
  KulComponentName,
  KulComponentTag,
} from "../../../../types/GenericTypes";
import { KulArticleDataset } from "../../../kul-article/kul-article-declarations";
import { SECTION_FACTORY } from "../../helpers/kul-showcase-section";
import { DOC_IDS } from "../../kul-showcase-data";
import { CarouselData } from "./kul-showcase-carousel-declarations";

const COMPONENT_NAME: KulComponentName = "KulCarousel";
const EVENT_NAME: KulComponentEventName<"KulCarousel"> = "kul-carousel-event";
const PAYLOAD_NAME: KulComponentEventPayloadName<"KulCarousel"> =
  "KulCarouselEventPayload";
const TAG_NAME: KulComponentTag<"KulCarousel"> = "kul-carousel";

export const CAROUSEL_FIXTURES: (get: KulManagerComputedGetAssetPath) => {
  documentation: KulArticleDataset;
  examples: CarouselData;
} = (get) => {
  const data: Partial<{
    [K in KulComponentName]: KulDataDataset;
  }> = {
    KulImage: {
      nodes: [
        {
          cells: {
            kulImage: {
              shape: "image",
              value: get(`./assets/media/avatar_thor_2.png`).path,
            },
          },
          id: "image_0",
          value: "Node 0",
        },
        {
          cells: {
            kulImage: {
              shape: "image",
              value: get(`./assets/media/outfit_armor_2.png`).path,
            },
          },
          id: "image_8",
          value: "Node 8",
        },
        {
          cells: {
            kulImage: {
              shape: "image",
              value: get(`./assets/media/outfit_armor_3.png`).path,
            },
          },
          id: "image_9",
          value: "Node 9",
        },
        {
          cells: {
            kulImage: {
              shape: "image",
              value: get(`./assets/media/location_lake.png`).path,
            },
          },
          id: "image_10",
          value: "Node 10",
        },
        {
          cells: {
            kulImage: {
              shape: "image",
              value: get(`./assets/media/avatar_freya_2.png`).path,
            },
          },
          id: "image_11",
          value: "Node 11",
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
            "provides a navigable slideshow of images or content cards",
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
      autoplay: {
        ["data-description"]: "Carousel with autoplay",
        kulAutoPlay: true,
        kulData: data.KulImage,
      },
      simple: {
        ["data-description"]: "Simple carousel",
        kulData: data.KulImage,
      },
      style: {
        ["data-description"]: "Carousel with custom style",
        ["data-dynamic"]: "custom",
        kulData: data.KulImage,
      },
    },
  };
};
