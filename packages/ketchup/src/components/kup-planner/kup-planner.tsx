import {
    Component,
    Element,
    Event,
    EventEmitter,
    forceUpdate,
    getAssetPath,
    h,
    Host,
    Method,
    Prop,
    State,
} from '@stencil/core';
import {
    KupManager,
    kupManagerInstance,
} from '../../managers/kup-manager/kup-manager';
import { GenericObject, KupComponent } from '../../types/GenericTypes';
import {
    defaultStylingOptions,
    KupPlannerEventPayload,
    KupPlannerGanttTask,
    KupPlannerLastOnChangeReceived,
    KupPlannerPhase,
    KupPlannerProps,
    KupPlannerTaskAction,
    KupPlannerGanttRowType,
    KupPlannerDetail,
} from './kup-planner-declarations';
import { getProps, setProps } from '../../utils/utils';
import { componentWrapperId } from '../../variables/GenericVariables';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { KupDataDataset } from '../../managers/kup-data/kup-data-declarations';
import {
    Detail,
    GanttRow,
    GanttTask,
    Planner,
    PlannerProps,
} from '@sme.up/gantt-component';
import { getCellValueForDisplay } from '../../utils/cell-utils';
import {
    getValuesToShow,
    isAtLeastOneDateValid,
    sanitizeAllDates,
} from './kup-planner-helper';
import { TaskType } from '@sme.up/gantt-component/dist/types/public-types';
import { FTextField } from '../../f-components/f-text-field/f-text-field';
import { FTextFieldMDC } from '../../f-components/f-text-field/f-text-field-mdc';
import { KupThemeIconValues } from '../../managers/kup-theme/kup-theme-declarations';
import { KupLanguageSearch } from '../../managers/kup-language/kup-language-declarations';

@Component({
    tag: 'kup-planner',
    styleUrl: 'kup-planner.scss',
    shadow: true,
})
export class KupPlanner {
    /**
     * References the root HTML element of the component (<kup-planner>).
     */
    @Element() rootElement: HTMLElement;

    /*-------------------------------------------------*/
    /*                   S t a t e s                   */
    /*-------------------------------------------------*/

    /**
     * The value of the component.
     * @default ""
     */

    @State()
    plannerProps: PlannerProps;

    /*-------------------------------------------------*/
    /*                    P r o p s                    */
    /*-------------------------------------------------*/

    /**
     * Custom style of the component.
     * @default ""
     * @see https://ketchup.smeup.com/ketchup-showcase/#/customization
     */
    @Prop()
    customStyle: string = '';

    /**
     * Dataset containg the tasks list
     * @default null
     */
    @Prop()
    data: KupDataDataset;

    /**
     * Dataset containg the details list
     * @default null
     */
    @Prop()
    detailData: KupDataDataset;

    /**
     * Column containing the detail color, in hex format
     * @default null
     */
    @Prop()
    detailColorCol: string;

    /**
     * Columns containing informations displayed in the left box, near the gantt of details
     * @default null
     */
    @Prop()
    detailColumns: string[];

    /**
     * Columns containing detail duration, from (firstDate) to (secondDate)
     * @default null
     */
    @Prop()
    detailDates: string[];

    /**
     * Height for detail gantt
     * @default null
     */
    @Prop()
    detailHeight: number;

    /**
     * Column containing icon name to show, for detail
     * @default null
     */
    @Prop()
    detailIconCol: string;

    /**
     * Column containing unique detail identifier
     * @default null
     */
    @Prop()
    detailIdCol: string;

    /**
     * Column containing detail name displayed
     * @default null
     */
    @Prop()
    detailNameCol: string;

    /**
     * Columns containing forecast detail duration, from (firstDate) to (secondDate)
     * @default null
     */
    @Prop()
    detailPrevDates: string[];

    /**
     * Total size of the cells inside to the left box, near the gantt
     * @default '300px'
     */
    @Prop()
    listCellWidth: string = '300px';

    /**
     * Max width for component
     * @default '90vw'
     */
    @Prop()
    maxWidth: string = '90vw';

    /**
     * Column containing the phase color in hex format
     * @default null
     */
    @Prop()
    phaseColorCol: string;

    /**
     * Columns containing informations displayed in the left box ,near the gantt of phases
     * @default null
     */
    @Prop()
    phaseColumns: string[];

    /**
     * Column containing the name of the parent phases
     * @default null
     */
    @Prop()
    phaseColParDep: string;

    /**
     * Columns containing phase duration, from (firstDate) to (secondDate)
     * @default null
     */
    @Prop()
    phaseDates: string[];

