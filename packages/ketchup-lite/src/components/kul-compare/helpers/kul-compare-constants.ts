import { KulDataShapeDefaults } from "src/managers/kul-data/kul-data-declarations";

//#region Ids
export const IDS = {
  left: "toggle-left-panel",
  right: "toggle-right-panel",
  view: "toggle-view",
};
//#endregion

//#region Defaults
export const DEFAULTS: () => {
  left: KulDataShapeDefaults;
  right: KulDataShapeDefaults;
} = () => {
  return {
    left: {
      image: () => [
        {
          htmlProps: { className: "kul-fit" },
          kulSizeX: "100%",
          kulSizeY: "100%",
        },
      ],
    },
    right: {
      image: () => [
        {
          htmlProps: { className: "kul-fit" },
          kulSizeX: "100%",
          kulSizeY: "100%",
        },
      ],
    },
  };
};
//#endregion
