import { kulManagerSingleton } from "src";
import { prepDebug } from "src/components/kul-card/elements/kul-card-debug-layout";
import { prepKeywords } from "src/components/kul-card/elements/kul-card-keywords-layout";
import { prepMaterial } from "src/components/kul-card/elements/kul-card-material-layout";
import { prepUpload } from "src/components/kul-card/elements/kul-card-upload-layout";
import { prepDebugHandlers } from "src/components/kul-card/handlers/kul-card-debug-layout";
import { prepKeywordsHandlers } from "src/components/kul-card/handlers/kul-card-keywords-layout";
import {
  KulCardAdapter,
  KulCardAdapterElementsJsx,
  KulCardAdapterHandlers,
  KulCardLayout,
  KulCardShapesIds,
} from "src/components/kul-card/kul-card-declarations";
import { KulDataShapeDefaults } from "src/managers/kul-data/kul-data-declarations";

export const createElements: (
  adapter: KulCardAdapter,
) => KulCardAdapterElementsJsx["layouts"] = (adapter) => {
  return {
    debug: () => prepDebug(adapter),
    keywords: () => prepKeywords(adapter),
    material: () => prepMaterial(adapter),
    upload: () => prepUpload(adapter),
  };
};

export const createHandlers: (
  adapter: KulCardAdapter,
) => KulCardAdapterHandlers["layouts"] = (adapter) => {
  return {
    debug: prepDebugHandlers(adapter),
    keywords: prepKeywordsHandlers(adapter),
  };
};

export const createDefaults: () => {
  [L in KulCardLayout]: KulDataShapeDefaults;
} = () => {
  const { debug, theme } = kulManagerSingleton;

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
          kulData: theme.getThemesDataset(),
        },
      ],
      code: () => [{ kulLanguage: "markdown" }],
      toggle: () => [
        {
          kulLeadingLabel: true,
          kulLabel: "Toggle debug",
          kulValue: debug.isEnabled(),
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
