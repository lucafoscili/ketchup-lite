import { CY_ATTRIBUTES } from "src/utils/constants";

export type DataCyAttributeTransformed = {
  [K in keyof typeof CY_ATTRIBUTES]: `[data-cy="${(typeof CY_ATTRIBUTES)[K]}"]`;
};
