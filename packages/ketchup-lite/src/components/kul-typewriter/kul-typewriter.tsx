import {
    Component,
    Element,
    Event,
    EventEmitter,
    forceUpdate,
    h,
    Host,
    Prop,
    State,
    Watch,
} from '@stencil/core';
import { Fragment, Method } from '@stencil/core/internal';
import { KulDebugLifecycleInfo } from '../../managers/kul-debug/kul-debug-declarations';
import { kulManagerInstance } from '../../managers/kul-manager/kul-manager';
import { GenericObject } from '../../types/GenericTypes';
import { getProps } from '../../utils/componentUtils';
import { KUL_STYLE_ID, KUL_WRAPPER_ID } from '../../variables/GenericVariables';
import {
    KulTypewriterEvent,
    KulTypewriterEventPayload,
    KulTypewriterProps,
    KulTypewriterValue,
} from './kul-typewriter-declarations';

@Component({
    tag: 'kul-typewriter',
    styleUrl: 'kul-typewriter.scss',
    shadow: true,
})
export class KulTypewriter {
    /**
     * References the root HTML element of the component (<kul-typewriter>).
     */
    @Element() rootElement: HTMLKulTypewriterElement;

    //#region States
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
     * The current text being displayed as it types.
     */
    @State() displayedText = '';
    /**
     * Controls whether the component is in the process of deleting text.
     */
    @State() isDeleting = false;
    /**
     * Tracks the current index of the text array.
     */
    @State() currentTextIndex = 0;
    //#endregion

    //#region Props
    /**
     * Enables or disables the blinking cursor.
     * @default true
     */
    @Prop({ mutable: true }) kulCursor = true;
    /**
     * Sets the deleting speed in milliseconds.
     * @default 50
     */
    @Prop({ mutable: true }) kulDeleteSpeed = 50;
    /**
     * Enables or disables looping of the text.
     * @default false
     */
    @Prop({ mutable: true }) kulLoop = false;
    /**
     * Sets the duration of the pause after typing a complete text.
     * @default 1000
     */
    @Prop({ mutable: true }) kulPause = 500;
    /**
     * Sets the typing speed in milliseconds.
     * @default 100
     */
    @Prop({ mutable: true }) kulSpeed = 50;
    /**
     * Customizes the style of the component. This property allows you to apply a custom CSS style to the component.
     * @default ""
     */
    @Prop({ mutable: true }) kulStyle = '';
    /**
     * Sets the text or array of texts to display with the typewriter effect.
     * @default ""
     */
    @Prop({ mutable: true }) kulValue: KulTypewriterValue = '';
    //#endregion

    //#region Internal variables
    #kulManager = kulManagerInstance();
    #timeout: NodeJS.Timeout;
    #texts: string[] = [];
    //#endregion

    //#region Events
    @Event({
        eventName: 'kul-typewriter-event',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kulEvent: EventEmitter<KulTypewriterEventPayload>;
    onKulEvent(e: Event | CustomEvent, eventType: KulTypewriterEvent) {
        this.kulEvent.emit({
            comp: this,
            id: this.rootElement.id,
            originalEvent: e,
            eventType,
        });
    }
    //#endregion

    //#region Watchers
    @Watch('kulValue')
    handleKulValueChange() {
        this.#initializeTexts();
        this.#resetTyping();
    }
    //#endregion

    //#region Public methods
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
        return getProps(this, KulTypewriterProps, descriptions);
    }
    /**
     * This method is used to trigger a new render of the component.
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
    //#endregion

    //#region Private methods
    #initializeTexts() {
        this.#texts = Array.isArray(this.kulValue)
            ? this.kulValue
            : [this.kulValue];
    }
    #startTyping() {
        const currentText = this.#texts[this.currentTextIndex] || '';

        if (this.isDeleting) {
            this.displayedText = currentText.substring(
                0,
                this.displayedText.length - 1
            );
        } else {
            this.displayedText = currentText.substring(
                0,
                this.displayedText.length + 1
            );
        }

        if (!this.isDeleting && this.displayedText === currentText) {
            this.#timeout = setTimeout(() => {
                if (this.kulLoop) this.isDeleting = true;
            }, this.kulPause);
        } else if (this.isDeleting && this.displayedText === '') {
            this.isDeleting = false;
            this.currentTextIndex =
                (this.currentTextIndex + 1) % this.#texts.length;
        } else {
            const delay = this.isDeleting ? this.kulDeleteSpeed : this.kulSpeed;
            this.#timeout = setTimeout(() => this.#startTyping(), delay);
        }
    }
    #resetTyping() {
        clearTimeout(this.#timeout);
        this.displayedText = '';
        this.isDeleting = false;
        this.currentTextIndex = 0;
        this.#startTyping();
    }
    #prepText() {
        return (
            <Fragment>
                <span>{this.displayedText}</span>
                {this.kulCursor ? <span class="cursor">|</span> : null}
            </Fragment>
        );
    }
    //#endregion

    //#region Lifecycle hooks
    componentWillLoad() {
        this.#kulManager.theme.register(this);
        this.#initializeTexts();
    }
    componentDidLoad() {
        this.onKulEvent(new CustomEvent('ready'), 'ready');
        this.#startTyping();
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
                <div id={KUL_WRAPPER_ID}>{this.#prepText()}</div>
            </Host>
        );
    }

    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
        clearTimeout(this.#timeout);
    }
    //#endregion
}
