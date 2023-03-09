import { GanttRowType, GanttTask } from '@sme.up/gantt-component';
import { Phase } from '@sme.up/gantt-component';
import { GanttRow } from '@sme.up/gantt-component';
import exp from 'constants';
import { KupEventPayload } from '../../components';

/**
 * Props of the kup-gantt component.
 * Used to export every prop in an object.
 */
export enum KupPlannerProps {
    customStyle = 'Custom style of the component.',
}

export enum KupPlannerTaskAction {
    onOpening = 'onOpening',
    onClosing = 'onClosing',
}

export interface KupPlannerEventPayload extends KupEventPayload {
    value: GanttRow;
    taskAction?: KupPlannerTaskAction;
}

export interface KupPlannerGanttTask extends GanttTask {
    taskRowId: string;
}

export interface KupPlannerPhase extends Phase {
    taskRowId: string;
    phaseRowId: string;
}
