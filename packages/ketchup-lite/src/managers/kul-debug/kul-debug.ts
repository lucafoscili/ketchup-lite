import type { KulDom } from '../kul-manager/kul-manager-declarations';
import type {
    KulComponent,
    KulComponentName,
    KulGenericComponent,
} from '../../types/GenericTypes';
import {
    KulDebugCategory,
    KulDebugLifecycles,
    KulDebugLog,
    KulDebugLogClass,
    KulDebugLogFactory,
    KulDebugLogsToPrint,
    KulDebugLogToPrintEntry,
    KulDebugWidgetFactory,
} from './kul-debug-declarations';

const dom: KulDom = document.documentElement as KulDom;

export class KulDebug {
    #CONTAINER: HTMLElement;
    #IS_ENABLED: boolean;
    #LOG_LIMIT: number;
    #LOGS: KulDebugLog[];

    constructor(active?: boolean, logLimit?: number) {
        this.#IS_ENABLED = active ? true : false;
        this.#LOG_LIMIT = logLimit ? logLimit : 250;
        this.#LOGS = [];
        this.#CONTAINER = document.createElement('div');
        this.#CONTAINER.setAttribute('kul-debug', '');
        document.body.appendChild(this.#CONTAINER);
        document.addEventListener('kul-language-change', () => {
            if (this.#IS_ENABLED) {
                this.widget.create();
            }
        });
    }
    logs: KulDebugLogFactory = {
        dump: () => {
            this.#LOGS = [];
        },
        fromComponent(comp: KulDebugLogClass): comp is KulGenericComponent {
            return (comp as KulGenericComponent).rootElement !== undefined;
        },
        new: async (comp, message, category = 'informational') => {
            if (category === 'informational') {
                return;
            }
            const isFromComponent = this.logs.fromComponent(comp);
            const log: KulDebugLog = {
                category,
                class: null,
                date: new Date(),
                id: ` ${isFromComponent ? comp.rootElement : 'KulManager'} #${isFromComponent ? comp.rootElement.id : ''} => `,
                message,
                type:
                    message.indexOf('Render #') > -1
                        ? 'render'
                        : message.indexOf('Component ready') > -1
                          ? 'load'
                          : message.indexOf('Size changed') > -1
                            ? 'resize'
                            : 'misc',
            };

            if (this.#LOGS.length > this.#LOG_LIMIT) {
                if (this.isEnabled()) {
                    console.warn(
                        dom.ketchupLite.dates.format(log.date, 'LLL:ms') +
                            ' kul-debug => ' +
                            'Too many logs (> ' +
                            this.#LOG_LIMIT +
                            ')! Dumping (increase debug.logLimit to store more logs)... .'
                    );
                }
                this.logs.dump();
            }
            this.#LOGS.push(log);

            switch (category) {
                case 'error':
                    console.error(
                        dom.ketchupLite.dates.format(log.date, 'LLL:ms') +
                            log.id +
                            log.message,
                        log.class
                    );
                    window.dispatchEvent(
                        new CustomEvent('kul-debug-error', {
                            bubbles: true,
                            detail: { log },
                        })
                    );
                    break;
                case 'warning':
                    console.warn(
                        dom.ketchupLite.dates.format(log.date, 'LLL:ms') +
                            log.id +
                            log.message,
                        log.class
                    );
                    break;
            }
        },
        print: () => {
            const logsToPrint: KulDebugLogsToPrint = {
                load: [],
                misc: [],
                render: [],
                resize: [],
            };
            for (let index = 0; index < this.#LOGS.length; index++) {
                const log = this.#LOGS[index];
                const printEntry: KulDebugLogToPrintEntry = {
                    class: log.class,
                    date: dom.ketchupLite.dates.format(log.date, 'LLL:ms'),
                    message: log.id + log.message,
                };
                logsToPrint[log.type].push(printEntry);
            }
            for (const key in logsToPrint) {
                if (Object.prototype.hasOwnProperty.call(logsToPrint, key)) {
                    const logs: KulDebugLogToPrintEntry[] = logsToPrint[key];
                    console.groupCollapsed(
                        '%c  %c' +
                            key +
                            ' logs ' +
                            '(' +
                            logsToPrint[key].length +
                            ')',
                        'background-color: green; margin-right: 10px; border-radius: 50%',
                        'background-color: transparent'
                    );
                    for (let index = 0; index < logs.length; index++) {
                        const log = logs[index];
                        console.log(log.date, log.message, log.class);
                    }
                    console.groupEnd();
                }
            }
            if (this.#LOGS.length > 0) {
                console.groupCollapsed(
                    '%c  %c' + 'All logs (' + this.#LOGS.length + ')',
                    'background-color: blue; margin-right: 10px; border-radius: 50%',
                    'background-color: transparent'
                );
                console.table(this.#LOGS);
                console.groupEnd();
            }
        },
    };
    widget: KulDebugWidgetFactory = {
        create: () => {
            if (!this.widget.element) {
                this.widget.create();
            }
        },
        destroy: () => {
            this.widget.element.remove();
            this.widget.element = null;
        },
        element: null,
        initialize: () => {
            const card = document.createElement('kul-card');
            this.widget.element = card;
        },
    };
    isEnabled(): boolean {
        return this.#IS_ENABLED;
    }
    toggle(value?: boolean) {
        if (value === false || value === true) {
            this.#IS_ENABLED = value;
        } else {
            this.#IS_ENABLED = !this.#IS_ENABLED;
        }

        return this.#IS_ENABLED;
    }
    async updateDebugInfo(
        comp: KulComponent<KulComponentName>,
        lifecycle: KulDebugLifecycles
    ): Promise<void> {
        switch (lifecycle) {
            case 'custom':
                if (this.isEnabled()) {
                    this.logs.new(
                        comp,
                        'Custom breakpoint ' +
                            ' took ' +
                            (window.performance.now() -
                                comp.debugInfo.renderStart) +
                            'ms.'
                    );
                }
                break;
            case 'did-render':
                comp.debugInfo.renderEnd = window.performance.now();
                if (this.isEnabled()) {
                    this.logs.new(
                        comp,
                        'Render #' +
                            comp.debugInfo.renderCount +
                            ' took ' +
                            (comp.debugInfo.renderEnd -
                                comp.debugInfo.renderStart) +
                            'ms.'
                    );
                }
                break;
            case 'did-load':
                comp.debugInfo.endTime = window.performance.now();
                this.logs.new(
                    comp,
                    'Component ready after ' +
                        (comp.debugInfo.endTime - comp.debugInfo.startTime) +
                        'ms.'
                );
                break;
            case 'will-render':
                comp.debugInfo.renderCount++;
                comp.debugInfo.renderStart = window.performance.now();
            default:
                break;
        }
    }
}
