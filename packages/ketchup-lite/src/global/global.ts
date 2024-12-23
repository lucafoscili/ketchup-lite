import { KulManagerEventPayload } from "src/managers/kul-manager/kul-manager-declarations";
import { KulManager } from "../managers/kul-manager/kul-manager";

let kulManagerSingleton: KulManager;
let isInitialized = false;

const initKulManager = () => {
  if (isInitialized) return;
  isInitialized = true;

  kulManagerSingleton = new KulManager();

  if (typeof document !== "undefined") {
    try {
      const { theme } = kulManagerSingleton;
      requestAnimationFrame(async () => theme.set());

      if (process.env.NODE_ENV === "development") {
        console.debug(
          "KulManager instance created and defaults set. Dispatching readiness event...",
        );
      }
      const ev = new CustomEvent<KulManagerEventPayload>("kul-manager-ready", {
        detail: { kulManager: kulManagerSingleton },
      });
      document.dispatchEvent(ev);
    } catch (error) {
      console.error("Error initializing KulManager defaults:", error);
    }
  }
};

export default function () {
  initKulManager();
}

export { kulManagerSingleton };
