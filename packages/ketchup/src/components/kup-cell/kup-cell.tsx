import {
    Component,
    Element,
    Event,
    EventEmitter,
    forceUpdate,
    h,
    Host,
    Method,
    Prop,
} from '@stencil/core';
import {
    KupManager,
    kupManagerInstance,
} from '../../utils/kup-manager/kup-manager';
import { GenericObject, KupComponent } from '../../types/GenericTypes';
import { getProps, setProps } from '../../utils/utils';
import { componentWrapperId } from '../../variables/GenericVariables';
import {
    Cell,
    Column,
    Row,
} from '../kup-data-table/kup-data-table-declarations';
import { KupCellEventPayload, KupCellProps } from './kup-cell-declarations';
import { FCell } from '../../f-components/f-cell/f-cell';
import {
    FCellPadding,
    FCellProps,
} from '../../f-components/f-cell/f-cell-declarations';
import {
    KupDragDataTransferCallback,
    KupDragEffect,
} from '../../utils/kup-interact/kup-interact-declarations';
import { KupLanguageGeneric } from '../../utils/kup-language/kup-language-declarations';

@Component({
    tag: 'kup-cell',
    styleUrl: 'kup-cell.scss',
    shadow: true,
})
export class KupCell {
    /**
     * References the root HTML element of the component (<kup-text-field>).
     */
    @Element() rootElement: HTMLElement;

    /*-------------------------------------------------*/
    /*                    P r o p s                    */
    /*-------------------------------------------------*/

    /**
     * Custom style of the component.
     * @default ""
     * @see https://ketchup.smeup.com/ketchup-showcase/#/customization
     */
    @Prop() customStyle: string = '';
    /**
     * The data of the cell.
     * @default false
     */
    @Prop() data: Cell = null;
    /**
     * The density of the cell, defaults at 'dense' and can be also set to 'wide' or 'medium'.
     */
    @Prop() density: FCellPadding = FCellPadding.NONE;
    /**
     * When set to true, the component is draggable.
     * @default false
     */
    @Prop() dragEnabled: boolean = false;

    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/

    /**
     * Instance of the KupManager class.
     */
    private kupManager: KupManager = kupManagerInstance();

    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/

    /**
     * Triggered when the element is clicked.
     */
    @Event({
        eventName: 'kup-cell-click',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupClick: EventEmitter<KupCellEventPayload>;

    onKupClick(event: MouseEvent & { target: HTMLElement }) {
        const { target } = event;
        this.kupClick.emit({
            cell: this.data,
            comp: this,
            id: this.rootElement.id,
        });
    }

    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/

    /**
     * Adds the given CSS classes to the cell's data.
     * @param {string[]} classes - Array of CSS classes.
     */
    @Method()
    async addCssClasses(classes?: string[]): Promise<void> {
        if (!this.data.cssClass) {
            this.data.cssClass = '';
        }
        if (classes) {
            for (let index = 0; index < classes.length; index++) {
                const cssClass = classes[index];
                if (this.data.cssClass.indexOf(cssClass) < 0) {
                    this.data.cssClass += ` ${cssClass}`;
                }
            }
        }
        this.refresh();
    }
    /**
     * Used to retrieve component's props values.
     * @param {boolean} descriptions - When provided and true, the result will be the list of props with their description.
     * @returns {Promise<GenericObject>} List of props as object, each key will be a prop.
     */
    @Method()
    async getProps(descriptions?: boolean): Promise<GenericObject> {
        return getProps(this, KupCellProps, descriptions);
    }
    /**
     * This method is used to trigger a new render of the component.
     */
    @Method()
    async refresh(): Promise<void> {
        forceUpdate(this);
    }
    /**
     * Removes the given CSS classes from the cell's data.
     * @param {string[]} classes - Array of CSS classes.
     */
    @Method()
    async removeCssClasses(classes?: string[]): Promise<void> {
        if (!this.data.cssClass) {
            return;
        }
        if (classes) {
            for (let index = 0; index < classes.length; index++) {
                const cssClass = classes[index];
                if (this.data.cssClass.indexOf(cssClass) > 0) {
                    this.data.cssClass.replace(new RegExp(cssClass, 'g'), '');
                }
            }
        }
        this.refresh();
    }
    /**
     * Sets the props to the component.
     * @param {GenericObject} props - Object containing props that will be set to the component.
     */
    @Method()
    async setProps(props: GenericObject): Promise<void> {
        setProps(this, KupCellProps, props);
    }

    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/

    private didRenderInteractables() {
        if (this.dragEnabled) {
            const dataCb: KupDragDataTransferCallback = () => {
                return {
                    cell: this.data,
                    column: this.generateColumn(),
                    id: this.rootElement.id,
                    multiple: false,
                    row: this.generateRow(),
                };
            };

            this.kupManager.interact.draggable(
                this.rootElement.shadowRoot.querySelector(
                    '#' + componentWrapperId
                ),
                {
                    cursorChecker() {
                        return null;
                    },
                },
                {
                    callback: dataCb,
                },
                KupDragEffect.BADGE
            );
        }
    }

    private generateColumn(): Column {
        const colname: string =
            this.data && this.data.obj && this.data.obj.t
                ? this.data.obj.t + '|' + this.data.obj.p
                : 'KUPCELL';
        const coltitle: string =
            this.data && this.data.obj && this.data.obj.t
                ? this.data.obj.t + '|' + this.data.obj.p
                : this.kupManager.language.translate(
                      KupLanguageGeneric.EMPTY_OBJECT
                  );
        return {
            name: colname,
            title: coltitle,
        };
    }

    private generateRow(): Row {
        const col: Column = this.generateColumn();
        const row: Row = { cells: {} };
        row.cells[col.name] = this.data;
        return row;
    }

    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/

    componentWillLoad() {
        this.kupManager.debug.logLoad(this, false);
        this.kupManager.language.register(this);
        this.kupManager.theme.register(this);
    }

    componentDidLoad() {
        this.kupManager.debug.logLoad(this, true);
    }

    componentWillRender() {
        this.kupManager.debug.logRender(this, false);
    }

    componentDidRender() {
        this.didRenderInteractables();
        this.kupManager.debug.logRender(this, true);
    }

    disconnectedCallback() {
        this.kupManager.language.unregister(this);
        this.kupManager.theme.unregister(this);
    }

    render() {
        const props: FCellProps = {
            cell: this.data,
            column: this.generateColumn(),
            component: this,
            density: this.density,
            editable: this.data.isEditable,
            renderKup: true,
            row: this.generateRow(),
        };

        const customStyle: string = this.kupManager.theme.setCustomStyle(
            this.rootElement as KupComponent
        );

        return (
            <Host>
                {customStyle ? <style>{customStyle}</style> : null}
                <div
                    id={componentWrapperId}
                    onClick={(e: MouseEvent & { target: HTMLElement }) =>
                        this.onKupClick(e)
                    }
                >
                    <FCell {...props}></FCell>
                </div>
            </Host>
        );
    }
}
