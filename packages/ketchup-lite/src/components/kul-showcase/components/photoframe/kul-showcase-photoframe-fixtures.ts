import { getAssetPath } from "@stencil/core";

import {
  KulComponentEventName,
  KulComponentEventPayloadName,
  KulComponentName,
  KulComponentTag,
} from "../../../../types/GenericTypes";
import { KulArticleDataset } from "../../../kul-article/kul-article-declarations";
import { SECTION_FACTORY } from "../../helpers/kul-showcase-section";
import { DOC_IDS } from "../../kul-showcase-data";
import { PhotoframeData } from "./kul-showcase-photoframe-declarations";

const COMPONENT_NAME: KulComponentName = "KulPhotoframe";
const EVENT_NAME: KulComponentEventName<"KulPhotoframe"> =
  "kul-photoframe-event";
const PAYLOAD_NAME: KulComponentEventPayloadName<"KulPhotoframe"> =
  "KulPhotoframeEventPayload";
const TAG_NAME: KulComponentTag<"KulPhotoframe"> = "kul-photoframe";

export const PHOTOFRAME_FIXTURES: () => {
  documentation: KulArticleDataset;
  examples: PhotoframeData;
} = () => {
  const documentation: KulArticleDataset = {
    nodes: [
      {
        id: DOC_IDS.root,
        value: COMPONENT_NAME,
        children: [
          SECTION_FACTORY.overview(
            COMPONENT_NAME,
            "displays a photo only when it enters the viewport. Until then, a placeholder is displayed in its place",
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
  const placeholder = getAssetPath(`./assets/media/blur_color_splash.jpg`);
  const value = getAssetPath(`./assets/media/color_splash.jpg`);

  return {
    documentation,
    examples: {
      simple: {
        ["data-description"]: "Simple photoframe",
        kulPlaceholder: {
          alt: null,
          src: placeholder,
        },
        kulValue: {
          alt: null,
          src: value,
        },
      },
      style: {
        ["data-description"]: "Photoframe with custom style",
        "data-dynamic": "custom",
        kulPlaceholder: {
          alt: null,
          src: placeholder,
        },
        kulValue: {
          alt: null,
          src: value,
        },
      },
    },
  };
};
