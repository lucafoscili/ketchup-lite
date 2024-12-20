import {
  GenericObject,
  KulComponent,
  KulComponentName,
  KulComponentPropsFor,
} from "src/types/GenericTypes";
import { KUL_COMPONENT_PROPS } from "src/utils/constants";
import { KulData } from "../kul-data/kul-data";
import { KulDates } from "../kul-dates/kul-dates";
import { KulDatesLocales } from "../kul-dates/kul-dates-declarations";
import { KulDebug } from "../kul-debug/kul-debug";
import { KulDynamicPosition } from "../kul-dynamic-position/kul-dynamic-position";
import { KulDynamicPositionElement } from "../kul-dynamic-position/kul-dynamic-position-declarations";
import { KulLanguage } from "../kul-language/kul-language";
import { KulLanguageDefaults } from "../kul-language/kul-language-declarations";
import { KulLLM } from "../kul-llm/kul-llm";
import { KulScrollOnHover } from "../kul-scroll-on-hover/kul-scroll-on-hover";
import { KulTheme } from "../kul-theme/kul-theme";
import type {
  KulManagerClickCb,
  KulManagerComputedGetAssetPath,
  KulManagerGetAssetPath,
  KulManagerSetAssetPath,
  KulManagerUtilities,
} from "./kul-manager-declarations";

export class KulManager {
  assets: { get: KulManagerComputedGetAssetPath; set: KulManagerSetAssetPath };
  data: KulData;
  dates: KulDates;
  debug: KulDebug;
  dynamicPosition: KulDynamicPosition;
  language: KulLanguage;
  llm: KulLLM;
  resize: ResizeObserver;
  scrollOnHover: KulScrollOnHover;
  utilities: KulManagerUtilities;
  theme: KulTheme;

  constructor(
    getAssetPath: KulManagerGetAssetPath,
    setAssetPath: KulManagerSetAssetPath,
  ) {
    this.assets = {
      get: (value) => {
        const path = getAssetPath(value);
        const style = {
          mask: `url('${path}') no-repeat center`,
          webkitMask: `url('${path}') no-repeat center`,
        };

        return {
          path,
          style,
        };
      },
      set: setAssetPath,
    };

    this.data = new KulData();
    this.dates = new KulDates();
    this.debug = new KulDebug(this);
    this.dynamicPosition = new KulDynamicPosition();
    this.language = new KulLanguage();
    this.llm = new KulLLM();
    this.scrollOnHover = new KulScrollOnHover();
    this.theme = new KulTheme();
    this.utilities = {
      clickCallbacks: new Set(),
    };

    this.#setupListeners();
  }

