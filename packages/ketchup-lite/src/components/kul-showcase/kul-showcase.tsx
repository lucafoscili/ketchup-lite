import {
    Component,
    Element,
    forceUpdate,
    h,
    Host,
    Method,
    Prop,
    State,
    VNode,
} from '@stencil/core';
import { GenericObject } from '../../types/GenericTypes';
import { KulDebugLifecycleInfo } from '../../managers/kul-debug/kul-debug-declarations';
import { getProps } from '../../utils/componentUtils';
import { kulManagerInstance } from '../../managers/kul-manager/kul-manager';
import {
    KulShowcaseProps,
    KulShowcaseTitle,
} from './kul-showcase-declarations';
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from '../../variables/GenericVariables';
import {
    KUL_DOC,
    KUL_SHOWCASE_COMPONENTS,
    KUL_SHOWCASE_FRAMEWORK,
    KUL_SHOWCASE_UTILITIES,
} from './kul-showcase-data';
import { KulCardCustomEvent, KulDataDataset } from '../../components';
import { KulCardEventPayload } from '../kul-card/kul-card-declarations';

@Component({
    assetsDirs: ['assets/media'],
    tag: 'kul-showcase',
    styleUrl: 'kul-showcase.scss',
    shadow: true,
})
export class KulShowcase {
    /**
     * References the root HTML element of the component (<kul-showcase>).
     */
    @Element() rootElement: HTMLKulShowcaseElement;

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
     * String keeping track of the current component being navigated by the user.
     * @default ""
     */
    @State() currentComponent = '';
    /**
     * String keeping track of the current framework being navigated by the user.
     * @default ""
     */
    @State() currentFramework = '';
    /**
     * String keeping track of the current utility being accessed by the user.
     * @default ""
     */
    @State() currentUtility = '';

    /*-------------------------------------------------*/
    /*                    P r o p s                    */
    /*-------------------------------------------------*/

    /**
     * Custom style of the component.
     * @default ""
     */
    @Prop({ mutable: true, reflect: true }) kulStyle = '';

    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/

    #kulManager = kulManagerInstance();

    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/

    /**
     * Fetches debug information of the component's current state.
     * @returns {Promise<KulDebugLifecycleInfo>} A promise that resolves with the debug information object.
     */
    @Method()
    async getDebugInfo(): Promise<KulDebugLifecycleInfo> {
        return this.debugInfo;
    }
    /**
     * Used to retrieve component's props values.
     * @param {boolean} descriptions - When provided and true, the result will be the list of props with their description.
     * @returns {Promise<GenericObject>} List of props as object, each key will be a prop.
     */
    @Method()
    async getProps(descriptions?: boolean): Promise<GenericObject> {
        return getProps(this, KulShowcaseProps, descriptions);
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

    #comps(type: KulShowcaseTitle): VNode {
        const switchType = () => {
            switch (type) {
                case 'Components':
                    return this.currentComponent.toLowerCase();
                case 'Framework':
                    return this.currentFramework.toLowerCase();
                case 'Utilities':
                    return this.currentUtility.toLowerCase();
            }
        };
        const Tag = 'kul-showcase-' + switchType();
        return Tag ? <Tag /> : null;
    }

    #cards(type: KulShowcaseTitle) {
        const cards: VNode[] = [];
        const dataset =
            type === 'Components'
                ? KUL_SHOWCASE_COMPONENTS
                : type === 'Framework'
                  ? KUL_SHOWCASE_FRAMEWORK
                  : KUL_SHOWCASE_UTILITIES;

