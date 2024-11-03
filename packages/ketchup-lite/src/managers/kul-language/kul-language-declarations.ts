export type KulLanguageKey =
    | KulLanguageCheckbox
    | KulLanguageColumn
    | KulLanguageDashboard
    | KulLanguageDebug
    | KulLanguageDensity
    | KulLanguageFontsize
    | KulLanguageGeneric
    | KulLanguageGrid
    | KulLanguageGrouping
    | KulLanguagePage
    | KulLanguageRow
    | KulLanguageSearch
    | KulLanguageTotals
    | 'keys';
export type KulLanguageValue = string | { [key: string]: KulLanguageValue };
export type KulLanguageKeys = Partial<{
    [K in KulLanguageKey]: KulLanguageValue;
}>;
export interface LanguageElement {
    keys: KulLanguageKeys;
    variants?: {
        [key: string]: KulLanguageKeys;
    };
}
export interface LanguagesJson {
    [language: string]: LanguageElement;
}
export interface KulLanguageJSON {
    [index: string]: KulLanguageElement;
}
export interface KulLanguageElement {
    keys: KulLanguageKeys;
    variants?: {
        [key: string]: KulLanguageKeys;
    };
}
export interface KulLanguageDecode {
    language: string;
    variant: string;
}
export enum KulLanguageDefaults {
    cn = 'chinese',
    en = 'english',
    es = 'spanish',
    it = 'italian',
    fr = 'french',
    pl = 'polish',
    ru = 'russian',
}
export enum KulLanguageCheckbox {
    ALL = 'checkboxAll',
    CHECKED = 'checkboxChecked',
    INDETERMINATE = 'checkboxIndeterminate',
    UNCHECKED = 'checkboxUnchecked',
}
export enum KulLanguageColumn {
    ADD = 'columnAdd',
    ADD_DESCRIPTION = 'columnAddDescription',
    COLUMNS = 'columnColumns',
    HIDE = 'columnHide',
    MERGE = 'columnMerge',
    NO_FORMULA = 'columnNoFormula',
    NON_NUMERICAL = 'columnNonNumerical',
    NON_NUMERICAL_IN_TABLE = 'columnNonNumericalInTable',
    SWAP = 'columnSwap',
}
export enum KulLanguageDashboard {
    DIMENSION = 'dashboardDimension',
    LOADED = 'dashboardLoaded',
    RESET = 'dashboardReset',
    SAVE = 'dashboardSave',
    VERTICAL = 'dashboardVertical',
}
export enum KulLanguageDebug {
    AUTOPRINT = 'debugAutoprint',
    CLEAR = 'debugClear',
    DUMP = 'debugDump',
    DL_ALL = 'debugDLAll',
    DL_PROPS = 'debugDLProps',
    DL_PROPS_COMP = 'debugDLPropsComp',
    LANGUAGE_CHANGER = 'debugLanguageChanger',
    LOCALE_CHANGER = 'debugLocaleChanger',
    LOG_LIMIT = 'debugLogLimit',
    MAGIC_BOX = 'debugMagicBox',
    OFF = 'debugOff',
    PRINT = 'debugPrint',
    THEME_CHANGER = 'debugThemeChanger',
}
export enum KulLanguageDensity {
    DENSE = 'densityDense',
    LABEL = 'densityLabel',
    MEDIUM = 'densityMedium',
    WIDE = 'densityWide',
}
export enum KulLanguageFontsize {
    BIG = 'fontsizeBig',
    LABEL = 'fontsizeLabel',
    MEDIUM = 'fontsizeMedium',
    SMALL = 'fontsizeSmall',
}
export enum KulLanguageGeneric {
    ABORT = 'genericAbort',
    ADD_NEW = 'genericAddNew',
    APPLY = 'genericApply',
    BACK = 'genericBack',
    COLLAPSE = 'genericCollapse',
    CONFIRM = 'genericConfirm',
    CONFIRM_DELETE = 'genericConfirmDelete',
    CONFIRM_DELETE_X_ROWS = 'genericConfirmDeleteXRows',
    DAY = 'genericDay',
    DRAG_AND_DROP = 'genericDragAndDrop',
    DROP_YOUR_DATA = 'genericDropYourData',
    EDITABLE = 'genericEditable',
    EDITABLE_FIELD = 'genericEditableField',
    EMPTY_DATA = 'genericEmptyData',
    EMPTY_OBJECT = 'genericEmptyObject',
    EXPAND = 'genericExpand',
    EXPERIMENTAL_FEAT = 'genericExperimentalFeat',
    FILTERS = 'genericFilters',
    INFO = 'genericInfo',
    INVALID_COLOR = 'genericInvalidColor',
    LAYOUT_NYI = 'genericLayoutNotYetImplemented',
    LIST = 'genericList',
    LOAD_MORE = 'genericLoadMoreData',
    MERGE = 'genericMerge',
    MENU = 'genericMenu',
    MONTH = 'genericMonth',
    MOVE = 'genericMove',
    NEXT = 'genericNext',
    NO = 'genericNo',
    OPEN_NAVIGATION_MENU = 'genericOpenNavigationMenu',
    OPEN_IN_NEW_TAB = 'genericOpenInNewTab',
    OPEN_IN_NEW_WINDOW = 'genericOpenInNewWindow',
    OPTIONS = 'genericOptions',
    PREVIOUS = 'genericPrevious',
    REMOVE_FILTERS = 'genericRemoveFilters',
    SETTINGS = 'genericSettings',
    SHOW_ROW_OPTIONS = 'genericShowRowOptions',
    SHOW_TOOLTIP_INFO = 'genericShowTooltipInfo',
    SORT_BY = 'genericSortBy',
    SWAP = 'genericSwap',
    TOGGLE = 'genericToggle',
    TODAY = 'genericToday',
    TOP = 'genericTop',
    TOTALS_TABLE = 'genericTotalsTable',
    TRANSPOSE_DATA = 'genericTransposeData',
    VIEW_AS = 'genericViewAs',
    WEEK = 'genericWeek',
    YES = 'genericYes',
}
export enum KulLanguageGrid {
    COLUMN = 'gridColumn',
    COMPLETE = 'gridComplete',
    LABEL = 'gridLabel',
    NONE = 'gridNone',
    ROW = 'gridRow',
}
export enum KulLanguageGrouping {
    DISABLE = 'groupingDisable',
    ENABLE = 'groupingEnable',
    GROUPS = 'groupingGroups',
}
export enum KulLanguagePage {
    PAGE = 'pagePage',
    TOTAL = 'pageTotal',
}
export enum KulLanguageRow {
    DETAIL = 'rowDetail',
    EDITABLE_KEY = 'rowEditableKey',
    KEY = 'rowKey',
    NEXT = 'rowNext',
    PREVIOUS = 'rowPrevious',
    RENDERED = 'rowRendered',
    ROWS = 'rowRows',
    SELECTED = 'rowSelected',
    TOTAL = 'rowTotal',
}
export enum KulLanguageSearch {
    FROM = 'searchFrom',
    SEARCH = 'searchSearch',
    TO = 'searchTo',
}
export enum KulLanguageTotals {
    AVERAGE = 'totalsAverage',
    CALCULATE = 'totalsCalculate',
    CANCEL = 'totalsCancel',
    COUNT = 'totalsCount',
    DIFFERENCE = 'totalsDifference',
    DISTINCT = 'totalsDistinct',
    FORMULA = 'totalsFormula',
    MAXIMUM = 'totalsMaximum',
    MINIMUM = 'totalsMinimum',
    PRODUCT = 'totalsProduct',
    SUM = 'totalsSum',
}
