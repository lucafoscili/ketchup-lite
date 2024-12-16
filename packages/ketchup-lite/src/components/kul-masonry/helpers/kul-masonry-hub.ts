import { prepMasonry } from "src/components/kul-masonry/elements/kul-masonry-main";
import { masonryHandlers } from "src/components/kul-masonry/handlers/kul-masonry-main";
import {
  KulMasonryAdapter,
  KulMasonryAdapterElementsJsx,
  KulMasonryAdapterHandlers,
} from "src/components/kul-masonry/kul-masonry-declarations";
import { REFS } from "./kul-masonry-constants";

export const createElements: (
  adapter: KulMasonryAdapter,
) => KulMasonryAdapterElementsJsx = (adapter) => {
  return prepMasonry(adapter);
};

export const createHandlers: (
  adapter: KulMasonryAdapter,
) => KulMasonryAdapterHandlers = (adapter) => {
  return masonryHandlers(adapter);
};

export const createRefs = REFS;