  #setupListeners() {
    document.addEventListener("click", (e) => {
      const { utilities } = this;
      const { clickCallbacks } = utilities;

      const paths = e.composedPath() as HTMLElement[];
      clickCallbacks.forEach((obj) => {
        if (!obj || !obj.el?.isConnected || paths.includes(obj.el)) {
          return;
        }

        const elAsDynamicPos = obj.el as KulDynamicPositionElement;
        let found = false;

        if (elAsDynamicPos.kulDynamicPosition?.detach) {
          for (const pathEl of paths) {
            const pathElAsDynamicPos = pathEl as KulDynamicPositionElement;
            const { kulDynamicPosition } = pathElAsDynamicPos;
            const { detach, originalPath } = kulDynamicPosition;
            if (kulDynamicPosition && detach && originalPath.includes(obj.el)) {
              found = true;
              break;
            }
          }
        }

        if (!found) {
          obj.cb();
        }
      });
    });
  }
  /**
   * Add a callback to handle clicks outside specified elements.
   * @param cb - The callback to execute when the click occurs.
   * @param async - Whether to defer execution of the callback.
   */
  addClickCallback(cb: KulManagerClickCb, async?: boolean) {
    const { utilities } = this;
    const { clickCallbacks } = utilities;

    if (async) {
      setTimeout(() => clickCallbacks.add(cb), 0);
    } else {
      clickCallbacks.add(cb);
    }
  }
  /**
   * Assigns an element to the related refs' key.
   * @param {Record<string, any>} refs - The refs object.
   * @param {string} key - The key to assign.
   */
  assignRef = (refs: Record<string, any>, key: string) => (el: any) => {
    if (el) refs[key] = el;
  };
  /**
   * Retrieves component's prop values based on a list and option to include descriptions.
   * @param {KulComponent} comp - The component requesting prop values.
   * @returns {GenericObject} - An object with prop as keys and their related values.
   */
  getProps(comp: KulComponent<KulComponentName>): GenericObject {
    const props: GenericObject = {};

    for (const key in comp) {
      if (
        Object.prototype.hasOwnProperty.call(comp, key) &&
        key.startsWith("kul")
      ) {
        props[key] = comp[key];
      }
    }

    return props;
  }
  /**
   * Removes a previously added click-callback from the stack.
   * @param cb - The callback to remove.
   */
  removeClickCallback(cb: KulManagerClickCb) {
    this.utilities.clickCallbacks.delete(cb);
  }
  /**
   * Removes suspicious props from an object.
   * @param  props - The object to sanitize.
   * @param  compName - The component name to use for specific sanitization.
   * @returns The sanitized object.
   */
  sanitizeProps<C extends KulComponentName>(
    props: GenericObject<any>,
    compName: C,
  ): KulComponentPropsFor<C>;
  sanitizeProps<P extends GenericObject<any>>(props: P): P;
  sanitizeProps<P extends GenericObject<any>, C extends KulComponentName>(
    props: P,
    compName?: C,
  ): KulComponentPropsFor<C> | P {
    const ALLOWED_ATTRS = new Set<string>([
      "alt",
      "autocomplete",
      "autofocus",
      "checked",
      "class",
      "disabled",
      "href",
      "id",
      "max",
      "min",
      "name",
      "placeholder",
      "role",
      "src",
      "step",
      "title",
      "type",
      "value",
    ]);

    if (compName && KUL_COMPONENT_PROPS[compName]) {
      for (const key of KUL_COMPONENT_PROPS[compName]) {
        ALLOWED_ATTRS.add(key as string);
      }
    }

    const isAllowedAttribute = (attrName: string): boolean => {
      if (ALLOWED_ATTRS.has(attrName)) return true;
      if (attrName.startsWith("data-")) return true;
      if (attrName.startsWith("aria-")) return true;
      if (!compName && attrName.startsWith("kul")) return true;
      return false;
    };

    const isMaliciousValue = (value: any): boolean => {
      if (typeof value !== "string") return false;
      if (/javascript:/i.test(value)) return true;
      if (/<script>/i.test(value)) return true;
      return false;
    };

    const sanitized: GenericObject = {};
    for (const key in props) {
      if (!Object.prototype.hasOwnProperty.call(props, key)) continue;
      const value = props[key];

      if (key.toLowerCase().startsWith("on")) continue;
      if (!isAllowedAttribute(key)) continue;
      if (isMaliciousValue(value)) continue;

      sanitized[key] = value;
    }

    if (compName) {
      return sanitized as unknown as KulComponentPropsFor<C>;
    } else {
      return sanitized as P;
    }
  }
  /**
   * Spreads the specified locale to all the submodules.
   * @param locale - The locale to be set.
   */
  setLibraryLocalization(locale: KulDatesLocales) {
    const { dates, debug, language } = this;

    if (!(locale in KulDatesLocales)) {
      debug.logs.new(this, `Invalid locale (${locale})!`, "error");
      return;
    }

    const languageDefaults = KulLanguageDefaults[locale];
    if (!languageDefaults) {
      debug.logs.new(this, `Missing language for locale (${locale})!`, "error");
      return;
    }

    dates.setLocale(locale);
    language.set(KulLanguageDefaults[locale]);
  }
}
