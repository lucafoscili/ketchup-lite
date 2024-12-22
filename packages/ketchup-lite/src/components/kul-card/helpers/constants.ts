import { KulDataShapeDefaults } from "src/managers/kul-data/kul-data-declarations";
import {
  KulCardAdapter,
  KulCardAdapterRefs,
  KulCardLayout,
  KulCardPropsInterface,
} from "../kul-card-declarations";

export const IDS = {
  clear: "clear",
  theme: "theme",
};

//#region Props
export const KUL_CARD_PROPS: (keyof KulCardPropsInterface)[] = [
  "kulData",
  "kulLayout",
  "kulSizeX",
  "kulSizeY",
  "kulStyle",
];
//#endregion

//#region Defaults
export const DEFAULTS: (getAdapter: () => KulCardAdapter) => {
  [L in KulCardLayout]: KulDataShapeDefaults;
} = (getAdapter) => {
  return {
    debug: {
      button: () => {
        const { theme } = getAdapter().controller.get.manager;

        return [
          {
            htmlProps: {
              className: "kul-full-width kul-danger",
              id: IDS.clear,
            },
            kulIcon: "refresh",
            kulLabel: "Clear logs",
          },
          {
            htmlProps: {
              className: "kul-full-width",
              id: IDS.theme,
            },
            kulData: theme.getThemesDataset(),
          },
        ];
      },
      code: () => [{ kulLanguage: "markdown" }],
      toggle: () => {
        const { debug } = getAdapter().controller.get.manager;

        return [
          {
            kulLeadingLabel: true,
            kulLabel: "Toggle debug",
            kulValue: debug.isEnabled(),
          },
        ];
      },
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
