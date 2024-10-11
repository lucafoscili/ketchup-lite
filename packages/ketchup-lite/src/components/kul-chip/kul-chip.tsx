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
    VNode,
} from '@stencil/core';
import {
    KulDataDataset,
    KulDataNode,
} from '../../managers/kul-data/kul-data-declarations';
import {
    KulChipEvent,
    KulChipEventArguments,
    KulChipEventPayload,
    KulChipProps,
    KulChipStyling,
} from './kul-chip-declarations';
import { kulManagerInstance } from '../../managers/kul-manager/kul-manager';
import { GenericObject, KulDataCyAttributes } from '../../types/GenericTypes';
import { getProps } from '../../utils/componentUtils';
import { KulDebugComponentInfo } from '../../managers/kul-debug/kul-debug-declarations';
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from '../../variables/GenericVariables';

@Component({
    tag: 'kul-chip',
    styleUrl: 'kul-chip.scss',
    shadow: true,
})
export class KulChip {
    /**
     * References the root HTML element of the component (<kul-chip>).
     */
    @Element() rootElement: HTMLKulChipElement;

    /*-------------------------------------------------*/
    /*                   S t a t e s                   */
    /*-------------------------------------------------*/

    /**
     * Debug information.
     */
    @State() debugInfo: KulDebugComponentInfo = {
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
     * Children of a collapsed node.
     */
    @State() hiddenNodes: Set<KulDataNode> = new Set();
    /**
     * The selected chip items.
     * @default []
     */
    @State() selectedNodes: Set<KulDataNode> = new Set();

    /*-------------------------------------------------*/
    /*                    P r o p s                    */
    /*-------------------------------------------------*/

    /**
     * The data of the chip list.
     * @default []
     */
    @Prop({ mutable: true }) kulData: KulDataDataset = null;
    /**
     * When set to true, the pointerdown event will trigger a ripple effect.
     * @default true
     */
    @Prop({ mutable: true, reflect: true }) kulRipple = true;
    /**
     * Custom style of the component.
     * @default ""
     */
    @Prop({ mutable: true }) kulStyle = '';
    /**
     * Styling of the chip component, includes: "choice", "input", "filter" and "standard".
     * @default ""
     */
    @Prop({ mutable: true }) kulStyling: KulChipStyling = 'standard';

    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/

    #nodeItems: VNode[] = [];
    #kulManager = kulManagerInstance();
    #rippleSurface: HTMLElement[] = [];

    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/

    /**
     * Describes event emitted.
     */
    @Event({
        eventName: 'kul-chip-event',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kulEvent: EventEmitter<KulChipEventPayload>;

    onKulEvent(
        e: Event | CustomEvent,
        eventType: KulChipEvent,
        args?: KulChipEventArguments
    ) {
        const { expansion, node } = args || {};
        switch (eventType) {
            case 'click':
                if (expansion && this.#hasChildren(node)) {
                    if (this.expandedNodes.has(node)) {
                        this.expandedNodes.delete(node);
                    } else {
                        this.expandedNodes.add(node);
                    }
                    this.expandedNodes = new Set(this.expandedNodes);
                } else if (node) {
                    if (this.selectedNodes.has(node)) {
                        this.selectedNodes.delete(node);
                    } else {
                        this.selectedNodes.add(node);
                    }
                    this.selectedNodes = new Set(this.selectedNodes);
                }
                break;
            case 'delete':
                const nodeIndex = this.kulData?.nodes?.indexOf(node);
                if (nodeIndex > -1) {
                    this.kulData.nodes.splice(nodeIndex, 1);
                    this.refresh();
                }
                break;
            case 'pointerdown':
                if (this.kulRipple && this.#isClickable()) {
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
            selectedNodes: this.selectedNodes,
        });
    }

    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/

    /**
     * Fetches debug information of the component's current state.
     * @returns {Promise<KulDebugComponentInfo>} A promise that resolves with the debug information object.
     */
    @Method()
    async getDebugInfo(): Promise<KulDebugComponentInfo> {
        return this.debugInfo;
    }
    /**
     * Used to retrieve component's props values.
     * @param {boolean} descriptions - When provided and true, the result will be the chip of props with their description.
     * @returns {Promise<GenericObject>} Chip of props as object, each key will be a prop.
     */
    @Method()
    async getProps(descriptions?: boolean): Promise<GenericObject> {
        return getProps(this, KulChipProps, descriptions);
    }
    /**
     * Returns the selected nodes.
     * @returns {Promise<KulDataNode[]>} Selected nodes.
     */
    @Method()
    async getSelectedNodes(): Promise<Set<KulDataNode>> {
        return this.selectedNodes;
    }
    /**
     * Selects one or more nodes in the chip component.
     * @param {KulDataNode[] | string[]} nodes - An array of KulDataNode objects or node IDs to be selected.
     * @returns {Promise<void>}
     */
    @Method()
    async setSelectedNodes(
        nodes: (KulDataNode[] | string[]) & Array<any>
    ): Promise<void> {
        const nodesToAdd: Set<KulDataNode> = new Set();

        const isStringArray =
            Array.isArray(nodes) &&
            nodes.every((item) => typeof item === 'string');

        this.kulData?.nodes?.forEach((n: KulDataNode) => {
            if (isStringArray) {
                if (typeof n.id === 'string' && nodes.includes(n.id)) {
                    nodesToAdd.add(n);
                }
            } else {
                if (nodes.includes(n)) {
                    nodesToAdd.add(n);
                }
            }
        });
        this.selectedNodes = nodesToAdd;
    }
    /**
     * This method is used to trigger a new render of the component.
     */
    @Method()
    async refresh(): Promise<void> {
        forceUpdate(this);
    }

    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/

    #hasChildren(node: KulDataNode) {
        return !!(node.children && node.children.length);
    }

    #hasIconOnly(node: KulDataNode) {
        return !!(node.icon && !node.value);
    }

    #isChoice() {
        return this.kulStyling === 'choice';
    }

