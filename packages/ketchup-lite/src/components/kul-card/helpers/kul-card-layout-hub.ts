import {
  KulCardAdapter,
  KulCardAdapterLayoutHub,
} from "../kul-card-declarations";
import { getDebugLayout } from "../layouts/kul-card-debug-layout";
import { getKeywordsLayout } from "../layouts/kul-card-keywords-layout";
import { getMaterialLayout } from "../layouts/kul-card-material-layout";
import { getUploadLayout } from "../layouts/kul-card-upload-layout";

export const createLayouts: (
  adapter: KulCardAdapter,
) => KulCardAdapterLayoutHub = (adapter) => {
  return {
    debug: getDebugLayout(adapter),
    keywords: getKeywordsLayout(adapter),
    material: getMaterialLayout(adapter),
    upload: getUploadLayout(adapter),
  };
};
