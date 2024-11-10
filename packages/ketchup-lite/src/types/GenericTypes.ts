import {
    KulArticleEvent,
    KulArticleProps,
} from '../components/kul-article/kul-article-declarations';
import {
    KulBadgeEvent,
    KulBadgeProps,
} from '../components/kul-badge/kul-badge-declarations';
import {
    KulButtonEvent,
    KulButtonProps,
} from '../components/kul-button/kul-button-declarations';
import {
    KulCardEvent,
    KulCardProps,
} from '../components/kul-card/kul-card-declarations';
import {
    KulChatEvent,
    KulChatProps,
} from '../components/kul-chat/kul-chat-declarations';
import {
    KulCodeEvent,
    KulCodeProps,
} from '../components/kul-code/kul-code-declarations';
import {
    KulImageEvent,
    KulImageProps,
} from '../components/kul-image/kul-image-declarations';
import {
    KulSpinnerEvent,
    KulSpinnerProps,
} from '../components/kul-spinner/kul-spinner-declarations';
import {
    KulSplashEvent,
    KulSplashProps,
} from '../components/kul-splash/kul-splash-declarations';
import {
    KulUploadEvent,
    KulUploadProps,
} from '../components/kul-upload/kul-upload-declarations';
import {
    KulToastEvent,
    KulToastProps,
} from '../components/kul-toast/kul-toast-declarations';
import {
    KulDrawerEvent,
    KulDrawerProps,
} from '../components/kul-drawer/kul-drawer-declarations';
import {
    KulTextfieldEvent,
    KulTextfieldProps,
} from '../components/kul-textfield/kul-textfield-declarations';
import {
    KulChartEvent,
    KulChartProps,
} from '../components/kul-chart/kul-chart-declarations';
import {
    KulHeaderEvent,
    KulHeaderProps,
} from '../components/kul-header/kul-header-declarations';
import {
    KulLazyEvent,
    KulLazyProps,
} from '../components/kul-lazy/kul-lazy-declarations';
import {
    KulPhotoframeEvent,
    KulPhotoframeProps,
} from '../components/kul-photoframe/kul-photoframe-declarations';
import {
    KulTabbarEvent,
    KulTabbarProps,
} from '../components/kul-tabbar/kul-tabbar-declarations';
import {
    KulTreeEvent,
    KulTreeProps,
} from '../components/kul-tree/kul-tree-declarations';
import {
    KulAccordionEvent,
    KulAccordionProps,
} from '../components/kul-accordion/kul-accordion-declarations';
import {
    KulListEvent,
    KulListProps,
} from '../components/kul-list/kul-list-declarations';
import {
    KulProgressbarEvent,
    KulProgressbarProps,
} from '../components/kul-progressbar/kul-progressbar-declarations';
import { KulDebugLifecycleInfo } from '../managers/kul-debug/kul-debug-declarations';
import {
    KulMessengerEvent,
    KulMessengerProps,
} from '../components/kul-messenger/kul-messenger-declarations';
import {
    KulSwitchEvent,
    KulSwitchProps,
} from '../components/kul-switch/kul-switch-declarations';
import {
    KulChipEvent,
    KulChipProps,
} from '../components/kul-chip/kul-chip-declarations';
import { KulAccordion } from '../components/kul-accordion/kul-accordion';
import { KulArticle } from '../components/kul-article/kul-article';
import { KulBadge } from '../components/kul-badge/kul-badge';
import { KulButton } from '../components/kul-button/kul-button';
import { KulCard } from '../components/kul-card/kul-card';
import { KulChart } from '../components/kul-chart/kul-chart';
import { KulChat } from '../components/kul-chat/kul-chat';
import { KulChip } from '../components/kul-chip/kul-chip';
import { KulCode } from '../components/kul-code/kul-code';
import { KulCompare } from '../components/kul-compare/kul-compare';
import { KulDrawer } from '../components/kul-drawer/kul-drawer';
import { KulHeader } from '../components/kul-header/kul-header';
import { KulImage } from '../components/kul-image/kul-image';
import { KulLazy } from '../components/kul-lazy/kul-lazy';
import { KulList } from '../components/kul-list/kul-list';
import { KulMessenger } from '../components/kul-messenger/kul-messenger';
import { KulPhotoframe } from '../components/kul-photoframe/kul-photoframe';
import { KulProgressbar } from '../components/kul-progressbar/kul-progressbar';
import { KulSpinner } from '../components/kul-spinner/kul-spinner';
import { KulSplash } from '../components/kul-splash/kul-splash';
import { KulSwitch } from '../components/kul-switch/kul-switch';
import { KulTabbar } from '../components/kul-tabbar/kul-tabbar';
import { KulTextfield } from '../components/kul-textfield/kul-textfield';
import { KulToast } from '../components/kul-toast/kul-toast';
import { KulTree } from '../components/kul-tree/kul-tree';
import { KulUpload } from '../components/kul-upload/kul-upload';
import {
    KulCompareEvent,
    KulCompareProps,
} from '../components/kul-compare/kul-compare-declarations';
import { KulMasonry } from '../components/kul-masonry/kul-masonry';
import {
    KulMasonryEvent,
    KulMasonryProps,
} from '../components/kul-masonry/kul-masonry-declarations';
import {
    KulTypewriterEvent,
    KulTypewriterProps,
} from '../components/kul-typewriter/kul-typewriter-declarations';
import { KulTypewriter } from '../components/kul-typewriter/kul-typewriter';
import {
    KulCarouselEvent,
    KulCarouselProps,
} from '../components/kul-carousel/kul-carousel-declarations';
import { KulCarousel } from '../components/kul-carousel/kul-carousel';
import {
    KulSliderEvent,
    KulSliderProps,
} from '../components/kul-slider/kul-slider-declarations';
import { KulSlider } from '../components/kul-slider/kul-slider';
import {
    KulImageviewerEvent,
    KulImageviewerProps,
} from '../components/kul-imageviewer/kul-imageviewer-declarations';
import { KulImageviewer } from '../components/kul-imageviewer/kul-imageviewer';

