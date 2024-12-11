import { VNode } from "@stencil/core";
import { KulLLMChoiceMessage } from "../../managers/kul-llm/kul-llm-declarations";
import { KulManager } from "../../managers/kul-manager/kul-manager";
import { KulComponentAdapter, KulEventPayload } from "../../types/GenericTypes";
import { KulTypewriterPropsInterface } from "../kul-typewriter/kul-typewriter-declarations";
import { KulChat } from "./kul-chat";

//#region Adapter
export interface KulChatAdapter extends KulComponentAdapter<KulChat> {
  components: KulChatAdapterComponents;
  handlers: KulChatAdapterHandlers;
  hooks: KulChatAdapterHooks;
}
export interface KulChatAdapterComponents {
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
    manager: KulManager;
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
export enum KulChatProps {
  kulContextWindow = "How many tokens the context window can handle, used to calculate the occupied space.",
  kulEndpointUrl = "URL of the endpoint where the LLM is hosted.",
  kulLayout = "Sets the layout of the chat.",
  kulMaxTokens = "Maximum number of tokens allowed in the LLM's answer.",
  kulPollingInterval = "How often the component checks whether the LLM endpoint is online or not.",
  kulSeed = "Seed value for the LLM's answer generation.",
  kulStyle = "Custom style of the component.",
  kulSystem = "System message for the LLM.",
  kulTemperature = "Sets the creative boundaries of the LLM.",
  kulTypewriterProps = "Sets the props of the assistant typewriter component. Set this prop to false to replace the typewriter with a simple text element.",
  kulValue = "Initial history of the chat.",
}
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
