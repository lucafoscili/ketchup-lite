import {
    Cell,
    Column,
    DataTable,
    Row,
} from '../../components/kup-data-table/kup-data-table-declarations';
import { KupDebugCategory } from '../kup-debug/kup-debug-declarations';
import { KupLanguageTotals } from '../kup-language/kup-language-declarations';
import { KupDom } from '../kup-manager/kup-manager-declarations';

const dom: KupDom = document.documentElement as KupDom;

/**
 * Finds the columns matching the criteria specified in the filters argument.
 * @param {DataTable | Column[]} dataset - Input dataset or array of columns.
 * @param {Partial<Column>} filters - Column interface containing the filters to match.
 * @returns {Column[]} Columns matching the criteria.
 */
export function findColumns(
    dataset: DataTable | Column[],
    filters: Partial<Column>
): Column[] {
    const columns = (dataset as DataTable).columns
        ? (dataset as DataTable).columns
        : (dataset as Column[]);
    const result: Column[] = [];
    for (let index = 0; index < columns.length; index++) {
        const column = columns[index];
        for (const key in filters) {
            const filter = filters[key];
            if (column[key] === filter) {
                result.push(column);
            }
        }
    }
    return result;
}
/**
 * Sets the given columns of the input dataset to be hidden.
 * @param {DataTable | Column[]} dataset - Input dataset or array of columns.
 * @param {string[]} columns2hide - Columns to merge.
 * @returns {Column[]} Columns that were set to hidden.
 */
export function hideColumns(
    dataset: DataTable | Column[],
    columns2hide: string[]
): Column[] {
    const columns = (dataset as DataTable).columns
        ? (dataset as DataTable).columns
        : (dataset as Column[]);
    const hidden: Column[] = [];
    for (let index = 0; index < columns.length; index++) {
        const column = columns[index];
        if (columns2hide.includes(column.name)) {
            column.visible = false;
            hidden.push(column);
        }
    }
    return hidden;
}
/**
 * Takes the columns to merge and creates a new column with their cells. The merged columns will then be removed.
 * @param {DataTable} dataset - Input dataset.
 * @param {string[]} columns2merge - Columns to merge.
 * @param {Column} newColumn - Column created.
 * @returns {Column} Resulting column.
 */
export function mergeColumns(
    dataset: DataTable,
    columns2merge: string[],
    newColumn: Column
): Column {
    const outputCells: Cell[] = [];
    for (let index = 0; index < dataset.rows.length; index++) {
        const row = dataset.rows[index];
        const cells = row.cells;
        for (const key in cells) {
            const cell = cells[key];
            if (columns2merge.includes(key)) {
                outputCells.push({ ...cell });
                delete cells[key];
            }
        }
    }
    for (let index = 0; index < columns2merge.length; index++) {
        const column2removeIndex = dataset.columns.findIndex(
            (col: Column) => col.name === columns2merge[index]
        );
        dataset.columns.splice(column2removeIndex, 1);
    }
    let rowIndex = 0;
    for (let index = 0; index < outputCells.length; index++) {
        const outputCell = outputCells[index];
        let row: Row = null;
        if (!dataset.rows[rowIndex]) {
            dataset.rows[rowIndex] = { cells: {} };
        }
        row = dataset.rows[rowIndex];
        row.cells[newColumn.name] = outputCell;
        rowIndex++;
    }
    dataset.columns.push(newColumn);
    return newColumn;
}
/**
 * This method is used to create a new column from a mathematical formula.
 * @param {DataTable} dataset - The dataset that must be updated with the new columns.
 * @param {string} operation - Mathematical operation to apply (i.e.: "sum", "average", ([COL1] - [COL2]) * 100 / [COL3]).
 * @param {string[]} columns - Column names used for the mathematical operation. When missing, they will be extracted from the formula.
 * @returns {string | Column} Returns the new column created or a string containing the error message (if something went wrong).
 */
export function newColumn(
    dataset: DataTable,
    operation: string,
    columns?: string[]
): string | Column {
    if (!columns) {
        columns = [];
    }
    if (columns.length === 0) {
        const names = operation.split('[');
        for (let i = 1; i < names.length; i++) {
            columns.push(names[i].split(']')[0]);
        }
    }
    if (columns.length === 0) {
        const message =
            "Can't apply math formulas without columns!(" + columns + ')';
        dom.ketchup.debug.logMessage(
            'kup-data',
            message,
            KupDebugCategory.WARNING
        );
        return message;
    }
    const titles: string[] = [];
    const formulaRow: { [index: string]: number } = {};
    let firstColumn: Column = null;
    let formula = '';
    switch (operation) {
        case KupLanguageTotals.AVERAGE:
            formula = `(${columns.join(' + ')}) / ${columns.length}`;
            break;
        case KupLanguageTotals.DIFFERENCE:
            formula = columns.join(' - ');
            break;
        case KupLanguageTotals.PRODUCT:
            formula = columns.join(' * ');
            break;
        case KupLanguageTotals.SUM:
            formula = columns.join(' + ');
            break;
        default:
            formula = operation;
    }
    for (let index = 0; index < dataset.columns.length; index++) {
        const col = dataset.columns[index];
        if (columns.includes(col.name)) {
            titles[columns.indexOf(col.name)] = col.title;
            if (!dom.ketchup.objects.isNumber(col.obj)) {
                const message =
                    "Can't apply math formulas on non-numerical columns!(" +
                    columns +
                    ')';
                dom.ketchup.debug.logMessage(
                    'kup-data',
                    message,
                    KupDebugCategory.WARNING
                );
                return message;
            }
        }
        if (columns[0] === col.name) {
            firstColumn = col;
        }
        if (col.resultOf && col.resultOf === formula) {
            const message =
                'This mathematical operation on these columns was already performed!(' +
                formula +
                ')';
            dom.ketchup.debug.logMessage(
                'kup-data',
                message,
                KupDebugCategory.WARNING
            );
            return message;
        }
    }
    let prog = 0;
    let newName = 'MATH_';
    while (findColumns(dataset, { name: newName + prog }).length > 0) {
        prog++;
    }
    newName = newName + prog;
    const newObj = firstColumn.obj;
    let newTitle = formula;
    for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
        let re: RegExp = new RegExp(column, 'g');
        newTitle = newTitle.replace(re, titles[i]);
    }
    dataset.rows.forEach((row) => {
        const cells = row.cells;
        let base: Cell = null;
        if (cells) {
            for (let index = 0; index < columns.length; index++) {
                const column = columns[index];
                const cell = cells[column];
                if (cell) {
                    if (!base) {
                        base = cell;
                    }
                    formulaRow[column] = dom.ketchup.data.numberify(cell.value);
                }
            }
        }
        const value = dom.ketchup.data.formulas
            .custom(formula, formulaRow)
            .toString();
        cells[newName] = {
            ...base,
            displayedValue: null,
            obj: { ...newObj, k: value },
            value: value,
        };
    });
    const newColumn: Column = {
        ...firstColumn,
        name: newName,
        title: newTitle,
        obj: newObj,
        resultOf: formula,
    };
    dataset.columns.splice(
        dataset.columns.indexOf(firstColumn) + 1,
        0,
        newColumn
    );
    return newColumn;
}