    #isClickable() {
        return this.kulStyling === 'choice' || this.kulStyling === 'filter';
    }

    #isExpanded(node: KulDataNode) {
        return this.expandedNodes.has(node);
    }

    #isFilter() {
        return this.kulStyling === 'filter';
    }

    #isInput() {
        return this.kulStyling === 'input';
    }

    #isSelected(node: KulDataNode) {
        return this.selectedNodes.has(node);
    }

    #prepChip(node: KulDataNode, i: number) {
        const className = {
            chip: true,
            'chip--only-icon': this.#hasIconOnly(node),
            'chip--selected': this.#isSelected(node),
        };
        return (
            <div
                class={className}
                data-value={node.id}
                onClick={(e) => {
                    this.onKulEvent(e, 'click', { node });
                }}
                role="row"
                title={node.description ?? ''}
            >
                {this.#prepRipple(node)}
                <span class="indent"></span>
                {this.#prepIcons(node)}
                <span
                    role="button"
                    tabindex={i}
                    class="chip__primary-action"
                    data-cy={KulDataCyAttributes.INPUT}
                    onBlur={(e) => {
                        this.onKulEvent(e, 'blur', { node });
                    }}
                    onFocus={(e) => {
                        this.onKulEvent(e, 'focus', { node });
                    }}
                >
                    <span class="chip__text">{node.value}</span>
                </span>
                {this.#isInput() && this.#prepDeleteIcon(node)}
            </div>
        );
    }

    #prepChipSet() {
        const elements: VNode[] = [];

        const nodeCount = this.kulData?.nodes?.length;
        for (let i = 0; nodeCount && i < nodeCount; i++) {
            this.#nodeItems = [];
            const node = this.kulData.nodes[i];
            this.#prepNode(node, 0);
            elements.push(<div class="node">{this.#nodeItems}</div>);
        }

        return elements;
    }

    #prepDeleteIcon(node: KulDataNode) {
        const path = getAssetPath(`./assets/svg/clear.svg`);
        const style = {
            mask: `url('${path}') no-repeat center`,
            webkitMask: `url('${path}') no-repeat center`,
        };
        return (
            <div
                class="chip__icon chip__icon--trailing"
                data-cy={KulDataCyAttributes.BUTTON}
                key={node.id + '_delete'}
                onClick={(e) => {
                    this.onKulEvent(e, 'delete', { node });
                }}
                style={style}
            ></div>
        );
    }

    #prepIcons(node: KulDataNode) {
        const icons: VNode[] = [];

        const className = {
            chip__icon: true,
            'chip__icon--leading': true,
            'chip__icon--leading-hidden':
                this.kulStyling === 'filter' && this.#isSelected(node),
        };

        if (node.icon) {
            const path = getAssetPath(`./assets/svg/${node.icon}.svg`);
            const style = {
                mask: `url('${path}') no-repeat center`,
                webkitMask: `url('${path}') no-repeat center`,
            };
            icons.push(<div class={className} style={style}></div>);
        }

        if (this.#isFilter()) {
            icons.push(
                <span class="chip__checkmark">
                    <svg class="chip__checkmark-svg" viewBox="-2 -3 30 30">
                        <path
                            class="chip__checkmark-path"
                            fill="none"
                            stroke="black"
                            d="M1.73,12.91 8.1,19.28 22.79,4.59"
                        />
                    </svg>
                </span>
            );
        }

        return icons;
    }

    #prepNode(node: KulDataNode, indent: number) {
        const className = {
            'chip-wrapper': true,
            'chip-wrapper--hidden-children':
                this.#hasChildren(node) && !this.#showChildren(node),
        };
        const indentStyle = {
            ['--kul_chip_indent_offset']: indent.toString(),
        };

        this.#nodeItems.push(
            <div class={className}>
                <div class="indent" style={indentStyle}></div>
                {this.#hasChildren(node) ? (
                    <div
                        class={`node__expand ${this.#isExpanded(node) ? 'node__expand--expanded' : ''}`}
                        onClick={(e) => {
                            this.onKulEvent(e, 'click', {
                                expansion: true,
                                node,
                            });
                        }}
                    ></div>
                ) : indent ? (
                    <div class={`node__expand node__expand--placeholder`}></div>
                ) : null}
                {this.#prepChip(node, indent)}
            </div>
        );

        if (this.#showChildren(node)) {
            for (let index = 0; index < node.children.length; index++) {
                if (node.children[index]) {
                    this.#prepNode(node.children[index], indent + 1);
                }
            }
        }
    }

    #prepRipple(node: KulDataNode) {
        if (this.kulRipple && this.#isClickable()) {
            return (
                <div
                    onPointerDown={(e) =>
                        this.onKulEvent(e, 'pointerdown', { node })
                    }
                    ref={(el) => {
                        if (el && this.kulRipple) {
                            this.#rippleSurface[node.id] = el;
                        }
                    }}
                ></div>
            );
        }
    }

    #showChildren(node: KulDataNode) {
        return this.expandedNodes.has(node);
    }

    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/

    componentWillLoad() {
        this.#kulManager.theme.register(this);
    }

    componentDidLoad() {
        if (this.#rippleSurface?.length) {
            this.#rippleSurface.forEach((el) => {
                this.#kulManager.theme.ripple.setup(el);
            });
        }
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
        this.#nodeItems = [];
        const className = {
            'chip-set': true,
            'chip-set--choice': this.#isChoice(),
            'chip-set--filter': this.#isFilter(),
            'chip-set--input': this.#isInput(),
        };

        return (
            <Host>
                {this.kulStyle ? (
                    <style id={KUL_STYLE_ID}>
                        {this.#kulManager.theme.setKulStyle(this)}
                    </style>
                ) : undefined}
                <div id={KUL_WRAPPER_ID}>
                    <div class={className} role="grid">
                        {this.#prepChipSet()}
                    </div>
                </div>
            </Host>
        );
    }

    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
}
