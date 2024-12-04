import {
  KulComponentEventName,
  KulComponentEventPayloadName,
  KulComponentName,
  KulComponentTag,
} from "../../../../types/GenericTypes";
import { KulArticleDataset } from "../../../kul-article/kul-article-declarations";
import { SECTION_FACTORY } from "../../helpers/kul-showcase-section";
import { DOC_IDS } from "../../kul-showcase-data";
import {
  SPINNER_EXAMPLES_KEYS,
  SpinnerData,
} from "./kul-showcase-spinner-declarations";

const COMPONENT_NAME: KulComponentName = "KulSpinner";
const EVENT_NAME: KulComponentEventName<"KulSpinner"> = "kul-spinner-event";
const PAYLOAD_NAME: KulComponentEventPayloadName<"KulSpinner"> =
  "KulSpinnerEventPayload";
const TAG_NAME: KulComponentTag<"KulSpinner"> = "kul-spinner";

function createSpinnerData(
  barLayouts: number,
  widgetsLayouts: number,
): SpinnerData {
  const spinnerData: SpinnerData = {
    bar: {},
    widget: {},
  };

  for (let i = 1; i <= barLayouts; i++) {
    SPINNER_EXAMPLES_KEYS.forEach((exampleType) => {
      if (!spinnerData.bar[i]) {
        spinnerData.bar[i] = {};
      }
      switch (exampleType) {
        case "spinner":
          spinnerData.bar[i][exampleType] = {
            ["data-description"]: "Inactive",
            kulActive: false,
            kulBarVariant: true,
            kulLayout: i,
          };
          break;
        case "spinnerActive":
          spinnerData.bar[i][exampleType] = {
            ["data-description"]: "Active",
            kulActive: true,
            kulBarVariant: true,
            kulLayout: i,
            kulTimeout: 30000,
          };
          break;
        case "style":
          spinnerData.bar[i][exampleType] = {
            "data-description": "Custom style",
            "data-dynamic": "custom",
            kulActive: true,
            kulBarVariant: true,
            kulLayout: i,
          };
          break;
      }
    });
  }

  for (let i = 1; i <= widgetsLayouts; i++) {
    SPINNER_EXAMPLES_KEYS.forEach((exampleType) => {
      if (!spinnerData.widget[i]) {
        spinnerData.widget[i] = {};
      }
      switch (exampleType) {
        case "spinner":
          spinnerData.widget[i][exampleType] = {
            ["data-description"]: "Inactive",
            kulActive: false,
            kulLayout: i,
          };
          break;
        case "spinnerActive":
          spinnerData.widget[i][exampleType] = {
            ["data-description"]: "Active",
            kulActive: true,
            kulLayout: i,
          };
          break;
        case "style":
          spinnerData.widget[i][exampleType] = {
            "data-description": "Custom style",
            "data-dynamic": "custom",
            kulActive: true,
            kulLayout: i,
          };
          break;
      }
    });
  }

  return spinnerData;
}

export const SPINNER_FIXTURES: () => {
  documentation: KulArticleDataset;
  examples: SpinnerData;
} = () => {
  const documentation: KulArticleDataset = {
    nodes: [
      {
        id: DOC_IDS.root,
        value: COMPONENT_NAME,
        children: [
          SECTION_FACTORY.overview(
            COMPONENT_NAME,
            "is designed to render pure CSS spinners that can be used to give the user feedback that a process is currently running",
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

  return { documentation, examples: createSpinnerData(3, 14) };
};
