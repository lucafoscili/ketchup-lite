import { VNode } from "@stencil/core";
import { KulManager } from "src/managers/kul-manager/kul-manager";
import { KulComponentAdapter, KulEventPayload } from "../../types/GenericTypes";
import { KulImagePropsInterface } from "../kul-image/kul-image-declarations";
import { KulCanvas } from "./kul-canvas";

//#region Adapter
export interface KulCanvasAdapter extends KulComponentAdapter<KulCanvas> {
  components: KulCanvasAdapterComponents;
  handlers: KulCanvasAdapterHandlers;
  hooks: KulCanvasAdapterHooks;
}
export interface KulCanvasAdapterComponents {
  jsx: {
    board: VNode;
    image: VNode;
    preview: VNode;
  };
  refs: {
    board: HTMLCanvasElement;
    image: HTMLKulImageElement;
    preview: HTMLCanvasElement;
  };
}
export interface KulCanvasAdapterHandlers {
  board: {
    clear: () => void;
    onPointerDown: (e: PointerEvent) => void;
    onPointerMove: (e: PointerEvent) => void;
    onPointerOut: (e: PointerEvent) => void;
    onPointerUp: (e: PointerEvent) => void;
    setup: (isFill?: boolean) => void;
  };
  endCapture: (e: PointerEvent) => void;
  preview: {
    clear: () => void;
    redraw: () => void;
    setup: (isFill?: boolean) => void;
  };
}
export interface KulCanvasAdapterHooks {
  get: {
    comp: KulCanvas;
    isCursorPreview: () => boolean;
    isPainting: () => boolean;
    manager: KulManager;
    points: () => KulCanvasPoints;
  };
  set: {
    isPainting: (value: boolean) => void;
    points: (value: KulCanvasPoints) => void;
  };
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
export enum KulCanvasProps {
  kulBrush = "The shape of the brush.",
  kulColor = "The color of the brush.",
  kulCursor = " Sets the style of the cursor.",
  kulImageProps = "The props of the image displayed inside the badge.",
  kulOpacity = "The opacity of the brush.",
  kulPreview = "Displays the brush track of the current stroke.",
  kulSize = "The size of the brush.",
  kulStrokeTolerance = "Simplifies the coordinates array by applying the Ramer-Douglas-Peucker algorithm. This prop sets the tolerance of the algorithm (null to disable)",
  kulStyle = "Custom style of the component.",
}
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
//#endregion
