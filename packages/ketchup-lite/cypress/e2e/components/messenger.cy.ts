import {
  KulMessengerEvent,
  KulMessengerProps,
  KulMessengerPropsInterface,
} from "../../../src/components/kul-messenger/kul-messenger-declarations";
import { MESSENGER_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/messenger/kul-showcase-messenger-declarations";
import { KulDataCyAttributes } from "../../../src/types/GenericTypes";

const messenger = "messenger";
const messengerCapitalized =
  messenger.charAt(0).toUpperCase() + messenger.slice(1);
const messengerTag = "kul-" + messenger;

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
    cy.getCyElement(KulDataCyAttributes.CHECK).should("exist");
  });
});

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

  it(`getProps: check keys against Kul${messengerCapitalized}Props enum.`, () => {
    cy.checkProps(messengerTag, KulMessengerProps);
  });

  it(`getProps: check keys against Kul${messengerCapitalized}PropsInterface.`, () => {
    cy.checkPropsInterface(messengerTag, {
      kulAutosave: null,
      kulData: null,
      kulStyle: null,
      kulValue: null,
    } as Required<KulMessengerPropsInterface>);
  });
});

describe("Props", () => {
  beforeEach(() => {
    cy.navigate(messenger);
  });

  it("Should check for the presence of a <style> element with id kup-style.", () => {
    cy.checkKulStyle();
  });
});
