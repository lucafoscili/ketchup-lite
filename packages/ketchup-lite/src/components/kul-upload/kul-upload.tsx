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
} from '@stencil/core';
import { kulManagerInstance } from '../../managers/kul-manager/kul-manager';
import { getProps, setProps } from '../../utils/componentUtils';
import { KUL_WRAPPER_ID } from '../../variables/GenericVariables';
import { KulDebugComponentInfo } from '../../managers/kul-debug/kul-debug-declarations';
import { GenericObject } from '../../types/GenericTypes';
import {
    KulUploadEventPayload,
    KulUploadEvents,
    KulUploadProps,
    KulUploadState,
} from './kul-upload-declarations';

@Component({
    tag: 'kul-upload',
    styleUrl: 'kul-upload.scss',
    shadow: true,
})
export class KulUpload {
    /**
     * References the root HTML element of the component (<kul-upload>).
     */
    @Element() rootElement: HTMLKulUploadElement;

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
     *State to hold the selected files
     * @default null - No custom style applied by default.
     */
    @State() selectedFiles: KulUploadState[] = [];

    /*-------------------------------------------------*/
    /*                    P r o p s                    */
    /*-------------------------------------------------*/

    /**
     * Enables customization of the component's style.
     * @default "" - No custom style applied by default.
     */
    @Prop({ mutable: true, reflect: true }) kulStyle = '';

    /**
     * Initializes the component with these files.
     * @default null
     */
    @Prop({ mutable: false }) kulValue = null;

    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/

    #input: HTMLInputElement;
    #kulManager = kulManagerInstance();

    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/

    /**
     * Describes event emitted.
     */
    @Event({
        eventName: 'kul-upload-event',
        composed: true,
        cancelable: false,
        bubbles: true,
    })
    kulEvent: EventEmitter<KulUploadEventPayload>;

    onKulEvent(e: Event, eventType: KulUploadEvents) {
        this.kulEvent.emit({
            comp: this,
            eventType,
            id: this.rootElement.id,
            originalEvent: e,
            selectedFiles: this.selectedFiles,
        });
    }

    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/

    /**
     * Retrieves the debug information reflecting the current state of the component.
     * @returns {Promise<KulDebugComponentInfo>} A promise that resolves to a KulDebugComponentInfo object containing debug information.
     */
    @Method()
    async getDebugInfo(): Promise<KulDebugComponentInfo> {
        return this.debugInfo;
    }
    /**
     * Retrieves the properties of the component, with optional descriptions.
     * @param {boolean} descriptions - If true, returns properties with descriptions; otherwise, returns properties only.
     * @returns {Promise<GenericObject>} A promise that resolves to an object where each key is a property name, optionally with its description.
     */
    @Method()
    async getProps(descriptions?: boolean): Promise<GenericObject> {
        return getProps(this, KulUploadProps, descriptions);
    }
    /**
     * Triggers a re-render of the component to reflect any state changes.
     */
    @Method()
    async refresh(): Promise<void> {
        forceUpdate(this);
    }
    /**
     * Assigns a set of properties to the component, triggering updates if necessary.
     * @param {GenericObject} props - An object containing properties to be set on the component.
     */
    @Method()
    async setProps(props: GenericObject): Promise<void> {
        setProps(this, KulUploadProps, props);
    }

    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/

    handleFileChange() {
        if (this.#input.files) {
            const files = Array.from(this.#input.files);
            this.selectedFiles = files.map((file) => ({
                file: file,
                name: file.name,
                size: file.size,
            }));
        } else {
            this.selectedFiles = [];
        }
        this.onKulEvent(new CustomEvent('upload'), 'upload');
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
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }

    render() {
        return (
            <Host>
                <style>{this.#kulManager.theme.setKulStyle(this)}</style>
                <div id={KUL_WRAPPER_ID}>
                    <div class="wrapper">
                        <div class="upload-container">
                            <input
                                class="file-upload"
                                id="file-upload"
                                multiple
                                onChange={() => this.handleFileChange()}
                                ref={(el) => {
                                    this.#input = el;
                                }}
                                type="file"
                            />
                            <label htmlFor="file-upload" class="upload-label">
                                Upload File
                            </label>
                        </div>
                        <div class="file-info">
                            {this.selectedFiles.map((fileInfo, index) => (
                                <div class="file-info__item" key={index}>
                                    <div class="file-info__name">
                                        <label class="file__label">Name</label>
                                        <span class="file__value">
                                            {fileInfo.name}
                                        </span>
                                    </div>
                                    <div class="file-info__">
                                        <label class="file__label">Size</label>:
                                        <span class="file__value">
                                            {(fileInfo.size / 1024).toFixed(2)}
                                            KB
                                        </span>
                                    </div>
                                </div>
                            ))}
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
