import { KulEventPayload } from '../../types/GenericTypes';
import { KulImagePropsInterface } from '../kul-image/kul-image-declarations';

//#region Events
export type KulCanvasEvent = 'stroke' | 'ready' | 'unmount';
export interface KulCanvasEventPayload
  extends KulEventPayload<'KulCanvas', KulCanvasEvent> {
  points: Array<{ x: number; y: number }>;
}
//#endregion
//#region States
export type KulCanvasPoints = Array<{ x: number; y: number }>;
//#endregion
//#region Props
export enum KulCanvasProps {
  kulBrush = 'The shape of the brush.',
  kulColor = 'The color of the brush.',
  kulImageProps = 'The props of the image displayed inside the badge.',
  kulOpacity = 'The opacity of the brush.',
  kulPreview = 'Displays the brush track of the current stroke.',
  kulSize = 'The size of the brush.',
  kulStrokeTolerance = 'Simplifies the coordinates array by applying the Ramer-Douglas-Peucker algorithm. This prop sets the tolerance of the algorithm (null to disable)',
  kulStyle = 'Custom style of the component.',
}
export interface KulCanvasPropsInterface {
  kulBrush?: KulCanvasBrush;
  kulColor?: string;
  kulImageProps?: KulImagePropsInterface;
  kulOpacity?: number;
  kulPreview?: boolean;
  kulSize?: number;
  kulStrokeTolerance?: number;
  kulStyle?: string;
}
export type KulCanvasBrush = 'round' | 'square';
//#endregion
