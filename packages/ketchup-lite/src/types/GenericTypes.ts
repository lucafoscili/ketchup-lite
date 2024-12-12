import { VNode } from "@stencil/core";
import { KulManager } from "src/managers/kul-manager/kul-manager";
import { KulAccordion } from "../components/kul-accordion/kul-accordion";
import {
  KulAccordionEvent,
  KulAccordionProps,
} from "../components/kul-accordion/kul-accordion-declarations";
import { KulArticle } from "../components/kul-article/kul-article";
import {
  KulArticleEvent,
  KulArticleProps,
} from "../components/kul-article/kul-article-declarations";
import { KulBadge } from "../components/kul-badge/kul-badge";
import {
  KulBadgeEvent,
  KulBadgeProps,
} from "../components/kul-badge/kul-badge-declarations";
import { KulButton } from "../components/kul-button/kul-button";
import {
  KulButtonEvent,
  KulButtonProps,
} from "../components/kul-button/kul-button-declarations";
import { KulCanvas } from "../components/kul-canvas/kul-canvas";
import {
  KulCanvasEvent,
  KulCanvasProps,
} from "../components/kul-canvas/kul-canvas-declarations";
import { KulCard } from "../components/kul-card/kul-card";
import {
  KulCardEvent,
  KulCardProps,
} from "../components/kul-card/kul-card-declarations";
import { KulCarousel } from "../components/kul-carousel/kul-carousel";
import {
  KulCarouselEvent,
  KulCarouselProps,
} from "../components/kul-carousel/kul-carousel-declarations";
import { KulChart } from "../components/kul-chart/kul-chart";
import {
  KulChartEvent,
  KulChartProps,
} from "../components/kul-chart/kul-chart-declarations";
import { KulChat } from "../components/kul-chat/kul-chat";
import {
  KulChatEvent,
  KulChatProps,
} from "../components/kul-chat/kul-chat-declarations";
import { KulChip } from "../components/kul-chip/kul-chip";
import {
  KulChipEvent,
  KulChipProps,
} from "../components/kul-chip/kul-chip-declarations";
import { KulCode } from "../components/kul-code/kul-code";
import {
  KulCodeEvent,
  KulCodeProps,
} from "../components/kul-code/kul-code-declarations";
import { KulCompare } from "../components/kul-compare/kul-compare";
import {
  KulCompareEvent,
  KulCompareProps,
} from "../components/kul-compare/kul-compare-declarations";
import { KulDrawer } from "../components/kul-drawer/kul-drawer";
import {
  KulDrawerEvent,
  KulDrawerProps,
} from "../components/kul-drawer/kul-drawer-declarations";
import { KulHeader } from "../components/kul-header/kul-header";
import {
  KulHeaderEvent,
  KulHeaderProps,
} from "../components/kul-header/kul-header-declarations";
import { KulImage } from "../components/kul-image/kul-image";
import {
  KulImageEvent,
  KulImageProps,
} from "../components/kul-image/kul-image-declarations";
import { KulImageviewer } from "../components/kul-imageviewer/kul-imageviewer";
import {
  KulImageviewerEvent,
  KulImageviewerProps,
} from "../components/kul-imageviewer/kul-imageviewer-declarations";
import { KulLazy } from "../components/kul-lazy/kul-lazy";
import {
  KulLazyEvent,
  KulLazyProps,
} from "../components/kul-lazy/kul-lazy-declarations";
import { KulList } from "../components/kul-list/kul-list";
import {
  KulListEvent,
  KulListProps,
} from "../components/kul-list/kul-list-declarations";
import { KulMasonry } from "../components/kul-masonry/kul-masonry";
import {
  KulMasonryEvent,
  KulMasonryProps,
} from "../components/kul-masonry/kul-masonry-declarations";
import { KulMessenger } from "../components/kul-messenger/kul-messenger";
import {
  KulMessengerEvent,
  KulMessengerProps,
} from "../components/kul-messenger/kul-messenger-declarations";
import { KulPhotoframe } from "../components/kul-photoframe/kul-photoframe";
import {
  KulPhotoframeEvent,
  KulPhotoframeProps,
} from "../components/kul-photoframe/kul-photoframe-declarations";
import { KulProgressbar } from "../components/kul-progressbar/kul-progressbar";
import {
  KulProgressbarEvent,
  KulProgressbarProps,
} from "../components/kul-progressbar/kul-progressbar-declarations";
import { KulSlider } from "../components/kul-slider/kul-slider";
import {
  KulSliderEvent,
  KulSliderProps,
} from "../components/kul-slider/kul-slider-declarations";
import { KulSpinner } from "../components/kul-spinner/kul-spinner";
import {
  KulSpinnerEvent,
  KulSpinnerProps,
} from "../components/kul-spinner/kul-spinner-declarations";
import { KulSplash } from "../components/kul-splash/kul-splash";
import {
  KulSplashEvent,
  KulSplashProps,
} from "../components/kul-splash/kul-splash-declarations";
import { KulTabbar } from "../components/kul-tabbar/kul-tabbar";
import {
  KulTabbarEvent,
  KulTabbarProps,
} from "../components/kul-tabbar/kul-tabbar-declarations";
import { KulTextfield } from "../components/kul-textfield/kul-textfield";
import {
  KulTextfieldEvent,
  KulTextfieldProps,
} from "../components/kul-textfield/kul-textfield-declarations";
import { KulToast } from "../components/kul-toast/kul-toast";
import {
  KulToastEvent,
  KulToastProps,
} from "../components/kul-toast/kul-toast-declarations";
import { KulToggle } from "../components/kul-toggle/kul-toggle";
import {
  KulToggleEvent,
  KulToggleProps,
} from "../components/kul-toggle/kul-toggle-declarations";
import { KulTree } from "../components/kul-tree/kul-tree";
import {
  KulTreeEvent,
  KulTreeProps,
} from "../components/kul-tree/kul-tree-declarations";
import { KulTypewriter } from "../components/kul-typewriter/kul-typewriter";
import {
  KulTypewriterEvent,
  KulTypewriterProps,
} from "../components/kul-typewriter/kul-typewriter-declarations";
import { KulUpload } from "../components/kul-upload/kul-upload";
import {
  KulUploadEvent,
  KulUploadProps,
} from "../components/kul-upload/kul-upload-declarations";
import { KulDebugLifecycleInfo } from "../managers/kul-debug/kul-debug-declarations";

