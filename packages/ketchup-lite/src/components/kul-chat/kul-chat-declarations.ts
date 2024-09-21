import { VNode } from '@stencil/core';
import { KulEventPayload } from '../../../src/types/GenericTypes';
export interface KulChatAdapter {
    actions: {
        delete: (message: KulChatChoiceMessage) => void;
        disableInteractivity: (shouldDisable: boolean) => void;
        regenerate: (message: KulChatChoiceMessage) => void;
        send: (prompt: string) => void;
        stt: () => void;
    };
    components: {
        buttons: {
            clear: HTMLKulButtonElement;
            send: HTMLKulButtonElement;
            settings: HTMLKulButtonElement;
            stt: HTMLKulButtonElement;
        };
        spinner: HTMLKulSpinnerElement;
        textarea: HTMLKulTextfieldElement;
    };
    get: {
        history: () => KulChatHistory;
        props: {
            endpointUrl: () => string;
            maxTokens: () => number;
            pollingInterval: () => number;
            system: () => string;
            temperature: () => number;
        };
        status: {
            connection: (status: KulChatStatus) => void;
            toolbarMessage: () => KulChatChoiceMessage;
            view: () => KulChatView;
        };
        ui: {
            button: {
                clear: () => HTMLKulButtonElement;
                send: () => HTMLKulButtonElement;
                settings: () => HTMLKulButtonElement;
                stt: () => HTMLKulButtonElement;
            };
            spinner: () => HTMLKulSpinnerElement;
            textarea: () => HTMLKulTextfieldElement;
        };
    };
    set: {
        props: {
            endpointUrl: (value: string) => void;
            maxTokens: (value: number) => void;
            pollingInterval: (value: number) => void;
            system: (value: string) => void;
            temperature: (value: number) => void;
        };
        status: {
            connection: (status: KulChatStatus) => void;
            toolbarMessage: (message: KulChatChoiceMessage) => void;
            view: (view: KulChatView) => void;
        };
        ui: {
            button: {
                clear: (button: HTMLKulButtonElement) => void;
                send: (button: HTMLKulButtonElement) => void;
                settings: (button: HTMLKulButtonElement) => void;
                stt: (button: HTMLKulButtonElement) => void;
            };
            spinner: (spinner: HTMLKulSpinnerElement) => void;
            textarea: (textarea: HTMLKulTextfieldElement) => void;
        };
    };
}
export interface KulChatChoice {
    index: number;
    message: KulChatChoiceMessage;
    finish_reason: string;
}
export interface KulChatChoiceMessage {
    role: string;
    content: string;
    tool_calls?: unknown[];
}

export interface KulChatCompletionChoice {
    choice: KulChatChoice;
}

export interface KulChatCompletionObject {
    id: string;
    object: string;
    created: number;
    model: string;
    usage: KulChatUsage;
    choices: KulChatCompletionChoice[];
}

export type KulChatEvent = 'polling' | 'ready' | 'update';

export interface KulChatEventPayload extends KulEventPayload {
    eventType: KulChatEvent;
    history: string;
    status: KulChatStatus;
}

export type KulChatHistory = KulChatChoiceMessage[];

export type KulChatLayout = 'bottom-textarea' | 'top-textarea';

export enum KulChatProps {
    kulEndpointUrl = 'URL of the endpoint where the LLM is hosted.',
    kulLayout = 'Sets the layout of the chat.',
    kulMaxTokens = "Maximum number of tokens allowed in the LLM's answer.",
    kulPollingInterval = 'How often the component checks whether the LLM endpoint is online or not.',
    kulSeed = "Seed value for the LLM's answer generation.",
    kulStyle = 'Custom style of the component.',
    kulSystem = 'System message for the LLM.',
    kulTemperature = 'Sets the creative boundaries of the LLM.',
    kulValue = 'Initial history of the chat.',
}

export interface KulChatPropsInterface {
    kulEndpointUrl?: string;
    kulLayout?: KulChatLayout;
    kulMaxTokens?: number;
    kulPollingInterval?: number;
    kulSeed?: number;
    kulStyle?: string;
    kulSystem?: string;
    kulTemperature?: number;
    kulValue?: KulChatHistory;
}

export interface KulChatSendArguments {
    history: KulChatHistory;
    max_tokens: number;
    seed: number;
    system: string;
    temperature: number;
    url: string;
}

export type KulChatStatus = 'connecting' | 'offline' | 'ready';

export interface KulChatUsage {
    usage: KulChatUsageTokens;
}

export interface KulChatUsageTokens {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}

export type KulChatView = 'chat' | 'settings';
