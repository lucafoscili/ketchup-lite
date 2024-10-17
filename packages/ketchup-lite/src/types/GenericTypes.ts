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
import { KulDebugComponentInfo } from '../managers/kul-debug/kul-debug-declarations';
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
interface KulComponentCommon {
    debugInfo: KulDebugComponentInfo;
    getDebugInfo: () => Promise<KulDebugComponentInfo>;
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
    C extends KulComponent<KulComponentName>,
    T extends KulEventType<C>,
    E extends Event | CustomEvent,
> {
    comp: C;
    eventType: T;
    id: string;
    originalEvent: E;
}
export type KulGenericEventPayload = KulEventPayload<
    KulComponent<KulComponentName>,
    KulEventType<KulComponent<KulComponentName>>,
    CustomEvent | Event
>;
export type KulGenericComponent = KulComponent<KulComponentName>;
export type KulGenericComponentTag = KulComponentTag<KulComponentName>;
export type KulGenericRootElement = KulComponentRootElement<KulComponentName>;
export type KulGenericEventType = KulEventType<KulGenericComponent>;
export type KulGenericEvent = CustomEvent<KulGenericEventPayload>;