export interface GenericMap {
  [index: string]: string;
}
export interface GenericObject<T = unknown> {
  [index: string]: T;
}
export type KulComponentName =
  | "KulAccordion"
  | "KulArticle"
  | "KulBadge"
  | "KulButton"
  | "KulCanvas"
  | "KulCard"
  | "KulCarousel"
  | "KulChart"
  | "KulChat"
  | "KulChip"
  | "KulCode"
  | "KulCompare"
  | "KulDrawer"
  | "KulHeader"
  | "KulImage"
  | "KulImageviewer"
  | "KulLazy"
  | "KulList"
  | "KulMasonry"
  | "KulMessenger"
  | "KulPhotoframe"
  | "KulProgressbar"
  | "KulSlider"
  | "KulSpinner"
  | "KulSplash"
  | "KulToggle"
  | "KulTabbar"
  | "KulTextfield"
  | "KulToast"
  | "KulTree"
  | "KulTypewriter"
  | "KulUpload";
export type KulComponentElementMap = {
  KulAccordion: HTMLKulAccordionElement;
  KulArticle: HTMLKulArticleElement;
  KulBadge: HTMLKulBadgeElement;
  KulButton: HTMLKulButtonElement;
  KulCanvas: HTMLKulCanvasElement;
  KulCard: HTMLKulCardElement;
  KulCarousel: HTMLKulCarouselElement;
  KulChart: HTMLKulChartElement;
  KulChat: HTMLKulChatElement;
  KulChip: HTMLKulChipElement;
  KulCode: HTMLKulCodeElement;
  KulCompare: HTMLKulCompareElement;
  KulDrawer: HTMLKulDrawerElement;
  KulHeader: HTMLKulHeaderElement;
  KulImage: HTMLKulImageElement;
  KulImageviewer: HTMLKulImageviewerElement;
  KulLazy: HTMLKulLazyElement;
  KulList: HTMLKulListElement;
  KulMasonry: HTMLKulMasonryElement;
  KulMessenger: HTMLKulMessengerElement;
  KulPhotoframe: HTMLKulPhotoframeElement;
  KulProgressbar: HTMLKulProgressbarElement;
  KulSlider: HTMLKulSliderElement;
  KulSpinner: HTMLKulSpinnerElement;
  KulSplash: HTMLKulSplashElement;
  KulToggle: HTMLKulToggleElement;
  KulTabbar: HTMLKulTabbarElement;
  KulTextfield: HTMLKulTextfieldElement;
  KulToast: HTMLKulToastElement;
  KulTree: HTMLKulTreeElement;
  KulTypewriter: HTMLKulTypewriterElement;
  KulUpload: HTMLKulUploadElement;
};
export type KulComponentClassMap = {
  KulAccordion: KulAccordion;
  KulArticle: KulArticle;
  KulBadge: KulBadge;
  KulButton: KulButton;
  KulCanvas: KulCanvas;
  KulCard: KulCard;
  KulCarousel: KulCarousel;
  KulChart: KulChart;
  KulChat: KulChat;
  KulChip: KulChip;
  KulCode: KulCode;
  KulCompare: KulCompare;
  KulDrawer: KulDrawer;
  KulHeader: KulHeader;
  KulImage: KulImage;
  KulImageviewer: KulImageviewer;
  KulLazy: KulLazy;
  KulList: KulList;
  KulMasonry: KulMasonry;
  KulMessenger: KulMessenger;
  KulPhotoframe: KulPhotoframe;
  KulProgressbar: KulProgressbar;
  KulSlider: KulSlider;
  KulSpinner: KulSpinner;
  KulSplash: KulSplash;
  KulToggle: KulToggle;
  KulTabbar: KulTabbar;
  KulTextfield: KulTextfield;
  KulToast: KulToast;
  KulTree: KulTree;
  KulTypewriter: KulTypewriter;
  KulUpload: KulUpload;
};
export type KulComponentTagMap = {
  KulAccordion: "kul-accordion";
  KulArticle: "kul-article";
  KulBadge: "kul-badge";
  KulButton: "kul-button";
  KulCanvas: "kul-canvas";
  KulCard: "kul-card";
  KulCarousel: "kul-carousel";
  KulChart: "kul-chart";
  KulChat: "kul-chat";
  KulChip: "kul-chip";
  KulCode: "kul-code";
  KulCompare: "kul-compare";
  KulDrawer: "kul-drawer";
  KulHeader: "kul-header";
  KulImage: "kul-image";
  KulImageviewer: "kul-imageviewer";
  KulLazy: "kul-lazy";
  KulList: "kul-list";
  KulMasonry: "kul-masonry";
  KulMessenger: "kul-messenger";
  KulPhotoframe: "kul-photoframe";
  KulProgressbar: "kul-progressbar";
  KulSlider: "kul-slider";
  KulSpinner: "kul-spinner";
  KulSplash: "kul-splash";
  KulToggle: "kul-toggle";
  KulTabbar: "kul-tabbar";
  KulTextfield: "kul-textfield";
  KulToast: "kul-toast";
  KulTree: "kul-tree";
  KulTypewriter: "kul-typewriter";
  KulUpload: "kul-upload";
};
export type KulComponentType<T extends KulComponentName> =
  T extends keyof KulComponentClassMap
    ? KulComponentClassMap[T]
    : KulComponentCommon;
