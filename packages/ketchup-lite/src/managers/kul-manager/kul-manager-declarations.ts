import type { KulDatesLocales } from '../kul-dates/kul-dates-declarations';
import type { KulLanguageJSON } from '../kul-language/kul-language-declarations';
import type { KulMathLocales } from '../kul-math/kul-math-declarations';
import type { KulThemeJSON } from '../kul-theme/kul-theme-declarations';
import type { KulManager } from './kul-manager';

export interface KulDom extends HTMLHtmlElement {
    ketchupLite: KulManager;
    ketchupLiteInit: KulManagerInitialization;
}
export interface KulManagerUtilities {
    clickCallbacks?: Set<KulManagerClickCb>;
}
export interface KulManagerClickCb {
    cb: () => unknown;
    el?: HTMLElement;
}
export interface KulManagerInitialization {
    assetsPath?: string;
    autoSetLocalization?: boolean;
    dates?: KulManagerDatesSettings;
    debug?: KulManagerDebugSettings;
    language?: KulManagerLanguageSettings;
    math?: KulManagerMathSettings;
    scrollOnHover?: KulManagerScrollOnHoverSettings;
    theme?: KulManagerThemeSettings;
}
export interface KulManagerDatesSettings {
    locale?: KulDatesLocales;
}
export interface KulManagerDebugSettings {
    active?: boolean;
    autoPrint?: boolean;
    logLimit?: number;
}
export interface KulManagerLanguageSettings {
    list?: KulLanguageJSON;
    name?: string;
}
export interface KulManagerMathSettings {
    locale?: KulMathLocales;
}
export interface KulManagerScrollOnHoverSettings {
    delay?: number;
    step?: number;
}
export interface KulManagerThemeSettings {
    list?: KulThemeJSON;
    name?: string;
}
