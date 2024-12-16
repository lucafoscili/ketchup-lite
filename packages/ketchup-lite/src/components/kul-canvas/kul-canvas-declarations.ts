import { VNode } from "@stencil/core";
import { KulImagePropsInterface } from "src/components/kul-image/kul-image-declarations";
import {
  KulComponentAdapter,
  KulComponentAdapterControllerGetters,
  KulComponentAdapterControllerSetters,
  KulComponentAdapterHandlers,
  KulComponentAdapterJsx,
  KulComponentAdapterRefs,
  KulEventPayload,
} from "src/types/GenericTypes";
import { KulCanvas } from "./kul-canvas";

//#region Adapter
export interface KulCanvasAdapter extends KulComponentAdapter<KulCanvas> {
  controller: {
    get: KulCanvasAdapterControllerGetters;
    set: KulCanvasAdapterControllerSetters;
  };
  elements: {
    jsx: KulCanvasAdapterElementsJsx;
    refs: KulCanvasAdapterElementsRefs;
  };
  handlers: KulCanvasAdapterHandlers;
  toolkit: KulCanvasAdapterToolkit;
}
export type KulCanvasAdapterInitializerGetters = Pick<
  KulCanvasAdapterControllerGetters,
  "compInstance" | "isCursorPreview" | "isPainting" | "points"
>;
export type KulCanvasAdapterInitializerSetters = Pick<
  KulCanvasAdapterControllerSetters,
  "isPainting" | "points"
>;
export interface KulCanvasAdapterElementsJsx extends KulComponentAdapterJsx {
  board: () => VNode;
  image: () => VNode;
  preview: () => VNode;
}
export interface KulCanvasAdapterElementsRefs extends KulComponentAdapterRefs {
  board: HTMLCanvasElement;
  image: HTMLKulImageElement;
  preview: HTMLCanvasElement;
}
export interface KulCanvasAdapterHandlers extends KulComponentAdapterHandlers {
  board: {
    endCapture: (e: PointerEvent) => void;
    onPointerDown: (e: PointerEvent) => void;
    onPointerMove: (e: PointerEvent) => void;
    onPointerOut: (e: PointerEvent) => void;
    onPointerUp: (e: PointerEvent) => void;
  };
}
export interface KulCanvasAdapterControllerGetters
  extends KulComponentAdapterControllerGetters<KulCanvas> {
  compInstance: KulCanvas;
  isCursorPreview: () => boolean;
  isPainting: () => boolean;
  points: () => KulCanvasPoints;
}
export interface KulCanvasAdapterControllerSetters
  extends KulComponentAdapterControllerSetters {
  isPainting: (value: boolean) => void;
  points: (value: KulCanvasPoints) => void;
}
export interface KulCanvasAdapterToolkitCtx {
  clear(type: KulCanvasType): void;
  get(type: KulCanvasType): {
    ctx: CanvasRenderingContext2D;
    height: number;
    width: number;
  };
  redraw(type: KulCanvasType): void;
  setup(type: KulCanvasType, isFill?: boolean): void;
}
export interface KulCanvasAdapterToolkitCoordinates {
  get: (
    e: PointerEvent,
    rect: DOMRect,
  ) => {
    x: number;
    y: number;
  };
  normalize: (
    e: PointerEvent,
    rect: DOMRect,
  ) => {
    x: number;
    y: number;
  };
  simplify: (points: KulCanvasPoints, tolerance: number) => KulCanvasPoints;
}
export interface KulCanvasAdapterToolkitDraw {
  cursor: (e: PointerEvent) => void;
  shape: (type: KulCanvasType, x: number, y: number, isFill?: boolean) => void;
  point: (e: PointerEvent) => void;
}
export interface KulCanvasAdapterToolkit {
  ctx: KulCanvasAdapterToolkitCtx;
  coordinates: KulCanvasAdapterToolkitCoordinates;
  draw: KulCanvasAdapterToolkitDraw;
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
