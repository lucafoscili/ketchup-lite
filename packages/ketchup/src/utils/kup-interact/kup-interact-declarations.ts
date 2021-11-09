import type { DropEvent, InteractEvent } from '@interactjs/types/index';
import type { ResizeEvent } from '@interactjs/actions/resize/plugin';
import { KupBoxRow } from '../../components/kup-box/kup-box-declarations';
import {
    Cell,
    Column,
    Row,
} from '../../components/kup-data-table/kup-data-table-declarations';
/**
 * HTML Attribute attached to dialogs.
 * Referenced by kup-theme.css
 */
export const kupDialogAttribute = 'kup-dialog';
/**
 * CSS class attached to resizable dialogs.
 * Referenced by kup-theme.css
 */
export const kupDialogResizableClass = 'kup-resizable';
/**
 * Drag & drop variables.
 */
export const kupDropEvent: string = 'kup-drop';
export const kupDragActiveAttr: string = 'kup-drag-active';
export const kupDraggableAttr: string = 'kup-draggable';
export const kupDragOverAttr: string = 'kup-drag-over';
/**
 * Interface for drag & drop elements.
 */
export interface KupDraggableElement extends HTMLElement {
    kupDragDrop: KupDraggablePayload;
}
/**
 * Drag and drop data transfer.
 */
export interface KupDraggablePayload extends KupDropEventSource {
    ghostImage?: HTMLElement;
}
/**
 * Available effects fro dragging.
 */
export enum KupDragEffect {
    BADGE = 'badge',
    CLONE = 'clone',
    MOVE = 'move',
    NONE = 'none',
}
/**
 * Additional callbacks to be made when the related drag event fires.
 */
export interface KupDragCallbacks {
    end?: (e?: InteractEvent) => void;
    move?: (e?: InteractEvent) => void;
    start?: (e?: InteractEvent) => void;
}
/**
 * Additional callbacks to be made when the related drop event fires.
 */
export interface KupDropCallbacks {
    drop?: (e?: DropEvent) => void;
    enter?: (e?: DropEvent) => void;
    leave?: (e?: DropEvent) => void;
}
/**
 * Additional callbacks to be made when the related resize event fires.
 */
export interface KupResizeCallbacks {
    move?: (e?: ResizeEvent) => void;
}
/**
 * Defines the additional data of the drag event.
 */
export type KupDragDataTransferCallback = (
    e?: InteractEvent
) => KupDropEventSource;
export interface KupDragEventData {
    callback?: KupDragDataTransferCallback;
}
/**
 * Defines the additional data of the drop event.
 */
export type KupDropDataTransferCallback = (e?: DropEvent) => KupDropEventTarget;
export interface KupDropEventData {
    callback?: KupDropDataTransferCallback;
    dispatcher: HTMLElement;
    type: KupDropEventTypes;
}
/**
 * Supported types of drop event.
 */
export enum KupDropEventTypes {
    BOX = 'text/kup-box-drag',
    DATATABLE = 'text/kup-data-table-row-drag',
    MAGICBOX = 'text/kup-magic-box-drag',
}
/**
 * Drop event payload.
 */
export interface KupDropEventPayload {
    dataType: KupDropEventTypes;
    sourceElement: KupDropEventSource;
    targetElement: KupDropEventTarget;
}
/**
 * Source of the drop event payload.
 */
export interface KupDropEventSource {
    cell?: Cell;
    column?: Column;
    id?: string;
    multiple?: boolean;
    row?: Row | KupBoxRow;
    selectedRows?: Row[] | KupBoxRow[];
}
/**
 * Target of the drop event payload.
 */
export interface KupDropEventTarget {
    id?: string;
    row?: Row | KupBoxRow;
    cell?: Cell;
    column?: Column;
}
