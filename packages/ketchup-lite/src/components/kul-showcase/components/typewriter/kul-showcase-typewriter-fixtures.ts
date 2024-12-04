import {
  KulComponentEventName,
  KulComponentEventPayloadName,
  KulComponentName,
  KulComponentTag,
} from "../../../../types/GenericTypes";
import { KulArticleDataset } from "../../../kul-article/kul-article-declarations";
import { SECTION_FACTORY } from "../../helpers/kul-showcase-section";
import { DOC_IDS } from "../../kul-showcase-data";
import { TypewriterData } from "./kul-showcase-typewriter-declarations";

const COMPONENT_NAME: KulComponentName = "KulTypewriter";
const EVENT_NAME: KulComponentEventName<"KulTypewriter"> =
  "kul-typewriter-event";
const PAYLOAD_NAME: KulComponentEventPayloadName<"KulTypewriter"> =
  "KulTypewriterEventPayload";
const TAG_NAME: KulComponentTag<"KulTypewriter"> = "kul-typewriter";

export const TYPEWRITER_FIXTURES: () => {
  documentation: KulArticleDataset;
  examples: TypewriterData;
} = () => {
  const kulValue = [
    `Ketchup Lite is a lightweight and versatile Web Components library designed to enhance your web
development experience.`,
    `It is a fork stemming from the original, aiming to provide a streamlined and efficient set of tools for developers.
Built with modern standards and best practices in mind, Ketchup Lite offers a collection of reusable components that can seamlessly integrate into any web project, regardless of the framework or vanilla JavaScript setup.`,
  ];
  const documentation: KulArticleDataset = {
    nodes: [
      {
        id: DOC_IDS.root,
        value: COMPONENT_NAME,
        children: [
          SECTION_FACTORY.overview(
            COMPONENT_NAME,
            "is designed to simulate the behavior of a typewriter, by writing text dynamically after a customizable amount of time has passed between each letter",
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
        ["data-description"]: "Simple typewriter with button",
        kulValue,
      },
      style: {
        ["data-description"]: "Simple typewriter custom style",
        "data-dynamic": "custom",
        kulValue,
      },
    },
  };
};
