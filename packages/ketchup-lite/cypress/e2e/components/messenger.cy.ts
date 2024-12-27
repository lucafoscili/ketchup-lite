import { KUL_MESSENGER_PROPS } from "src/components/kul-messenger/helpers/constants";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { KulMessengerEvent } from "../../../src/components/kul-messenger/kul-messenger-declarations";
import { MESSENGER_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/messenger/kul-showcase-messenger-declarations";

const messenger = "messenger";
const messengerTag = "kul-" + messenger;

//#region Basic
describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(messenger).waitForWebComponents([messengerTag]);
  });
  it(`Should check that all <${messengerTag}> exist.`, () => {
    cy.checkComponentExamples(messengerTag, new Set(MESSENGER_EXAMPLES_KEYS));
  });
  it(`Should check that the number of <${messengerTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(MESSENGER_EXAMPLES_KEYS));
  });
});
//#endregion

//#region Events
describe("Events", () => {
  it(`ready`, () => {
    cy.checkReadyEvent(messenger);
  });
  it(`unmount`, () => {
    cy.navigate(messenger);
    const eventType: KulMessengerEvent = "unmount";
    cy.checkEvent(messenger, eventType);
    cy.get("@eventElement").then(($messenger) => {
      const kulMessengerElement = $messenger[0] as HTMLKulMessengerElement;
      kulMessengerElement.unmount();
    });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
});
//#endregion

//#region Methods
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(messenger);
  });
  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(messengerTag);
  });
  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(messengerTag);
  });
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(messengerTag, KUL_MESSENGER_PROPS);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(messenger);
  });

  it("Should check for the presence of a <style> element with id kul-style.", () => {
    cy.checkKulStyle();
  });
});
//#endregion
