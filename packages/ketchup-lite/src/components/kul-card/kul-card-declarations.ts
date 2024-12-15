import { VNode } from "@stencil/core";

import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import { KulCard } from "src/components/kul-card/kul-card";
import { KulCodeEventPayload } from "src/components/kul-code/kul-code-declarations";
import { KulListEventPayload } from "src/components/kul-list/kul-list-declarations";
import { KulToggleEventPayload } from "src/components/kul-toggle/kul-toggle-declarations";
import {
  KulDataDataset,
  KulDataShapeDefaults,
  KulDataShapesMap,
} from "src/managers/kul-data/kul-data-declarations";
import {
  KulComponentAdapter,
  KulComponentAdapterHandlers,
  KulComponentAdapterJsx,
  KulComponentAdapterRefs,
  KulComponentAdapterStateGetters,
  KulEventPayload,
} from "src/types/GenericTypes";

//#region Adapter
export interface KulCardAdapter extends KulComponentAdapter<KulCard> {
  elements: {
    jsx: KulCardAdapterElementsJsx;
    refs: KulCardAdapterElementsRefs;
  };
  handlers: KulCardAdapterHandlers;
  state: {
    get: KulCardAdapterStateGetters;
  };
}
export interface KulCardAdapterElementsJsx extends KulComponentAdapterJsx {
  layouts: { [K in KulCardLayout]: () => VNode };
}
export interface KulCardAdapterElementsRefs extends KulComponentAdapterRefs {
  layouts: {
    debug: {
      button: HTMLKulButtonElement;
      code: HTMLKulCodeElement;
      toggle: HTMLKulToggleElement;
    };
    keywords: {
      button: HTMLKulButtonElement;
      chip: HTMLKulChipElement;
    };
  };
}
export interface KulCardAdapterHandlers extends KulComponentAdapterHandlers {
  layouts: {
    debug: {
      button: (e: CustomEvent<KulButtonEventPayload>) => void;
      code: (e: CustomEvent<KulCodeEventPayload>) => void;
      list: (e: CustomEvent<KulListEventPayload>) => void;
      toggle: (e: CustomEvent<KulToggleEventPayload>) => void;
    };
    keywords: {
      button: (e: CustomEvent<KulButtonEventPayload>) => void;
    };
  };
}
export interface KulCardAdapterStateGetters
  extends KulComponentAdapterStateGetters<KulCard> {
  compInstance: KulCard;
  defaults: KulCardAdapterDefaults;
  shapes: () => KulDataShapesMap;
}
export type KulCardAdapterDefaults = {
  [K in KulCardLayout]: KulDataShapeDefaults;
};
//#endregion

//#region Events
export type KulCardEvent =
  | "click"
  | "contextmenu"
  | "kul-event"
  | "pointerdown"
  | "ready"
  | "unmount";
export interface KulCardEventPayload
  extends KulEventPayload<"KulCard", KulCardEvent> {}
//#endregion

//#region Internal usage
export enum KulCardCSSClasses {
  HAS_ACTIONS = "has-actions",
  HAS_CONTENT = "has-content",
}
export enum KulCardShapesIds {
  CLEAR = "clear",
  THEME = "theme",
}
//#endregion

//#region Props
export interface KulCardPropsInterface {
  kulData?: KulDataDataset;
  kulLayout?: KulCardLayout;
  kulSizeX?: string;
  kulSizeY?: string;
  kulStyle?: string;
}
export type KulCardLayout = "debug" | "keywords" | "material" | "upload";
//#endregion