    /**
     * Column containing icon name to show, for phase
     * @default null
     */
    @Prop()
    phaseIconCol: string;

    /**
     * Column containing unique phase identifier
     * @default null
     */
    @Prop()
    phaseIdCol: string;

    /**
     * Column containing phase name displayed
     * @default null
     */
    @Prop()
    phaseNameCol: string;

    /**
     * Columns containing forecast phase duration, from (firstDate) to (secondDate)
     * @default null
     */
    @Prop()
    phasePrevDates: string[];

    /**
     * Enable/disable display of secondary dates
     * @default false
     */
    @Prop()
    showSecondaryDates: boolean = false;

    /**
     * Columns containing informations displayed in the left box, near the gantt
     * @default null
     */
    @Prop()
    taskColumns: string[];

    /**
     * Columns containing task duration, from (firstDate) to (secondDate)
     * @default null
     */
    @Prop()
    taskDates: string[];

    /**
     * Height for main gantt
     * @default null
     */
    @Prop()
    taskHeight: number;

    /**
     * Column containing icon name to show, for task
     * @default null
     */
    @Prop()
    taskIconCol: string;

    /**
     * Column containing unique task identifier
     * @default null
     */
    @Prop()
    taskIdCol: string;

    /**
     * Column containing task name displayed
     * @default null
     */
    @Prop()
    taskNameCol: string;

    /**
     * Columns containing forecast task duration, from (firstDate) to (secondDate)
     * @default null
     */
    @Prop()
    taskPrevDates: string[];

    /**
     * Message displayed on top
     * @default null
     */
    @Prop()
    titleMess: string;

    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/

    #kupManager: KupManager = kupManagerInstance();
    #rootPlanner;
    #lastOnChangeReceived: KupPlannerLastOnChangeReceived;

    #renderReactPlannerElement() {
        this.#rootPlanner?.unmount();

        const componentWrapperElement =
            this.rootElement.shadowRoot.getElementById(componentWrapperId);

