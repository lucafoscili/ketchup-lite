import { ImageviewerData } from "./kul-showcase-imageviewer-declarations";
import {
  KulComponentEventName,
  KulComponentEventPayloadName,
  KulComponentName,
  KulComponentTag,
} from "../../../../types/GenericTypes";
import { KulArticleDataset } from "../../../kul-article/kul-article-declarations";
import {
  IMAGEVIEWER_DATA,
  IMAGEVIEWER_VALUE,
} from "../../assets/fixtures/imageviewer";
import { SECTION_FACTORY } from "../../helpers/kul-showcase-section";
import { DOC_IDS } from "../../kul-showcase-data";

const COMPONENT_NAME: KulComponentName = "KulImageviewer";
const EVENT_NAME: KulComponentEventName<"KulImageviewer"> =
  "kul-imageviewer-event";
const PAYLOAD_NAME: KulComponentEventPayloadName<"KulImageviewer"> =
  "KulImageviewerEventPayload";
const TAG_NAME: KulComponentTag<"KulImageviewer"> = "kul-imageviewer";

export const IMAGEVIEWER_EXAMPLES: () => ImageviewerData = () => ({
  simple: {
    ["data-description"]: "Simple imageviewer",
    kulLoadCallback: async (imageviewer, _val) => {
      imageviewer.kulData = IMAGEVIEWER_DATA();
    },
    kulValue: IMAGEVIEWER_VALUE,
  },
  style: {
    ["data-description"]: "Imageviewer with custom style",
    ["data-dynamic"]: "custom",
    kulLoadCallback: async (imageviewer, _val) => {
      imageviewer.kulData = IMAGEVIEWER_DATA();
    },
    kulValue: IMAGEVIEWER_VALUE,
  },
});

export const IMAGEVIEWER_DOC: KulArticleDataset = {
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
