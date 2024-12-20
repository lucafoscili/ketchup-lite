import {
  KulComponentEventName,
  KulComponentEventPayloadName,
  KulComponentName,
  KulComponentTag,
} from "../../../../types/GenericTypes";
import { KulArticleDataset } from "../../../kul-article/kul-article-declarations";
import { SECTION_FACTORY } from "../../helpers/kul-showcase-section";
import { DOC_IDS } from "../../kul-showcase-data";
import { SliderData } from "./kul-showcase-slider-declarations";

const COMPONENT_NAME: KulComponentName = "KulSlider";
const EVENT_NAME: KulComponentEventName<"KulSlider"> = "kul-slider-event";
const PAYLOAD_NAME: KulComponentEventPayloadName<"KulSlider"> =
  "KulSliderEventPayload";
const TAG_NAME: KulComponentTag<"KulSlider"> = "kul-slider";

export const SLIDER_FIXTURES: () => {
  documentation: KulArticleDataset;
  examples: SliderData;
} = () => {
  const documentation: KulArticleDataset = {
    nodes: [
      {
        id: DOC_IDS.root,
        value: COMPONENT_NAME,
        children: [
          SECTION_FACTORY.overview(
            COMPONENT_NAME,
            "provides the ability to adjust the widget's value by moving a slider thumb along a track",
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
                type: "blur",
                description: "emitted when the component loses focus",
              },
              {
                type: "focus",
                description: "emitted when the component is focused",
              },
              {
                type: "input",
                description: "emitted when the component is being changed",
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
      colors: {
        ["data-description"]: "Slider states colors",
        ["data-dynamic"]: "state-colors",
        kulLabel: "States colors",
        kulDisabled: false,
        kulValue: 100,
      },
      disabled: {
        ["data-description"]: "Disabled slider",
        kulDisabled: true,
        kulLabel: "Disabled",
      },
      simple: {
        ["data-description"]: "Slider with leading label",
        kulLabel: "Leading label",
        kulLeadingLabel: true,
      },
      style: {
        ["data-description"]: "Icon with custom style",
        ["data-dynamic"]: "custom",
        kulLabel: "Custom style",
      },
    },
  };
};
