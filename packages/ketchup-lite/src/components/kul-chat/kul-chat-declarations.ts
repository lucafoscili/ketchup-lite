import { VNode } from "@stencil/core";

import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import { KulChat } from "src/components/kul-chat/kul-chat";
import { KulTextfieldEventPayload } from "src/components/kul-textfield/kul-textfield-declarations";
import { KulTypewriterPropsInterface } from "src/components/kul-typewriter/kul-typewriter-declarations";
import {
  KulLLMChoiceMessage,
  KulLLMRequest,
} from "src/managers/kul-llm/kul-llm-declarations";
import {
  KulComponentAdapter,
  KulComponentAdapterHandlers,
  KulComponentAdapterJsx,
  KulComponentAdapterRefs,
  KulComponentAdapterStateGetters,
  KulComponentAdapterStateSetters,
  KulEventPayload,
} from "src/types/GenericTypes";

//#region Adapter
export interface KulChatAdapter extends KulComponentAdapter<KulChat> {
  elements: {
    jsx: KulChatAdapterElementsJsx;
    refs: KulChatAdapterElementsRefs;
  };
  handlers: KulChatAdapterHandlers;
  state: {
    get: KulChatAdapterStateGetters;
    set: KulChatAdapterStateSetters;
  };
}
export interface KulChatAdapterElementsJsx extends KulComponentAdapterJsx {
  chat: {
    clear: () => VNode;
    progressbar: () => VNode;
    send: () => VNode;
    settings: () => VNode;
    spinner: () => VNode;
    stt: () => VNode;
    textarea: () => VNode;
  };
  settings: {
    back: () => VNode;
    endpoint: () => VNode;
    maxTokens: () => VNode;
    polling: () => VNode;
    system: () => VNode;
    temperature: () => VNode;
  };
  toolbar: {
    deleteMessage: (m: KulLLMChoiceMessage) => VNode;
    copyContent: (m: KulLLMChoiceMessage) => VNode;
    regenerate: (m: KulLLMChoiceMessage) => VNode;
  };
}
export interface KulChatAdapterElementsRefs extends KulComponentAdapterRefs {
  chat: {
    clear: HTMLKulButtonElement;
    progressbar: HTMLKulProgressbarElement;
    send: HTMLKulButtonElement;
    settings: HTMLKulButtonElement;
    spinner: HTMLKulSpinnerElement;
    stt: HTMLKulButtonElement;
    textarea: HTMLKulTextfieldElement;
  };
  settings: {
    back: HTMLKulButtonElement;
    endpoint: HTMLKulTextfieldElement;
    maxTokens: HTMLKulTextfieldElement;
    polling: HTMLKulTextfieldElement;
    system: HTMLKulTextfieldElement;
    temperature: HTMLKulTextfieldElement;
  };
  toolbar: {
    deleteMessage: HTMLKulButtonElement;
    copyContent: HTMLKulButtonElement;
    regenerate: HTMLKulButtonElement;
  };
}
export interface KulChatAdapterHandlers extends KulComponentAdapterHandlers {
  chat: {
    button: (e: CustomEvent<KulButtonEventPayload>) => void;
    submit: () => void;
  };
  settings: {
    button: (e: CustomEvent<KulButtonEventPayload>) => void;
    textfield: (e: CustomEvent<KulTextfieldEventPayload>) => void;
  };
}
export interface KulChatAdapterStateGetters
  extends KulComponentAdapterStateGetters<KulChat> {
  compInstance: KulChat;
  currentPrompt: () => KulLLMChoiceMessage;
  currentTokens: () => number;
  history: () => KulChatHistory;
  status: () => KulChatStatus;
  toolbarMessage: () => KulLLMChoiceMessage;
  view: () => KulChatView;
}
export interface KulChatAdapterStateSetters
  extends KulComponentAdapterStateSetters {
  currentPrompt: (value: KulLLMChoiceMessage) => void;
  currentTokens: (value: number) => void;
  history: (cb: () => unknown) => void;
  status: (status: KulChatStatus) => void;
  toolbarMessage: (message: KulLLMChoiceMessage) => void;
  view: (view: KulChatView) => void;
}
export interface KulChatPrompt {
  clear: () => Promise<void>;
  get: () => Promise<KulLLMChoiceMessage>;
  newRequest: () => KulLLMRequest;
  submit: () => Promise<void>;
}
//#endregion

//#region Events
export type KulChatEvent =
  | "config"
  | "polling"
  | "ready"
  | "unmount"
  | "update";
export interface KulChatEventPayload
  extends KulEventPayload<"KulChat", KulChatEvent> {
  history: string;
  status: KulChatStatus;
}
//#endregion

//#region States
export type KulChatHistory = KulLLMChoiceMessage[];
export type KulChatStatus = "connecting" | "offline" | "ready";
export type KulChatView = "chat" | "settings";
//#endregion

//#region Props
export interface KulChatPropsInterface {
  kulContextWindow?: number;
  kulEndpointUrl?: string;
  kulLayout?: KulChatLayout;
  kulMaxTokens?: number;
  kulPollingInterval?: number;
  kulSeed?: number;
  kulStyle?: string;
  kulSystem?: string;
  kulTemperature?: number;
  kulTypewriterProps?: KulTypewriterPropsInterface;
  kulValue?: KulChatHistory;
}
export type KulChatLayout = "bottom-textarea" | "top-textarea";
//#endregion
