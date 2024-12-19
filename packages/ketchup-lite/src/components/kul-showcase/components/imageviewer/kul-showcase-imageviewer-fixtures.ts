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
import { ImageviewerData } from "./kul-showcase-imageviewer-declarations";

const COMPONENT_NAME: KulComponentName = "KulImageviewer";
const EVENT_NAME: KulComponentEventName<"KulImageviewer"> =
  "kul-imageviewer-event";
const PAYLOAD_NAME: KulComponentEventPayloadName<"KulImageviewer"> =
  "KulImageviewerEventPayload";
const TAG_NAME: KulComponentTag<"KulImageviewer"> = "kul-imageviewer";

export const IMAGEVIEWER_FIXTURES: () => {
  documentation: KulArticleDataset;
  examples: ImageviewerData;
} = () => {
  const { get } = kulManagerSingleton.assets;

  const data: { [index: string]: KulDataDataset } = {
    kulData: {
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
      ],
    },
    kulValue: {
      nodes: [
        {
          id: "basic_adjustments",
          value: "Basic Adjustments",
          icon: "settings",
          children: [
            {
              cells: {
                kulCode: {
                  shape: "code",
                  value:
                    '{"slider":[{"ariaLabel":"Clarity strength","defaultValue":"0.5","id":"clarity_strength","max":"5","min":"0","step":"0.1","title":"Controls the amount of contrast enhancement in midtones."},{"ariaLabel":"Sharpen amount","max":"5","min":"0","id":"sharpen_amount","defaultValue":"1.0","step":"0.1","title":"Controls how much sharpening is applied to the image."},{"ariaLabel":"Blur kernel size","max":"15","min":"1","id":"blur_kernel_size","defaultValue":"7","step":"2","title":"Controls the size of the Gaussian blur kernel. Higher values mean more smoothing."}]}',
                },
              },
              id: "clarity",
              value: "Clarity",
            },
          ],
        },
        {
          id: "creative_effects",
          value: "Creative Effects",
          icon: "palette",
          children: [
            {
              cells: {
                kulCode: {
                  shape: "code",
                  value: "{}",
                },
              },
              id: "vignette",
              value: "Vignette",
            },
          ],
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
            "is handy when two components must be imageviewerd in order to spot differences",
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
        ["data-description"]: "Simple imageviewer",
        kulLoadCallback: async (imageviewer, _val) => {
          imageviewer.kulData = data.kulData;
        },
        kulValue: data.kulValue,
      },
      style: {
        ["data-description"]: "Imageviewer with custom style",
        ["data-dynamic"]: "custom",
        kulLoadCallback: async (imageviewer, _val) => {
          imageviewer.kulData = data.kulData;
        },
        kulValue: data.kulValue,
      },
    },
  };
};
