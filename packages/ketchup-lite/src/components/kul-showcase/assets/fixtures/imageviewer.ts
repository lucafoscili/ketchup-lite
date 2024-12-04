import { getAssetPath } from "@stencil/core";

import { KulDataDataset } from "../../../../managers/kul-data/kul-data-declarations";

export const IMAGEVIEWER_DATA: () => KulDataDataset = () => ({
  nodes: [
    {
      cells: {
        kulImage: {
          shape: "image",
          value: getAssetPath(`./assets/media/avatar_thor_2.png`),
        },
      },
      id: "image_0",
      value: "Node 0",
    },
    {
      cells: {
        kulImage: {
          shape: "image",
          value: getAssetPath(`./assets/media/location_forest.png`),
        },
      },
      id: "image_1",
      value: "Node 1",
    },
    {
      cells: {
        kulImage: {
          shape: "image",
          value: getAssetPath(`./assets/media/avatar_freya.png`),
        },
      },
      id: "image_2",
      value: "Node 2",
    },
    {
      cells: {
        kulImage: {
          shape: "image",
          value: getAssetPath(`./assets/media/avatar_thor_2.png`),
        },
      },
      id: "image_3",
      value: "Node 3",
    },
    {
      cells: {
        kulImage: {
          shape: "image",
          value: getAssetPath(`./assets/media/avatar_thor_2.png`),
        },
      },
      id: "image_4",
      value: "Node 4",
    },
    {
      cells: {
        kulImage: {
          shape: "image",
          value: getAssetPath(`./assets/media/avatar_freya_2.png`),
        },
      },
      id: "image_5",
      value: "Node 5",
    },
    {
      cells: {
        kulImage: {
          shape: "image",
          value: getAssetPath(`./assets/media/avatar_thor_2.png`),
        },
      },
      id: "image_6",
      value: "Node 6",
    },
    {
      cells: {
        kulImage: {
          shape: "image",
          value: getAssetPath(`./assets/media/avatar_thor_2.png`),
        },
      },
      id: "image_7",
      value: "Node 7",
    },
    {
      cells: {
        kulImage: {
          shape: "image",
          value: getAssetPath(`./assets/media/outfit_armor_2.png`),
        },
      },
      id: "image_8",
      value: "Node 8",
    },
    {
      cells: {
        kulImage: {
          shape: "image",
          value: getAssetPath(`./assets/media/outfit_armor_3.png`),
        },
      },
      id: "image_9",
      value: "Node 9",
    },
    {
      cells: {
        kulImage: {
          shape: "image",
          value: getAssetPath(`./assets/media/location_lake.png`),
        },
      },
      id: "image_10",
      value: "Node 10",
    },
    {
      cells: {
        kulImage: {
          shape: "image",
          value: getAssetPath(`./assets/media/avatar_freya_2.png`),
        },
      },
      id: "image_11",
      value: "Node 11",
    },
  ],
});

export const IMAGEVIEWER_VALUE: KulDataDataset = {
  nodes: [
    {
      id: "basic_adjustments",
      value: "Basic Adjustments",
      icon: "settings",
      children: [
        {
          cells: {
            kulCode: {
              shape: "code",
              value:
                '{"slider":[{"ariaLabel":"Clarity strength","defaultValue":"0.5","id":"clarity_strength","max":"5","min":"0","step":"0.1","title":"Controls the amount of contrast enhancement in midtones."},{"ariaLabel":"Sharpen amount","max":"5","min":"0","id":"sharpen_amount","defaultValue":"1.0","step":"0.1","title":"Controls how much sharpening is applied to the image."},{"ariaLabel":"Blur kernel size","max":"15","min":"1","id":"blur_kernel_size","defaultValue":"7","step":"2","title":"Controls the size of the Gaussian blur kernel. Higher values mean more smoothing."}]}',
            },
          },
          id: "clarity",
          value: "Clarity",
        },
      ],
    },
    {
      id: "creative_effects",
      value: "Creative Effects",
      icon: "palette",
      children: [
        {
          cells: {
            kulCode: {
              shape: "code",
              value: "{}",
            },
          },
          id: "vignette",
          value: "Vignette",
        },
      ],
    },
  ],
};
