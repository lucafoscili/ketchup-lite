import { getAssetPath, setAssetPath } from "@stencil/core";
import { KulLanguageDefaults } from "./managers/kul-language/kul-language-declarations";
import { KulManager } from "./managers/kul-manager/kul-manager";

const KulManagerSymbol = Symbol("KulManager");

const kulManagerSingleton: KulManager = (() => {
  const globalScope = globalThis as any;

  if (!globalScope[KulManagerSymbol]) {
    const kulManager = new KulManager(getAssetPath, setAssetPath);
    globalScope[KulManagerSymbol] = kulManager;

    document.dispatchEvent(new CustomEvent("kul-manager-ready"));

    if (process.env.NODE_ENV === "development") {
      globalScope.kulManager = kulManager;
      console.debug(
        "KulManager instance created. Waiting for initialization...",
      );
    }
  }

  return globalScope[KulManagerSymbol];
})();

function onKulManagerReady() {
  const { dates, language, theme } = kulManagerSingleton;
  const { locale } = dates;
  const defaultLanguage = KulLanguageDefaults[locale] ?? KulLanguageDefaults.en;

  language.set(defaultLanguage);
  theme.set();

  if (process.env.NODE_ENV === "development") {
    console.debug("KulManager fully initialized with language and theme.");
  }

  document.removeEventListener("kul-manager-ready", onKulManagerReady);
}

document.addEventListener("kul-manager-ready", onKulManagerReady);

export { kulManagerSingleton };
export * from "./components";
