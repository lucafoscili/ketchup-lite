import { VNode } from "@stencil/core";

import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import {
  KulChatEventPayload,
  KulChatPropsInterface,
  KulChatStatus,
} from "src/components/kul-chat/kul-chat-declarations";
import { KulListEventPayload } from "src/components/kul-list/kul-list-declarations";
import { KulMessenger } from "src/components/kul-messenger/kul-messenger";
import { KulTabbarEventPayload } from "src/components/kul-tabbar/kul-tabbar-declarations";
import {
  KulDataDataset,
  KulDataNode,
} from "src/managers/kul-data/kul-data-declarations";
import {
  KulComponentAdapter,
  KulComponentAdapterGetters,
  KulComponentAdapterHandlers,
  KulComponentAdapterJsx,
  KulComponentAdapterRefs,
  KulComponentAdapterSetters,
  KulEventPayload,
} from "src/types/GenericTypes";

//#region Adapter
export interface KulMessengerAdapter extends KulComponentAdapter<KulMessenger> {
  controller: {
    get: KulMessengerAdapterGetters;
    set: KulMessengerAdapterSetters;
  };
  elements: {
    jsx: KulMessengerAdapterJsx;
    refs: KulMessengerAdapterRefs;
  };
  handlers: KulMessengerAdapterHandlers;
}
export interface KulMessengerAdapterJsx extends KulComponentAdapterJsx {
  character: {
    avatar: () => VNode;
    biography: () => VNode;
    save: () => VNode;
    statusIcon: () => VNode;
  };
  chat: {
    chat: () => VNode;
    leftExpander: () => VNode;
    rightExpander: () => VNode;
    tabbar: () => VNode;
  };
  options: {
    back: () => VNode;
    customization: () => VNode;
  };
}

