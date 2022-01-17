import { h, VNode } from '@stencil/core';
import { KupCard } from '../kup-card';
import { KupCardCSSClasses } from '../kup-card-declarations';
import { prepareCalendar } from './kup-card-calendar';
import { prepareClock } from './kup-card-clock';
import { prepareColumnDropMenu } from './kup-card-column-drop-menu';

/**
 * 1st built-in layout, calendar view.
 * @param {KupCard} component - Card component.
 * @returns {VNode} 1st built-in layout virtual node.
 */
export function create1(component: KupCard): VNode {
    return (
        <div
            class={`built-in-layout-${component.layoutNumber} ${KupCardCSSClasses.BUILT_IN_CARD}`}
        >
            {prepareCalendar(component)}
        </div>
    );
}
/**
 * 2nd built-in layout, clock view.
 * @param {KupCard} component - Card component.
 * @returns {VNode} 2st built-in layout virtual node.
 */
export function create2(component: KupCard): VNode {
    return (
        <div
            class={`built-in-layout-${component.layoutNumber} ${KupCardCSSClasses.BUILT_IN_CARD}`}
        >
            {prepareClock(component)}
        </div>
    );
}
/**
 * 3rd built-in layout, column drop menu - used in data table when a column is dropped onto another one.
 * @param {KupCard} component - Card component.
 * @returns {VNode} 3rd built-in layout virtual node.
 */
export function create3(component: KupCard): VNode {
    return (
        <div
            class={`built-in-layout-${component.layoutNumber} ${KupCardCSSClasses.BUILT_IN_CARD}`}
        >
            {prepareColumnDropMenu(component)}
        </div>
    );
}
/**
 * 4th built-in layout, color picker.
 * This layout is rendered after the render cycle completes.
 * @param {KupCard} component - Card component.
 * @returns {VNode} 4th built-in layout virtual node.
 */
export function create4(component: KupCard): VNode {
    return (
        <div
            class={`built-in-layout-${component.layoutNumber} ${KupCardCSSClasses.BUILT_IN_CARD}`}
        ></div>
    );
}
