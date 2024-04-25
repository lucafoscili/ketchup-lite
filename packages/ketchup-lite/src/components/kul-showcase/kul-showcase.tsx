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
import { GenericObject, KulEventPayload } from '../../types/GenericTypes';
import { KulDebugComponentInfo } from '../../managers/kul-debug/kul-debug-declarations';
import { getProps } from '../../utils/componentUtils';
import { kulManagerInstance } from '../../managers/kul-manager/kul-manager';
import {
    KulShowcaseEvents,
    KulShowcaseProps,
    KulShowcaseTitle,
} from './kul-showcase-declarations';
import { KUL_WRAPPER_ID } from '../../variables/GenericVariables';
import {
    KUL_SHOWCASE_COMPONENTS,
    KUL_SHOWCASE_FRAMEWORK,
    KUL_SHOWCASE_LAYOUT,
    KUL_SHOWCASE_UTILITIES,
} from './kul-showcase-data';
import {
    KulArticleDataset,
    KulCardCustomEvent,
    KulDataDataset,
} from '../../components';
import { ARTICLE_DOC } from './components/article/kul-showcase-article-data';
import { BADGE_DOC } from './components/badge/kul-showcase-badge-data';
import { BUTTON_DOC } from './components/button/kul-showcase-button-data';
import { CARD_DOC } from './components/card/kul-showcase-card-data';
import { CODE_DOC } from './components/code/kul-showcase-code-data';
import { IMAGE_DOC } from './components/image/kul-showcase-image-data';
import { SPINNER_DOC } from './components/spinner/kul-showcase-spinner-data';
import { SPLASH_DOC } from './components/splash/kul-showcase-splash-data';
import { TOAST_DOC } from './components/toast/kul-showcase-toast-data';
import { UPLOAD_DOC } from './components/upload/kul-showcase-upload-data';

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
    @State() debugInfo: KulDebugComponentInfo = {
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
     * String keeping track of the current layout component being navigated by the user.
     * @default ""
     */
    @State() currentLayout = '';
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
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/

    /**
     * Describes event emitted.
     */
    @Event({
        eventName: 'kul-showcase-event',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kulEvent: EventEmitter<KulEventPayload>;

    onKulEvent(e: Event | CustomEvent, eventType: KulShowcaseEvents) {
        this.kulEvent.emit({
            comp: this,
            eventType,
            id: this.rootElement.id,
            originalEvent: e,
        });
    }

    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/

    /**
     * This methods fixes the ids of showcase's documentation datasets.
     */
    @Method()
    async fixDatasets(): Promise<{ [key: string]: KulArticleDataset }> {
        return {
            article: {
                nodes: this.#kulManager.data.node.fixIds(ARTICLE_DOC.nodes),
            },
            badge: {
                nodes: this.#kulManager.data.node.fixIds(BADGE_DOC.nodes),
            },
            button: {
                nodes: this.#kulManager.data.node.fixIds(BUTTON_DOC.nodes),
            },
            card: {
                nodes: this.#kulManager.data.node.fixIds(CARD_DOC.nodes),
            },
            code: {
                nodes: this.#kulManager.data.node.fixIds(CODE_DOC.nodes),
            },
            image: {
                nodes: this.#kulManager.data.node.fixIds(IMAGE_DOC.nodes),
            },
            spinner: {
                nodes: this.#kulManager.data.node.fixIds(SPINNER_DOC.nodes),
            },
            splash: {
                nodes: this.#kulManager.data.node.fixIds(SPLASH_DOC.nodes),
            },
            toast: {
                nodes: this.#kulManager.data.node.fixIds(TOAST_DOC.nodes),
            },
            upload: {
                nodes: this.#kulManager.data.node.fixIds(UPLOAD_DOC.nodes),
            },
        };
    }
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

    #compsCards(): VNode[] {
        const cards: VNode[] = [];
        KUL_SHOWCASE_COMPONENTS.nodes.forEach((node) => {
            const kulData: KulDataDataset = {
                nodes: [
                    {
                        cells: {
                            icon: { shape: 'image', value: node.icon },
                            text1: { value: node.value },
                            text2: { value: '' },
                            text3: { value: node.description },
                        },
                        id: node.id,
                    },
                ],
            };
            const onEvent: (
                event: KulCardCustomEvent<KulEventPayload>
            ) => void = (e) => {
                if (e.detail.eventType === 'click') {
                    this.currentComponent = node.id;
                    console.log('Selected component: ', this.currentComponent);
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

    #comps(): VNode {
        switch (this.currentComponent) {
            case 'Article':
                return <kul-showcase-article></kul-showcase-article>;
            case 'Badge':
                return <kul-showcase-badge></kul-showcase-badge>;
            case 'Button':
                return <kul-showcase-button></kul-showcase-button>;
            case 'Card':
                return <kul-showcase-card></kul-showcase-card>;
            case 'Code':
                return <kul-showcase-code></kul-showcase-code>;
            case 'Image':
                return <kul-showcase-image></kul-showcase-image>;
            case 'Splash':
                return <kul-showcase-splash></kul-showcase-splash>;
            case 'Spinner':
                return <kul-showcase-spinner></kul-showcase-spinner>;
            case 'Toast':
                return <kul-showcase-toast></kul-showcase-toast>;
            case 'Upload':
                return <kul-showcase-upload></kul-showcase-upload>;
        }
    }

    #frameworkCards(): VNode[] {
        const cards: VNode[] = [];
        KUL_SHOWCASE_FRAMEWORK.nodes.forEach((node) => {
            const kulData: KulDataDataset = {
                nodes: [
                    {
                        cells: {
                            icon: { shape: 'image', value: node.icon },
                            text1: { value: node.value },
                            text2: { value: '' },
                            text3: { value: node.description },
                        },
                        id: node.id,
                    },
                ],
            };
            const onEvent: (
                event: KulCardCustomEvent<KulEventPayload>
            ) => void = (e) => {
                if (e.detail.eventType === 'click') {
                    this.currentFramework = node.id;
                    console.log('Selected framework: ', this.currentFramework);
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

    #framework(): VNode {
        switch (this.currentFramework) {
            case 'Manager':
                return <kul-showcase-kulmanager></kul-showcase-kulmanager>;
        }
    }

    #layoutsCards(): VNode[] {
        const cards: VNode[] = [];
        KUL_SHOWCASE_LAYOUT.nodes.forEach((node) => {
            const kulData: KulDataDataset = {
                nodes: [
                    {
                        cells: {
                            icon: { shape: 'image', value: node.icon },
                            text1: { value: node.value },
                            text2: { value: '' },
                            text3: { value: node.description },
                        },
                        id: node.id,
                    },
                ],
            };
            const onEvent: (
                event: KulCardCustomEvent<KulEventPayload>
            ) => void = (e) => {
                if (e.detail.eventType === 'click') {
                    this.currentLayout = node.id;
                    console.log(
                        'Selected layout component: ',
                        this.currentLayout
                    );
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

    #layouts(): VNode {
        switch (this.currentLayout) {
            case 'Header':
                return <kul-showcase-header></kul-showcase-header>;
        }
    }

    #utilsCards(): VNode[] {
        const cards: VNode[] = [];
        KUL_SHOWCASE_UTILITIES.nodes.forEach((node) => {
            const kulData: KulDataDataset = {
                nodes: [
                    {
                        cells: {
                            icon: { shape: 'image', value: node.icon },
                            text1: { value: node.value },
                            text2: { value: '' },
                            text3: { value: node.description },
                        },
                        id: node.id,
                    },
                ],
            };
            const onEvent: (
                event: KulCardCustomEvent<KulEventPayload>
            ) => void = (e) => {
                if (e.detail.eventType === 'click') {
                    this.currentUtility = node.id;
                    console.log('Selected utility: ', this.currentUtility);
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

    #utils(): VNode {
        switch (this.currentUtility) {
            case 'Debugging':
                return <kul-showcase-debug></kul-showcase-debug>;
            case 'Probe':
                return <kul-showcase-probe></kul-showcase-probe>;
        }
    }

    #prepHeader(title: KulShowcaseTitle): VNode {
        const current =
            title === 'Components'
                ? this.currentComponent
                : title === 'Layout'
                ? this.currentLayout
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
                                case 'Layout':
                                    this.currentLayout = '';
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
                <style>{this.#kulManager.theme.setKulStyle(this)}</style>
                <div
                    id={KUL_WRAPPER_ID}
                    onClick={(e) => this.onKulEvent(e, 'click')}
                >
                    <div class="showcase">
                        <div class="section">
                            {this.#prepHeader('Utilities')}
                            <div class="flex-wrapper flex-wrapper--responsive">
                                {this.currentUtility
                                    ? this.#utils()
                                    : this.#utilsCards()}
                            </div>
                        </div>
                        <div class="section">
                            {this.#prepHeader('Components')}
                            <div class="flex-wrapper flex-wrapper--responsive">
                                {this.currentComponent
                                    ? this.#comps()
                                    : this.#compsCards()}
                            </div>
                        </div>
                        <div class="section">
                            {this.#prepHeader('Layout')}
                            <div class="flex-wrapper flex-wrapper--responsive">
                                {this.currentLayout
                                    ? this.#layouts()
                                    : this.#layoutsCards()}
                            </div>
                        </div>
                        <div class="section">
                            {this.#prepHeader('Framework')}
                            <div class="flex-wrapper flex-wrapper--responsive">
                                {this.currentFramework
                                    ? this.#framework()
                                    : this.#frameworkCards()}
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
