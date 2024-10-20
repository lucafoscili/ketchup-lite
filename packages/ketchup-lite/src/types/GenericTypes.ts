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
    | 'KulChart'
    | 'KulChat'
    | 'KulChip'
    | 'KulCode'
    | 'KulCompare'
    | 'KulDrawer'
    | 'KulHeader'
    | 'KulImage'
    | 'KulLazy'
    | 'KulList'
    | 'KulMessenger'
    | 'KulPhotoframe'
    | 'KulProgressbar'
    | 'KulSpinner'
    | 'KulSplash'
    | 'KulSwitch'
    | 'KulTabbar'
    | 'KulTextfield'
    | 'KulToast'
    | 'KulTree'
    | 'KulUpload';
export type KulComponentElementMap = {
    KulAccordion: HTMLKulAccordionElement;
    KulArticle: HTMLKulArticleElement;
    KulBadge: HTMLKulBadgeElement;
    KulButton: HTMLKulButtonElement;
    KulCard: HTMLKulCardElement;
    KulChart: HTMLKulChartElement;
    KulChat: HTMLKulChatElement;
    KulChip: HTMLKulChipElement;
    KulCode: HTMLKulCodeElement;
    KulCompare: HTMLKulCompareElement;
    KulDrawer: HTMLKulDrawerElement;
    KulHeader: HTMLKulHeaderElement;
    KulImage: HTMLKulImageElement;
    KulLazy: HTMLKulLazyElement;
    KulList: HTMLKulListElement;
    KulMessenger: HTMLKulMessengerElement;
    KulPhotoframe: HTMLKulPhotoframeElement;
    KulProgressbar: HTMLKulProgressbarElement;
    KulSpinner: HTMLKulSpinnerElement;
    KulSplash: HTMLKulSplashElement;
    KulSwitch: HTMLKulSwitchElement;
    KulTabbar: HTMLKulTabbarElement;
    KulTextfield: HTMLKulTextfieldElement;
    KulToast: HTMLKulToastElement;
    KulTree: HTMLKulTreeElement;
    KulUpload: HTMLKulUploadElement;
};
export type KulComponentClassMap = {
    KulAccordion: KulAccordion;
    KulArticle: KulArticle;
    KulBadge: KulBadge;
    KulButton: KulButton;
    KulCard: KulCard;
    KulChart: KulChart;
    KulChat: KulChat;
    KulChip: KulChip;
    KulCode: KulCode;
    KulCompare: KulCompare;
    KulDrawer: KulDrawer;
    KulHeader: KulHeader;
    KulImage: KulImage;
    KulLazy: KulLazy;
    KulList: KulList;
    KulMessenger: KulMessenger;
    KulPhotoframe: KulPhotoframe;
    KulProgressbar: KulProgressbar;
    KulSpinner: KulSpinner;
    KulSplash: KulSplash;
    KulSwitch: KulSwitch;
    KulTabbar: KulTabbar;
    KulTextfield: KulTextfield;
    KulToast: KulToast;
    KulTree: KulTree;
    KulUpload: KulUpload;
};
export type KulComponentTagMap = {
    KulAccordion: 'kul-accordion';
    KulArticle: 'kul-article';
    KulBadge: 'kul-badge';
    KulButton: 'kul-button';
    KulCard: 'kul-card';
    KulChart: 'kul-chart';
    KulChat: 'kul-chat';
    KulChip: 'kul-chip';
    KulCode: 'kul-code';
    KulCompare: 'kul-compare';
    KulDrawer: 'kul-drawer';
    KulHeader: 'kul-header';
    KulImage: 'kul-image';
    KulLazy: 'kul-lazy';
    KulList: 'kul-list';
    KulMessenger: 'kul-messenger';
    KulPhotoframe: 'kul-photoframe';
    KulProgressbar: 'kul-progressbar';
    KulSpinner: 'kul-spinner';
    KulSplash: 'kul-splash';
    KulSwitch: 'kul-switch';
    KulTabbar: 'kul-tabbar';
    KulTextfield: 'kul-textfield';
    KulToast: 'kul-toast';
    KulTree: 'kul-tree';
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
    KulChart: KulChartEvent;
    KulChat: KulChatEvent;
    KulChip: KulChipEvent;
    KulCode: KulCodeEvent;
    KulCompare: KulCompareEvent;
    KulDrawer: KulDrawerEvent;
    KulHeader: KulHeaderEvent;
    KulImage: KulImageEvent;
    KulLazy: KulLazyEvent;
    KulList: KulListEvent;
    KulMessenger: KulMessengerEvent;
    KulPhotoframe: KulPhotoframeEvent;
    KulProgressbar: KulProgressbarEvent;
    KulSpinner: KulSpinnerEvent;
    KulSplash: KulSplashEvent;
    KulSwitch: KulSwitchEvent;
    KulTabbar: KulTabbarEvent;
    KulTextfield: KulTextfieldEvent;
    KulToast: KulToastEvent;
    KulTree: KulTreeEvent;
    KulUpload: KulUploadEvent;
};
export type ComponentPropsMap = {
    KulAccordion: KulAccordionProps;
    KulArticle: KulArticleProps;
    KulBadge: KulBadgeProps;
    KulButton: KulButtonProps;
    KulCard: KulCardProps;
    KulChart: KulChartProps;
    KulChat: KulChatProps;
    KulChip: KulChipProps;
    KulCode: KulCodeProps;
    KulCompare: KulCompareProps;
    KulDrawer: KulDrawerProps;
    KulHeader: KulHeaderProps;
    KulImage: KulImageProps;
    KulLazy: KulLazyProps;
    KulList: KulListProps;
    KulMessenger: KulMessengerProps;
    KulPhotoframe: KulPhotoframeProps;
    KulProgressbar: KulProgressbarProps;
    KulSpinner: KulSpinnerProps;
    KulSplash: KulSplashProps;
    KulSwitch: KulSwitchProps;
    KulTabbar: KulTabbarProps;
    KulTextfield: KulTextfieldProps;
    KulToast: KulToastProps;
    KulTree: KulTreeProps;
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
