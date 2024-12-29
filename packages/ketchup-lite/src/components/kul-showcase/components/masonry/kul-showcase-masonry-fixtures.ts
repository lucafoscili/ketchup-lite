import { KulDataDataset } from "src/managers/kul-data/kul-data-declarations";
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
import { MasonryData } from "./kul-showcase-masonry-declarations";

const COMPONENT_NAME: KulComponentName = "KulMasonry";
const EVENT_NAME: KulComponentEventName<"KulMasonry"> = "kul-masonry-event";
const PAYLOAD_NAME: KulComponentEventPayloadName<"KulMasonry"> =
  "KulMasonryEventPayload";
const TAG_NAME: KulComponentTag<"KulMasonry"> = "kul-masonry";

export const MASONRY_FIXTURES: (get: KulManagerComputedGetAssetPath) => {
  documentation: KulArticleDataset;
  examples: MasonryData;
} = (get) => {
  const data: Partial<{
    [K in KulComponentName]: () => KulDataDataset;
  }> = {
    KulCode: () => {
      return {
        nodes: [
          {
            cells: {
              kulCode: {
                kulLanguage: "jsx",
                kulValue: `<div>
      <h1>Hello, JSX!</h1>
      <button onClick={() => alert('Clicked!')}>Click me</button>
    </div>`,
                shape: "code",
                value: `<div>
      <h1>Hello, JSX!</h1>
      <button onClick={() => alert('Clicked!')}>Click me</button>
    </div>`,
              },
            },
            id: "0",
          },
          {
            cells: {
              kulCode: {
                kulLanguage: "markdown",
                kulValue: `# Markdown Example
    
    - **Bold** text
    - _Italic_ text
    - [Link to Google](https://google.com)`,
                shape: "code",
                value: `# Markdown Example
    
    - **Bold** text
    - _Italic_ text
    - [Link to Google](https://google.com)`,
              },
            },
            id: "1",
          },
          {
            cells: {
              kulCode: {
                kulLanguage: "typescript",
                kulValue: `type User = {
      id: number;
      name: string;
    };
    
    const getUser = (id: number): User => ({
      id,
      name: "John Doe",
    });`,
                shape: "code",
                value: `type User = {
      id: number;
      name: string;
    };
    
    const getUser = (id: number): User => ({
      id,
      name: "John Doe",
    });`,
              },
            },
            id: "2",
          },
          {
            cells: {
              kulCode: {
                kulLanguage: "javascript",
                kulValue: `function greet(name) {
      console.log(\`Hello, \${name}!\`);
    }
    
    greet("World");`,
                shape: "code",
                value: `function greet(name) {
      console.log(\`Hello, \${name}!\`);
    }
    
    greet("World");`,
              },
            },
            id: "3",
          },
          {
            cells: {
              kulCode: {
                kulLanguage: "python",
                kulValue: `def greet(name):
        print(f"Hello, {name}!")
    
    greet("World")`,
                shape: "code",
                value: `def greet(name):
        print(f"Hello, {name}!")
    
    greet("World")`,
              },
            },
            id: "4",
          },
        ],
      };
    },
    KulImage: () => {
      return {
        nodes: [
          {
            cells: {
              kulImage: {
                shape: "image",
                value: get(`./assets/media/avatar_thor_2.png`).path,
              },
            },
            id: "image_0",
            value: "Node 0",
          },
          {
            cells: {
              kulImage: {
                shape: "image",
                value: get(`./assets/media/location_forest.png`).path,
              },
            },
            id: "image_1",
            value: "Node 1",
          },
          {
            cells: {
              kulImage: {
                shape: "image",
                value: get(`./assets/media/avatar_freya.png`).path,
              },
            },
            id: "image_2",
            value: "Node 2",
          },
          {
            cells: {
              kulImage: {
                shape: "image",
                value: get(`./assets/media/avatar_thor_2.png`).path,
              },
            },
            id: "image_3",
            value: "Node 3",
          },
          {
            cells: {
              kulImage: {
                shape: "image",
                value: get(`./assets/media/avatar_thor_2.png`).path,
              },
            },
            id: "image_4",
            value: "Node 4",
          },
          {
            cells: {
              kulImage: {
                shape: "image",
                value: get(`./assets/media/avatar_freya_2.png`).path,
              },
            },
            id: "image_5",
            value: "Node 5",
          },
          {
            cells: {
              kulImage: {
                shape: "image",
                value: get(`./assets/media/avatar_thor_2.png`).path,
              },
            },
            id: "image_6",
            value: "Node 6",
          },
          {
            cells: {
              kulImage: {
                shape: "image",
                value: get(`./assets/media/avatar_thor_2.png`).path,
              },
            },
            id: "image_7",
            value: "Node 7",
          },
          {
            cells: {
              kulImage: {
                shape: "image",
                value: get(`./assets/media/outfit_armor_2.png`).path,
              },
            },
            id: "image_8",
            value: "Node 8",
          },
          {
            cells: {
              kulImage: {
                shape: "image",
                value: get(`./assets/media/outfit_armor_3.png`).path,
              },
            },
            id: "image_9",
            value: "Node 9",
          },
          {
            cells: {
              kulImage: {
                shape: "image",
                value: get(`./assets/media/location_lake.png`).path,
              },
            },
            id: "image_10",
            value: "Node 10",
          },
          {
            cells: {
              kulImage: {
                shape: "image",
                value: get(`./assets/media/avatar_freya_2.png`).path,
              },
            },
            id: "image_11",
            value: "Node 11",
          },
        ],
      };
    },
    KulPhotoframe: () => {
      return {
        nodes: [
          {
            cells: {
              kulPhotoframe: {
                kulPlaceholder: {
                  alt: null,
                  src: get(`./assets/media/blur_color_splash.jpg`).path,
                },
                kulValue: {
                  alt: null,
                  src: get(`./assets/media/color_splash.jpg`).path,
                },
                shape: "photoframe",
                value: "",
              },
            },
            id: "0",
            value: "0",
          },
          {
            cells: {
              kulPhotoframe: {
                kulPlaceholder: {
                  alt: null,
                  src: get(`./assets/media/blur_color_splash.jpg`).path,
                },
                kulValue: {
                  alt: null,
                  src: get(`./assets/media/color_splash.jpg`).path,
                },
                shape: "photoframe",
                value: "",
              },
            },
            id: "1",
            value: "1",
          },
          {
            cells: {
              kulPhotoframe: {
                kulPlaceholder: {
                  alt: null,
                  src: get(`./assets/media/blur_color_splash.jpg`).path,
                },
                kulValue: {
                  alt: null,
                  src: get(`./assets/media/color_splash.jpg`).path,
                },
                shape: "photoframe",
                value: "",
              },
            },
            id: "2",
            value: "2",
          },
        ],
      };
    },
  };
  const documentation: KulArticleDataset = {
    nodes: [
      {
        id: DOC_IDS.root,
        value: COMPONENT_NAME,
        children: [
          SECTION_FACTORY.overview(
            COMPONENT_NAME,
            "is designed to arrange images in two different views: masonry and waterfall",
          ),
          SECTION_FACTORY.usage(COMPONENT_NAME, {
            data: JSON.stringify({
              nodes: [
                {
                  value: "Node 1",
                  id: "0",
                  cells: {
                    kulImage: { kulValue: "url_of_image1" },
                  },
                },
                {
                  value: "Node 2",
                  id: "1",
                  cells: {
                    kulImage: { kulValue: "url_of_image2" },
                  },
                },
              ],
            }),
            tag: TAG_NAME,
          }),
          SECTION_FACTORY.props(TAG_NAME),
          SECTION_FACTORY.events(
            COMPONENT_NAME,
            PAYLOAD_NAME,
            [
              {
                type: "kul-event",
                description: "emitted by shapes",
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
      simple: {
        ["data-description"]: "Simple masonry with photoframes",
        kulData: data.KulPhotoframe(),
        kulShape: "photoframe",
      },
      selectable: {
        ["data-description"]: "Selectable masonry of images",
        kulActions: true,
        kulData: data.KulImage(),
        kulSelectable: true,
      },
      code: {
        ["data-description"]: "Masonry with code shapes",
        kulView: "vertical",
        kulData: data.KulCode(),
        kulShape: "code",
      },
      slot: {
        ["data-description"]: "Masonry composed of slots",
        kulColumns: 2,
        kulData: {
          nodes: [
            {
              cells: {
                kulSlot: {
                  shape: "slot",
                  value: "slot-0",
                },
              },
              id: "0",
            },
            {
              cells: {
                kulSlot: {
                  shape: "slot",
                  value: "slot-1",
                },
              },
              id: "1",
            },
          ],
        },
        kulShape: "slot",
      },
      style: {
        ["data-description"]: "Masonry with custom style",
        ["data-dynamic"]: "custom",
        kulData: data.KulImage(),
      },
    },
  };
};
