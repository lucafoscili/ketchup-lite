export interface KulManagerUtilities {
  clickCallbacks?: Set<KulManagerClickCb>;
}
export interface KulManagerClickCb {
  cb: () => unknown;
  el?: HTMLElement;
}
export type KulManagerGetAssetPath = (value: string) => string;
export type KulManagerSetAssetPath = (value: string) => void;