/*editing: {
  [K in KulMessengerImageTypes]: KulMessengerImageEditComponents;
};*/
export interface KulMessengerAdapterRefs extends KulComponentAdapterRefs {
  character: {
    avatar: HTMLImageElement;
    biography: HTMLKulCodeElement;
    save: HTMLKulButtonElement;
    statusIcon: HTMLKulImageElement;
  };
  chat: {
    chat: HTMLKulChatElement;
    leftExpander: HTMLKulButtonELement;
    rightExpander: HTMLKulButtonELement;
    tabbar: HTMLKulTabbarELement;
  };
  options: {
    back: HTMLKulButtonELement;
    customization: HTMLKulButtonELement;
  };
}
export interface KulMessengerAdapterHandlers
  extends KulComponentAdapterHandlers {
  character: {
    button: (e: CustomEvent<KulButtonEventPayload>) => Promise<void>;
    list: (e: CustomEvent<KulListEventPayload>) => Promise<void>;
  };
  chat: {
    button: (e: CustomEvent<KulButtonEventPayload>) => Promise<void>;
    chat: (e: CustomEvent<KulChatEventPayload>) => Promise<void>;
    tabbar: (e: CustomEvent<KulTabbarEventPayload>) => Promise<void>;
  };
  options: {
    button: (e: CustomEvent<KulButtonEventPayload>) => Promise<void>;
  };
}
export interface KulMessengerAdapterGetters
  extends KulComponentAdapterGetters<KulMessenger> {
  compInstance: KulMessenger;
  character: KulMessengerAdapterGetCharacter;
  image: KulMessengerAdapterGetImage;
  messenger: KulMessengerAdapterGetMessenger;
}
export interface KulMessengerAdapterSetters extends KulComponentAdapterSetters {
  character: KulMessengerAdapterSetCharacter;
  image: KulMessengerAdapterSetImage;
  messenger: KulMessengerAdapterSetMessenger;
}
export interface KulMessengerAdapterGetCharacter {
  biography: (character?: KulMessengerCharacterNode) => string;
  byId: (id: string) => KulMessengerCharacterNode;
  chat: (character?: KulMessengerCharacterNode) => KulChatPropsInterface;
  current: () => KulMessengerCharacterNode;
  history: (character?: KulMessengerCharacterNode) => string;
  list: () => KulMessengerCharacterNode[];
  name: (character?: KulMessengerCharacterNode) => string;
  next: (character?: KulMessengerCharacterNode) => KulMessengerCharacterNode;
  previous: (
    character?: KulMessengerCharacterNode,
  ) => KulMessengerCharacterNode;
}
export interface KulMessengerAdapterGetImage {
  asCover: <T extends KulMessengerImageTypes>(
    type: T,
    character?: KulMessengerCharacterNode,
  ) => {
    node?: KulMessengerBaseChildNode<KulMessengerUnionChildIds>;
    title?: string;
    value: string;
  };
  byType: <T extends KulMessengerImageTypes>(
    type: T,
    character?: KulMessengerCharacterNode,
  ) => Array<KulMessengerBaseChildNode<KulMessengerUnionChildIds>>;
  coverIndex: (
    type: KulMessengerImageTypes,
    character?: KulMessengerCharacterNode,
  ) => number;
  newId: <T extends KulMessengerImageTypes>(
    type: T,
  ) => KulMessengerChildIds<KulMessengerUnionChildIds>;
  root: <T extends KulMessengerImageTypes>(
    type: T,
    character?: KulMessengerCharacterNode,
  ) => KulMessengerBaseRootNode<KulMessengerImageTypes>;
  title: <T extends KulMessengerUnionChildIds>(
    node: KulMessengerBaseChildNode<T>,
  ) => string;
}
export interface KulMessengerAdapterGetMessenger {
  config: () => KulMessengerConfig;
  data: () => KulMessengerDataset;
  history: () => KulMessengerHistory;
  status: {
    connection: () => KulChatStatus;
    editing: () => KulMessengerEditingStatus<KulMessengerImageTypes>;
    hoveredCustomizationOption: () => KulMessengerBaseChildNode<KulMessengerUnionChildIds>;
    save: {
      inProgress: () => boolean;
    };
  };
  ui: () => KulMessengerUI;
}
export interface KulMessengerAdapterSetCharacter
  extends KulComponentAdapterStateSetters {
  chat: (
    chat: KulChatPropsInterface,
    character?: KulMessengerCharacterNode,
  ) => void;
  current: (character?: KulMessengerCharacterNode) => void;
  history: (history: string, character?: KulMessengerCharacterNode) => void;
  next: (character?: KulMessengerCharacterNode) => void;
  previous: (character?: KulMessengerCharacterNode) => void;
}
export interface KulMessengerAdapterSetImage
  extends KulComponentAdapterStateSetters {
  cover: (
    type: KulMessengerImageTypes,
    value: number,
    character?: KulMessengerCharacterNode,
  ) => void;
}
export interface KulMessengerAdapterSetMessenger
  extends KulComponentAdapterStateSetters {
  data: () => void;
  status: {
    connection: (status: KulChatStatus) => void;
    editing: <T extends KulMessengerUnionChildIds>(
      type: KulMessengerImageTypes,
      id: KulMessengerChildIds<T>,
    ) => void;
    hoveredCustomizationOption: <T extends KulMessengerUnionChildIds>(
      node: KulMessengerBaseChildNode<T>,
    ) => void;
    save: {
      inProgress: (value: boolean) => void;
    };
  };
  ui: {
    customization: (value: boolean) => void;
    editing: <T extends KulMessengerUnionChildIds>(
      value: boolean,
      type: KulMessengerImageTypes,
      node?: KulMessengerBaseChildNode<T>,
    ) => void;
    filters: (filter: KulMessengerFilters) => void;
    options: <T extends KulMessengerImageRootIds<KulMessengerOptionTypes>>(
      value: boolean,
      type: KulMessengerRootIds<T>,
    ) => void;
    panel: (panel: KulMessengerPanelsValue, value?: boolean) => boolean;
  };
}
//#endregion
//#region Character node
export interface KulMessengerDataset extends KulDataDataset {
  nodes?: KulMessengerCharacterNode[];
}
export type KulMessengerCharacterId = `character_${string}`;
export interface KulMessengerCharacterNode extends KulDataNode {
  children: [
    KulMessengerAvatarRootNode,
    KulMessengerBiographyRootNode,
    KulMessengerChatRootNode,
    KulMessengerLocationRootNode,
    KulMessengerOutfitRootNode,
    KulMessengerStyleRootNode,
    KulMessengerTimeframeRootNode,
  ];
  id: KulMessengerCharacterId;
  value: string;
}
//#endregion
//#region Root nodes
export interface KulMessengerBaseRootNode<T extends KulMessengerTypes>
  extends KulDataNode {
  id: T;
}
export interface KulMessengerBaseImageRootNode<
  T extends KulMessengerBaseChildNode<KulMessengerUnionChildIds>,
  T1 extends KulMessengerImageTypes,
