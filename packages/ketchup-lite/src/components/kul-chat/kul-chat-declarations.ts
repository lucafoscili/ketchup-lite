import { KulLLMChoiceMessage } from '../../managers/kul-llm/kul-llm-declarations';
import { KulManager } from '../../managers/kul-manager/kul-manager';
import { KulEventPayload } from '../../types/GenericTypes';

//#region Adapter
export interface KulChatAdapter {
  actions: {
    delete: (message: KulLLMChoiceMessage) => void;
    disableInteractivity: (shouldDisable: boolean) => void;
    regenerate: (message: KulLLMChoiceMessage) => void;
    send: () => void;
    stt: () => void;
    updateTokenCount: () => Promise<void>;
  };
  components: {
    buttons: {
      clear: HTMLKulButtonElement;
      send: HTMLKulButtonElement;
      settings: HTMLKulButtonElement;
      stt: HTMLKulButtonElement;
    };
    progressbar: HTMLKulProgressbarElement;
    spinner: HTMLKulSpinnerElement;
    textareas: {
      prompt: HTMLKulTextfieldElement;
      system: HTMLKulTextfieldElement;
    };
  };
  emit: { event: (eventType: KulChatEvent, e?: Event) => void };
  get: {
    history: () => KulChatHistory;
    manager: () => KulManager;
    props: {
      contextWindow: () => number;
      endpointUrl: () => string;
      maxTokens: () => number;
      pollingInterval: () => number;
      system: () => string;
      temperature: () => number;
    };
    status: {
      connection: (status: KulChatStatus) => void;
      toolbarMessage: () => KulLLMChoiceMessage;
      view: () => KulChatView;
    };
  };
  set: {
    props: {
      contextWindow: (value: number) => void;
      endpointUrl: (value: string) => void;
      maxTokens: (value: number) => void;
      pollingInterval: (value: number) => void;
      system: (value: string) => void;
      temperature: (value: number) => void;
    };
    status: {
      connection: (status: KulChatStatus) => void;
      toolbarMessage: (message: KulLLMChoiceMessage) => void;
      view: (view: KulChatView) => void;
    };
  };
}
//#endregion

//#region Events
export type KulChatEvent =
  | 'config'
  | 'polling'
  | 'ready'
  | 'unmount'
  | 'update';
export interface KulChatEventPayload
  extends KulEventPayload<'KulChat', KulChatEvent> {
  history: string;
  status: KulChatStatus;
}
//#endregion

//#region States
export type KulChatHistory = KulLLMChoiceMessage[];
export type KulChatStatus = 'connecting' | 'offline' | 'ready';
export type KulChatView = 'chat' | 'settings';
//#endregion

//#region Props
export enum KulChatProps {
  kulContextWindow = 'How many tokens the context window can handle, used to calculate the occupied space.',
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
  kulContextWindow?: number;
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
export type KulChatLayout = 'bottom-textarea' | 'top-textarea';
//#endregion
