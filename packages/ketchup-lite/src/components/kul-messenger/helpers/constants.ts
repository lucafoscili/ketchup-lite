import {
  KulMessengerAdapterRefs,
  KulMessengerChildTypes,
  KulMessengerImageRootIds,
  KulMessengerImageTypes,
  KulMessengerOptionTypes,
  KulMessengerPropsInterface,
  KulMessengerUI,
} from "src/components/kul-messenger/kul-messenger-declarations";
import { KulDataDataset } from "src/managers/kul-data/kul-data-declarations";

//#region Props
export const KUL_MESSENGER_PROPS: (keyof KulMessengerPropsInterface)[] = [
  "kulAutosave",
  "kulData",
  "kulStyle",
  "kulValue",
];
//#endregion

//#region Clean UI flags
export const CLEAN_UI = (): KulMessengerUI => {
  return {
    customizationView: false,
    filters: {
      avatars: false,
      locations: false,
      outfits: false,
      styles: false,
      timeframes: false,
    },
    form: {
      avatars: false,
      locations: false,
      outfits: false,
      styles: false,
      timeframes: false,
    },
    options: {
      locations: true,
      outfits: true,
      styles: true,
      timeframes: true,
    },
    panels: {
      isLeftCollapsed: false,
      isRightCollapsed: false,
    },
  };
};
//#endregion

//#region Refs
export const REFS = (): KulMessengerAdapterRefs => {
  return {
    character: { avatar: null, biography: null, save: null, statusIcon: null },
    chat: {
      chat: null,
      leftExpander: null,
      rightExpander: null,
      tabbar: null,
    },
    customization: {
      filters: null,
      form: {
        avatars: {
          add: null,
          cancel: null,
          confirm: null,
          description: null,
          id: null,
          imageUrl: null,
          title: null,
        },
        locations: {
          add: null,
          cancel: null,
          confirm: null,
          description: null,
          id: null,
          imageUrl: null,
          title: null,
        },
        outfits: {
          add: null,
          cancel: null,
          confirm: null,
          description: null,
          id: null,
          imageUrl: null,
          title: null,
        },
        styles: {
          add: null,
          cancel: null,
          confirm: null,
          description: null,
          id: null,
          imageUrl: null,
          title: null,
        },
        timeframes: {
          add: null,
          cancel: null,
          confirm: null,
          description: null,
          id: null,
          imageUrl: null,
          title: null,
        },
      },
      list: { edit: null, remove: null },
    },
    options: { back: null, customize: null },
  };
};
//#endregion

//#region Icons
export const ICONS = {
  chat: {
    characterList: "account",
    leftExpander: "chevron_left",
    rightExpander: "chevron_right",
  },
};
//#endregion

//#region Ids
export const IDS = {
  chat: {
    leftExpander: "left-expander",
    rightExpander: "right-expaner",
  },
  options: {
    back: "back-button",
    customize: "customize-button",
  },
};
//#endregion

export const AVATAR_COVER = "portrait";
export const LOCATION_COVER = "landscape";
export const OUTFIT_COVER = "loyalty";
export const STYLE_COVER = "style";
export const TIMEFRAME_COVER = "clock";
export const COVER_ICONS = [
  AVATAR_COVER,
  LOCATION_COVER,
  OUTFIT_COVER,
  STYLE_COVER,
  TIMEFRAME_COVER,
];

export const FILTER_DATASET: KulDataDataset = {
  nodes: [
    {
      description: "View avatars",
      icon: AVATAR_COVER,
      id: "avatars",
      value: "Avatars",
    },
    {
      description: "View outfits",
      icon: OUTFIT_COVER,
      id: "outfits",
      value: "Outfits",
    },
    {
      description: "View locations",
      icon: LOCATION_COVER,
      id: "locations",
      value: "Locations",
    },
    {
      description: "View styles",
      icon: STYLE_COVER,
      id: "styles",
      value: "Styles",
    },
    {
      description: "View timeframes",
      icon: TIMEFRAME_COVER,
      id: "timeframes",
      value: "Timeframes",
    },
  ],
};

export const MENU_DATASET: KulDataDataset = {
  nodes: [
    {
      children: [
        {
          description: "Download the Ketchup Lite JSON, used as a dataset.",
          icon: "download",
          id: "kulData",
          value: "Download dataset",
        },
        {
          description: "Download the current configuration settings.",
          icon: "settings",
          id: "settings",
          value: "Download configuration",
        },
      ],
      id: "root",
      value: "",
    },
  ],
};

export const CHILD_ROOT_MAP: Record<
  KulMessengerChildTypes,
  KulMessengerImageTypes
> = {
  avatar: "avatars",
  location: "locations",
  outfit: "outfits",
  style: "styles",
  timeframe: "timeframes",
};

export const OPTION_TYPE_IDS: KulMessengerOptionTypes[] = [
  "locations",
  "outfits",
  "styles",
  "timeframes",
];

export const IMAGE_TYPE_IDS: KulMessengerImageRootIds<KulMessengerImageTypes>[] =
  ["avatars", ...OPTION_TYPE_IDS];

export const NAV_DATASET: KulDataDataset = {
  nodes: [
    {
      description: "Previous character",
      icon: ICONS.chat.leftExpander,
      id: "previous",
      value: "",
    },
    {
      description: "Character selection",
      icon: ICONS.chat.characterList,
      id: "character_list",
      value: "Character list",
    },
    {
      description: "Next character",
      icon: ICONS.chat.rightExpander,
      id: "next",
      value: "",
    },
  ],
};
