import { UploadData } from "./kul-showcase-upload-declarations";
import {
  KulComponentEventName,
  KulComponentEventPayloadName,
  KulComponentName,
  KulComponentTag,
} from "../../../../types/GenericTypes";
import { KulArticleDataset } from "../../../kul-article/kul-article-declarations";
import { SECTION_FACTORY } from "../../helpers/kul-showcase-section";
import { DOC_IDS } from "../../kul-showcase-data";

const COMPONENT_NAME: KulComponentName = "KulUpload";
const EVENT_NAME: KulComponentEventName<"KulUpload"> = "kul-upload-event";
const PAYLOAD_NAME: KulComponentEventPayloadName<"KulUpload"> =
  "KulUploadEventPayload";
const TAG_NAME: KulComponentTag<"KulUpload"> = "kul-upload";

export const UPLOAD_EXAMPLES: UploadData = {
  simple: {
    ["data-description"]: "Simple upload component",
  },
  style: {
    ["data-description"]: "Upload component with custom style",
    ["data-dynamic"]: "custom",
  },
};

export const UPLOAD_DOC: KulArticleDataset = {
  nodes: [
    {
      id: DOC_IDS.root,
      value: COMPONENT_NAME,
      children: [
        SECTION_FACTORY.overview(
          COMPONENT_NAME,
          "is a widget that enables uploading files",
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
              type: "delete",
              description: "emitted when an uploaded file is removed",
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
            {
              type: "upload",
              description: "emitted when a new file has been uploaded",
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
