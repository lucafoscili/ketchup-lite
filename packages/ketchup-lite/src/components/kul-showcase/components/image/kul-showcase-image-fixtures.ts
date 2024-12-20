import { kulManagerSingleton } from "src/global/global";
import {
  KulComponentEventName,
  KulComponentEventPayloadName,
  KulComponentName,
  KulComponentTag,
} from "../../../../types/GenericTypes";
import { KulArticleDataset } from "../../../kul-article/kul-article-declarations";
import { random2digitsNumber } from "../../helpers/kul-showcase-dyn-sample";
import { SECTION_FACTORY } from "../../helpers/kul-showcase-section";
import { DOC_IDS } from "../../kul-showcase-data";
import { ImageData } from "./kul-showcase-image-declarations";

const COMPONENT_NAME: KulComponentName = "KulImage";
const EVENT_NAME: KulComponentEventName<"KulImage"> = "kul-image-event";
const PAYLOAD_NAME: KulComponentEventPayloadName<"KulImage"> =
  "KulImageEventPayload";
const TAG_NAME: KulComponentTag<"KulImage"> = "kul-image";

export const IMAGE_FIXTURES: () => {
  documentation: KulArticleDataset;
  examples: ImageData;
} = () => {
  const { get } = kulManagerSingleton.assets;

  const image = get(`./assets/media/color_splash.jpg`).path;
  const documentation: KulArticleDataset = {
    nodes: [
      {
        id: DOC_IDS.root,
        value: COMPONENT_NAME,
        children: [
          SECTION_FACTORY.overview(
            COMPONENT_NAME,
            "is designed to render images or icons based on a provided source or CSS variable",
          ),
          SECTION_FACTORY.usage(COMPONENT_NAME, {
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
                type: "load",
                description: "emitted when the image is successfully loaded",
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
      badge: {
        ["data-description"]: "Image with badge",
        kulBadgeProps: { kulLabel: random2digitsNumber().toString() },
        kulSizeX: "128px",
        kulSizeY: "128px",
        kulValue: image,
      },
      cover: {
        ["data-description"]: "Image set as cover of a container",
        className: "kul-cover",
        kulSizeX: "128px",
        kulSizeY: "256px",
        kulValue: image,
      },
      fit: {
        ["data-description"]: "Image fitting a container",
        className: "kul-fit",
        kulSizeX: "128px",
        kulSizeY: "256px",
        kulValue: image,
      },
      icon: {
        ["data-description"]: "Icon",
        kulSizeX: "256px",
        kulSizeY: "256px",
        kulValue: "widgets",
      },
      image: {
        ["data-description"]: "Image",
        kulSizeX: "256px",
        kulSizeY: "256px",
        kulValue: image,
      },
      style: {
        ["data-description"]: "Icon with custom style",
        ["data-dynamic"]: "custom",
        kulSizeX: "256px",
        kulSizeY: "256px",
        kulValue: "widgets",
      },
    },
  };
};