> extends KulMessengerBaseRootNode<KulMessengerImageTypes> {
  id: KulMessengerImageRootIds<T1>;
  children?: T[];
  value: number;
}
export type KulMessengerTypes = "biography" | "chat" | KulMessengerImageTypes;
export type KulMessengerImageTypes = "avatars" | KulMessengerOptionTypes;
export type KulMessengerOptionTypes =
  | "locations"
  | "outfits"
  | "styles"
  | "timeframes";
export type KulMessengerRootIds<T extends KulMessengerTypes> = T;
export type KulMessengerImageRootIds<T extends KulMessengerImageTypes> = T;
export interface KulMessengerBiographyRootNode
  extends KulMessengerBaseRootNode<KulMessengerRootIds<"biography">> {
  id: KulMessengerRootIds<"biography">;
  value: string;
}
export interface KulMessengerChatRootNode
  extends KulMessengerBaseRootNode<KulMessengerRootIds<"chat">> {
  id: KulMessengerRootIds<"chat">;
  value: string;
}
export interface KulMessengerAvatarRootNode
  extends KulMessengerBaseImageRootNode<
    KulMessengerAvatarNode,
    KulMessengerImageRootIds<"avatars">
  > {
  id: KulMessengerImageRootIds<"avatars">;
}
export interface KulMessengerLocationRootNode
  extends KulMessengerBaseImageRootNode<
    KulMessengerLocationNode,
    KulMessengerImageRootIds<"locations">
  > {
  id: KulMessengerImageRootIds<"locations">;
}
export interface KulMessengerOutfitRootNode
  extends KulMessengerBaseImageRootNode<
    KulMessengerOutfitNode,
    KulMessengerImageRootIds<"outfits">
  > {
  id: KulMessengerImageRootIds<"outfits">;
}
export interface KulMessengerStyleRootNode
  extends KulMessengerBaseImageRootNode<
    KulMessengerStyleNode,
    KulMessengerImageRootIds<"styles">
  > {
  id: KulMessengerImageRootIds<"styles">;
}
export interface KulMessengerTimeframeRootNode
  extends KulMessengerBaseImageRootNode<
    KulMessengerTimeframeNode,
    KulMessengerImageRootIds<"timeframes">
  > {
  id: KulMessengerImageRootIds<"timeframes">;
}
//#endregion
//#region Children nodes
export interface KulMessengerBaseChildNode<T extends KulMessengerUnionChildIds>
  extends KulDataNode {
  cells: { kulImage: { shape: "image"; value: string } };
  id: T;
  value: string;
}
export type KulMessengerChildTypes = "avatar" | KulMessengerChildOptionTypes;
export type KulMessengerChildOptionTypes =
  | "location"
  | "outfit"
  | "style"
  | "timeframe";
export type KulMessengerPrefix<T extends KulMessengerChildTypes> = `${T}_`;
export type KulMessengerAvatarId = `${KulMessengerPrefix<"avatar">}${string}`;
export type KulMessengerLocationId =
  `${KulMessengerPrefix<"location">}${string}`;
