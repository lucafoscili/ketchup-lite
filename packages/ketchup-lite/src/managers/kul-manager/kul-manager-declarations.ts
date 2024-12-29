import type { KulManager } from "./kul-manager";

export interface KulManagerUtilities {
  clickCallbacks?: Set<KulManagerClickCb>;
}
export interface KulManagerClickCb {
  cb: () => unknown;
  element?: HTMLElement;
}
export type KulManagerGetAssetPath = (value: string) => string;
export type KulManagerSetAssetPath = (value: string) => void;
export type KulManagerComputedGetAssetPath = (value: string) => {
  path: string;
  style: { mask: string; webkitMask: string };
};
export type KulManagerEvent = CustomEvent<KulManagerEventPayload>;
export interface KulManagerEventPayload {
  kulManager: KulManager;
}
