import {
  KulDataNode,
  KulDataShapeDefaults,
} from "../../../managers/kul-data/kul-data-declarations";
import { kulManagerInstance } from "../../../managers/kul-manager/kul-manager";
import { KulCardLayout, KulCardShapesIds } from "../kul-card-declarations";

const getThemes = () => {
  const nodes: KulDataNode[] = [];
  kulManagerInstance()
    .theme.getThemes()
    .forEach((t) => {
      const char0 = t.charAt(0).toUpperCase();
      nodes.push({
        id: t,
        value: `${char0}${t.substring(1)}`,
      });
    });

  return nodes;
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
          kulData: {
            nodes: [
              {
                icon: "style",
                id: "root",
                value: "Random theme",
                children: getThemes(),
              },
            ],
          },
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
