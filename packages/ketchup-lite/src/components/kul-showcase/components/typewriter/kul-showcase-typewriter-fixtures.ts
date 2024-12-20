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
      code: {
        ["data-description"]: "Typewriter wrapped by code",
        kulTag: "code",
        kulValue,
      },
      div: {
        ["data-description"]: "Typewriter wrapped by div",
        kulTag: "div",
        kulValue,
      },
      h1: {
        ["data-description"]: "Typewriter wrapped by h1",
        kulTag: "h1",
        kulValue,
      },
      h2: {
        ["data-description"]: "Typewriter wrapped by h2",
        kulTag: "h2",
        kulValue,
      },
      h3: {
        ["data-description"]: "Typewriter wrapped by h3",
        kulTag: "h3",
        kulValue,
      },
      h4: {
        ["data-description"]: "Typewriter wrapped by h4",
        kulTag: "h4",
        kulValue,
      },
      h5: {
        ["data-description"]: "Typewriter wrapped by h5",
        kulTag: "h5",
        kulValue,
      },
      h6: {
        ["data-description"]: "Typewriter wrapped by h6",
        kulTag: "h6",
        kulValue,
      },
      p: {
        ["data-description"]: "Typewriter wrapped by p",
        kulTag: "p",
        kulValue,
      },
      pre: {
        ["data-description"]: "Typewriter wrapped by pre",
        kulStyle: ":host { overflow: auto }",
        kulTag: "pre",
        kulValue,
      },
      span: {
        ["data-description"]: "Typewriter wrapped by span",
        kulTag: "span",
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
