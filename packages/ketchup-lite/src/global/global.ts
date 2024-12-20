import { getAssetPath, setAssetPath } from "@stencil/core";
import { KulManager } from "../managers/kul-manager/kul-manager";

const KulManagerSymbol = Symbol("KulManager");
const globalScope = globalThis as any;

if (!globalScope[KulManagerSymbol]) {
  globalScope[KulManagerSymbol] = new KulManager(getAssetPath, setAssetPath);
}

const kulManagerSingleton: KulManager = globalScope[KulManagerSymbol];
export { kulManagerSingleton };

if (typeof document !== "undefined") {
  try {
    const { theme } = kulManagerSingleton;
    theme.set();

    if (process.env.NODE_ENV === "development") {
      console.debug(
        "KulManager instance created and defaults set. Dispatching readiness event...",
      );
    }

    document.dispatchEvent(
      new CustomEvent("kul-manager-ready", {
        detail: { kulManager: kulManagerSingleton },
      }),
    );
  } catch (error) {
    console.error("Error initializing KulManager defaults:", error);
  }
}
