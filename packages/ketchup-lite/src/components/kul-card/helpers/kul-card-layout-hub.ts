import { VNode } from "@stencil/core";

import { KulCardAdapter, KulCardLayout } from "../kul-card-declarations";
import { getDebugLayout } from "../layouts/kul-card-debug-layout";
import { getKeywordsLayout } from "../layouts/kul-card-keywords-layout";
import { getMaterialLayout } from "../layouts/kul-card-material-layout";
import { getUploadLayout } from "../layouts/kul-card-upload-layout";

export const LAYOUT_HUB: {
  [K in KulCardLayout]: (adapter: KulCardAdapter) => VNode;
} = {
  debug: (adapter) => getDebugLayout(adapter),
  keywords: (adapter) => getKeywordsLayout(adapter),
  material: (adapter) => getMaterialLayout(adapter),
  upload: (adapter) => getUploadLayout(adapter),
};
