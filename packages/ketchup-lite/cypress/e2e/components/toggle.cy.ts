import {
  KulToggleEvent,
  KulToggleProps,
  KulTogglePropsInterface,
} from "../../../src/components/kul-toggle/kul-toggle-declarations";
import { TOGGLE_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/toggle/kul-showcase-toggle-declarations";
import { KulDataCyAttributes } from "../../../src/types/GenericTypes";

const toggleComponent = "toggle";
const toggleCapitalized =
  toggleComponent.charAt(0).toUpperCase() + toggleComponent.slice(1);
const toggleTag = "kul-" + toggleComponent;

describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(toggleComponent).waitForWebComponents([toggleTag]);
  });

  it(`Should check that all <${toggleTag}> exist.`, () => {
    cy.checkComponentExamples(toggleTag, new Set(TOGGLE_EXAMPLES_KEYS));
  });

  it(`Should check that the number of <${toggleTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(TOGGLE_EXAMPLES_KEYS));
  });
});

describe("Events", () => {
  it(`blur`, () => {
    cy.navigate(toggleComponent);
    const eventType: KulToggleEvent = "blur";
    cy.checkEvent(toggleComponent, eventType);
    cy.get("@eventElement")
      .findCyElement(KulDataCyAttributes.INPUT)
      .first()
      .focus()
      .blur();
    cy.getCyElement(KulDataCyAttributes.CHECK).should("exist");
  });

  it(`change`, () => {
    cy.navigate(toggleComponent);
    const eventType: KulToggleEvent = "change";
    cy.checkEvent(toggleComponent, eventType);
    cy.get("@eventElement")
      .findCyElement(KulDataCyAttributes.INPUT)
      .first()
      .click();
    cy.getCyElement(KulDataCyAttributes.CHECK).should("exist");
  });

  it(`focus`, () => {
    cy.navigate(toggleComponent);
    const eventType: KulToggleEvent = "focus";
    cy.checkEvent(toggleComponent, eventType);
    cy.get("@eventElement")
      .findCyElement(KulDataCyAttributes.INPUT)
      .first()
      .focus();
    cy.getCyElement(KulDataCyAttributes.CHECK).should("exist");
  });

  it(`pointerdown`, () => {
    cy.navigate(toggleComponent);
    const eventType: KulToggleEvent = "pointerdown";
    cy.checkEvent(toggleComponent, eventType);
    cy.get("@eventElement")
      .findCyElement(KulDataCyAttributes.INPUT)
      .first()
      .click({ force: true });
    cy.getCyElement(KulDataCyAttributes.CHECK).should("exist");
  });

  it(`ready`, () => {
    cy.checkReadyEvent(toggleComponent);
  });

  it(`unmount`, () => {
    cy.navigate(toggleComponent);
    const eventType: KulToggleEvent = "unmount";
    cy.checkEvent(toggleComponent, eventType);
    cy.get("@eventElement").then(($toggleComponent) => {
      const kulToggleElement = $toggleComponent[0] as HTMLKulToggleElement;
      kulToggleElement.unmount();
    });
    cy.getCyElement(KulDataCyAttributes.CHECK).should("exist");
  });
});

describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(toggleComponent);
  });

  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(toggleTag);
  });

  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(toggleTag);
  });

  it(`getProps: check keys against Kul${toggleCapitalized}Props enum.`, () => {
    cy.checkProps(toggleTag, KulToggleProps);
  });

  it(`getProps: check keys against Kul${toggleCapitalized}PropsInterface.`, () => {
    cy.checkPropsInterface(toggleTag, {
      kulDisabled: null,
      kulLabel: null,
      kulLeadingLabel: null,
      kulRipple: null,
      kulStyle: null,
      kulValue: null,
    } as Required<KulTogglePropsInterface>);
  });
});

describe("Props", () => {
  beforeEach(() => {
    cy.navigate(toggleComponent);
  });

  it("kulStyle: hould check for the presence of a <style> element with id kup-style.", () => {
    cy.checkKulStyle();
  });
});