export type KulMessengerOutfitId = `${KulMessengerPrefix<"outfit">}${string}`;
export type KulMessengerStyleId = `${KulMessengerPrefix<"style">}${string}`;
export type KulMessengerTimeframeId =
  `${KulMessengerPrefix<"timeframe">}${string}`;
export type KulMessengerUnionChildIds =
  | KulMessengerAvatarId
  | KulMessengerLocationId
  | KulMessengerOutfitId
  | KulMessengerStyleId
  | KulMessengerTimeframeId;
export type KulMessengerChildIds<T extends KulMessengerUnionChildIds> = T;
export interface KulMessengerAvatarNode
  extends KulMessengerBaseChildNode<KulMessengerAvatarId> {
  id: KulMessengerChildIds<KulMessengerAvatarId>;
}
export interface KulMessengerLocationNode
  extends KulMessengerBaseChildNode<KulMessengerLocationId> {
  id: KulMessengerChildIds<KulMessengerLocationId>;
}
export interface KulMessengerOutfitNode
  extends KulMessengerBaseChildNode<KulMessengerOutfitId> {
  id: KulMessengerChildIds<KulMessengerOutfitId>;
}
export interface KulMessengerStyleNode
  extends KulMessengerBaseChildNode<KulMessengerStyleId> {
  id: KulMessengerChildIds<KulMessengerStyleId>;
}
export interface KulMessengerTimeframeNode
  extends KulMessengerBaseChildNode<KulMessengerTimeframeId> {
  id: KulMessengerChildIds<KulMessengerTimeframeId>;
}
//#endregion
//#region States
export interface KulMessengerChat {
  [index: KulMessengerCharacterId]: KulChatPropsInterface;
}
export interface KulMessengerConfig {
  currentCharacter: string;
  ui: KulMessengerUI;
}
export interface KulMessengerCovers {
  [index: KulMessengerCharacterId]: {
    [K in KulMessengerImageTypes]: number;
  };
}
export interface KulMessengerHistory {
  [index: KulMessengerCharacterId]: string;
}
export interface KulMessengerImageEditComponents {
  descriptionTextarea: HTMLKulTextfieldElement;
  idTextfield: HTMLKulTextfieldElement;
  titleTextarea: HTMLKulTextfieldElement;
  imageUrlTextarea: HTMLKulTextfieldElement;
}
export type KulMessengerEditingStatus<T extends KulMessengerImageTypes> = {
  [index in KulMessengerImageRootIds<T>]: KulMessengerUnionChildIds;
};
export type KulMessengerFilters = {
  [T in KulMessengerImageTypes]: boolean;
};
export type KulMessengerOptions = {
  [T in KulMessengerOptionTypes]: boolean;
};
export interface KulMessengerPanels {
  isLeftCollapsed: boolean;
  isRightCollapsed: boolean;
}
export interface KulMessengerUI {
  customization: boolean;
  editing: KulMessengerFilters;
  filters: KulMessengerFilters;
  options: KulMessengerOptions;
  panels: KulMessengerPanels;
}
export type KulMessengerPanelsValue = "left" | "right";
//#endregion
//#region Events
export type KulMessengerEvent = "ready" | "save" | "unmount";
export interface KulMessengerEventPayload
  extends KulEventPayload<"KulMessenger", KulMessengerEvent> {
  config: KulMessengerConfig;
}
//#endregion
//#region Props
export enum KulMessengerProps {
  kulAutosave = "Automatically saves the dataset when a chat updates.",
  kulData = "The actual data of the component.",
  kulStyle = "Custom style of the component.",
  kulValue = "Sets the initial configuration, including active character and filters.",
}
export interface KulMessengerPropsInterface {
  kulAutosave?: boolean;
  kulData?: KulMessengerDataset;
  kulStyle?: string;
  kulValue?: KulMessengerConfig;
}
//#endregion
