import { KUL_CHAT_PROPS } from "src/components/kul-chat/helpers/constants";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { KulChatEvent } from "../../../src/components/kul-chat/kul-chat-declarations";
import { CHAT_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/chat/kul-showcase-chat-declarations";

const chat = "chat";
const chatTag = "kul-" + chat;

//#region Basic
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
//#endregion

//#region Events
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
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
});
//#endregion

//#region Methods
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
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(chatTag, KUL_CHAT_PROPS);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(chat);
  });
  it("Should check for the presence of a <style> element with id kul-style.", () => {
    cy.checkKulStyle();
  });
});
//#endregion