        if (componentWrapperElement) {
            this.#rootPlanner = createRoot(componentWrapperElement);
            this.#rootPlanner.render(
                React.createElement(Planner, this.plannerProps)
            );
        }
    }

    #toTasks(data: KupDataDataset): GanttTask[] {
        let tasks: GanttTask[] = data.rows
            ?.filter((row) =>
                isAtLeastOneDateValid(
                    row.cells[this.taskDates[0]],
                    row.cells[this.taskDates[1]]
                )
            )
            .map((row) => {
                const datesSanitized = sanitizeAllDates(
                    row.cells[this.taskDates[0]],
                    row.cells[this.taskDates[1]],
                    row.cells[this.taskPrevDates[0]],
                    row.cells[this.taskPrevDates[1]]
                );
                const valuesToShow = getValuesToShow(
                    row,
                    this.taskIdCol,
                    this.taskNameCol,
                    data.columns,
                    this.taskColumns
                );
                let iconUrl = undefined;
                if (this.taskIconCol) {
                    const icon = row.cells[this.taskIconCol];
                    if (icon) {
                        iconUrl = getAssetPath(
                            './assets/svg/' + icon.value + '.svg'
                        );
                    }
                }
                let task: KupPlannerGanttTask = {
                    taskRow: row,
                    taskRowId: row.id,
                    id: row.cells[this.taskIdCol].value,
                    name: row.cells[this.taskNameCol].value,
                    startDate: datesSanitized.dateValues[0],
                    endDate: datesSanitized.dateValues[1],
                    secondaryStartDate: datesSanitized.secDateValues[0],
                    secondaryEndDate: datesSanitized.secDateValues[1],
                    type: 'project' as TaskType,
                    valuesToShow: valuesToShow,
                    rowType: KupPlannerGanttRowType.TASK,
                    iconUrl: iconUrl,
                };
                return task;
            });
        return tasks;
    }

    #toDetails(data: KupDataDataset): Detail[] {
        let details: KupPlannerDetail[] = [];
        if (!data || !data.rows) {
            return details;
        }
        data.rows
            .filter((row) =>
                isAtLeastOneDateValid(
                    row.cells[this.detailDates[0]],
                    row.cells[this.detailDates[1]]
                )
            )
            .forEach((row) => {
                const detailId = row.cells[this.detailIdCol].value;
                const detailNameId = row.cells[this.detailNameCol].value;

                const datesSanitized = sanitizeAllDates(
                    row.cells[this.detailDates[0]],
                    row.cells[this.detailDates[1]]
                );

                const valuesToShow = getValuesToShow(
                    row,
                    this.detailIdCol,
                    this.detailNameCol,
                    data.columns,
                    this.detailColumns
                );

                let detail: KupPlannerDetail = details.find(
                    (det) => det.id == detailId
                );
                if (!detail) {
                    detail = {
                        id: detailId,
                        name: detailNameId,
                        type: 'timeline',
                        valuesToShow: valuesToShow,
                        rowType: KupPlannerGanttRowType.DETAIL,
                        schedule: [],
                    };
                    details.push(detail);
                }
                let iconUrl = undefined;
                if (this.detailIconCol) {
                    const icon = row.cells[this.detailIconCol];
                    if (icon) {
                        iconUrl = getAssetPath(
                            './assets/svg/' + icon.value + '.svg'
                        );
                    }
                }
                detail.schedule.push({
                    startDate: datesSanitized.dateValues[0],
                    endDate: datesSanitized.dateValues[1],
                    color: this.detailColorCol
                        ? row.cells[this.detailColorCol].value ?? '#D9D9D8'
                        : '#D9D9D8',
                    selectedColor: this.detailColorCol
                        ? row.cells[this.detailColorCol].value ?? '#D9D9D8'
                        : '#D9D9D8',
                    iconUrl: iconUrl,
                });
            });

        return details;
    }

    #getTask(taskId: string): KupPlannerGanttTask {
        return (
            this.plannerProps.mainGantt.items as KupPlannerGanttTask[]
        ).find((task) => task.id == taskId);
    }

    #removePhases(taskId: string) {
        const task = this.#getTask(taskId);
        if (task) task.phases = undefined;
        // this.plannerProps.mainGantt = JSON.parse(
        //     JSON.stringify(this.plannerProps.mainGantt)
        // );
        this.plannerProps = { ...this.plannerProps };
    }

    /**
     * @param nativeEvent
     * @returns true if caller must call onKupClick
     */
    #handleOnClickOnTask(nativeEvent: GanttRow): boolean {
        const task = this.#getTask(nativeEvent.id);
        if (task?.phases) {
            this.#removePhases(task.id);
        }
        return true;
    }

    /**
     * @returns true if caller must call onKupClick
     */
    #handleOnClickOnPhase(): boolean {
        return true;
    }

    /**
     * @returns true if caller must call onKupClick
     */
    #handleOnClickOnDetail(): boolean {
        return true;
    }

    #emitOnChangeEventsReceived(nativeEvent: GanttRow): boolean {
        let emitEvent: boolean = false;
        if (!this.#lastOnChangeReceived) {
            emitEvent = true;
            this.#lastOnChangeReceived = new KupPlannerLastOnChangeReceived(
                nativeEvent
            );
        } else if (!this.#lastOnChangeReceived.isEquivalent(nativeEvent)) {
            this.#lastOnChangeReceived = new KupPlannerLastOnChangeReceived(
                nativeEvent
            );
            emitEvent = true;
        }
        return emitEvent;
    }

    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/

    @Event({
        eventName: 'kup-planner-click',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupClick: EventEmitter<KupPlannerEventPayload>;

    onKupClick(event: GanttRow, taskAction?: KupPlannerTaskAction) {
        this.kupClick.emit({
            comp: this,
            id: this.rootElement.id,
            value: event,
            taskAction: taskAction,
        });
    }

    @Event({
        eventName: 'kup-planner-datechange',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupDateChange: EventEmitter<KupPlannerEventPayload>;

    onKupDateChange(event: GanttRow, taskAction?: KupPlannerTaskAction) {
        this.kupDateChange.emit({
            comp: this,
            id: this.rootElement.id,
            value: event,
            taskAction: taskAction,
        });
    }

    @Event({
        eventName: 'kup-planner-ready',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupReady: EventEmitter<KupPlannerEventPayload>;

    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/

    /**
     * Used to retrieve component's props values.
     * @param {boolean} descriptions - When provided and true, the result will be the list of props with their description.
     * @returns {Promise<GenericObject>} List of props as object, each key will be a prop.
     */
    @Method()
    async getProps(descriptions?: boolean): Promise<GenericObject> {
        return getProps(this, KupPlannerProps, descriptions);
    }
    /**
     * This method is used to trigger a new render of the component.
     */
    @Method()
    async refresh(): Promise<void> {
        forceUpdate(this);
    }
    /**
     * Sets the props to the component.
     * @param {GenericObject} props - Object containing props that will be set to the component.
     */
    @Method()
    async setProps(props: GenericObject): Promise<void> {
        setProps(this, KupPlannerProps, props);
    }

    /**
     * Add a list of phases to the project
     * @param taskId
     * @param data - Matrix which contains project phases
     */
    @Method()
    async addPhases(taskId: string, data: KupDataDataset) {
        const task = this.#getTask(taskId);
        if (task) {
            task.phases = data.rows
                ?.filter((row) =>
                    isAtLeastOneDateValid(
                        row.cells[this.phaseDates[0]],
                        row.cells[this.phaseDates[1]]
                    )
                )
                .map((row) => {
                    const datesSanitized = sanitizeAllDates(
                        row.cells[this.phaseDates[0]],
                        row.cells[this.phaseDates[1]],
                        row.cells[this.phasePrevDates[0]],
                        row.cells[this.phasePrevDates[1]]
                    );
                    const valuesToShow = getValuesToShow(
                        row,
                        this.phaseIdCol,
                        this.phaseNameCol,
                        data.columns,
                        this.phaseColumns,
                        () =>
                            this.phaseColumns.map((col) =>
                                col == this.phaseDates[0]
                                    ? '#START#'
                                    : col == this.phaseDates[1]
                                    ? '#END#'
                                    : getCellValueForDisplay(
                                          data.columns.find(
                                              (kCol) => kCol.name == col
                                          ),
                                          row.cells[col]
                                      )
                            )
                    );
                    let iconUrl = undefined;
                    if (this.phaseIconCol) {
                        const icon = row.cells[this.phaseIconCol];
                        if (icon) {
                            iconUrl = getAssetPath(
                                './assets/svg/' + icon.value + '.svg'
                            );
                        }
                    }

                    let phase: KupPlannerPhase = {
                        taskRow: task.taskRow,
                        phaseRow: row,
                        id: task.id + '_' + row.cells[this.phaseIdCol].value,
                        phaseRowId: row.id,
                        taskRowId: task.taskRowId,
                        name: row.cells[this.phaseNameCol].value,
                        startDate: datesSanitized.dateValues[0],
                        endDate: datesSanitized.dateValues[1],
                        secondaryStartDate: datesSanitized.secDateValues[0],
                        secondaryEndDate: datesSanitized.secDateValues[1],
                        type: 'task' as TaskType,
                        color: row.cells[this.phaseColorCol].value,
                        selectedColor: row.cells[this.phaseColorCol].value,
                        valuesToShow: valuesToShow,
                        rowType: KupPlannerGanttRowType.PHASE,
                        iconUrl: iconUrl,
                    };
                    return phase;
                });
        }

        this.plannerProps = { ...this.plannerProps };
    }

    handleOnClick(
        nativeEvent: KupPlannerGanttTask | KupPlannerPhase | KupPlannerDetail
    ) {
        console.log('kup-planner.handleOnClick', nativeEvent);
        switch (nativeEvent.rowType) {
            case KupPlannerGanttRowType.TASK:
                const taskAction = (nativeEvent as KupPlannerGanttTask).phases
                    ? KupPlannerTaskAction.onTaskClosing
                    : KupPlannerTaskAction.onTaskOpening;
                if (this.#handleOnClickOnTask(nativeEvent)) {
                    this.onKupClick(nativeEvent, taskAction);
                }
                break;
            case KupPlannerGanttRowType.PHASE:
                if (this.#handleOnClickOnPhase()) {
                    this.onKupClick(nativeEvent, KupPlannerTaskAction.onClick);
                }
                break;
            case KupPlannerGanttRowType.DETAIL:
                if (this.#handleOnClickOnDetail()) {
                    this.onKupClick(nativeEvent, KupPlannerTaskAction.onClick);
                }
                break;
        }
    }

    handleOnDateChange(
        nativeEvent: KupPlannerGanttTask | KupPlannerPhase | KupPlannerDetail
    ) {
        if (this.#emitOnChangeEventsReceived(nativeEvent)) {
            if (nativeEvent.rowType != KupPlannerGanttRowType.DETAIL) {
                console.log('kup-planner.handleOnDateChange', nativeEvent);
                this.onKupDateChange(
                    nativeEvent,
                    KupPlannerTaskAction.onResize
                );
            }
        }
    }

    #onFilter(e: UIEvent, isDetail?: boolean) {
        const tempData: KupDataDataset = {
            columns: this.data.columns,
            rows: [],
        };
        const value = (e.target as HTMLInputElement).value;
        const data = isDetail ? this.detailData : this.data;
        for (let index = 0; index < data.rows.length; index++) {
            const row = data.rows[index];
            const valuesToShow = isDetail
                ? getValuesToShow(
                      row,
                      this.detailIdCol,
                      this.detailNameCol,
                      data.columns,
                      this.detailColumns
                  )
                : getValuesToShow(
                      row,
                      this.taskIdCol,
                      this.taskNameCol,
                      data.columns,
                      this.taskColumns
                  );
            for (let index = 0; index < valuesToShow.length; index++) {
                const valueToShow = valuesToShow[index];
                if (
                    valueToShow.toLowerCase().indexOf(value.toLowerCase()) > -1
                ) {
                    tempData.rows.push(row);
                    break;
                }
            }
        }
        const newGantt = isDetail
            ? {
                  secondaryGantt: {
                      ...this.plannerProps.secondaryGantt,
                      items: this.#toDetails(tempData),
                  },
              }
            : {
                  mainGantt: {
                      ...this.plannerProps.mainGantt,
                      items: this.#toTasks(tempData),
                  },
              };
        this.plannerProps = {
            ...this.plannerProps,
            ...newGantt,
        };
    }

    componentWillLoad() {
        this.#kupManager.debug.logLoad(this, false);
        this.#kupManager.theme.register(this);
    }

    componentDidLoad() {
        let details = this.#toDetails(this.detailData);
        if (details && details.length == 0) {
            details = undefined;
        }
        const mainFilter: HTMLElement =
            this.rootElement.shadowRoot.querySelector('#main-filter');
        FTextFieldMDC(mainFilter);
        const secondaryFilter: HTMLElement =
            this.rootElement.shadowRoot.querySelector('#secondary-filter');
        if (details) {
            FTextFieldMDC(secondaryFilter);
        }

        this.plannerProps = {
            mainGantt: {
                title: this.titleMess,
                items: this.#toTasks(this.data),
                stylingOptions: {
                    ...defaultStylingOptions,
                    listCellWidth: this.listCellWidth,
                },
                filter: mainFilter,
                hideLabel: true,
                ganttHeight: this.taskHeight,
                showSecondaryDates: this.showSecondaryDates,
                onClick: (nativeEvent: KupPlannerGanttTask | KupPlannerPhase) =>
                    this.handleOnClick(nativeEvent),
                onDateChange: (
                    nativeEvent: KupPlannerGanttTask | KupPlannerPhase
                ) => this.handleOnDateChange(nativeEvent),
            },
            secondaryGantt: details
                ? {
                      title: '',
                      items: details,
                      stylingOptions: {
                          ...defaultStylingOptions,
                          listCellWidth: this.listCellWidth,
                      },
                      filter: secondaryFilter,
                      hideLabel: true,
                      ganttHeight: this.detailHeight,
                      onClick: (nativeEvent: KupPlannerDetail) =>
                          this.handleOnClick(nativeEvent),
                      onDateChange: (nativeEvent: KupPlannerDetail) =>
                          this.handleOnDateChange(nativeEvent),
                  }
                : undefined,
        };
        this.#renderReactPlannerElement();
        this.kupReady.emit({
            comp: this,
            id: this.rootElement.id,
            value: undefined,
        });
        this.#kupManager.debug.logLoad(this, true);
    }

    componentWillRender() {
        this.#renderReactPlannerElement();
    }

    componentDidRender() {
        this.#kupManager.debug.logRender(this, true);
    }

    render() {
        //console.log('kup-planner.tsx render');
        return (
            <Host>
                <style>
                    {this.#kupManager.theme.setKupStyle(
                        this.rootElement as KupComponent
                    )}
                </style>
                <div
                    id={componentWrapperId}
                    style={{ maxWidth: this.maxWidth }}
                ></div>
                <FTextField
                    icon={KupThemeIconValues.SEARCH}
                    id="main-filter"
                    label={this.#kupManager.language.translate(
                        KupLanguageSearch.SEARCH
                    )}
                    onKeyDown={(e: KeyboardEvent) => {
                        if (e.key === 'Enter') {
                            this.#onFilter(e);
                        }
                    }}
                    wrapperClass="filter"
                ></FTextField>
                {this.detailData?.rows && this.detailData.rows.length > 0 ? (
                    <FTextField
                        icon={KupThemeIconValues.SEARCH}
                        id="secondary-filter"
                        label={this.#kupManager.language.translate(
                            KupLanguageSearch.SEARCH
                        )}
                        onKeyDown={(e: KeyboardEvent) => {
                            if (e.key === 'Enter') {
                                this.#onFilter(e, true);
                            }
                        }}
                        wrapperClass="filter"
                    ></FTextField>
                ) : null}
            </Host>
        );
    }

    disconnectedCallback() {
        this.#kupManager.theme.unregister(this);
    }
}