export interface KulComponent<T extends KulComponentName>
  extends KulComponentCommon {
  rootElement: KulComponentElementMap[T];
}
interface KulComponentCommon {
  debugInfo: KulDebugLifecycleInfo;
  getDebugInfo: () => Promise<KulDebugLifecycleInfo>;
  getProps: (descriptions?: boolean) => Promise<GenericObject>;
  kulStyle: string;
  refresh: () => Promise<void>;
}
export interface KulComponent<T extends KulComponentName>
  extends KulComponentCommon {
  rootElement: KulComponentElementMap[T];
}
export type KulComponentEventPayloadName<C extends KulComponentName> =
  `${C}EventPayload`;
export type KulComponentEventName<C extends KulComponentName> =
  `${KulComponentTag<C>}-event`;
export type KulComponentRootElement<C extends KulComponentName> =
  KulComponentElementMap[C];
export type KulComponentTag<C extends KulComponentName> = KulComponentTagMap[C];
export type ActualComponentClasses = {
  [K in KulComponentName]: KulComponentElementMap[K];
}[KulComponentName];
export enum KulDataCyAttributes {
  BUTTON = "button",
  CHECK = "check",
  DROPDOWN_BUTTON = "dropdown-button",
  DROPDOWN_MENU = "dropdown-menu",
  INPUT = "input",
  NODE = "node",
  RIPPLE = "ripple",
  SHAPE = "shape",
  SHOWCASE_GRID_WRAPPER = "wrapper",
}
export type ComponentEventMap = {
  KulAccordion: KulAccordionEvent;
  KulArticle: KulArticleEvent;
  KulBadge: KulBadgeEvent;
  KulButton: KulButtonEvent;
  KulCanvas: KulCanvasEvent;
  KulCard: KulCardEvent;
  KulCarousel: KulCarouselEvent;
  KulChart: KulChartEvent;
  KulChat: KulChatEvent;
  KulChip: KulChipEvent;
  KulCode: KulCodeEvent;
  KulCompare: KulCompareEvent;
  KulDrawer: KulDrawerEvent;
  KulHeader: KulHeaderEvent;
  KulImage: KulImageEvent;
  KulImageviewer: KulImageviewerEvent;
  KulLazy: KulLazyEvent;
  KulList: KulListEvent;
  KulMasonry: KulMasonryEvent;
  KulMessenger: KulMessengerEvent;
  KulPhotoframe: KulPhotoframeEvent;
  KulProgressbar: KulProgressbarEvent;
  KulSlider: KulSliderEvent;
  KulSpinner: KulSpinnerEvent;
  KulSplash: KulSplashEvent;
  KulToggle: KulToggleEvent;
  KulTabbar: KulTabbarEvent;
  KulTextfield: KulTextfieldEvent;
  KulToast: KulToastEvent;
  KulTree: KulTreeEvent;
  KulTypewriter: KulTypewriterEvent;
  KulUpload: KulUploadEvent;
};
export type ComponentPropsMap = {
  KulAccordion: KulAccordionProps;
  KulArticle: KulArticleProps;
  KulBadge: KulBadgeProps;
  KulButton: KulButtonProps;
  KulCanvas: KulCanvasProps;
  KulCard: KulCardProps;
  KulCarousel: KulCarouselProps;
  KulChart: KulChartProps;
  KulChat: KulChatProps;
  KulChip: KulChipProps;
  KulCode: KulCodeProps;
  KulCompare: KulCompareProps;
  KulDrawer: KulDrawerProps;
  KulHeader: KulHeaderProps;
  KulImage: KulImageProps;
  KulImageviewer: KulImageviewerProps;
  KulLazy: KulLazyProps;
  KulList: KulListProps;
  KulMasonry: KulMasonryProps;
  KulMessenger: KulMessengerProps;
  KulPhotoframe: KulPhotoframeProps;
  KulProgressbar: KulProgressbarProps;
  KulSlider: KulSliderProps;
  KulSpinner: KulSpinnerProps;
  KulSplash: KulSplashProps;
  KulToggle: KulToggleProps;
  KulTabbar: KulTabbarProps;
  KulTextfield: KulTextfieldProps;
  KulToast: KulToastProps;
  KulTree: KulTreeProps;
  KulTypewriter: KulTypewriterProps;
  KulUpload: KulUploadProps;
};
type ExtractComponentName<C> = C extends KulComponent<infer N> ? N : never;
export type KulEventType<C extends KulComponent<KulComponentName>> =
  ComponentEventMap[ExtractComponentName<C>];
