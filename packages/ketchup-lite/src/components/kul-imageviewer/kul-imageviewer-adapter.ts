import { prepExplorer } from "src/components/kul-imageviewer/elements/navigation";
import { prepImageviewer } from "src/components/kul-imageviewer/elements/details";
import { prepExplorerHandlers } from "src/components/kul-imageviewer/handlers/navigation";
import { imageviewerHandlers } from "src/components/kul-imageviewer/handlers/details";
import { REFS } from "src/components/kul-imageviewer/helpers/constants";
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

export const createRefs = REFS;
