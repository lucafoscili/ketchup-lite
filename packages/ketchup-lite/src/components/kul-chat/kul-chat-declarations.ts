import { VNode } from "@stencil/core";

import { KulChat } from "src/components/kul-chat/kul-chat";
import { KulTypewriterPropsInterface } from "src/components/kul-typewriter/kul-typewriter-declarations";
import { KulLLMChoiceMessage } from "src/managers/kul-llm/kul-llm-declarations";
import { KulComponentAdapter, KulEventPayload } from "src/types/GenericTypes";

//#region Adapter
export interface KulChatAdapter extends KulComponentAdapter<KulChat> {
  handlers: KulChatAdapterHandlers;
  hooks: KulChatAdapterHooks;
  widgets: KulChatAdapterWidgets;
}
export interface KulChatAdapterWidgets {
  jsx: {
    chat: {
      clear: () => VNode;
      progressbar: () => VNode;
      prompt: () => VNode;
      send: () => VNode;
      settings: () => VNode;
      spinner: () => VNode;
      stt: () => VNode;
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
  };
  refs: {
    chat: {
      clear: HTMLKulButtonElement;
      progressbar: HTMLKulProgressbarElement;
      prompt: HTMLKulTextfieldElement;
      send: HTMLKulButtonElement;
      settings: HTMLKulButtonElement;
      spinner: HTMLKulSpinnerElement;
      stt: HTMLKulButtonElement;
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
  };
}
export interface KulChatAdapterHandlers {
  deleteMessage: (message: KulLLMChoiceMessage) => void;
  disableInteractivity: (shouldDisable: boolean) => void;
  regenerate: (message: KulLLMChoiceMessage) => void;
  send: () => void;
  sendPrompt: () => Promise<void>;
  stt: () => void;
  updateHistory: (cb: () => unknown) => Promise<void>;
  updateTokensCount: () => Promise<void>;
}
export interface KulChatAdapterHooks {
  get: {
    comp: KulChat;
    history: () => KulChatHistory;
    status: () => KulChatStatus;
    toolbarMessage: () => KulLLMChoiceMessage;
    view: () => KulChatView;
  };
  set: {
    history: (history: KulChatHistory) => void;
    status: (status: KulChatStatus) => void;
    toolbarMessage: (message: KulLLMChoiceMessage) => void;
    view: (view: KulChatView) => void;
  };
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
