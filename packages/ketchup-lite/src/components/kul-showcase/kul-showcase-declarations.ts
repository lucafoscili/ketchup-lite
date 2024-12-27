import { GenericObject } from "src/types/GenericTypes";

//#region Data
export interface KulShowcaseDocMethod {
  docs: string;
  name: string;
  returns: { docs: string; type: string };
  signature: string;
}
export interface KulShowcaseDocProp {
  docs: string;
  name: string;
  type: string;
}
export interface KulShowcaseDocStyle {
  docs: string;
  name: string;
}
export interface KulShowcaseDoc {
  [index: string]:
    | {
        methods: KulShowcaseDocMethod[];
        props: KulShowcaseDocProp[];
        styles: KulShowcaseDocStyle[];
      }
    | GenericObject;
}
export type KulShowcaseDynamicExampleType =
  | "custom"
  | "state-colors"
  | "positions";
export type KulShowcaseTitle = "Components" | "Framework" | "Utilities";
//#endregion

//#region States
export type KulShowcaseViews = { [K in KulShowcaseTitle]: string };
//#endregion

//#region Props
export interface KulShowcasePropsInterface {
  kulStyle: string;
}
//#endregion
