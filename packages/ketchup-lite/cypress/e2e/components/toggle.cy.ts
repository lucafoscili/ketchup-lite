import { KUL_TOGGLE_PROPS } from "src/components/kul-toggle/helpers/constants";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { TOGGLE_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/toggle/kul-showcase-toggle-declarations";
import { KulToggleEvent } from "../../../src/components/kul-toggle/kul-toggle-declarations";

const toggleComponent = "toggle";
const toggleTag = "kul-" + toggleComponent;

//#region Basic
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
//#endregion

//#region Events
describe("Events", () => {
  it(`blur`, () => {
    cy.navigate(toggleComponent);
    const eventType: KulToggleEvent = "blur";
    cy.checkEvent(toggleComponent, eventType);
    cy.get("@eventElement")
      .findCyElement(CY_ATTRIBUTES.input)
      .first()
      .focus()
      .blur();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`change`, () => {
    cy.navigate(toggleComponent);
    const eventType: KulToggleEvent = "change";
    cy.checkEvent(toggleComponent, eventType);
    cy.get("@eventElement").findCyElement(CY_ATTRIBUTES.input).first().click();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`focus`, () => {
    cy.navigate(toggleComponent);
    const eventType: KulToggleEvent = "focus";
    cy.checkEvent(toggleComponent, eventType);
    cy.get("@eventElement").findCyElement(CY_ATTRIBUTES.input).first().focus();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`pointerdown`, () => {
    cy.navigate(toggleComponent);
    const eventType: KulToggleEvent = "pointerdown";
    cy.checkEvent(toggleComponent, eventType);
    cy.get("@eventElement")
      .findCyElement(CY_ATTRIBUTES.input)
      .first()
      .click({ force: true });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
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
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
});
//#endregion

//#region Methods
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
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(toggleTag, KUL_TOGGLE_PROPS);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(toggleComponent);
  });
  it("kulStyle: hould check for the presence of a <style> element with id kul-style.", () => {
    cy.checkKulStyle();
  });
});
