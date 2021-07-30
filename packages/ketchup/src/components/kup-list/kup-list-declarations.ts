import { KupEventPayload } from '../../types/GenericTypes';
import { ValueDisplayedValue as vdv } from '../../utils/filters/filters-declarations';

/**
 * Props of the kup-list component.
 * Used to export every prop in an object.
 */
export enum KupListProps {
    customStyle = 'Custom style of the component.',
    data = 'The data of the list.',
    displayMode = 'Selects how the items must display their label and how they can be filtered for.',
    filter = 'Keeps string for filtering elements when filter mode is active',
    hideText = "Hides rows' text, ideally to display a list of icons only.",
    isMenu = 'Defines whether the list is a menu or not.',
    keyboardNavigation = "When true, enables items' navigation through keys. Defaults to false when the component's isMenu prop is set to true.",
    menuVisible = "Sets the status of the menu, when false it's hidden otherwise it's visible.",
    roleType = 'Defines the type of selection. Values accepted: listbox, radiogroup or group.',
    selectable = 'Defines whether items are selectable or not.',
    showIcons = 'Displays the icons associated to each row when set to true.',
    twoLine = 'The list elements descriptions will be arranged in two lines.',
}

export interface KupListData {
    text: string;
    value: string;
    icon?: string;
    secondaryText?: string;
    selected?: boolean;
    separator?: boolean;
}

export interface ValueDisplayedValue extends vdv {}

export enum ItemsDisplayMode {
    CODE = 'code',
    DESCRIPTION = 'description',
    DESCRIPTION_AND_CODE = 'both',
}

export function getValueOfItemByDisplayMode(
    item: KupListData,
    mode: ItemsDisplayMode,
    separator: string
): string {
    if (mode == ItemsDisplayMode.CODE) {
        return item.value;
    }
    if (mode == ItemsDisplayMode.DESCRIPTION) {
        return item.text;
    }
    if (mode == ItemsDisplayMode.DESCRIPTION_AND_CODE) {
        return item.value + separator + item.text;
    }
    return item.value;
}

export function consistencyCheck(
    valueIn: string,
    listData: Object,
    listEl: any,
    selectMode: ItemsDisplayMode,
    displayMode: ItemsDisplayMode,
    e?: CustomEvent
): ValueDisplayedValue {
    let value: string = '';
    let displayedValue: string = '';

    let selected: KupListData = null;
    if (e != null) {
        selected = e.detail.selected;
    }
    if (selected == null && valueIn != null && listData && listData['data']) {
        selected = getItemByDisplayMode(listData, valueIn, displayMode, true);
        listEl.data = [...listData['data']];
    }
    if (selected == null && valueIn == null && listData) {
        selected = getFirstItemSelected(listData);
    }

    if (selected == null) {
        selected = {
            text: valueIn == null ? '' : valueIn,
            value: valueIn == null ? '' : valueIn,
        };
    }
    value = getValueOfItemByDisplayMode(selected, selectMode, ' - ');

    displayedValue = getValueOfItemByDisplayMode(selected, displayMode, ' - ');
    return {
        value: value,
        displayedValue: displayedValue,
    };
}

export function getFirstItemSelected(listData: Object): KupListData {
    if (listData['data']) {
        for (let i = 0; i < listData['data'].length; i++) {
            if (listData['data'][i].selected) {
                return listData['data'][i];
            }
        }
    }
    return null;
}

export function getItemByValue(
    listData: Object,
    value: string,
    setSelected: boolean
): KupListData {
    if (listData && listData['data']) {
        let found: boolean = false;
        let item: KupListData = null;
        for (let i = 0; i < listData['data'].length; i++) {
            if (setSelected == true) {
                listData['data'][i].selected = false;
            }
            if (
                !found &&
                listData['data'][i].value.toString().toLowerCase() ==
                    value.toString().toLowerCase()
            ) {
                item = listData['data'][i];
                item.selected = true;
                found = true;
            }
        }
        if (found == true) {
            return item;
        }
        for (let i = 0; i < listData['data'].length; i++) {
            if (
                listData['data'][i].text.toString().toLowerCase() ==
                value.toString().toLowerCase()
            ) {
                item = listData['data'][i];
                item.selected = true;
                found = true;
                break;
            }
        }
        if (found == true) {
            return item;
        }
    }
    return null;
}

export function getItemByDisplayMode(
    listData: Object,
    value: string,
    displayMode: ItemsDisplayMode,
    setSelected: boolean
): KupListData {
    if (listData && listData['data']) {
        let found: boolean = false;
        let item: KupListData = null;
        for (let i = 0; i < listData['data'].length; i++) {
            let displayedValue = getValueOfItemByDisplayMode(
                listData['data'][i],
                displayMode,
                ' - '
            );
            if (setSelected == true) {
                listData['data'][i].selected = false;
            }
            if (
                !found &&
                displayedValue.toString().toLowerCase() ==
                    value.toString().toLowerCase()
            ) {
                item = listData['data'][i];
                item.selected = true;
                found = true;
            }
        }
        if (found == true) {
            return item;
        }
    }
    return getItemByValue(listData, value, setSelected);
}

export interface KupListEventPayload extends KupEventPayload {
    selected: KupListData;
}
