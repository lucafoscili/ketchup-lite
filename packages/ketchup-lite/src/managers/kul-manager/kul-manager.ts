import { getAssetPath, setAssetPath } from "src/index";
import {
  GenericObject,
  KulComponent,
  KulComponentName,
  KulComponentPropsFor,
} from "src/types/GenericTypes";
import { KUL_COMPONENT_PROPS } from "src/utils/constants";
import { KulData } from "../kul-data/kul-data";
import { KulDebug } from "../kul-debug/kul-debug";
import { KulPortal } from "../kul-portal/kul-portal";
import { KulLLM } from "../kul-llm/kul-llm";
import { KulScrollOnHover } from "../kul-scroll-on-hover/kul-scroll-on-hover";
import { KulTheme } from "../kul-theme/kul-theme";
import type {
  KulManagerClickCb,
  KulManagerComputedGetAssetPath,
  KulManagerSetAssetPath,
  KulManagerUtilities,
} from "./kul-manager-declarations";

if (process.env.NODE_ENV === "development") {
  console.log("Loading kul-manager.ts");
}

export class KulManager {
  assets: { get: KulManagerComputedGetAssetPath; set: KulManagerSetAssetPath };
  data: KulData;
  debug: KulDebug;
  portal: KulPortal;
  llm: KulLLM;
  resize: ResizeObserver;
  scrollOnHover: KulScrollOnHover;
  utilities: KulManagerUtilities;
  theme: KulTheme;

  constructor() {
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

    this.data = new KulData(this);
    this.debug = new KulDebug(this);
    this.portal = new KulPortal(this);
    this.llm = new KulLLM(this);
    this.scrollOnHover = new KulScrollOnHover(this);
    this.theme = new KulTheme(this);
    this.utilities = {
      clickCallbacks: new Set(),
    };

    this.#setupListeners();

    if (process.env.NODE_ENV === "development") {
      console.log("KulManager initialized.");
    }
  }

  #setupListeners = () => {
    document.addEventListener("click", (e) => {
      const { utilities, portal } = this;
      const { clickCallbacks } = utilities;

      const paths = e.composedPath() as HTMLElement[];

      clickCallbacks.forEach(({ cb, element }) => {
        if (!element?.isConnected) {
          cb();
          return;
        }

        if (paths.includes(element)) {
          return;
        }

        const portalState = portal.getState(element);
        if (portalState) {
          const { parent } = portalState;

          if (!paths.includes(parent)) {
            cb();
          }
        } else {
          cb();
        }
      });
    });
  };

  //#region addClickCallback
  /**
   * Add a callback to handle clicks outside specified elements.
   * @param cb - The callback to execute when the click occurs.
   * @param async - Whether to defer execution of the callback.
   */
  addClickCallback = (cb: KulManagerClickCb, async?: boolean) => {
    const { utilities } = this;
    const { clickCallbacks } = utilities;

    if (async) {
      requestAnimationFrame(async () => clickCallbacks.add(cb));
    } else {
      clickCallbacks.add(cb);
    }
  };
  //#endregion

  //#region assignRef
  /**
   * Assigns an element to the related refs' key.
   * @param {Record<string, any>} refs - The refs object.
   * @param {string} key - The key to assign.
   */
  assignRef = (refs: Record<string, any>, key: string) => (el: any) => {
    if (el) refs[key] = el;
  };
  //#endregion

  //#region getProps
  /**
   * Retrieves component's prop values based on a list and option to include descriptions.
   * @param {KulComponent} comp - The component requesting prop values.
   * @returns {KulComponentPropsFor<C>} - An object with prop as keys and their related values.
   */
  getProps = <C extends KulComponentName>(
    comp: KulComponent<C>,
  ): KulComponentPropsFor<C> => {
    const props: Partial<KulComponentPropsFor<C>> = {};

    for (const key in comp) {
      if (
        Object.prototype.hasOwnProperty.call(comp, key) &&
        key.startsWith("kul")
      ) {
        const k = key as keyof KulComponent<C> & `kul${string}`;
        props[k] = comp[k];
      }
    }

    return props as KulComponentPropsFor<C>;
  };
  //#endregion

  //#region removeClickCallback
  /**
   * Removes a previously added click-callback from the stack.
   * @param cb - The callback to remove.
   */
  removeClickCallback = (cb: KulManagerClickCb) => {
    this.utilities.clickCallbacks.delete(cb);
  };
  /**
   * Removes suspicious props from an object.
   * @param  props - The object to sanitize.
   * @param  compName - The component name to use for specific sanitization.
   * @returns The sanitized object.
   */
  //#endregion

  //#region sanitizeProps
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
      "htmlProps",
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
  //#endregion
}
