import { VNode } from "@stencil/core";
import { KulManager } from "src/managers/kul-manager/kul-manager";
import { KulEventPayload } from "../../types/GenericTypes";
import { KulImagePropsInterface } from "../kul-image/kul-image-declarations";
import { KulCanvas } from "./kul-canvas";

//#region Adapter
export interface KulCanvasAdapter {
  actions: KulCanvasAdapterActions;
  components: KulCanvasAdapterComponents;
  get: KulCanvasAdapterGetters;
  set: KulCanvasAdapterSetters;
}
export interface KulCanvasAdapterActions {
  board: KulCanvasAdapterActionsBoard;
  preview: KulCanvasAdapterActionsPreview;
  endCapture: (e: PointerEvent) => void;
}
export interface KulCanvasAdapterActionsBoard {
  clear: () => void;
  setup: (isFill?: boolean) => void;
}
export interface KulCanvasAdapterActionsPreview {
  clear: () => void;
  redraw: () => void;
  setup: (isFill?: boolean) => void;
}
export interface KulCanvasAdapterComponents {
  jsx: KulCanvasAdapterComponentsJsx;
  refs: KulCanvasAdapterComponentsRefs;
}
export interface KulCanvasAdapterComponentsJsx {
  board: VNode;
  image: VNode;
  preview: VNode;
}
export interface KulCanvasAdapterComponentsRefs {
  board: HTMLCanvasElement;
  image: HTMLKulImageElement;
  preview: HTMLCanvasElement;
}
export interface KulCanvasAdapterGetters {
  canvas: KulCanvas;
  isCursorPreview: () => boolean;
  manager: KulManager;
  state: {
    isPainting: () => boolean;
    points: () => KulCanvasPoints;
  };
}
export interface KulCanvasAdapterSetters {
  state: {
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
