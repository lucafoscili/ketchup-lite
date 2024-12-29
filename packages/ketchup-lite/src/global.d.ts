import { KulManagerSymbol } from "./global/symbol";
import type { KulManager } from "./managers/kul-manager/kul-manager";

declare global {
  interface globalThis {
    [KulManagerSymbol]?: KulManager;
  }
}
