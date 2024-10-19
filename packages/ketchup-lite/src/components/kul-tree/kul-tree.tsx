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
import {
    KulTreeEvent,
    KulTreeEventArguments,
    KulTreeEventPayload,
    KulTreeProps,
} from './kul-tree-declarations';
import { kulManagerInstance } from '../../managers/kul-manager/kul-manager';
import { getProps } from '../../utils/componentUtils';
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from '../../variables/GenericVariables';
import { KulDebugLifecycleInfo } from '../../managers/kul-debug/kul-debug-declarations';
import { GenericObject } from '../../types/GenericTypes';
import { KulDataDataset, KulDataNode } from '../../components';
import { TreeNode } from './node/kul-tree-node';
import { KulTreeNodeProps } from './node/kul-tree-node-declarations';
import {
    KulLanguageGeneric,
    KulLanguageSearch,
} from '../../managers/kul-language/kul-language-declarations';
import { KulTextfieldEventPayload } from '../kul-textfield/kul-textfield-declarations';

@Component({
    tag: 'kul-tree',
    styleUrl: 'kul-tree.scss',
    shadow: true,
})
export class KulTree {
    /**
     * References the root HTML element of the component (<kul-tree>).
     */
    @Element() rootElement: HTMLKulTreeElement;

    /*-------------------------------------------------*/
    /*                   S t a t e s                   */
    /*-------------------------------------------------*/

    /**
     * Debug information.
     */
    @State() debugInfo: KulDebugLifecycleInfo = {
        endTime: 0,
        renderCount: 0,
        renderEnd: 0,
        renderStart: 0,
        startTime: performance.now(),
    };
    /**
     * Set of expanded nodes.
     */
    @State() expandedNodes: Set<KulDataNode> = new Set();
    /**
     * When filters are active, this set contains the nodes that don't match the filter.
     */
    @State() hiddenNodes: Set<KulDataNode> = new Set();
    /**
     * Selected node.
     */
    @State() selectedNode: KulDataNode = null;

    /*-------------------------------------------------*/
    /*                    P r o p s                    */
    /*-------------------------------------------------*/

    /**
     * When enabled, the first level of depth will create an accordion-style appearance for nodes.
     * @default false
     */
    @Prop({ mutable: true, reflect: true }) kulAccordionLayout = true;
    /**
     * The actual data of the tree.
     * @default null
     */
    @Prop({ mutable: true }) kulData: KulDataDataset = null;
    /**
     * When true, displays a text field which enables filtering the dataset of the tree.
     * @default null
     */
    @Prop({ mutable: true }) kulFilter = true;
    /**
     * Sets the initial expanded nodes based on the specified depth.
     * If the property is not provided, all nodes in the tree will be expanded.
     * @default null
     */
    @Prop({ mutable: true }) kulInitialExpansionDepth: number;
    /**
     * When set to true, the pointerdown event will trigger a ripple effect.
     * @default true
     */
    @Prop({ mutable: true, reflect: true }) kulRipple = true;
    /**
     * When true, nodes can be selected.
     * @default null
     */
    @Prop({ mutable: true, reflect: true }) kulSelectable = true;
    /**
     * Enables customization of the component's style.
     * @default ""
     */
    @Prop({ mutable: true, reflect: true }) kulStyle = '';

    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/

    #filterTimeout: ReturnType<typeof setTimeout>;
    #filterValue = '';
    #kulManager = kulManagerInstance();
    #rippleSurface: { [id: string]: HTMLElement } = {};

    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/

