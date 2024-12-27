import { KulManagerSymbol } from "./symbol";
import type { KulManager } from "../managers/kul-manager/kul-manager";

declare global {
  interface globalThis {
    [KulManagerSymbol]?: KulManager;
  }
}
