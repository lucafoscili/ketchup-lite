import { kulManagerSingleton } from "src";
import { KulDataShapeDefaults } from "src/managers/kul-data/kul-data-declarations";
import {
  KulCardAdapterRefs,
  KulCardLayout,
  KulCardShapesIds,
} from "../kul-card-declarations";

//#region Defaults
export const DEFAULTS: () => {
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
//#endregion

//#region Refs
export const REFS = (): KulCardAdapterRefs => {
  return {
    layouts: {
      debug: { button: null, code: null, toggle: null },
      keywords: { button: null, chip: null },
    },
  };
};
//#endregion