        dataset.nodes.forEach((node) => {
            const kulData: KulDataDataset = {
                nodes: [
                    {
                        cells: {
                            icon: {
                                shape: 'image',
                                value: node.icon,
                            },
                            text1: {
                                value: this.#kulManager.data.cell.stringify(
                                    node.value
                                ),
                            },
                            text2: { value: '' },
                            text3: { value: node.description },
                        },
                        id: node.id,
                    },
                ],
            };
            const onEvent: (
                event: KulCardCustomEvent<KulCardEventPayload>
            ) => void = (e) => {
                if (e.detail.eventType === 'click') {
                    switch (type) {
                        case 'Components':
                            this.currentComponent = node.id;
                            console.log(
                                `Selected component: `,
                                this.currentComponent
                            );
                            break;

                        case 'Framework':
                            this.currentFramework = node.id;
                            console.log(
                                `Selected framework: `,
                                this.currentFramework
                            );
                            break;
                        case 'Utilities':
                            this.currentUtility = node.id;
                            console.log(
                                `Selected utility: `,
                                this.currentUtility
                            );
                            break;
                    }
                }
            };
            cards.push(
                <kul-card
                    id={node.id}
                    kulData={kulData}
                    kulSizeX="300px"
                    kulSizeY="300px"
                    onKul-card-event={onEvent}
                ></kul-card>
            );
        });
        return cards;
    }

    #prepHeader(title: KulShowcaseTitle): VNode {
        const current =
            title === 'Components'
                ? this.currentComponent
                : title === 'Utilities'
                  ? this.currentUtility
                  : this.currentFramework;
        return (
            <div class="header">
                <h2>{current ? current : title}</h2>
                <div class={`navigation ${current ? 'active' : ''}`}>
                    <kul-button
                        class={'kul-full-height kul-full-width'}
                        kulIcon="home"
                        onClick={() => {
                            switch (title) {
                                case 'Components':
                                    this.currentComponent = '';
                                    break;
                                case 'Framework':
                                    this.currentFramework = '';
                                    break;
                                case 'Utilities':
                                    this.currentUtility = '';
                                    break;
                            }
                        }}
                    ></kul-button>
                </div>
            </div>
        );
    }

    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/

    componentWillLoad() {
        this.#kulManager.theme.register(this);
    }

    componentDidLoad() {
        this.#kulManager.debug.updateDebugInfo(this, 'did-load');
    }

    componentWillRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'will-render');
    }

    componentDidRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }

    render() {
        return (
            <Host>
                {this.kulStyle ? (
                    <style id={KUL_STYLE_ID}>
                        {this.#kulManager.theme.setKulStyle(this)}
                    </style>
                ) : undefined}
                <div id={KUL_WRAPPER_ID}>
                    <div class="showcase">
                        <kul-article kulData={KUL_DOC}></kul-article>
                        <div class="link-wrapper">
                            <kul-button
                                aria-label="Open GitHub Repository"
                                class={'link'}
                                kulIcon="github"
                                kulLabel="GitHub"
                                kulStyling="floating"
                                onClick={() =>
                                    window.open(
                                        'https://github.com/lucafoscili/ketchup-lite',
                                        '_blank'
                                    )
                                }
                                title="Open GitHub Repository"
                            ></kul-button>
                            <kul-button
                                aria-label="Open npm Package"
                                class={'link'}
                                kulIcon="npm"
                                kulLabel="npm"
                                kulStyling="floating"
                                onClick={() =>
                                    window.open(
                                        'https://www.npmjs.com/package/ketchup-lite',
                                        '_blank'
                                    )
                                }
                                title="Open npm Package"
                            ></kul-button>
                        </div>
                        <div class="section">
                            {this.#prepHeader('Components')}
                            <div class="flex-wrapper flex-wrapper--responsive">
                                {this.currentComponent
                                    ? this.#comps('Components')
                                    : this.#cards('Components')}
                            </div>
                        </div>
                        <div class="section">
                            {this.#prepHeader('Framework')}
                            <div class="flex-wrapper flex-wrapper--responsive">
                                {this.currentFramework
                                    ? this.#comps('Framework')
                                    : this.#cards('Framework')}
                            </div>
                        </div>
                        <div class="section">
                            {this.#prepHeader('Utilities')}
                            <div class="flex-wrapper flex-wrapper--responsive">
                                {this.currentUtility
                                    ? this.#comps('Utilities')
                                    : this.#cards('Utilities')}
                            </div>
                        </div>
                    </div>
                </div>
            </Host>
        );
    }

    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
}
