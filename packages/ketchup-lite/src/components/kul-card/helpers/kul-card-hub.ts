import {
  KulCardAdapter,
  KulCardAdapterLayoutHub,
} from "../kul-card-declarations";

import { KulDataShapeDefaults } from "../../../managers/kul-data/kul-data-declarations";
import { kulManagerInstance } from "../../../managers/kul-manager/kul-manager";
import { prepDebug } from "../components/kul-card-debug-layout";
import { prepKeywords } from "../components/kul-card-keywords-layout";
import { prepMaterial } from "../components/kul-card-material-layout";
import { prepUpload } from "../components/kul-card-upload-layout";
import { KulCardLayout, KulCardShapesIds } from "../kul-card-declarations";

export const createComponents: (
  adapter: KulCardAdapter,
) => KulCardAdapterLayoutHub = (adapter) => {
  return {
    debug: prepDebug(adapter),
    keywords: prepKeywords(adapter),
    material: prepMaterial(adapter),
    upload: prepUpload(adapter),
  };
};

export const createDefaults: () => {
  [L in KulCardLayout]: KulDataShapeDefaults;
} = () => {
  return {
    debug: {
      button: () => [
        {
          htmlProps: {
            className: "kul-full-width kul-danger",
            id: KulCardShapesIds.CLEAR,
          },
          kulIcon: "refresh",
          kulLabel: "Clear logs",
        },
        {
          htmlProps: {
            className: "kul-full-width",
            id: KulCardShapesIds.THEME,
          },
          kulData: kulManagerInstance().theme.getThemesDataset(),
        },
      ],
      code: () => [{ kulLanguage: "markdown" }],
      toggle: () => [
        {
          kulLeadingLabel: true,
          kulLabel: "Toggle debug",
          kulValue: kulManagerInstance().debug.isEnabled(),
        },
      ],
    },
    keywords: {
      button: () => [
        {
          htmlProps: {
            className: "kul-full-width",
          },
          kulIcon: "content_copy",
          kulLabel: "Copy selected",
          kulStyling: "flat",
        },
      ],
      chart: () => [
        {
          kulLegend: "hidden",
          kulTypes: ["bar"],
        },
      ],
      chip: () => [
        {
          kulStyle: "#kul-component .chip-set { height: auto; }",
          kulStyling: "filter",
        },
      ],
    },
    material: {
      image: () => [
        {
          htmlProps: {
            className: "kul-cover",
          },
          kulSizeX: "100%",
          kulSizeY: "100%",
        },
      ],
    },
    upload: {
      button: () => [
        {
          htmlProps: {
            className: "kul-full-width",
          },
          kulIcon: "upload",
          kulLabel: "Upload",
        },
      ],
    },
  };
};
