import type { Interaction } from '@interactjs/core/Interaction';
import type { ActionMap } from '@interactjs/core/scope';
import type { RectResolvable } from '@interactjs/types/index';
import type { KulDates } from '../kul-dates/kul-dates';
import type { KulDatesLocales } from '../kul-dates/kul-dates-declarations';
import type { KulDebug } from '../kul-debug/kul-debug';
import type { KulDynamicPosition } from '../kul-dynamic-position/kul-dynamic-position';
import type { KulLanguage } from '../kul-language/kul-language';
import type { KulLanguageJSON } from '../kul-language/kul-language-declarations';
import type { KulMath } from '../kul-math/kul-math';
import type { KulObjects } from '../kul-objects/kul-objects';
import type { KulObjectsJSON } from '../kul-objects/kul-objects-declarations';
import type { KulScrollOnHover } from '../kul-scroll-on-hover/kul-scroll-on-hover';
import type { KulTheme } from '../kul-theme/kul-theme';
import type { KulThemeJSON } from '../kul-theme/kul-theme-declarations';
import { KulMathLocales } from '../kul-math/kul-math-declarations';
import { Options } from 'html2canvas';
/**
 * Interface used to define the HTML element with Ketchup specific properties.
 */
export interface KulDom extends HTMLHtmlElement {
    ketchupLite: KulManager;
    ketchupLiteInit: KulManagerInitialization;
}
/**
 * Interface for the KulManager class
 */
export interface KulManager {
    dates: KulDates;
    debug: KulDebug;
    dynamicPosition: KulDynamicPosition;
    enableExperimentalFeatures: boolean;
    language: KulLanguage;
    math: KulMath;
    objects: KulObjects;
    overrides?: KulManagerInitialization;
    resize: ResizeObserver;
    scrollOnHover: KulScrollOnHover;
    theme: KulTheme;
    utilities: KulManagerUtilities;
    setLibraryLocalization: (locale: KulDatesLocales) => void;
    addClickCallback: (cb: KulManagerClickCb, async?: boolean) => void;
    getEventPath: (
        currentEl: unknown,
        rootElement: HTMLElement
    ) => HTMLElement[];
    removeClickCallback: (cb: KulManagerClickCb) => void;
    rasterize: (
        el: HTMLElement,
        options?: Partial<Options>
    ) => Promise<HTMLCanvasElement>;
}
/**
 * Interface for the KulManager utilities.
 */
export interface KulManagerUtilities {
    clickCallbacks?: Set<KulManagerClickCb>;
    lastPointerDownString?: string;
}
/**
 * Interface to declare callbacks automatically invoked on pointer down events.
 */
export interface KulManagerClickCb {
    cb: () => unknown;
    el?: HTMLElement;
}
/**
 * Interface for the KulManager override settings.
 */
export interface KulManagerInitialization {
    assetsPath?: string;
    autoSetLocalization?: boolean;
    dates?: KulManagerDatesSettings;
    debug?: KulManagerDebugSettings;
    enableExperimentalFeatures?: boolean;
    interact?: KulManagerInteractSettings;
    language?: KulManagerLanguageSettings;
    math?: KulManagerMathSettings;
    objects?: KulManagerObjectsSettings;
    scrollOnHover?: KulManagerScrollOnHoverSettings;
    theme?: KulManagerThemeSettings;
    tooltip?: KulManagerTooltipSettings;
}
/**
 * KulDates initialization settings.
 */
export interface KulManagerDatesSettings {
    locale?: KulDatesLocales;
}
/**
 * KulDebug initialization settings.
 */
export interface KulManagerDebugSettings {
    active?: boolean;
    autoPrint?: boolean;
    logLimit?: number;
}
/**
 * KulDialog initialization settings.
 */
export interface KulManagerInteractSettings {
    restrictContainer?: RectResolvable<
        [number, number, Interaction<keyof ActionMap>]
    >;
    zIndex?: number;
}
/**
 * KulLanguage initialization settings.
 */
export interface KulManagerLanguageSettings {
    list?: KulLanguageJSON;
    name?: string;
}
/**
 * KulMath initialization settings.
 */
export interface KulManagerMathSettings {
    locale?: KulMathLocales;
}
/**
 * KulObjects initialization settings.
 */
export interface KulManagerObjectsSettings {
    list?: KulObjectsJSON;
}
/**
 * KulScrollOnHover initialization settings.
 */
export interface KulManagerScrollOnHoverSettings {
    delay?: number;
    step?: number;
}
/**
 * KulTheme initialization settings.
 */
export interface KulManagerThemeSettings {
    list?: KulThemeJSON;
    name?: string;
}
/**
 * KulDates initialization settings.
 */
export interface KulManagerTooltipSettings {
    delay?: number;
}
/**
 * KulTheme initialization settings.
 */
export interface KulManagerStringFinderPayload {
    string: string;
}