import { KUL_LAZY_PROPS } from "src/components/kul-lazy/helpers/constants";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { KulLazyEvent } from "../../../src/components/kul-lazy/kul-lazy-declarations";
import { LAZY_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/lazy/kul-showcase-lazy-declarations";

const lazy = "lazy";
const lazyTag = "kul-" + lazy;

//#region Basic
describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(lazy).waitForWebComponents([lazyTag]);
  });
  it(`Should check that all <${lazyTag}> exist.`, () => {
    cy.checkComponentExamples(lazyTag, new Set(LAZY_EXAMPLES_KEYS));
  });
  it(`Should check that the number of <${lazyTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(LAZY_EXAMPLES_KEYS));
  });
});
//#endregion

//#region Events
describe("Events", () => {
  it(`kul-event`, () => {
    cy.navigate(lazy);
    const eventType: KulLazyEvent = "kul-event";
    cy.checkEvent(lazy, eventType);
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`load`, () => {
    const eventType: KulLazyEvent = "load";
    cy.checkReadyEvent(lazy, eventType);
  });
  it(`ready`, () => {
    cy.checkReadyEvent(lazy);
  });
  it(`unmount`, () => {
    cy.navigate(lazy);
    const eventType: KulLazyEvent = "unmount";
    cy.checkEvent(lazy, eventType);
    cy.get("@eventElement").then(($lazy) => {
      const kulLazyElement = $lazy[0] as HTMLKulLazyElement;
      kulLazyElement.unmount();
    });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
});
//#endregion

//#region Methods
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(lazy);
  });
  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(lazyTag);
  });
  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(lazyTag);
  });
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(lazyTag, KUL_LAZY_PROPS);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(lazy);
  });
  it("kulStyle: should check for the presence of a <style> element with id kup-style.", () => {
    cy.checkKulStyle();
  });
});
//#endregion
