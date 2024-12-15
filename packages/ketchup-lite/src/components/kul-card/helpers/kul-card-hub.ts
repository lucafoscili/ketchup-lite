import { prepDebug } from "src/components/kul-card/elements/kul-card-debug-layout";
import { prepKeywords } from "src/components/kul-card/elements/kul-card-keywords-layout";
import { prepMaterial } from "src/components/kul-card/elements/kul-card-material-layout";
import { prepUpload } from "src/components/kul-card/elements/kul-card-upload-layout";
import { prepDebugHandlers } from "src/components/kul-card/handlers/kul-card-debug-layout";
import { prepKeywordsHandlers } from "src/components/kul-card/handlers/kul-card-keywords-layout";
import { DEFAULTS } from "src/components/kul-card/helpers/kul-card-constants";
import {
  KulCardAdapter,
  KulCardAdapterElementsJsx,
  KulCardAdapterHandlers,
} from "src/components/kul-card/kul-card-declarations";

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

export const createDefaults = () => DEFAULTS();
