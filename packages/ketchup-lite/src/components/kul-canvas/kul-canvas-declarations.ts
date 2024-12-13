import { VNode } from "@stencil/core";

import { KulCanvas } from "src/components/kul-canvas/kul-canvas";
import { KulImagePropsInterface } from "src/components/kul-image/kul-image-declarations";
import {
  KulComponentAdapter,
  KulComponentAdapterHandlers,
  KulComponentAdapterJsx,
  KulComponentAdapterRef,
  KulComponentAdapterStateGetters,
  KulComponentAdapterStateSetters,
  KulEventPayload,
} from "src/types/GenericTypes";

//#region Adapter
export interface KulCanvasAdapter extends KulComponentAdapter<KulCanvas> {
  elements: {
    jsx: KulCanvasAdapterElementsJsx;
    refs: KulCanvasAdapterElementsRefs;
  };
  handlers: KulCanvasAdapterHandlers;
  state: {
    get: KulCanvasAdapterStateGetters;
    set: KulCanvasAdapterStateSetters;
  };
}
export interface KulCanvasAdapterElementsJsx extends KulComponentAdapterJsx {
  board: () => VNode;
  image: () => VNode;
  preview: () => VNode;
}
export interface KulCanvasAdapterElementsRefs extends KulComponentAdapterRef {
  board: HTMLCanvasElement;
  image: HTMLKulImageElement;
  preview: HTMLCanvasElement;
}
export interface KulCanvasAdapterHandlers extends KulComponentAdapterHandlers {
  endCapture: (e: PointerEvent) => void;
  onPointerDown: (e: PointerEvent) => void;
  onPointerMove: (e: PointerEvent) => void;
  onPointerOut: (e: PointerEvent) => void;
  onPointerUp: (e: PointerEvent) => void;
}
export interface KulCanvasAdapterStateGetters
  extends KulComponentAdapterStateGetters<KulCanvas> {
  compInstance: KulCanvas;
  isCursorPreview: () => boolean;
  isPainting: () => boolean;
  points: () => KulCanvasPoints;
}
export interface KulCanvasAdapterStateSetters
  extends KulComponentAdapterStateSetters {
  isPainting: (value: boolean) => void;
  points: (value: KulCanvasPoints) => void;
}

//#endregion

//#region Events
export type KulCanvasEvent = "stroke" | "ready" | "unmount";
export interface KulCanvasEventPayload
  extends KulEventPayload<"KulCanvas", KulCanvasEvent> {
  points: Array<{ x: number; y: number }>;
}
//#endregion

//#region States
export type KulCanvasPoints = Array<{ x: number; y: number }>;
//#endregion

//#region Props
export interface KulCanvasPropsInterface {
  kulBrush?: KulCanvasBrush;
  kulColor?: string;
  kulCursor?: KulCanvasCursor;
  kulImageProps?: KulImagePropsInterface;
  kulOpacity?: number;
  kulPreview?: boolean;
  kulSize?: number;
  kulStrokeTolerance?: number;
  kulStyle?: string;
}
export type KulCanvasBrush = "round" | "square";
export type KulCanvasCursor = "preview" | "default";
export type KulCanvasType = "board" | "preview";
//#endregion
