import { VNode } from "@stencil/core";
import {
  KulLLMChoiceMessage,
  KulLLMRole,
} from "src/managers/kul-llm/kul-llm-declarations";
import type { KulManager } from "src/managers/kul-manager/kul-manager";
import {
  KulComponentAdapter,
  KulComponentAdapterGetters,
  KulComponentAdapterHandlers,
  KulComponentAdapterJsx,
  KulComponentAdapterRefs,
  KulComponentAdapterSetters,
  KulEventPayload,
} from "src/types/GenericTypes";
import { KulButtonEventPayload } from "../kul-button/kul-button-declarations";
import { KulTextfieldEventPayload } from "../kul-textfield/kul-textfield-declarations";
import { KulTypewriterPropsInterface } from "../kul-typewriter/kul-typewriter-declarations";
import { KulChat } from "./kul-chat";

//#region Adapter
export interface KulChatAdapter extends KulComponentAdapter<KulChat> {
  controller: {
    get: KulChatAdapterControllerGetters;
    set: KulChatAdapterControllerSetters;
  };
  elements: {
    jsx: KulChatAdapterJsx;
    refs: KulChatAdapterRefs;
  };
  handlers: KulChatAdapterHandlers;
}
export interface KulChatAdapterJsx extends KulComponentAdapterJsx {
  chat: {
    clear: () => VNode;
    configuration: () => VNode;
    messageBlock: (text: string, role: KulLLMRole) => VNode;
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
export interface KulChatAdapterRefs extends KulComponentAdapterRefs {
  chat: {
    clear: HTMLKulButtonElement;
    configuration: HTMLKulButtonElement;
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
  };
  settings: {
    button: (e: CustomEvent<KulButtonEventPayload>) => void;
    textfield: (e: CustomEvent<KulTextfieldEventPayload>) => void;
  };
  toolbar: {
    button: (
      e: CustomEvent<KulButtonEventPayload>,
      m: KulLLMChoiceMessage,
    ) => void;
  };
}
export type KulChatAdapterInitializerGetters = Pick<
  KulChatAdapterControllerGetters,
  | "compInstance"
  | "currentPrompt"
  | "currentTokens"
  | "history"
  | "manager"
  | "status"
  | "view"
>;
export type KulChatAdapterInitializerSetters = Pick<
  KulChatAdapterControllerSetters,
  "currentPrompt" | "currentTokens" | "history" | "status" | "view"
>;
export interface KulChatAdapterControllerGetters
  extends KulComponentAdapterGetters<KulChat> {
  compInstance: KulChat;
  currentPrompt: () => KulLLMChoiceMessage;
  currentTokens: () => number;
  history: () => KulChatHistory;
  manager: KulManager;
  newPrompt: () => Promise<KulLLMChoiceMessage>;
  status: () => KulChatStatus;
  view: () => KulChatView;
}
export interface KulChatAdapterControllerSetters
  extends KulComponentAdapterSetters {
  currentPrompt: (value: KulLLMChoiceMessage) => void;
  currentTokens: (value: number) => void;
  history: (cb: () => unknown) => void;
  status: (status: KulChatStatus) => void;
  view: (view: KulChatView) => void;
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
  kulEmpty?: string;
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
