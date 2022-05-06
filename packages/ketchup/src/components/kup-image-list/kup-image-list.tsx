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
    State,
    VNode,
} from '@stencil/core';
import { MDCRipple } from '@material/ripple';
import {
    KupManager,
    kupManagerInstance,
} from '../../managers/kup-manager/kup-manager';
import { GenericObject, KupComponent } from '../../types/GenericTypes';
import {
    KupImageListEventPayload,
    KupImageListProps,
} from './kup-image-list-declarations';
import { getProps, setProps } from '../../utils/utils';
import { componentWrapperId } from '../../variables/GenericVariables';
import { KupDataNode } from '../../managers/kup-data/kup-data-declarations';
import { FImage } from '../../f-components/f-image/f-image';
import { FImageProps } from '../../f-components/f-image/f-image-declarations';
import { FButton } from '../../f-components/f-button/f-button';
import {
    FButtonProps,
    FButtonStyling,
} from '../../f-components/f-button/f-button-declarations';
import { KupLanguageGeneric } from '../../managers/kup-language/kup-language-declarations';

@Component({
    tag: 'kup-image-list',
    styleUrl: 'kup-image-list.scss',
    shadow: true,
})
export class KupImageList {
    /**
     * References the root HTML element of the component (<kup-image-list>).
     */
    @Element() rootElement: HTMLElement;

    /*-------------------------------------------------*/
    /*                   S t a t e s                   */
    /*-------------------------------------------------*/

    @State() currentNode: KupDataNode = null;

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
     * List of images.
     * @default []
     */
    @Prop() data: KupDataNode[] = [];
    /**
     * When enabled displays Material's ripple effect on clicked items.
     * @default true
     */
    @Prop() ripple: boolean = true;

    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/

    #kupManager: KupManager = kupManagerInstance();
    #backProps: FButtonProps = {
        icon: 'arrow_back',
        label: this.#kupManager.language.translate(KupLanguageGeneric.BACK),
        onClick: () => {
            this.currentNode = this.#kupManager.data.node.getParent(
                this.data,
                this.currentNode
            );
        },
        styling: FButtonStyling.FLAT,
        wrapperClass: 'navigation-bar__back',
    };
    #topProps: FButtonProps = {
        icon: 'arrow_upward',
        label: this.#kupManager.language.translate(KupLanguageGeneric.TOP),
        onClick: () => {
            this.currentNode = null;
        },
        styling: FButtonStyling.FLAT,
        wrapperClass: 'navigation-bar__top',
    };

    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/

    @Event({
        eventName: 'kup-imagelist-click',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kupClick: EventEmitter<KupImageListEventPayload>;

    onKupClick(node: KupDataNode) {
        if (node.children) {
            this.currentNode = node;
        }
        this.kupClick.emit({
            comp: this,
            id: this.rootElement.id,
            node: node,
        });
    }

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
        return getProps(this, KupImageListProps, descriptions);
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
        setProps(this, KupImageListProps, props);
    }

    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/

    #createItem(node: KupDataNode): VNode {
        const props: FImageProps = {
            fit: true,
            resource: node.icon,
            title: node.title,
            wrapperClass: 'image-list__image',
        };
        const image = <FImage {...props}></FImage>;
        const label = <div class="image-list__label">{node.value}</div>;
        return (
            <div class="image-list__wrapper">
                {image}
                {label}
            </div>
        );
    }

    #createList(): VNode[] {
        const nodes: VNode[] = [];
        const items = this.currentNode ? this.currentNode.children : this.data;
        for (let index = 0; items && index < items.length; index++) {
            const node = items[index];
            const classObj = {
                'image-list__item': true,
                'mdc-ripple-surface': this.ripple ? true : false,
            };
            const item: VNode = (
                <div onClick={() => this.onKupClick(node)} class={classObj}>
                    {this.#createItem(node)}
                </div>
            );
            nodes.push(item);
        }
        return nodes;
    }

    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/

    componentWillLoad() {
        this.#kupManager.debug.logLoad(this, false);
        this.#kupManager.language.register(this);
        this.#kupManager.theme.register(this);
    }

    componentDidLoad() {
        this.#kupManager.debug.logLoad(this, true);
    }

    componentWillRender() {
        this.#kupManager.debug.logRender(this, false);
    }

    componentDidRender() {
        const root = this.rootElement.shadowRoot;
        if (root && this.ripple) {
            const rippleCells = root.querySelectorAll(
                '.mdc-ripple-surface:not(.mdc-ripple-upgraded)'
            );
            if (rippleCells) {
                for (let i = 0; i < rippleCells.length; i++) {
                    MDCRipple.attachTo(rippleCells[i]);
                }
            }
        }
        this.#kupManager.debug.logRender(this, true);
    }

    render() {
        const hasNavigation = !!this.currentNode;
        return (
            <Host>
                <style>
                    {this.#kupManager.theme.setKupStyle(
                        this.rootElement as KupComponent
                    )}
                </style>
                <div id={componentWrapperId}>
                    <div class="navigation-bar">
                        {hasNavigation ? (
                            <div class="navigation-bar__wrapper">
                                <FButton {...this.#backProps}></FButton>
                                <div class="navigation-bar__title">
                                    <FImage
                                        fit={true}
                                        resource={this.currentNode.icon}
                                        sizeX="1.25em"
                                        sizeY="1.25em"
                                        wrapperClass='class="navigation-bar__title__image'
                                    ></FImage>
                                    <div class="navigation-bar__title__label">
                                        {this.currentNode.value}
                                    </div>
                                </div>
                                <FButton {...this.#topProps}></FButton>
                            </div>
                        ) : null}
                    </div>
                    <div class="image-list">{...this.#createList()}</div>
                </div>
            </Host>
        );
    }

    disconnectedCallback() {
        this.#kupManager.language.unregister(this);
        this.#kupManager.theme.unregister(this);
    }
}
