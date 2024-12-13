import { getAssetPath, setAssetPath } from "@stencil/core";
import { KulLanguageDefaults } from "./managers/kul-language/kul-language-declarations";
import { KulManager } from "./managers/kul-manager/kul-manager";

const KulManagerSymbol = Symbol("KulManager");

const kulManagerSingleton: KulManager = (() => {
  const globalScope = globalThis;

  if (!globalScope[KulManagerSymbol]) {
    const kulManager = new KulManager(getAssetPath, setAssetPath);
    const { dates, language, theme } = kulManager;
    const { locale } = dates;

    const defaultLanguage =
      KulLanguageDefaults[locale] ?? KulLanguageDefaults.en;
    language.set(defaultLanguage);

    theme.set();

    globalScope[KulManagerSymbol] = kulManager;

    document.dispatchEvent(new CustomEvent("kul-manager-ready"));
    if (process.env.NODE_ENV === "development") {
      globalScope.kulManager = kulManager;
      console.debug("KulManager initialized and ready.");
    }
  }

  return globalScope[KulManagerSymbol];
})();

/**
 * Singleton instance of the KulManager. Automatically initialized and ready to use.
 */
export { kulManagerSingleton };

export * from "./components";
