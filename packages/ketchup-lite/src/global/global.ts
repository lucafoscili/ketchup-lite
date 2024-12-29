import { KulManager } from "src/managers/kul-manager/kul-manager";
import { KulManagerEventPayload } from "src/managers/kul-manager/kul-manager-declarations";
import { KulManagerSymbol } from "./symbol";

export let kulManager: KulManager | null = null;

let isInitialized = false;

let resolveManager: (mgr: KulManager) => void;
export const kulManagerReady = new Promise<KulManager>((resolve) => {
  resolveManager = resolve;
});

async function initKulManager() {
  if (isInitialized) return;
  isInitialized = true;

  if (typeof document !== "undefined") {
    const manager = new KulManager();
    kulManager = manager;

    (window as any)[KulManagerSymbol] = manager;

    try {
      if (process.env.NODE_ENV === "development") {
        console.debug(
          "KulManager instance created and defaults set. Dispatching readiness event...",
        );
      }

      const ev = new CustomEvent<KulManagerEventPayload>("kul-manager-ready", {
        detail: { kulManager: manager },
      });

      requestAnimationFrame(() => {
        document.dispatchEvent(ev);
        resolveManager(manager);
      });
    } catch (error) {
      console.error("Error initializing KulManager defaults:", error);
    }
  }
}

export default async function () {
  await initKulManager();
}
