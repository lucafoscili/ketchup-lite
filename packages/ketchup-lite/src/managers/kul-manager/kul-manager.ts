import { KulData } from '../kul-data/kul-data';
import { KulDates } from '../kul-dates/kul-dates';
import { KulDatesLocales } from '../kul-dates/kul-dates-declarations';
import { KulDebug } from '../kul-debug/kul-debug';
import { KulDynamicPosition } from '../kul-dynamic-position/kul-dynamic-position';
import { KulDynamicPositionElement } from '../kul-dynamic-position/kul-dynamic-position-declarations';
import { KulLanguage } from '../kul-language/kul-language';
import { KulLanguageDefaults } from '../kul-language/kul-language-declarations';
import { KulMath } from '../kul-math/kul-math';
import { KulMathLocales } from '../kul-math/kul-math-declarations';
import { KulScrollOnHover } from '../kul-scroll-on-hover/kul-scroll-on-hover';
import { KulTheme } from '../kul-theme/kul-theme';
import { setAssetPath } from '@stencil/core';
import type {
    KulDom,
    KulManagerClickCb,
    KulManagerInitialization,
    KulManagerStringFinderPayload,
    KulManagerUtilities,
} from './kul-manager-declarations';
import { KulLLM } from '../kul-llm/kul-llm';

const dom: KulDom = document.documentElement as KulDom;

/**
 * This class controls every other Ketchup utility suite.
 * @module KulManager
 */
export class KulManager {
    data: KulData;
    dates: KulDates;
    debug: KulDebug;
    dynamicPosition: KulDynamicPosition;
    language: KulLanguage;
    llm: KulLLM;
    math: KulMath;
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
            overrides?.debug?.autoPrint ?? null,
            overrides?.debug?.logLimit ?? null
        );
        this.dynamicPosition = new KulDynamicPosition();
        this.language = new KulLanguage(
            overrides?.language?.list ?? null,
            overrides?.language?.name ?? null
        );
        this.llm = new KulLLM();
        this.math = new KulMath();
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
            lastPointerDownString: null,
        };

        this.#setupListeners();
    }

    #setupListeners() {
        document.addEventListener('pointerdown', (e) => {
            const paths = e.composedPath() as HTMLElement[];
            const lastString =
                paths[0].innerText || (paths[0] as HTMLInputElement).value;
            this.utilities.lastPointerDownString = lastString;
            if (lastString) {
                const e = new CustomEvent<KulManagerStringFinderPayload>(
                    'kul-manager-stringfinder',
                    {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            string: lastString,
                        },
                    }
                );
                document.dispatchEvent(e);
            }
        });
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
    /**
     * Adds a new click callback.
     * @param {KulManagerClickCb} cb - The callback to add.
     * @param {boolean} async - When true, the callback will be added asynchrounously to prevent instant firing if it was added through a click event.
     */
    addClickCallback(cb: KulManagerClickCb, async?: boolean) {
        if (async) {
            setTimeout(() => {
                this.utilities.clickCallbacks.add(cb);
            }, 0);
        } else {
            this.utilities.clickCallbacks.add(cb);
        }
    }
    /**
     * Retrives event path from event.target
     * @param currentEl event.target
     * @param rootElement rootElement of component
     * @returns
     */
    getEventPath(currentEl: unknown, rootElement: HTMLElement) {
        const path: HTMLElement[] = [];

        while (
            currentEl &&
            currentEl !== rootElement &&
            currentEl !== document.body
        ) {
            path.push(currentEl as HTMLElement);
            currentEl = (currentEl as HTMLElement).parentNode
                ? (currentEl as HTMLElement).parentNode
                : (currentEl as ShadowRoot).host;
        }

        return path;
    }
    /**
     * Removes the given click callback.
     * @param {KulManagerClickCb} cb - The callback to remove.
     */
    removeClickCallback(cb: KulManagerClickCb) {
        this.utilities.clickCallbacks.delete(cb);
    }
    /**
     * Sets both locale and language library-wide.
     * @param {KulDatesLocales} locale - The supported locale.
     */
    setLibraryLocalization(locale: KulDatesLocales) {
        if (!Object.values(KulDatesLocales).includes(locale)) {
            this.debug.logMessage(
                'kul-manager',
                'Missing locale (' + locale + ')!',
                'error'
            );
            return;
        }
        if (!KulLanguageDefaults[locale]) {
            this.debug.logMessage(
                'kul-manager',
                'Missing language for locale (' + locale + ')!',
                'error'
            );
            return;
        }
        this.dates.setLocale(locale);
        this.language.set(KulLanguageDefaults[locale]);
        this.math.setLocale(KulMathLocales[locale]);
    }
}
/**
 * Called by the Ketchup components to retrieve the instance of KulManager (or creating a new one when missing).
 * @returns {KulManager} KulManager instance.
 */
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
            if (!overrides.math || !overrides.math.locale) {
                dom.ketchupLite.math.setLocale(KulMathLocales[locale]);
            }
        }
        document.dispatchEvent(new CustomEvent('kul-manager-ready'));
    }
    return dom.ketchupLite;
}
