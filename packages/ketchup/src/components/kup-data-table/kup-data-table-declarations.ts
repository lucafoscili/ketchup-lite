import { GenericObject, KupEventPayload } from '../../types/GenericTypes';
import { KupObj } from '../../managers/kup-objects/kup-objects-declarations';
import type { PointerEvent } from '@interactjs/types/index';
import { KupCardEventPayload } from '../kup-card/kup-card-declarations';
import {
    KupDataCell,
    KupDataColumn,
    KupDataRow,
    KupDataRowAction,
} from '../../managers/kup-data/kup-data-declarations';

/**
 * Props of the kup-data-table component.
 * Used to export every prop in an object.
 */
export enum KupDataTableProps {
    autoFillMissingCells = 'When true and when a row is missing some columns, the missing cells will be autogenerated.',
    customStyle = 'Custom style of the component.',
    data = 'The data of the table.',
    density = "The density of the rows, defaults at 'medium' and can be also set to 'large' or 'small'.",
    dragEnabled = 'Enables drag.',
    dropEnabled = 'Enables drop.',
    editableData = 'When set to true, editable cells will be rendered using input components.',
    emptyDataLabel = 'Defines the label to show when the table is empty.',
    enableColumnsFormula = 'Enables the choice to set formulas on columns by dragging them into different columns.',
    enableMergeColumns = 'Enables the merging of columns by dragging them into different columns.',
    enableExtraColumns = 'Enables adding extra columns.',
    enableSortableColumns = 'Enables the sorting of columns by dragging them into different columns.',
    expandGroups = 'Expands groups when set to true.',
    filters = 'List of filters set by the user.',
    fixedColumns = 'Fixes the given number of columns so that they stay visible when horizontally scrolling the data-table. If grouping is active or the value of the prop is <= 0, this prop will have no effect. Can be combined with fixedRows.',
    fixedRows = 'Fixes the given number of rows so that they stay visible when vertically scrolling the data-table. If grouping is active or the value of the prop is <= 0, this prop will have no effect. Can be combined with fixedColumns.',
    forceOneLine = 'Forces cells with long text and a fixed column size to have an ellipsis set on their text. The reflect attribute is mandatory to allow styling.',
    globalFilter = 'When set to true it activates the global filter.',
    globalFilterValue = 'The value of the global filter.',
    groupLabelDisplay = 'How the label of a group must be displayed. For available values',
    groups = 'The list of groups.',
    headerIsPersistent = 'When set to true the header will stick on top of the table when scrolling.',
    isFocusable = 'When set to true, clicked-on rows will have a visual feedback.',
    lazyLoadRows = 'When set to true, extra rows will be automatically loaded once the last row enters the viewport. When groups are present, the number of rows is referred to groups and not to their content. Paginator is disabled.',
    lineBreakCharacter = 'Defines the placeholder character which will be replaced by a line break inside table header cells, normal or sticky.',
    loadMoreLimit = 'Sets a maximum limit of new records which can be required by the load more functionality.',
    loadMoreMode = 'Establish the modality of how many new records will be downloaded. This property is regulated also by loadMoreStep.',
    loadMoreStep = 'The number of records which will be requested to be downloaded when clicking on the load more button. This property is regulated also by loadMoreMode.',
    multiSelection = 'When set to true enables rows multi selection.',
    pageSelected = 'Current selected page set on component load',
    paginatorPos = 'Sets the position of the paginator. Available positions: top, bottom or both.',
    removableColumns = 'Sets the possibility to remove the selected column.',
    resizableColumns = 'Gives the possibility to resize columns by dragging on their right edge.',
    rowActions = 'Sets the actions of the rows.',
    rowsPerPage = 'Sets the number of rows per page to display.',
    scrollOnHover = 'Activates the scroll on hover function.',
    showCustomization = 'If set to true, displays the button to open the customization panel.',
    showFilters = 'When set to true enables the column filters.',
    showFooter = 'When set to true shows the footer.',
    showGrid = 'Can be used to customize the grid view of the table.',
    showGroups = 'When set to true enables the column grouping.',
    showHeader = 'Enables rendering of the table header.',
    showLoadMore = 'If set to true, displays the button to load more records.',
    sort = 'Defines the current sorting options.',
    stateId = '',
    store = '',
    sortableColumnsMutateData = 'If set to true, when a column is dragged to be sorted, the component directly mutates the data.columns property and then fires the event',
    sortEnabled = 'When set to true enables the sorting of the columns by clicking on the column header.',
    tableHeight = 'Sets the height of the table.',
    tableWidth = 'Sets the width of the table.',
    totals = 'Defines the current totals options.',
    transpose = 'Transposes the data of the data table.',
}
export interface KupDataTableDataset {
    columns?: KupDataColumn[];
    rows?: KupDataTableRow[];
}
export interface KupDataTableRow extends KupDataRow {
    cells?: KupDataTableRowCells;
    group?: KupDataTableRowGroup;
    unselectable?: boolean;
}
export interface KupDataTableRowGroup {
    children: Array<KupDataTableRow>;
    column: string;
    columnLabel: string;
    expanded: boolean;
    id: string;
    label: string;
    obj: KupObj;
    parent: KupDataTableRow;
    totals: GenericObject;
}
export interface KupDataTableRowCells {
    [index: string]: KupDataTableCell;
}
export interface KupDataTableCell extends KupDataCell {
    span?: KupDataTableCellSpan;
}
export interface KupDataTableCellSpan {
    col: number;
    row: number;
}