export interface GenericMap {
    [index: string]: string;
}
export interface GenericObject<T = unknown> {
    [index: string]: T;
}
export type KulComponentName =
    | 'KulAccordion'
    | 'KulArticle'
    | 'KulBadge'
    | 'KulButton'
    | 'KulCard'
    | 'KulCarousel'
    | 'KulChart'
    | 'KulChat'
    | 'KulChip'
    | 'KulCode'
    | 'KulCompare'
    | 'KulDrawer'
    | 'KulHeader'
    | 'KulImage'
    | 'KulImageviewer'
    | 'KulLazy'
    | 'KulList'
    | 'KulMasonry'
    | 'KulMessenger'
    | 'KulPhotoframe'
    | 'KulProgressbar'
    | 'KulSlider'
    | 'KulSpinner'
    | 'KulSplash'
    | 'KulSwitch'
    | 'KulTabbar'
    | 'KulTextfield'
    | 'KulToast'
    | 'KulTree'
    | 'KulTypewriter'
    | 'KulUpload';
export type KulComponentElementMap = {
    KulAccordion: HTMLKulAccordionElement;
    KulArticle: HTMLKulArticleElement;
    KulBadge: HTMLKulBadgeElement;
    KulButton: HTMLKulButtonElement;
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
    KulSwitch: HTMLKulSwitchElement;
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
    KulSwitch: KulSwitch;
    KulTabbar: KulTabbar;
    KulTextfield: KulTextfield;
    KulToast: KulToast;
    KulTree: KulTree;
    KulTypewriter: KulTypewriter;
    KulUpload: KulUpload;
};
export type KulComponentTagMap = {
    KulAccordion: 'kul-accordion';
    KulArticle: 'kul-article';
    KulBadge: 'kul-badge';
    KulButton: 'kul-button';
    KulCard: 'kul-card';
    KulCarousel: 'kul-carousel';
    KulChart: 'kul-chart';
    KulChat: 'kul-chat';
    KulChip: 'kul-chip';
    KulCode: 'kul-code';
    KulCompare: 'kul-compare';
    KulDrawer: 'kul-drawer';
    KulHeader: 'kul-header';
    KulImage: 'kul-image';
    KulImageviewer: 'kul-imageviewer';
    KulLazy: 'kul-lazy';
    KulList: 'kul-list';
    KulMasonry: 'kul-masonry';
    KulMessenger: 'kul-messenger';
    KulPhotoframe: 'kul-photoframe';
    KulProgressbar: 'kul-progressbar';
    KulSlider: 'kul-slider';
    KulSpinner: 'kul-spinner';
    KulSplash: 'kul-splash';
    KulSwitch: 'kul-switch';
    KulTabbar: 'kul-tabbar';
    KulTextfield: 'kul-textfield';
    KulToast: 'kul-toast';
    KulTree: 'kul-tree';
    KulTypewriter: 'kul-typewriter';
    KulUpload: 'kul-upload';
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
    BUTTON = 'button',
    CHECK = 'check',
    DROPDOWN_BUTTON = 'dropdown-button',
    DROPDOWN_MENU = 'dropdown-menu',
    INPUT = 'input',
    NODE = 'node',
    RIPPLE = 'ripple',
    SHAPE = 'shape',
    SHOWCASE_GRID_WRAPPER = 'wrapper',
}
export type ComponentEventMap = {
    KulAccordion: KulAccordionEvent;
    KulArticle: KulArticleEvent;
    KulBadge: KulBadgeEvent;
    KulButton: KulButtonEvent;
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
    KulSwitch: KulSwitchEvent;
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
    KulSwitch: KulSwitchProps;
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
