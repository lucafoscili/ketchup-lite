import {
  KulChatEvent,
  KulChatProps,
  KulChatPropsInterface,
} from "../../../src/components/kul-chat/kul-chat-declarations";
import { CHAT_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/chat/kul-showcase-chat-declarations";
import { KulDataCyAttributes } from "../../../src/types/GenericTypes";

const chat = "chat";
const chatCapitalized = chat.charAt(0).toUpperCase() + chat.slice(1);
const chatTag = "kul-" + chat;

describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(chat).waitForWebComponents([chatTag]);
  });

  it(`Should check that all <${chatTag}> exist.`, () => {
    cy.checkComponentExamples(chatTag, new Set(CHAT_EXAMPLES_KEYS));
  });

  it(`Should check that the number of <${chatTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(CHAT_EXAMPLES_KEYS));
  });
});

describe("Events", () => {
  it(`ready`, () => {
    cy.checkReadyEvent(chat);
  });

  it(`unmount`, () => {
    cy.navigate(chat);
    const eventType: KulChatEvent = "unmount";
    cy.checkEvent(chat, eventType);
    cy.get("@eventElement").then(($chat) => {
      const kulChatElement = $chat[0] as HTMLKulChatElement;
      kulChatElement.unmount();
    });
    cy.getCyElement(KulDataCyAttributes.CHECK).should("exist");
  });
});

describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(chat);
  });

  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(chatTag);
  });

  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(chatTag);
  });

  it(`getProps: check keys against Kul${chatCapitalized}Props enum.`, () => {
    cy.checkProps(chatTag, KulChatProps);
  });

  it(`getProps: check keys against Kul${chatCapitalized}PropsInterface.`, () => {
    cy.checkPropsInterface(chatTag, {
      kulContextWindow: null,
      kulEndpointUrl: null,
      kulLayout: null,
      kulMaxTokens: null,
      kulPollingInterval: null,
      kulSeed: null,
      kulStyle: null,
      kulSystem: null,
      kulTemperature: null,
      kulTypewriterProps: null,
      kulValue: null,
    } as Required<KulChatPropsInterface>);
  });
});

describe("Props", () => {
  beforeEach(() => {
    cy.navigate(chat);
  });

  it("Should check for the presence of a <style> element with id kup-style.", () => {
    cy.checkKulStyle();
  });
});