export type KulComponentAdapterJsx = Record<string, (...args: any[]) => VNode>;
export type KulComponentAdapterRef = Record<string, HTMLElement>;
export interface KulComponentAdapter<C extends KulGenericComponent> {
  components?: {
    jsx: KulComponentAdapterJsx | Record<string, KulComponentAdapterJsx>;
    refs: KulComponentAdapterRef | Record<string, KulComponentAdapterRef>;
  };
  handlers?: {
    [index: string]: any;
  };
  hooks?: {
    get: {
      comp: C;
      manager: KulManager;
      [index: string]: any;
    };
    set?: {
      [index: string]: any;
    };
  };
}
export interface KulEventPayload<
  C extends KulComponentName,
  T extends KulEventType<KulComponent<C>>,
> {
  comp: KulComponentType<C>;
  eventType: T;
  id: string;
  originalEvent: CustomEvent | Event;
}
export type KulGenericEventPayload = KulEventPayload<
  KulComponentName,
  KulEventType<KulComponent<KulComponentName>>
>;
export type KulGenericComponent = KulComponent<KulComponentName>;
export type KulGenericComponentTag = KulComponentTag<KulComponentName>;
export type KulGenericRootElement = KulComponentRootElement<KulComponentName>;
export type KulGenericEventType = KulEventType<KulGenericComponent>;
export type KulGenericEvent = CustomEvent<KulGenericEventPayload>;
