import type { KulDom } from "../kul-manager/kul-manager-declarations";
import { KulComponent, KulComponentName } from "../../types/GenericTypes";
import {
  KulLanguageDecode,
  KulLanguageDefaults,
  KulLanguageElement,
  KulLanguageJSON,
  KulLanguageKey,
  KulLanguageKeys,
} from "./kul-language-declarations";
import { languagesJson } from "./kul-language-values";

export class KulLanguage {
  dom: KulDom = document.documentElement as KulDom;
  list: KulLanguageJSON;
  managedComponents: Set<KulComponent<KulComponentName>["rootElement"]>;
  name: string;
  constructor(list?: KulLanguageJSON, name?: string) {
    this.list = list ? list : languagesJson;
    this.managedComponents = new Set();
    this.name = name ? name : KulLanguageDefaults.en;
  }
  translate(key: KulLanguageKey, language?: string): string {
    const decodedLanguage: KulLanguageDecode = this.decodeLanguage(
      language ? language : this.name,
    );
    const name: string = decodedLanguage.language;
    const variantName: string = decodedLanguage.variant;
    try {
      let translatedString: string = null;
      if (variantName) {
        const variants: { [key: string]: KulLanguageKeys } =
          this.list[name].variants;
        if (
          variants &&
          variants[variantName] &&
          variants[variantName].keys[key]
        ) {
          translatedString = variants[variantName].keys[key];
        } else {
          translatedString = this.list[name].keys[key] as string;
        }
      } else {
        translatedString = this.list[name].keys[key] as string;
      }
      if (translatedString) {
        return translatedString;
      } else {
        return invalidKey(key);
      }
    } catch (error) {
      return invalidKey(key);
    }
    function invalidKey(key: KulLanguageKey) {
      this.dom.ketchupLite.debug.logs.new(
        this,
        "Invalid translation for key (" + key + ")!",
        "warning",
      );
      return key;
    }
  }
  set(language: string): void {
    if (language && typeof language === "string") {
      language = language.toLowerCase();
    } else {
      this.dom.ketchupLite.debug.logs.new(
        this,
        "Couldn't set language, invalid string received (" + language + ")!",
        "warning",
      );
      return;
    }
    const decodedLanguage: KulLanguageDecode = this.decodeLanguage(language);
    const dLanguage: string = decodedLanguage.language;
    const dVariant: string = decodedLanguage.variant;
    if (this.list[dLanguage]) {
      if (dVariant && !this.list[dLanguage].variants[dVariant]) {
        this.dom.ketchupLite.debug.logs.new(
          this,
          "Variant not found (" + dVariant + ")!",
          "warning",
        );
        return;
      }
    } else {
      this.dom.ketchupLite.debug.logs.new(
        this,
        "Language not found (" + dLanguage + ")!",
        "warning",
      );
      return;
    }
    this.name = language;
    this.managedComponents.forEach(function (comp) {
      if (comp.isConnected) {
        comp.refresh();
      }
    });
    document.dispatchEvent(new CustomEvent("kul-language-change"));
  }
  decodeLanguage(language: string): KulLanguageDecode {
    const result: KulLanguageDecode = {
      language: null,
      variant: null,
    };
    const separator: number = language.indexOf("_");
    if (separator > -1) {
      result.variant = language.substring(separator + 1);
      result.language = language.substring(0, separator);
    } else {
      result.language = language;
    }
    return result;
  }
  getBCP47(language: string = this.name?.split("_")[0]): string {
    const bcp47Map: Record<KulLanguageDefaults, string> = {
      chinese: "zh-CN",
      english: "en-US",
      spanish: "es-ES",
      italian: "it-IT",
      french: "fr-FR",
      polish: "pl-PL",
      russian: "ru-RU",
    };
    return bcp47Map[language];
  }
  getLanguages(): Array<string> {
    const languages: Array<string> = [];
    for (var key in this.list) {
      if (this.list.hasOwnProperty(key)) {
        const language: KulLanguageElement = this.list[key];
        languages.push(key);
        for (const variantKey in language.variants) {
          languages.push(key + "_" + variantKey);
        }
      }
    }
    return languages;
  }
  register(component: any): void {
    this.managedComponents.add(
      component.rootElement ? component.rootElement : component,
    );
  }
  unregister(component: any): void {
    if (this.managedComponents) {
      this.managedComponents.delete(
        component.rootElement ? component.rootElement : component,
      );
    }
  }
}