    /**
     * Describes event emitted.
     */
    @Event({
        eventName: 'kul-tree-event',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kulEvent: EventEmitter<KulTreeEventPayload>;

    onKulEvent(
        e: Event | CustomEvent,
        eventType: KulTreeEvent,
        args?: KulTreeEventArguments
    ) {
        const { expansion, node } = args || {};
        switch (eventType) {
            case 'click':
                if (expansion && node.children?.length) {
                    if (this.expandedNodes.has(node)) {
                        this.expandedNodes.delete(node);
                    } else {
                        this.expandedNodes.add(node);
                    }
                    this.expandedNodes = new Set(this.expandedNodes);
                } else if (node) {
                    this.selectedNode = node;
                }
                break;
            case 'pointerdown':
                if (this.kulRipple) {
                    this.#kulManager.theme.ripple.trigger(
                        e as PointerEvent,
                        this.#rippleSurface[node.id]
                    );
                }
                break;
        }
        this.kulEvent.emit({
            comp: this,
            eventType,
            id: this.rootElement.id,
            originalEvent: e,
            node,
        });
    }

    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/

    /**
     * Retrieves the debug information reflecting the current state of the component.
     * @returns {Promise<KulDebugLifecycleInfo>} A promise that resolves to a KulDebugLifecycleInfo object containing debug information.
     */
    @Method()
    async getDebugInfo(): Promise<KulDebugLifecycleInfo> {
        return this.debugInfo;
    }
    /**
     * Retrieves the properties of the component, with optional descriptions.
     * @param {boolean} descriptions - If true, returns properties with descriptions; otherwise, returns properties only.
     * @returns {Promise<GenericObject>} A promise that resolves to an object where each key is a property name, optionally with its description.
     */
    @Method()
    async getProps(descriptions?: boolean): Promise<GenericObject> {
        return getProps(this, KulTreeProps, descriptions);
    }
    /**
     * Triggers a re-render of the component to reflect any state changes.
     */
    @Method()
    async refresh(): Promise<void> {
        forceUpdate(this);
    }
    /**
     * Initiates the unmount sequence, which removes the component from the DOM after a delay.
     * @param {number} ms - Number of milliseconds
     */
    @Method()
    async unmount(ms: number = 0): Promise<void> {
        setTimeout(() => {
            this.onKulEvent(new CustomEvent('unmount'), 'unmount');
            this.rootElement.remove();
        }, ms);
    }

    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/

    #filter(e: CustomEvent<KulTextfieldEventPayload>) {
        clearTimeout(this.#filterTimeout);
        this.#filterTimeout = setTimeout(() => {
            this.#filterValue = e.detail.inputValue?.toLowerCase();
            if (!this.#filterValue) {
                this.hiddenNodes = new Set();
            } else {
                const filter = this.#kulManager.data.node.filter(
                    this.kulData,
                    { value: this.#filterValue },
                    true
                );
                this.hiddenNodes = new Set(filter.remainingNodes);
                if (filter.ancestorNodes) {
                    filter.ancestorNodes.forEach((ancestor) => {
                        this.hiddenNodes.delete(ancestor);
                    });
                }
            }
        }, 300);
    }

    #prepTree(): VNode[] {
        const elements: VNode[] = [];
        const nodes = this.kulData.nodes;
        for (let index = 0; index < nodes.length; index++) {
            const node = nodes[index];
            this.#recursive(elements, node, 0);
        }
        return elements.length ? (
            elements
        ) : this.#filterValue ? (
            <div class="no-matches">
                <div class="no-matches__icon"></div>
                <div class="no-matches__text">
                    No matches found for "
                    <strong class="no-matches__filter">
                        {this.#filterValue}
                    </strong>
                    ".
                </div>
            </div>
        ) : undefined;
    }

    #recursive(elements: VNode[], node: KulDataNode, depth: number) {
        if (!this.debugInfo.endTime) {
            if (
                this.kulInitialExpansionDepth === null ||
                this.kulInitialExpansionDepth === undefined ||
                this.kulInitialExpansionDepth > depth
            ) {
                this.expandedNodes.add(node);
            }
        }
        const isExpanded = this.#filterValue
            ? true
            : this.expandedNodes.has(node);
        const isHidden = this.hiddenNodes.has(node);
        const isSelected = this.selectedNode === node;
        const nodeProps: KulTreeNodeProps = {
            accordionLayout: this.kulAccordionLayout && depth === 0,
            depth,
            elements: {
                ripple: (
                    <div
                        ref={(el) => {
                            if (el && this.kulRipple) {
                                this.#rippleSurface[node.id] = el;
                            }
                        }}
                    ></div>
                ),
                value: (
                    <div class="node__value">
                        {this.#kulManager.data.cell.stringify(node.value)}
                    </div>
                ),
            },
            events: {
                onClick: (e) => {
                    this.onKulEvent(e, 'click', { node });
                },
                onClickExpand: (e) => {
                    this.onKulEvent(e, 'click', { expansion: true, node });
                },
                onPointerDown: (e) => {
                    this.onKulEvent(e, 'pointerdown', { node });
                },
            },
            expanded: isExpanded,
            node,
            selected: isSelected,
        };

        if (!isHidden) {
            elements.push(<TreeNode {...nodeProps}></TreeNode>);
            if (isExpanded) {
                node.children?.map((child) =>
                    this.#recursive(elements, child, depth + 1)
                );
            }
        }
    }

    #setExpansion(node: KulDataNode) {
        if (this.expandedNodes.has(node)) {
            this.expandedNodes.delete(node);
        } else {
            this.expandedNodes.add(node);
        }

        if (node.children?.length) {
            node.children.forEach((child) => {
                this.#setExpansion(child);
            });
        }
    }

    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/

    componentWillLoad() {
        this.#kulManager.theme.register(this);
    }

    componentDidLoad() {
        this.onKulEvent(new CustomEvent('ready'), 'ready');
        this.#kulManager.debug.updateDebugInfo(this, 'did-load');
    }

    componentWillRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'will-render');
    }

    componentDidRender() {
        if (Object.keys(this.#rippleSurface).length) {
            for (const key in this.#rippleSurface) {
                if (
                    Object.prototype.hasOwnProperty.call(
                        this.#rippleSurface,
                        key
                    )
                ) {
                    const surface = this.#rippleSurface[key];
                    this.#kulManager.theme.ripple.setup(surface);
                }
            }
        }

        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }

    render() {
        const isEmpty = !!!this.kulData?.nodes?.length;
        this.#rippleSurface = {};

        return (
            <Host>
                {this.kulStyle ? (
                    <style id={KUL_STYLE_ID}>
                        {this.#kulManager.theme.setKulStyle(this)}
                    </style>
                ) : undefined}
                <div id={KUL_WRAPPER_ID}>
                    <div class="tree">
                        {this.kulFilter ? (
                            <kul-textfield
                                kulIcon="magnify"
                                kulFullWidth={true}
                                kulLabel={this.#kulManager.language.translate(
                                    KulLanguageSearch.SEARCH
                                )}
                                kulStyling="flat"
                                onKul-textfield-event={(e) => {
                                    this.onKulEvent(e, 'kul-event');
                                    if (e.detail.eventType === 'input') {
                                        this.#filter(e);
                                    }
                                }}
                            ></kul-textfield>
                        ) : undefined}
                        {isEmpty ? (
                            <div class="empty-data">
                                <div class="empty-data__text">
                                    {this.#kulManager.language.translate(
                                        KulLanguageGeneric.EMPTY_DATA
                                    )}
                                </div>
                            </div>
                        ) : (
                            this.#prepTree()
                        )}
                    </div>
                </div>
            </Host>
        );
    }

    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
}
