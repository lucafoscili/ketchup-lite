import { VNode } from "@stencil/core";
import {
  KulDataDataset,
  KulDataShapeDefaults,
  KulDataShapesMap,
} from "src/managers/kul-data/kul-data-declarations";
import {
  KulComponentAdapter,
  KulComponentAdapterGetters,
  KulComponentAdapterHandlers,
  KulComponentAdapterJsx,
  KulComponentAdapterRefs,
  KulEventPayload,
} from "src/types/GenericTypes";
import { KulButtonEventPayload } from "../kul-button/kul-button-declarations";
import { KulCodeEventPayload } from "../kul-code/kul-code-declarations";
import { KulListEventPayload } from "../kul-list/kul-list-declarations";
import { KulToggleEventPayload } from "../kul-toggle/kul-toggle-declarations";
import { KulCard } from "./kul-card";

//#region Adapter
export interface KulCardAdapter extends KulComponentAdapter<KulCard> {
  controller: {
    get: KulCardAdapterControllerGetters;
  };
  elements: {
    jsx: KulCardAdapterJsx;
    refs: KulCardAdapterRefs;
  };
  handlers: KulCardAdapterHandlers;
}
export interface KulCardAdapterJsx extends KulComponentAdapterJsx {
  layouts: { [K in KulCardLayout]: () => VNode };
}
export interface KulCardAdapterRefs extends KulComponentAdapterRefs {
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
export type KulCardAdapterInitializerGetters = Pick<
  KulCardAdapterControllerGetters,
  "compInstance" | "shapes"
>;
export interface KulCardAdapterControllerGetters
  extends KulComponentAdapterGetters<KulCard> {
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