export interface SortObject {
    column: string;
    sortMode: SortMode;
}

export enum SortMode {
    A = 'A',
    D = 'D',
}

export interface TotalsMap {
    [index: string]: TotalMode;
}

export enum TotalMode {
    COUNT = 'Count',
    SUM = 'Sum',
    MIN = 'Min',
    MAX = 'Max',
    DISTINCT = 'Distinct',
    AVERAGE = 'Average',
    MATH = 'MATH',
}

export enum TotalLabel {
    COUNT = 'Count',
    SUM = 'Sum',
    MIN = 'Min',
    MAX = 'Max',
    DISTINCT = 'Distinct',
    AVERAGE = 'Average',
    MATH = 'Formula',
    CANC = 'Cancel',
    CALC = 'Calculate',
}

export enum PaginatorPos {
    TOP = 'Top',
    BOTTOM = 'Bottom',
    BOTH = 'Both',
}

export interface GroupObject {
    column: string;
    visible: boolean;
}

export enum ShowGrid {
    NONE = 'None',
    ROW = 'Row',
    COL = 'Col',
    COMPLETE = 'Complete',
}

// export enum RowActionType {
//     DEFAULT = 'Default',
//     VARIABLE = 'Variable',
// }

//---- *NEXT functionality AKA load more ----
export enum LoadMoreMode {
    CONSTANT = 'constant',
    CONSTANT_INCREMENT = 'constant_increment',
    PROGRESSIVE_THRESHOLD = 'progressive_threshold',
}

//---- Sortable Columns Functionality ----
export const KupDataTableColumnDragType = 'text/kup-data-table-column-drag';
export const KupDataTableColumnDragRemoveType =
    'text/kup-data-table-column-drag-remove';
export const KupDataTableColumnDragGroupType =
    'text/kup-data-table-column-drag-group';
export const KupDataTableRowDragType = 'text/kup-data-table-row-drag';

export interface KupDataTableSortedColumnIndexes {
    receivingColumnIndex: number;
    sortedColumnIndex: number;
}

//---- Group label display functionality ----
/**
 * The possible values the display property can have.
 * @enum
 * @property {string} BOTH - Shows both the column label and the value. This is the default.
 * @property {string} LABEL - Shows only the columns label.
 * @property {string} VALUE - Shows only the value.
 * @readonly
 */
export enum GroupLabelDisplayMode {
    BOTH = 'Both',
    LABEL = 'Label',
    VALUE = 'Value',
}

//---- Fixed rows and cells classes ----
export const FixedCellsClasses = {
    columns: 'fixed-column',
    rows: 'fixed-row',
};

export const FixedCellsCSSVarsBase = {
    columns: '--ddt_column-left-',
    rows: '--ddt_row-top-',
};

export const totalMenuOpenID = 'TOMEOPID';

/**
 * Contains all the data of an event.
 */
export interface KupDatatableEventHandlerDetails {
    area: string;
    cell: KupDataTableCell;
    column: KupDataColumn;
    filterRemove: HTMLElement;
    isGroupRow: boolean;
    originalEvent: PointerEvent;
    row: KupDataRow;
    td: HTMLElement;
    textfield: HTMLElement;
    th: HTMLElement;
    tr: HTMLElement;
}
/**
 * Constants for mocked/premade columns created by data mutations.
 */
export const fieldColumn: string = 'Field';
export const iconColumn: string = 'Icon';
export const keyColumn: string = 'Key';

export enum SelectionMode {
    SINGLE = 'single',
    MULTIPLE_CHECKBOX = 'multiple-checkbox',
    MULTIPLE = 'multiple',
    NONE = 'none',
}

export interface KupDatatableAutoRowSelectEventPayload extends KupEventPayload {
    selectedRow: KupDataRow;
}

export interface KupDatatableRowSelectedEventPayload extends KupEventPayload {
    selectedRows: Array<KupDataRow>;
    clickedRow: KupDataRow;
    clickedColumn: string;
}

export interface KupDatatableClickEventPayload extends KupEventPayload {
    details: KupDatatableEventHandlerDetails;
}

export interface KupDatatableColumnMoveEventPayload extends KupEventPayload {
    sourceColumn: KupDataColumn;
    targetColumn: KupDataColumn;
}

export interface KupDatatableColumnRemoveEventPayload extends KupEventPayload {
    column: KupDataColumn;
}

export interface KupDatatableColumnMenuEventPayload extends KupEventPayload {
    card: HTMLKupCardElement;
    event: CustomEvent<KupCardEventPayload | KupEventPayload>;
    open: boolean;
}

export interface KupDatatableOptionClickEventPayload extends KupEventPayload {
    column: string;
    row: KupDataRow;
}

export interface KupDatatableRowActionClickEventPayload
    extends KupEventPayload {
    type: 'default' | 'variable' | 'expander';
    row: KupDataRow;
    action?: KupDataRowAction;
    index?: number;
}
export interface KupDataTableCellButtonClickEventPayload
    extends KupEventPayload {
    cell: KupDataTableCell;
    column: KupDataColumn;
    row: KupDataRow;
}
export interface KupDatatableLoadMoreClickEventPayload extends KupEventPayload {
    loadItems: number;
}
