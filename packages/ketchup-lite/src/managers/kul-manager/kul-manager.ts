import { KulData } from '../kul-data/kul-data';
import { KulDates } from '../kul-dates/kul-dates';
import { KulDatesLocales } from '../kul-dates/kul-dates-declarations';
import { KulDebug } from '../kul-debug/kul-debug';
import { KulDynamicPosition } from '../kul-dynamic-position/kul-dynamic-position';
import { KulDynamicPositionElement } from '../kul-dynamic-position/kul-dynamic-position-declarations';
import { KulLanguage } from '../kul-language/kul-language';
import { KulLanguageDefaults } from '../kul-language/kul-language-declarations';
import { KulScrollOnHover } from '../kul-scroll-on-hover/kul-scroll-on-hover';
import { KulTheme } from '../kul-theme/kul-theme';
import { setAssetPath } from '@stencil/core';
import type {
    KulDom,
    KulManagerClickCb,
    KulManagerInitialization,
    KulManagerUtilities,
} from './kul-manager-declarations';
import { KulLLM } from '../kul-llm/kul-llm';

const dom: KulDom = document.documentElement as KulDom;

export class KulManager {
    data: KulData;
    dates: KulDates;
    debug: KulDebug;
    dynamicPosition: KulDynamicPosition;
    language: KulLanguage;
    llm: KulLLM;
    overrides?: KulManagerInitialization;
    resize: ResizeObserver;
    scrollOnHover: KulScrollOnHover;
    utilities: KulManagerUtilities;
    theme: KulTheme;

    constructor(overrides?: KulManagerInitialization) {
        this.overrides = overrides ?? {};

        if (overrides?.assetsPath) {
            setAssetPath(overrides.assetsPath);
        }

        this.data = new KulData();
        this.dates = new KulDates(overrides?.dates?.locale ?? null);
        this.debug = new KulDebug(
            overrides?.debug?.active ?? null,
            overrides?.debug?.logLimit ?? null
        );
        this.dynamicPosition = new KulDynamicPosition();
        this.language = new KulLanguage(
            overrides?.language?.list ?? null,
            overrides?.language?.name ?? null
        );
        this.llm = new KulLLM();
        this.scrollOnHover = new KulScrollOnHover(
            overrides?.scrollOnHover?.delay ?? null,
            overrides?.scrollOnHover?.step ?? null
        );
        this.theme = new KulTheme(
            overrides?.theme?.list ?? null,
            overrides?.theme?.name ?? null
        );
        this.utilities = {
            clickCallbacks: new Set(),
        };

        this.#setupListeners();
    }
    #setupListeners() {
        document.addEventListener('click', (e) => {
            const paths = e.composedPath() as HTMLElement[];
            this.utilities.clickCallbacks.forEach((obj) => {
                if (
                    obj &&
                    obj.el &&
                    obj.el.isConnected &&
                    !paths.includes(obj.el)
                ) {
                    const elAsDynamicPos = obj.el as KulDynamicPositionElement;
                    let found = false;
                    if (
                        elAsDynamicPos.kulDynamicPosition &&
                        elAsDynamicPos.kulDynamicPosition.detach
                    ) {
                        for (let index = 0; index < paths.length; index++) {
                            const pathEl = paths[index];
                            const pathElAsDynamicPos =
                                pathEl as KulDynamicPositionElement;
                            if (
                                pathElAsDynamicPos.kulDynamicPosition &&
                                pathElAsDynamicPos.kulDynamicPosition.detach
                            ) {
                                const originalPath =
                                    pathElAsDynamicPos.kulDynamicPosition
                                        .originalPath;
                                if (originalPath.includes(obj.el)) {
                                    found = true;
                                }
                            }
                        }
                        if (!found) {
                            obj.cb();
                        }
                    } else {
                        obj.cb();
                    }
                }
            });
        });
    }
    addClickCallback(cb: KulManagerClickCb, async?: boolean) {
        if (async) {
            setTimeout(() => {
                this.utilities.clickCallbacks.add(cb);
            }, 0);
        } else {
            this.utilities.clickCallbacks.add(cb);
        }
    }
    removeClickCallback(cb: KulManagerClickCb) {
        this.utilities.clickCallbacks.delete(cb);
    }
    setLibraryLocalization(locale: KulDatesLocales) {
        if (!Object.values(KulDatesLocales).includes(locale)) {
            this.debug.logs.new(
                this,
                'Missing locale (' + locale + ')!',
                'error'
            );
            return;
        }
        if (!KulLanguageDefaults[locale]) {
            this.debug.logs.new(
                this,
                'Missing language for locale (' + locale + ')!',
                'error'
            );
            return;
        }
        this.dates.setLocale(locale);
        this.language.set(KulLanguageDefaults[locale]);
    }
}
export function kulManagerInstance(): KulManager {
    if (!dom.ketchupLite) {
        const overrides: KulManagerInitialization = dom.ketchupLiteInit ?? null;
        dom.ketchupLite = new KulManager(overrides);
        dom.ketchupLite.theme.set();
        globalThis.kulManager = dom.ketchupLite;
        if (overrides?.autoSetLocalization) {
            const locale = dom.ketchupLite.dates.locale;
            if (!overrides.language || !overrides.language.name) {
                dom.ketchupLite.language.set(KulLanguageDefaults[locale]);
            }
        }
        document.dispatchEvent(new CustomEvent('kul-manager-ready'));
    }
    return dom.ketchupLite;
}
