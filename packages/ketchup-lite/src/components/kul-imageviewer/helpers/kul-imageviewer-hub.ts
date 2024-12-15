import { prepExplorer } from "src/components/kul-imageviewer/elements/kul-imageviewer-explorer";
import { prepImageviewer } from "src/components/kul-imageviewer/elements/kul-imageviewer-main";
import { prepExplorerHandlers } from "src/components/kul-imageviewer/handlers/kul-imageviewer-explorer";
import { imageviewerHandlers } from "src/components/kul-imageviewer/handlers/kul-imageviewer-main";
import {
  KulImageviewerAdapter,
  KulImageviewerAdapterElementsJsx,
  KulImageviewerAdapterHandlers,
} from "src/components/kul-imageviewer/kul-imageviewer-declarations";

export const createElements: (
  adapter: KulImageviewerAdapter,
) => KulImageviewerAdapterElementsJsx = (adapter) => {
  return {
    explorer: prepExplorer(adapter),
    imageviewer: prepImageviewer(adapter),
  };
};

export const createHandlers: (
  adapter: KulImageviewerAdapter,
) => KulImageviewerAdapterHandlers = (adapter) => {
  return {
    explorer: prepExplorerHandlers(adapter),
    imageviewer: imageviewerHandlers(adapter),
  };
};
