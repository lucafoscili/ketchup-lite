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
import { PhotoframeData } from "./kul-showcase-photoframe-declarations";

const COMPONENT_NAME: KulComponentName = "KulPhotoframe";
const EVENT_NAME: KulComponentEventName<"KulPhotoframe"> =
  "kul-photoframe-event";
const PAYLOAD_NAME: KulComponentEventPayloadName<"KulPhotoframe"> =
  "KulPhotoframeEventPayload";
const TAG_NAME: KulComponentTag<"KulPhotoframe"> = "kul-photoframe";

export const PHOTOFRAME_FIXTURES: (get: KulManagerComputedGetAssetPath) => {
  documentation: KulArticleDataset;
  examples: PhotoframeData;
} = (get) => {
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
  const placeholder = get(`./assets/media/blur_color_splash.jpg`).path;
  const value = get(`./assets/media/color_splash.jpg`).path;

  return {
    documentation,
    examples: {
      overlay: {
        ["data-description"]: "Simple photoframe",
        kulOverlay: {
          description: "Description",
          hideOnClick: true,
          icon: "eye-off",
          title: "Title",
        },
        kulPlaceholder: {
          alt: null,
          src: placeholder,
        },
        kulValue: {
          alt: null,
          src: value,
        },
      },
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
