import {
  KulChatAdapterRefs,
  KulChatPropsInterface,
} from "src/components/kul-chat/kul-chat-declarations";

//#region Props
export const KUL_CHAT_PROPS: (keyof KulChatPropsInterface)[] = [
  "kulContextWindow",
  "kulEmpty",
  "kulEndpointUrl",
  "kulLayout",
  "kulMaxTokens",
  "kulPollingInterval",
  "kulSeed",
  "kulStyle",
  "kulSystem",
  "kulTemperature",
  "kulTypewriterProps",
  "kulValue",
];
//#endregion

//#region Ids
export const IDS = {
  chat: {
    clear: "chat-clear",
    configuration: "chat-configuration",
    prompt: "chat-prompt",
    send: "chat-send",
    settings: "chat-settings",
    stt: "chat-stt",
  },
  options: {
    back: "option-back",
    contextWindow: "option-context",
    endpointUrl: "option-endpoint",
    maxTokens: "option-maxtokens",
    polling: "option-polling",
    system: "option-system",
    temperature: "option-temperature",
  },
  toolbar: {
    copyContent: "toolbar-copy-content",
    deleteMessage: "toolbar-delete-message",
    regenerate: "toolbar-regenerate",
  },
};
//#endregion

//#region Refs
export const REFS = (): KulChatAdapterRefs => {
  return {
    chat: {
      clear: null,
      configuration: null,
      progressbar: null,
      send: null,
      settings: null,
      spinner: null,
      stt: null,
      textarea: null,
    },
    settings: {
      back: null,
      endpoint: null,
      maxTokens: null,
      polling: null,
      system: null,
      temperature: null,
    },
    toolbar: {
      deleteMessage: null,
      copyContent: null,
      regenerate: null,
    },
  };
};
