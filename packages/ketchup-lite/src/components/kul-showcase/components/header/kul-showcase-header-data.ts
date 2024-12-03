import { HeaderData } from "./kul-showcase-header-declarations";
import {
  KulComponentEventName,
  KulComponentEventPayloadName,
  KulComponentName,
  KulComponentTag,
} from "../../../../types/GenericTypes";
import { KulArticleDataset } from "../../../kul-article/kul-article-declarations";
import {
  HEADER_IFRAME_MOCK,
  HEADER_IFRAME_MOCK_STYLE,
} from "../../assets/fixtures/header";
import { SECTION_FACTORY } from "../../helpers/kul-showcase-section";
import { DOC_IDS } from "../../kul-showcase-data";

const COMPONENT_NAME: KulComponentName = "KulHeader";
const EVENT_NAME: KulComponentEventName<"KulHeader"> = "kul-header-event";
const PAYLOAD_NAME: KulComponentEventPayloadName<"KulHeader"> =
  "KulHeaderEventPayload";
const TAG_NAME: KulComponentTag<"KulHeader"> = "kul-header";

export const HEADER_EXAMPLES: HeaderData = {
  simple: {
    ["data-description"]: "Simple header component",
    iframeProps: {
      height: "100%",
      srcDoc: HEADER_IFRAME_MOCK,
      width: "100%",
    },
  },
  style: {
    ["data-description"]: "Header with custom style",
    ["data-dynamic"]: "custom",
    iframeProps: {
      height: "100%",
      srcDoc: HEADER_IFRAME_MOCK_STYLE,
      width: "100%",
    },
  },
};

export const HEADER_DOC: KulArticleDataset = {
  nodes: [
    {
      id: DOC_IDS.root,
      value: COMPONENT_NAME,
      children: [
        SECTION_FACTORY.overview(
          COMPONENT_NAME,
          "is a simple element designed to be the header bar of an application, its content is set by a slot",
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
