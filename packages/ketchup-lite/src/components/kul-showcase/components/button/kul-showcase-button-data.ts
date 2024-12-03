import { ButtonData } from "./kul-showcase-button-declarations";
import { KulDataDataset } from "../../../../managers/kul-data/kul-data-declarations";
import {
  KulComponentEventName,
  KulComponentEventPayloadName,
  KulComponentName,
  KulComponentTag,
} from "../../../../types/GenericTypes";
import { KulArticleDataset } from "../../../kul-article/kul-article-declarations";
import { SECTION_FACTORY } from "../../helpers/kul-showcase-section";
import { DOC_IDS } from "../../kul-showcase-data";

const COMPONENT_NAME: KulComponentName = "KulButton";
const EVENT_NAME: KulComponentEventName<"KulButton"> = "kul-button-event";
const PAYLOAD_NAME: KulComponentEventPayloadName<"KulButton"> =
  "KulButtonEventPayload";
const TAG_NAME: KulComponentTag<"KulButton"> = "kul-button";

const kulData: KulDataDataset = {
  nodes: [
    {
      children: [
        { id: "0.0", value: "Child 1" },
        { id: "0.1", value: "Child 2" },
      ],
      id: "0",
      value: "Node 0",
    },
  ],
};

export const BUTTON_EXAMPLES: ButtonData = {
  flat: {
    colors: {
      ["data-description"]: "Button states colors",
      ["data-dynamic"]: "state-colors",
      kulLabel: "States colors",
    },
    disabled: {
      ["data-description"]: "Disabled button",
      kulDisabled: true,
      kulLabel: "Disabled",
    },
    dropdown: {
      ["data-description"]: "Dropdown button",
      kulData,
      kulLabel: "Dropdown",
    },
    icon: {
      ["data-description"]: "Icon button",
      kulIcon: "widgets",
    },
    label: {
      ["data-description"]: "With label",
      kulLabel: "With label",
    },
    labelIcon: {
      ["data-description"]: "With label and icon",
      kulIcon: "widgets",
      kulLabel: "With label and icon",
    },
    large: {
      className: "kul-large",
      ["data-description"]: "Large button",
      kulLabel: "Large",
    },
    shaped: {
      className: "kul-shaped",
      ["data-description"]: "Shaped button",
      kulLabel: "Shaped",
    },
    slim: {
      className: "kul-slim",
      ["data-description"]: "Slim button",
      kulLabel: "Slim",
    },
    spinner: {
      ["data-description"]: "Button with spinner",
      kulLabel: "With spinner",
      kulShowSpinner: true,
    },
    style: {
      ["data-description"]: "Button with custom style",
      ["data-dynamic"]: "custom",
      kulLabel: "With custom style",
    },
    trailingIcon: {
      ["data-description"]: "With label and trailing icon",
      kulIcon: "widgets",
      kulLabel: "With label and trailing icon",
      kulTrailingIcon: true,
    },
  },
  floating: {
    colors: {
      ["data-description"]: "Button states colors",
      ["data-dynamic"]: "state-colors",
      kulLabel: "States colors",
    },
    disabled: {
      ["data-description"]: "Disabled button",
      kulDisabled: true,
      kulLabel: "Disabled",
    },
    dropdown: {
      ["data-description"]: "Dropdown button",
      kulData,
      kulLabel: "Dropdown",
    },
    icon: {
      ["data-description"]: "Icon button",
      kulIcon: "widgets",
    },
    label: {
      ["data-description"]: "With label",
      kulLabel: "With label",
    },
    labelIcon: {
      ["data-description"]: "With label and icon",
      kulIcon: "widgets",
      kulLabel: "With label and icon",
    },
    large: {
      className: "kul-large",
      ["data-description"]: "Large button",
      kulLabel: "Large",
    },
    shaped: {
      className: "kul-shaped",
      ["data-description"]: "Shaped button",
      kulLabel: "Shaped",
    },
    slim: {
      className: "kul-slim",
      ["data-description"]: "Slim button",
      kulLabel: "Slim",
    },
    spinner: {
      ["data-description"]: "Button with spinner",
      kulLabel: "With spinner",
      kulShowSpinner: true,
    },
    style: {
      ["data-description"]: "Button with custom style",
      ["data-dynamic"]: "custom",
      kulLabel: "With custom style",
    },
    trailingIcon: {
      ["data-description"]: "With label and trailing icon",
      kulIcon: "widgets",
      kulLabel: "With label and trailing icon",
      kulTrailingIcon: true,
    },
  },
  icon: {
    colors: {
      ["data-description"]: "Button states colors",
      ["data-dynamic"]: "state-colors",
      kulIcon: "widgets",
    },
    disabled: {
      ["data-description"]: "Disabled button",
      kulDisabled: true,
      kulIcon: "widgets",
    },
    dropdown: {
      ["data-description"]: "Dropdown button",
      kulData,
      kulIcon: "widgets",
      kulLabel: "Dropdown",
    },
    icon: {
      ["data-description"]: "Icon button",
      kulIcon: "widgets",
    },
    large: {
      className: "kul-large",
      ["data-description"]: "Large button",
      kulIcon: "widgets",
    },
    pulsating: {
      className: "kul-pulsating",
      ["data-description"]: "Toggable button with pulsating and kulIconOff",
      kulIcon: "remove_red_eye",
      kulIconOff: "eye-off",
      kulToggable: true,
      kulValue: true,
    },
    spinner: {
      ["data-description"]: "Button with spinner",
      kulIcon: "widgets",
      kulShowSpinner: true,
    },
    slim: {
      className: "kul-slim",
      ["data-description"]: "Slim button",
      kulIcon: "widgets",
    },
    style: {
      ["data-description"]: "Button with custom style",
      ["data-dynamic"]: "custom",
      kulIcon: "widgets",
    },
  },
  outlined: {
    colors: {
      ["data-description"]: "Button states colors",
      ["data-dynamic"]: "state-colors",
      kulLabel: "States colors",
    },
    disabled: {
      ["data-description"]: "Disabled button",
      kulDisabled: true,
      kulLabel: "Disabled",
    },
    dropdown: {
      ["data-description"]: "Dropdown button",
      kulData,
      kulLabel: "Dropdown",
    },
    icon: {
      ["data-description"]: "Icon button",
      kulIcon: "widgets",
    },
    label: {
      ["data-description"]: "With label",
      kulLabel: "With label",
    },
    labelIcon: {
      ["data-description"]: "With label and icon",
      kulIcon: "widgets",
      kulLabel: "With label and icon",
    },
    large: {
      className: "kul-large",
      ["data-description"]: "Large button",
      kulLabel: "Large",
    },
    shaped: {
      className: "kul-shaped",
      ["data-description"]: "Shaped button",
      kulLabel: "Shaped",
    },
    slim: {
      className: "kul-slim",
      ["data-description"]: "Slim button",
      kulLabel: "Slim",
    },
    spinner: {
      ["data-description"]: "Button with spinner",
      kulLabel: "With spinner",
      kulShowSpinner: true,
    },
    style: {
      ["data-description"]: "Button with custom style",
      ["data-dynamic"]: "custom",
      kulLabel: "With custom style",
    },
    trailingIcon: {
      ["data-description"]: "With label and trailing icon",
      kulIcon: "widgets",
      kulLabel: "With label and trailing icon",
      kulTrailingIcon: true,
    },
  },
  raised: {
    colors: {
      ["data-description"]: "Button states colors",
      ["data-dynamic"]: "state-colors",
      kulLabel: "States colors",
    },
    disabled: {
      ["data-description"]: "Disabled button",
      kulDisabled: true,
      kulLabel: "Disabled",
    },
    dropdown: {
      ["data-description"]: "Dropdown button",
      kulData,
      kulLabel: "Dropdown",
    },
    icon: {
      ["data-description"]: "Icon button",
      kulIcon: "widgets",
    },
    label: {
      ["data-description"]: "With label",
      kulLabel: "With label",
    },
    labelIcon: {
      ["data-description"]: "With label and icon",
      kulIcon: "widgets",
      kulLabel: "With label and icon",
    },
    large: {
      className: "kul-large",
      ["data-description"]: "Large button",
      kulLabel: "Large",
    },
    shaped: {
      className: "kul-shaped",
      ["data-description"]: "Shaped button",
      kulLabel: "Shaped",
    },
    slim: {
      className: "kul-slim",
      ["data-description"]: "Slim button",
      kulLabel: "Slim",
    },
    spinner: {
      ["data-description"]: "Button with spinner",
      kulLabel: "With spinner",
      kulShowSpinner: true,
    },
    style: {
      ["data-description"]: "Button with custom style",
      ["data-dynamic"]: "custom",
      kulLabel: "With custom style",
    },
    trailingIcon: {
      ["data-description"]: "With label and trailing icon",
      kulIcon: "widgets",
      kulLabel: "With label and trailing icon",
      kulTrailingIcon: true,
    },
  },
};

export const BUTTON_DOC: KulArticleDataset = {
  nodes: [
    {
      id: DOC_IDS.root,
      value: COMPONENT_NAME,
      children: [
        SECTION_FACTORY.overview(
          COMPONENT_NAME,
          "can assume the shape of a button with multiple styling options to choose from",
        ),
        SECTION_FACTORY.usage(COMPONENT_NAME, {
          data: JSON.stringify({
            kulImageProps: { kulValue: "notifications" },
          }),
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
              type: "click",
              description: "emitted when the component is clicked",
            },
            {
              type: "focus",
              description: "emitted when the component is focused",
            },
            {
              type: "kul-event",
              description: "wraps a subcomponent event",
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
